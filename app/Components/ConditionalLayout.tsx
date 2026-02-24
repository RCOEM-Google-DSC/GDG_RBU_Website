"use client";

import { usePathname } from "next/navigation";
import NavBar from "./Navigation/NavBar";

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if we're on a portfolio route
    const isPortfolioRoute =
        pathname?.startsWith("/architectural") ||
        pathname?.startsWith("/soft") ||
        pathname?.startsWith("/minimalist-grid") ||
        pathname?.startsWith("/magazine") ||
        pathname?.startsWith("/hyun-barng") ||
        pathname?.startsWith("/portfolio-preview");

    if (isPortfolioRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <NavBar />
            <main className="relative w-full pt-[70px]">{children}</main>
        </>
    );
}
