"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { getCurrentUserId } from "@/supabase/supabase";
import {
  buildUIUser,
  buildUIEvents,
  buildUIBadges,
} from "../app/Components/Profile/Badges";
import {
  SupabaseUserRow,
  UIUser,
  UIEvent,
  UIBadge,
  Registration,
  EventRow,
} from "../lib/types";

interface UseProfileDataReturn {
  user: UIUser | null;
  events: UIEvent[];
  badges: UIBadge[];
  loading: boolean;
  error: string | null;
}

export function useProfileData(): UseProfileDataReturn {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<UIUser | null>(null);
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [badges, setBadges] = useState<UIBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await getCurrentUserId();
        if (!userId) {
          setError("You must be logged in to view your profile.");
          setLoading(false);
          return;
        }

        // 1. Fetch user (Using explicit generic for SupabaseUserRow)
        const { data: userRow, error: userErr } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (userErr) throw userErr;
        if (!userRow) throw new Error("User not found");

        const typedUserRow = userRow as SupabaseUserRow;

        // 2. Fetch registrations
        const { data: registrations, error: regErr } = await supabase
          .from("registrations")
          .select("*")
          .eq("user_id", userId);

        if (regErr) throw regErr;
        const typedRegistrations = (registrations || []) as Registration[];

        // 3. Fetch events
        let uiEvents: UIEvent[] = [];
        if (typedRegistrations.length > 0) {
          const eventIds = typedRegistrations.map((r) => r.event_id);

          const { data: eventsData, error: eventsErr } = await supabase
            .from("events")
            .select("id, title, event_time, image_url")
            .in("id", eventIds);

          if (eventsErr) throw eventsErr;

          if (eventsData) {
            uiEvents = buildUIEvents(
              eventsData as EventRow[],
              typedRegistrations
            );
          }
        }

        // 4. Badges (Assuming userRow.badges exists in SupabaseUserRow)
        const uiBadges = buildUIBadges(typedUserRow.badges || []);

        // 5. User Summary
        const uiUser = buildUIUser(typedUserRow, uiEvents.length, uiBadges.length);

        setUser(uiUser);
        setEvents(uiEvents);
        setBadges(uiBadges);
      } catch (err: any) {
        console.error("Profile data load error:", err);
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [supabase]); 

  return { user, events, badges, loading, error };
}
