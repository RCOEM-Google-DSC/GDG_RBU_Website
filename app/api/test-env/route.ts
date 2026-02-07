import { NextResponse } from "next/server";

export async function GET() {
  const keys = Object.keys(process.env);
  const cloudinaryKeys = keys.filter(k => k.startsWith("CLOUDINARY_"));
  const nextPublicKeys = keys.filter(k => k.startsWith("NEXT_PUBLIC_"));
  
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    totalKeys: keys.length,
    cloudinaryKeys,
    nextPublicKeys,
    // Do not return values for security, just keys
  });
}