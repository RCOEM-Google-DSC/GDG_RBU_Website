"use client";

import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";

import { PlatformSelector } from "../PlatformSelector";
import type { FormData } from "../schema";

interface SocialLinksStepProps {
    form: UseFormReturn<FormData>;
    fieldArray: UseFieldArrayReturn<FormData, "social_links">;
    usedPlatforms: string[];
}

export function SocialLinksStep({
    form,
    fieldArray,
    usedPlatforms,
}: SocialLinksStepProps) {
    const { fields, append, remove } = fieldArray;

    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-2xl">Social Links</CardTitle>
                <CardDescription className="text-lg">
                    Add links to your social profiles and websites
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <FormField
                            control={form.control}
                            name={`social_links.${index}.platform`}
                            render={({ field }) => (
                                <FormItem className="w-full md:w-48 shrink-0">
                                    <FormControl>
                                        <PlatformSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabledPlatforms={usedPlatforms.filter(
                                                (p, i) => i !== index,
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`social_links.${index}.url`}
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full">
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className={nb({
                                border: 2,
                                shadow: "xs",
                                hover: "lift",
                                active: "push",
                                className: "bg-red-100 hover:bg-red-200 self-end md:self-auto",
                            })}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            platform: "",
                            url: "",
                        })
                    }
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className: "w-full md:w-auto",
                    })}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Social Link
                </Button>
            </CardContent>
        </Card>
    );
}
