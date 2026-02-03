"use client";

import { useState } from "react";
import { Save, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";

import type { FormData } from "./schema";

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
        <div className="flex items-center justify-between gap-12">
            <div>
                <h1 className="text-5xl font-bold font-retron">
                    {isEditing ? "Edit Portfolio" : "Create Portfolio"}
                </h1>
                <p className="text-muted-foreground text-xl mt-3">
                    Build your professional portfolio in a few simple steps
                </p>
            </div>
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={onPreview} // Changed from handlePreview to onPreview to match props
                    disabled={isGeneratingPreview || !formData.portfolio.template_id}
                    className={nb({
                        border: 3,
                        shadow: "sm",
                        hover: "lift",
                        active: "push",
                        className: "bg-white hover:bg-zinc-50 text-black",
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
                        className: "bg-amber-300 hover:bg-amber-400 text-black",
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
                        className: "bg-green-400 hover:bg-green-500 text-black",
                    })}
                >
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Publish
                </Button>
            </div>
        </div>
    );
}
