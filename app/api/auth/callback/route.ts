import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateProfileImageUrl } from "@/lib/utils";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const supabase = await createClient();

  let redirectUrl = "/profile";

  if (code) {
    // Exchange code for session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError);
      return NextResponse.redirect(
        new URL("/login?error=auth_failed", requestUrl.origin),
      );
    }

    // Check if user exists in users table
    if (sessionData?.user) {
      const userId = sessionData.user.id;
      let role = "user";

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", userId)
        .maybeSingle();

      if (existingUser) {
        role = existingUser.role;
      } else {
        // If user doesn't exist in users table, create them
        const userName =
          sessionData.user.user_metadata?.full_name ||
          sessionData.user.user_metadata?.name ||
          sessionData.user.email?.split("@")[0] ||
          "User";

        // Use OAuth avatar if available, otherwise generate from initials
        const oAuthAvatar =
          sessionData.user.user_metadata?.avatar_url ||
          sessionData.user.user_metadata?.picture;
        const imageUrl =
          oAuthAvatar ||
          generateProfileImageUrl(userName, sessionData.user.email || "");

        const provider = sessionData.user.app_metadata?.provider || "email";

        const { error: insertError } = await supabase.from("users").insert({
          id: userId,
          email: sessionData.user.email || "",
          name: userName,
          image_url: imageUrl,
          provider: provider,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Error creating user record:", insertError);
        }
      }

      // Redirect admins and members to team profile page
      if (role === "admin" || role === "member") {
        redirectUrl = `/team/profile/${userId}`;
      } else {
        redirectUrl = "/profile";
      }
    }
  }
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin));
}
