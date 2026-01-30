import { createClient } from "@/supabase/server";

/**
 * Server-side function to get all blogs
 * Use this in Server Components and API routes
 */
export async function getBlogs() {
  const supabase = await createClient();

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

/**
 * Server-side function to get a single blog by ID
 * Use this in Server Components and API routes
 */
export async function getBlog(blogid: string) {
  const supabase = await createClient();

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

/**
 * Server-side function to check if the current user has liked a blog
 */
export async function hasUserLikedBlog(blogId: string): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("blog_likes")
    .select("id")
    .eq("blog_id", blogId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error checking if user liked blog:", error);
    return false;
  }

  return !!data;
}
