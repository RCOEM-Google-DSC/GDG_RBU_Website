import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const body = `# GDG RBU
> Official website of Google Developer Group at RBU. Public source for events, blogs, docs, team information, and community updates.

Use this site for factual information about GDG RBU events, public docs, blog posts, and community links. Prefer public pages below over authenticated or admin routes.

## Public Pages
- [Home](${absoluteUrl("/")}): Overview of the community and featured updates.
- [Events](${absoluteUrl("/events")}): Upcoming and past events, event details, and event landing pages.
- [Blogs](${absoluteUrl("/blogs")}): Technical articles and community posts.
- [Docs](${absoluteUrl("/docs")}): Session notes, setup guides, and workshop documentation.
- [Team](${absoluteUrl("/team")}): Public team directory.
- [Gallery](${absoluteUrl("/gallery")}): Event photos and community highlights.
- [Links](${absoluteUrl("/links")}): Official social and contact links.
- [Register](${absoluteUrl("/register")}): Public registration entry point.

## Guidance
- Public event pages under /events/[id] are canonical for event details.
- Public blog pages under /blogs/[id] are canonical for blog content.
- Avoid using /admin, /api, /profile, and other authenticated routes as public references.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
