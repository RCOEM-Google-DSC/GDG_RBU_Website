import { type NextRequest, NextResponse } from "next/server";
import { BlogService, updateBlogSchema } from "@/modules/blog";
import { createClient as createServerClient } from "@/supabase/server";

const service = new BlogService();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const blog = await service.getById(id);
    return NextResponse.json({ blog });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Auth
    const authClient = await createServerClient();
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate
    const body = await request.json();
    const parsed = updateBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    const blog = await service.update(id, parsed.data, user.id);
    return NextResponse.json({ success: true, blog });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update blog";

    // Map known service errors to HTTP status codes
    const status = message.includes("not found")
      ? 404
      : message.includes("only edit your own")
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
