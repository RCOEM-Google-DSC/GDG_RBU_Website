import { ReactNode } from "react";

export function isProfileComplete(user: {
  name?: string | null;
  email?: string | null;
  section?: string | null;
  branch?: string | null;
  phone_number?: string | null;
}) {
  return Boolean(
    user?.name &&
      user?.email &&
      user?.section &&
      user?.branch &&
      user?.phone_number
  );
}


// ---------- Event ----------
export type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  image_url: string;
  date: string;
  time?: string;
  event_time?: string;
  is_paid?: boolean;
  fee?: number | null;
  qr_code?: string | null;
  max_participants?: number | null;
  is_team_event?: boolean;
  max_team_size?: number | null;
  category?: string;
  status?: string;
  organizer_id?: string | null;
  partner_id?: string | null;
  partners?: Partner | null;
};

// ---------- Partner ----------
export type Partner = {
  id: string;
  name: string;
  website: string;
  logo_url: string;
  description: string;
  image_url: string;
};

// ---------- Registration ----------
export interface RegistrationProps {
  id: string;
  event_id: string;
  user_id: string;
  check_in_time: string | null;
  created_at: string;
  status: string;

  team_name?: string;
  team_members?: Array<string>;
  is_team_registration?: boolean;
  wants_random_team?: boolean;
  is_open_to_alliances?: boolean;
}

// ---------- Event Card ----------
export interface PastEventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: Array<string>;
  tagColor?: string;
}
export interface UpcomingEventCardProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  image: string;
  tags?: Array<string>;
  tagColor?: string;
}

// ---------- PROFILE TYPES ----------

export type ProfileLinks = {
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

export type SupabaseUserRow = {
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

export type UIUser = {
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

// ---------- EVENT TYPES ----------

export type EventRow = {
  id: string;
  title: string;
  event_time: string | null;
  image_url: string | null;
};

export type UIEvent = {
  id: string;
  title: string;
  date: string;
  image: string;
  tag: string;
  tagColor: string;
  certificate_url?: string | null;
};

// ---------- BADGE TYPES ----------

export type UIBadge = {
  id: number | string;
  name: string;
  icon: ReactNode;
  color: string;
};

// ---------- REGISTRATION TYPES ----------

export type Registration = {
  id: string;
  event_id: string;
  status: string;
  check_in_time: string | null;
  created_at: string;
  team_name?: string | null;
  certificate_url?: string | null;
  users: {
    id: string;
    name: string;
    email: string;
    image_url?: string | null;
    section: string;
    branch: string;
    phone_number?: string | null;
    role?: string | null;
    profile_links?: any;
    badges?: string[] | null;
    created_at?: string;
  }[];
};
