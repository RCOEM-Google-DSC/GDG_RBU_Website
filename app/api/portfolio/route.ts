import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();

// GET - Fetch current user's portfolio with all relations
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || undefined;

    const portfolio = await service.get(user.id, id);
    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new portfolio
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.template_id || !body.display_name) {
      return NextResponse.json(
        { error: "template_id and display_name are required" },
        { status: 400 },
      );
    }

    const portfolio = await service.create(user.id, body);
    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/portfolio error:", error);
    const message = error instanceof Error ? error.message : "Failed to create portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update portfolio
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Portfolio ID is required" }, { status: 400 });
    }

    const portfolio = await service.update(user.id, body.id, body);
    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete portfolio
export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await service.delete(user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
