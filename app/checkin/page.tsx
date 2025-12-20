"use client";

import { useEffect, useState } from "react";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { useSearchParams, useRouter } from "next/navigation";

type Status = "loading" | "success" | "already" | "error";

export default function CheckInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId");

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const verifyCheckIn = async () => {
      try {
     
        const userId = await getCurrentUserId();

        if (!userId) {
          router.push(`/login?redirect=/checkin?eventId=${eventId}`);
          return;
        }

        if (!eventId) {
          setStatus("error");
          return;
        }

        
        const { data: registration, error } = await supabase
          .from("registrations")
          .select("id, status, check_in_time")
          .eq("event_id", eventId)
          .eq("user_id", userId)
          .single();

        if (error || !registration) {
          setStatus("error");
          return;
        }

       
        if (registration.status === "verified") {
          setStatus("already");
          return;
        }

    
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            status: "verified",
            check_in_time: new Date().toISOString(),
          })
          .eq("id", registration.id);

        if (updateError) {
          setStatus("error");
          return;
        }

        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyCheckIn();
  }, [eventId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <p>Verifying check-in…</p>}

      {status === "success" && (
        <p className="text-green-600 font-semibold">
          Check-in verified successfully
        </p>
      )}

      {status === "already" && (
        <p className="text-blue-600 font-semibold">
           You are already checked in
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 font-semibold">
          Failed to verify check-in
        </p>
      )}
    </div>
  );
}
