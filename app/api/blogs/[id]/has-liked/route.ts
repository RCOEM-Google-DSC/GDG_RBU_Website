import { NextRequest, NextResponse } from "next/server";
import { hasUserLikedBlog } from "@/supabase/blogs-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const hasLiked = await hasUserLikedBlog(id);

    return NextResponse.json({ hasLiked }, { status: 200 });
  } catch (error: any) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check like status" },
      { status: 500 },
    );
  }
}
