import React from "react";

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
    <div
        className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 relative ${className}`}
    >
        <div className="absolute -top-5 -left-5 bg-yellow-400 border-4 border-black w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {number}
        </div>
        <div className="mb-4 flex justify-between items-start pt-2">
            <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
            <Icon size={32} strokeWidth={2.5} className="text-red-500" />
        </div>
        <div className="font-medium text-lg leading-relaxed">{children}</div>
    </div>
);
