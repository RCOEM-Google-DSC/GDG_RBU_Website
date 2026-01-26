import { BlogHeader } from "@/app/Components/blog/BlogHeader";
import { BlogList } from "@/app/Components/blog/BlogList";

const MOCK_BLOGS = [
    {
        id: "1",
        title: "Getting Started with Web Development",
        image_url: "/blog.png",
        published_at: new Date().toISOString(),
        likes_count: 42,
        markdown: "# Introduction\n\nWeb development is an exciting journey...",
        writer: {
            name: "John Doe",
            image_url: "/user.png",
        },
    },
    {
        id: "2",
        title: "Understanding React Hooks",
        image_url: "/blog.png",
        published_at: new Date(Date.now() - 86400000).toISOString(),
        likes_count: 128,
        markdown:
            "# React Hooks\n\nHooks revolutionized the way we write React components...",
        writer: {
            name: "Jane Smith",
            image_url: "/user.png",
        },
    },
    {
        id: "3",
        title: "Neo Brutalism Design Trends",
        image_url: "/blog.png",
        published_at: new Date(Date.now() - 172800000).toISOString(),
        likes_count: 89,
        markdown:
            "# Neo Brutalism\n\nBold borders, sharp shadows, and vibrant colors define this trend...",
        writer: {
            name: "Alex Johnson",
            image_url: "/user.png",
        },
    },
];

export default function BlogsPage() {

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <BlogHeader />
                <BlogList blogs={MOCK_BLOGS} />
            </div>
        </div>
    );
}
