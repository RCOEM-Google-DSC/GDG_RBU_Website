import type { Metadata } from "next";

import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Recruitment 2026-27 | ${SITE_NAME}`,
  description:
    "Join GDG RBU! Apply to be part of our Tech, Design, CP, Management, Marketing, or Socials team.",
  alternates: {
    canonical: "/recruitment",
  },
  openGraph: {
    title: `Recruitment 2026-27 | ${SITE_NAME}`,
    description:
      "Join GDG RBU! Apply to be part of our Tech, Design, CP, Management, Marketing, or Socials team.",
    url: "/recruitment",
    type: "website",
    images: [absoluteUrl("/blog.png")],
  },
};

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
