import { NextResponse } from "next/server";
import { BlogService } from "@/modules/blog";
import { createClient as createServerClient } from "@/supabase/server";

const service = new BlogService();

export async function GET() {
  try {
    // Auth
    const authClient = await createServerClient();
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blogs = await service.getByWriter(user.id);
    return NextResponse.json({ blogs });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch blogs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
