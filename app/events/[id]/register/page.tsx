"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { toast } from "sonner";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

import {
  THEME,
  isProfileComplete,
  generateRandomPassword,
} from "@/app/Components/register/utils";

import RegistrationSuccess from "@/app/Components/register/RegistrationSuccess";
import TeamMemberMessage from "@/app/Components/register/TeamMemberMessage";
import TeamRegistrationForm from "@/app/Components/register/TeamRegistrationForm";
import SoloRegistrationForm from "@/app/Components/register/SoloRegistrationForm";
import { CodeIcon } from "@/app/Components/register/CodeIcon";
import EventDetails from "@/app/Components/register/EventDetails";

/* ---------------- Main page ---------------- */

export default function EventRegisterPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);

  // team name + cards (leader + members)
  const [teamName, setTeamName] = useState("");
  const [cards, setCards] = useState<
    Array<{
      id: string;
      type: "leader" | "member";
      title: string;
      expanded: boolean;
      validated?: boolean;
      email?: string;
      userId?: string | null;
    }>
  >([]);

  // team credentials (filled after team creation or if already existing)
  const [teamCreds, setTeamCreds] = useState<
    { userId: string; password: string } | null
  >(null);

  // New state for member view: details of their team leader
  const [memberInfo, setMemberInfo] = useState<{
    leaderName: string;
    leaderEmail: string;
    teamName: string;
  } | null>(null);

  /* ---------- LOAD initial data ---------- */

  useEffect(() => {
    const load = async () => {
      const uid = await getCurrentUserId();

      // if not logged in -> show toast + redirect to /register
      if (!uid) {
        toast.error("Please log in to register for this event.");
        router.push("/register");
        return;
      }

      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      const { data: userData } = await supabase
        .from("users")
        .select("id,name,email,phone_number,section,branch")
        .eq("id", uid)
        .single();

      // check existing registration (user-level) — show QR immediately if exists
      const { data: reg } = await supabase
        .from("registrations")
        .select("is_team_registration, team_name, is_team_leader")
        .eq("event_id", id)
        .eq("user_id", uid)
        .maybeSingle();

      setEvent(eventData || null);
      setUser(userData || null);

      // initialize cards with leader
      setCards([
        {
          id: "leader",
          type: "leader",
          title: "Leader",
          expanded: true,
          validated: true,
          userId: uid,
        },
      ]);

      if (reg) {
        // show QR directly if already registered
        const payload = reg.is_team_registration
          ? { e: id, leader: uid }
          : { e: id, u: uid };
        setQrValue(
          `${window.location.origin}/checkin?d=${btoa(JSON.stringify(payload))}`
        );

        // if team registration, also set team name hint (optional)
        if (reg.team_name) setTeamName(reg.team_name);

        // Fetch additional info depending on role (Leader vs Member)
        if (reg.is_team_registration) {
          try {
            if (reg.is_team_leader) {
              // --- LEADER VIEW logic ---
              const { data: teamRow } = await supabase
                .from("teams")
                .select("leader_email, password, team_name")
                .eq("leader_user_id", uid)
                .maybeSingle();

              if (teamRow) {
                setTeamCreds({
                  userId: teamRow.leader_email,
                  password: teamRow.password,
                });
              }
            } else {
              // --- MEMBER VIEW logic ---
              // 1. We need to find who the leader is for this team & event.
              //    The safest way is to query registrations for the same event & team_name where is_team_leader is true.
              const { data: leaderReg } = await supabase
                .from("registrations")
                .select("user_id")
                .eq("event_id", id)
                .eq("team_name", reg.team_name)
                .eq("is_team_leader", true)
                .maybeSingle();

              if (leaderReg) {
                // 2. Fetch Leader's Name from 'users' table
                const { data: leaderUser } = await supabase
                  .from("users")
                  .select("name")
                  .eq("id", leaderReg.user_id)
                  .single();

                // 3. Fetch Leader's Email from 'teams' table
                //    (using team_name + leader_user_id unique combo to be safe)
                const { data: teamRow } = await supabase
                  .from("teams")
                  .select("leader_email")
                  .eq("team_name", reg.team_name)
                  .eq("leader_user_id", leaderReg.user_id)
                  .maybeSingle();

                if (leaderUser && teamRow) {
                  setMemberInfo({
                    leaderName: leaderUser.name,
                    leaderEmail: teamRow.leader_email,
                    teamName: reg.team_name,
                  });
                }
              }
            }
          } catch (err) {
            console.warn("Failed to fetch team details:", err);
          }
        }
      }
    };

    load();
  }, [id, router]);

  if (!event || !user) return <p>Loading...</p>;

  /* ---------- helper utilities ---------- */

  const reindexMembers = (cardsIn: typeof cards) => {
    // keep leader first, then members re-indexed
    const leader = cardsIn.filter((c) => c.type === "leader");
    const members = cardsIn.filter((c) => c.type === "member");
    return [
      ...leader,
      ...members.map((m, i) => ({
        ...m,
        title: `Team Member ${i + 1}`,
      })),
    ];
  };

  // Toggle card expansion: if target is collapsed -> expand it and collapse others
  // if it's open -> collapse it.
  const toggleCard = (id: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, expanded: !c.expanded };
        } else {
          return { ...c, expanded: false };
        }
      })
    );
  };

  /* ---------- BEHAVIOR: add member (fold leader and push new expanded card) ---------- */

  const addMember = () => {
    // team name required
    if (!teamName.trim()) {
      toast.error("Team name is required before adding members");
      return;
    }

    // enforce max team size (leader + members)
    const maxSize = event.max_team_size ?? 1;
    const currentTotal = cards.length; // leader + members
    if (currentTotal >= maxSize) {
      toast.error(`Maximum team size is ${maxSize}`);
      return;
    }

    // collapse all existing cards and append new member expanded
    const nextId = `member-${Date.now().toString(36).slice(-6)}`;
    const next = [
      ...cards.map((c) => ({ ...c, expanded: false })),
      {
        id: nextId,
        type: "member" as const,
        title: `Team Member ${
          cards.filter((c) => c.type === "member").length + 1
        }`,
        expanded: true,
        validated: false,
        email: "",
        userId: null,
      },
    ];
    setCards(next);
  };

  /* ---------- validate member by email ---------- */

  const validateMember = async (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const email = (card.email || "").trim().toLowerCase();
    if (!email) {
      toast.error("Enter member email");
      return;
    }

    // find account
    const { data: member, error: findErr } = await supabase
      .from("users")
      .select("id,name,email,phone_number,section,branch")
      .eq("email", email)
      .maybeSingle();

    if (findErr) {
      toast.error("Failed to lookup member");
      return;
    }
    if (!member) {
      toast.error(`${email} does not have an account. Ask them to sign up.`);
      return;
    }

    // profile completeness
    if (!isProfileComplete(member)) {
      toast.error(`${email} must complete profile before being added`);
      return;
    }

    // check if this user is already registered for this event in a different team
    const { data: existingReg, error: exErr } = await supabase
      .from("registrations")
      .select("team_name,user_id")
      .eq("event_id", id)
      .eq("user_id", member.id)
      .maybeSingle();

    if (exErr) {
      toast.error("Failed to check existing registrations");
      return;
    }
    if (
      existingReg &&
      existingReg.team_name &&
      existingReg.team_name !== teamName
    ) {
      toast.error(
        `${email} is already registered in another team (${existingReg.team_name})`
      );
      return;
    }

    // Ok — mark validated & collapse the member card
    setCards((prev) =>
      reindexMembers(
        prev.map((c) =>
          c.id === cardId
            ? { ...c, validated: true, expanded: false, userId: member.id }
            : c
        )
      )
    );

    toast.success(`${email} validated`);
  };

  /* ---------- delete member ---------- */

  const deleteMember = (cardId: string) => {
    const next = reindexMembers(cards.filter((c) => c.id !== cardId));
    setCards(next);
  };

  /* ---------- save leader edits to users table (email not editable) ---------- */

  async function saveLeaderEditsLocal() {
    if (!user.name?.trim()) {
      toast.error("Leader name required");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("users")
      .update({
        name: user.name,
        phone_number: user.phone_number,
        section: user.section,
        branch: user.branch,
      })
      .eq("id", user.id);
    setLoading(false);
    if (error) {
      toast.error("Failed to save leader details");
      return;
    }
    toast.success("Leader saved");
    setCards((prev) =>
      reindexMembers(
        prev.map((c) => (c.type === "leader" ? { ...c, expanded: false } : c))
      )
    );
  }

  /* ---------- register team: insert rows in registrations (leader + each member) ---------- */

  const registerTeam = async () => {
    // checks
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    // min & max from event
    const minSize = event.min_team_size ?? 1;
    const maxSize = event.max_team_size ?? 1;
    const members = cards.filter((c) => c.type === "member");
    const total = 1 + members.length; // leader + members

    if (total < minSize) {
      toast.error(`Minimum team size for this event is ${minSize}`);
      return;
    }
    if (total > maxSize) {
      toast.error(`Maximum team size for this event is ${maxSize}`);
      return;
    }

    // all members validated?
    if (!members.every((m) => m.validated && m.userId)) {
      toast.error("Validate all members before registering");
      return;
    }

    // check unique team name for this event (preserve your previous check)
    const { data: existingTeam } = await supabase
      .from("registrations")
      .select("id")
      .eq("event_id", id)
      .eq("team_name", teamName)
      .limit(1)
      .maybeSingle();

    if (existingTeam) {
      toast.error(
        "Team name already taken for this event — choose another name"
      );
      return;
    }

    // ensure none of the members are registered in other teams (race check)
    for (const m of members) {
      const { data: reg } = await supabase
        .from("registrations")
        .select("team_name")
        .eq("event_id", id)
        .eq("user_id", m.userId)
        .maybeSingle();

      if (reg && reg.team_name && reg.team_name !== teamName) {
        toast.error(`${m.email} is already registered in ${reg.team_name}`);
        return;
      }
    }

    setLoading(true);

    // === IMPORTANT FIX FOR RLS: fetch current session uid and use it for leader_user_id ===
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const authUid = session?.user?.id ?? null;
    if (!authUid) {
      setLoading(false);
      toast.error("You must be logged in to create a team.");
      return;
    }

    // optional sanity check (do not block if mismatch — we prefer authUid)
    if (user.id && authUid !== user.id) {
      console.warn(
        "local user.id differs from auth session uid",
        user.id,
        authUid
      );
    }
    // === end RLS fix ===

    // generate the password on the frontend
    const password = generateRandomPassword(8);
    const leaderEmail = user.email;

    // Prepare members json for teams table
    const membersJson = members.map((m) => ({
      user_id: m.userId,
      email: m.email,
    }));

    const { data: teamInsert, error: teamErr } = await supabase
      .from("teams")
      .insert([
        {
          team_name: teamName,
          leader_email: leaderEmail,
          leader_user_id: authUid, // use the auth session uid (RLS requires this)
          password,
          points: 0,
          members: membersJson,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .maybeSingle();

    if (teamErr) {
      setLoading(false);
      toast.error(teamErr.message || "Failed to create team (teams table)");
      return;
    }

    // prepare rows: leader + each member (unchanged logic — still insert into registrations)
    const rows = [
      {
        event_id: id,
        user_id: user.id,
        is_team_registration: true,
        team_name: teamName,
        is_team_leader: true,
        status: "registered",
      },
      ...members.map((m) => ({
        event_id: id,
        user_id: m.userId,
        is_team_registration: true,
        team_name: teamName,
        is_team_leader: false,
        status: "registered",
      })),
    ];

    const { error: insertErr } = await supabase
      .from("registrations")
      .insert(rows);

    setLoading(false);

    if (insertErr) {
      toast.error(insertErr.message || "Failed to register team");
      return;
    }

    toast.success("Team registered");

    // show QR (leader-based QR)
    const payload = { e: id, leader: user.id };
    setQrValue(
      `${window.location.origin}/checkin?d=${btoa(JSON.stringify(payload))}`
    );

    // set credentials so UI shows them below the QR
    setTeamCreds({ userId: leaderEmail, password });
  };

  /* ---------- solo registration ---------- */

  const registerSolo = async () => {
    if (!isProfileComplete(user)) {
      toast.error("Complete your profile before registering");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("registrations").insert([
      {
        event_id: id,
        user_id: user.id,
        is_team_registration: false,
        status: "registered",
      },
    ]);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to register");
      return;
    }

    toast.success("Registered");

    if (event?.whatsapp_url) {
      toast.success(
        "You're registered — join the WhatsApp group from the link below."
      );
    }

    const payload = { e: id, u: user.id };
    setQrValue(
      `${window.location.origin}/checkin?d=${btoa(JSON.stringify(payload))}`
    );
  };

  /* ---------- download QR helper ---------- */

  const downloadQr = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      toast.error("QR not found (canvas)");
      return;
    }
    const link = document.createElement("a");
    link.download = "event-qr.png";
    link.href = (canvas as HTMLCanvasElement).toDataURL();
    link.click();
  };

  /* ---------- handler for email change in components ---------- */
  const onMemberEmailChange = (id: string, email: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, email } : c)));
  };

  /* ---------- UI ---------- */

  return (
    <div
      className={`min-h-screen ${THEME.colors.bg} text-black selection:bg-[#4285F4] selection:text-white flex items-start justify-center py-12`}
    >
      <main className="max-w-6xl w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Event Details */}
          <EventDetails event={event} />

          {/* RIGHT: Form / cards / QR */}
          <div className="lg:col-span-7">
            <NeoBrutalism
              border={2}
              shadow="xl"
              className="bg-white p-8 md:p-10 relative"
            >
              {/* Header */}
              <div className="mb-8 border-b-2 border-black pb-6 flex items-center gap-3">
                <CodeIcon />
                <div>
                  <h2 className={`${THEME.fonts.heading} text-3xl leading-none`}>
                    Registration
                  </h2>
                  <p className="font-mono text-xs text-gray-500 mt-1">
                    SECURE YOUR SPOT
                  </p>
                </div>
              </div>

              {/* If QR already available — show QR box centered */}
              {qrValue ? (
                <>
                  {memberInfo ? (
                    <TeamMemberMessage info={memberInfo} />
                  ) : (
                    <RegistrationSuccess
                      qrValue={qrValue}
                      downloadQr={downloadQr}
                      event={event}
                      teamCreds={teamCreds}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* TEAM vs SOLO */}
                  {event.is_team_event ? (
                    <TeamRegistrationForm
                      teamName={teamName}
                      setTeamName={setTeamName}
                      cards={cards}
                      toggleCard={toggleCard}
                      deleteMember={deleteMember}
                      addMember={addMember}
                      validateMember={validateMember}
                      onMemberEmailChange={onMemberEmailChange}
                      user={user}
                      setUser={setUser}
                      saveLeaderEditsLocal={saveLeaderEditsLocal}
                      loading={loading}
                      registerTeam={registerTeam}
                      event={event}
                    />
                  ) : (
                    <SoloRegistrationForm
                      user={user}
                      setUser={setUser}
                      loading={loading}
                      registerSolo={registerSolo}
                      event={event}
                    />
                  )}
                </>
              )}
            </NeoBrutalism>
          </div>
        </div>
      </main>
    </div>
  );
}
