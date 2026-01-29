import { NextRequest, NextResponse } from "next/server";
import { getEvent, updateEvent } from "@/supabase/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const event = await getEvent(id);
    return NextResponse.json({ event });
  } catch (error: any) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch event" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
try {
    const { id } = await params;
    const body = await request.json();

    const event = await updateEvent(id, body);
    return NextResponse.json({ event });
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update event" },
      { status: 500 },
    );
  }
}
