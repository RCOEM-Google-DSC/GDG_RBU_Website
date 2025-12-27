import { NextRequest, NextResponse } from "next/server";
import { createEvent, getEvents } from "@/supabase/supabase";

export async function GET() {
  try {
    const events = await getEvents();
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
    } = body;

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 },
      );
    }

    const event = await createEvent({
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
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create event" },
      { status: 500 },
    );
  }
}
