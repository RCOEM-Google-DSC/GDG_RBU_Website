// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

/**
 * Upload file sent in formData field "file" to Cloudinary.
 * - Path: /api/upload  (matches fetch("/api/upload") in your frontend)
 * - Keeps using upload_stream
 * - Adds an eager transformation (fetch_format: "auto", quality: "auto")
 * - Returns original secure_url and transformed_url (if produced)
 */

// configure Cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get name / extension / mime (best-effort)
    const fileName = (file as any).name ?? "upload";
    const fileExt = (fileName.split(".").pop() ?? "").toLowerCase();
    const mime = file.type ?? "";

    // Allow list of common image formats (include HEIC/HEIF, AVIF, TIFF, etc.)
    const allowedFormats = [
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "svg",
      "heic",
      "heif",
      "tiff",
      "tif",
      "bmp",
      "avif",
    ];

    // Upload options
    // - resource_type: "image" so Cloudinary treats it as an image (needed to allow eager transforms).
    //   If the extension is unknown / not in allowedFormats, we still try 'image' — Cloudinary usually inspects the file.
    // - eager: produce a browser-friendly derivative (f_auto, q_auto)
    const uploadOptions: Record<string, any> = {
      folder: "GDG_PFP",
      resource_type: "image",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      // Keep a permissive allowed_formats just to hint Cloudinary; Cloudinary may still accept other binary formats.
      allowed_formats: allowedFormats,
      eager: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
      ],
      eager_async: false,
    };

    // If the extension is totally unknown, fall back to 'auto' resource type as a safety net.
    // (This tries Cloudinary's automatic detection; keep as fallback.)
    if (fileExt && !allowedFormats.includes(fileExt)) {
      uploadOptions.resource_type = "auto";
    }

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: any, result: any) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.end(buffer);
    });

    // Prefer eager transformed URL if Cloudinary produced one; otherwise fall back to secure_url
    const transformedUrl =
      uploadResult?.eager && uploadResult.eager.length > 0
        ? uploadResult.eager[0].secure_url
        : null;

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      transformed_url: transformedUrl, // may be null if eager wasn't produced
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error?.message ?? String(error) },
      { status: 500 },
    );
  }
}
