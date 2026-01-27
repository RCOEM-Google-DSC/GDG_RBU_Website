import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { comment } = body;

    if (
      !comment ||
      typeof comment !== "string" ||
      comment.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 },
      );
    }

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
        { error: "User must be authenticated to comment" },
        { status: 401 },
      );
    }

    // Insert comment
    const { data, error } = await supabase
      .from("comments_blogs")
      .insert({
        blog_id: id,
        user_id: user.id,
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
      return NextResponse.json(
        { error: error.message || "Failed to add comment" },
        { status: 500 },
      );
    }

    return NextResponse.json({ comment: data }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add comment" },
      { status: 500 },
    );
  }
}
