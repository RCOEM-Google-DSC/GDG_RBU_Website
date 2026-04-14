import type { GalleryFilterOption, GalleryPhotoItem } from "@/lib/types";
import { createClient } from "@/supabase/server";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

type EventGalleryRow = {
  id: string;
  title: string | null;
  date: string | null;
  event_time: string | null;
  gallery_uid: string | null;
  crew_url: string | null;
};

type GalleryRow = {
  id: string;
  image_url: string[] | null;
};

const formatEventDateLabel = (rawDate: string | null | undefined) => {
  if (!rawDate) return "DATE TBA";

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) return "DATE TBA";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
    .format(parsedDate)
    .toUpperCase();
};

const optimizeCloudinaryUrl = (url: string) => {
  if (!url) return url;
  return url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;
};

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("id, title, date, event_time, gallery_uid, crew_url")
    .or("gallery_uid.not.is.null,crew_url.not.is.null")
    .order("event_time", { ascending: false });

  if (eventsError) {
    console.error("Error fetching gallery events:", eventsError);
    return <GalleryClient photos={[]} filters={[]} />;
  }

  const events = (eventsData ?? []) as EventGalleryRow[];
  const galleryIds = Array.from(
    new Set(
      events
        .map((event) => event.gallery_uid)
        .filter((galleryUid): galleryUid is string => Boolean(galleryUid)),
    ),
  );

  if (galleryIds.length === 0) {
    return <GalleryClient photos={[]} filters={[]} />;
  }

  const { data: galleryData, error: galleryError } = await supabase
    .from("gallery")
    .select("id, image_url")
    .in("id", galleryIds);

  if (galleryError) {
    console.error("Error fetching gallery photos:", galleryError);
    return <GalleryClient photos={[]} filters={[]} />;
  }

  const galleryRows = (galleryData ?? []) as GalleryRow[];
  const galleryMap = new Map<string, string[]>();

  galleryRows.forEach((row) => {
    const rawUrls = Array.isArray(row.image_url) ? row.image_url : [];
    const normalizedUrls = rawUrls
      .filter((url): url is string => typeof url === "string")
      .map((url) => url.trim())
      .filter(Boolean)
      .map(optimizeCloudinaryUrl);

    if (normalizedUrls.length > 0) {
      galleryMap.set(row.id, normalizedUrls);
    }
  });

  const photos: GalleryPhotoItem[] = [];
  const filterMeta = new Map<string, GalleryFilterOption>();
  let figureCounter = 1;

  events.forEach((event) => {
    if (!event.gallery_uid) return;

    const eventPhotos = event.gallery_uid ? (galleryMap.get(event.gallery_uid) ?? []) : [];
    const teamPhotoUrl = event.crew_url ? optimizeCloudinaryUrl(event.crew_url) : null;
    if (eventPhotos.length === 0 && !teamPhotoUrl) return;

    const eventTitle = event.title?.trim() || "UNTITLED EVENT";
    const eventDate = event.date || event.event_time || null;
    const eventDateLabel = formatEventDateLabel(eventDate);

    filterMeta.set(event.id, {
      eventId: event.id,
      eventTitle,
      eventDateLabel,
      totalPhotos: eventPhotos.length + (teamPhotoUrl ? 1 : 0),
    });

    eventPhotos.forEach((photoUrl, index) => {
      photos.push({
        id: `${event.id}-${index}`,
        photoUrl,
        eventId: event.id,
        eventTitle,
        eventDate,
        eventDateLabel,
        figureNumber: figureCounter,
      });

      figureCounter += 1;
    });

    if (teamPhotoUrl) {
      photos.push({
        id: `${event.id}-team`,
        photoUrl: teamPhotoUrl,
        eventId: event.id,
        eventTitle,
        eventDate,
        eventDateLabel,
        figureNumber: figureCounter,
        isTeamPhoto: true,
      });

      figureCounter += 1;
    }
  });

  const filters = events
    .map((event) => {
      const filter = filterMeta.get(event.id);
      if (!filter) return null;

      const rawDate = event.date || event.event_time || null;
      const timestamp = rawDate ? new Date(rawDate).getTime() : 0;

      return {
        filter,
        timestamp: Number.isNaN(timestamp) ? 0 : timestamp,
      };
    })
    .filter((entry): entry is { filter: GalleryFilterOption; timestamp: number } => Boolean(entry))
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((entry) => entry.filter);

  return <GalleryClient photos={photos} filters={filters} />;
}
