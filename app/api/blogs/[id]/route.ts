import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: blog, error } = await supabase
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
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
