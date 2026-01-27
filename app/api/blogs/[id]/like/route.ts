import { NextRequest, NextResponse } from "next/server";
import { likeBlog } from "@/supabase/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("Attempting to like blog:", id);

    const result = await likeBlog(id);
    console.log("Like successful:", result);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error in like API route:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: error.message || "Failed to like blog" },
      { status: 500 },
    );
  }
}
