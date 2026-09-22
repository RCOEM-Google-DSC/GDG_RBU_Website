/**
 * Backward-compatibility re-exports.
 *
 * Existing consumers (sitemap.ts, blog detail page) import
 * `getBlogs` / `getBlog` from this file. These now delegate
 * to the central BlogService.
 */
import { BlogService } from "@/modules/blog";

const service = new BlogService();

/**
 * Server-side function to get all blogs
 * Use this in Server Components and API routes
 */
export const getBlogs = () => service.getAll();

/**
 * Server-side function to get a single blog by ID
 * Use this in Server Components and API routes
 */
export const getBlog = (id: string) => service.getById(id);
