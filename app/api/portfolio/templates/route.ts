"use server";

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { PortfolioTemplate } from "@/lib/types";

import { TEMPLATE_FOLDER_MAP } from "@/lib/templates";

export async function GET() {
  try {
    const portfoliosDir = path.join(process.cwd(), "portfolios");

    // Check if portfolios directory exists
    if (!fs.existsSync(portfoliosDir)) {
      return NextResponse.json([]);
    }

    const folders = fs.readdirSync(portfoliosDir, { withFileTypes: true });
    const templates: PortfolioTemplate[] = [];

    for (const folder of folders) {
      if (!folder.isDirectory()) continue;

      // Only include templates that are in our recognized map
      const slug = TEMPLATE_FOLDER_MAP[folder.name];
      if (!slug) continue;

      const metadataPath = path.join(
        portfoliosDir,
        folder.name,
        "metadata.json",
      );

      if (fs.existsSync(metadataPath)) {
        try {
          const metadataContent = fs.readFileSync(metadataPath, "utf-8");
          const metadata = JSON.parse(metadataContent);

          templates.push({
            id: slug,
            name: metadata.name || folder.name,
            description: metadata.description || null,
            preview_image_url: `/api/portfolio/templates/${slug}/preview`,
            folder_name: folder.name,
            created_at: new Date().toISOString(),
          });
        } catch (parseError) {
          console.error(
            `Error parsing metadata for ${folder.name}:`,
            parseError,
          );
        }
      }
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
