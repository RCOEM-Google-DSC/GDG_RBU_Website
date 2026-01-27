import { BlogCard } from "./BlogCard";
import { Blog } from "@/lib/types";

interface BlogListProps {
    blogs: Blog[];
    loading?: boolean;
}

export function BlogList({ blogs, loading = false }: BlogListProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto mb-4"></div>
                    <h3 className="text-2xl font-black mb-2">Loading Blogs...</h3>
                </div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-3xl font-black mb-2">No Blogs Yet</h3>
                    <p className="text-gray-600 font-medium">
                        Check back later for amazing content!
                    </p>
                </div>
            </div>
        );
    }

    // extract content for preview
    const getPreview = (markdown: string) => {
        const plainText = markdown.replace(/[#*`\[\]]/g, "").trim();
        return plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    imageUrl={blog.image_url}
                    publishedAt={blog.published_at}
                    likesCount={blog.likes_count}
                    writerName={blog.writer.name}
                    writerImage={blog.writer.image_url}
                    markdownPreview={getPreview(blog.markdown)}
                />
            ))}
        </div>
    );
}
