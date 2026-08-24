import type { Metadata } from "next";

import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Blogs | ${SITE_NAME}`,
  description:
    "Technical articles, community stories, and learning resources published by GDG RBU.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `Blogs | ${SITE_NAME}`,
    description:
      "Technical articles, community stories, and learning resources published by GDG RBU.",
    url: "/blogs",
    type: "website",
    images: [absoluteUrl("/blog.png")],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
