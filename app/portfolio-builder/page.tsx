import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { PortfolioBuilderForm } from "@/app/Components/portfolio/builder";
import type { Portfolio, PortfolioTemplate } from "@/lib/types";
import fs from "fs";
import path from "path";

// Map folder names to template slugs
const TEMPLATE_FOLDER_MAP: Record<string, string> = {
    "architectural-portfolio final": "architectural",
    "hyun-barng-style-portfolio final": "hyun-barng",
    "magzine-portfolio final": "magazine",
    "minimalist-grid-portfolio final": "minimalist-grid",
    "soft-portfolio final": "soft",
};

async function getFilesystemTemplates(): Promise<PortfolioTemplate[]> {
    try {
        const portfoliosDir = path.join(process.cwd(), "portfolios");

        if (!fs.existsSync(portfoliosDir)) {
            return [];
        }

        const folders = fs.readdirSync(portfoliosDir, { withFileTypes: true });
        const templates: PortfolioTemplate[] = [];

        for (const folder of folders) {
            if (!folder.isDirectory()) continue;

            const metadataPath = path.join(
                portfoliosDir,
                folder.name,
                "metadata.json",
            );

            if (fs.existsSync(metadataPath)) {
                try {
                    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
                    const metadata = JSON.parse(metadataContent);

                    const slug =
                        TEMPLATE_FOLDER_MAP[folder.name] ||
                        folder.name.toLowerCase().replace(/\s+/g, "-");

                    templates.push({
                        id: slug,
                        name: metadata.name || folder.name,
                        description: metadata.description || null,
                        preview_image_url: null,
                        folder_name: folder.name,
                        created_at: new Date().toISOString(),
                    });
                } catch (parseError) {
                    console.error(
                        `Error parsing metadata for ${folder.name}:`,
                        parseError,
                    );
                }
            }
        }

        return templates;
    } catch (error) {
        console.error("Error fetching filesystem templates:", error);
        return [];
    }
}

export default async function PortfolioBuilderPage() {
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/register?redirect=/portfolio-builder");
    }

    // Fetch existing portfolio if any
    const { data: portfolio } = await supabase
        .from("portfolios")
        .select(
            `
      *,
      template:portfolio_templates(*),
      projects:portfolio_projects(*),
      experience:portfolio_experience(*),
      social_links:portfolio_social_links(*)
    `,
        )
        .eq("user_id", user.id)
        .single();

    // Fetch templates from database
    const { data: dbTemplates } = await supabase
        .from("portfolio_templates")
        .select("*")
        .order("created_at", { ascending: true });

    // Fetch templates from filesystem
    const fsTemplates = await getFilesystemTemplates();

    // Merge templates (filesystem templates take priority for matching IDs)
    const templatesMap = new Map<string, PortfolioTemplate>();

    // Add database templates first
    (dbTemplates || []).forEach((t) => templatesMap.set(t.id, t));

    // Add/override with filesystem templates
    fsTemplates.forEach((t) => templatesMap.set(t.id, t));

    const allTemplates = Array.from(templatesMap.values());

    return (
        <div className="container px-10 py-10 flex items-center justify-center mx-auto">
            <PortfolioBuilderForm
                existingPortfolio={portfolio as Portfolio | undefined}
                templates={allTemplates}
                userId={user.id}
            />
        </div>
    );
}
