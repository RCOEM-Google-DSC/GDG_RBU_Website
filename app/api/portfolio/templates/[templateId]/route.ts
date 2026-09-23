import { NextRequest, NextResponse } from "next/server";
import { PortfolioService } from "@/modules/portfolio";

const service = new PortfolioService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  try {
    const { templateId } = await params;
    const template = await service.getTemplate(templateId);

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...template,
      preview_url: `/portfolio-preview/${templateId}`,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 },
    );
  }
}
