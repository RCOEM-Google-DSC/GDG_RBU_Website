"use client";

import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { useState } from "react";
import { Plus, Trash2, Upload, X, Loader2 } from "lucide-react";
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
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";
import Image from "next/image";

import type { FormData } from "../schema";

interface ProjectsStepProps {
    form: UseFormReturn<FormData>;
    fieldArray: UseFieldArrayReturn<FormData, "projects">;
}

export function ProjectsStep({ form, fieldArray }: ProjectsStepProps) {
    const { fields, append, remove } = fieldArray;

    // Track upload state per project
    const [uploadingStates, setUploadingStates] = useState<
        Record<number, boolean>
    >({});
    const [uploadErrors, setUploadErrors] = useState<Record<number, string>>({});

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
        if (!validTypes.includes(file.type)) {
            setUploadErrors({
                ...uploadErrors,
                [index]:
                    "Invalid file type. Only JPEG, PNG, WEBP, and HEIC are allowed.",
            });
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setUploadErrors({
                ...uploadErrors,
                [index]: "File size exceeds 5MB limit",
            });
            return;
        }

        setUploadingStates({ ...uploadingStates, [index]: true });
        setUploadErrors({ ...uploadErrors, [index]: "" });

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/portfolio/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Upload failed");
            }

            const data = await response.json();
            form.setValue(`projects.${index}.image_url`, data.url);
        } catch (error) {
            console.error("Upload error:", error);
            setUploadErrors({
                ...uploadErrors,
                [index]: error instanceof Error ? error.message : "Upload failed",
            });
        } finally {
            setUploadingStates({ ...uploadingStates, [index]: false });
        }
    };

    const clearImage = (index: number) => {
        form.setValue(`projects.${index}.image_url`, "");
        setUploadErrors({ ...uploadErrors, [index]: "" });
    };

    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-2xl">Projects</CardTitle>
                <CardDescription className="text-lg">Showcase your best work</CardDescription>
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
                            <h4 className="font-medium">Project {index + 1}</h4>
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
                                name={`projects.${index}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="My Awesome Project"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`projects.${index}.image_url`}
                                render={({ field }) => {
                                    const currentImageUrl = form.watch(
                                        `projects.${index}.image_url`,
                                    );
                                    const isUploading = uploadingStates[index] || false;
                                    const uploadError = uploadErrors[index] || "";

                                    return (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Project Image</FormLabel>
                                            <FormControl>
                                                <div className="space-y-3">
                                                    {/* Image Preview */}
                                                    {currentImageUrl && (
                                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-black">
                                                            <Image
                                                                src={currentImageUrl}
                                                                alt={`Project ${index + 1} preview`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => clearImage(index)}
                                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                                                aria-label="Remove image"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Upload Button */}
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={isUploading}
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(
                                                                        `project-image-upload-${index}`,
                                                                    )
                                                                    ?.click()
                                                            }
                                                            className={nb({ border: 2 })}
                                                        >
                                                            {isUploading ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                    Uploading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    Upload Image
                                                                </>
                                                            )}
                                                        </Button>
                                                        <input
                                                            id={`project-image-upload-${index}`}
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/heic"
                                                            onChange={(e) => handleImageUpload(e, index)}
                                                            className="hidden"
                                                        />
                                                    </div>

                                                    {/* Error Message */}
                                                    {uploadError && (
                                                        <p className="text-sm text-red-600 font-medium">
                                                            {uploadError}
                                                        </p>
                                                    )}

                                                    {/* URL Input (Alternative) */}
                                                    <div className="space-y-1">
                                                        <p className="text-xs text-muted-foreground">
                                                            Or enter an image URL:
                                                        </p>
                                                        <Input
                                                            placeholder="https://..."
                                                            {...field}
                                                            value={field.value || ""}
                                                            disabled={isUploading}
                                                        />
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Upload a project screenshot or enter a URL (max 5MB)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name={`projects.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your project..."
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name={`projects.${index}.github_url`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://github.com/..."
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`projects.${index}.live_url`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Live URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://..."
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                            title: "",
                            description: "",
                            image_url: "",
                            github_url: "",
                            live_url: "",
                            technologies: [],
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
                    Add Project
                </Button>
            </CardContent>
        </Card>
    );
}
