"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase, getCurrentUserId } from "@/supabase/supabase";

import { isProfileComplete } from "@/lib/types";
import BraveCleanQR from "@/app/Components/checkin/QRCodeWithSvgLogo";

export default function EventRegisterPage() {
  const { eventid } = useParams<{ eventid: string }>();

  const [event, setEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);

  // TEAM STATE
  const [teamName, setTeamName] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [validatedMemberIds, setValidatedMemberIds] = useState<string[] | null>(
    null
  );

  // QR
  const [qrValue, setQrValue] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const userId = await getCurrentUserId();
      if (!userId) return;

      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventid)
        .single();

      const { data: userData } = await supabase
        .from("users")
        .select("id,name,email,section,branch,phone_number")
        .eq("id", userId)
        .single();

      const { data: regData } = await supabase
        .from("registrations")
        .select("*")
        .eq("event_id", eventid)
        .eq("user_id", userId)
        .maybeSingle();

      setEvent(eventData);
      setUser(userData);
      setRegistration(regData);

      if (regData) {
        const payload = btoa(JSON.stringify({ e: eventid, u: userId }));
        setQrValue(`${window.location.origin}/checkin?d=${payload}`);
      }

      setLoading(false);
    };

    load();
  }, [eventid]);

  if (loading) return <p>Loading...</p>;
  if (!event || !user) return <p>Something went wrong</p>;

  // PROFILE GUARD
  if (!isProfileComplete(user)) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <p>Please complete your profile before registering.</p>
        <a href="/profile/complete" className="underline">
          Complete Profile
        </a>
      </div>
    );
  }

  /* ---------------- SOLO REGISTER ---------------- */

  const registerSolo = async () => {
    const userId = await getCurrentUserId();
    if (!userId) return;

    // Check if solo registration is allowed
    if (event.min_team_size > 1) {
      alert(
        `This event requires a team of at least ${event.min_team_size} members`
      );
      return;
    }

    await supabase.from("registrations").insert({
      event_id: eventid,
      user_id: userId,
      is_team_registration: false,
      status: "registered",
    });

    const payload = btoa(JSON.stringify({ e: eventid, u: userId }));
    setQrValue(`${window.location.origin}/checkin?d=${payload}`);
  };

  /* ---------------- TEAM VALIDATION ---------------- */

  const addMember = () => {
    // Check if adding another member would exceed max team size
    if (emails.length + 1 >= event.max_team_size) {
      alert(
        `Maximum team size is ${event.max_team_size}. You can only add ${event.max_team_size - 1
        } members.`
      );
      return;
    }
    setEmails([...emails, ""]);
    setValidatedMemberIds(null);
  };

  const validateTeam = async () => {
    const cleanedEmails = emails
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.length > 0);

    const uniqueEmails = Array.from(new Set(cleanedEmails));

    if (uniqueEmails.length === 0) {
      alert("Add at least one team member");
      return;
    }

    if (uniqueEmails.includes(user.email)) {
      alert("You cannot add yourself as a team member");
      return;
    }

    const memberIds: string[] = [];

    for (const email of uniqueEmails) {
      const { data: member, error } = await supabase
        .from("users")
        .select("id,name,email,section,branch,phone_number")
        .eq("email", email)
        .maybeSingle();

      if (error || !member) {
        alert(`User not found: ${email}`);
        return;
      }

      if (!isProfileComplete(member)) {
        alert(`Profile incomplete: ${email}`);
        return;
      }

      memberIds.push(member.id);
    }

    const totalSize = memberIds.length + 1;
    if (totalSize < event.min_team_size || totalSize > event.max_team_size) {
      alert(
        `Team size must be between ${event.min_team_size} and ${event.max_team_size}`
      );
      return;
    }

    setValidatedMemberIds(memberIds);
    alert("Team validated successfully");
  };

  /* ---------------- TEAM REGISTER (RPC) ---------------- */

  const registerTeam = async () => {
    if (!validatedMemberIds) {
      alert("Please validate team before registering");
      return;
    }

    const { error } = await supabase.rpc("register_team", {
      p_event_id: eventid,
      p_team_name: teamName,
      p_member_ids: validatedMemberIds,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const leaderId = await getCurrentUserId();
    const payload = btoa(JSON.stringify({ e: eventid, leader: leaderId }));
    setQrValue(`${window.location.origin}/checkin?d=${payload}`);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-6 items-center">
      {/* QR */}
      {qrValue && (
        <>
          <BraveCleanQR value={qrValue} />
          <button
            onClick={() => {
              const canvas = document.querySelector("canvas");
              if (!canvas) return;
              const link = document.createElement("a");
              link.download = "event-qr.png";
              link.href = canvas.toDataURL();
              link.click();
            }}
            className="px-4 py-2 border rounded-lg"
          >
            Download QR
          </button>
        </>
      )}

      {/* SOLO */}
      {!qrValue && !event.is_team_event && (
        <button
          onClick={registerSolo}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Register
        </button>
      )}

      {/* TEAM */}
      {!qrValue && event.is_team_event && (
        <>
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
              setValidatedMemberIds(null);
            }}
            className="border p-2 rounded"
          />

          {emails.map((email, i) => (
            <input
              key={i}
              placeholder="Member Email"
              value={email}
              onChange={(e) => {
                const copy = [...emails];
                copy[i] = e.target.value;
                setEmails(copy);
                setValidatedMemberIds(null);
              }}
              className="border p-2 rounded"
            />
          ))}

          <button onClick={addMember} className="underline">
            Add Member
          </button>

          <button
            onClick={validateTeam}
            className="px-4 py-2 border rounded-lg"
          >
            Validate Team
          </button>

          <button
            onClick={registerTeam}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Register Team
          </button>
        </>
      )}
    </div>
  );
}
