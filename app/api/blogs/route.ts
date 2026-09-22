import { NextResponse } from "next/server";
import { BlogService } from "@/modules/blog";

const service = new BlogService();

export async function GET() {
  try {
    const blogs = await service.getAll();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch blogs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
