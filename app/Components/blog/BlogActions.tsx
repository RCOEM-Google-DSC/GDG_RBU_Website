"use client";

import { toast } from "sonner";
import { nb } from "@/components/ui/neo-brutalism";

export function BlogActions() {
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
