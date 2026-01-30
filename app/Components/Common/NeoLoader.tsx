"use client";

import React from "react";
// import { NeoBrutalism } from "@/components/ui/neo-brutalism"; // Reduced to nothing or just remove line
import { cn } from "@/lib/utils";

interface NeoLoaderProps {
    /**
     * If true, covers the entire viewport with a fixed overlay.
     */
    fullScreen?: boolean;
    /**
     * If true, adds a semi-transparent white background (useful for inline overlays).
     * Automatically true if fullScreen is true.
     */
    overlay?: boolean;
    /**
     * Custom loading text. Defaults to "LOADING..."
     */
    text?: string;
    className?: string;
}

export const NeoLoader: React.FC<NeoLoaderProps> = ({
    fullScreen = false,
    overlay = false,
    text = "LOADING...",
    className,
}) => {
    const isOverlay = fullScreen || overlay;

    const content = (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-6",
                className,
            )}
        >
            {/* Loading Text Only - Extremely Minimal */}
            <div className="bg-white border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono font-black tracking-[0.2em] text-lg sm:text-xl uppercase flex items-center">
                    {text}
                    <span className="animate-pulse ml-2 inline-block w-3 h-5 bg-black align-middle" />
                </span>
            </div>
        </div>
    );

    if (isOverlay) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center z-50",
                    fullScreen
                        ? "fixed inset-0 bg-[#FDFCF8] z-50"
                        : "absolute inset-0 bg-white/90 backdrop-blur-sm",
                )}
            >
                {/* If fullScreen, add a background pattern for extra brutalist texture */}
                {fullScreen && (
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #000 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />
                )}
                {content}
            </div>
        );
    }

    return content;
};

export default NeoLoader;
