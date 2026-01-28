import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    // If not authenticated, return false
    if (authError || !user) {
      return NextResponse.json({ hasLiked: false }, { status: 200 });
    }

    // Check if user has liked this blog
    const { data, error } = await supabase
      .from("blog_likes")
      .select("id")
      .eq("blog_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error checking like status:", error);
      return NextResponse.json({ hasLiked: false }, { status: 200 });
    }

    return NextResponse.json({ hasLiked: !!data }, { status: 200 });
  } catch (error: any) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check like status" },
      { status: 500 },
    );
  }
}
