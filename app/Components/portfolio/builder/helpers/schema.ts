import * as z from "zod";

// Validation schemas
export const portfolioSchema = z.object({
  template_id: z.string().min(1, "Please select a template"),
  display_name: z.string().min(2, "Name must be at least 2 characters"),
  profile_image_url: z.string().optional(),
  about_me: z
    .string()
    .max(2000, "About me must be less than 2000 characters")
    .optional(),
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  tools: z.array(z.string()),
  is_published: z.boolean(),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image_url: z.string().optional(),
  github_url: z.string().optional(),
  live_url: z.string().optional(),
  technologies: z.array(z.string()),
});

export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  is_current: z.boolean(),
});

export const socialLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Please enter a valid URL"),
});

export const formSchema = z.object({
  portfolio: portfolioSchema,
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  social_links: z.array(socialLinkSchema),
});

export type FormData = z.infer<typeof formSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;
