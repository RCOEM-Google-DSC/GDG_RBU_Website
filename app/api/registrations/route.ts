import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User must be authenticated" },
        { status: 401 },
      );
    }

    const { data: registrations, error } = await supabase
      .from("registrations")
      .select(
        `
        *,
        events (
          id,
          title,
          date,
          time,
          venue,
          image_url
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ registrations });
  } catch (error: any) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch registrations" },
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
        { error: "User must be authenticated" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const {
      event_id,
      team_name,
      team_members,
      is_team_registration,
      wants_random_team,
      is_open_to_alliances,
    } = body;

    if (!event_id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 },
      );
    }

    const { data: registration, error } = await supabase
      .from("registrations")
      .insert({
        event_id,
        user_id: user.id,
        team_name,
        team_members,
        is_team_registration: is_team_registration || false,
        wants_random_team: wants_random_team || false,
        is_open_to_alliances: is_open_to_alliances || false,
        status: "registered",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ registration }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create registration" },
      { status: 500 },
    );
  }
}
