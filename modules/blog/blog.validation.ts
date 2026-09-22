import { z } from "zod";

/**
 * Blog Module — Input Validation Schemas (Zod)
 *
 * Replaces the hand-rolled `if (!title?.trim())` checks that were
 * copy-pasted across multiple API route files.
 */

export const createBlogSchema = z.object({
  writerEmail: z
    .string()
    .email("Valid email required"),
  title: z
    .string()
    .min(1, "Title is required")
    .transform((s) => s.trim()),
  markdown: z
    .string()
    .min(1, "Content is required")
    .transform((s) => s.trim()),
  imageUrl: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
  publishedAt: z
    .string()
    .datetime()
    .optional(),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .transform((s) => s.trim()),
  markdown: z
    .string()
    .min(1, "Content is required")
    .transform((s) => s.trim()),
  imageUrl: z
    .string()
    .url()
    .nullish()
    .transform((v) => v || null),
});

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment text is required")
    .max(2000, "Comment too long")
    .transform((s) => s.trim()),
});

/** Convenience type aliases inferred from schemas */
export type CreateBlogPayload = z.infer<typeof createBlogSchema>;
export type UpdateBlogPayload = z.infer<typeof updateBlogSchema>;
export type CommentPayload = z.infer<typeof commentSchema>;
