import { createClient } from "@/supabase/server";

export type PublicEvent = {
  id: string;
  title: string;
  description: string | null;
  event_time: string | null;
  image_url: string | null;
  venue: string | null;
  date: string | null;
  time: string | null;
  status: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export async function getEventById(eventId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, event_time, image_url, venue, date, time, status, created_at, updated_at",
    )
    .eq("id", eventId)
    .single();

  if (error) {
    throw new Error(error.message || "Failed to fetch event");
  }

  return data as PublicEvent;
}

export async function getAllPublicEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, event_time, image_url, venue, date, time, status, created_at, updated_at",
    )
    .order("event_time", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to fetch events");
  }

  return (data || []) as PublicEvent[];
}
