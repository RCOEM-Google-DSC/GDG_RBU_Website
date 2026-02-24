import { ReactNode } from "react";

// Blogs
export interface Blog {
  id: string;
  title: string;
  image_url: string;
  published_at: string;
  markdown: string;
  writer: {
    name: string;
    image_url: string;
  };
  comments?: Comment[];
}

export interface BlogAuthorProps {
  name: string;
  imageUrl: string;
  bio?: string;
  publishedCount?: number;
}

export interface BlogCardProps {
  id: string;
  title: string;
  imageUrl: string;
  publishedAt: string;
  writerName: string;
  writerImage: string;
  markdownPreview: string;
}

// comments
export interface Comment {
  id: string;
  comment: string;
  created_at: string;
  user: {
    name: string;
    image_url: string;
  };
}

// Feedback
export interface Feedback {
  id: string;
  event_id: string;
  user_id: string | null;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
  user?: {
    name: string;
    image_url: string;
  };
}

export interface FeedbackFormData {
  subject: string;
  message: string;
}

export function isProfileComplete(user: {
  name?: string | null;
  email?: string | null;
  section?: string | null;
  branch?: string | null;
  phone_number?: string | null;
}) {
  return Boolean(
    user?.name &&
    user?.email &&
    user?.section &&
    user?.branch &&
    user?.phone_number,
  );
}

// ---------- Event ----------
export type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  image_url: string;
  date: string;
  time?: string;
  event_time?: string;
  is_paid?: boolean;
  fee?: number | null;
  qr_code?: string | null;
  max_participants?: number | null;
  is_team_event?: boolean;
  max_team_size?: number | null;
  category?: string;
  status?: string;
  organizer_id?: string | null;
  partner_id?: string | null;
  partners?: Partner | null;
  min_team_size?: number | null;
  whatsapp_url?: string | null;
  badge_url?: string | null;
};

// ---------- Partner ----------
export type Partner = {
  id: string;
  name: string;
  website: string;
  logo_url: string;
  description: string;
  image_url: string;
};

// ---------- Registration ----------
export interface RegistrationProps {
  id: string;
  event_id: string;
  user_id: string;
  check_in_time: string | null;
  created_at: string;
  status: string;

  team_name?: string;
  team_members?: Array<string>;
  is_team_registration?: boolean;
  wants_random_team?: boolean;
  is_open_to_alliances?: boolean;
}

// ---------- Event Card ----------
export interface PastEventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: Array<string>;
  tagColor?: string;
  website_url?: string;
}
export interface UpcomingEventCardProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  image: string;
  tags?: Array<string>;
  tagColor?: string;
  registerUrl?: string;
}

// ---------- PROFILE TYPES ----------

export type ProfileLinks = {
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

export type SupabaseUserRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  section: string | null;
  branch: string | null;
  image_url: string | null;
  profile_links: ProfileLinks | null;
  badges: string[] | null;
  my_events: string[] | null; // uuid[]
  role: string;
  created_at: string;
  updated_at: string;
};

export type UIUser = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  section: string;
  branch: string;
  avatarUrl: string;
  stats: {
    events: number;
    badges: number;
  };
  profileLinks: ProfileLinks;
  my_events: string[] | null;
};

// ---------- EVENT TYPES ----------

export type EventRow = {
  id: string;
  title: string;
  event_time: string | null;
  image_url: string | null;
  badge_url: string | null;
};

export type UIEvent = {
  id: string;
  title: string;
  date: string;
  image: string;
  tag: string;
  tagColor: string;
  certificate_url?: string | null;
  certificate_generated_once: boolean;
  registration_status: string;
  badge_url?: string | null; // User's generated badge
  has_badge_template: boolean; // Event has a badge template
};

// ---------- BADGE TYPES ----------

export type UIBadge = {
  id: number | string;
  name: string;
  icon: ReactNode;
  color: string;
};

// ---------- REGISTRATION TYPES ----------

export type Registration = {
  id: string;
  event_id: string;
  status: string;
  check_in_time: string | null;
  created_at: string;
  team_name?: string | null;
  certificate_url?: string | null;
  certificate_generated_once: boolean;
  badge_url?: string | null;

  users: {
    id: string;
    name: string;
    email: string;
    image_url?: string | null;
    section: string;
    branch: string;
    phone_number?: string | null;
    role?: string | null;
    profile_links?: any;
    badges?: string[] | null;
    created_at?: string;
  }[];
};

export function isEventProfileComplete(user: {
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  section?: string | null;
  branch?: string | null;
}) {
  return Boolean(
    user?.name &&
    user?.email &&
    user?.phone_number &&
    user?.section &&
    user?.branch,
  );
}

// ---------- PORTFOLIO TYPES ----------

// Portfolio Templates
export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string | null;
  preview_image_url: string | null;
  folder_name?: string; // Maps to filesystem folder
  created_at: string;
}

// Portfolio
export interface Portfolio {
  id: string;
  user_id: string;
  template_id: string;
  display_name: string;
  profile_image_url: string | null;
  about_me: string | null;
  languages: string[];
  frameworks: string[];
  tools: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;

  // Relations (populated on fetch)
  template?: PortfolioTemplate;
  projects?: PortfolioProject[];
  experience?: PortfolioExperience[];
  social_links?: PortfolioSocialLink[];
}

// Portfolio Project
export interface PortfolioProject {
  id: string;
  portfolio_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  display_order: number;
  created_at: string;
}

// Portfolio Experience
export interface PortfolioExperience {
  id: string;
  portfolio_id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  display_order: number;
  created_at: string;
}

// Portfolio Social Link
export interface PortfolioSocialLink {
  id: string;
  portfolio_id: string;
  platform: string;
  url: string;
  display_order: number;
  created_at: string;
}

// Form Data Types
export interface PortfolioFormData {
  template_id: string;
  display_name: string;
  profile_image_url?: string;
  about_me?: string;
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface ProjectFormData {
  title: string;
  description?: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
  display_order?: number;
}

export interface ExperienceFormData {
  company: string;
  role: string;
  description?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  display_order?: number;
}

export interface SocialLinkFormData {
  platform: string;
  url: string;
  display_order?: number;
}

// Predefined skills list for dropdown - categorized
export const LANGUAGE_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Dart",
  "SQL",
  "HTML",
  "CSS",
  "R",
  "MATLAB",
  "Scala",
  "Perl",
  "Julia",
  "Haskell",
  "Elixir",
  "Zig",
  "Solidity",
  "Assembly",
] as const;

export const FRAMEWORK_OPTIONS = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Svelte",
  "SolidJS",
  "Remix",
  "Astro",
  "Nuxt",
  "Node.js",
  "Express",
  "NestJS",
  "Hono",
  "Django",
  "Flask",
  "FastAPI",
  "Spring Boot",
  "Laravel",
  "Ruby on Rails",
  "Phoenix",
  "Gin",
  "Fiber",
  "Actix",
  "Rocket",
  "Flutter",
  "React Native",
  "SwiftUI",
  "Jetpack Compose",
  "Tailwind CSS",
  "SASS",
  "Bootstrap",
  "TanStack Query",
  "Zustand",
  "Redux",
  "Prisma",
  "Drizzle",
  "Mongoose",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "OpenCV",
] as const;

export const TOOL_OPTIONS = [
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "AWS",
  "Google Cloud",
  "Azure",
  "Vercel",
  "Netlify",
  "Supabase",
  "Firebase",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Cassandra",
  "Apache Kafka",
  "RabbitMQ",
  "Elasticsearch",
  "Prometheus",
  "Grafana",
  "Linux",
  "Nginx",
  "Caddy",
  "REST API",
  "GraphQL",
  "gRPC",
  "WebSocket",
  "Postman",
  "Figma",
  "Playwright",
  "Cypress",
  "OpenAI",
  "LangChain",
  "Hugging Face",
  "Pinecone",
] as const;

// Legacy combined array for backward compatibility
export const SKILL_OPTIONS = [
  ...LANGUAGE_OPTIONS,
  ...FRAMEWORK_OPTIONS,
  ...TOOL_OPTIONS,
] as const;

// Platform options for social links
export const SOCIAL_PLATFORMS = [
  { value: "github", label: "GitHub", icon: "github" },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { value: "twitter", label: "X", icon: "x" },
  { value: "instagram", label: "Instagram", icon: "instagram" },
  { value: "facebook", label: "Facebook", icon: "facebook" },
  { value: "youtube", label: "YouTube", icon: "youtube" },
  { value: "email", label: "Email", icon: "mail" },
] as const;
