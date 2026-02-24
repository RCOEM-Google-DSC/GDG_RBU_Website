import React from "react";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

type StepCardProps = {
    number: React.ReactNode;
    title: string;
    icon: React.ComponentType<any>;
    children?: React.ReactNode;
    className?: string;
};

export const StepCard: React.FC<StepCardProps> = ({
    number,
    title,
    icon: Icon,
    children,
    className = "",
}) => (
    <NeoBrutalism
        border={4}
        shadow="xl"
        className={`bg-white p-6 relative ${className}`}
    >
        <NeoBrutalism
            border={4}
            shadow="md"
            className="absolute -top-5 -left-5 bg-yellow-400 w-12 h-12 flex items-center justify-center font-black text-2xl"
        >
            {number}
        </NeoBrutalism>
        <div className="mb-4 flex justify-between items-start pt-2">
            <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
            <Icon size={32} strokeWidth={2.5} className="text-red-500" />
        </div>
        <div className="font-medium text-lg leading-relaxed">{children}</div>
    </NeoBrutalism>
);

