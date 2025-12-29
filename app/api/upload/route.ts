// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using env variables (make sure these are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Upload handler that:
 *  - accepts a form field "file"
 *  - performs basic server-side validation (size + mime whitelist)
 *  - uploads via upload_stream with resource_type: "auto"
 *  - requests an eager transformed (f_auto,q_auto) derivative and returns that if available
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = (file as any).name || "upload";
    const size = (file as any).size ?? (await file.arrayBuffer()).byteLength;
    const mime = file.type || "";

    // Server-side validation
    const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
    const allowedMime = new Set([
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/avif",
      "image/gif",
      "image/svg+xml",
      // HEIC/HEIF may be reported differently across browsers. We accept the common ones:
      "image/heic",
      "image/heif",
      // some browsers may report generic 'image/*' or unknown; allow empty type but be cautious
    ]);

    if (size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large", details: `Max ${MAX_BYTES / 1024 / 1024} MB` },
        { status: 413 }
      );
    }

    // If mime exists and not in whitelist -> reject
    if (mime && !allowedMime.has(mime) && !mime.startsWith("image/")) {
      return NextResponse.json(
        { error: "Unsupported file type", details: mime },
        { status: 415 }
      );
    }

    // Read file into a buffer (works for both File and Blob)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload options: resource_type=auto so images (including heic/heif) and supported types accepted
    const uploadOptions: Record<string, any> = {
      folder: "GDG_PFP",
      resource_type: "auto",
      // create a transformed derivative (browser-friendly)
      eager: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
      ],
      eager_async: false,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(buffer);
    });

    // Inspect result and prefer the eager transformed URL if present
    const transformedUrl =
      uploadResult?.eager && Array.isArray(uploadResult.eager) && uploadResult.eager.length > 0
        ? uploadResult.eager[0].secure_url
        : null;

    return NextResponse.json(
      {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        transformed_url: transformedUrl,
        raw: {
          bytes: uploadResult.bytes,
          format: uploadResult.format,
          resource_type: uploadResult.resource_type,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    // Return more details so client can show them (but avoid leaking secrets)
    const message = err?.message ?? String(err);
    return NextResponse.json({ error: "Upload failed", details: message }, { status: 500 });
  }
}
