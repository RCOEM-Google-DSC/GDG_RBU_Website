"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { nb } from "@/components/ui/neo-brutalism";

interface Step {
    id: number;
    title: string;
    description?: string;
}

interface FormStepperProps {
    steps: readonly Step[];
    currentStep: number;
    onStepClick?: (step: number) => void;
    className?: string;
}

export function FormStepper({
    steps,
    currentStep,
    onStepClick,
    className,
}: FormStepperProps) {
    return (
        <nav aria-label="Progress" className={cn("overflow-x-auto pb-4 lg:pb-0", className)}>
            <ol className="flex lg:flex-col gap-4 lg:gap-6 min-w-max lg:min-w-0 px-1 lg:px-0">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <li key={step.id} className="relative flex-1 lg:flex-none">
                            {/* Connector line - Vertical for LG, Horizontal for mobile */}
                            {index < steps.length - 1 && (
                                <>
                                    {/* Desktop Vertical Line */}
                                    <div
                                        className={cn(
                                            "hidden lg:block absolute left-5 top-10 w-1 h-12 border-l-4 border-black",
                                            isCompleted ? "bg-primary" : "bg-gray-300",
                                        )}
                                        aria-hidden="true"
                                    />
                                    {/* Mobile Horizontal Line */}
                                    <div
                                        className={cn(
                                            "lg:hidden absolute left-[50%] top-5 w-full h-1 border-t-4 border-black z-0",
                                            isCompleted ? "bg-primary" : "bg-gray-300",
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => onStepClick?.(step.id)}
                                disabled={!onStepClick}
                                className={cn(
                                    "relative flex lg:items-start gap-4 group w-full text-left z-10",
                                    onStepClick && "cursor-pointer hover:opacity-80",
                                    "flex-col lg:flex-row items-center lg:items-start text-center lg:text-left",
                                )}
                            >
                                {/* Step Circle */}
                                <span
                                    className={cn(
                                        nb({
                                            border: 3,
                                            shadow: isCurrent ? "md" : "sm",
                                            className:
                                                "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all shrink-0",
                                        }),
                                        isCompleted && "bg-green-400 text-black",
                                        isCurrent && "bg-blue-400 text-black scale-110",
                                        !isCompleted && !isCurrent && "bg-white text-gray-600",
                                    )}
                                >
                                    {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                                </span>

                                <div className="flex-1 min-w-0 pt-1">
                                    {/* Step Title */}
                                    <span
                                        className={cn(
                                            "block text-xs lg:text-sm font-bold truncate max-w-[80px] lg:max-w-none",
                                            isCurrent && "text-blue-600",
                                            !isCurrent && "text-gray-600",
                                        )}
                                    >
                                        {step.title}
                                    </span>

                                    {/* Step Description (optional) - Hidden on mobile */}
                                    {step.description && (
                                        <span className="hidden lg:block mt-0.5 text-xs text-muted-foreground">
                                            {step.description}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
