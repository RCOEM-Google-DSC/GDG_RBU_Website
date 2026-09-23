export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { PortfolioService } from "@/modules/portfolio";

const service = new PortfolioService();

export async function POST(req: Request) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const result = await service.uploadImage(user.id, file);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("PORTFOLIO UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err?.message },
      { status: 500 },
    );
  }
}
