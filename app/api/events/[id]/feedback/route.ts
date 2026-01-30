import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: feedback, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("event_id", id)
      .order("submitted_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ feedback });
  } catch (error: any) {
    console.error("Error in GET /api/events/[id]/feedback:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch feedback" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const { subject, message } = await request.json();

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 },
      );
    }

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User must be authenticated to submit feedback" },
        { status: 401 },
      );
    }

    // Get user's email
    const { data: userData } = await supabase
      .from("users")
      .select("email")
      .eq("id", user.id)
      .single();

    if (!userData?.email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 },
      );
    }

    // Insert feedback
    const { data, error } = await supabase
      .from("feedback")
      .insert({
        event_id: id,
        user_id: user.id,
        email: userData.email,
        subject,
        message,
        submitted_at: new Date().toISOString(),
      })
      .select(
        `
        id,
        subject,
        message,
        submitted_at,
        user:user_id (
          name,
          image_url
        )
      `,
      )
      .single();

    if (error) {
      console.error(
        "Feedback error:",
        error.message,
        error.code,
        error.details,
      );
      return NextResponse.json(
        { error: error.message || "Failed to submit feedback" },
        { status: 500 },
      );
    }

    return NextResponse.json({ feedback: data }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/events/[id]/feedback:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
