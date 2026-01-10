"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            try {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (e) {
            }
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="absolute top-1/2 -translate-y-1/2 right-2 p-2 "
            title="Copy command"
            aria-label="Copy command"
        >
            {copied ? (
                <Check size={16} strokeWidth={3} className="text-white hover:text-gray-500" />
            ) : (
                <Copy size={16} strokeWidth={3} className="text-white hover:text-gray-500" />
            )}
        </button>
    );
};
