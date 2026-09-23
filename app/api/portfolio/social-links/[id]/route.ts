import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio";

const service = new PortfolioService();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update a social link
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const social_link = await service.updateSocialLink(user.id, id, body);
    return NextResponse.json({ social_link }, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT /api/portfolio/social-links/[id] error:", error);
    const message = error instanceof Error ? error.message : "Failed to update social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a social link
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await service.deleteSocialLink(user.id, id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete social link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
