/**
 * Portfolio Module — Type Definitions
 *
 * Self-contained types for the portfolio feature.
 * No imports from the rest of the application.
 */

// ---------------------------------------------------------------------------
// Runtime configuration
// ---------------------------------------------------------------------------

export interface PortfolioConfig {
  /** Supabase table for portfolios (default: 'portfolios') */
  portfoliosTable: string;
  /** Supabase table for templates (default: 'portfolio_templates') */
  templatesTable: string;
  /** Supabase table for projects (default: 'portfolio_projects') */
  projectsTable: string;
  /** Supabase table for experience (default: 'portfolio_experience') */
  experienceTable: string;
  /** Supabase table for social links (default: 'portfolio_social_links') */
  socialLinksTable: string;
  /** Supabase table for user lookups (default: 'users') */
  usersTable: string;
  /** Cloudinary upload folder (default: 'GDG_Portfolio') */
  uploadFolder: string;
  /** Cloudinary image transforms for profile photos */
  profileImageTransform: {
    width: number;
    height: number;
    crop: string;
    gravity: string;
  };
}

// ---------------------------------------------------------------------------
// Template registry
// ---------------------------------------------------------------------------

export interface TemplateDefinition {
  /** URL slug used in routes and DB (e.g. 'brutalist-dark') */
  id: string;
  /** Human-readable name shown in UI (e.g. 'Brutalist Dark') */
  displayName: string;
  /** Short description of the design aesthetic */
  description: string;
  /** Route group folder under app/(portfolio)/ */
  routeFolder: string;
  /** Legacy source folder under portfolios/ (for metadata.json lookup) */
  legacyFolder: string;
  /** Preview thumbnail path */
  previewImage: string;
}

// ---------------------------------------------------------------------------
// Domain models — what the DB returns after joins
// ---------------------------------------------------------------------------

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string | null;
  preview_image_url: string | null;
  folder_name?: string;
  created_at: string;
}

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

export interface PortfolioSocialLink {
  id: string;
  portfolio_id: string;
  platform: string;
  url: string;
  display_order?: number;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Input DTOs — what callers pass into the service
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Predefined skill/platform options
// ---------------------------------------------------------------------------

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

export const SKILL_OPTIONS = [
  ...LANGUAGE_OPTIONS,
  ...FRAMEWORK_OPTIONS,
  ...TOOL_OPTIONS,
] as const;

export const SOCIAL_PLATFORMS = [
  { value: "github", label: "GitHub", icon: "github" },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { value: "twitter", label: "X", icon: "x" },
  { value: "instagram", label: "Instagram", icon: "instagram" },
  { value: "facebook", label: "Facebook", icon: "facebook" },
  { value: "youtube", label: "YouTube", icon: "youtube" },
  { value: "email", label: "Email", icon: "mail" },
] as const;
