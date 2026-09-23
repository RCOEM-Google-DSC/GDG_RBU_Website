import { NextRequest, NextResponse } from "next/server";
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();

interface RouteParams {
  params: Promise<{ userId: string }>;
}

// GET - Fetch public portfolio by user ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await params;
    const result = await service.getPublished(userId);

    if (!result) {
      return NextResponse.json(
        { error: "Portfolio not found or not published" },
        { status: 404 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
