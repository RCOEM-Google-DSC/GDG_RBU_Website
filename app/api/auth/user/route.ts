import { NextResponse } from 'next/server';
import { getCurrentUserId, getSession } from '@/supabase/supabase';

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    const session = await getSession();

    if (!userId || !session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: session.user,
      userId,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
