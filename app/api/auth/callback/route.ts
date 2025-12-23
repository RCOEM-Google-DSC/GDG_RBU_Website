import { NextResponse } from "next/server";
import { supabase } from "@/supabase/supabase";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Exchange code for session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError);
      return NextResponse.redirect(
        new URL("/login?error=auth_failed", requestUrl.origin)
      );
    }

    // Check if user exists in users table
    if (sessionData?.user) {
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("id", sessionData.user.id)
        .single();

      // If user doesn't exist in users table, create them
      if (!existingUser && fetchError?.code === "PGRST116") {
        const { error: insertError } = await supabase.from("users").insert({
          id: sessionData.user.id,
          email: sessionData.user.email || "",
          name:
            sessionData.user.user_metadata?.full_name ||
            sessionData.user.user_metadata?.name ||
            sessionData.user.email?.split("@")[0] ||
            "User",
          image_url:
            sessionData.user.user_metadata?.avatar_url ||
            sessionData.user.user_metadata?.picture ||
            "user.png",
          provider: sessionData.user.app_metadata?.provider || "oauth",
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Error creating user record:", insertError);
          // Continue anyway - user is authenticated in auth.users
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/profile", requestUrl.origin));
}
