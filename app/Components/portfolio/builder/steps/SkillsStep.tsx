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
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";
import { Code2, Layers, Wrench } from "lucide-react";

import { SkillsCombobox } from "../SkillsCombobox";
import type { FormData } from "../schema";

interface SkillsStepProps {
    form: UseFormReturn<FormData>;
}

export function SkillsStep({ form }: SkillsStepProps) {
    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-xl">Skills & Technologies</CardTitle>
                <CardDescription className="text-lg">
                    Organize your skills into Languages, Frameworks, and Tools
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Languages */}
                <FormField
                    control={form.control}
                    name="portfolio.languages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <Code2 className="w-5 h-5 text-blue-600" />
                                Programming Languages
                            </FormLabel>
                            <FormDescription>
                                Select the programming languages you're proficient in
                            </FormDescription>
                            <FormControl>
                                <SkillsCombobox
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Search and select languages..."
                                    category="languages"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Frameworks */}
                <FormField
                    control={form.control}
                    name="portfolio.frameworks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <Layers className="w-5 h-5 text-purple-600" />
                                Frameworks & Libraries
                            </FormLabel>
                            <FormDescription>
                                Select the frameworks and libraries you work with
                            </FormDescription>
                            <FormControl>
                                <SkillsCombobox
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Search and select frameworks..."
                                    category="frameworks"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tools */}
                <FormField
                    control={form.control}
                    name="portfolio.tools"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <Wrench className="w-5 h-5 text-orange-600" />
                                Tools & Platforms
                            </FormLabel>
                            <FormDescription>
                                Select the tools, platforms, and technologies you use
                            </FormDescription>
                            <FormControl>
                                <SkillsCombobox
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Search and select tools..."
                                    category="tools"
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
