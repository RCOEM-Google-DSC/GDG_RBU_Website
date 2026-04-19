// app/api/upload/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";

interface CloudinaryUploadSuccess {
  secure_url?: string;
  public_id?: string;
}

interface CloudinaryUploadError {
  error?: {
    message?: string;
    http_code?: number;
    name?: string;
  };
}

export async function POST(req: Request) {
  try {
    // Safety check
    const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
    const apiKey = process.env["CLOUDINARY_API_KEY"];
    const apiSecret = process.env["CLOUDINARY_API_SECRET"];

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary env vars missing in upload route");
      return NextResponse.json(
        { error: "Cloudinary env vars missing" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const requestedFolder = formData.get("folder");
    const folder =
      typeof requestedFolder === "string" && requestedFolder.trim()
        ? requestedFolder.trim()
        : "GDG_PFP";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image is too large. Maximum size is 10MB." },
        { status: 413 },
      );
    }

    // Convert file → buffer (Node only)
    const buffer = Buffer.from(await file.arrayBuffer());

    const cloudinaryForm = new FormData();
    cloudinaryForm.append(
      "file",
      new Blob([buffer], { type: file.type }),
      file.name || "upload-image",
    );
    cloudinaryForm.append("folder", folder);
    cloudinaryForm.append("use_filename", "true");
    cloudinaryForm.append("unique_filename", "true");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let uploadResponse: Response;
    try {
      uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
          },
          body: cloudinaryForm,
          signal: controller.signal,
        },
      );
    } finally {
      clearTimeout(timeoutId);
    }

    const responseText = await uploadResponse.text();
    let parsed: CloudinaryUploadSuccess | CloudinaryUploadError | null = null;

    try {
      parsed = responseText
        ? (JSON.parse(responseText) as
            | CloudinaryUploadSuccess
            | CloudinaryUploadError)
        : null;
    } catch {
      parsed = null;
    }

    if (!uploadResponse.ok) {
      const details =
        (parsed as CloudinaryUploadError | null)?.error?.message ||
        `Cloudinary upload failed with status ${uploadResponse.status}`;
      return NextResponse.json(
        { error: "Upload failed", details },
        { status: uploadResponse.status },
      );
    }

    const uploadResult = parsed as CloudinaryUploadSuccess | null;
    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { error: "Upload failed", details: "No secure URL returned by Cloudinary" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      transformed_url: null,
      public_id: uploadResult.public_id ?? null,
    });
  } catch (err: unknown) {
    const fallbackMessage =
      err instanceof Error ? err.message : "Unknown upload error";
    const isTimeout =
      (err instanceof DOMException && err.name === "AbortError") ||
      fallbackMessage.toLowerCase().includes("timeout");

    const message = isTimeout
      ? "Cloudinary upload timed out. Please retry with a smaller image."
      : fallbackMessage;
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: message },
      { status: isTimeout ? 504 : 500 },
    );
  }
}
