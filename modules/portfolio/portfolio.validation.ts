import { z } from "zod";

/**
 * Portfolio Module — Input Validation Schemas (Zod)
 */

export const createPortfolioSchema = z.object({
  template_id: z
    .string()
    .min(1, "Template selection is required"),
  display_name: z
    .string()
    .min(1, "Display name is required")
    .transform((s) => s.trim()),
  profile_image_url: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
  about_me: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  is_published: z.boolean().default(false),
});

export const updatePortfolioSchema = createPortfolioSchema.partial().extend({
  id: z.string().uuid("Valid portfolio ID required"),
});

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .transform((s) => s.trim()),
  description: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
  image_url: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
  github_url: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
  live_url: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
  technologies: z.array(z.string()).default([]),
  display_order: z.number().int().nonnegative().optional(),
});

export const experienceSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .transform((s) => s.trim()),
  role: z
    .string()
    .min(1, "Role is required")
    .transform((s) => s.trim()),
  description: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().nullish(),
  is_current: z.boolean().default(false),
  display_order: z.number().int().nonnegative().optional(),
});

export const socialLinkSchema = z.object({
  platform: z
    .string()
    .min(1, "Platform is required"),
  url: z
    .string()
    .min(1, "URL is required")
    .transform((s) => s.trim()),
  display_order: z.number().int().nonnegative().optional(),
});

/** Convenience type aliases inferred from schemas */
export type CreatePortfolioPayload = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioPayload = z.infer<typeof updatePortfolioSchema>;
export type ProjectPayload = z.infer<typeof projectSchema>;
export type ExperiencePayload = z.infer<typeof experienceSchema>;
export type SocialLinkPayload = z.infer<typeof socialLinkSchema>;
