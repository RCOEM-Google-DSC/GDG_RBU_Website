"use client";

import { supabase } from "@/supabase/supabase";
import { useRBAC } from "@/hooks/useRBAC";
import { Registration } from "@/lib/types";
import Image from "next/image";
export function CheckInModal({ reg }: { reg: Registration }) {
  const { canViewParticipants } = useRBAC();

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

  const usersList = Array.isArray(reg.users) ? reg.users : [reg.users];

  return (
    <div className="space-y-4">
      {usersList.map((user) => (
        <div
          key={user.id}
          className="max-w-md mx-auto mt-6 p-6 rounded-xl border bg-white"
        >
          {/* USER HEADER */}
          <div className="flex gap-4 items-center">
            {user.image_url ? (
              <Image
                height={80}
                width={80}
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

          {/* EXTRA DETAILS */}
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            {user.phone_number && <p> {user.phone_number}</p>}
            {user.role && <p>🎭 Role: {user.role}</p>}
            {user.created_at && (
              <p> Joined: {new Date(user.created_at).toLocaleDateString()}</p>
            )}
            {user.badges && user.badges.length > 0 && (
              <p> Badges: {user.badges.join(", ")}</p>
            )}
          </div>

          {/* STATUS */}
          <div className="mt-4">
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

            {reg.status === "verified" && (
              <p className="mt-3 text-green-600 font-medium">
                Already Verified
              </p>
            )}

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
      ))}
    </div>
  );
}
