"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { nb } from "@/components/ui/neo-brutalism";
import type { PortfolioTemplate } from "@/lib/types";
import { Check } from "lucide-react";
import Image from "next/image";

interface TemplateSelectorProps {
    templates: PortfolioTemplate[];
    selectedId: string | null;
    onSelect: (templateId: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export function TemplateSelector({
    templates,
    selectedId,
    onSelect,
    isLoading = false,
    disabled = false,
    className,
}: TemplateSelectorProps) {
    if (isLoading) {
        return (
            <div
                className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
            >
                {[1, 2, 3].map((i) => (
                    <Card
                        key={i}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            className: "overflow-hidden bg-white",
                        })}
                    >
                        <Skeleton className="h-40 w-full" />
                        <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className={cn("text-center py-8", className)}>
                <p className="text-muted-foreground">No templates available yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Templates will be added soon.
                </p>
            </div>
        );
    }

    return (
        <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
            {templates.map((template) => {
                const isSelected = selectedId === template.id;
                return (
                    <Card
                        key={template.id}
                        className={cn(
                            nb({
                                border: 4,
                                shadow: isSelected ? "xl" : "md",
                                hover: "lift",
                                active: "push",
                                className:
                                    "overflow-hidden cursor-pointer transition-all relative",
                            }),
                            isSelected && " scale-105",
                            !isSelected && "bg-white hover:bg-gray-50",
                            disabled && "opacity-60 cursor-not-allowed",
                        )}
                        onClick={() => !disabled && onSelect(template.id)}
                    >
                        {isSelected && (
                            <div
                                className={nb({
                                    border: 3,
                                    shadow: "sm",
                                    className:
                                        "absolute top-3 right-3 z-10 bg-green-400 rounded-full p-2",
                                })}
                            >
                                <Check className="h-5 w-5 text-black font-bold" />
                            </div>
                        )}

                        {/* Template Preview Image */}
                        <div className="relative h-40 bg-muted border-b-4 border-black">
                            <Image
                                src={`/templates/${template.id}/thumbnail.png`}
                                alt={template.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    // Fallback to gradient with first letter if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                }}
                            />
                            {/* Fallback gradient background */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-linear-to-br from-purple-200 to-pink-200 -z-10">
                                <span className="text-6xl font-black opacity-30">
                                    {template.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black">
                                {template.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-medium text-gray-700 line-clamp-2">
                                {template.description || "A beautiful portfolio template"}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

interface TemplateSelectorWithConfirmProps extends TemplateSelectorProps {
    onConfirm: () => void;
    confirmText?: string;
}

export function TemplateSelectorWithConfirm({
    onConfirm,
    confirmText = "Continue with selected template",
    ...props
}: TemplateSelectorWithConfirmProps) {
    return (
        <div className="space-y-6">
            <TemplateSelector {...props} />

            {props.selectedId && (
                <div className="flex justify-end">
                    <Button onClick={onConfirm} size="lg">
                        {confirmText}
                    </Button>
                </div>
            )}
        </div>
    );
}
