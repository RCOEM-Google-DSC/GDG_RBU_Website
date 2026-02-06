import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("Attempting to unlike blog:", id);

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
        { error: "User must be authenticated to unlike a blog" },
        { status: 401 },
      );
    }

    // Remove from blog_likes table
    const { error: unlikeError } = await supabase
      .from("blog_likes")
      .delete()
      .eq("blog_id", id)
      .eq("user_id", user.id);

    if (unlikeError) {
      console.error("Error removing like:", unlikeError);
      return NextResponse.json(
        { error: unlikeError.message || "Failed to unlike blog" },
        { status: 500 },
      );
    }

    // Get current likes count and decrement
    const { data: blogData } = await supabase
      .from("blogs")
      .select("likes_count")
      .eq("id", id)
      .maybeSingle();

    const newLikesCount = Math.max((blogData?.likes_count || 0) - 1, 0);

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

    console.log("Unlike successful:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in unlike API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to unlike blog" },
      { status: 500 },
    );
  }
}
