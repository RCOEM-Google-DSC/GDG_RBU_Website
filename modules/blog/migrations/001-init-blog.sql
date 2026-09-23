-- Blog Module Initialization Migration
-- Creates the necessary tables for the pluggable blog module.
-- Assumes the public.users table already exists.

BEGIN;

CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  writer_id uuid NOT NULL,
  image_url text DEFAULT 'blog.png'::text,
  title text NOT NULL,
  markdown text NOT NULL,
  published_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT blogs_pkey PRIMARY KEY (id),
  CONSTRAINT blogs_writer_id_fkey FOREIGN KEY (writer_id) REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.comments_blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL,
  user_id uuid NOT NULL,
  comment text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT comments_blogs_pkey PRIMARY KEY (id),
  CONSTRAINT comments_blogs_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(id),
  CONSTRAINT comments_blogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.blog_drafts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  writer_id uuid NOT NULL,
  title text NOT NULL,
  content_json jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_drafts_pkey PRIMARY KEY (id),
  CONSTRAINT blog_drafts_writer_id_fkey FOREIGN KEY (writer_id) REFERENCES public.users(id)
);

COMMIT;
