import { NextRequest, NextResponse } from "next/server";

/**
 * Main preview route that delegates to template-specific routes
 * This acts as a router to ensure each template gets its own specialized handling
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { templateId } = data;

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 },
      );
    }

    // Route to template-specific endpoint
    const templateRoutes: Record<string, string> = {
      soft: "/api/portfolio/preview/soft",
      "minimalist-grid": "/api/portfolio/preview/minimalist-grid",
      magazine: "/api/portfolio/preview/magazine",
      "hyun-barng": "/api/portfolio/preview/hyun-barng",
    };

    const targetRoute = templateRoutes[templateId];

    if (!targetRoute) {
      return NextResponse.json(
        {
          error: `Template '${templateId}' not supported. Available templates: ${Object.keys(templateRoutes).join(", ")}`,
        },
        { status: 404 },
      );
    }

    // Forward the request to the template-specific route
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}${targetRoute}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Return the response from the template-specific route
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const html = await response.text();
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Preview routing error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 },
    );
  }
}
