import { createClient } from "@/supabase/server";
import { notFound, redirect } from "next/navigation";
import { PortfolioRenderer } from "@/app/Components/portfolio/display";

interface PageProps {
    params: Promise<{ userId: string }>;
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

    // Redirect to template-specific route if available
    if (portfolio.template_id) {
        redirect(`/${portfolio.template_id}/${userId}`);
    }

    // Fallback to generic renderer if no template selected (though schema requires it)
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
