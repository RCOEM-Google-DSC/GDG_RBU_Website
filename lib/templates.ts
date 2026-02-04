export const TEMPLATE_IDS = [
  "architectural",
  "soft",
  "minimalist-grid",
  "magazine",
  "hyun-barng",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

// Map folder names in /portfolios/ to template slugs
export const TEMPLATE_FOLDER_MAP: Record<string, TemplateId> = {
  "architectural-portfolio": "architectural",
  "hyun": "hyun-barng",
  "magzine-portfolio final": "magazine",
  "minimalist-grid-portfolio final": "minimalist-grid",
  "soft-portfolio final": "soft",
};

// Map template IDs back to their source folders (for reference)
export const SLUG_TO_FOLDER_MAP: Record<TemplateId, string> = {
  architectural: "architectural-portfolio",
  "hyun-barng": "hyun",
  magazine: "magzine-portfolio final",
  "minimalist-grid": "minimalist-grid-portfolio final",
  soft: "soft-portfolio final",
};
