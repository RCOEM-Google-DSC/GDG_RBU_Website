"use server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
/**
 * Get the current authenticated user's ID safely.
 * Uses getUser() instead of getSession() for server-side security.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;
  return user?.id ?? null;
}

/**
 * Get the current session. 
 * Note: getUser() is preferred for security, but getSession() is 
 * useful for retrieving the access_token for external API calls.
 */
export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting session:", error);
    return null;
  }
  return session;
}

/**
 * Register for an event.
 */
export async function registerForEvent(
  eventId: string,
  registrationData: {
    team_name?: string;
    team_members?: string[];
    is_team_registration?: boolean;
    wants_random_team?: boolean;
    is_open_to_alliances?: boolean;
  },
) {
  const supabase = await createClient();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to register for an event");
  }

  const { data, error } = await supabase
    .from("registrations")
    .insert({
      event_id: eventId,
      user_id: userId,
      ...registrationData,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Registration error:", error.message);
    throw new Error(error.message || "Failed to register for event");
  }

  return data;
}

/**
 * Create a new event.
 */
export async function createEvent(eventData: {
  title: string;
  description?: string;
  date: string;
  time?: string;
  venue?: string;
  is_paid?: boolean;
  fee?: number;
  qr_code?: string;
  max_participants?: number;
  is_team_event?: boolean;
  max_team_size?: number;
  category?: string;
}) {
  const supabase = await createClient();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to create an event");
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      ...eventData,
      organizer_id: userId,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Event creation error:", error.message);
    throw new Error(error.message || "Failed to create event");
  }

  return data;
}

/**
 * Update an existing event.
 */
export async function updateEvent(
  eventId: string,
  eventData: Partial<{
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    is_paid: boolean;
    fee: number;
    max_participants: number;
    is_team_event: boolean;
    max_team_size: number;
    category: string;
  }>,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .update({
      ...eventData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId)
    .select()
    .single();

  if (error) {
    console.error("Event update error:", error.message);
    throw new Error(error.message || "Failed to update event");
  }

  return data;
}

/**
 * Get event details by ID.
 */
export async function getEvent(eventId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error fetching event:", error.message);
    throw new Error(error.message || "Failed to fetch event");
  }

  return data;
}

/**
 * Get all events.
 */
export async function getEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error.message);
    throw new Error(error.message || "Failed to fetch events");
  }

  return data;
}

/**
 * Get user's registrations.
 */
export async function getUserRegistrations() {
  const supabase = await createClient();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to view registrations");
  }

  const { data, error } = await supabase
    .from("registrations")
    .select("*, events(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching registrations:", error.message);
    throw new Error(error.message || "Failed to fetch registrations");
  }

  return data;
}

/**
 * Handle event check-in.
 */
export async function verifyEventCheckin(eventId: string) {
  const supabase = await createClient();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be logged in to check in");
  }

  const { data: registration, error: fetchError } = await supabase
    .from("registrations")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .single();

  if (fetchError || !registration) {
    throw new Error("You are not registered for this event");
  }

  if (registration.status === "verified") {
    return { status: "already_verified" };
  }

  const { error: updateError } = await supabase
    .from("registrations")
    .update({
      status: "verified",
      updated_at: new Date().toISOString(),
    })
    .eq("id", registration.id);

  if (updateError) {
    throw new Error("Failed to verify check-in");
  }

  return { status: "verified" };
}

/**
 * Get upcoming events.
 */
export async function getUpcomingEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "upcoming")
    .order("event_time", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error);
    throw new Error(error.message || "Failed to fetch upcoming events");
  }

  return data;
}

/**
 * Get past events.
 */
export async function getPastEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "completed")
    .order("event_time", { ascending: false });

  if (error) {
    console.error("Error fetching past events:", error);
    throw new Error(error.message || "Failed to fetch past events");
  }

  return data;
}

/**
 * Get gallery images for a specific event.
 */
export async function getGalleryImages(galleryUid: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("image_url")
    .eq("id", galleryUid)
    .single();

  if (error || !data?.image_url) return [];

  return data.image_url.map((url: string) =>
    url.replace("/upload/", "/upload/f_auto,q_auto/"),
  );
}


export async function getEventWithPartner(eventId: string) {
  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      partners (
        id,
        name,
        website,
        logo_url,
        created_at
      )
    `)
    .eq("id", eventId)
    .single();

  if (error) {
    console.error(
      "Error fetching event with partner:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to fetch event with partner");
  }

  return data;
}
