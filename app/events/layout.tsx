import type { Metadata } from "next";

import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Events | ${SITE_NAME}`,
  description:
    "Browse upcoming workshops, hackathons, and past community events from GDG RBU.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: `Events | ${SITE_NAME}`,
    description:
      "Browse upcoming workshops, hackathons, and past community events from GDG RBU.",
    url: "/events",
    type: "website",
    images: [absoluteUrl("/blog.png")],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
