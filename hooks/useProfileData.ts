"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
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
  const router = useRouter();
  const [user, setUser] = useState<UIUser | null>(null);
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [badges, setBadges] = useState<UIBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await getCurrentUserId();
        if (!userId) {
          setError("You must be logged in to view your profile.");
          return;
        }

        // 1. Fetch user
        const { data: userRow, error: userErr } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .maybeSingle<SupabaseUserRow>();

        if (userErr) throw userErr;
        if (!userRow) throw new Error("User not found");

        // 2. Fetch registrations
        const { data: registrations, error: regErr } = await supabase
          .from("registrations")
          .select("*")
          .eq("user_id", userId);

        if (regErr) throw regErr;

        // 3. Fetch events
        let uiEvents: UIEvent[] = [];
        if (registrations && registrations.length > 0) {
          const eventIds = registrations.map((r) => r.event_id);

          const { data: eventsData, error: eventsErr } = await supabase
            .from("events")
            .select("id, title, event_time, image_url, badge_url")
            .in("id", eventIds);

          if (eventsErr) throw eventsErr;

          if (eventsData) {
            uiEvents = buildUIEvents(
              eventsData as EventRow[],
              registrations as Registration[],
            );
          }
        }

        // 4. Badges
        const uiBadges = buildUIBadges(userRow.badges);

        // 5. User
        const uiUser = buildUIUser(userRow, uiEvents.length, uiBadges.length);

        setUser(uiUser);
        setEvents(uiEvents);
        setBadges(uiBadges);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { user, events, badges, loading, error };
}
