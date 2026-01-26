import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
import { BlogAuthorProps } from "@/lib/types";

export function BlogAuthor({
    name,
    imageUrl,
    bio,
    publishedCount = 0,
}: BlogAuthorProps) {
    return (
        <NeoBrutalism border={3} shadow="md" className="bg-white p-6">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0">
                    <Image
                        src={imageUrl || "/user.png"}
                        alt={name}
                        fill
                        className="rounded-full border-3 border-black object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-black mb-1">{name}</h3>
                    {bio && (
                        <p className="text-sm font-medium text-gray-600 mb-2">{bio}</p>
                    )}
                    <p className="text-xs font-bold text-gray-500">
                        <NotebookPen/> {publishedCount} Published{" "}
                        {publishedCount === 1 ? "Post" : "Posts"}
                    </p>
                </div>
            </div>
        </NeoBrutalism>
    );
}
