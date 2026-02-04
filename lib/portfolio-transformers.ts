/**
 * Shared data transformers for portfolio templates.
 * These convert the flat form data into the specific structures required by each template.
 */

export function transformToArchitectural(data: any) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "YOUR NAME",
      role: "Full Stack Engineer",
      about: portfolio?.about_me || "",
      email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" }
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || ""
    })),
    skills: [
      { category: "Technical Skills", skills: portfolio?.skills || [] }
    ],
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
      icon: s.platform.toLowerCase()
    }))
  };
}

export function transformToSoft(data: any) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Your Name",
      role: "Full Stack Engineer",
      about: portfolio?.about_me || "",
      profileImage: portfolio?.profile_image_url || "",
      email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index + 10}/800/600`,
      links: { github: p.github_url || "", live: p.live_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || "",
    })),
    skills: portfolio?.skills || [],
    socials: (social_links || []).map((s: any) => ({ platform: s.platform, url: s.url })),
  };
}

export function transformToMagazine(data: any) {
    const { portfolio, projects, experience, social_links } = data;
    return {
      personalInfo: {
        name: portfolio?.display_name || "Developer",
        role: "Full Stack Engineer",
        about: portfolio?.about_me || "",
        email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
        phone: "",
        profileImage: portfolio?.profile_image_url || null,
      },
      projects: (projects || []).map((p: any, index: number) => ({
        id: p.id || String(index),
        title: p.title || "Project Title",
        description: p.description || "",
        imageUrl: p.image_url || `https://picsum.photos/seed/${index + 20}/800/600`,
        links: { live: p.live_url || "", github: p.github_url || "" },
      })),
      experience: (experience || []).map((e: any, index: number) => ({
        id: e.id || String(index),
        role: e.role || "Role",
        company: e.company || "Company",
        period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
        description: e.description || "",
      })),
      skills: [{ category: "Skills", skills: portfolio?.skills || [] }],
      socials: (social_links || []).map((s: any) => ({
        platform: s.platform,
        url: s.url,
        icon: s.platform.toLowerCase(),
      })),
    };
}

export function transformToMinimalistGrid(data: any) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Developer",
      role: "Full Stack Engineer",
      about: portfolio?.about_me || "",
      email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
      phone: "",
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Project",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index + 30}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || "",
    })),
    skills: [{ category: "Skills", skills: portfolio?.skills || [] }],
    socials: (social_links || []).map((s: any) => ({
      platform: s.platform,
      url: s.url,
      icon: s.platform.toLowerCase(),
    })),
  };
}

export function transformToHyunBarng(data: any) {
  const { portfolio, projects, experience, social_links } = data;
  return {
    personalInfo: {
      name: portfolio?.display_name || "Developer",
      role: "Full Stack Developer",
      about: portfolio?.about_me || "",
      email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
      phone: "",
      profileImage: portfolio?.profile_image_url || undefined,
    },
    projects: (projects || []).map((p: any, index: number) => ({
      id: p.id || String(index),
      title: p.title || "Work",
      subtitle: "Selected Work",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index + 40}/800/600`,
      links: { live: p.live_url || "", github: p.github_url || "" },
    })),
    experience: (experience || []).map((e: any, index: number) => ({
      id: e.id || String(index),
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || "",
      isLatest: index === 0 && e.is_current,
    })),
    skills: [{ category: "Skills", skills: portfolio?.skills || [], icon: "code" }],
    socials: (social_links || []).map((s: any) => ({ platform: s.platform, url: s.url })),
  };
}
