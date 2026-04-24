"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import {
  Loader2,
  Eye,
  Upload,
  EyeOff,
  User,
  Pencil,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { BlogPreview } from "@/app/Components/blog/BlogPreview";
import { useRBAC } from "@/hooks/useRBAC";
import { formatDistanceToNow } from "date-fns";

interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
  image_url?: string;
}

interface UploadResponse {
  url?: string;
  secure_url?: string;
  transformed_url?: string | null;
  error?: string;
  details?: string;
}

interface MyBlog {
  id: string;
  title: string;
  image_url: string | null;
  markdown: string;
  published_at: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useRBAC();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [myBlogs, setMyBlogs] = useState<MyBlog[]>([]);
  const [loadingMyBlogs, setLoadingMyBlogs] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isBlogsExpanded, setIsBlogsExpanded] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    markdown: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchMyBlogs = async () => {
    setLoadingMyBlogs(true);
    try {
      const response = await fetch("/api/blogs/mine");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch your blogs");
      }

      setMyBlogs(result.blogs || []);
    } catch (error) {
      console.error("Error fetching my blogs:", error);
      toast.error("Failed to load your published blogs");
    } finally {
      setLoadingMyBlogs(false);
    }
  };

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
  }, [user, authLoading, supabase]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchMyBlogs();
    }
  }, [currentUser?.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "GDG_BLOG_COVERS");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = (await response.json().catch(() => ({}))) as UploadResponse;

      if (!response.ok) {
        throw new Error(
          data.details ||
            data.error ||
            `Upload failed (HTTP ${response.status})`,
        );
      }

      const uploadedUrl = data.url || data.secure_url || data.transformed_url;
      if (!uploadedUrl) {
        throw new Error("Upload did not return a valid image URL");
      }

      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image.";
      console.error("Image upload error:", error);
      toast.error(message);
    } finally {
      setUploadingImage(false);
      e.target.value = "";
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

  const resetForm = () => {
    setFormData({ imageUrl: "", title: "", markdown: "" });
    setErrors({});
    setEditingBlogId(null);
  };

  const handleEditBlog = (blog: MyBlog) => {
    setEditingBlogId(blog.id);
    setFormData({
      imageUrl: blog.image_url || "",
      title: blog.title,
      markdown: blog.markdown,
    });
    setShowPreview(true);
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

      const isEditing = Boolean(editingBlogId);
      const endpoint = isEditing
        ? `/api/blogs/${editingBlogId}`
        : "/api/blogs/create";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            (isEditing
              ? "Failed to update blog post"
              : "Failed to create blog post"),
        );
      }

      toast.success(
        isEditing
          ? "Blog post updated successfully!"
          : "Blog post created successfully!",
      );

      resetForm();
      await fetchMyBlogs();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : editingBlogId
            ? "Failed to update blog post"
            : "Failed to create blog post";
      console.error("Error saving blog:", error);
      toast.error(message);
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {editingBlogId ? "Edit Blog" : "Create New Blog"}
        </h1>
        <p className="text-gray-600 mt-2">
          {editingBlogId
            ? "Update your blog title, content, and cover image"
            : "Write and publish a new blog post to share with the community"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {currentUser.image_url ? (
                  <Image
                    height={48}
                    width={48}
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
                  <p className="font-semibold text-gray-900">
                    {currentUser.name}&apos;s Blogs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fetchMyBlogs}
                  disabled={loadingMyBlogs}
                >
                  {loadingMyBlogs ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <RefreshCw />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBlogsExpanded((prev) => !prev)}
                >
                  {isBlogsExpanded ? (
                    <>
                      <ChevronUp className=" h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <ChevronDown className=" h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {isBlogsExpanded &&
              (loadingMyBlogs ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading your blogs...
                </div>
              ) : myBlogs.length === 0 ? (
                <p className="text-sm text-gray-600">
                  You have not published any blogs yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {myBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {blog.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Published{" "}
                          {formatDistanceToNow(new Date(blog.published_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant={
                          editingBlogId === blog.id ? "default" : "outline"
                        }
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        {editingBlogId === blog.id ? "Editing" : "Edit"}
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 xl:col-span-4 h-fit">
            <h2 className="text-xl font-semibold text-gray-900">
              Blog Details
            </h2>

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

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
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
                  <Image
                    src={formData.imageUrl}
                    alt="Cover Preview"
                    width={1600}
                    height={900}
                    sizes="(max-width: 1280px) 100vw, 40vw"
                    className="w-full h-auto max-h-[60vh] rounded-lg border object-contain bg-gray-50"
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

          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 xl:col-span-8">
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
                  "font-mono text-sm resize-y min-h-[480px]",
                  errors.markdown && "border-red-500",
                )}
              />
              {errors.markdown && (
                <p className="text-sm text-red-500">{errors.markdown}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} className="px-8">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editingBlogId ? "Saving..." : "Publishing..."}
              </>
            ) : (
              <>
                {editingBlogId ? (
                  <Save className="mr-2 h-4 w-4" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {editingBlogId ? "Save Changes" : "Publish Blog"}
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>

          {editingBlogId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel Edit
            </Button>
          )}

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
