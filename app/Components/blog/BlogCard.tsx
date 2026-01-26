import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { BlogCardProps } from "@/lib/types";

export function BlogCard({
    id,
    title,
    imageUrl,
    publishedAt,
    likesCount,
    writerName,
    writerImage,
    markdownPreview,
}: BlogCardProps) {
    return (
        <Link href={`/blogs/${id}`}>
            <NeoBrutalism
                border={4}
                shadow="lg"
                hover="lift"
                active="push"
                className="bg-white overflow-hidden group cursor-pointer h-full flex flex-col"
            >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden border-b-4 border-black shrink-0">
                    <Image
                        src={imageUrl || "/blog.png"}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h2 className="text-2xl font-black mb-3 line-clamp-2 min-h-14">
                        {title}
                    </h2>

                    {/* Preview */}
                    <p className="text-gray-600 mb-6 line-clamp-3 font-medium flex-1">
                        {markdownPreview}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between mt-auto">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 shrink-0">
                                <Image
                                    src={writerImage || "/user.png"}
                                    alt={writerName}
                                    fill
                                    className="rounded-full border-2 border-black object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{writerName}</p>
                                <p className="text-xs text-gray-500 font-medium">
                                    {formatDistanceToNow(new Date(publishedAt), {
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Likes */}
                        <div className="flex items-center gap-1 px-3 py-1 border-2 border-black bg-white">
                            <span className="text-lg">❤️</span>
                            <span className="font-bold text-sm">{likesCount}</span>
                        </div>
                    </div>
                </div>
            </NeoBrutalism>
        </Link>
    );
}
