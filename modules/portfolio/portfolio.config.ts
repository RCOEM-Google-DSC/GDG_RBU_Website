import type { PortfolioConfig, TemplateDefinition } from "./portfolio.types";

const DEFAULTS: PortfolioConfig = {
  portfoliosTable: process.env.NEXT_PUBLIC_PORTFOLIO_TABLE || "portfolios",
  templatesTable: process.env.NEXT_PUBLIC_PORTFOLIO_TEMPLATES_TABLE || "portfolio_templates",
  projectsTable: process.env.NEXT_PUBLIC_PORTFOLIO_PROJECTS_TABLE || "portfolio_projects",
  experienceTable: process.env.NEXT_PUBLIC_PORTFOLIO_EXPERIENCE_TABLE || "portfolio_experience",
  socialLinksTable: process.env.NEXT_PUBLIC_PORTFOLIO_SOCIAL_LINKS_TABLE || "portfolio_social_links",
  usersTable: process.env.NEXT_PUBLIC_USERS_TABLE || "users",
  uploadFolder: process.env.NEXT_PUBLIC_PORTFOLIO_UPLOAD_FOLDER || "GDG_Portfolio",
  profileImageTransform: {
    width: 400,
    height: 400,
    crop: "fill",
    gravity: "face",
  },
};

export function getPortfolioConfig(
  overrides?: Partial<PortfolioConfig>,
): PortfolioConfig {
  return { ...DEFAULTS, ...overrides };
}

// ---------------------------------------------------------------------------
// Template registry — single source of truth for all template metadata
// ---------------------------------------------------------------------------

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  {
    id: "brutalist-dark",
    displayName: "Brutalist Dark",
    description: "Dark-mode portfolio with bold typography, red accents, and brutalist design aesthetic",
    routeFolder: "architectural",
    legacyFolder: "architectural-portfolio",
    previewImage: "/templates/brutalist-dark/thumbnail.png",
  },
  {
    id: "warm-elegance",
    displayName: "Warm Elegance",
    description: "Sophisticated portfolio with Playfair Display serif, warm earthy tones, and smooth animations",
    routeFolder: "soft",
    legacyFolder: "soft-portfolio final",
    previewImage: "/templates/warm-elegance/thumbnail.png",
  },
  {
    id: "clean-grid",
    displayName: "Clean Grid",
    description: "High-contrast minimalist portfolio with 12-column grid, Oswald headings, and structured layout",
    routeFolder: "minimalist-grid",
    legacyFolder: "minimalist-grid-portfolio final",
    previewImage: "/templates/clean-grid/thumbnail.png",
  },
  {
    id: "editorial-mono",
    displayName: "Editorial Mono",
    description: "Magazine-spread layout with Space Grotesk, vertical text, and monochrome brutalist aesthetic",
    routeFolder: "magazine",
    legacyFolder: "magzine-portfolio final",
    previewImage: "/templates/editorial-mono/thumbnail.png",
  },
  {
    id: "noir-grain",
    displayName: "Noir Grain",
    description: "Ultra-dark cinematic portfolio with Archivo Black, grain texture overlay, and high-contrast accents",
    routeFolder: "hyun-barng",
    legacyFolder: "hyun",
    previewImage: "/templates/noir-grain/thumbnail.png",
  },
];

/** All valid template IDs */
export const TEMPLATE_IDS = TEMPLATE_REGISTRY.map((t) => t.id);

export type TemplateId = (typeof TEMPLATE_REGISTRY)[number]["id"];

/** Map new template ID → route folder name */
export const TEMPLATE_ROUTE_MAP: Record<string, string> = Object.fromEntries(
  TEMPLATE_REGISTRY.map((t) => [t.id, t.routeFolder]),
);

/** Map new template ID → legacy source folder */
export const TEMPLATE_FOLDER_MAP: Record<string, string> = Object.fromEntries(
  TEMPLATE_REGISTRY.map((t) => [t.id, t.legacyFolder]),
);

/** Map legacy source folder → new template ID */
export const LEGACY_FOLDER_TO_ID: Record<string, string> = Object.fromEntries(
  TEMPLATE_REGISTRY.map((t) => [t.legacyFolder, t.id]),
);

/** Map old template slugs → new IDs (for backward compat / migration) */
export const LEGACY_ID_MAP: Record<string, string> = {
  architectural: "brutalist-dark",
  soft: "warm-elegance",
  "minimalist-grid": "clean-grid",
  magazine: "editorial-mono",
  "hyun-barng": "noir-grain",
};

/** Reverse map: new ID → old slug */
export const NEW_TO_LEGACY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(LEGACY_ID_MAP).map(([old, newId]) => [newId, old]),
);

/** Resolve a template ID, accepting both old and new slugs */
export function resolveTemplateId(id: string): string {
  return LEGACY_ID_MAP[id] || id;
}
