"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { nb } from "@/components/ui/neo-brutalism";

interface ImageViewerModalProps {
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    onClose: () => void;
}

export default function ImageViewerModal({
    isOpen,
    imageSrc,
    imageAlt,
    onClose,
}: ImageViewerModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className={nb({
                    border: 4,
                    shadow: "md",
                    className: "absolute top-4 right-4 z-50 bg-white text-black p-3 font-black hover:bg-yellow-300 transition-all hover:-translate-y-1"
                })}
                aria-label="Close image viewer"
            >
                <X size={24} strokeWidth={3} />
            </button>

            {/* Image container */}
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[90vh] w-auto h-auto object-contain border-8 border-white shadow-[12px_12px_0px_0px_#000]"
                        quality={100}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
