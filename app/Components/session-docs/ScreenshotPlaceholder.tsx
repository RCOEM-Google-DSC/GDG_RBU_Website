"use client";

import React, { useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import Image from "next/image";
import { nb } from "@/components/ui/neo-brutalism";
type Slide = { src?: string; label?: string; description?: string };

export const ScreenshotPlaceholder: React.FC<{
    src?: string;
    items?: Array<string | Slide>;
    onImageClick?: (src: string) => void;
}> = ({ src, items, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    let slides: Slide[] = [];
    if (Array.isArray(items) && items.length > 0) {
        slides = items.map((it) => (typeof it === "string" ? { src: it } : { src: it.src }));
    } else if (typeof src === "string" && src.length > 0) {
        slides = [{ src }];
    } else {
        slides = [{ src: "" }];
    }

    const hasMultiple = slides.length > 1;
    const current = slides[currentIndex];

    const next = () => setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < slides.length - 1;

    return (
        <div className="mt-8 w-full aspect-video bg-black border-4 border-gray-700 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-900 transition-colors group relative overflow-hidden select-none">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-size-[20px_20px] opacity-20"></div>

            {hasMultiple && (
                <>
                    {hasPrev && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                prev();
                            }}
                            className={nb({
                                border: 2,
                                shadow: "md",
                                className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 z-30"
                            })}
                            title="Previous Image"
                        >
                            <ArrowRight className="rotate-180" size={24} />
                        </button>
                    )}

                    {hasNext && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                next();
                            }}
                            className={nb({
                                border: 2,
                                shadow: "md",
                                className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 z-30"
                            })}
                            title="Next Image"
                        >
                            <ArrowRight size={24} />
                        </button>
                    )}

                    <div className="absolute bottom-4 flex gap-2 z-30">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 border-2 border-black transition-colors ${idx === currentIndex ? "bg-[#ffbe0b]" : "bg-white"}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {current.src ? (
                <Image
                    width={1920}
                    height={1080}
                    src={current.src}
                    alt={`Screenshot`}
                    className="w-full h-full object-cover relative z-10 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onImageClick && onImageClick(current.src ?? "")}
                    quality={100}
                    unoptimized
                />
            ) : (
                <>
                    <Camera
                        size={48}
                        className="mb-4 text-gray-600 group-hover:text-gray-400 transition-colors relative z-10"
                    />
                    <span className="font-black uppercase tracking-widest text-sm md:text-base text-center px-16 relative z-10 animate-in fade-in zoom-in duration-200">
                        Place Screenshot Here
                    </span>
                    <span className="text-xs mt-2 text-gray-600 relative z-10">
                        Aspect Ratio 16:9 Recommended
                    </span>
                </>
            )}
        </div>
    );
};
