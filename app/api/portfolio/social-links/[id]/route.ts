import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { SocialLinkFormData } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update a social link
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const body: Partial<SocialLinkFormData> = await request.json();

    const { data: social_link, error } = await supabase
      .from("portfolio_social_links")
      .update(body)
      .eq("id", id)
      .eq("portfolio_id", portfolio.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ social_link }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a social link
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const { error } = await supabase
      .from("portfolio_social_links")
      .delete()
      .eq("id", id)
      .eq("portfolio_id", portfolio.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
