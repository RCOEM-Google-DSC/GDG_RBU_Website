"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Download,
  Share2,
  Trophy,
  Award,
  Code,
  Cloud,
  UserCheck,
  Calendar,
} from "lucide-react";
import { BackgroundRippleEffect } from "../Components/Reusables/BackgroundRipple";
import { supabase, getCurrentUserId } from "../../supabase/supabase";

// ---------- TYPES ----------

type ProfileLinks = {
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

type SupabaseUserRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  section: string | null;
  branch: string | null;
  image_url: string | null;
  profile_links: ProfileLinks | null;
  badges: string[] | null;
  my_events: string[] | null; // uuid[]
  role: string;
  created_at: string;
  updated_at: string;
};

type UIUser = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  stats: {
    events: number;
    badges: number;
  };
  profileLinks: ProfileLinks;
  my_events: string[] | null;
};

type EventRow = {
  id: string;
  title: string;
  event_time: string | null;
  image_url: string | null;
};

type UIEvent = {
  id: string;
  title: string;
  date: string;
  image: string;
  tag: string;
  tagColor: string;
};

type UIBadge = {
  id: number | string;
  name: string;
  icon: JSX.Element;
  color: string;
};

// ---------- HELPERS ----------

const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000";

const BADGE_CONFIG: Record<string, { icon: JSX.Element; color: string }> = {
  "AI Explorer": {
    icon: <Cloud className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  "Hackathon Hero": {
    icon: <Trophy className="w-6 h-6 text-red-500" />,
    color: "bg-red-100 dark:bg-red-900/30",
  },
  "Community Lead": {
    icon: <UserCheck className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  "Cloud Certified": {
    icon: <Award className="w-6 h-6 text-green-500" />,
    color: "bg-green-100 dark:bg-green-900/30",
  },
  "Code Ninja": {
    icon: <Code className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-100 dark:bg-purple-900/30",
  },
  Mentor: {
    icon: <Share2 className="w-6 h-6 text-orange-500" />,
    color: "bg-orange-100 dark:bg-orange-900/30",
  },
};

function buildUIUser(
  row: SupabaseUserRow,
  eventsCount: number,
  badgesCount: number
): UIUser {
  const name = row.name || "User";
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    name
  )}&backgroundColor=b6e3f4`;

  return {
    name,
    title: row.role.toUpperCase(),
    bio: "Passionate about building scalable web applications and fostering developer communities. Always learning, always coding.",
    email: row.email ?? "no-email@example.com",
    phone: row.phone_number ?? "N/A",
    location:
      row.section && row.branch
        ? `${row.section} • ${row.branch}`
        : "RBU Campus, Nagpur",
    avatarUrl: row.image_url || defaultAvatar,
    stats: {
      events: eventsCount,
      badges: badgesCount,
    },
    my_events: row.my_events ?? [],
    profileLinks: row.profile_links ?? {},
  };
}

// Build UI events directly from events table rows
function buildUIEvents(rows: EventRow[]): UIEvent[] {
  const now = new Date();

  return rows.map((ev) => {
    const evDate = ev.event_time ? new Date(ev.event_time) : null;
    const isPast = evDate ? evDate < now : false;

    return {
      id: ev.id,
      title: ev.title,
      date: evDate ? evDate.toLocaleString() : "Date TBA",
      image: ev.image_url || DEFAULT_EVENT_IMAGE,
      tag: isPast ? "Completed" : "Registered",
      tagColor: isPast ? "bg-green-600" : "bg-blue-600",
    };
  });
}

function buildUIBadges(names: string[] | null | undefined): UIBadge[] {
  if (!names || names.length === 0) return [];
  return names.map((name, idx) => {
    const config = BADGE_CONFIG[name] ?? {
      icon: <Award className="w-6 h-6 text-neutral-600" />,
      color: "bg-neutral-100 dark:bg-neutral-900/30",
    };
    return {
      id: idx,
      name,
      icon: config.icon,
      color: config.color,
    };
  });
}

// ---------- SUB-COMPONENTS ----------

const ProfileHeader = ({ user }: { user: UIUser }) => {
  const router = useRouter();

  const onCompleteProfile = () => {
    router.push("/Other/complete-profile");
  };

  return (
    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-neutral-200 dark:border-neutral-800 relative z-10">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 p-1 overflow-hidden relative">
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">
                  {user.title}
                </p>
              </div>
              <button
                className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 rounded-full font-medium shadow-lg hover:transform hover:scale-105 transition-all active:scale-95 text-sm md:text-base whitespace-nowrap"
                onClick={onCompleteProfile}
              >
                Complete your profile
              </button>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Contact Pills */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <Phone className="w-4 h-4" />
              {user.phone}
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            {[
              { Icon: Github, key: "github", href: user.profileLinks.github },
              {
                Icon: Linkedin,
                key: "linkedin",
                href: user.profileLinks.linkedin,
              },
              { Icon: Twitter, key: "twitter", href: user.profileLinks.twitter },
            ].map(({ Icon, key, href }) =>
              href ? (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ) : (
                <button
                  key={key}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400 cursor-not-allowed"
                >
                  <Icon className="w-5 h-5" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: UIEvent }) => (
  <div className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/70 dark:to-neutral-950 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
    {/* Image section */}
    <div className="relative w-full sm:w-60 h-44 sm:h-auto shrink-0">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

      {/* Status pill */}
      <span
        className={cn(
          "absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase shadow-sm",
          "bg-black/60 text-white backdrop-blur",
          event.tagColor // you can still pass colors like "bg-blue-600"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        {event.tag}
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between px-5 py-4 gap-4 w-full">
      <div className="space-y-2">
        {/* Date */}
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100/80 dark:bg-neutral-800/70 px-3 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
          <Calendar className="w-3.5 h-3.5" />
          <span>{event.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white leading-snug">
          {event.title}
        </h3>

        {/* Optional small subtitle / helper text */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          You’re registered for this event. Download your certificate or share it with friends.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
       <button className="
  flex-1 inline-flex items-center justify-center gap-2
  rounded-xl px-4 py-2.5
  text-sm font-medium
  text-neutral-900 dark:text-white
  border border-neutral-300 dark:border-neutral-700
  bg-white/70 dark:bg-neutral-900/60 backdrop-blur
  hover:bg-neutral-100 dark:hover:bg-neutral-800
  transition-all
">
  <Download className="w-4 h-4" />
  Download Certificate
</button>


        <button className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* subtle accent bar on the left */}
    <div className="hidden sm:block absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-sky-400 to-purple-500" />
  </div>
);

const BadgeCard = ({ badge }: { badge: UIBadge }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center p-4 rounded-xl transition-transform hover:scale-105",
      badge.color
    )}
  >
    <div className="mb-2 p-2 bg-white/50 dark:bg-black/20 rounded-full">
      {badge.icon}
    </div>
    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200 text-center">
      {badge.name}
    </span>
  </div>
);

// ---------- MAIN COMPONENT ----------

export default function ProfilePage() {
  const [user, setUser] = useState<UIUser | null>(null);
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [badges, setBadges] = useState<UIBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await getCurrentUserId();
        if (!userId) {
          setError("You must be logged in to view your profile.");
          return;
        }

        // 1. Fetch user row
        const { data: userRow, error: userErr } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single<SupabaseUserRow>();

        if (userErr || !userRow) {
          throw userErr || new Error("User not found");
        }

        // 2. Fetch events whose IDs are in my_events
        let uiEvents: UIEvent[] = [];

        if (userRow.my_events && userRow.my_events.length > 0) {
          const { data: eventRows, error: eventsErr } = await supabase
            .from("events")
            .select("id, title, event_time, image_url")
            .in("id", userRow.my_events as string[]);

          if (eventsErr) throw eventsErr;

          uiEvents = buildUIEvents((eventRows || []) as EventRow[]);
        }

        // 3. Build badges from text[]
        const uiBadges = buildUIBadges(userRow.badges);

        // 4. Build UI user
        const uiUser = buildUIUser(userRow, uiEvents.length, uiBadges.length);

        setUser(uiUser);
        setEvents(uiEvents);
        setBadges(uiBadges);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-950 font-sans">
      <div className="fixed inset-0 z-0">
        <BackgroundRippleEffect />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {loading && (
          <div className="text-center text-neutral-500 py-10">
            Loading profile...
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {!loading && !error && user && (
          <>
            {/* 1. Header Section */}
            <section className="mb-12">
              <ProfileHeader user={user} />
            </section>

            {/* 2. Grid Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Events */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                      My Events
                    </h2>
                  </div>
                  <button className="text-sm text-neutral-500 hover:text-blue-600 font-medium">
                    View All &gt;
                  </button>
                </div>

                {events.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    You haven&apos;t registered for any events yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Badges */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2 border-l-4 border-purple-600 pl-3 mb-2">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    My Badges
                  </h2>
                </div>

                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                  {badges.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      No badges yet. Participate in events to earn some!
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {badges.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes cell-ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(0.9);
            opacity: 1;
            background-color: var(--cell-fill-color);
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }
        .animate-cell-ripple {
          animation: cell-ripple var(--duration) linear var(--delay) forwards;
        }
      `}</style>
    </div>
  );
}
