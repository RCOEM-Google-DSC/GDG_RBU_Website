import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    // Use service role key for admin operations
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();

    const { writerEmail, imageUrl, title, markdown, publishedAt } = body;

    // Validate required fields
    if (!writerEmail || !title || !markdown) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: writerEmail, title, and markdown are required",
        },
        { status: 400 },
      );
    }

    // Look up the writer by email
    const { data: writer, error: writerError } = await supabase
      .from("users")
      .select("id, name, email, role")
      .eq("email", writerEmail)
      .single();

    if (writerError || !writer) {
      return NextResponse.json(
        { error: `Team member with email ${writerEmail} not found` },
        { status: 404 },
      );
    }

    // Validate that the user is a team member
    if (writer.role !== "member" && writer.role !== "admin") {
      return NextResponse.json(
        {
          error: `User ${writerEmail} is not a team member (role: ${writer.role})`,
        },
        { status: 403 },
      );
    }

    // Insert the blog post
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .insert({
        writer_id: writer.id,
        image_url: imageUrl || null,
        title,
        markdown,
        published_at: publishedAt || new Date().toISOString(),
        likes_count: 0,
      })
      .select()
      .single();

    if (blogError) {
      console.error("Blog creation error:", blogError);
      return NextResponse.json(
        { error: blogError.message || "Failed to create blog post" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog: {
          ...blog,
          writer: {
            name: writer.name,
            email: writer.email,
          },
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
