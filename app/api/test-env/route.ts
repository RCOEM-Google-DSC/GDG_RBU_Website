import { NextResponse } from "next/server";

export async function GET() {
  const keys = Object.keys(process.env);
  
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    totalKeys: keys.length,
    // Explicit checks
    checks: {
      CLOUDINARY_CLOUD_NAME: !!process.env["CLOUDINARY_CLOUD_NAME"],
      CLOUDINARY_API_KEY: !!process.env["CLOUDINARY_API_KEY"],
      CLOUDINARY_API_SECRET: !!process.env["CLOUDINARY_API_SECRET"],
      CLOUDINARY_URL: !!process.env["CLOUDINARY_URL"],
    },
    // Filtered keys to see if there's a typo (e.g. lowercase)
    cloudinaryRelatedKeys: keys.filter(k => k.toLowerCase().includes("cloudinary")),
    nextPublicKeys: keys.filter(k => k.startsWith("NEXT_PUBLIC_")),
  });
}
