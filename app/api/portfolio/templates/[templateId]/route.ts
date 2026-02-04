import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { SLUG_TO_FOLDER_MAP, type TemplateId } from "@/lib/templates";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  try {
    const { templateId } = await params;
    const folderName = SLUG_TO_FOLDER_MAP[templateId as TemplateId];

    if (!folderName) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 },
      );
    }

    const portfoliosDir = path.join(process.cwd(), "portfolios");
    const templateDir = path.join(portfoliosDir, folderName);

    if (!fs.existsSync(templateDir)) {
      return NextResponse.json(
        { error: "Template directory not found" },
        { status: 404 },
      );
    }

    // Read metadata
    const metadataPath = path.join(templateDir, "metadata.json");
    let metadata = { name: templateId, description: "" };
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    }

    // Return template info
    return NextResponse.json({
      id: templateId,
      name: metadata.name,
      description: metadata.description,
      folder_name: folderName,
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
