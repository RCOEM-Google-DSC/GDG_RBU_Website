/**
 * Portfolio Module — Data Transformers
 *
 * Convert flat DB data into template-specific structures.
 * Each template may expect slightly different shapes.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawPortfolioData = any;

function extractEmail(social_links: any[]): string {
  return (
    social_links
      ?.find((s: any) => s.platform === "email")
      ?.url?.replace("mailto:", "") || ""
  );
}

function buildSkillGroups(portfolio: any) {
  return [
    { category: "Languages", skills: portfolio?.languages || [] },
    { category: "Frameworks", skills: portfolio?.frameworks || [] },
    { category: "Tools", skills: portfolio?.tools || [] },
  ].filter((group) => group.skills.length > 0);
}

function formatPeriod(e: any): string {
  return `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`;
}

/** Brutalist Dark (formerly "architectural") */
export function transformToBrutalistDark(data: RawPortfolioData) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "YOUR NAME",
      about: portfolio?.about_me || "",
      email: extractEmail(social_links),
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: formatPeriod(e),
      description: e.description || "",
    })),
    skills: buildSkillGroups(portfolio),
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
      icon: s.platform.toLowerCase(),
    })),
  };
}

/** Warm Elegance (formerly "soft") */
export function transformToWarmElegance(data: RawPortfolioData) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Your Name",
      about: portfolio?.about_me || "",
      profileImage: portfolio?.profile_image_url || "",
      email: extractEmail(social_links),
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl:
        p.image_url || `https://picsum.photos/seed/${index + 10}/800/600`,
      links: { github: p.github_url || "", live: p.live_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: formatPeriod(e),
      description: e.description || "",
    })),
    skills: buildSkillGroups(portfolio),
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
    })),
  };
}

/** Editorial Mono (formerly "magazine") */
export function transformToEditorialMono(data: RawPortfolioData) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Developer",
      about: portfolio?.about_me || "",
      email: extractEmail(social_links),
      phone: "",
      profileImage: portfolio?.profile_image_url || null,
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Project Title",
      description: p.description || "",
      imageUrl:
        p.image_url || `https://picsum.photos/seed/${index + 20}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: formatPeriod(e),
      description: e.description || "",
    })),
    skills: buildSkillGroups(portfolio),
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
      icon: s.platform.toLowerCase(),
    })),
  };
}

/** Clean Grid (formerly "minimalist-grid") */
export function transformToCleanGrid(data: RawPortfolioData) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Developer",
      about: portfolio?.about_me || "",
      email: extractEmail(social_links),
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Project",
      description: p.description || "",
      imageUrl:
        p.image_url || `https://picsum.photos/seed/${index + 30}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: formatPeriod(e),
      description: e.description || "",
    })),
    skills: buildSkillGroups(portfolio),
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
      icon: s.platform.toLowerCase(),
    })),
  };
}

/** Noir Grain (formerly "hyun-barng") */
export function transformToNoirGrain(data: RawPortfolioData) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Developer",
      about: portfolio?.about_me || "",
      email: extractEmail(social_links),
      phone: "",
      profileImage: portfolio?.profile_image_url || undefined,
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Work",
      subtitle: "Selected Work",
      description: p.description || "",
      imageUrl:
        p.image_url || `https://picsum.photos/seed/${index + 40}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: formatPeriod(e),
      description: e.description || "",
      isLatest: index === 0 && e.is_current,
    })),
    skills: [
      {
        category: "Languages",
        skills: portfolio?.languages || [],
        icon: "code",
      },
      {
        category: "Frameworks",
        skills: portfolio?.frameworks || [],
        icon: "layers",
      },
      {
        category: "Tools",
        skills: portfolio?.tools || [],
        icon: "wrench",
      },
    ].filter((group) => group.skills.length > 0),
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Legacy aliases — keep old function names working during migration
// ---------------------------------------------------------------------------

/** @deprecated Use transformToBrutalistDark */
export const transformToArchitectural = transformToBrutalistDark;
/** @deprecated Use transformToWarmElegance */
export const transformToSoft = transformToWarmElegance;
/** @deprecated Use transformToEditorialMono */
export const transformToMagazine = transformToEditorialMono;
/** @deprecated Use transformToCleanGrid */
export const transformToMinimalistGrid = transformToCleanGrid;
/** @deprecated Use transformToNoirGrain */
export const transformToHyunBarng = transformToNoirGrain;
