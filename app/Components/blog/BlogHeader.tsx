"use client";

import { nb } from "@/components/ui/neo-brutalism";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

type FilterType = "all" | "most-liked" | "recent";

interface BlogHeaderProps {
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function BlogHeader({ filter, onFilterChange }: BlogHeaderProps) {
    return (
        <div className="mb-12">
            <NeoBrutalism
                border={4}
                shadow="xl"
                className="bg-white p-12 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-black mb-4 font-retron">
                    GDG Blogs
                </h1>
                <p className="text-lg md:text-xl font-medium text-gray-700">
                    Insights, tutorials, and stories from our community
                </p>
            </NeoBrutalism>

            {/* Filter/Sort Bar */}
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3">
                    <button
                        onClick={() => onFilterChange("all")}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: `px-6 py-3 font-bold ${filter === "all"
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-50"
                                }`,
                        })}
                    >
                        All Posts
                    </button>
                    <button
                        onClick={() => onFilterChange("most-liked")}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: `px-6 py-3 font-bold ${filter === "most-liked"
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-50"
                                }`,
                        })}
                    >
                        Most Liked
                    </button>
                    <button
                        onClick={() => onFilterChange("recent")}
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: `px-6 py-3 font-bold ${filter === "recent"
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-50"
                                }`,
                        })}
                    >
                        Recent
                    </button>
                </div>
            </div>
        </div>
    );
}
