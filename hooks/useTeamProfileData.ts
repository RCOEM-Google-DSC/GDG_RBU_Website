"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

export function useTeamProfileData(userId: string) {
  const supabase = useMemo(() => createClient(), []);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!userId) return;

        setLoading(true);

        const { data: profileData, error } = await supabase
          .from("team_members")
          .select(
            `
              id,
              domain,
              bio,
              thought,
              cv_url,
              users (
                id,
                name,
                image_url,
                profile_links
              )
            `,
          )
          .eq("userid", userId)
          .maybeSingle();

        if (error) throw error;

        setData(profileData);
      } catch (err: any) {
        console.error("Hook Error:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId, supabase]);

  return { data, loading, error };
}
