import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface BlogPreviewProps {
    title: string;
    imageUrl?: string;
    markdown: string;
    authorName?: string;
    authorImageUrl?: string;
export function BlogPreview({
    title,
    imageUrl,
    markdown,
    authorName,
    authorImageUrl,
}: BlogPreviewProps) {
    return (
        <div className="space-y-8">
            {/* Blog Header Preview */}
            <NeoBrutalism border={4} shadow="2xl" className="bg-white">
                {/* Cover Image */}
                <div className="relative h-96 w-full overflow-hidden border-b-4 border-black">
                    <Image
                        src={imageUrl || "/blog.png"}
                        alt={title || "Blog cover"}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Title & Meta */}
                <div className="p-8">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        {title || "Your Blog Title"}
                    </h1>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14">
                                <Image
                                    src={authorImageUrl || "/user.png"}
                                    alt={authorName || "Author"}
                                    fill
                                    className="rounded-full border-3 border-black object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-black text-lg">
                                    {authorName || "Select an author"}
                                </p>
                                <p className="text-gray-600 font-medium">
                                    {formatDistanceToNow(new Date(), {
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </NeoBrutalism>

            {/* Blog Content Preview */}
            <NeoBrutalism border={4} shadow="xl" className="bg-white p-8">
                <article className="prose prose-lg max-w-none">
                    {markdown ? (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-4xl font-black mb-4" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-3xl font-black mb-3 mt-8" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-2xl font-black mb-2 mt-6" {...props} />
                                ),
                                h4: ({ node, ...props }) => (
                                    <h4 className="text-xl font-black mb-2 mt-4" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p
                                        className="mb-4 text-gray-800 leading-relaxed"
                                        {...props}
                                    />
                                ),
                                code: CodeBlock,
                                pre: ({ children }: any) => <>{children}</>,
                                ul: ({ node, ...props }) => (
                                    <ul
                                        className="list-disc list-inside mb-6 space-y-2 ml-4 font-medium"
                                        {...props}
                                    />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol
                                        className="list-decimal list-inside mb-6 space-y-2 ml-4 font-medium"
                                        {...props}
                                    />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="text-gray-800" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote
                                        className="border-l-4 border-black pl-4 my-6 italic text-gray-700 font-medium"
                                        {...props}
                                    />
                                ),
                                a: ({ node, ...props }) => (
                                    <a
                                        className="text-blue-600 font-bold underline hover:text-blue-800"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                    />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="font-black" {...props} />
                                ),
                                em: ({ node, ...props }) => (
                                    <em className="italic" {...props} />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr className="border-2 border-black my-8" {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-6">
                                        <table
                                            className="w-full border-4 border-black"
                                            {...props}
                                        />
                                    </div>
                                ),
                                thead: ({ node, ...props }) => (
                                    <thead className="bg-black text-white" {...props} />
                                ),
                                th: ({ node, ...props }) => (
                                    <th
                                        className="px-4 py-2 font-black text-left border-2 border-black"
                                        {...props}
                                    />
                                ),
                                td: ({ node, ...props }) => (
                                    <td className="px-4 py-2 border-2 border-black" {...props} />
                                ),
                                img: ({ node, ...props }) => (
                                    <img
                                        className="border-4 border-black my-6 max-w-full h-auto"
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-gray-400 italic text-xl">
                            Start writing to see the preview...
                        </p>
                    )}
                </article>
            </NeoBrutalism>
        </div>
    );
}
