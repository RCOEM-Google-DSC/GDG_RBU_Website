import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { getBlog } from "@/supabase/supabase";
import { BlogActions } from "@/app/Components/blog/BlogActions";
import { BlogComments } from "@/app/Components/blog/BlogComments";
import { CodeBlock } from "@/app/Components/blog/CodeBlock";

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let blog;
    try {
        blog = await getBlog(id);
    } catch (error) {
        console.error("Error fetching blog:", error);
        // Return not found or error page
        blog = {
            id,
            title: "Blog not found",
            image_url: "/blog.png",
            published_at: new Date().toISOString(),
            likes_count: 0,
            markdown:
                "This blog post could not be loaded. Please check if the blog exists.",
            writer: {
                name: "Unknown",
                image_url: "/user.png",
            },
            comments: [],
        };
    }

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
                            <BlogActions
                                blogId={blog.id}
                                initialLikesCount={blog.likes_count}
                            />
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
                            }}
                        >
                            {blog.markdown}
                        </ReactMarkdown>
                    </article>
                </NeoBrutalism>

                {/* Comments Section */}
                <NeoBrutalism border={4} shadow="xl" className="bg-white p-8">
                    <BlogComments
                        blogId={blog.id}
                        initialComments={blog.comments || []}
                    />
                </NeoBrutalism>
            </div>
        </div>
    );
}
