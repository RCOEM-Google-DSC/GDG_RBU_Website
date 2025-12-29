// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

/**
 * POST /api/upload
 *
 * - Accepts multipart/form-data with field "file"
 * - Uses upload_stream and lets Cloudinary auto-detect file type (resource_type: "auto")
 * - Creates an eager derivative (fetch_format: "auto", quality: "auto")
 * - Returns:
 *   {
 *     url: "<preferred url (eager if present)>",
 *     secure_url: "<original secure url>",
 *     public_id: "...",
 *     transformed_url: "<eager secure_url or null>",
 *     eager: [ ... ] // raw eager array if you want more info
 *   }
 *
 * Important:
 * - Make sure CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET are set.
 * - Restart the dev server after setting env vars.
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

export async function POST(req: Request) {
  try {
    // quick env check
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary env vars missing");
      return NextResponse.json(
        { error: "Server misconfiguration: cloudinary env vars missing" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload options:
    // - resource_type: "auto" lets Cloudinary detect the incoming file type (good for HEIC/etc)
    // - eager: produce a browser-friendly derivative (f_auto,q_auto)
    const uploadOptions: Record<string, any> = {
      folder: "GDG_PFP",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      eager: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
      ],
      eager_async: false,
    };

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: any, result: any) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );

      // end the stream by writing the buffer
      stream.end(buffer);
    });

    // Cloudinary may put eager transforms in uploadResult.eager
    const transformedUrl =
      uploadResult?.eager && uploadResult.eager.length > 0
        ? uploadResult.eager[0].secure_url
        : null;

    // Prefer transformed url as the "url" field so client shows optimized image by default
    const preferredUrl = transformedUrl ?? uploadResult?.secure_url ?? null;

    return NextResponse.json({
      url: preferredUrl,
      secure_url: uploadResult?.secure_url ?? null,
      public_id: uploadResult?.public_id ?? null,
      transformed_url: transformedUrl,
      eager: uploadResult?.eager ?? null,
      format: uploadResult?.format ?? null,
      width: uploadResult?.width ?? null,
      height: uploadResult?.height ?? null,
    });
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}
