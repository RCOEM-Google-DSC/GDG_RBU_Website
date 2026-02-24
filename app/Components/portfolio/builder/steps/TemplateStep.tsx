"use client";

import { UseFormReturn } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

import { TemplateSelector } from "../TemplateSelector";
import type { FormData } from "../helpers/schema";
import type { PortfolioTemplate } from "@/lib/types";

interface TemplateStepProps {
    form: UseFormReturn<FormData>;
    templates: PortfolioTemplate[];
    onSave?: (publish?: boolean) => void;
    isSaving?: boolean;
}

export function TemplateStep({
    form,
    templates,
    onSave,
    isSaving,
}: TemplateStepProps) {
    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-xl">Choose a Template</CardTitle>
                <CardDescription className="text-lg">
                    Select a template for your portfolio. You can change this later.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="portfolio.template_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <TemplateSelector
                                    templates={templates}
                                    selectedId={field.value}
                                    onSelect={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4 border-t-2 border-zinc-100">
                    <Button
                        type="button"
                        onClick={() => onSave?.(false)}
                        disabled={isSaving}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: "bg-blue-500 text-white hover:bg-blue-600",
                        })}
                    >
                        {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Progress
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
