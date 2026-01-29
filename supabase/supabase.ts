import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

// Use lazy initialization to avoid errors during build/prerender
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.",
    );
  }

  supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
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

// Blogs
export async function getBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      id,
      title,
      image_url,
      published_at,
      likes_count,
      markdown,
      writer:writer_id (
        name,
        image_url
      )
    `,
    )
    .order("published_at", { ascending: false });
  if (error) {
    console.error(
      "Error fetching blogs:",
      error.message,
      error.code,
      error.details,
    );
    throw new Error(error.message || "Failed to fetch blogs");
  }
  return data;
}

export async function getBlog(blogid: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      writer:writer_id (
        name,
        image_url
      ),
      comments:comments_blogs (
        id,
        comment,
        created_at,
        user:user_id (
          name,
          image_url
        )
      )
    `,
    )
    .eq("id", blogid)
    .single();

  if (error) {
    console.error(
      "Error fetching blog:",
      error.message,
      error.code,
      error.details,
    );
    throw new Error(error.message || "Failed to fetch blog");
  }

  return data;
}

export async function addComment(blogId: string, comment: string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to comment");
  }

  const { data, error } = await supabase
    .from("comments_blogs")
    .insert({
      blog_id: blogId,
      user_id: userId,
      comment,
      created_at: new Date().toISOString(),
    })
    .select(
      `
      id,
      comment,
      created_at,
      user:user_id (
        name,
        image_url
      )
    `,
    )
    .single();

  if (error) {
    console.error("Comment error:", error.message, error.code, error.details);
    throw new Error(error.message || "Failed to add comment");
  }

  return data;
}

/**
 * Check if the current user has liked a specific blog
 */
export async function hasUserLikedBlog(blogId: string): Promise<boolean> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return false;
  }

  const { data, error } = await supabase
    .from("blog_likes")
    .select("id")
    .eq("blog_id", blogId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error checking if user liked blog:", error);
    return false;
  }

  return !!data;
}

/**
 * Like a blog post (adds to blog_likes table and increments likes_count)
 */
export async function likeBlog(blogId: string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to like a blog");
  }

  // Check if user has already liked this blog
  const alreadyLiked = await hasUserLikedBlog(blogId);
  if (alreadyLiked) {
    throw new Error("You have already liked this blog");
  }

  // Insert into blog_likes table
  const { error: likeError } = await supabase.from("blog_likes").insert({
    blog_id: blogId,
    user_id: userId,
    created_at: new Date().toISOString(),
  });

  if (likeError) {
    console.error("Error adding like:", likeError);
    throw new Error(likeError.message || "Failed to like blog");
  }

  // increment likes
  const { data: blogData } = await supabase
    .from("blogs")
    .select("likes_count")
    .eq("id", blogId)
    .single();

  const newLikesCount = (blogData?.likes_count || 0) + 1;

  const { data, error: updateError } = await supabase
    .from("blogs")
    .update({ likes_count: newLikesCount })
    .eq("id", blogId)
    .select("likes_count")
    .single();

  if (updateError) {
    console.error("Error updating likes count:", updateError);
    throw new Error(updateError.message || "Failed to update likes count");
  }

  return data;
}

export async function unlikeBlog(blogId: string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to unlike a blog");
  }

  // remove like
  const { error: unlikeError } = await supabase
    .from("blog_likes")
    .delete()
    .eq("blog_id", blogId)
    .eq("user_id", userId);

  if (unlikeError) {
    console.error("Error removing like:", unlikeError);
    throw new Error(unlikeError.message || "Failed to unlike blog");
  }

  // decrement likes
  const { data: blogData } = await supabase
    .from("blogs")
    .select("likes_count")
    .eq("id", blogId)
    .single();

  const newLikesCount = Math.max((blogData?.likes_count || 0) - 1, 0);

  const { data, error: updateError } = await supabase
    .from("blogs")
    .update({ likes_count: newLikesCount })
    .eq("id", blogId)
    .select("likes_count")
    .single();

  if (updateError) {
    console.error("Error updating likes count:", updateError);
    throw new Error(updateError.message || "Failed to update likes count");
  }

  return data;
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
  },
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
      error.details,
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
  qr_code?: string;
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
      organizer_id: userId,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Event creation error:",
      error.message,
      error.code,
      error.details,
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
  }>,
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
      error.details,
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
      error.details,
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
      error.details,
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
      error.details,
    );
    throw new Error(error.message || "Failed to fetch registrations");
  }

  return data;
}

export async function verifyEventCheckin(eventId: string) {
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
 * Get upcoming events (status = 'upcoming')
 */
export async function getUpcomingEvents() {
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
 * Get past events (status = 'completed')
 */
export async function getPastEvents() {
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
 * Get gallery images for a specific event
 */
export async function getGalleryImages(galleryUid: string) {
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
    .select(
      `
      *,
      partners (
        id,
        name,
        website,
        logo_url,
        created_at
      )
    `,
    )
    .eq("id", eventId)
    .single();

  if (error) {
    console.error(
      "Error fetching event with partner:",
      error.message,
      error.code,
      error.details,
    );
    throw new Error(error.message || "Failed to fetch event with partner");
  }

  return data;
}

/**
 * Submit feedback for an event
 */
export async function submitFeedback(
  eventId: string,
  feedbackData: { subject: string; message: string },
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to submit feedback");
  }

  // Get user's email
  const { data: userData } = await supabase
    .from("users")
    .select("email")
    .eq("id", userId)
    .single();

  if (!userData?.email) {
    throw new Error("User email not found");
  }

  const { data, error } = await supabase
    .from("feedback")
    .insert({
      event_id: eventId,
      user_id: userId,
      email: userData.email,
      subject: feedbackData.subject,
      message: feedbackData.message,
      submitted_at: new Date().toISOString(),
    })
    .select(
      `
      id,
      subject,
      message,
      submitted_at,
      user:user_id (
        name,
        image_url
      )
    `,
    )
    .single();

  if (error) {
    console.error("Feedback error:", error.message, error.code, error.details);
    throw new Error(error.message || "Failed to submit feedback");
  }

  return data;
}

/**
 * Get all feedback for a specific event
 */
export async function getEventFeedback(eventId: string) {
  const { data, error } = await supabase
    .from("feedback")
    .select(
      `
      id,
      subject,
      message,
      submitted_at,
      user:user_id (
        name,
        image_url
      )
    `,
    )
    .eq("event_id", eventId)
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Error fetching feedback:", error);
    throw new Error(error.message || "Failed to fetch feedback");
  }

  return data;
}

/**
 * Get all feedback submitted by the current user
 */
export async function getUserFeedback() {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User must be authenticated to view feedback");
  }

  const { data, error } = await supabase
    .from("feedback")
    .select(
      `
      id,
      event_id,
      subject,
      message,
      submitted_at,
      events (
        title,
        image_url
      )
    `,
    )
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Error fetching user feedback:", error);
    throw new Error(error.message || "Failed to fetch user feedback");
  }

  return data;
}
