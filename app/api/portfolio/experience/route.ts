import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();

// GET - Fetch all experience entries for a specific portfolio
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

    const experience = await service.getExperience(user.id, portfolioId);
    return NextResponse.json({ experience }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new experience entry
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.company || !body.role || !body.start_date || !body.portfolio_id) {
      return NextResponse.json(
        { error: "Company, role, start_date, and portfolio_id are required" },
        { status: 400 },
      );
    }

    const experience = await service.addExperience(user.id, body.portfolio_id, body);
    return NextResponse.json({ experience }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
