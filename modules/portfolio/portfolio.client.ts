import type {
  Portfolio,
  PortfolioProject,
  PortfolioExperience,
  PortfolioSocialLink,
  PortfolioTemplate,
  PortfolioFormData,
  ProjectFormData,
  ExperienceFormData,
  SocialLinkFormData,
} from "./portfolio.types";


export function createPortfolioApiClient(basePath = "/api/portfolio") {
  async function request<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.error || `Request failed (${res.status})`);
    }

    return body as T;
  }

  return {
    // ── Portfolio ────────────────────────────────────────────────────

    /** GET /api/portfolio — current user's portfolio */
    get(portfolioId?: string) {
      const url = portfolioId
        ? `${basePath}?id=${portfolioId}`
        : basePath;
      return request<{ portfolio: Portfolio | null }>(url);
    },

    /** GET /api/portfolio/:userId — public portfolio */
    getPublished(userId: string) {
      return request<{ portfolio: Portfolio; user: any }>(
        `${basePath}/${userId}`,
      );
    },

    /** POST /api/portfolio — create */
    create(data: PortfolioFormData & { is_published?: boolean }) {
      return request<{ portfolio: Portfolio }>(`${basePath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },

    /** PUT /api/portfolio — update */
    update(data: Partial<Portfolio> & { id: string }) {
      return request<{ portfolio: Portfolio }>(`${basePath}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },

    /** DELETE /api/portfolio — delete */
    remove() {
      return request<{ success: true }>(`${basePath}`, {
        method: "DELETE",
      });
    },

    // ── Projects ────────────────────────────────────────────────────

    /** GET /api/portfolio/projects?portfolioId=... */
    getProjects(portfolioId: string) {
      return request<{ projects: PortfolioProject[] }>(
        `${basePath}/projects?portfolioId=${portfolioId}`,
      );
    },

    /** POST /api/portfolio/projects */
    addProject(data: ProjectFormData & { portfolio_id: string }) {
      return request<{ project: PortfolioProject }>(
        `${basePath}/projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** PUT /api/portfolio/projects/:id */
    updateProject(id: string, data: Partial<ProjectFormData>) {
      return request<{ project: PortfolioProject }>(
        `${basePath}/projects/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** DELETE /api/portfolio/projects/:id */
    deleteProject(id: string) {
      return request<{ success: true }>(`${basePath}/projects/${id}`, {
        method: "DELETE",
      });
    },

    // ── Experience ──────────────────────────────────────────────────

    /** GET /api/portfolio/experience?portfolioId=... */
    getExperience(portfolioId: string) {
      return request<{ experience: PortfolioExperience[] }>(
        `${basePath}/experience?portfolioId=${portfolioId}`,
      );
    },

    /** POST /api/portfolio/experience */
    addExperience(data: ExperienceFormData & { portfolio_id: string }) {
      return request<{ experience: PortfolioExperience }>(
        `${basePath}/experience`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** PUT /api/portfolio/experience/:id */
    updateExperience(id: string, data: Partial<ExperienceFormData>) {
      return request<{ experience: PortfolioExperience }>(
        `${basePath}/experience/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** DELETE /api/portfolio/experience/:id */
    deleteExperience(id: string) {
      return request<{ success: true }>(
        `${basePath}/experience/${id}`,
        { method: "DELETE" },
      );
    },

    // ── Social Links ────────────────────────────────────────────────

    /** GET /api/portfolio/social-links?portfolioId=... */
    getSocialLinks(portfolioId: string) {
      return request<{ social_links: PortfolioSocialLink[] }>(
        `${basePath}/social-links?portfolioId=${portfolioId}`,
      );
    },

    /** POST /api/portfolio/social-links */
    addSocialLink(data: SocialLinkFormData & { portfolio_id: string }) {
      return request<{ social_link: PortfolioSocialLink }>(
        `${basePath}/social-links`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** PUT /api/portfolio/social-links/:id */
    updateSocialLink(id: string, data: Partial<SocialLinkFormData>) {
      return request<{ social_link: PortfolioSocialLink }>(
        `${basePath}/social-links/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    },

    /** DELETE /api/portfolio/social-links/:id */
    deleteSocialLink(id: string) {
      return request<{ success: true }>(
        `${basePath}/social-links/${id}`,
        { method: "DELETE" },
      );
    },

    // ── Templates ───────────────────────────────────────────────────

    /** GET /api/portfolio/templates */
    getTemplates() {
      return request<PortfolioTemplate[]>(`${basePath}/templates`);
    },

    /** GET /api/portfolio/templates/:templateId */
    getTemplate(templateId: string) {
      return request<PortfolioTemplate>(
        `${basePath}/templates/${templateId}`,
      );
    },

    // ── Upload ──────────────────────────────────────────────────────

    /** POST /api/portfolio/upload — upload profile image */
    uploadImage(file: File) {
      const formData = new FormData();
      formData.append("file", file);

      return request<{
        url: string;
        secure_url: string;
        transformed_url: string | null;
        public_id: string;
      }>(`${basePath}/upload`, {
        method: "POST",
        body: formData,
      });
    },
  };
}
