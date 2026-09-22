import { NextRequest, NextResponse } from "next/server";
import { BlogService, createBlogSchema } from "@/modules/blog";

const service = new BlogService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const parsed = createBlogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    const blog = await service.create(parsed.data);

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("Error creating blog:", error);

    const status = message.includes("not found")
      ? 404
      : message.includes("permitted role")
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
