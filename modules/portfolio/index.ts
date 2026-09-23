/**
 * Portfolio Module — Public API
 *
 * Import everything from here:
 * ```ts
 * import { PortfolioService, createPortfolioApiClient } from '@/modules/portfolio';
 * import type { Portfolio, PortfolioConfig } from '@/modules/portfolio';
 * ```
 */

// Service (server-side)

// Client helper (browser-side)
export { createPortfolioApiClient } from "./portfolio.client";

// Config
export {
  getPortfolioConfig,
  TEMPLATE_REGISTRY,
  TEMPLATE_IDS,
  TEMPLATE_ROUTE_MAP,
  TEMPLATE_FOLDER_MAP,
  LEGACY_FOLDER_TO_ID,
  LEGACY_ID_MAP,
  NEW_TO_LEGACY_ID,
  resolveTemplateId,
} from "./portfolio.config";
export type { TemplateId } from "./portfolio.config";

// Validation schemas
export {
  createPortfolioSchema,
  updatePortfolioSchema,
  projectSchema,
  experienceSchema,
  socialLinkSchema,
} from "./portfolio.validation";

// Transformers
export {
  transformToBrutalistDark,
  transformToWarmElegance,
  transformToEditorialMono,
  transformToCleanGrid,
  transformToNoirGrain,
  // Legacy aliases
  transformToArchitectural,
  transformToSoft,
  transformToMagazine,
  transformToMinimalistGrid,
  transformToHyunBarng,
} from "./portfolio.transformers";

// Types (re-export everything)
export type {
  PortfolioConfig,
  TemplateDefinition,
  PortfolioTemplate,
  Portfolio,
  PortfolioProject,
  PortfolioExperience,
  PortfolioSocialLink,
  PortfolioFormData,
  ProjectFormData,
  ExperienceFormData,
  SocialLinkFormData,
} from "./portfolio.types";

export {
  LANGUAGE_OPTIONS,
  FRAMEWORK_OPTIONS,
  TOOL_OPTIONS,
  SKILL_OPTIONS,
  SOCIAL_PLATFORMS,
} from "./portfolio.types";
