"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import QRCodeWithSvgLogo from "@/app/Components/checkin/QRCodeWithSvgLogo";
import { toast } from "sonner";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import {
  Calendar,
  MapPin,
  Check,
  ArrowRight,
  User,
  Mail,
  Phone,
  Briefcase,
  Trash2,
  Loader2,
} from "lucide-react";

/* ---------------- THEME (kept like your original) ---------------- */

const THEME = {
  colors: {
    bg: "bg-white",
    surface: "bg-white",
    text: "text-gray-900",
    textDim: "text-gray-600",
    blue: "bg-[#4285F4]",
    red: "bg-[#EA4335]",
    yellow: "bg-[#FBBC04]",
    green: "bg-[#34A853]",
    border: "border-black",
  },
  borders: "border-2 border-black",
  fonts: {
    heading: "font-sans font-black uppercase tracking-tight",
    body: "font-mono text-sm font-medium",
  },
};

/* ---------------- Small helpers ---------------- */

const isProfileComplete = (u: any) =>
  !!(u?.name && u?.email && u?.phone_number && u?.section && u?.branch);

/* password generator (frontend) */
function generateRandomPassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

/* ---------------- UI primitives (kept very close to yours) ---------------- */

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  name,
  icon: Icon,
  disabled = false,
}: any) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className={`${THEME.fonts.heading} text-sm flex items-center gap-2`}>
      {label} {required && <span className="text-[#EA4335]">*</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={nb({
          border: 2,
          shadow: "md",
          className: `w-full py-4 ${Icon ? "pl-12" : "pl-4"} pr-4 ${
            THEME.colors.surface
          } text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] placeholder:text-gray-400 ${
            THEME.fonts.body
          }`,
        })}
        required={required}
      />
    </div>
  </div>
);

/* ---------------- Stack Card — animates / collapses ---------------- */

const formatIST = (utc: string | null) => {
  if (!utc) return "Time";
  return (
    new Date(utc).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " IST"
  );
};

function StackCard({
  title,
  expanded,
  children,
  onDelete,
  onHeaderClick,
}: {
  title: string;
  expanded: boolean;
  children?: React.ReactNode;
  onDelete?: () => void;
  onHeaderClick?: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      className={nb({
        border: 2,
        shadow: "md",
        className: `bg-white overflow-hidden`,
      })}
    >
      <div
        className="flex justify-between items-center px-6 py-3"
        onClick={() => onHeaderClick && onHeaderClick()}
        style={{ cursor: onHeaderClick ? "pointer" : "default" }}
      >
        <h3 className={`${THEME.fonts.heading} text-base`}>{title}</h3>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="delete member"
            title="Remove member"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="px-6 pb-6"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Robust time parser & formatter ---------- */

/**
 * Parse various time string formats into hour (0-23) and minute (0-59).
 * Supports:
 *   "12:00 PM", "12 PM", "12:00AM", "4 PM", "4:30PM", "16:00", "09:15", "9:15 am"
 * Returns null on failure.
 */
function parseTimeString(timeStr?: string): { hour: number; minute: number } | null {
  if (!timeStr) return null;
  const s = String(timeStr).trim();
  if (!s) return null;

  // Normalize spacing and lower-case for am/pm detection
  const normalized = s.replace(/\s+/g, " ").toLowerCase();

  // Regex: capture hour, optional :minute, optional space, optional am/pm
  const m = normalized.match(/^([0-9]{1,2})(?::([0-9]{2}))?\s*(am|pm)?$/i);
  if (!m) {
    return null;
  }

  let hour = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  const ampm = m[3] ? m[3].toLowerCase() : null;

  if (isNaN(hour) || isNaN(minute)) return null;
  if (minute < 0 || minute > 59) return null;

  // If am/pm present, interpret as 12-hour clock
  if (ampm) {
    if (ampm === "am") {
      if (hour === 12) hour = 0;
    } else if (ampm === "pm") {
      if (hour < 12) hour += 12;
    }
  } else {
    // No am/pm: assume 24-hour clock if hour >= 0 && hour <= 23
    if (hour < 0 || hour > 23) return null;
  }

  return { hour, minute };
}

/**
 * Format provided date (YYYY-MM-DD) and time string (flexible formats) into:
 *   "DD Mon YYYY, hh:mm AM/PM IST"
 * If time cannot be parsed, returns "DD Mon YYYY".
 * If date missing, returns "Date & Time"
 */
function formatDateTimeIST(date: string | null, timeText: string | null) {
  if (!date) return "Date & Time";

  // parse date
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = date.split("-");
  if (parts.length < 3) {
    // fallback: just return raw date
    return date;
  }
  const [y, m, d] = parts;
  const year = Number(y);
  const monthIdx = Number(m) - 1;
  const day = Number(d);

  if (isNaN(year) || isNaN(monthIdx) || isNaN(day) || monthIdx < 0 || monthIdx > 11) {
    return date;
  }

  // parse time string (flexible)
  const t = parseTimeString(timeText || undefined);
  if (!t) {
    // no valid time — return just date
    return `${String(day).padStart(2, "0")} ${months[monthIdx]} ${year}`;
  }

  // Convert 24-hour hour to 12-hour + AM/PM
  let hour12 = t.hour;
  const ampm = hour12 >= 12 ? "PM" : "AM";
  if (hour12 === 0) hour12 = 12;
  else if (hour12 > 12) hour12 = hour12 - 12;

  const hhStr = String(hour12).padStart(2, "0");
  const mmStr = String(t.minute).padStart(2, "0");

  return `${String(day).padStart(2, "0")} ${months[monthIdx]} ${year}, ${hhStr}:${mmStr} ${ampm} IST`;
}

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
        .select("is_team_registration, team_name")
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

        // fetch team credentials from teams table (if present)
        if (reg.is_team_registration) {
          try {
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
          } catch (err) {
            console.warn("Failed to fetch team creds:", err);
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
      console.warn("local user.id differs from auth session uid", user.id, authUid);
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
      toast.success("You're registered — join the WhatsApp group from the link below.");
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

  /* ---------- UI ---------- */

  return (
    <div
      className={`min-h-screen ${THEME.colors.bg} text-black selection:bg-[#4285F4] selection:text-white flex items-start justify-center py-12`}
    >
      <main className="max-w-6xl w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Event Details */}
          <div className="lg:col-span-5 space-y-8">
            <NeoBrutalism
              border={2}
              shadow="none"
              className="inline-block bg-[#FBBC04] px-3 py-1 font-mono text-xs font-bold transform -rotate-2"
            >
              {event.category || "Event Category"}
            </NeoBrutalism>

            <h1 className={`${THEME.fonts.heading} text-6xl md:text-7xl leading-none`}>
              {event.title || "Event"}
            </h1>

            <p className="font-mono text-base leading-relaxed border-l-4 border-[#34A853] pl-6 py-2">
              {event.description || "Event description"}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <NeoBrutalism border={2} shadow="md" className="flex items-center gap-4 bg-white p-4">
                <Calendar className="text-[#4285F4]" size={24} strokeWidth={2.5} />
                <div>
                  <div className={`${THEME.fonts.heading}`}>{formatDateTimeIST(event.date, event.time)}</div>
                </div>
              </NeoBrutalism>

              <NeoBrutalism border={2} shadow="md" className="flex items-center gap-4 bg-white p-4">
                <MapPin className="text-[#EA4335]" size={24} strokeWidth={2.5} />
                <div>
                  <div className={`${THEME.fonts.heading}`}>Venue</div>
                  <div className="font-mono text-xs">{event.venue || "Venue"}</div>
                </div>
              </NeoBrutalism>
            </div>
          </div>

          {/* RIGHT: Form / cards / QR */}
          <div className="lg:col-span-7">
            <NeoBrutalism border={2} shadow="xl" className="bg-white p-8 md:p-10 relative">
              {/* Header */}
              <div className="mb-8 border-b-2 border-black pb-6 flex items-center gap-3">
                <CodeIcon />
                <div>
                  <h2 className={`${THEME.fonts.heading} text-3xl leading-none`}>Registration</h2>
                  <p className="font-mono text-xs text-gray-500 mt-1">SECURE YOUR SPOT</p>
                </div>
              </div>

              {/* If QR already available — show QR box centered */}
              {qrValue ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-full p-8">
                    <div className="mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <Check size={32} />
                        <h3 className={`${THEME.fonts.heading} text-2xl`}>YOU'RE IN!</h3>
                      </div>

                      <div className="flex justify-center mb-6">
                        <QRCodeWithSvgLogo value={qrValue} />
                      </div>
                      <button onClick={downloadQr} className="w-full py-4 bg-black text-white">
                        Download QR
                      </button>
                      {event.whatsapp_url && (
                        <a
                          href={event.whatsapp_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-4 text-center underline font-mono text-sm"
                        >
                          Join WhatsApp Group
                        </a>
                      )}

                      {/* Show team credentials (if available) */}
                      {teamCreds && (
                        <div className="mt-6 inline-block text-left border-2 border-black p-4">
                          <div className="font-mono text-xs">Event Login</div>
                          <div className="font-bold">{teamCreds.userId}</div>
                          <div className="mt-1">
                            Password: <span className="font-mono">{teamCreds.password}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Save These Credentials For The Event</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* TEAM vs SOLO */}
                  {event.is_team_event ? (
                    <>
                      <InputField
                        label="TEAM NAME"
                        value={teamName}
                        onChange={(e: any) => setTeamName(e.target.value)}
                        placeholder="Your team name (required for team events)"
                        icon={User}
                      />

                      <div className="space-y-4">
                        <AnimatePresence>
                          {cards.map((card) => (
                            <StackCard
                              key={card.id}
                              title={card.title}
                              expanded={card.expanded}
                              onDelete={card.type === "member" ? () => deleteMember(card.id) : undefined}
                              onHeaderClick={() => toggleCard(card.id)}
                            >
                              {card.type === "leader" ? (
                                <>
                                  <InputField
                                    label="NAME"
                                    value={user.name || ""}
                                    onChange={(e: any) => setUser({ ...user, name: e.target.value })}
                                    icon={User}
                                    required
                                  />
                                  <InputField label="EMAIL" value={user.email || ""} onChange={() => {}} icon={Mail} disabled />
                                  <InputField
                                    label="PHONE"
                                    value={user.phone_number || ""}
                                    onChange={(e: any) => setUser({ ...user, phone_number: e.target.value })}
                                    icon={Phone}
                                  />
                                  <InputField
                                    label="SECTION"
                                    value={user.section || ""}
                                    onChange={(e: any) => setUser({ ...user, section: e.target.value })}
                                    icon={Briefcase}
                                  />
                                  <InputField
                                    label="BRANCH"
                                    value={user.branch || ""}
                                    onChange={(e: any) => setUser({ ...user, branch: e.target.value })}
                                    icon={Briefcase}
                                  />
                                  <div className="flex gap-3">
                                    <button
                                      onClick={saveLeaderEditsLocal}
                                      className="py-3 px-4 bg-[#4285F4] text-white flex items-center gap-2"
                                    >
                                      Save Leader
                                      {loading && <Loader2 className="animate-spin" />}
                                    </button>

                                    {!event.is_team_event && (
                                      <button onClick={registerSolo} className="py-3 px-4 bg-black text-white ml-auto">
                                        {loading ? <Loader2 className="animate-spin" /> : "Confirm RSVP"}
                                      </button>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {!card.validated ? (
                                    <>
                                      <InputField
                                        label="MEMBER EMAIL"
                                        value={card.email || ""}
                                        onChange={(e: any) => {
                                          const val = e.target.value;
                                          setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, email: val } : c)));
                                        }}
                                        icon={Mail}
                                        placeholder="member@example.com"
                                        required
                                      />
                                      <div className="flex gap-3">
                                        <button onClick={() => validateMember(card.id)} className="py-3 px-4 bg-[#34A853] text-white">
                                          Validate Member
                                        </button>
                                        <button onClick={() => deleteMember(card.id)} className="py-3 px-4 border-2 border-black ml-auto">
                                          Remove
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="py-3">
                                      <div className="font-mono">{card.email}</div>
                                      <div className="text-xs text-gray-500">Validated</div>
                                    </div>
                                  )}
                                </>
                              )}
                            </StackCard>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button onClick={addMember} className="underline">
                          Add Member
                        </button>

                        <div className="ml-auto flex gap-3">
                          <button onClick={registerTeam} className="py-3 px-4 bg-black text-white">
                            {loading ? <Loader2 className="animate-spin" /> : <>Register Team <ArrowRight /></>}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <InputField label="NAME" value={user.name || ""} onChange={(e: any) => setUser({ ...user, name: e.target.value })} icon={User} required />
                        <InputField label="EMAIL" value={user.email || ""} onChange={() => {}} icon={Mail} disabled />
                        <InputField label="PHONE" value={user.phone_number || ""} onChange={(e: any) => setUser({ ...user, phone_number: e.target.value })} icon={Phone} />
                        <InputField label="SECTION" value={user.section || ""} onChange={(e: any) => setUser({ ...user, section: e.target.value })} icon={Briefcase} />
                        <InputField label="BRANCH" value={user.branch || ""} onChange={(e: any) => setUser({ ...user, branch: e.target.value })} icon={Briefcase} />
                      </div>

                      <div className="mt-6 flex">
                        <div className="ml-auto">
                          <button onClick={registerSolo} className="py-3 px-6 bg-black text-white">
                            {loading ? <Loader2 className="animate-spin" /> : "Confirm RSVP"}
                          </button>
                        </div>
                      </div>

                      {event.whatsapp_url && (
                        <a href={event.whatsapp_url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center underline font-mono text-sm">
                          Join WhatsApp Group
                        </a>
                      )}
                    </>
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

/* ---------- small decorative icon component to match your existing Code icon usage ---------- */
function CodeIcon() {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M8.5 11.5L4 8l4.5-3.5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 11.5L20 8l-4.5-3.5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
