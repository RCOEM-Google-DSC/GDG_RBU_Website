import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ExperienceFormData } from "@/lib/types";

// GET - Fetch all experience entries for a specific portfolio
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

    const { data: experience, error } = await supabase
      .from("portfolio_experience")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ experience }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Add a new experience entry
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

    const body: ExperienceFormData & { portfolio_id: string } = await request.json();

    if (!body.company || !body.role || !body.start_date || !body.portfolio_id) {
      return NextResponse.json(
        { error: "Company, role, start_date, and portfolio_id are required" },
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
      .from("portfolio_experience")
      .select("display_order")
      .eq("portfolio_id", body.portfolio_id)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: experience, error } = await supabase
      .from("portfolio_experience")
      .insert({
        portfolio_id: body.portfolio_id,
        company: body.company,
        role: body.role,
        description: body.description || null,
        start_date: body.start_date,
        end_date: body.is_current ? null : body.end_date || null,
        is_current: body.is_current || false,
        display_order: body.display_order ?? (maxOrder?.display_order ?? 0) + 1,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
