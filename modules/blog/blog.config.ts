import type { BlogConfig } from "./blog.types";

const DEFAULTS: BlogConfig = {
  tableName: process.env.NEXT_PUBLIC_BLOGS_TABLE || "blogs",
  commentsTable: process.env.NEXT_PUBLIC_BLOG_COMMENTS_TABLE || "comments_blogs",
  likesTable: process.env.NEXT_PUBLIC_BLOG_LIKES_TABLE || "blog_likes",
  usersTable: process.env.NEXT_PUBLIC_USERS_TABLE || "users",
  imageFolder: process.env.NEXT_PUBLIC_BLOG_IMAGE_FOLDER || "GDG_BLOG_COVERS",
  allowedRoles: process.env.NEXT_PUBLIC_BLOG_ALLOWED_ROLES 
    ? process.env.NEXT_PUBLIC_BLOG_ALLOWED_ROLES.split(",") 
    : ["admin", "member"],
  maxCommentLength: Number(process.env.NEXT_PUBLIC_BLOG_MAX_COMMENT_LENGTH) || 2000,
  previewLength: Number(process.env.NEXT_PUBLIC_BLOG_PREVIEW_LENGTH) || 150,
};

export function getBlogConfig(
  overrides?: Partial<BlogConfig>,
): BlogConfig {
  return { ...DEFAULTS, ...overrides };
}
