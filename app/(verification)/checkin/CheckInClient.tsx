"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRBAC } from "@/hooks/useRBAC";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";

/* ---------------- UI Helpers ---------------- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-black py-2 font-mono text-sm">
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function CheckInClient() {
  const params = useSearchParams();
  const encoded = params.get("d");

  const { canViewParticipants, loading: rbacLoading } = useRBAC();

  const [regs, setRegs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    if (rbacLoading) return;
    if (!canViewParticipants) {
      setError("Not authorized to check in");
      return;
    }
    if (!encoded) {
      setError("Invalid QR");
      return;
    }

    const load = async () => {
      try {
        const payload = JSON.parse(atob(encoded));

        /* ---------- SOLO ---------- */
        if (payload.u) {
          const { data, error } = await supabase
            .from("registrations")
            .select("*, users(*)")
            .eq("event_id", payload.e)
            .eq("user_id", payload.u)
            .single();

          if (error) throw error;
          setRegs([data]);
          return;
        }

        /* ---------- TEAM ---------- */
        if (payload.leader) {
          const { data: leader } = await supabase
            .from("registrations")
            .select("team_name")
            .eq("event_id", payload.e)
            .eq("user_id", payload.leader)
            .single();

          if (!leader?.team_name) throw new Error("Team not found");

          const { data: team } = await supabase
            .from("registrations")
            .select("*, users(*)")
            .eq("event_id", payload.e)
            .eq("team_name", leader.team_name);

          setRegs(team || []);
          return;
        }

        throw new Error("Invalid QR payload");
      } catch (e: any) {
        setError(e.message);
      }
    };

    load();
  }, [encoded, canViewParticipants, rbacLoading]);

  const verify = async (regId: string) => {
    // If it's already being verified or already verified, do nothing
    const target = regs.find((r) => r.id === regId);
    if (!target) return;

    if (target.status === "verified") {
      toast.info("Already verified");
      return;
    }

    if (verifyingId) {
      // another verify in flight
      return;
    }

    setVerifyingId(regId);

    const { error } = await supabase
      .from("registrations")
      .update({
        status: "verified",
        check_in_time: new Date().toISOString(),
      })
      .eq("id", regId);

    setVerifyingId(null);

    if (error) {
      toast.error("Verification failed");
      return;
    }

    toast.success("Verified");

    setRegs((prev) =>
      prev.map((r) =>
        r.id === regId
          ? {
              ...r,
              status: "verified",
              check_in_time: new Date().toISOString(),
            }
          : r,
      ),
    );
  };

  if (rbacLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {regs.map((reg) => {
        const user = reg.users;

        // disabled when already verified OR when this reg is currently being verified
        const isVerified = reg.status === "verified";
        const busy = verifyingId === reg.id;

        return (
          <div
            key={reg.id}
            className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black uppercase">
                {reg.team_name ? `${reg.team_name} – ${user.name}` : user.name}
              </h3>

              {/* show a small already-verified indicator (not the button) */}
              {isVerified && (
                <span className="flex items-center gap-1 font-mono text-green-700">
                  <Check size={16} /> Already Verified
                </span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-1 mb-4">
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone_number || "-"} />
              <InfoRow label="Section" value={user.section || "-"} />
              <InfoRow label="Branch" value={user.branch || "-"} />
              {reg.check_in_time && (
                <InfoRow
                  label="Checked in at"
                  value={new Date(reg.check_in_time).toLocaleString()}
                />
              )}
            </div>

            {/* Action: always render the button, but disabled & labeled when already verified */}
            <button
              onClick={() => verify(reg.id)}
              disabled={isVerified || busy}
              aria-disabled={isVerified || busy}
              className={`w-full py-3 font-mono flex items-center justify-center gap-2 ${
                isVerified
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
              title={
                isVerified
                  ? "This registration is already verified"
                  : "Verify registration"
              }
            >
              {busy ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : isVerified ? (
                <>
                  <Check size={16} />
                  <span>Already Verified</span>
                </>
              ) : (
                <span>Verify</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
