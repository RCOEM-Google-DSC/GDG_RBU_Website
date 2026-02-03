export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@/supabase/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Safety check for Cloudinary credentials
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

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, PNG, WEBP, and HEIC are allowed.",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary with user-specific public_id
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "GDG_Portfolio",
            public_id: `profile_${user.id}`, // Use user ID as filename
            resource_type: "auto",
            overwrite: true, // Overwrite existing image for this user
            eager: [
              {
                width: 400,
                height: 400,
                crop: "fill",
                gravity: "face",
                fetch_format: "auto",
                quality: "auto",
              },
            ],
            eager_async: false,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const transformedUrl = uploadResult?.eager?.[0]?.secure_url ?? null;

    return NextResponse.json({
      url: transformedUrl ?? uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      transformed_url: transformedUrl,
      public_id: uploadResult.public_id,
    });
  } catch (err: any) {
    console.error("PORTFOLIO UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err?.message },
      { status: 500 },
    );
  }
}
