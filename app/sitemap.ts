import type { MetadataRoute } from "next";

import { PUBLIC_STATIC_ROUTES, absoluteUrl } from "@/lib/seo";
import { getBlogs } from "@/supabase/blogs-server";
import { getAllPublicEvents } from "@/supabase/events-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const [blogs, events] = await Promise.all([
    getBlogs().catch(() => []),
    getAllPublicEvents().catch(() => []),
  ]);

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: absoluteUrl(`/blogs/${blog.id}`),
    lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl(`/events/${event.id}`),
    lastModified: event.updated_at || event.event_time || event.date
      ? new Date(event.updated_at || event.event_time || event.date || Date.now())
      : new Date(),
    changeFrequency: event.status === "upcoming" ? "weekly" : "monthly",
    priority: event.status === "upcoming" ? 0.9 : 0.75,
  }));

  return [...staticEntries, ...blogEntries, ...eventEntries];
}
