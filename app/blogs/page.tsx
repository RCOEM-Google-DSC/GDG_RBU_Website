"use client";
import { useEffect, useState } from "react";
import { BlogHeader } from "@/app/Components/blog/BlogHeader";
import { BlogList } from "@/app/Components/blog/BlogList";
import type { Blog } from "@/lib/types";
import Footer from "../Components/Landing/Footer";

type FilterType = "all" | "recent";

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
		const sorted = [...blogs];

		switch (filter) {
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
		<div className="min-h-screen bg-gray-50 pt-12">
			<div className="max-w-7xl mx-auto mb-20 px-4 lg:px-8 sm:px-6">
				<BlogHeader filter={filter} onFilterChange={setFilter} />
				<BlogList blogs={filteredBlogs} loading={loading} />
			</div>
			<Footer />
		</div>
	);
}
