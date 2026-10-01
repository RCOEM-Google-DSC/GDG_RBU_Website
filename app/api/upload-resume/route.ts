// app/api/upload-resume/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
});

type UploadResult = {
  secure_url?: string;
  public_id?: string;
  bytes?: number;
  format?: string;
  original_filename?: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["application/pdf"];
const FOLDER = "GDG_RECRUITMENT_RESUMES";

export async function POST(req: Request) {
  try {
    if (
      !process.env["CLOUDINARY_CLOUD_NAME"] ||
      !process.env["CLOUDINARY_API_KEY"] ||
      !process.env["CLOUDINARY_API_SECRET"]
    ) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 2 MB." },
        { status: 413 },
      );
    }

    // Convert file to buffer for Cloudinary stream upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Build a unique public_id that keeps the .pdf extension
    const baseName = (file.name || "resume").replace(/\.pdf$/i, "");
    const uniqueSuffix = Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const publicId = `${baseName}_${uniqueSuffix}.pdf`;

    const uploadResult = await new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: FOLDER,
            resource_type: "raw",
            public_id: publicId,
            timeout: 60000,
          },
          (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result ?? {});
          },
        )
        .end(buffer);
    });

    if (!uploadResult.secure_url) {
      return NextResponse.json(
        { error: "Upload failed", details: "No URL returned" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id ?? null,
      original_filename: uploadResult.original_filename ?? null,
    });
  } catch (err: unknown) {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? (err as { message: string }).message
        : "Unknown upload error";
    console.error("RESUME UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: message },
      { status: 500 },
    );
  }
}
