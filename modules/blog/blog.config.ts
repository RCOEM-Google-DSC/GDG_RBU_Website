import type { BlogConfig } from "./blog.types";

/**
 * Default blog configuration.
 *
 * Override per-deployment by passing a partial config
 * to `getBlogConfig()` or `new BlogService(config)`.
 */
const DEFAULTS: BlogConfig = {
  tableName: "blogs",
  commentsTable: "comments_blogs",
  likesTable: "blog_likes",
  usersTable: "users",
  imageFolder: "GDG_BLOG_COVERS",
  allowedRoles: ["admin", "member"],
  maxCommentLength: 2000,
  previewLength: 150,
};

/**
 * Merge caller overrides with defaults.
 *
 * ```ts
 * const cfg = getBlogConfig({ allowedRoles: ['editor', 'admin'] });
 * ```
 */
export function getBlogConfig(
  overrides?: Partial<BlogConfig>,
): BlogConfig {
  return { ...DEFAULTS, ...overrides };
}
