import React from "react";
import { ArrowRight } from "lucide-react";
import { nb } from "@/components/ui/neo-brutalism";

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center gap-4 mb-10">
        <h2 className={nb({
            border: 4,
            shadow: "lg",
            className: "text-4xl md:text-5xl font-black uppercase bg-white px-6 py-2"
        })}>
            {title}
        </h2>
        <ArrowRight size={40} strokeWidth={3} className="hidden md:block" />
    </div>
);
