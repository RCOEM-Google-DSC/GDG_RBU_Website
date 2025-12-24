import { ReactNode } from "react";
import {
  Cloud,
  Trophy,
  UserCheck,
  Award,
  Code,
  Share2,
} from "lucide-react";
import {
  SupabaseUserRow,
  UIUser,
  UIEvent,
  UIBadge,
  Registration,
  EventRow,
} from "../../../lib/types";

// ---------- CONSTANTS ----------

export const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000";

export const BADGE_CONFIG: Record<string, { icon: ReactNode; color: string }> = {
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

// ---------- BUILDER FUNCTIONS ----------

export function buildUIUser(
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
    bio: "GDG on Campus Member • Building amazing things with technology",
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

export function buildUIEvents(events: EventRow[], registrations: Registration[]): UIEvent[] {
  const now = new Date();
  const regMap = new Map(registrations.map(r => [r.event_id, r]));

  return events.map((ev) => {
    const reg = regMap.get(ev.id);
    const evDate = ev.event_time ? new Date(ev.event_time) : null;
    const isPast = evDate ? evDate < now : false;

    return {
      id: ev.id,
      title: ev.title,
      date: evDate ? evDate.toLocaleString() : "Date TBA",
      image: ev.image_url || DEFAULT_EVENT_IMAGE,
      tag: reg?.status === "checked_in" ? "Attended" : isPast ? "Completed" : "Registered",
      tagColor: reg?.status === "checked_in" ? "bg-green-600" : isPast ? "bg-gray-600" : "bg-blue-600",
      certificate_url: reg?.certificate_url || null,
      registration_status: reg?.status ?? "registered",
      certificate_generated_once: reg?.certificate_generated_once || false,
    };
  });
}

export function buildUIBadges(names: string[] | null | undefined): UIBadge[] {
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
