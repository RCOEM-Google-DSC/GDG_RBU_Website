import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio";

const service = new PortfolioService();

// GET - Fetch all projects for a specific portfolio
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");
    if (!portfolioId) {
      return NextResponse.json({ error: "portfolioId is required" }, { status: 400 });
    }

    const projects = await service.getProjects(user.id, portfolioId);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new project
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.portfolio_id) {
      return NextResponse.json(
        { error: "Project title and portfolio_id are required" },
        { status: 400 },
      );
    }

    const project = await service.addProject(user.id, body.portfolio_id, body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
