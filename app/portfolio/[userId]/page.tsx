import { createClient } from "@/supabase/server";
import { notFound } from "next/navigation";
import { PortfolioRenderer } from "@/app/Components/portfolio/display";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ userId: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { userId } = await params;
    const supabase = await createClient();

    const { data: portfolio } = await supabase
        .from("portfolios")
        .select("display_name, about_me")
        .eq("user_id", userId)
        .eq("is_published", true)
        .single();

    if (!portfolio) {
        return {
            title: "Portfolio Not Found",
        };
    }

    return {
        title: `${portfolio.display_name} | Portfolio`,
        description:
            portfolio.about_me?.substring(0, 160) ||
            `Portfolio of ${portfolio.display_name}`,
    };
}

export default async function PortfolioPage({ params }: PageProps) {
    const { userId } = await params;
    const supabase = await createClient();

    // Fetch portfolio with all related data
    const { data: portfolio, error: portfolioError } = await supabase
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
        .eq("user_id", userId)
        .eq("is_published", true)
        .single();

    if (portfolioError || !portfolio) {
        notFound();
    }

    // Fetch user info
    const { data: user } = await supabase
        .from("users")
        .select("name, email, avatar_url")
        .eq("id", userId)
        .single();

    return (
        <PortfolioRenderer
            portfolio={portfolio}
            projects={portfolio.projects || []}
            experience={portfolio.experience || []}
            socialLinks={portfolio.social_links || []}
            user={user || {}}
        />
    );
}
