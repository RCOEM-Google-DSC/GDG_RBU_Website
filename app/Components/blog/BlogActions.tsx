"use client";

import { useState, useEffect } from "react";
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
    const [checkingLikeStatus, setCheckingLikeStatus] = useState(true);

    // Check if user has already liked this blog on mount
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await fetch(`/api/blogs/${blogId}/has-liked`);
                if (response.ok) {
                    const data = await response.json();
                    setHasLiked(data.hasLiked);
                }
            } catch (error) {
                console.error("Error checking like status:", error);
            } finally {
                setCheckingLikeStatus(false);
            }
        };

        checkLikeStatus();
    }, [blogId]);

    const handleToggleLike = async () => {
        if (isLiking) return;

        try {
            setIsLiking(true);

            if (hasLiked) {
                // Unlike the blog
                const response = await fetch(`/api/blogs/${blogId}/unlike`, {
                    method: "POST",
                });

                if (response.ok) {
                    setLikesCount((prev) => Math.max(prev - 1, 0));
                    setHasLiked(false);
                } else {
                    const errorData = await response.json();
                    console.error("API Error:", errorData);
                    throw new Error(errorData.error || "Failed to unlike blog");
                }
            } else {
                // Like the blog
                const response = await fetch(`/api/blogs/${blogId}/like`, {
                    method: "POST",
                });

                if (response.ok) {
                    setLikesCount((prev) => prev + 1);
                    setHasLiked(true);
                } else {
                    const errorData = await response.json();
                    console.error("API Error:", errorData);
                    throw new Error(errorData.error || "Failed to like blog");
                }
            }
        } catch (error: any) {
            console.error("Error toggling like:", error);
            toast.error(error.message || "Failed to update like. Please try again.");
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
                onClick={handleToggleLike}
                disabled={isLiking || checkingLikeStatus}
                className={nb({
                    border: 3,
                    shadow: "sm",
                    hover: "lift",
                    active: "push",
                    className: `px-6 py-3 font-bold transition-all ${hasLiked ? "text-red-500" : ""} ${isLiking || checkingLikeStatus ? "opacity-50 cursor-not-allowed" : ""}`,
                })}
            >
                {isLiking ? (
                    <>⏳ {likesCount}</>
                ) : hasLiked ? (
                    <>❤️ {likesCount}</>
                ) : (
                    <>🤍 {likesCount}</>
                )}
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
