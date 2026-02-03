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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";

import type { FormData } from "../schema";

interface ExperienceStepProps {
    form: UseFormReturn<FormData>;
    fieldArray: UseFieldArrayReturn<FormData, "experience">;
}

export function ExperienceStep({ form, fieldArray }: ExperienceStepProps) {
    const { fields, append, remove } = fieldArray;

    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-2xl">Experience</CardTitle>
                <CardDescription className="text-lg">
                    Add your work and professional experience
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            className: " p-4 space-y-4",
                        })}
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                className={nb({
                                    border: 2,
                                    shadow: "xs",
                                    hover: "lift",
                                    active: "push",
                                    className: "bg-red-100 hover:bg-red-200",
                                })}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name={`experience.${index}.company`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`experience.${index}.role`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Software Engineer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name={`experience.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your responsibilities..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className=" flex flex-col">
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* start date */}
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.start_date`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* end date */}
                                <div className="space-y-2">
                                    {!form.watch(`experience.${index}.is_current`) && (
                                        <FormField
                                            control={form.control}
                                            name={`experience.${index}.end_date`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name={`experience.${index}.is_current`}
                                render={({ field }) => (
                                    <FormItem className="self-end flex flex-row items-center space-x-2 space-y-0 mt-8">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            I currently work here
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            company: "",
                            role: "",
                            description: "",
                            start_date: "",
                            end_date: "",
                            is_current: false,
                        })
                    }
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className: "",
                    })}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                </Button>
            </CardContent>
        </Card>
    );
}
