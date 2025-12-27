// app/api/upload-cloudinary/route.ts (or wherever your route is)
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// configure cloudinary from env (unchanged)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Upload a file sent as formData field "file" to Cloudinary.
 * - Keeps using upload_stream
 * - Adds an eager transformation to produce a browser-friendly variant (f_auto,q_auto)
 * - Returns both original secure_url and transformed_url (if available)
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file into buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload options:
    // - folder: keep your folder
    // - resource_type: "image" (makes intent explicit)
    // - eager: create a "safe" browser-friendly derived image using Cloudinary on upload
    //   fetch_format: "auto" chooses webp/jpg depending on client support
    //   quality: "auto" optimizes quality
    // - eager_async: false (create eagerly synchronously)
    const uploadOptions: Record<string, any> = {
      folder: "GDG_PFP",
      resource_type: "image",
      // Create a transformed derivative at upload time (browser friendly)
      eager: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
      ],
      eager_async: false,
    };

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      stream.end(buffer);
    });

    // uploadResult shape (example):
    // {
    //   public_id: 'GDG_PFP/abcd123',
    //   secure_url: 'https://res.cloudinary.com/.../abcd123.heic',
    //   eager: [{ secure_url: 'https://res.cloudinary.com/.../abcd123.f_auto.jpg', ... }],
    //   ...
    // }

    // Prefer the transformed eager URL if Cloudinary produced one; fall back to original secure_url.
    const transformedUrl =
      uploadResult?.eager && uploadResult.eager.length > 0
        ? uploadResult.eager[0].secure_url
        : null;

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      transformed_url: transformedUrl, // may be null if eager wasn't produced for some reason
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: error?.message ?? String(error) }, { status: 500 });
  }
}
