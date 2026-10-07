// app/api/upload-resume/route.ts
// Uploads resume PDFs to Azure Blob Storage.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["application/pdf"];

function getContainerClient() {
  const connStr = process.env["AZURE_STORAGE_CONNECTION_STRING"];
  const containerName = process.env["AZURE_STORAGE_CONTAINER"] || "resumes";

  if (!connStr) throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING");

  const blobService = BlobServiceClient.fromConnectionString(connStr);
  return blobService.getContainerClient(containerName);
}

export async function POST(req: Request) {
  try {
    if (!process.env["AZURE_STORAGE_CONNECTION_STRING"]) {
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

    const buffer = Buffer.from(await file.arrayBuffer());

    // Build unique blob name
    const baseName = (file.name || "resume").replace(/\.pdf$/i, "");
    const uniqueSuffix = Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const blobName = `Resume_${uniqueSuffix}_${baseName}.pdf`;

    const containerClient = getContainerClient();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: "application/pdf",
        blobContentDisposition: "inline",
      },
    });

    return NextResponse.json({
      url: blockBlobClient.url,
      blob_name: blobName,
      original_filename: file.name,
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
