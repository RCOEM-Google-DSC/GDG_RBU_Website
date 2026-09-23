-- Portfolio Template Rename Migration
-- Renames template IDs from vague slugs to descriptive design-based names.
--
-- Run this AFTER deploying the new code (which supports both old and new IDs
-- via resolveTemplateId()).

-- Step 1: Update portfolio_templates table (id column)
-- Must update child references first due to FK constraint.

BEGIN;

-- Update portfolios.template_id references first
UPDATE public.portfolios SET template_id = 'brutalist-dark'  WHERE template_id = 'architectural';
UPDATE public.portfolios SET template_id = 'warm-elegance'   WHERE template_id = 'soft';
UPDATE public.portfolios SET template_id = 'clean-grid'      WHERE template_id = 'minimalist-grid';
UPDATE public.portfolios SET template_id = 'editorial-mono'  WHERE template_id = 'magazine';
UPDATE public.portfolios SET template_id = 'noir-grain'      WHERE template_id = 'hyun-barng';

-- Update portfolio_templates.id (primary key)
UPDATE public.portfolio_templates SET id = 'brutalist-dark',  name = 'Brutalist Dark'  WHERE id = 'architectural';
UPDATE public.portfolio_templates SET id = 'warm-elegance',   name = 'Warm Elegance'   WHERE id = 'soft';
UPDATE public.portfolio_templates SET id = 'clean-grid',      name = 'Clean Grid'      WHERE id = 'minimalist-grid';
UPDATE public.portfolio_templates SET id = 'editorial-mono',  name = 'Editorial Mono'  WHERE id = 'magazine';
UPDATE public.portfolio_templates SET id = 'noir-grain',      name = 'Noir Grain'      WHERE id = 'hyun-barng';

COMMIT;



-- ROLLBACK SCRIPT                                         
--
-- BEGIN;
--
-- UPDATE public.portfolios SET template_id = 'architectural'  WHERE template_id = 'brutalist-dark';
-- UPDATE public.portfolios SET template_id = 'soft'           WHERE template_id = 'warm-elegance';
-- UPDATE public.portfolios SET template_id = 'minimalist-grid' WHERE template_id = 'clean-grid';
-- UPDATE public.portfolios SET template_id = 'magazine'       WHERE template_id = 'editorial-mono';
-- UPDATE public.portfolios SET template_id = 'hyun-barng'     WHERE template_id = 'noir-grain';
--
-- UPDATE public.portfolio_templates SET id = 'architectural',  name = 'Architectural'   WHERE id = 'brutalist-dark';
-- UPDATE public.portfolio_templates SET id = 'soft',           name = 'Soft'            WHERE id = 'warm-elegance';
-- UPDATE public.portfolio_templates SET id = 'minimalist-grid', name = 'Minimalist Grid' WHERE id = 'clean-grid';
-- UPDATE public.portfolio_templates SET id = 'magazine',       name = 'Magazine'        WHERE id = 'editorial-mono';
-- UPDATE public.portfolio_templates SET id = 'hyun-barng',     name = 'Hyun Barng'      WHERE id = 'noir-grain';
--
-- COMMIT;
