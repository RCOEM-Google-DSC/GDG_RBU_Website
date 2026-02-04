import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { PortfolioBuilderForm } from "@/app/Components/portfolio/builder";
import type { Portfolio, PortfolioTemplate } from "@/lib/types";
import fs from "fs";
import path from "path";

import { TEMPLATE_FOLDER_MAP } from "@/lib/templates";

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

            // Only include templates that are in our recognized map
            const slug = TEMPLATE_FOLDER_MAP[folder.name];
            if (!slug) continue;

            const metadataPath = path.join(
                portfoliosDir,
                folder.name,
                "metadata.json",
            );

            if (fs.existsSync(metadataPath)) {
                try {
                    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
                    const metadata = JSON.parse(metadataContent);

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

    // Merge templates (filesystem templates take priority)
    const templatesMap = new Map<string, PortfolioTemplate>();

    // Only include recognized template IDs
    const RECOGNIZED_IDS = ["architectural", "soft", "minimalist-grid", "magazine", "hyun-barng"];

    // Add filesystem templates (they are our source of truth for code)
    fsTemplates.forEach((t) => {
        if (RECOGNIZED_IDS.includes(t.id)) {
            templatesMap.set(t.id, t);
        }
    });

    // Fallback to DB templates only if they match recognized IDs and aren't in FS
    (dbTemplates || []).forEach((t) => {
        if (RECOGNIZED_IDS.includes(t.id) && !templatesMap.has(t.id)) {
            templatesMap.set(t.id, t);
        }
    });

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
