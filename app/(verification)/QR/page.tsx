"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; 
import { getCurrentUserId } from "@/supabase/supabase";
import QRCodeWithSvgLogo from "../../Components/checkin/QRCodeWithSvgLogo";

interface RegistrationData {
  event_id: string;
  user_id: string;
}

export default function MyQRPage() {
  const supabase = createClient();
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const { data: registration, error } = await supabase
          .from("registrations")
          .select("event_id, user_id")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Error fetching registration:", error);
        } else {
          setData(registration);
        }
      } catch (err) {
        console.error("Failed to load QR data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [supabase]);

  if (loading) return <p className="text-center mt-10">Loading your QR code...</p>;
  if (!data) return <p className="text-center mt-10">No registration found</p>;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  
  const qrValue = `${origin}/checkin?d=${btoa(
    JSON.stringify({
      e: data.event_id,
      u: data.user_id,
    }),
  )}`;

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-xl font-bold">Your Event QR</h1>
      <QRCodeWithSvgLogo value={qrValue} />
      <p className="text-sm text-gray-500">Show this code at the check-in desk</p>
    </div>
  );
}
