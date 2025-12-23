-- Update domain_type enum to match new domain values
-- This script safely updates the enum by creating a new one and migrating data

-- Step 1: Create new enum with updated values
DO $$ BEGIN
  CREATE TYPE domain_type_new AS ENUM ('web', 'mac', 'design', 'management', 'socials');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add temporary column with new type
ALTER TABLE public.team_members 
  ADD COLUMN IF NOT EXISTS domain_new domain_type_new;

-- Step 3: Migrate data from old column to new column
-- Map old values to new values where applicable
UPDATE public.team_members
SET domain_new = CASE 
  WHEN domain::text = 'web' THEN 'web'::domain_type_new
  WHEN domain::text = 'app' THEN 'mac'::domain_type_new  -- Map app to mac
  WHEN domain::text = 'ml' THEN 'mac'::domain_type_new   -- Map ml to mac
  WHEN domain::text = 'cloud' THEN 'mac'::domain_type_new -- Map cloud to mac
  WHEN domain::text = 'design' THEN 'design'::domain_type_new
  WHEN domain::text = 'management' THEN 'management'::domain_type_new
  ELSE NULL
END
WHERE domain IS NOT NULL;

-- Step 4: Drop old column
ALTER TABLE public.team_members DROP COLUMN IF EXISTS domain;

-- Step 5: Rename new column to original name
ALTER TABLE public.team_members RENAME COLUMN domain_new TO domain;

-- Step 6: Drop old enum type
DROP TYPE IF EXISTS domain_type;

-- Step 7: Rename new enum to original name
ALTER TYPE domain_type_new RENAME TO domain_type;
