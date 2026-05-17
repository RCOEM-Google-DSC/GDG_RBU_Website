import type { Metadata } from "next";

import EventPageClient from "./EventPageClient";
import { absoluteUrl, getEventJsonLd } from "@/lib/seo";
import { getEventById } from "@/supabase/events-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const event = await getEventById(id);
    const description =
      event.description || `Event details for ${event.title} hosted by GDG RBU.`;
    const image = event.image_url || absoluteUrl("/blog.png");

    return {
      title: event.title,
      description,
      alternates: {
        canonical: `/events/${id}`,
      },
      openGraph: {
        title: event.title,
        description,
        type: "website",
        url: `/events/${id}`,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Event",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id).catch(() => null);
  const eventJsonLd = event
    ? getEventJsonLd({
        title: event.title,
        description:
          event.description || `Event details for ${event.title} hosted by GDG RBU.`,
        path: `/events/${id}`,
        startDate: event.event_time || event.date,
        image: event.image_url || absoluteUrl("/blog.png"),
        venue: event.venue,
        status: event.status,
      })
    : null;

  return (
    <>
      {eventJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      ) : null}
      <EventPageClient id={id} />
    </>
  );
}
