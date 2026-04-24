// app/api/upload/route.ts
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
  eager?: Array<{ secure_url?: string }>;
};

const uploadWithSdk = async (buffer: Buffer, folder: string): Promise<UploadResult> =>
  new Promise<UploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
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

const uploadWithSignedFetch = async (
  buffer: Buffer,
  file: File,
  folder: string,
): Promise<UploadResult> => {
  const cloudName = process.env["CLOUDINARY_CLOUD_NAME"]!;
  const apiKey = process.env["CLOUDINARY_API_KEY"]!;
  const apiSecret = process.env["CLOUDINARY_API_SECRET"]!;
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign: Record<string, string | number> = {
    folder,
    timestamp,
    unique_filename: "true",
    use_filename: "true",
  };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: file.type }), file.name || "upload-image");
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("use_filename", "true");
  formData.append("unique_filename", "true");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    const text = await res.text();
    let parsed: UploadResult | { error?: { message?: string } } | null = null;
    try {
      parsed = text ? (JSON.parse(text) as UploadResult | { error?: { message?: string } }) : null;
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      const message =
        typeof parsed === "object" &&
        parsed !== null &&
        "error" in parsed &&
        parsed.error?.message
          ? parsed.error.message
          : `Cloudinary HTTP ${res.status}`;
      throw new Error(message);
    }

    return (parsed as UploadResult) ?? {};
  } finally {
    clearTimeout(timeoutId);
  }
};

export async function POST(req: Request) {
  try {
    if (
      !process.env["CLOUDINARY_CLOUD_NAME"] ||
      !process.env["CLOUDINARY_API_KEY"] ||
      !process.env["CLOUDINARY_API_SECRET"]
    ) {
      console.error("Cloudinary env vars missing in upload route");
      return NextResponse.json(
        {
          error: "Cloudinary env vars missing",
          details: "Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET",
        },
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

    // Convert file -> buffer for Cloudinary stream upload
    const buffer = Buffer.from(await file.arrayBuffer());
    let uploadResult: UploadResult;
    try {
      uploadResult = await uploadWithSdk(buffer, folder);
    } catch (sdkError: unknown) {
      const sdkMessage =
        typeof sdkError === "object" &&
        sdkError !== null &&
        "message" in sdkError &&
        typeof (sdkError as { message?: unknown }).message === "string"
          ? (sdkError as { message: string }).message
          : "";
      const sdkName =
        typeof sdkError === "object" &&
        sdkError !== null &&
        "name" in sdkError &&
        typeof (sdkError as { name?: unknown }).name === "string"
          ? (sdkError as { name: string }).name
          : "";
      const sdkHttpCode =
        typeof sdkError === "object" &&
        sdkError !== null &&
        "http_code" in sdkError &&
        typeof (sdkError as { http_code?: unknown }).http_code === "number"
          ? (sdkError as { http_code: number }).http_code
          : 0;

      const isTimeout =
        sdkName.toLowerCase().includes("timeout") ||
        sdkMessage.toLowerCase().includes("timeout") ||
        sdkMessage.toLowerCase().includes("request timeout") ||
        sdkHttpCode === 499;

      if (!isTimeout) {
        throw sdkError;
      }

      console.warn("Cloudinary SDK upload timed out, retrying via signed fetch");
      uploadResult = await uploadWithSignedFetch(buffer, file, folder);
    }

    if (!uploadResult.secure_url) {
      return NextResponse.json(
        { error: "Upload failed", details: "No secure URL returned by Cloudinary" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: uploadResult.eager?.[0]?.secure_url ?? uploadResult.secure_url,
      secure_url: uploadResult.secure_url ?? null,
      transformed_url: uploadResult.eager?.[0]?.secure_url ?? null,
      public_id: uploadResult.public_id ?? null,
    });
  } catch (err: unknown) {
    const status =
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      typeof (err as { name?: unknown }).name === "string" &&
      (err as { name: string }).name === "AbortError"
        ? 504
        : 500;
    const message =
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
        ? ((err as { message: string }).message)
        : "Unknown upload error";
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", details: message },
      { status },
    );
  }
}
