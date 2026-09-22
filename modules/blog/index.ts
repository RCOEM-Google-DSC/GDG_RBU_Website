/**
 * Blog Module — Public API
 *
 * Import everything from here:
 * ```ts
 * import { BlogService, createBlogApiClient } from '@/modules/blog';
 * import type { BlogPost, BlogConfig } from '@/modules/blog';
 * ```
 */

// Service (server-side)
export { BlogService } from "./blog.service";

// Client helper (browser-side)
export { createBlogApiClient } from "./blog.client";

// Config
export { getBlogConfig } from "./blog.config";

// Validation schemas
export {
  createBlogSchema,
  updateBlogSchema,
  commentSchema,
} from "./blog.validation";

// Types (re-export everything)
export type {
  BlogConfig,
  BlogPost,
  BlogSummary,
  BlogComment,
  BlogWriter,
  CommentUser,
  BlogCardData,
  BlogAuthorData,
  CreateBlogInput,
  UpdateBlogInput,
  CreateCommentInput,
} from "./blog.types";
