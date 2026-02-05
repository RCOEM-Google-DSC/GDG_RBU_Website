import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import type { ProjectFormData } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update a project
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

    const body: Partial<ProjectFormData> & { portfolio_id?: string } = await request.json();

    // Verify ownership - find if this project belongs to a portfolio owned by this user
    const { data: projectCheck, error: checkError } = await supabase
      .from("portfolio_projects")
      .select("portfolio_id, portfolios!inner(user_id)")
      .eq("id", id)
      .eq("portfolios.user_id", user.id)
      .maybeSingle();

    if (checkError || !projectCheck) {
      return NextResponse.json(
        { error: "Project not found or unauthorized" },
        { status: 404 },
      );
    }

    const { data: project, error } = await supabase
      .from("portfolio_projects")
      .update({
        ...body,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a project
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
    const { data: projectCheck, error: checkError } = await supabase
      .from("portfolio_projects")
      .select("portfolios!inner(user_id)")
      .eq("id", id)
      .eq("portfolios.user_id", user.id)
      .maybeSingle();

    if (checkError || !projectCheck) {
      return NextResponse.json(
        { error: "Project not found or unauthorized" },
        { status: 404 },
      );
    }

    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
