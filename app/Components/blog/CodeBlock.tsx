"use client";

import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export const CodeBlock = ({
    node,
    inline,
    className,
    children,
    ...props
}: any) => {
    const [isCopied, setIsCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState<string>("");
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const codeContent = String(children).replace(/\n$/, "");

    useEffect(() => {
        if (!inline && language) {
            try {
                // Check if language is registered
                const lang = hljs.getLanguage(language);
                if (lang) {
                    const highlighted = hljs.highlight(codeContent, { language }).value;
                    setHighlightedCode(highlighted);
                } else {
                    // Language not registered, use auto-detect
                    const highlighted = hljs.highlightAuto(codeContent).value;
                    setHighlightedCode(highlighted);
                }
            } catch {
                // Fallback to auto-detect on any error
                const highlighted = hljs.highlightAuto(codeContent).value;
                setHighlightedCode(highlighted);
            }
        } else if (!inline) {
            // No language specified, use auto-detect
            setHighlightedCode(hljs.highlightAuto(codeContent).value);
        } else {
            setHighlightedCode(codeContent);
        }
    }, [codeContent, language, inline]);

    const lines = highlightedCode.split("\n");

    return !inline && match ? (
        <div className="relative group my-8">
            {/* Language Badge */}
            <div className="absolute -top-3 left-4 bg-[#1e1e1e] text-[#d4d4d4] px-3 py-1 text-xs font-bold uppercase tracking-wider z-10 border-2 border-[#3c3c3c] rounded-sm shadow-sm select-none">
                {language}
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-[#1e1e1e]/80 hover:bg-[#1e1e1e] text-gray-400 hover:text-white rounded-md transition-all opacity-0 group-hover:opacity-100 z-20 border border-[#3c3c3c] backdrop-blur-sm cursor-pointer"
                aria-label="Copy code"
            >
                {isCopied ? (
                    <Check size={16} className="text-green-500" />
                ) : (
                    <Copy size={16} />
                )}
            </button>

            <div
                className="overflow-x-auto rounded-lg bg-[#282c34] code-scrollbar"
                style={{
                    border: "4px solid black",
                    boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                }}
            >
                <table
                    className="w-full border-collapse bg-[#282c34]"
                    style={{ tableLayout: "auto", backgroundColor: "#282c34" }}
                >
                    <tbody className="bg-[#282c34]">
                        {lines.map((line, index) => (
                            <tr key={index} className="leading-relaxed ">
                                <td
                                    className="text-right pr-4 pl-4 select-none text-[#636d83] text-sm "
                                    style={{
                                        width: "1%",
                                        whiteSpace: "nowrap",
                                        userSelect: "none",
                                        paddingTop: index === 0 ? "1.5rem" : "0.25rem",
                                        paddingBottom:
                                            index === lines.length - 1 ? "1.5rem" : "0.25rem",
                                    }}
                                >
                                    {index + 1}
                                </td>
                                <td
                                    className="pr-4 pl-4 bg-[#282c34]"
                                    style={{
                                        paddingTop: index === 0 ? "1.5rem" : "0.25rem",
                                        paddingBottom:
                                            index === lines.length - 1 ? "1.5rem" : "0.25rem",
                                    }}
                                >
                                    <code
                                        className="hljs"
                                        style={{
                                            fontFamily:
                                                "'Fira Code', 'Consolas', 'Monaco', monospace",
                                            fontSize: "0.95rem",
                                            background: "transparent",
                                            padding: 0,
                                            whiteSpace: "pre",
                                        }}
                                        dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <code
            className="bg-[#282c34] text-[#e06c75] px-2 py-0.5 rounded border-2 border-black font-mono text-sm font-bold mx-1"
            {...props}
        >
            {children}
        </code>
    );
};
