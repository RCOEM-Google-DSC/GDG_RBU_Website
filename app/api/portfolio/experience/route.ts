import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ExperienceFormData } from "@/lib/types";

// GET - Fetch all experience entries for current user's portfolio
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

    const { data: experience, error } = await supabase
      .from("portfolio_experience")
      .select("*")
      .eq("portfolio_id", portfolio.id)
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

    const body: ExperienceFormData = await request.json();

    if (!body.company || !body.role || !body.start_date) {
      return NextResponse.json(
        { error: "Company, role, and start_date are required" },
        { status: 400 },
      );
    }

    // Get max display_order
    const { data: maxOrder } = await supabase
      .from("portfolio_experience")
      .select("display_order")
      .eq("portfolio_id", portfolio.id)
      .order("display_order", { ascending: false })
      .limit(1)
      .single();

    const { data: experience, error } = await supabase
      .from("portfolio_experience")
      .insert({
        portfolio_id: portfolio.id,
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
