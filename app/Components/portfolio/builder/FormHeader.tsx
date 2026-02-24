"use client";

import { Save, Eye, Loader2, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nb } from "@/components/ui/neo-brutalism";

import type { FormData } from "./helpers/schema";

interface FormHeaderProps {
    isEditing: boolean;
    isSaving: boolean;
    isGeneratingPreview: boolean;
    formData: FormData;
    onSaveDraft: () => void;
    onPublish: () => void;
    onPreview: () => void;
}

export function FormHeader({
    isEditing,
    isSaving,
    isGeneratingPreview,
    formData,
    onSaveDraft,
    onPublish,
    onPreview,
}: FormHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold font-retron">
                    {isEditing ? "Edit Portfolio" : "Create Portfolio"}
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl mt-3">
                    Build your professional portfolio in a few simple steps
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button
                    variant="outline"
                    onClick={onPreview} // Changed from handlePreview to onPreview to match props
                    disabled={isGeneratingPreview || !formData.portfolio.template_id}
                    className={nb({
                        border: 3,
                        shadow: "sm",
                        hover: "lift",
                        active: "push",
                        className:
                            "bg-white hover:bg-zinc-50 text-black flex-1 md:flex-none",
                    })}
                >
                    {isGeneratingPreview ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Eye className="mr-2 h-4 w-4" />
                    )}
                    Preview
                </Button>
                <Button
                    variant="outline"
                    onClick={onSaveDraft}
                    disabled={isSaving}
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className:
                            "bg-amber-300 hover:bg-amber-400 text-black flex-1 md:flex-none",
                    })}
                >
                    {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Draft
                </Button>
                <Button
                    onClick={onPublish}
                    disabled={isSaving}
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className:
                            "bg-green-400 hover:bg-green-500 text-black flex-1 md:flex-none",
                    })}
                >
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    <CircleCheckBig />
                    Publish
                </Button>
            </div>
        </div>
    );
}
