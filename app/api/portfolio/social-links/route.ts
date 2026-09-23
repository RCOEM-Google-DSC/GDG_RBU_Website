import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();

// GET - Fetch all social links for a specific portfolio
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

    const social_links = await service.getSocialLinks(user.id, portfolioId);
    return NextResponse.json({ social_links }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch social links";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new social link
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.platform || !body.url || !body.portfolio_id) {
      return NextResponse.json(
        { error: "Platform, URL, and portfolio_id are required" },
        { status: 400 },
      );
    }

    const social_link = await service.addSocialLink(user.id, body.portfolio_id, body);
    return NextResponse.json({ social_link }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/portfolio/social-links error:", error);
    const message = error instanceof Error ? error.message : "Failed to create social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
