-- ============================================
-- GDG RBU Recruitment Submissions Table
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE recruitment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Personal Details
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  year INT2 NOT NULL,
  branch TEXT NOT NULL,

  -- Domain Preferences (radio grid: each pref picks one domain)
  domain_pref_1 TEXT NOT NULL,
  domain_pref_2 TEXT,
  domain_pref_3 TEXT,

  -- Sub-domain Preferences
  tech_domain TEXT NOT NULL,        -- Web Dev, Android, Flutter, Cloud, ML, None
  socials_domain TEXT NOT NULL,     -- Video Editing, Content Writing, Social & Outreach, Photography, None

  -- Profile Links
  linkedin_url TEXT NOT NULL,
  github_url TEXT,
  codeforces_url TEXT,
  codechef_url TEXT,
  other_cp_url TEXT,

  -- About
  cgpa DECIMAL(4,2),
  resume_url TEXT NOT NULL,         -- Cloudinary raw URL
  motive TEXT NOT NULL,             -- Why join GDG
  value_addition TEXT NOT NULL,     -- How can you add value
  projects TEXT NOT NULL,           -- Projects / experience showcase

  -- Task Submission
  task_domain TEXT NOT NULL,        -- Which domain tab they submitted for (CP, Design, Web Dev, etc.)
  task_links TEXT[] NOT NULL DEFAULT '{}',  -- Array of submitted links (at least 1 required)
  task_details JSONB DEFAULT '{}',          -- Flexible field for future task-specific data

  -- Metadata
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Prevent duplicate submissions per user
CREATE UNIQUE INDEX idx_recruitment_one_per_user ON recruitment_submissions (user_id);

-- Fast lookup by email
CREATE INDEX idx_recruitment_email ON recruitment_submissions (email);

-- Fast lookup by domain
CREATE INDEX idx_recruitment_task_domain ON recruitment_submissions (task_domain);

-- Fast lookup by status
CREATE INDEX idx_recruitment_status ON recruitment_submissions (status);

-- ============================================
-- RLS Policies
-- ============================================

ALTER TABLE recruitment_submissions ENABLE ROW LEVEL SECURITY;

-- Users can insert their own submission
CREATE POLICY "Users can insert own submission"
  ON recruitment_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own submission
CREATE POLICY "Users can read own submission"
  ON recruitment_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own submission (before review)
CREATE POLICY "Users can update own submission"
  ON recruitment_submissions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'submitted')
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_recruitment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recruitment_updated_at
  BEFORE UPDATE ON recruitment_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_recruitment_updated_at();
