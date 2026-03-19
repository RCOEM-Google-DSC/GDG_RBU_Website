-- Enable RLS on portfolio tables
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "portfolios_select_policy" ON public.portfolios;
DROP POLICY IF EXISTS "portfolios_insert_policy" ON public.portfolios;
DROP POLICY IF EXISTS "portfolios_update_policy" ON public.portfolios;
DROP POLICY IF EXISTS "portfolios_delete_policy" ON public.portfolios;

DROP POLICY IF EXISTS "portfolio_projects_select_policy" ON public.portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_insert_policy" ON public.portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_update_policy" ON public.portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_delete_policy" ON public.portfolio_projects;

DROP POLICY IF EXISTS "portfolio_experience_select_policy" ON public.portfolio_experience;
DROP POLICY IF EXISTS "portfolio_experience_insert_policy" ON public.portfolio_experience;
DROP POLICY IF EXISTS "portfolio_experience_update_policy" ON public.portfolio_experience;
DROP POLICY IF EXISTS "portfolio_experience_delete_policy" ON public.portfolio_experience;

DROP POLICY IF EXISTS "portfolio_social_links_select_policy" ON public.portfolio_social_links;
DROP POLICY IF EXISTS "portfolio_social_links_insert_policy" ON public.portfolio_social_links;
DROP POLICY IF EXISTS "portfolio_social_links_update_policy" ON public.portfolio_social_links;
DROP POLICY IF EXISTS "portfolio_social_links_delete_policy" ON public.portfolio_social_links;

DROP POLICY IF EXISTS "portfolio_templates_select_policy" ON public.portfolio_templates;

-- PORTFOLIOS TABLE
-- SELECT: Published OR owner
CREATE POLICY "portfolios_select_policy" ON public.portfolios
  FOR SELECT
  USING (
    is_published = true OR 
    auth.uid() = user_id
  );

-- INSERT: Must be owner
CREATE POLICY "portfolios_insert_policy" ON public.portfolios
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Must be owner
CREATE POLICY "portfolios_update_policy" ON public.portfolios
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Must be owner
CREATE POLICY "portfolios_delete_policy" ON public.portfolios
  FOR DELETE
  USING (auth.uid() = user_id);

-- PORTFOLIO_PROJECTS TABLE
-- SELECT: If parent portfolio is published OR user is owner
CREATE POLICY "portfolio_projects_select_policy" ON public.portfolio_projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND (
        is_published = true OR 
        auth.uid() = user_id
      )
    )
  );

-- INSERT: Must be portfolio owner
CREATE POLICY "portfolio_projects_insert_policy" ON public.portfolio_projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

-- UPDATE: Must be portfolio owner
CREATE POLICY "portfolio_projects_update_policy" ON public.portfolio_projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

-- DELETE: Must be portfolio owner
CREATE POLICY "portfolio_projects_delete_policy" ON public.portfolio_projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

-- PORTFOLIO_EXPERIENCE TABLE (Same as projects)
CREATE POLICY "portfolio_experience_select_policy" ON public.portfolio_experience
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND (
        is_published = true OR 
        auth.uid() = user_id
      )
    )
  );

CREATE POLICY "portfolio_experience_insert_policy" ON public.portfolio_experience
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

CREATE POLICY "portfolio_experience_update_policy" ON public.portfolio_experience
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

CREATE POLICY "portfolio_experience_delete_policy" ON public.portfolio_experience
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

-- PORTFOLIO_SOCIAL_LINKS TABLE (Same as projects/experience)
CREATE POLICY "portfolio_social_links_select_policy" ON public.portfolio_social_links
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND (
        is_published = true OR 
        auth.uid() = user_id
      )
    )
  );

CREATE POLICY "portfolio_social_links_insert_policy" ON public.portfolio_social_links
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

CREATE POLICY "portfolio_social_links_update_policy" ON public.portfolio_social_links
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

CREATE POLICY "portfolio_social_links_delete_policy" ON public.portfolio_social_links
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE id = portfolio_id AND 
      auth.uid() = user_id
    )
  );

-- PORTFOLIO_TEMPLATES TABLE
-- SELECT: Read-only for all authenticated users
CREATE POLICY "portfolio_templates_select_policy" ON public.portfolio_templates
  FOR SELECT
  USING (true);
