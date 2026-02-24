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
