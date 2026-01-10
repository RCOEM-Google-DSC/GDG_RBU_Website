"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import Image from "next/image"
type LightboxProps = {
    open: boolean;
    src: string;
    onClose: () => void;
};

export const Lightbox: React.FC<LightboxProps> = ({ open, src, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Reset loading state when lightbox opens with new image
    React.useEffect(() => {
        if (open) {
            setImageLoaded(false);
        }
    }, [open, src]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

            <div
                className="relative z-10 max-w-[95vw] max-h-[90vh] bg-white border-4 border-black p-2 shadow-[10px_10px_0px_0px_#ffbe0b] cursor-default animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
                style={{ minWidth: imageLoaded ? 'auto' : '300px', minHeight: imageLoaded ? 'auto' : '300px' }}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-6 -right-6 bg-red-500 text-white border-4 border-black p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none active:translate-y-2 active:shadow-none transition-all z-20"
                    title="Close"
                >
                    <X size={32} strokeWidth={4} />
                </button>

                <div className="relative w-full h-full bg-gray-100 flex flex-col">
                    <div className="flex items-center justify-center bg-[#1a1a1a] p-4 border-b-4 border-black relative">
                        {!imageLoaded && (
                            <span className="font-black text-white text-lg uppercase tracking-wider">Loading...</span>
                        )}
                        <Image
                            width={2048}
                            height={2048}
                            src={src}
                            alt={`Screenshot`}
                            className={`max-w-full max-h-[82vh] w-auto h-auto object-contain shadow-2xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                            quality={100}
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
