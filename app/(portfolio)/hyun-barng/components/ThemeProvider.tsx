"use client";

import { useEffect } from "react";
import { initializeTheme } from "../lib/theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    useEffect(() => {
        initializeTheme();
    }, []);

    return <>{children}</>;
};
