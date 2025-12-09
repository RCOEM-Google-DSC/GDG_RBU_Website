import { ReactNode } from "react";

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
  created_at: string;
};
