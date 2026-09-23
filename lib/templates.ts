/**
 * @deprecated — Import from '@/modules/portfolio' instead.
 * This file is kept as a backward-compat shim.
 */
export {
  TEMPLATE_IDS,
  TEMPLATE_FOLDER_MAP,
  LEGACY_ID_MAP,
  resolveTemplateId,
} from "@/modules/portfolio";
export type { TemplateId } from "@/modules/portfolio";

// Legacy maps re-exported under old names
import { LEGACY_FOLDER_TO_ID, NEW_TO_LEGACY_ID } from "@/modules/portfolio";

/** @deprecated Map folder names to template slugs — use LEGACY_FOLDER_TO_ID */
export const SLUG_TO_FOLDER_MAP = NEW_TO_LEGACY_ID;

export { LEGACY_FOLDER_TO_ID };
