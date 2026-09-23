import { createClient as createServerClient } from "@/supabase/server";
import { getPortfolioConfig, TEMPLATE_REGISTRY, LEGACY_FOLDER_TO_ID, resolveTemplateId } from "./portfolio.config";
import type {
  PortfolioConfig,
  Portfolio,
  PortfolioProject,
  PortfolioExperience,
  PortfolioSocialLink,
  PortfolioTemplate,
} from "./portfolio.types";
import fs from "fs";
import path from "path";

/**
 * Portfolio Service — single source of truth for all portfolio data operations.
 *
 * Usage:
 * ```ts
 * const service = new PortfolioService();
 * const portfolio = await service.getByUser(userId);
 * ```
 */
export class PortfolioService {
  private readonly config: PortfolioConfig;

  constructor(overrides?: Partial<PortfolioConfig>) {
    this.config = getPortfolioConfig(overrides);
  }

  private async serverClient() {
    return createServerClient();
  }

  // ── Ownership helper ─────────────────────────────────────────────────

  private async verifyOwnership(
    supabase: Awaited<ReturnType<typeof createServerClient>>,
    portfolioId: string,
    userId: string,
  ) {
    const { data, error } = await supabase
      .from(this.config.portfoliosTable)
      .select("id")
      .eq("id", portfolioId)
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Portfolio not found or unauthorized");
    }
    return data;
  }

  private async verifyChildOwnership(
    supabase: Awaited<ReturnType<typeof createServerClient>>,
    table: string,
    childId: string,
    userId: string,
  ) {
    const parentTable = this.config.portfoliosTable;
    const { data, error } = await supabase
      .from(table)
      .select(`portfolio_id, ${parentTable}!inner(user_id)`)
      .eq("id", childId)
      .eq(`${parentTable}.user_id`, userId)
      .maybeSingle();

    if (error || !data) {
      throw new Error("Resource not found or unauthorized");
    }
    return data;
  }

  // ── Portfolio CRUD ───────────────────────────────────────────────────

  private portfolioSelect() {
    const { templatesTable, projectsTable, experienceTable, socialLinksTable } = this.config;
    return `
      *,
      template:${templatesTable}(*),
      projects:${projectsTable}(*),
      experience:${experienceTable}(*),
      social_links:${socialLinksTable}(*)
    `;
  }

  /** Fetch current user's portfolio (authenticated). */
  async get(userId: string, portfolioId?: string): Promise<Portfolio | null> {
    const supabase = await this.serverClient();
    const { portfoliosTable } = this.config;

    let query = supabase
      .from(portfoliosTable)
      .select(this.portfolioSelect());

    if (portfolioId) {
      query = query.eq("id", portfolioId).eq("user_id", userId);
    } else {
      query = query
        .eq("user_id", userId)
        .order("is_published", { ascending: false })
        .order("updated_at", { ascending: false })
        .limit(1);
    }

    const { data, error } = await query.maybeSingle();

    if (error && error.code !== "PGRST116") {
      throw new Error(error.message);
    }

    return data as Portfolio | null;
  }

  /** Fetch published portfolio by user ID (public, no auth). */
  async getPublished(userId: string): Promise<{ portfolio: Portfolio; user: any } | null> {
    const supabase = await this.serverClient();
    const { portfoliosTable, usersTable } = this.config;

    const { data: portfolio, error } = await supabase
      .from(portfoliosTable)
      .select(this.portfolioSelect())
      .eq("user_id", userId)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }

    const { data: user } = await supabase
      .from(usersTable)
      .select("name, email, image_url")
      .eq("id", userId)
      .single();

    return { portfolio: portfolio as unknown as Portfolio, user };
  }

  /** Create new portfolio. */
  async create(
    userId: string,
    data: {
      template_id: string;
      display_name: string;
      profile_image_url?: string | null;
      about_me?: string | null;
      languages?: string[];
      frameworks?: string[];
      tools?: string[];
      is_published?: boolean;
    },
  ): Promise<Portfolio> {
    const supabase = await this.serverClient();
    const { portfoliosTable } = this.config;

    // If publishing, unpublish others first
    if (data.is_published) {
      await supabase
        .from(portfoliosTable)
        .update({ is_published: false })
        .eq("user_id", userId);
    }

    const { data: portfolio, error } = await supabase
      .from(portfoliosTable)
      .insert({
        user_id: userId,
        template_id: data.template_id,
        display_name: data.display_name,
        profile_image_url: data.profile_image_url || null,
        about_me: data.about_me || null,
        languages: data.languages || [],
        frameworks: data.frameworks || [],
        tools: data.tools || [],
        is_published: data.is_published || false,
      })
      .select()
      .single();

    if (error) {
      console.error("PortfolioService.create:", error);
      throw new Error(error.message);
    }

    return portfolio as Portfolio;
  }

  /** Update existing portfolio. */
  async update(
    userId: string,
    portfolioId: string,
    data: Partial<Portfolio>,
  ): Promise<Portfolio> {
    const supabase = await this.serverClient();
    const { portfoliosTable } = this.config;

    // Strip relation/immutable fields
    const {
      id: _id,
      user_id: _uid,
      created_at: _ca,
      template,
      projects,
      experience,
      social_links,
      ...updateData
    } = data;

    // If publishing, unpublish others first
    if (updateData.is_published) {
      await supabase
        .from(portfoliosTable)
        .update({ is_published: false })
        .eq("user_id", userId)
        .neq("id", portfolioId);
    }

    const { data: portfolio, error } = await supabase
      .from(portfoliosTable)
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", portfolioId)
      .eq("user_id", userId)
      .select(this.portfolioSelect())
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return portfolio as unknown as Portfolio;
  }

  /** Delete user's portfolio (cascades to children). */
  async delete(userId: string): Promise<void> {
    const supabase = await this.serverClient();
    const { portfoliosTable } = this.config;

    const { error } = await supabase
      .from(portfoliosTable)
      .delete()
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }
  }

  // ── Projects ─────────────────────────────────────────────────────────

  /** Get all projects for a portfolio (authenticated). */
  async getProjects(userId: string, portfolioId: string): Promise<PortfolioProject[]> {
    const supabase = await this.serverClient();
    const { projectsTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    const { data, error } = await supabase
      .from(projectsTable)
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("display_order", { ascending: true });

    if (error) throw new Error(error.message);
    return data as PortfolioProject[];
  }

  /** Add project to portfolio. */
  async addProject(
    userId: string,
    portfolioId: string,
    data: {
      title: string;
      description?: string | null;
      image_url?: string | null;
      github_url?: string | null;
      live_url?: string | null;
      technologies?: string[];
      display_order?: number;
    },
  ): Promise<PortfolioProject> {
    const supabase = await this.serverClient();
    const { projectsTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    // Get max display_order
    const { data: maxOrder } = await supabase
      .from(projectsTable)
      .select("display_order")
      .eq("portfolio_id", portfolioId)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: project, error } = await supabase
      .from(projectsTable)
      .insert({
        portfolio_id: portfolioId,
        title: data.title,
        description: data.description || null,
        image_url: data.image_url || null,
        github_url: data.github_url || null,
        live_url: data.live_url || null,
        technologies: data.technologies || [],
        display_order: data.display_order ?? (maxOrder?.display_order ?? 0) + 1,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return project as PortfolioProject;
  }

  /** Update a project. */
  async updateProject(userId: string, projectId: string, data: Record<string, unknown>): Promise<PortfolioProject> {
    const supabase = await this.serverClient();
    const { projectsTable } = this.config;

    await this.verifyChildOwnership(supabase, projectsTable, projectId, userId);

    const updateData = { ...data };
    delete updateData.id;
    delete updateData.portfolio_id;

    const { data: project, error } = await supabase
      .from(projectsTable)
      .update(updateData)
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return project as PortfolioProject;
  }

  /** Delete a project. */
  async deleteProject(userId: string, projectId: string): Promise<void> {
    const supabase = await this.serverClient();
    const { projectsTable } = this.config;

    await this.verifyChildOwnership(supabase, projectsTable, projectId, userId);

    const { error } = await supabase
      .from(projectsTable)
      .delete()
      .eq("id", projectId);

    if (error) throw new Error(error.message);
  }

  // ── Experience ───────────────────────────────────────────────────────

  /** Get all experience entries for a portfolio. */
  async getExperience(userId: string, portfolioId: string): Promise<PortfolioExperience[]> {
    const supabase = await this.serverClient();
    const { experienceTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    const { data, error } = await supabase
      .from(experienceTable)
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("display_order", { ascending: true });

    if (error) throw new Error(error.message);
    return data as PortfolioExperience[];
  }

  /** Add experience entry. */
  async addExperience(
    userId: string,
    portfolioId: string,
    data: {
      company: string;
      role: string;
      description?: string | null;
      start_date: string;
      end_date?: string | null;
      is_current?: boolean;
      display_order?: number;
    },
  ): Promise<PortfolioExperience> {
    const supabase = await this.serverClient();
    const { experienceTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    const { data: maxOrder } = await supabase
      .from(experienceTable)
      .select("display_order")
      .eq("portfolio_id", portfolioId)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: experience, error } = await supabase
      .from(experienceTable)
      .insert({
        portfolio_id: portfolioId,
        company: data.company,
        role: data.role,
        description: data.description || null,
        start_date: data.start_date,
        end_date: data.is_current ? null : data.end_date || null,
        is_current: data.is_current || false,
        display_order: data.display_order ?? (maxOrder?.display_order ?? 0) + 1,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return experience as PortfolioExperience;
  }

  /** Update experience entry. */
  async updateExperience(userId: string, experienceId: string, data: Record<string, unknown>): Promise<PortfolioExperience> {
    const supabase = await this.serverClient();
    const { experienceTable } = this.config;

    await this.verifyChildOwnership(supabase, experienceTable, experienceId, userId);

    const updateData: Record<string, unknown> = { ...data };
    if (updateData.is_current === true) {
      updateData.end_date = null;
    }

    const { data: experience, error } = await supabase
      .from(experienceTable)
      .update(updateData)
      .eq("id", experienceId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return experience as PortfolioExperience;
  }

  /** Delete experience entry. */
  async deleteExperience(userId: string, experienceId: string): Promise<void> {
    const supabase = await this.serverClient();
    const { experienceTable } = this.config;

    await this.verifyChildOwnership(supabase, experienceTable, experienceId, userId);

    const { error } = await supabase
      .from(experienceTable)
      .delete()
      .eq("id", experienceId);

    if (error) throw new Error(error.message);
  }

  // ── Social Links ─────────────────────────────────────────────────────

  /** Get all social links for a portfolio. */
  async getSocialLinks(userId: string, portfolioId: string): Promise<PortfolioSocialLink[]> {
    const supabase = await this.serverClient();
    const { socialLinksTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    const { data, error } = await supabase
      .from(socialLinksTable)
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data as PortfolioSocialLink[];
  }

  /** Add social link. */
  async addSocialLink(
    userId: string,
    portfolioId: string,
    data: { platform: string; url: string },
  ): Promise<PortfolioSocialLink> {
    const supabase = await this.serverClient();
    const { socialLinksTable } = this.config;

    await this.verifyOwnership(supabase, portfolioId, userId);

    // Check uniqueness
    const { data: existing } = await supabase
      .from(socialLinksTable)
      .select("id")
      .eq("portfolio_id", portfolioId)
      .eq("platform", data.platform)
      .maybeSingle();

    if (existing) {
      throw new Error(`Social link for ${data.platform} already exists. Use PUT to update.`);
    }

    const { data: link, error } = await supabase
      .from(socialLinksTable)
      .insert({
        portfolio_id: portfolioId,
        platform: data.platform,
        url: data.url,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return link as PortfolioSocialLink;
  }

  /** Update social link. */
  async updateSocialLink(
    userId: string,
    linkId: string,
    data: Record<string, unknown>,
  ): Promise<PortfolioSocialLink> {
    const supabase = await this.serverClient();
    const { socialLinksTable } = this.config;

    const ownership = await this.verifyChildOwnership(supabase, socialLinksTable, linkId, userId);

    const updateData = { ...data };
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.portfolio_id;
    delete updateData.display_order;

    // Check platform uniqueness if platform is changing
    if (updateData.platform) {
      const { data: existing } = await supabase
        .from(socialLinksTable)
        .select("id")
        .eq("portfolio_id", (ownership as any).portfolio_id)
        .eq("platform", updateData.platform as string)
        .neq("id", linkId)
        .maybeSingle();

      if (existing) {
        throw new Error(`A link for ${updateData.platform} already exists.`);
      }
    }

    const { data: link, error } = await supabase
      .from(socialLinksTable)
      .update(updateData)
      .eq("id", linkId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return link as PortfolioSocialLink;
  }

  /** Delete social link. */
  async deleteSocialLink(userId: string, linkId: string): Promise<void> {
    const supabase = await this.serverClient();
    const { socialLinksTable } = this.config;

    await this.verifyChildOwnership(supabase, socialLinksTable, linkId, userId);

    const { error } = await supabase
      .from(socialLinksTable)
      .delete()
      .eq("id", linkId);

    if (error) throw new Error(error.message);
  }

  // ── Templates ────────────────────────────────────────────────────────

  /** Get all available templates (merged from registry + filesystem metadata). */
  async getTemplates(): Promise<PortfolioTemplate[]> {
    const templates: PortfolioTemplate[] = [];

    for (const def of TEMPLATE_REGISTRY) {
      const portfoliosDir = path.join(process.cwd(), "portfolios");
      const templateDir = path.join(portfoliosDir, def.legacyFolder);
      const metadataPath = path.join(templateDir, "metadata.json");

      let description = def.description;

      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
          description = metadata.description || description;
        } catch {
          // use default description
        }
      }

      templates.push({
        id: def.id,
        name: def.displayName,
        description,
        preview_image_url: def.previewImage,
        folder_name: def.legacyFolder,
        created_at: new Date().toISOString(),
      });
    }

    return templates;
  }

  /** Get single template by ID. */
  async getTemplate(templateId: string): Promise<PortfolioTemplate | null> {
    const resolved = resolveTemplateId(templateId);
    const def = TEMPLATE_REGISTRY.find((t) => t.id === resolved);
    if (!def) return null;

    const portfoliosDir = path.join(process.cwd(), "portfolios");
    const templateDir = path.join(portfoliosDir, def.legacyFolder);

    let description = def.description;

    if (fs.existsSync(path.join(templateDir, "metadata.json"))) {
      try {
        const metadata = JSON.parse(
          fs.readFileSync(path.join(templateDir, "metadata.json"), "utf-8"),
        );
        description = metadata.description || description;
      } catch {
        // use default
      }
    }

    return {
      id: def.id,
      name: def.displayName,
      description,
      preview_image_url: def.previewImage,
      folder_name: def.legacyFolder,
      created_at: new Date().toISOString(),
    };
  }

  /** Upload profile image via Cloudinary. Returns URLs. */
  async uploadImage(
    userId: string,
    file: File,
  ): Promise<{ url: string; secure_url: string; transformed_url: string | null; public_id: string }> {
    // Dynamic import to avoid bundling cloudinary on client
    const { v2: cloudinary } = await import("cloudinary");

    const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
    const apiKey = process.env["CLOUDINARY_API_KEY"];
    const apiSecret = process.env["CLOUDINARY_API_SECRET"];

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary env vars missing");
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const { uploadFolder, profileImageTransform } = this.config;
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: uploadFolder,
            public_id: `profile_${userId}`,
            resource_type: "auto",
            overwrite: true,
            eager: [
              {
                ...profileImageTransform,
                fetch_format: "auto",
                quality: "auto",
              },
            ],
            eager_async: false,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const transformedUrl = uploadResult?.eager?.[0]?.secure_url ?? null;

    return {
      url: transformedUrl ?? uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      transformed_url: transformedUrl,
      public_id: uploadResult.public_id,
    };
  }
}
