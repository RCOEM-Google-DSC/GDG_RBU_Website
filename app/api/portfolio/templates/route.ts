"use server";

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { PortfolioTemplate } from "@/lib/types";

// Map folder names to template slugs
const TEMPLATE_FOLDER_MAP: Record<string, string> = {
  "architectural-portfolio final": "architectural",
  "hyun-barng-style-portfolio final": "hyun-barng",
  "magzine-portfolio final": "magazine",
  "minimalist-grid-portfolio final": "minimalist-grid",
  "soft-portfolio final": "soft",
};

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

      const metadataPath = path.join(
        portfoliosDir,
        folder.name,
        "metadata.json",
      );

      if (fs.existsSync(metadataPath)) {
        try {
          const metadataContent = fs.readFileSync(metadataPath, "utf-8");
          const metadata = JSON.parse(metadataContent);

          const slug =
            TEMPLATE_FOLDER_MAP[folder.name] ||
            folder.name.toLowerCase().replace(/\s+/g, "-");

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
