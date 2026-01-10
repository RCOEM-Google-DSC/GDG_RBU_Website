import React from "react";
import { CopyButton } from "../Reusables/CopyButton";

export const CommandBlock: React.FC<{ command: string; label?: string }> = ({
    command,
    label,
}) => (
    <div className="relative group w-full">
        {label && (
            <div className="inline-block bg-black text-white px-2 py-0.5 text-xs font-bold uppercase mb-1 transform -rotate-1">
                {label}
            </div>
        )}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm border-4 border-black shadow-[6px_6px_0px_0px_#8338ec] relative">
            <div className="flex items-baseline gap-2">
                <span className="select-none text-gray-500">$</span>
                <div className="whitespace-pre-wrap wrap-break-word flex-1 min-w-0 pr-12">
                    {command}
                </div>
            </div>
            <CopyButton text={command} />
        </div>
    </div>
);
