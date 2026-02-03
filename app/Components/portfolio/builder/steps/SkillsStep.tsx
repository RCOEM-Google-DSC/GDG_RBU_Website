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
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";

import { SkillsCombobox } from "../SkillsCombobox";
import type { FormData } from "../schema";

interface SkillsStepProps {
    form: UseFormReturn<FormData>;
}

export function SkillsStep({ form }: SkillsStepProps) {
    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
                <CardDescription className="text-lg">
                    Add your technical and professional skills
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                    control={form.control}
                    name="portfolio.skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Skills</FormLabel>
                            <FormControl>
                                <SkillsCombobox value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}
