import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ExperienceFormData } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update an experience entry
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

    const body: Partial<ExperienceFormData> & { portfolio_id?: string } = await request.json();

    // Verify ownership - find if this entry belongs to a portfolio owned by this user
    const { data: experienceCheck, error: checkError } = await supabase
      .from("portfolio_experience")
      .select("portfolio_id, portfolios!inner(user_id)")
      .eq("id", id)
      .eq("portfolios.user_id", user.id)
      .maybeSingle();

    if (checkError || !experienceCheck) {
      return NextResponse.json(
        { error: "Experience entry not found or unauthorized" },
        { status: 404 },
      );
    }

    // Handle is_current logic
    const updateData: Record<string, unknown> = { ...body };
    if (body.is_current === true) {
      updateData.end_date = null;
    }

    const { data: experience, error } = await supabase
      .from("portfolio_experience")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ experience }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete an experience entry
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

    // Verify ownership
    const { data: experienceCheck, error: checkError } = await supabase
      .from("portfolio_experience")
      .select("portfolios!inner(user_id)")
      .eq("id", id)
      .eq("portfolios.user_id", user.id)
      .maybeSingle();

    if (checkError || !experienceCheck) {
      return NextResponse.json(
        { error: "Experience entry not found or unauthorized" },
        { status: 404 },
      );
    }

    const { error } = await supabase
      .from("portfolio_experience")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
