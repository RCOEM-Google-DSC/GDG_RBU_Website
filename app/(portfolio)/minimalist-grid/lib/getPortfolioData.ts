import { createClient } from "@/supabase/server";

export interface MinimalistPortfolioData {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    email: string;
    phone: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    links: {
      live?: string;
      github?: string;
    };
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  skills: Array<{
    category: string;
    skills: string[];
  }>;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export async function getPortfolioData(
  userId: string,
): Promise<MinimalistPortfolioData | null> {
  try {
    const supabase = await createClient();

    const { data: portfolio, error } = await supabase
      .from("portfolios")
      .select(
        `
        *,
        projects:portfolio_projects(*),
        experience:portfolio_experience(*),
        social_links:portfolio_social_links(*)
      `,
      )
      .eq("user_id", userId)
      .eq("is_published", true)
      .single();

    if (error || !portfolio) {
      console.log("No portfolio found for user:", userId);
      return null;
    }

    const { data: user } = await supabase
      .from("users")
      .select("email, phone_number")
      .eq("id", userId)
      .single();

    const transformedData: MinimalistPortfolioData = {
      personalInfo: {
        name: portfolio.display_name || "Developer",
        role: "Full Stack Engineer",
        about: portfolio.about_me || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
      },
      projects: (portfolio.projects || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description || "",
        imageUrl: p.image_url || "https://picsum.photos/800/600?random=" + p.id,
        links: {
          live: p.live_url || undefined,
          github: p.github_url || undefined,
        },
      })),
      experience: (portfolio.experience || []).map((e: any) => {
        const startYear = e.start_date
          ? new Date(e.start_date).getFullYear().toString()
          : "";
        const endYear = e.is_current
          ? "Present"
          : e.end_date
            ? new Date(e.end_date).getFullYear().toString()
            : "";

        return {
          id: e.id,
          role: e.role,
          company: e.company || "",
          period:
            startYear && endYear
              ? `${startYear} - ${endYear}`
              : startYear || endYear || "",
          description: e.description || "",
        };
      }),
      skills: [
        { category: "Languages", skills: portfolio.languages || [] },
        { category: "Frameworks", skills: portfolio.frameworks || [] },
        { category: "Tools", skills: portfolio.tools || [] },
      ].filter((group) => group.skills.length > 0),
      socials: (portfolio.social_links || []).map((s: any) => ({
        platform: s.platform,
        url: s.url,
        icon: s.platform.toLowerCase(),
      })),
    };

    return transformedData;
  } catch (error) {
    console.error("Error in getPortfolioData:", error);
    return null;
  }
}
