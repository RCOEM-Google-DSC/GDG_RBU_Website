import React from "react";
import { ArrowRight } from "lucide-react";

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center gap-4 mb-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {title}
        </h2>
        <ArrowRight size={40} strokeWidth={3} className="hidden md:block" />
    </div>
);
