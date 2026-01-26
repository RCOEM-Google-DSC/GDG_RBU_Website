import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

async function getBlog(id: string) {

    return {
        id,
        title: "Getting Started with Web Development",
        image_url: "/blog.png",
        published_at: new Date().toISOString(),
        likes_count: 42,
        markdown: `# Introduction to Web Development

Web development is an exciting journey that opens doors to endless possibilities in the digital world.

## What You'll Learn

- HTML fundamentals
- CSS styling techniques
- JavaScript programming
- Modern frameworks and tools

## Getting Started

First, you need to understand the basics of HTML. HTML provides the structure for web pages.

## Next Steps

Once you master the basics, you can move on to more advanced topics like React, Next.js, and backend development.

Happy coding!`,
        writer: {
            name: "John Doe",
            image_url: "/user.png",
        },
        comments: [
            {
                id: "1",
                comment: "Great article! Very helpful.",
                created_at: new Date().toISOString(),
                user: {
                    name: "Jane Smith",
                    image_url: "/user.png",
                },
            },
        ],
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const blog = await getBlog(params.id);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/blogs">
                    <button
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className:
                                "mb-8 px-6 py-3 bg-white hover:bg-gray-50 font-bold flex items-center gap-2",
                        })}
                    >
                        <span>←</span>
                        <span>Back to Blogs</span>
                    </button>
                </Link>

                {/* Blog Header */}
                <NeoBrutalism border={4} shadow="2xl" className="bg-white mb-8">
                    {/* Cover Image */}
                    <div className="relative h-96 w-full overflow-hidden border-b-4 border-black">
                        <Image
                            src={blog.image_url || "/blog.png"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Title & Meta */}
                    <div className="p-8">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14">
                                    <Image
                                        src={blog.writer.image_url || "/user.png"}
                                        alt={blog.writer.name}
                                        fill
                                        className="rounded-full border-3 border-black object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-black text-lg">{blog.writer.name}</p>
                                    <p className="text-gray-600 font-medium">
                                        {formatDistanceToNow(new Date(blog.published_at), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Likes & Share */}
                            <div className="flex gap-3">
                                <button
                                    className={nb({
                                        border: 3,
                                        shadow: "sm",
                                        hover: "lift",
                                        active: "push",
                                        className: "px-6 py-3 bg-white hover:bg-gray-50 font-bold",
                                    })}
                                >
                                    ❤️ {blog.likes_count}
                                </button>
                                <button
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
                        </div>
                    </div>
                </NeoBrutalism>

                {/* Blog Content */}
                <NeoBrutalism border={4} shadow="xl" className="bg-white p-8 mb-8">
                    <article className="prose prose-lg max-w-none">
                        <ReactMarkdown
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
                                p: ({ node, ...props }) => (
                                    <p
                                        className="mb-4 text-gray-800 leading-relaxed"
                                        {...props}
                                    />
                                ),
                                code: ({ node, ...props }) => (
                                    <code
                                        className="bg-gray-100 px-2 py-1 rounded border-2 border-black font-mono text-sm"
                                        {...props}
                                    />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre
                                        className="bg-gray-900 text-white p-4 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-x-auto mb-6"
                                        {...props}
                                    />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc list-inside mb-4" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal list-inside mb-4" {...props} />
                                ),
                            }}
                        >
                            {blog.markdown}
                        </ReactMarkdown>
                    </article>
                </NeoBrutalism>

                {/* Comments Section */}
                <NeoBrutalism border={4} shadow="xl" className="bg-white p-8">
                    <h2 className="text-3xl font-black mb-6">
                        Comments ({blog.comments?.length || 0})
                    </h2>

                    {/* Comment Form */}
                    <div className="mb-8">
                        <textarea
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
                            className={nb({
                                border: 3,
                                shadow: "md",
                                hover: "lift",
                                active: "push",
                                className:
                                    "mt-4 px-8 py-3 bg-black text-white hover:bg-gray-800 font-bold",
                            })}
                        >
                            Post Comment
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {blog.comments && blog.comments.length > 0 ? (
                            blog.comments.map((comment: any) => (
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
                                            <p className="text-gray-800 font-medium">
                                                {comment.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600 font-medium py-8">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </div>
                </NeoBrutalism>
            </div>
        </div>
    );
}
