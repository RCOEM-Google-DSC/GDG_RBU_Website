import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { PortfolioBuilderForm } from "@/app/Components/portfolio/builder/helpers";
import { PortfolioService } from "@/modules/portfolio";
import type { Portfolio } from "@/modules/portfolio";

const service = new PortfolioService();

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

    // Fetch existing portfolio if any (most relevant one)
    const portfolio = await service.get(user.id);

    // Fetch all templates from the module service
    const allTemplates = await service.getTemplates();

    return (
        <div className="container px-4 md:px-10 py-10 flex items-center justify-center mx-auto">
            <PortfolioBuilderForm
                existingPortfolio={portfolio as Portfolio | undefined}
                templates={allTemplates}
                userId={user.id}
            />
        </div>
    );
}
