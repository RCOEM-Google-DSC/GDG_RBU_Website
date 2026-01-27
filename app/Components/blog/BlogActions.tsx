"use client";

import { useState } from "react";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";

interface BlogActionsProps {
    blogId: string;
    initialLikesCount: number;
}

export function BlogActions({ blogId, initialLikesCount }: BlogActionsProps) {
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLiking, setIsLiking] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = async () => {
        if (isLiking || hasLiked) return;

        try {
            setIsLiking(true);
            const response = await fetch(`/api/blogs/${blogId}/like`, {
                method: "POST",
            });

            if (response.ok) {
                setLikesCount((prev) => prev + 1);
                setHasLiked(true);
                toast.success("Liked!");
            } else {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                throw new Error(errorData.error || "Failed to like blog");
            }
        } catch (error: any) {
            console.error("Error liking blog:", error);
            toast.error(
                error.message || "Failed to like the blog. Please try again.",
            );
        } finally {
            setIsLiking(false);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy link to clipboard!");
        }
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={handleLike}
                disabled={isLiking || hasLiked}
                className={nb({
                    border: 3,
                    shadow: "sm",
                    hover: hasLiked ? undefined : "lift",
                    active: hasLiked ? undefined : "push",
                    className: `px-6 py-3 font-bold transition-colors ${hasLiked
                            ? "bg-red-100 text-red-600 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50"
                        }`,
                })}
            >
                {hasLiked ? "❤️" : "🤍"} {likesCount}
            </button>
            <button
                onClick={handleShare}
                className={nb({
                    border: 3,
                    shadow: "sm",
                    hover: "lift",
                    active: "push",
                    className:
                        "px-6 py-3 bg-black text-white hover:bg-gray-800 font-bold",
                })}
            >
                🔗 Share
            </button>
        </div>
    );
}
