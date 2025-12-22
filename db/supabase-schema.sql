-- ========================================
-- SAFE MIGRATIONS FOR EXISTING DATABASE
-- This script is safe to run multiple times
-- ========================================

-- ========================================
-- ENUMS (Create if not exists)
-- ========================================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'member', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE registration_status AS ENUM ('registered', 'verified', 'attended', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE domain_type AS ENUM ('web', 'app', 'ml', 'cloud', 'design', 'management');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ========================================
-- TABLES (Create if not exists)
-- ========================================

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role user_role NOT NULL DEFAULT 'user'::user_role,
  image_url text DEFAULT 'user.png'::text,
  provider text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  badges text[],
  profile_links json,
  section text NOT NULL DEFAULT ''::text,
  branch text NOT NULL DEFAULT ''::text,
  phone_number text NOT NULL DEFAULT ''::text,
  my_events uuid[],
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Add unique constraint if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_email_key'
  ) THEN
    ALTER TABLE public.users ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  logo_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT partners_pkey PRIMARY KEY (id)
);

-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  venue text NOT NULL,
  event_time timestamp with time zone,
  image_url text DEFAULT 'event.png'::text,
  organizer_id uuid,
  partner_id uuid,
  status event_status NOT NULL DEFAULT 'upcoming'::event_status,
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
  CONSTRAINT events_pkey PRIMARY KEY (id)
);

-- Add missing columns to events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS qr_code text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS min_team_size smallint DEFAULT 2;

-- Add foreign key constraints if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'events_organizer_id_fkey'
  ) THEN
    ALTER TABLE public.events ADD CONSTRAINT events_organizer_id_fkey 
      FOREIGN KEY (organizer_id) REFERENCES public.users(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'events_partner_id_fkey'
  ) THEN
    ALTER TABLE public.events ADD CONSTRAINT events_partner_id_fkey 
      FOREIGN KEY (partner_id) REFERENCES public.partners(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Team Members Table (for GDG team, not event teams)
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  userid uuid NOT NULL,
  domain domain_type,
  bio text,
  thought text,
  leetcode text,
  twitter text,
  instagram text,
  club_email text,
  cv_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id)
);

-- Add missing columns to team_members table
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS linkedin text;
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS github text;

-- Add constraints if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_members_userid_fkey'
  ) THEN
    ALTER TABLE public.team_members ADD CONSTRAINT team_members_userid_fkey 
      FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_members_userid_key'
  ) THEN
    ALTER TABLE public.team_members ADD CONSTRAINT team_members_userid_key UNIQUE (userid);
  END IF;
END $$;

-- Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  user_id uuid NOT NULL,
  status registration_status NOT NULL DEFAULT 'registered'::registration_status,
  check_in_time timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  team_name text,
  is_team_registration boolean DEFAULT false,
  wants_random_team boolean DEFAULT false,
  is_open_to_alliances boolean DEFAULT false,
  CONSTRAINT registrations_pkey PRIMARY KEY (id)
);

-- Add foreign key constraints if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'registrations_event_id_fkey'
  ) THEN
    ALTER TABLE public.registrations ADD CONSTRAINT registrations_event_id_fkey 
      FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'registrations_user_id_fkey'
  ) THEN
    ALTER TABLE public.registrations ADD CONSTRAINT registrations_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint to prevent duplicate registrations
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_event'
  ) THEN
    ALTER TABLE public.registrations ADD CONSTRAINT unique_user_event UNIQUE (event_id, user_id);
  END IF;
END $$;

-- Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  uploaded_by uuid,
  event_id uuid,
  uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT gallery_pkey PRIMARY KEY (id)
);

-- Add foreign key constraints if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'gallery_uploaded_by_fkey'
  ) THEN
    ALTER TABLE public.gallery ADD CONSTRAINT gallery_uploaded_by_fkey 
      FOREIGN KEY (uploaded_by) REFERENCES public.team_members(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'gallery_event_id_fkey'
  ) THEN
    ALTER TABLE public.gallery ADD CONSTRAINT gallery_event_id_fkey 
      FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
  END IF;
END $$;

-- ========================================
-- FUNCTIONS
-- ========================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if they exist, then recreate
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_members_updated_at ON public.team_members;
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- RPC FUNCTIONS
-- ========================================

-- Function to register a team for an event
CREATE OR REPLACE FUNCTION register_team(
  p_event_id uuid,
  p_team_name text,
  p_member_ids uuid[]
)
RETURNS void AS $$
DECLARE
  v_leader_id uuid;
  v_member_id uuid;
BEGIN
  -- Get the current user's ID (team leader)
  v_leader_id := auth.uid();
  
  IF v_leader_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;

  -- Insert registration for team leader
  INSERT INTO public.registrations (
    event_id,
    user_id,
    team_name,
    is_team_registration,
    status
  ) VALUES (
    p_event_id,
    v_leader_id,
    p_team_name,
    true,
    'registered'
  )
  ON CONFLICT (event_id, user_id) DO NOTHING;

  -- Insert registrations for team members
  FOREACH v_member_id IN ARRAY p_member_ids
  LOOP
    INSERT INTO public.registrations (
      event_id,
      user_id,
      team_name,
      is_team_registration,
      status
    ) VALUES (
      p_event_id,
      v_member_id,
      p_team_name,
      true,
      'registered'
    )
    ON CONFLICT (event_id, user_id) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- ROW LEVEL SECURITY POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and recreate (to ensure they're up to date)

-- Users Policies
DROP POLICY IF EXISTS users_public_select ON public.users;
CREATE POLICY users_public_select ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS users_insert_own ON public.users;
CREATE POLICY users_insert_own ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS users_update_own ON public.users;
CREATE POLICY users_update_own ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS users_update_admin ON public.users;
CREATE POLICY users_update_admin ON public.users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

DROP POLICY IF EXISTS users_delete_admin ON public.users;
CREATE POLICY users_delete_admin ON public.users FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- Events Policies
DROP POLICY IF EXISTS events_public_select ON public.events;
CREATE POLICY events_public_select ON public.events FOR SELECT USING (true);

DROP POLICY IF EXISTS events_insert_roles ON public.events;
CREATE POLICY events_insert_roles ON public.events FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = ANY (ARRAY['admin'::user_role, 'member'::user_role]))
);

DROP POLICY IF EXISTS events_update_owner_or_admin ON public.events;
CREATE POLICY events_update_owner_or_admin ON public.events FOR UPDATE USING (
  (organizer_id = auth.uid()) OR 
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
) WITH CHECK (
  (organizer_id = auth.uid()) OR 
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

DROP POLICY IF EXISTS events_delete_admin ON public.events;
CREATE POLICY events_delete_admin ON public.events FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- Partners Policies
DROP POLICY IF EXISTS partners_public_select ON public.partners;
CREATE POLICY partners_public_select ON public.partners FOR SELECT USING (true);

DROP POLICY IF EXISTS partners_admin_write ON public.partners;
CREATE POLICY partners_admin_write ON public.partners FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- Registrations Policies
DROP POLICY IF EXISTS registrations_insert_own ON public.registrations;
CREATE POLICY registrations_insert_own ON public.registrations FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS registrations_select_user_or_admin ON public.registrations;
CREATE POLICY registrations_select_user_or_admin ON public.registrations FOR SELECT USING (
  (user_id = auth.uid()) OR 
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

DROP POLICY IF EXISTS registrations_update_admin_or_organizer ON public.registrations;
CREATE POLICY registrations_update_admin_or_organizer ON public.registrations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role) OR
  EXISTS (SELECT 1 FROM public.events e WHERE e.id = registrations.event_id AND e.organizer_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role) OR
  EXISTS (SELECT 1 FROM public.events e WHERE e.id = registrations.event_id AND e.organizer_id = auth.uid())
);

DROP POLICY IF EXISTS registrations_delete_admin ON public.registrations;
CREATE POLICY registrations_delete_admin ON public.registrations FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- Team Members Policies
DROP POLICY IF EXISTS team_members_public_select ON public.team_members;
CREATE POLICY team_members_public_select ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS team_members_admin_insert ON public.team_members;
CREATE POLICY team_members_admin_insert ON public.team_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

DROP POLICY IF EXISTS team_members_admin_update ON public.team_members;
CREATE POLICY team_members_admin_update ON public.team_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

DROP POLICY IF EXISTS team_members_admin_delete ON public.team_members;
CREATE POLICY team_members_admin_delete ON public.team_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- Gallery Policies
DROP POLICY IF EXISTS gallery_public_select ON public.gallery;
CREATE POLICY gallery_public_select ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS gallery_admin_write ON public.gallery;
CREATE POLICY gallery_admin_write ON public.gallery FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'::user_role)
);

-- ========================================
-- INDEXES (Create if not exists)
-- ========================================

CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON public.events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON public.registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_gallery_event ON public.gallery(event_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);