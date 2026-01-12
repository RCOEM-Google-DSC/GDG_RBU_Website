"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/supabase/client";
import QRCodeWithSvgLogo from "@/app/Components/checkin/QRCodeWithSvgLogo";
import { toast } from "sonner";
import {
  Ticket,
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
  shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  shadowHover:
    "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5",
  shadowActive:
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
  fonts: {
    heading: "font-sans font-black uppercase tracking-tight",
    body: "font-mono text-sm font-medium",
  },
};

/* ---------------- Small helpers ---------------- */

const isProfileComplete = (u: any) =>
  !!(u?.name && u?.email && u?.phone_number && u?.section && u?.branch);

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
        className={`
          w-full py-4 ${Icon ? "pl-12" : "pl-4"} pr-4
          ${THEME.colors.surface} text-black
          ${THEME.borders} ${THEME.shadow}
          outline-none transition-all duration-200
          focus:bg-[#E8F0FE] focus:border-[#4285F4] placeholder:text-gray-400 ${THEME.fonts.body
          }
        `}
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
      className={`bg-white ${THEME.borders} ${THEME.shadow} overflow-hidden`}
    >
      <div
        className="flex justify-between items-center px-6 py-3"
        // header is clickable — call onHeaderClick if provided
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

/* ---------------- Main page ---------------- */

export default function EventRegisterPage() {
  const { eventid } = useParams<{ eventid: string }>();
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

  /* ---------- LOAD initial data ---------- */

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const uid = authUser?.id;

      // if not logged in -> show toast + redirect to /register
      if (!uid) {
        toast.error("Please log in to register for this event.");
        router.push("/register");
        return;
      }

      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventid)
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
        .eq("event_id", eventid)
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
          ? { e: eventid, leader: uid }
          : { e: eventid, u: uid };
        setQrValue(
          `${window.location.origin}/checkin?d=${btoa(JSON.stringify(payload))}`
        );
        // if team registration, also set team name hint (optional)
        if (reg.team_name) setTeamName(reg.team_name);
      }
    };

    load();
  }, [eventid, router]);

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
        title: `Team Member ${cards.filter((c) => c.type === "member").length + 1
          }`,
        expanded: true,
        validated: false,
        email: "",
        userId: null,
      },
    ];
    setCards(next);
    // framer motion will animate fold & slide
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

    const supabase = createClient();
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
      .eq("event_id", eventid)
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

  const saveLeaderEdits = async () => {
    // validate leader profile locally
    if (!user.name?.trim()) {
      toast.error("Leader name is required");
      return;
    }

    // update users table (exclude email)
    setLoading(true);
    const supabase = createClient();
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

    toast.success("Leader details saved");
    // collapse leader card (fold)
    setCards((prev) =>
      reindexMembers(
        prev.map((c) => (c.type === "leader" ? { ...c, expanded: false } : c))
      )
    );
  };

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

    // check unique team name for this event
    const supabase = createClient();
    const { data: existingTeam } = await supabase
      .from("registrations")
      .select("id")
      .eq("event_id", eventid)
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
        .eq("event_id", eventid)
        .eq("user_id", m.userId)
        .maybeSingle();

      if (reg && reg.team_name && reg.team_name !== teamName) {
        toast.error(`${m.email} is already registered in ${reg.team_name}`);
        return;
      }
    }

    setLoading(true);

    // prepare rows: leader + each member
    const rows = [
      {
        event_id: eventid,
        user_id: user.id,
        is_team_registration: true,
        team_name: teamName,
        is_team_leader: true,
        status: "registered",
      },
      ...members.map((m) => ({
        event_id: eventid,
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
    const payload = { e: eventid, leader: user.id };
    setQrValue(
      `${window.location.origin}/checkin?d=${btoa(JSON.stringify(payload))}`
    );
  };

  /* ---------- solo registration ---------- */

  const registerSolo = async () => {
    // leader must be profile complete
    if (!isProfileComplete(user)) {
      toast.error("Complete your profile before registering");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("registrations").insert([
      {
        event_id: eventid,
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

    // Prompt user to join whatsapp group if available
    if (event?.whatsapp_url) {
      toast.success("You're registered — join the WhatsApp group from the link below.");
    }

    const payload = { e: eventid, u: user.id };
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
  // Replace existing formatDateTimeIST with this safe, timezone-free formatter
  const formatDateTimeIST = (date: string | null, time: string | null) => {
    if (!date || !time) return "Date & Time";

    // date expected 'YYYY-MM-DD', time expected 'HH:mm' (24-hour)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [y, m, d] = date.split("-");
    const [hh, mm] = time.split(":");

    const year = Number(y);
    const monthIdx = Number(m) - 1;
    const day = Number(d);
    let hour = Number(hh);
    const minute = Number(mm);

    const ampm = hour >= 12 ? "PM" : "AM";
    if (hour === 0) hour = 12;
    else if (hour > 12) hour = hour - 12;

    const hhStr = String(hour).padStart(2, "0");
    const mmStr = String(minute).padStart(2, "0");

    // Example output: "25 Dec 2025, 11:46 PM IST"
    return `${String(day).padStart(2, "0")} ${months[monthIdx]} ${year}, ${hhStr}:${mmStr} ${ampm} IST`;
  };

  /* ---------- UI ---------- */

  return (
    <div
      className={`min-h-screen ${THEME.colors.bg} text-black selection:bg-[#4285F4] selection:text-white flex items-start justify-center py-12`}
    >
      <main className="max-w-6xl w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Event Details (kept like your reference UI) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-block bg-[#FBBC04] border-2 border-black px-3 py-1 font-mono text-xs font-bold transform -rotate-2">
              {event.category || "Event Category"}
            </div>

            <h1
              className={`${THEME.fonts.heading} text-6xl md:text-7xl leading-none`}
            >
              {event.title || "Event"}
            </h1>

            <p className="font-mono text-base leading-relaxed border-l-4 border-[#34A853] pl-6 py-2">
              {event.description || "Event description"}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Calendar
                  className="text-[#4285F4]"
                  size={24}
                  strokeWidth={2.5}
                />
                <div>
                  <div className={`${THEME.fonts.heading}`}>
                    {formatDateTimeIST(event.date, event.time)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <MapPin
                  className="text-[#EA4335]"
                  size={24}
                  strokeWidth={2.5}
                />
                <div>
                  <div className={`${THEME.fonts.heading}`}>Venue</div>
                  <div className="font-mono text-xs">
                    {event.venue || "Venue"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form / cards / QR */}
          <div className="lg:col-span-7">
            <div
              className={`bg-white border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative`}
            >
              {/* Header */}
              <div className="mb-8 border-b-2 border-black pb-6 flex items-center gap-3">
                <CodeIcon />
                <div>
                  <h2
                    className={`${THEME.fonts.heading} text-3xl leading-none`}
                  >
                    Registration
                  </h2>
                  <p className="font-mono text-xs text-gray-500 mt-1">
                    SECURE YOUR SPOT
                  </p>
                </div>
              </div>

              {/* If QR already available — show QR box centered */}
              {qrValue ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-full p-8">
                    <div className="mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <Check size={32} />
                        <h3 className={`${THEME.fonts.heading} text-2xl`}>
                          YOU'RE IN!
                        </h3>
                      </div>

                      <div className="flex justify-center mb-6">
                        <QRCodeWithSvgLogo value={qrValue} />
                      </div>
                      <button
                        onClick={downloadQr}
                        className="w-full py-4 bg-black text-white"
                      >
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
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* ---------- BRANCH: team event vs solo event ---------- */}

                  {event.is_team_event ? (
                    // ---------- TEAM EVENT: keep your existing team UI (unchanged) ----------
                    <>
                      {/* Team name input (required before adding members) */}
                      <InputField
                        label="TEAM NAME"
                        value={teamName}
                        onChange={(e: any) => setTeamName(e.target.value)}
                        placeholder="Your team name (required for team events)"
                        icon={User}
                      />

                      {/* Cards (leader + members) */}
                      <div className="space-y-4">
                        <AnimatePresence>
                          {cards.map((card) => (
                            <StackCard
                              key={card.id}
                              title={card.title}
                              expanded={card.expanded}
                              onDelete={
                                card.type === "member"
                                  ? () => deleteMember(card.id)
                                  : undefined
                              }
                              onHeaderClick={() => toggleCard(card.id)}
                            >
                              {card.type === "leader" ? (
                                // leader edit fields (email disabled)
                                <>
                                  <InputField
                                    label="NAME"
                                    value={user.name || ""}
                                    onChange={(e: any) =>
                                      setUser({ ...user, name: e.target.value })
                                    }
                                    icon={User}
                                    required
                                  />
                                  <InputField
                                    label="EMAIL"
                                    value={user.email || ""}
                                    onChange={() => { }}
                                    icon={Mail}
                                    disabled
                                  />
                                  <InputField
                                    label="PHONE"
                                    value={user.phone_number || ""}
                                    onChange={(e: any) =>
                                      setUser({
                                        ...user,
                                        phone_number: e.target.value,
                                      })
                                    }
                                    icon={Phone}
                                  />
                                  <InputField
                                    label="SECTION"
                                    value={user.section || ""}
                                    onChange={(e: any) =>
                                      setUser({ ...user, section: e.target.value })
                                    }
                                    icon={Briefcase}
                                  />
                                  <InputField
                                    label="BRANCH"
                                    value={user.branch || ""}
                                    onChange={(e: any) =>
                                      setUser({ ...user, branch: e.target.value })
                                    }
                                    icon={Briefcase}
                                  />
                                  <div className="flex gap-3">
                                    <button
                                      onClick={saveLeaderEditsLocal}
                                      className="py-3 px-4 bg-[#4285F4] text-white flex items-center gap-2"
                                    >
                                      Save Leader
                                      {loading && (
                                        <Loader2 className="animate-spin" />
                                      )}
                                    </button>

                                    {/* if not team event — allow solo register */}
                                    {!event.is_team_event && (
                                      <button
                                        onClick={registerSolo}
                                        className="py-3 px-4 bg-black text-white ml-auto"
                                      >
                                        {loading ? (
                                          <Loader2 className="animate-spin" />
                                        ) : (
                                          "Confirm RSVP"
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </>
                              ) : (
                                // member form (only present while expanded and not validated)
                                <>
                                  {!card.validated ? (
                                    <>
                                      <InputField
                                        label="MEMBER EMAIL"
                                        value={card.email || ""}
                                        onChange={(e: any) => {
                                          const val = e.target.value;
                                          setCards((prev) =>
                                            prev.map((c) =>
                                              c.id === card.id
                                                ? { ...c, email: val }
                                                : c
                                            )
                                          );
                                        }}
                                        icon={Mail}
                                        placeholder="member@example.com"
                                        required
                                      />
                                      <div className="flex gap-3">
                                        <button
                                          onClick={() => validateMember(card.id)}
                                          className="py-3 px-4 bg-[#34A853] text-white"
                                        >
                                          Validate Member
                                        </button>
                                        <button
                                          onClick={() => deleteMember(card.id)}
                                          className="py-3 px-4 border-2 border-black ml-auto"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="py-3">
                                      <div className="font-mono">{card.email}</div>
                                      <div className="text-xs text-gray-500">
                                        Validated
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </StackCard>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Controls */}
                      <div className="mt-6 flex gap-3">
                        <button onClick={addMember} className="underline">
                          Add Member
                        </button>

                        <div className="ml-auto flex gap-3">
                          <button
                            onClick={registerTeam}
                            className="py-3 px-4 bg-black text-white"
                          >
                            {loading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              <>
                                Register Team <ArrowRight />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // ---------- SOLO EVENT: show only leader details + Register button ----------
                    <>
                      <div className="space-y-4">
                        <InputField
                          label="NAME"
                          value={user.name || ""}
                          onChange={(e: any) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          icon={User}
                          required
                        />
                        <InputField
                          label="EMAIL"
                          value={user.email || ""}
                          onChange={() => { }}
                          icon={Mail}
                          disabled
                        />
                        <InputField
                          label="PHONE"
                          value={user.phone_number || ""}
                          onChange={(e: any) =>
                            setUser({ ...user, phone_number: e.target.value })
                          }
                          icon={Phone}
                        />
                        <InputField
                          label="SECTION"
                          value={user.section || ""}
                          onChange={(e: any) =>
                            setUser({ ...user, section: e.target.value })
                          }
                          icon={Briefcase}
                        />
                        <InputField
                          label="BRANCH"
                          value={user.branch || ""}
                          onChange={(e: any) =>
                            setUser({ ...user, branch: e.target.value })
                          }
                          icon={Briefcase}
                        />
                      </div>

                      <div className="mt-6 flex">
                        <div className="ml-auto">
                          <button
                            onClick={registerSolo}
                            className="py-3 px-6 bg-black text-white"
                          >
                            {loading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Confirm RSVP"
                            )}
                          </button>
                        </div>
                      </div>

                      {/* WhatsApp link shown for solo event as requested (same styling as QR view) */}
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
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  /* ---------- local helpers inside component (to avoid hoisting functions) ---------- */

  async function saveLeaderEditsLocal() {
    // wrapper so we can access functions/vars above
    if (!user.name?.trim()) {
      toast.error("Leader name required");
      return;
    }
    setLoading(true);
    const supabase = createClient();
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
    // collapse leader card visually
    setCards((prev) =>
      reindex(
        prev.map((c) => (c.type === "leader" ? { ...c, expanded: false } : c))
      )
    );
  }

  function reindex(nextCards: typeof cards) {
    // keep leader first then members with new titles
    const leader = nextCards.filter((c) => c.type === "leader");
    const members = nextCards.filter((c) => c.type === "member");
    return [
      ...leader,
      ...members.map((m, i) => ({ ...m, title: `Team Member ${i + 1}` })),
    ];
  }
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
        <path
          d="M8.5 11.5L4 8l4.5-3.5"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 11.5L20 8l-4.5-3.5"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
