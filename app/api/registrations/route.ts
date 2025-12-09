import { NextRequest, NextResponse } from 'next/server';
import { registerForEvent, getUserRegistrations } from '@/supabase/supabase';

export async function GET() {
  try {
    const registrations = await getUserRegistrations();
    return NextResponse.json({ registrations });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch registrations' },
      { status: error.message.includes('authenticated') ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const registration = await registerForEvent(event_id, {
      team_name,
      team_members,
      is_team_registration,
      wants_random_team,
      is_open_to_alliances,
    });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create registration' },
      { status: error.message.includes('authenticated') ? 401 : 500 }
    );
  }
}
