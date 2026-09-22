/**
 * Blog Module — Type Definitions
 *
 * Self-contained types for the blog feature.
 * No imports from the rest of the application.
 */

// ---------------------------------------------------------------------------
// Runtime configuration
// ---------------------------------------------------------------------------

export interface BlogConfig {
  /** Supabase table name for blog posts (default: 'blogs') */
  tableName: string;
  /** Supabase table name for comments (default: 'comments_blogs') */
  commentsTable: string;
  /** Supabase table name for likes (default: 'blog_likes') */
  likesTable: string;
  /** Supabase table name for users (default: 'users') */
  usersTable: string;
  /** Cloudinary / upload folder (default: 'GDG_BLOG_COVERS') */
  imageFolder: string;
  /** Roles allowed to create / edit blogs (default: ['admin', 'member']) */
  allowedRoles: string[];
  /** Max comment character length (default: 2000) */
  maxCommentLength: number;
  /** Markdown preview truncation length (default: 150) */
  previewLength: number;
}

// ---------------------------------------------------------------------------
// Domain models — what the DB returns after joins
// ---------------------------------------------------------------------------

export interface BlogWriter {
  name: string;
  image_url: string;
}

export interface CommentUser {
  name: string;
  image_url: string;
}

export interface BlogComment {
  id: string;
  comment: string;
  created_at: string;
  user: CommentUser;
}

export interface BlogPost {
  id: string;
  title: string;
  image_url: string;
  published_at: string;
  markdown: string;
  writer?: BlogWriter;
  comments?: BlogComment[];
}

/** Slim shape returned by "my blogs" (no joins) */
export interface BlogSummary {
  id: string;
  title: string;
  image_url: string | null;
  markdown: string;
  published_at: string;
}

// ---------------------------------------------------------------------------
// Input DTOs — what callers pass into the service
// ---------------------------------------------------------------------------

export interface CreateBlogInput {
  writerEmail: string;
  title: string;
  markdown: string;
  imageUrl?: string | null;
  publishedAt?: string;
}

export interface UpdateBlogInput {
  title: string;
  markdown: string;
  imageUrl?: string | null;
}

export interface CreateCommentInput {
  blogId: string;
  userId: string;
  comment: string;
}

// ---------------------------------------------------------------------------
// UI-facing prop types (re-usable by frontend components)
// ---------------------------------------------------------------------------

export interface BlogCardData {
  id: string;
  title: string;
  imageUrl: string;
  publishedAt: string;
  writerName: string;
  writerImage: string;
  markdownPreview: string;
}

export interface BlogAuthorData {
  name: string;
  imageUrl: string;
  bio?: string;
  publishedCount?: number;
}
