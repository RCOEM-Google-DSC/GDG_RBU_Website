import React from "react";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";
import ProfileClientView, { ProfileData } from "./ProfileClientView";

export default async function TeamProfilePage({
  params: paramsPromise,
}: {
  params: Promise<{ userId: string }>;
}) {
  const params = await paramsPromise;
  const userId = params.userId;

  if (!userId) {
    return notFound();
  }

  const supabase = await createClient();

  // get authenticated user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const authUserId = authUser?.id ?? null;
  const isSelf = Boolean(authUserId && userId && authUserId === userId);

  // Fetch profile logic
  let profile: ProfileData | null = null;

  // get team member data
  const { data: teamMemberData } = await supabase
    .from("team_members")
    .select(
      `
      userid,
      domain,
      "club role",
      bio,
      thought,
      leetcode,
      twitter,
      instagram,
      club_email,
      cv_url,
      users (
        id,
        name,
        email,
        image_url,
        profile_links,
        branch,
        section,
        phone_number,
        role
      )
    `
    )
    .eq("userid", userId)
    .maybeSingle();

  if (teamMemberData) {
    // Map "club role" (with space) to club_role for easier access
    profile = {
      ...teamMemberData,
      club_role: (teamMemberData as any)["club role"],
    } as unknown as ProfileData;
  } else {
    // try to get basic user data
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userData) {
      profile = {
        userid: userData.id,
        domain: userData.role === "admin" ? "Admin" : null,
        bio: null,
        thought: null,
        leetcode: null,
        twitter: null,
        instagram: null,
        club_email: null,
        cv_url: userData.profile_links?.resume || null,
        users: userData,
      } as ProfileData;
    }
  }

  if (!profile) {
    return notFound();
  }

  return (
    <ProfileClientView
      profile={profile}
      isSelf={isSelf}
      authUserId={authUserId}
    />
  );
}