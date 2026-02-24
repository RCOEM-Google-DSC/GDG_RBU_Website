"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";
import { Comment } from "@/lib/types";

interface CommentsProps {
    blogId: string;
    initialComments: Comment[];
}

export function BlogComments({ blogId, initialComments }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const handlePostComment = async () => {
        if (!newComment.trim()) {
            toast.error("Please write a comment before posting.");
            return;
        }

        try {
            setIsPosting(true);
            const response = await fetch(`/api/blogs/${blogId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to post comment");
            }

            const data = await response.json();
            setComments([data.comment, ...comments]);
            setNewComment("");
            toast.success("Comment posted successfully!");
        } catch (error: any) {
            console.error("Error posting comment:", error);
            toast.error(
                error.message ||
                "Failed to post comment. Please ensure you are logged in.",
            );
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-black mb-6">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <div className="mb-8">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={nb({
                        border: 3,
                        shadow: "sm",
                        className:
                            "w-full p-4 font-medium resize-none focus:outline-none focus:ring-4 focus:ring-blue-300",
                    })}
                    rows={4}
                />
                <button
                    onClick={handlePostComment}
                    disabled={isPosting}
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className: `mt-4 px-8 py-3 bg-black text-white hover:bg-gray-800 font-bold ${isPosting ? "opacity-50 cursor-not-allowed" : ""
                            }`,
                    })}
                >
                    {isPosting ? "Posting..." : "Post Comment"}
                </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments && comments.length > 0 ? (
                    comments.map((comment: Comment) => (
                        <div
                            key={comment.id}
                            className={nb({
                                border: 3,
                                shadow: "sm",
                                className: "p-4 bg-gray-50",
                            })}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative w-10 h-10 shrink-0">
                                    <Image
                                        src={comment.user.image_url || "/user.png"}
                                        alt={comment.user.name}
                                        fill
                                        className="rounded-full border-2 border-black object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-black">{comment.user.name}</p>
                                        <p className="text-xs text-gray-600 font-medium">
                                            {formatDistanceToNow(new Date(comment.created_at), {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                    <p className="text-gray-800 font-medium">{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 font-medium py-8">
                        No comments yet. Be the first?
                    </p>
                )}
            </div>
        </div>
    );
}
