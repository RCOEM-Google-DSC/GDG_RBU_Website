"use client";
import { BlogHeader } from "@/app/Components/blog/BlogHeader";
import { BlogList } from "@/app/Components/blog/BlogList";
import { Blog } from "@/lib/types";
import { useState, useEffect } from "react";

type FilterType = "all" | "most-liked" | "recent";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>("all");

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                const response = await fetch("/api/blogs");

                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                const data = await response.json();
                setBlogs(data.blogs || []);
                setFilteredBlogs(data.blogs || []);
            } catch (blogError) {
                setError("Failed to load blogs.");
                return;
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        let sorted = [...blogs];

        switch (filter) {
            case "most-liked":
                sorted.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
                break;
            case "recent":
                sorted.sort(
                    (a, b) =>
                        new Date(b.published_at).getTime() -
                        new Date(a.published_at).getTime(),
                );
                break;
            case "all":
            default:
                break;
        }

        setFilteredBlogs(sorted);
    }, [filter, blogs]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <BlogHeader filter={filter} onFilterChange={setFilter} />
                <BlogList blogs={filteredBlogs} loading={loading} />
            </div>
        </div>
    );
}
