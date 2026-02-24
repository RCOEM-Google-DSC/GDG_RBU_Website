import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { getBlog } from "@/supabase/blogs-server";
import { BlogComments } from "@/app/Components/blog/BlogComments";
import { CodeBlock } from "@/app/Components/blog/CodeBlock";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

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
    blog = {
      id,
      title: "Blog not found",
      image_url: "/blog.png",
      published_at: new Date().toISOString(),
      markdown: "This blog post could not be loaded.",
      comments: [],
    };
  }

  return (
    <div className="container mx-auto py-10">
      {/* Blog Content */}
      <NeoBrutalism
        border={4}
        shadow="xl"
        className="bg-white mb-8 overflow-hidden"
      >
        {/* Hero Image */}
        <div className="relative w-full h-72 md:h-96 border-b-4 border-black">
          <Image
            src={blog.image_url || "/blog.png"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-black mb-4">{blog.title}</h1>

          {/* Author & Date */}
          {blog.writer && (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b-2 border-black">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={blog.writer.image_url || "/user.png"}
                  alt={blog.writer.name}
                  fill
                  className="rounded-full border-2 border-black object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{blog.writer.name}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {formatDistanceToNow(new Date(blog.published_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          )}

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
        </div>
      </NeoBrutalism>

      {/* Comments Section */}
      <NeoBrutalism border={4} shadow="xl" className="bg-white p-8">
        <BlogComments blogId={blog.id} initialComments={blog.comments || []} />
      </NeoBrutalism>
    </div>
  );
}
