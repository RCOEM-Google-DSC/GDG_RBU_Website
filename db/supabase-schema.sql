-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  venue text NOT NULL,
  event_time timestamp with time zone,
  image_url text DEFAULT 'event.png'::text,
  organizer_id uuid,
  partner_id uuid,
  status USER-DEFINED NOT NULL DEFAULT 'upcoming'::event_status,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  date date,
  time text,
  is_paid boolean DEFAULT false,
  fee numeric DEFAULT 0,
  max_participants integer DEFAULT 100,
  is_team_event boolean DEFAULT false,
  max_team_size integer DEFAULT 4,
  category text DEFAULT 'workshop'::text,
  min_team_size smallint DEFAULT '2'::smallint,
  qr_code text,
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_organizer_id_fkey FOREIGN KEY (organizer_id) REFERENCES public.users(id),
  CONSTRAINT events_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id)
);
CREATE TABLE public.gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  uploaded_by uuid,
  event_id uuid,
  uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT gallery_pkey PRIMARY KEY (id),
  CONSTRAINT gallery_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.team_members(id),
  CONSTRAINT gallery_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.partners (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  logo_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT partners_pkey PRIMARY KEY (id)
);
CREATE TABLE public.registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  user_id uuid NOT NULL,
  check_in_time timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  team_name text,
  is_team_registration boolean DEFAULT false,
  wants_random_team boolean DEFAULT false,
  is_open_to_alliances boolean DEFAULT false,
  status USER-DEFINED NOT NULL DEFAULT 'registered'::registration_status,
  certificate_url text,
  CONSTRAINT registrations_pkey PRIMARY KEY (id),
  CONSTRAINT registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id),
  CONSTRAINT registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  domain USER-DEFINED,
  bio text,
  thought text,
  leetcode text,
  twitter text,
  instagram text,
  club_email text,
  cv_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  userid uuid NOT NULL UNIQUE,
  linkedin text,
  github text,
  CONSTRAINT team_members_pkey PRIMARY KEY (id),
  CONSTRAINT team_members_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  role USER-DEFINED NOT NULL DEFAULT 'user'::user_role,
  image_url text DEFAULT 'user.png'::text,
  provider text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  badges ARRAY,
  profile_links json,
  section text NOT NULL DEFAULT ''::text,
  branch text NOT NULL DEFAULT ''::text,
  phone_number text NOT NULL DEFAULT ''::text,
  my_events ARRAY,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);