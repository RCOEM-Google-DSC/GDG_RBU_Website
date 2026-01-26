import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

export function BlogHeader() {
    return (
        <div className="mb-12">
            <NeoBrutalism
                border={4}
                shadow="xl"
                className="bg-white p-12 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-black mb-4 font-retron">GDG Blogs</h1>
                <p className="text-lg md:text-xl font-medium text-gray-700">
                    Insights, tutorials, and stories from our community
                </p>
            </NeoBrutalism>

            {/* Filter/Sort Bar */}
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3">
                    <button
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className:
                                "px-6 py-3 bg-black text-white hover:bg-gray-800 font-bold",
                        })}
                    >
                        All Posts
                    </button>
                    <button
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: "px-6 py-3 bg-white hover:bg-gray-50 font-bold",
                        })}
                    >
                        Most Liked
                    </button>
                    <button
                        className={nb({
                            border: 3,
                            shadow: "md",
                            hover: "lift",
                            active: "push",
                            className: "px-6 py-3 bg-white hover:bg-gray-50 font-bold",
                        })}
                    >
                        Recent
                    </button>
                </div>

            </div>
        </div>
    );
}
