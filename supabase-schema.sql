-- =====================================================
-- SUPABASE DATABASE SCHEMA
-- Run this in the Supabase SQL Editor
-- =====================================================

-- 1. EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  venue TEXT,
  is_paid BOOLEAN DEFAULT FALSE,
  fee NUMERIC DEFAULT 0,
  max_participants INTEGER DEFAULT 100,
  is_team_event BOOLEAN DEFAULT FALSE,
  max_team_size INTEGER DEFAULT 4,
  category TEXT DEFAULT 'workshop',
  organizer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
-- Anyone can read events
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);

-- Authenticated users can create events
CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = organizer_id);

-- Organizers can update their own events
CREATE POLICY "Organizers can update own events" ON events
  FOR UPDATE TO authenticated
  USING (auth.uid() = organizer_id);

-- Organizers can delete their own events
CREATE POLICY "Organizers can delete own events" ON events
  FOR DELETE TO authenticated
  USING (auth.uid() = organizer_id);


-- 2. REGISTRATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  team_name TEXT,
  team_members JSONB,
  is_team_registration BOOLEAN DEFAULT FALSE,
  wants_random_team BOOLEAN DEFAULT FALSE,
  is_open_to_alliances BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for registrations
-- Users can only view their own registrations
CREATE POLICY "Users can view own registrations" ON registrations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can create registrations for themselves only
CREATE POLICY "Users can register for events" ON registrations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own registrations
CREATE POLICY "Users can cancel own registrations" ON registrations
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);


-- 3. USERS TABLE
-- =====================================================
-- Note: This table should already exist, but including it here for reference
-- The users table stores user profile information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  image_url TEXT DEFAULT 'user.png',
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
-- Anyone can read users (public profiles)
CREATE POLICY "users_public_select" ON users
  FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "users_update_own" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert themselves (backup policy, trigger handles this)
CREATE POLICY "users_insert_own" ON users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Admins can delete users
CREATE POLICY "users_delete_admin" ON users
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admins can update any user
CREATE POLICY "users_update_admin" ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );


-- 4. AUTO-CREATE USER TRIGGER
-- =====================================================
-- This trigger automatically creates a record in public.users
-- when a new user signs up and verifies their email in auth.users

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  user_email TEXT;
  user_provider TEXT;
BEGIN
  -- Extract user information
  user_email := COALESCE(NEW.email, '');
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    user_email,
    'User'
  );
  user_provider := COALESCE(
    NEW.app_metadata->>'provider',
    'email'
  );

  -- Insert into public.users
  -- This will create the user on signup, and update on email confirmation
  INSERT INTO public.users (
    id,
    name,
    email,
    role,
    image_url,
    provider,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    user_name,
    user_email,
    'user'::user_role,
    'user.png',
    user_provider,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, users.name),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth operation
    RAISE WARNING 'Error creating user in public.users: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers that fire when a user is created or updated
-- Trigger on INSERT: Fires when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger on UPDATE: Fires when user verifies email (email_confirmed_at is set)
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.email_confirmed_at IS DISTINCT FROM NEW.email_confirmed_at)
  EXECUTE FUNCTION public.handle_new_user();


-- =====================================================
-- OPTIONAL: Add some sample events for testing
-- =====================================================
-- INSERT INTO events (title, description, date, time, venue, category, is_team_event, max_team_size)
-- VALUES 
--   ('Cloud Next Extended 2025', 'Learn about the latest Google Cloud innovations', '2025-01-15', '10:00', 'Main Auditorium', 'conference', false, null),
--   ('Winter Hackathon', 'Build something amazing in 24 hours', '2025-01-20', '09:00', 'Tech Hub', 'hackathon', true, 4),
--   ('Flutter Workshop', 'Hands-on Flutter development workshop', '2025-01-25', '14:00', 'Lab 201', 'workshop', false, null);
