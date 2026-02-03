import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ProjectFormData } from "@/lib/types";

// GET - Fetch all projects for current user's portfolio
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

    // Get user's portfolio
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

    const { data: projects, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("portfolio_id", portfolio.id)
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new project
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

    // Get user's portfolio
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

    const body: ProjectFormData = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 },
      );
    }

    // Get max display_order
    const { data: maxOrder } = await supabase
      .from("portfolio_projects")
      .select("display_order")
      .eq("portfolio_id", portfolio.id)
      .order("display_order", { ascending: false })
      .limit(1)
      .single();

    const { data: project, error } = await supabase
      .from("portfolio_projects")
      .insert({
        portfolio_id: portfolio.id,
        title: body.title,
        description: body.description || null,
        image_url: body.image_url || null,
        github_url: body.github_url || null,
        live_url: body.live_url || null,
        technologies: body.technologies || [],
        display_order: body.display_order ?? (maxOrder?.display_order ?? 0) + 1,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
