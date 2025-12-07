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


-- =====================================================
-- OPTIONAL: Add some sample events for testing
-- =====================================================
-- INSERT INTO events (title, description, date, time, venue, category, is_team_event, max_team_size)
-- VALUES 
--   ('Cloud Next Extended 2025', 'Learn about the latest Google Cloud innovations', '2025-01-15', '10:00', 'Main Auditorium', 'conference', false, null),
--   ('Winter Hackathon', 'Build something amazing in 24 hours', '2025-01-20', '09:00', 'Tech Hub', 'hackathon', true, 4),
--   ('Flutter Workshop', 'Hands-on Flutter development workshop', '2025-01-25', '14:00', 'Lab 201', 'workshop', false, null);
