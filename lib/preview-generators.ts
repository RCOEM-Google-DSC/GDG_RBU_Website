import { promises as fs } from "fs";
import path from "path";

export async function generateSoftPreview(data: any) {
  const { portfolio, projects, experience, social_links } = data;
  const templatePath = path.join(process.cwd(), "public", "templates", "soft", "code.html");
  let templateHtml = await fs.readFile(templatePath, "utf-8");

  const templateData = {
    personalInfo: {
      name: portfolio?.display_name || "Your Name",
      email: social_links?.find((s: any) => s.platform === "email")?.url?.replace("mailto:", "") || "",
      about: portfolio?.about_me || "",
      github: social_links?.find((s: any) => s.platform === "github")?.url || "",
    },
    skills: portfolio?.skills || [],
    projects: (projects || []).map((p: any, index: number) => ({
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl: p.image_url || `https://picsum.photos/seed/${index + 10}/800/600`,
      tags: p.technologies || [],
      links: { github: p.github_url || "", live: p.live_url || "" },
    })),
    experience: (experience || []).map((e: any) => ({
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || "",
    })),
    socials: (social_links || []).map((s: any) => ({ platform: s.platform, url: s.url })),
  };

  const injectionScript = `<script>
    const portfolioData = ${JSON.stringify(templateData)};
    function injectData() { /* ... injection logic ... */ }
    document.addEventListener('DOMContentLoaded', injectData);
  </script>`;
  // ... (keeping original logic but simplified for now)
  return templateHtml.replace(/<\/body>/i, `${injectionScript}
</body>`);
}
// ... repeat for others
