import type { Metadata } from "next";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlog } from "@/supabase/blogs-server";
import { BlogComments } from "@/app/Components/blog/BlogComments";
import { CodeBlock } from "@/app/Components/blog/CodeBlock";
import { absoluteUrl, getArticleJsonLd, stripMarkdown } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const blog = await getBlog(id);
    const description = stripMarkdown(blog.markdown || blog.title);
    const image = blog.image_url || absoluteUrl("/blog.png");

    return {
      title: blog.title,
      description,
      alternates: {
        canonical: `/blogs/${id}`,
      },
      openGraph: {
        title: blog.title,
        description,
        type: "article",
        url: `/blogs/${id}`,
        publishedTime: blog.published_at || undefined,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Blog",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

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

  const description = stripMarkdown(blog.markdown || blog.title);
  const articleJsonLd = getArticleJsonLd({
    title: blog.title,
    description,
    path: `/blogs/${id}`,
    image: blog.image_url || absoluteUrl("/blog.png"),
    publishedAt: blog.published_at,
    authorName: blog.writer?.name || null,
  });

  return (
    <div className="container mx-auto py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Blog Content */}
      <NeoBrutalism
        border={4}
        shadow="xl"
        className="bg-white mb-8 overflow-hidden"
      >
        {/* Hero Image */}
        <div className="relative w-full min-h-[400px] md:min-h-[600px] max-h-[80vh] border-b-4 border-black bg-white">
          <Image
            src={blog.image_url || "/blog.png"}
            alt={blog.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
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
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white [&_tbody_tr:hover]:bg-gray-50">
                    <table
                      className="w-full text-left border-collapse"
                      {...props}
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-black text-white" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-6 py-4 font-black text-lg"
                    {...props}
                  />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="border-b-2 border-black/10 last:border-0 transition-colors"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-6 py-4 font-medium text-gray-800" {...props} />
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
