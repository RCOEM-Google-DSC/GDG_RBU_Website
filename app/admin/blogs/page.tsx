"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, Upload, EyeOff, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { BlogPreview } from "@/app/Components/blog/BlogPreview";
import { useRBAC } from "@/hooks/useRBAC";

interface CurrentUser {
    id: string;
    email: string;
    name: string;
    role: string;
    image_url?: string;
}

export default function CreateBlogPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useRBAC();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [showPreview, setShowPreview] = useState(true);
    const supabase = createClient();

    // Form state
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        markdown: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fetch current user details
    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (!user?.id) {
                setLoadingUser(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("id, email, name, role, image_url")
                    .eq("id", user.id)
                    .single();

                if (error) throw error;
                setCurrentUser(data);
            } catch (error) {
                console.error("Error fetching current user:", error);
                toast.error("Failed to load user information");
            } finally {
                setLoadingUser(false);
            }
        };

        if (!authLoading) {
            fetchCurrentUser();
        }
    }, [user, authLoading]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setFormData((prev) => ({ ...prev, imageUrl: data.url }));
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setUploadingImage(false);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!currentUser?.email)
            newErrors.author = "You must be logged in to create a blog";
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.markdown.trim()) newErrors.markdown = "Content is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const payload = {
                writerEmail: currentUser!.email,
                imageUrl: formData.imageUrl || undefined,
                title: formData.title,
                markdown: formData.markdown,
                publishedAt: new Date().toISOString(),
            };

            const response = await fetch("/api/blogs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to create blog post");
            }

            toast.success("Blog post created successfully!");
            router.push("/blogs");
        } catch (error: any) {
            console.error("Error creating blog:", error);
            toast.error(error.message || "Failed to create blog post");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loadingUser) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-semibold">
                        You must be logged in to create blog posts.
                    </p>
                    <Button onClick={() => router.push("/login")} className="mt-4">
                        Go to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
                <p className="text-gray-600 mt-2">
                    Write and publish a new blog post to share with the community
                </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Author Info (Read-only) */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Author</h2>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {currentUser.image_url ? (
                            <img
                                src={currentUser.image_url}
                                alt={currentUser.name}
                                className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-600" />
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-900">{currentUser.name}</p>
                            <p className="text-sm text-gray-600">{currentUser.email}</p>
                        </div>
                    </div>
                </div>

                {/* Blog Details */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Blog Details</h2>

                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter a compelling blog title"
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Cover Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="coverImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="cursor-pointer"
                            />
                            {uploadingImage && (
                                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                            )}
                        </div>
                        {formData.imageUrl && (
                            <div className="mt-2 relative group">
                                <img
                                    src={formData.imageUrl}
                                    alt="Cover Preview"
                                    className="w-full h-40 object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, imageUrl: "" }))
                                    }
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            Or paste an image URL directly:
                        </p>
                        <Input
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>

                {/* Markdown Content */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Content (Markdown)
                    </h2>

                    <div className="space-y-2">
                        <Textarea
                            id="markdown"
                            name="markdown"
                            value={formData.markdown}
                            onChange={handleInputChange}
                            placeholder={`# Your Blog Title

Write your blog content here using **Markdown** syntax.

## Features you can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- \`inline code\`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- And more!

\`\`\`javascript
// Code blocks are fully supported!
const greeting = "Hello World!";
console.log(greeting);
\`\`\`
`}
                            rows={20}
                            className={cn(
                                "font-mono text-sm resize-y min-h-[300px]",
                                errors.markdown && "border-red-500",
                            )}
                        />
                        {errors.markdown && (
                            <p className="text-sm text-red-500">{errors.markdown}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* publish button */}
                    <Button type="submit" disabled={loading} className="px-8">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Publish Blog
                            </>
                        )}
                    </Button>
                    {/* cancel button */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    {/* preview toggle button */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                        className="ml-auto"
                    >
                        {showPreview ? (
                            <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide Preview
                            </>
                        ) : (
                            <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show Preview
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {/* Live Preview Section */}
            {showPreview && (
                <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Live Preview</h2>

                    <BlogPreview
                        title={formData.title}
                        imageUrl={formData.imageUrl}
                        markdown={formData.markdown}
                        authorName={currentUser.name}
                        authorImageUrl={currentUser.image_url}
                    />
                </div>
            )}
        </div>
    );
}
