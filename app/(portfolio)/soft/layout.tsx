import React from "react";
import "./styles.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeScript } from "./components/ThemeScript";

export const metadata = {
    title: "Developer Portfolio",
    description: "Full Stack & ML Enthusiast",
};

const SoftPortfolioLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <head>
                <ThemeScript />
            </head>
            <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
                <ThemeProvider>{children}</ThemeProvider>
            </div>
        </>
    );
};
export default SoftPortfolioLayout;
