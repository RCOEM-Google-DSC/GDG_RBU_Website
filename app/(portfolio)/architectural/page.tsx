import { redirect } from "next/navigation";

export default function ArchitecturalPortfolioIndex() {
    // Redirect to a default user or show an error
    // In production, you might want to show a list of portfolios or redirect to login
    redirect("/");
}
