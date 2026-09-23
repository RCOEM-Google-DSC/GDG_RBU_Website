import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update an experience entry
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const experience = await service.updateExperience(user.id, id, body);
    return NextResponse.json({ experience }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete an experience entry
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await service.deleteExperience(user.id, id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete experience";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
