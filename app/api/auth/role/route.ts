import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

// Resolves the current user's role server-side. Running this on the server
// avoids the browser Supabase client's navigator-lock contention that can make
// the client-side session/role lookup hang on page load. It reads the same
// auth cookies the middleware manages, so it stays consistent with the server.
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ authenticated: false, role: null });
    }

    const { data } = await supabase
      .from("users")
      .select("id, role")
      .eq("id", user.id)
      .single();

    if (!data) {
      // Authenticated but no role row yet — let the client retry briefly.
      return NextResponse.json({ authenticated: true, id: user.id, role: null });
    }

    return NextResponse.json({
      authenticated: true,
      id: data.id,
      role: data.role,
    });
  } catch {
    return NextResponse.json({ authenticated: false, role: null });
  }
}
