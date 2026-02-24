import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { Portfolio } from "@/lib/types";

interface RouteParams {
  params: Promise<{ userId: string }>;
}

// GET - Fetch public portfolio by user ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await params;
    const supabase = await createClient();

    const { data: portfolio, error } = await supabase
      .from("portfolios")
      .select(
        `
        *,
        template:portfolio_templates(*),
        projects:portfolio_projects(*),
        experience:portfolio_experience(*),
        social_links:portfolio_social_links(*)
      `,
      )
      .eq("user_id", userId)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Portfolio not found or not published" },
          { status: 404 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also fetch user info for display
    const { data: user } = await supabase
      .from("users")
      .select("name, email, image_url")
      .eq("id", userId)
      .single();

    return NextResponse.json(
      {
        portfolio: portfolio as Portfolio,
        user,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
