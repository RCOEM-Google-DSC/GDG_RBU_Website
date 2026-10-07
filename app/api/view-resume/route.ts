// app/api/view-resume/route.ts
// Simple redirect for resume viewing.
// Azure Blob Storage serves PDFs with correct Content-Type headers,
// so we just redirect to the blob URL.
// For old Cloudinary URLs, we proxy through with correct headers.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resumeUrl = searchParams.get("url");

  if (!resumeUrl) {
    return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
  }

  // Azure Blob URLs work directly — just redirect
  if (resumeUrl.includes("blob.core.windows.net")) {
    return NextResponse.redirect(resumeUrl);
  }

  // For legacy Cloudinary URLs, proxy the PDF with correct headers
  if (resumeUrl.includes("res.cloudinary.com")) {
    try {
      const res = await fetch(resumeUrl, { signal: AbortSignal.timeout(15000) });
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline",
            "Cache-Control": "public, max-age=86400",
          },
        });
      }
      return NextResponse.json(
        { error: `Could not fetch resume (${res.status}). Old Cloudinary uploads may no longer be accessible.` },
        { status: 502 },
      );
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
  }

  // Unknown URL — reject
  return NextResponse.json({ error: "Unsupported URL" }, { status: 403 });
}
