import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: blogs, error } = await supabase
      .from("blogs")
      .select(
        `
        *,
        writer:writer_id (
          id,
          name,
          image_url
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
