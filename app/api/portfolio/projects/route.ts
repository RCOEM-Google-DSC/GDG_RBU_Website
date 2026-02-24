import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ProjectFormData } from "@/lib/types";

// GET - Fetch all projects for a specific portfolio
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "portfolioId is required" }, { status: 400 });
    }

    // Verify ownership
    const { data: portfolio } = await supabase
      .from("portfolios")
      .select("id")
      .eq("id", portfolioId)
      .eq("user_id", user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found or unauthorized" }, { status: 404 });
    }

    const { data: projects, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("portfolio_id", portfolioId)
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

    const body: ProjectFormData & { portfolio_id: string } = await request.json();

    if (!body.title || !body.portfolio_id) {
      return NextResponse.json(
        { error: "Project title and portfolio_id are required" },
        { status: 400 },
      );
    }

    // Verify ownership
    const { data: portfolio } = await supabase
      .from("portfolios")
      .select("id")
      .eq("id", body.portfolio_id)
      .eq("user_id", user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found or unauthorized" }, { status: 404 });
    }

    // Get max display_order
    const { data: maxOrder } = await supabase
      .from("portfolio_projects")
      .select("display_order")
      .eq("portfolio_id", body.portfolio_id)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: project, error } = await supabase
      .from("portfolio_projects")
      .insert({
        portfolio_id: body.portfolio_id,
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
