-- =====================================================
-- SUPABASE MIGRATION: Auto-create users in public.users
-- This trigger automatically creates a record in public.users
-- when a new user signs up and verifies their email in auth.users
-- =====================================================

-- 1. Create a function to handle new user creation
-- =====================================================
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

  -- Insert into public.users with ALL required columns
  -- This will create the user on signup, and update on email confirmation
  INSERT INTO public.users (
    id,
    name,
    email,
    role,
    image_url,
    provider,
    badges,
    profile_links,
    section,
    branch,
    phone_number,
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
    ARRAY[]::text[],  -- Empty array for badges
    NULL,              -- NULL for profile_links
    '',                -- Empty string for section (required, has default)
    '',                -- Empty string for branch (required, has default)
    '',                -- Empty string for phone_number (required, has default)
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
    -- Log the error with full details
    RAISE WARNING 'Error creating user in public.users. User ID: %, Email: %, Error: %, Detail: %', 
      NEW.id, user_email, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create triggers that fire when a user is created or updated
-- =====================================================
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

-- 3. Add an INSERT RLS policy to allow users to insert themselves
-- (This is a backup in case the trigger doesn't work, or for manual inserts)
-- =====================================================
-- Note: The trigger uses SECURITY DEFINER so it bypasses RLS,
-- but having this policy is good practice
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. The trigger fires AFTER INSERT on auth.users when a user signs up
-- 2. The UPDATE trigger fires when email_confirmed_at changes (email verification)
-- 3. SECURITY DEFINER allows the function to bypass RLS policies
-- 4. The RLS policy "users_insert_own" is a backup for application-level inserts
-- 5. The function extracts full_name from user_metadata if available
-- =====================================================

