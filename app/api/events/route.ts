import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ events });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User must be authenticated to create an event" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      date,
      time,
      venue,
      is_paid,
      fee,
      qr_code,
      max_participants,
      is_team_event,
      max_team_size,
      category,
      image_url,
    } = body;

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 },
      );
    }

    const { data: event, error } = await supabase
      .from("events")
      .insert({
        title,
        description,
        date,
        time,
        venue,
        is_paid,
        fee,
        qr_code,
        max_participants,
        is_team_event,
        max_team_size,
        category,
        image_url,
        organizer_id: user.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      throw error;
    }

    return NextResponse.json({ event }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create event" },
      { status: 500 },
    );
  }
}
