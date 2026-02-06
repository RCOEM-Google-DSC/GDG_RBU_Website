import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("Attempting to like blog:", id);

    // Create server-side Supabase client with cookie access
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User must be authenticated to like a blog" },
        { status: 401 },
      );
    }

    // Check if user has already liked this blog
    const { data: existingLike } = await supabase
      .from("blog_likes")
      .select("id")
      .eq("blog_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingLike) {
      return NextResponse.json(
        { error: "You have already liked this blog" },
        { status: 400 },
      );
    }

    // Insert into blog_likes table
    const { error: likeError } = await supabase.from("blog_likes").insert({
      blog_id: id,
      user_id: user.id,
      created_at: new Date().toISOString(),
    });

    if (likeError) {
      console.error("Error adding like:", likeError);
      return NextResponse.json(
        { error: likeError.message || "Failed to like blog" },
        { status: 500 },
      );
    }

    // Get current likes count and increment
    const { data: blogData } = await supabase
      .from("blogs")
      .select("likes_count")
      .eq("id", id)
      .maybeSingle();

    const newLikesCount = (blogData?.likes_count || 0) + 1;

    // Update likes_count in blogs table
    const { data, error: updateError } = await supabase
      .from("blogs")
      .update({ likes_count: newLikesCount })
      .eq("id", id)
      .select("likes_count")
      .single();

    if (updateError) {
      console.error("Error updating likes count:", updateError);
      return NextResponse.json(
        { error: updateError.message || "Failed to update likes count" },
        { status: 500 },
      );
    }

    console.log("Like successful:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in like API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to like blog" },
      { status: 500 },
    );
  }
}
