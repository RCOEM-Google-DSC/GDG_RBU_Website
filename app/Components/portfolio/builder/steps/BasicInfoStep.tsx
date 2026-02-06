"use client";

import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { nb } from "@/components/ui/neo-brutalism";
import {
    Upload,
    X,
    Loader2,
    User,
    Image as ImageIcon,
    FileText,
    Save,
} from "lucide-react";
import Image from "next/image";

import type { FormData } from "../helpers/schema";

interface BasicInfoStepProps {
    form: UseFormReturn<FormData>;
    onSave?: (publish?: boolean) => void;
    isSaving?: boolean;
}

export function BasicInfoStep({ form, onSave, isSaving }: BasicInfoStepProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
        if (!validTypes.includes(file.type)) {
            setUploadError(
                "Invalid file type. Only JPEG, PNG, WEBP, and HEIC are allowed.",
            );
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setUploadError("File size exceeds 5MB limit");
            return;
        }

        setIsUploading(true);
        setUploadError(null);

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
            form.setValue("portfolio.profile_image_url", data.url);
        } catch (error) {
            console.error("Upload error:", error);
            setUploadError(error instanceof Error ? error.message : "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const clearImage = () => {
        form.setValue("portfolio.profile_image_url", "");
        setUploadError(null);
    };

    const currentImageUrl = form.watch("portfolio.profile_image_url");

    return (
        <Card className={nb({ border: 4, shadow: "lg", className: "bg-white" })}>
            <CardHeader>
                <CardTitle className="text-2xl">Basic Information</CardTitle>
                <CardDescription className="text-lg">
                    Tell us about yourself
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="portfolio.display_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <User className="w-5 h-5 text-blue-600" />
                                Display Name *
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="portfolio.profile_image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <ImageIcon className="w-5 h-5 text-green-600" />
                                Profile Image
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    {/* Image Preview */}
                                    {currentImageUrl && (
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-4 border-black">
                                            <Image
                                                src={currentImageUrl}
                                                alt="Profile preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                                            disabled={isUploading}
                                            onClick={() =>
                                                document.getElementById("profile-image-upload")?.click()
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
                                            id="profile-image-upload"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/heic"
                                            onChange={handleImageUpload}
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
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Or enter an image URL:
                                        </p>
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            {...field}
                                            value={field.value || ""}
                                            disabled={isUploading}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Upload a profile picture or enter a URL (max 5MB,
                                JPEG/PNG/WEBP/HEIC)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="portfolio.about_me"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base">
                                <FileText className="w-5 h-5 text-purple-600" />
                                About Me
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell visitors about yourself..."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Write a brief introduction about yourself (max 2000 characters)
                            </FormDescription>
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
