"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import QRCodeWithSvgLogo from "../../Components/checkin/QRCodeWithSvgLogo";

interface RegistrationData {
  event_id: string;
  user_id: string;
}

export default function MyQRPage() {
  const [data, setData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      if (!userId) return;

      const { data } = await supabase
        .from("registrations")
        .select("event_id, user_id")
        .eq("user_id", userId)
        .single();

      setData(data);
    };

    load();
  }, []);

  if (!data) return <p>No registration found</p>;

  const qrValue = `${window.location.origin}/checkin?d=${btoa(
    JSON.stringify({
      e: data.event_id,
      u: data.user_id,
    }),
  )}`;

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-xl font-bold">Your Event QR</h1>
      <QRCodeWithSvgLogo value={qrValue} />
    </div>
  );
}
