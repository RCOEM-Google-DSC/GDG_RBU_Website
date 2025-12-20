"use client";

import { supabase } from "@/supabase/supabase";
import { useRBAC } from "@/hooks/useRBAC";

interface Registration {
  id: string;
  status: string;
  users: {
    image_url?: string;
    name: string;
    email: string;
    section: string;
    branch: string;
  };
}

export function CheckInModal({ reg }: { reg: Registration }) {
  const { canViewParticipants } = useRBAC(); // admin | member
  const user = reg.users;

  const verify = async () => {
    await supabase
      .from("registrations")
      .update({
        status: "verified",
        check_in_time: new Date().toISOString(),
      })
      .eq("id", reg.id);

    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl border bg-white">
      {/* USER INFO */}
      <div className="flex gap-4 items-center">
        {user.image_url ? (
          <img
            src={user.image_url}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl">
            {user.name?.[0]}
          </div>
        )}

        <div>
          <h2 className="font-bold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">
            {user.section} · {user.branch}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="mt-6">
        <p className="text-sm">
          Status:{" "}
          <span
            className={
              reg.status === "verified"
                ? "text-green-600 font-semibold"
                : "text-orange-600 font-semibold"
            }
          >
            {reg.status}
          </span>
        </p>

        {/* VERIFIED → TEXT ONLY */}
        {reg.status === "verified" && (
          <p className="mt-3 text-green-600 font-medium">
            ✅ Already Verified
          </p>
        )}

        {/* NOT VERIFIED → BUTTON (ADMIN / MEMBER ONLY) */}
        {reg.status !== "verified" && canViewParticipants && (
          <button
            onClick={verify}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
}
