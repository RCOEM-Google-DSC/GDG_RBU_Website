"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRBAC } from "@/hooks/useRBAC";
import { CheckInModal } from "../Components/checkin/CheckInModal";

interface User {
  id: string;
  name: string;
  email: string;
  image_url: string;
  section: string;
  branch: string;
}

interface Registration {
  id: string;
  status: string;
  check_in_time: string | null;
  users: User;
}

export default function CheckInClient() {
  const params = useSearchParams();
  const encoded = params.get("d");
  const { canViewParticipants, loading } = useRBAC();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!encoded || !canViewParticipants) return;

    try {
      const { e, u } = JSON.parse(atob(encoded));

      supabase
        .from("registrations")
        .select(`
          id,
          status,
          check_in_time,
          users (
            id,
            name,
            email,
            image_url,
            section,
            branch
          )
        `)
        .eq("event_id", e)
        .eq("user_id", u)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          if (!data) throw new Error("Not found");

          setRegistration({
            ...data,
            users: Array.isArray(data.users)
              ? data.users[0]
              : data.users,
          });
        });
    } catch {
      setError("Invalid QR");
    }
  }, [encoded, canViewParticipants]);

  if (loading) return <p>Checking permissions...</p>;
  if (!canViewParticipants) return <p>Not authorized</p>;
  if (error) return <p>{error}</p>;
  if (!registration) return <p>Loading registration...</p>;

  return <CheckInModal reg={registration} />;
}
