import { NextResponse } from "next/server";
import { getBlogs } from "@/supabase/blogs-server";

export async function GET() {
  try {
    const blogs = await getBlogs();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
