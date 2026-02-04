import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { Portfolio } from "@/lib/types";

// GET - Fetch current user's portfolio with all relations
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
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new portfolio (one per user)
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

    // Check if user already has a portfolio
    const { data: existing } = await supabase
      .from("portfolios")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "User already has a portfolio. Use PUT to update." },
        { status: 409 },
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.template_id || !body.display_name) {
      return NextResponse.json(
        { error: "template_id and display_name are required" },
        { status: 400 },
      );
    }

    const { data: portfolio, error } = await supabase
      .from("portfolios")
      .insert({
        user_id: user.id,
        template_id: body.template_id,
        display_name: body.display_name,
        profile_image_url: body.profile_image_url || null,
        about_me: body.about_me || null,
        languages: body.languages || [],
        frameworks: body.frameworks || [],
        tools: body.tools || [],
        is_published: body.is_published || false,
      })
      .select()
      .single();

    if (error) {
      console.error("Portfolio creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/portfolio error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update portfolio
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: Partial<Portfolio> = await request.json();

    // Remove fields that shouldn't be updated directly
    const {
      id,
      user_id,
      created_at,
      template,
      projects,
      experience,
      social_links,
      ...updateData
    } = body;

    const { data: portfolio, error } = await supabase
      .from("portfolios")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select(
        `
        *,
        template:portfolio_templates(*),
        projects:portfolio_projects(*),
        experience:portfolio_experience(*),
        social_links:portfolio_social_links(*)
      `,
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete portfolio (cascades to projects, experience, social_links)
export async function DELETE() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
