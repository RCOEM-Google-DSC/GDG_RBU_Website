"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";

export function useTeamProfileData(userId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!userId) return;

        setLoading(true);

        const { data, error } = await supabase
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
          .single();

        if (error) throw error;

        setData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return { data, loading, error };
}
