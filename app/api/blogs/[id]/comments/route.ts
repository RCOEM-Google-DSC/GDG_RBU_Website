import { NextRequest, NextResponse } from "next/server";
import { BlogService, commentSchema } from "@/modules/blog";
import { createClient as createServerClient } from "@/supabase/server";

const service = new BlogService();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate
    const body = await request.json();
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    // Auth
    const authClient = await createServerClient();
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User must be authenticated to comment" },
        { status: 401 },
      );
    }

    const comment = await service.addComment(id, user.id, parsed.data.comment);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to add comment";

    console.error("Error adding comment:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
