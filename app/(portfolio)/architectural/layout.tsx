import React from "react";
import "./styles.css";

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="w-full font-sans"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {children}
        </div>
    );
}
