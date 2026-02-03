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

import { TemplateSelector } from "../TemplateSelector";
import type { FormData } from "../schema";
import type { PortfolioTemplate } from "@/lib/types";

interface TemplateStepProps {
    form: UseFormReturn<FormData>;
    templates: PortfolioTemplate[];
}

export function TemplateStep({ form, templates }: TemplateStepProps) {
    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-xl">Choose a Template</CardTitle>
                <CardDescription className="text-lg">
                    Select a template for your portfolio. You can change this later.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
}
