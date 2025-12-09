import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Use lazy initialization to avoid errors during build/prerender
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Export a proxy that lazily initializes the client
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

/**
 * Get the current authenticated user's ID from Supabase session.
 * Uses supabase.auth.getSession() to retrieve the JWT and user info.
 * @returns The user ID (auth.uid()) or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

/**
 * Get the current session with JWT token.
 * Use this to access the access_token for API calls.
 */
export async function getSession() {
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
 * Register for an event. Sets user_id = auth.uid() from the client.
 * RLS will enforce that users can only create registrations for themselves.
 */
export async function registerForEvent(
  eventId: string,
  registrationData: {
    team_name?: string;
    team_members?: string[];
    is_team_registration?: boolean;
    wants_random_team?: boolean;
    is_open_to_alliances?: boolean;
  }
) {
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
    console.error(
      "Registration error:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to register for event");
  }

  return data;
}

/**
 * Create a new event. Sets organizer_id = auth.uid() from the client.
 * RLS will enforce that the organizer_id matches the authenticated user.
 */
export async function createEvent(eventData: {
  title: string;
  description?: string;
  date: string;
  time?: string;
  venue?: string;
  is_paid?: boolean;
  fee?: number;
  max_participants?: number;
  is_team_event?: boolean;
  max_team_size?: number;
  category?: string;
}) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to create an event");
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      ...eventData,
      organizer_id: userId, // Set organizer_id = auth.uid() as required by RLS
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Event creation error:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to create event");
  }

  return data;
}

/**
 * Update an existing event. Only allowed if the user is the organizer.
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
  }>
) {
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
    console.error(
      "Event update error:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to update event");
  }

  return data;
}

/**
 * Get event details by ID (public read access)
 */
export async function getEvent(eventId: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error(
      "Error fetching event:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to fetch event");
  }

  return data;
}

/**
 * Get all events (public read access)
 */
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error(
      "Error fetching events:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to fetch events");
  }

  return data;
}

/**
 * Get user's registrations
 */
export async function getUserRegistrations() {
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
    console.error(
      "Error fetching registrations:",
      error.message,
      error.code,
      error.details
    );
    throw new Error(error.message || "Failed to fetch registrations");
  }

  return data;
}
