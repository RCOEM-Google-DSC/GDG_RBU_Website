"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRBAC } from "@/hooks/useRBAC";
import { CheckInModal } from "../Components/checkin/CheckInModal";
import { Registration } from "@/lib/types";

export default function CheckInClient() {
  const params = useSearchParams();
  const encoded = params.get("d");

  const { canViewParticipants, loading } = useRBAC();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    if (!canViewParticipants) {
      setError("Not authorized");
      return;
    }

    if (!encoded) {
      setError("Invalid QR");
      return;
    }

    const run = async () => {
      try {
        const payload = JSON.parse(atob(encoded));

        /* ---------- SOLO ---------- */
        if (payload.u) {
          const { data, error } = await supabase
            .from("registrations")
            .select(
              `
              id,
              event_id,
              status,
              check_in_time,
              created_at,
              users (
                id,
                name,
                email,
                image_url,
                section,
                branch,
                phone_number,
                role,
                profile_links,
                badges,
                created_at
              )
            `
            )
            .eq("event_id", payload.e)
            .eq("user_id", payload.u)
            .single();

          if (error || !data) throw new Error("Registration not found");

          setRegistrations([data]);
          return;
        }

        /* ---------- TEAM ---------- */
        if (payload.leader) {
          const { data: leaderReg } = await supabase
            .from("registrations")
            .select("team_name")
            .eq("event_id", payload.e)
            .eq("user_id", payload.leader)
            .single();

          if (!leaderReg?.team_name) {
            throw new Error("Team not found");
          }

          const { data: teamRegs, error: teamErr } = await supabase
            .from("registrations")
            .select(
              `
              id,
              event_id,
              status,
              check_in_time,
              created_at,
              team_name,
              users (
                id,
                name,
                email,
                image_url,
                section,
                branch,
                phone_number,
                role,
                profile_links,
                badges,
                created_at
              )
            `
            )
            .eq("event_id", payload.e)
            .eq("team_name", leaderReg.team_name);

          if (teamErr || !teamRegs) {
            throw new Error("Team members not found");
          }

          setRegistrations(teamRegs);
          return;
        }

        throw new Error("Invalid QR payload");
      } catch (err: any) {
        setError(err.message || "Invalid QR");
      }
    };

    run();
  }, [encoded, canViewParticipants, loading]);

  /* ---------- UI STATES ---------- */

  if (loading) return <p>Checking permissions...</p>;
  if (error) return <p>{error}</p>;
  if (registrations.length === 0) return <p>No registrations found</p>;

  return (
    <div className="flex flex-col gap-6">
      {registrations.map((reg) => (
        <CheckInModal key={reg.id} reg={reg} />
      ))}
    </div>
  );
}
