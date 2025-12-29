// app/api/upload/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    // Safety check
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary env vars missing" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file → buffer (Node only)
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "GDG_PFP",
          resource_type: "auto", // supports HEIC / PNG / JPG / WEBP etc
          eager: [{ fetch_format: "auto", quality: "auto" }],
          eager_async: false,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      ).end(buffer);
    });

    const transformedUrl =
      uploadResult?.eager?.[0]?.secure_url ?? null;

    return NextResponse.json({
      url: transformedUrl ?? uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      transformed_url: transformedUrl,
      public_id: uploadResult.public_id,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err?.message },
      { status: 500 },
    );
  }
}
