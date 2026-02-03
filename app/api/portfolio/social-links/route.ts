import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { SocialLinkFormData } from "@/lib/types";

// GET - Fetch all social links for current user's portfolio
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: portfolio } = await supabase
      .from("portfolios")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }

    const { data: social_links, error } = await supabase
      .from("portfolio_social_links")
      .select("*")
      .eq("portfolio_id", portfolio.id)
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ social_links }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch social links";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new social link
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: portfolio } = await supabase
      .from("portfolios")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found. Create a portfolio first." },
        { status: 404 },
      );
    }

    const body: SocialLinkFormData = await request.json();

    if (!body.platform || !body.url) {
      return NextResponse.json(
        { error: "Platform and URL are required" },
        { status: 400 },
      );
    }

    // Check if platform already exists for this portfolio
    const { data: existing } = await supabase
      .from("portfolio_social_links")
      .select("id")
      .eq("portfolio_id", portfolio.id)
      .eq("platform", body.platform)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error: `Social link for ${body.platform} already exists. Use PUT to update.`,
        },
        { status: 409 },
      );
    }

    // Get max display_order
    const { data: maxOrder } = await supabase
      .from("portfolio_social_links")
      .select("display_order")
      .eq("portfolio_id", portfolio.id)
      .order("display_order", { ascending: false })
      .limit(1)
      .single();

    const { data: social_link, error } = await supabase
      .from("portfolio_social_links")
      .insert({
        portfolio_id: portfolio.id,
        platform: body.platform,
        url: body.url,
        display_order: body.display_order ?? (maxOrder?.display_order ?? 0) + 1,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ social_link }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
