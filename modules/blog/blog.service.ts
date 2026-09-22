import { createClient as createServerClient } from "@/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { getBlogConfig } from "./blog.config";
import type {
  BlogConfig,
  BlogPost,
  BlogSummary,
  BlogComment,
  CreateBlogInput,
  UpdateBlogInput,
} from "./blog.types";

/**
 * Blog Service — single source of truth for all blog data operations.
 *
 * Usage:
 * ```ts
 * const service = new BlogService();                   // defaults
 * const service = new BlogService({ allowedRoles: ['editor'] }); // override
 * ```
 *
 * Uses:
 * - Server (cookie-based) client for public reads
 * - Service-role admin client for privileged writes
 */
export class BlogService {
  private readonly config: BlogConfig;

  constructor(overrides?: Partial<BlogConfig>) {
    this.config = getBlogConfig(overrides);
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  /** Server-side client with user context (cookies). */
  private async serverClient() {
    return createServerClient();
  }

  /** Service-role client — bypasses RLS. */
  private adminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      );
    }

    return createClient(url, key);
  }

  // ── Reads ────────────────────────────────────────────────────────────

  /** Fetch all published blogs with writer info. */
  async getAll(): Promise<BlogPost[]> {
    const supabase = await this.serverClient();
    const { tableName } = this.config;

    const { data, error } = await supabase
      .from(tableName)
      .select(
        `
        id,
        title,
        image_url,
        published_at,
        markdown,
        writer:writer_id (
          name,
          image_url
        )
      `,
      )
      .order("published_at", { ascending: false });

    if (error) {
      console.error("BlogService.getAll:", error.message, error.code, error.details);
      throw new Error(error.message || "Failed to fetch blogs");
    }

    return data as unknown as BlogPost[];
  }

  /** Fetch single blog by ID, including comments. */
  async getById(id: string): Promise<BlogPost> {
    const supabase = await this.serverClient();
    const { tableName, commentsTable } = this.config;

    const { data, error } = await supabase
      .from(tableName)
      .select(
        `
        *,
        writer:writer_id (
          name,
          image_url
        ),
        comments:${commentsTable} (
          id,
          comment,
          created_at,
          user:user_id (
            name,
            image_url
          )
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("BlogService.getById:", error.message, error.code, error.details);
      throw new Error(error.message || "Failed to fetch blog");
    }

    return data as unknown as BlogPost;
  }

  /** Fetch all blogs authored by a specific user (no joins). */
  async getByWriter(userId: string): Promise<BlogSummary[]> {
    const admin = this.adminClient();
    const { tableName } = this.config;

    const { data, error } = await admin
      .from(tableName)
      .select("id, title, image_url, markdown, published_at")
      .eq("writer_id", userId)
      .order("published_at", { ascending: false });

    if (error) {
      throw new Error(error.message || "Failed to fetch blogs");
    }

    return (data ?? []) as BlogSummary[];
  }

  // ── Writes ───────────────────────────────────────────────────────────

  /** Create a new blog post. */
  async create(input: CreateBlogInput): Promise<BlogPost> {
    const admin = this.adminClient();
    const { tableName, usersTable, allowedRoles } = this.config;

    // Resolve writer by email
    const { data: writer, error: writerError } = await admin
      .from(usersTable)
      .select("id, name, email, role")
      .eq("email", input.writerEmail)
      .single();

    if (writerError || !writer) {
      throw new Error(`Writer with email ${input.writerEmail} not found`);
    }

    if (!allowedRoles.includes(writer.role)) {
      throw new Error(
        `User ${input.writerEmail} does not have a permitted role (${writer.role})`,
      );
    }

    // Insert
    const { data: blog, error: blogError } = await admin
      .from(tableName)
      .insert({
        writer_id: writer.id,
        image_url: input.imageUrl || null,
        title: input.title,
        markdown: input.markdown,
        published_at: input.publishedAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (blogError) {
      console.error("BlogService.create:", blogError);
      throw new Error(blogError.message || "Failed to create blog post");
    }

    return {
      ...blog,
      writer: { name: writer.name, image_url: "" },
    } as unknown as BlogPost;
  }

  /**
   * Update an existing blog post.
   * Only the original author can update.
   */
  async update(
    id: string,
    input: UpdateBlogInput,
    userId: string,
  ): Promise<BlogPost> {
    const admin = this.adminClient();
    const { tableName } = this.config;

    // Ownership check
    const { data: existing, error: fetchErr } = await admin
      .from(tableName)
      .select("id, writer_id")
      .eq("id", id)
      .single();

    if (fetchErr || !existing) {
      throw new Error("Blog not found");
    }

    if (existing.writer_id !== userId) {
      throw new Error("You can only edit your own blogs");
    }

    const { data: updated, error: updateErr } = await admin
      .from(tableName)
      .update({
        title: input.title,
        markdown: input.markdown,
        image_url: input.imageUrl || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      throw new Error(updateErr.message || "Failed to update blog");
    }

    return updated as unknown as BlogPost;
  }

  /** Delete a blog post. Only the original author can delete. */
  async delete(id: string, userId: string): Promise<void> {
    const admin = this.adminClient();
    const { tableName, commentsTable, likesTable } = this.config;

    // Ownership check
    const { data: existing, error: fetchErr } = await admin
      .from(tableName)
      .select("id, writer_id")
      .eq("id", id)
      .single();

    if (fetchErr || !existing) {
      throw new Error("Blog not found");
    }

    if (existing.writer_id !== userId) {
      throw new Error("You can only delete your own blogs");
    }

    // Delete related rows first (comments, likes)
    await admin.from(commentsTable).delete().eq("blog_id", id);
    await admin.from(likesTable).delete().eq("blog_id", id);
    const { error } = await admin.from(tableName).delete().eq("id", id);

    if (error) {
      throw new Error(error.message || "Failed to delete blog");
    }
  }

  // ── Comments ─────────────────────────────────────────────────────────

  /** Add a comment to a blog post (requires authenticated user). */
  async addComment(
    blogId: string,
    userId: string,
    comment: string,
  ): Promise<BlogComment> {
    const supabase = await this.serverClient();
    const { commentsTable } = this.config;

    const { data, error } = await supabase
      .from(commentsTable)
      .insert({
        blog_id: blogId,
        user_id: userId,
        comment,
        created_at: new Date().toISOString(),
      })
      .select(
        `
        id,
        comment,
        created_at,
        user:user_id (
          name,
          image_url
        )
      `,
      )
      .single();

    if (error) {
      console.error("BlogService.addComment:", error.message, error.code, error.details);
      throw new Error(error.message || "Failed to add comment");
    }

    return data as unknown as BlogComment;
  }
}
