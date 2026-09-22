import type {
  BlogPost,
  BlogSummary,
  BlogComment,
  CreateBlogInput,
  UpdateBlogInput,
} from "./blog.types";

/**
 * Client-side API helper for the blog module.
 *
 * Wraps `fetch('/api/blogs/...')` calls that are currently
 * duplicated across BlogsPage, CreateBlogPage, and BlogComments.
 *
 * ```ts
 * const blog = createBlogApiClient();
 * const { blogs } = await blog.list();
 * ```
 */
export function createBlogApiClient(basePath = "/api/blogs") {
  async function request<T>(
    url: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(url, init);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.error || `Request failed (${res.status})`);
    }

    return body as T;
  }

  return {
    /** GET /api/blogs */
    list() {
      return request<{ blogs: BlogPost[] }>(basePath);
    },

    /** GET /api/blogs/:id */
    get(id: string) {
      return request<{ blog: BlogPost }>(`${basePath}/${id}`);
    },

    /** POST /api/blogs/create */
    create(data: CreateBlogInput) {
      return request<{ success: true; blog: BlogPost }>(
        `${basePath}/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** PATCH /api/blogs/:id */
    update(id: string, data: UpdateBlogInput) {
      return request<{ success: true; blog: BlogPost }>(
        `${basePath}/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** GET /api/blogs/mine */
    mine() {
      return request<{ blogs: BlogSummary[] }>(`${basePath}/mine`);
    },

    /** POST /api/blogs/:blogId/comments */
    addComment(blogId: string, comment: string) {
      return request<{ comment: BlogComment }>(
        `${basePath}/${blogId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment }),
        },
      );
    },
  };
}
