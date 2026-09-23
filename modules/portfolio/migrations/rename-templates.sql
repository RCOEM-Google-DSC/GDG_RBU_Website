-- Portfolio Template Rename Migration

BEGIN;

INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
SELECT 'brutalist-dark', 'Brutalist Dark', description, preview_image_url, created_at
FROM public.portfolio_templates WHERE id = 'architectural'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
SELECT 'warm-elegance', 'Warm Elegance', description, preview_image_url, created_at
FROM public.portfolio_templates WHERE id = 'soft'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
SELECT 'clean-grid', 'Clean Grid', description, preview_image_url, created_at
FROM public.portfolio_templates WHERE id = 'minimalist-grid'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
SELECT 'editorial-mono', 'Editorial Mono', description, preview_image_url, created_at
FROM public.portfolio_templates WHERE id = 'magazine'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
SELECT 'noir-grain', 'Noir Grain', description, preview_image_url, created_at
FROM public.portfolio_templates WHERE id = 'hyun-barng'
ON CONFLICT (id) DO NOTHING;

-- 2. Update portfolios to point to the new templates
UPDATE public.portfolios SET template_id = 'brutalist-dark'  WHERE template_id = 'architectural';
UPDATE public.portfolios SET template_id = 'warm-elegance'   WHERE template_id = 'soft';
UPDATE public.portfolios SET template_id = 'clean-grid'      WHERE template_id = 'minimalist-grid';
UPDATE public.portfolios SET template_id = 'editorial-mono'  WHERE template_id = 'magazine';
UPDATE public.portfolios SET template_id = 'noir-grain'      WHERE template_id = 'hyun-barng';

-- 3. Delete the old templates
DELETE FROM public.portfolio_templates WHERE id IN ('architectural', 'soft', 'minimalist-grid', 'magazine', 'hyun-barng');

COMMIT;



-- ROLLBACK SCRIPT

--
-- BEGIN;
--
-- INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
-- SELECT 'architectural', 'Architectural', description, preview_image_url, created_at FROM public.portfolio_templates WHERE id = 'brutalist-dark' ON CONFLICT DO NOTHING;
-- INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
-- SELECT 'soft', 'Soft', description, preview_image_url, created_at FROM public.portfolio_templates WHERE id = 'warm-elegance' ON CONFLICT DO NOTHING;
-- INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
-- SELECT 'minimalist-grid', 'Minimalist Grid', description, preview_image_url, created_at FROM public.portfolio_templates WHERE id = 'clean-grid' ON CONFLICT DO NOTHING;
-- INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
-- SELECT 'magazine', 'Magazine', description, preview_image_url, created_at FROM public.portfolio_templates WHERE id = 'editorial-mono' ON CONFLICT DO NOTHING;
-- INSERT INTO public.portfolio_templates (id, name, description, preview_image_url, created_at)
-- SELECT 'hyun-barng', 'Hyun Barng', description, preview_image_url, created_at FROM public.portfolio_templates WHERE id = 'noir-grain' ON CONFLICT DO NOTHING;
--
-- UPDATE public.portfolios SET template_id = 'architectural'  WHERE template_id = 'brutalist-dark';
-- UPDATE public.portfolios SET template_id = 'soft'           WHERE template_id = 'warm-elegance';
-- UPDATE public.portfolios SET template_id = 'minimalist-grid' WHERE template_id = 'clean-grid';
-- UPDATE public.portfolios SET template_id = 'magazine'       WHERE template_id = 'editorial-mono';
-- UPDATE public.portfolios SET template_id = 'hyun-barng'     WHERE template_id = 'noir-grain';
--
-- DELETE FROM public.portfolio_templates WHERE id IN ('brutalist-dark', 'warm-elegance', 'clean-grid', 'editorial-mono', 'noir-grain');
--
-- COMMIT;
