"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";
import { Feedback } from "@/lib/types";

interface EventFeedbackProps {
    eventId: string;
    initialFeedback: Feedback[];
}

export function EventFeedback({
    eventId,
    initialFeedback,
}: EventFeedbackProps) {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitFeedback = async () => {
        if (!subject.trim() || !message.trim()) {
            toast.error("Please fill in both subject and message.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch(`/api/events/${eventId}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit feedback");
            }

            const data = await response.json();
            setFeedbackList([data.feedback, ...feedbackList]);
            setSubject("");
            setMessage("");
            toast.success("Feedback submitted successfully!");
        } catch (error: any) {
            console.error("Error submitting feedback:", error);
            toast.error(
                error.message ||
                "Failed to submit feedback. Please ensure you are logged in.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-black mb-6">
                Event Feedback ({feedbackList.length})
            </h2>

            {/* Feedback Form */}
            <div className="mb-8">
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className={nb({
                        border: 3,
                        shadow: "sm",
                        className:
                            "w-full p-4 font-medium mb-4 focus:outline-none focus:ring-4 focus:ring-blue-300",
                    })}
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your feedback..."
                    className={nb({
                        border: 3,
                        shadow: "sm",
                        className:
                            "w-full p-4 font-medium resize-none focus:outline-none focus:ring-4 focus:ring-blue-300",
                    })}
                    rows={4}
                />
                <button
                    onClick={handleSubmitFeedback}
                    disabled={isSubmitting}
                    className={nb({
                        border: 3,
                        shadow: "md",
                        hover: "lift",
                        active: "push",
                        className: `mt-4 px-8 py-3 bg-black text-white hover:bg-gray-800 font-bold ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`,
                    })}
                >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
                {feedbackList && feedbackList.length > 0 ? (
                    feedbackList.map((feedback: Feedback) => (
                        <div
                            key={feedback.id}
                            className={nb({
                                border: 3,
                                shadow: "sm",
                                className: "p-4 bg-gray-50",
                            })}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative w-10 h-10 shrink-0">
                                    <Image
                                        src={feedback.user?.image_url || "/user.png"}
                                        alt={feedback.user?.name || "User"}
                                        fill
                                        className="rounded-full border-2 border-black object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-black">
                                            {feedback.user?.name || "Anonymous"}
                                        </p>
                                        <p className="text-xs text-gray-600 font-medium">
                                            {formatDistanceToNow(new Date(feedback.submitted_at), {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                    <p className="font-bold text-gray-900 mb-1">
                                        {feedback.subject}
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        {feedback.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 font-medium py-8">
                        No feedback yet. Be the first to share your thoughts!
                    </p>
                )}
            </div>
        </div>
    );
}
