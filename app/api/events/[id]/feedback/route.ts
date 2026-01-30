import { NextRequest, NextResponse } from "next/server";
import {
  submitFeedback,
  getEventFeedback,
} from "@/supabase/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const feedback = await getEventFeedback(id);
    return NextResponse.json({ feedback });
  } catch (error: any) {
    console.error("Error in GET /api/events/[id]/feedback:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { rating, feedback } = await request.json();

    if (!rating || !feedback) {
      return NextResponse.json(
        { error: "Rating and feedback are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const result = await submitFeedback(id, { 
      subject: `Rating: ${rating}/5`, 
      message: feedback 
    });
    return NextResponse.json({ feedback: result });
  } catch (error: any) {
    console.error("Error in POST /api/events/[id]/feedback:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
