import { createClient } from "@/supabase/server";

export interface HyunPortfolioData {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  projects: Array<{
    id: string;
    title: string;
    subtitle: string;
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
    isLatest: boolean;
  }>;
  skills: Array<{
    category: string;
    skills: string[];
    icon: string;
  }>;
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

export async function getPortfolioData(
  userId: string,
  templateId?: string,
): Promise<HyunPortfolioData | null> {
  try {
    const supabase = await createClient();

    let query = supabase
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
      .eq("is_published", true);

    if (templateId) {
      query = query.eq("template_id", templateId);
    }

    const { data: portfolio, error } = await query.maybeSingle();

    if (error || !portfolio) {
      console.log("No portfolio found for user:", userId);
      return null;
    }

    const { data: user } = await supabase
      .from("users")
      .select("email, phone_number")
      .eq("id", userId)
      .single();

    const transformedData: HyunPortfolioData = {
      personalInfo: {
        name: portfolio.display_name || "Developer",
        role: "Full Stack Developer",
        about: portfolio.about_me || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
        profileImage: portfolio.profile_image_url || undefined,
      },
      projects: (portfolio.projects || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        subtitle: "Selected Work",
        description: p.description || "",
        imageUrl: p.image_url || "https://placeholder-url",
        links: {
          live: p.live_url || undefined,
          github: p.github_url || undefined,
        },
      })),
      experience: (portfolio.experience || [])
        .sort((a: any, b: any) => {
          const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
          const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
          return dateB - dateA;
        })
        .map((e: any, index: number) => {
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
            isLatest: index === 0 && e.is_current,
          };
        }),
      skills: [
        {
          category: "Languages",
          skills: portfolio.languages || [],
          icon: "code",
        },
        {
          category: "Frameworks",
          skills: portfolio.frameworks || [],
          icon: "layers",
        },
        {
          category: "Tools",
          skills: portfolio.tools || [],
          icon: "wrench",
        },
      ].filter((group) => group.skills.length > 0),
      socials: (portfolio.social_links || []).map((s: any) => ({
        platform: s.platform,
        url: s.url,
      })),
    };

    return transformedData;
  } catch (error) {
    console.error("Error in getPortfolioData:", error);
    return null;
  }
}
