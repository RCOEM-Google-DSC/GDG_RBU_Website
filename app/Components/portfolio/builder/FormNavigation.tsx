"use client";

import { Button } from "@/components/ui/button";
import { nb } from "@/components/ui/neo-brutalism";
import { STEPS } from "./constants";

import { Eye, Loader2 } from "lucide-react";

interface FormNavigationProps {
    currentStep: number;
    onPrevious: () => void;
    onNext: () => void;
    onPreview?: () => void;
    isGeneratingPreview?: boolean;
}

export function FormNavigation({
    currentStep,
    onPrevious,
    onNext,
    onPreview,
    isGeneratingPreview,
}: FormNavigationProps) {
    const isLastStep = currentStep === STEPS.length;

    return (
        <div className="flex justify-between">
            <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 1}
                className={nb({
                    border: 3,
                    shadow: "md",
                    hover: "lift",
                    active: "push",
                    className: "",
                })}
            >
                Previous
            </Button>
            <Button
                type="button"
                onClick={isLastStep ? onPreview : onNext}
                disabled={isLastStep ? isGeneratingPreview : false}
                className={nb({
                    border: 3,
                    shadow: "md",
                    hover: "lift",
                    active: "push",
                    className: "",
                })}
            >
                {isLastStep ? (
                    <>
                        {isGeneratingPreview ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Eye className="mr-2 h-4 w-4" />
                        )}
                        Preview
                    </>
                ) : (
                    "Next"
                )}
            </Button>
        </div>
    );
}
