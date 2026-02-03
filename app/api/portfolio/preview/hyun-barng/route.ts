import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface HyunBarngTemplateData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    skillsSummary: string;
  };
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    links: {
      github?: string;
      live?: string;
    };
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { portfolio, projects, experience, social_links } = data;

    // Read the hyun-barng template HTML
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "hyun-barng",
      "code.html",
    );

    let templateHtml: string;
    try {
      templateHtml = await fs.readFile(templatePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "Hyun Barng template not found" },
        { status: 404 },
      );
    }

    // Transform data for hyun-barng template
    const names = (portfolio?.display_name || "Your Name").split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";
    const skillsSummary =
      (portfolio?.skills || []).slice(0, 3).join(" | ") || "Developer";

    const templateData: HyunBarngTemplateData = {
      personalInfo: {
        name: portfolio?.display_name || "Your Name",
        firstName,
        lastName,
        email:
          social_links
            ?.find((s: any) => s.platform === "email")
            ?.url?.replace("mailto:", "") || "",
        about: portfolio?.about_me || "",
        skillsSummary,
      },
      skills: portfolio?.skills || [],
      projects: (projects || []).map((p: any, index: number) => ({
        title: p.title || "Untitled Project",
        description: p.description || "",
        imageUrl:
          p.image_url || `https://picsum.photos/seed/${index + 10}/800/600`,
        tags: p.technologies || [],
        links: {
          github: p.github_url || "",
          live: p.live_url || "",
        },
      })),
      experience: (experience || []).map((e: any) => ({
        role: e.role || "Role",
        company: e.company || "Company",
        period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
        description: e.description || "",
      })),
      socials: (social_links || []).map((s: any) => ({
        platform: s.platform,
        url: s.url,
      })),
    };

    const injectionScript = `
<script>
  const portfolioData = ${JSON.stringify(templateData)};

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectData);
  } else {
    injectData();
  }

  function injectData() {
    const { personalInfo, projects, experience, skills, socials } = portfolioData;
    console.log("Injecting data for Hyun Barng template", portfolioData);
    
    try {
      // Helper function to get social link URL
      function getSocialUrl(platform) {
        const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
        return link ? link.url : '';
      }
      
      // 1. HEADER / HERO
      // Nav Name
      const navName = document.querySelector('nav a.font-display');
      if (navName && personalInfo.name) {
        navName.textContent = personalInfo.name.toUpperCase().replace(' ', '_') + '_';
      }
      
      // Hero title
      const heroTitle = document.querySelector('h1.font-display.text-5xl, h1.text-6xl');
      if (heroTitle && personalInfo.firstName) {
        if (personalInfo.lastName) {
          heroTitle.innerHTML = \`\${personalInfo.firstName}<br /><span class="text-neutral-500">\${personalInfo.lastName}</span>\`;
        } else {
          heroTitle.textContent = personalInfo.firstName;
        }
      }
      
      // Hero subtitle
      const heroSub = document.querySelector('p.font-light.text-neutral-400');
      if (heroSub && personalInfo.skillsSummary) {
        heroSub.textContent = personalInfo.skillsSummary.toUpperCase();
      }
      
      // Hero social buttons
      const heroButtons = document.querySelectorAll('header .flex.justify-center.gap-6 a');
      heroButtons.forEach(btn => {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('github')) {
          const url = getSocialUrl('github');
          if (url) btn.href = url;
          else btn.style.display = 'none';
        }
        if (text.includes('linkedin')) {
          const url = getSocialUrl('linkedin');
          if (url) btn.href = url;
          else btn.style.display = 'none';
        }
      });
      
      // 2. ABOUT SECTION
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutTitle = aboutSection.querySelector('h2');
        if (aboutTitle && personalInfo.firstName) {
          aboutTitle.textContent = \`About \${personalInfo.firstName}\`;
        }
        
        const aboutText = aboutSection.querySelector('p.text-lg, p.text-xl');
        if (aboutText && personalInfo.about) {
          aboutText.textContent = '"' + personalInfo.about + '"';
        }
        
        // Location/Role
        const locationEl = aboutSection.querySelector('.text-xs.font-bold');
        if (locationEl) {
          locationEl.textContent = 'Full Stack Developer';
        }
      }
      
      // 3. SKILLS SECTION
      const skillsSection = document.getElementById('skills');
      if (skillsSection && skills.length > 0) {
        const skillGroups = skillsSection.querySelectorAll('.group');
        
        if (skillGroups.length >= 3) {
          const skillsPerGroup = Math.ceil(skills.length / 3);
          
          skillGroups.forEach((group, idx) => {
            const container = group.querySelector('.flex.flex-wrap');
            const title = group.querySelector('h3');
            
            if (container) {
              const startIdx = idx * skillsPerGroup;
              const endIdx = Math.min(startIdx + skillsPerGroup, skills.length);
              const groupSkills = skills.slice(startIdx, endIdx);
              
              if (groupSkills.length > 0) {
                container.innerHTML = groupSkills.map(skill => 
                  \`<span class="px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400">\${skill}</span>\`
                ).join('');
                
                // Update title
                if (title) {
                  const titles = ['Core Skills', 'Technologies', 'Tools'];
                  title.textContent = titles[idx] || 'Skills';
                }
              } else {
                group.style.display = 'none';
              }
            }
          });
        }
      } else if (skills.length === 0 && skillsSection) {
        skillsSection.style.display = 'none';
      }
      
      // 4. PROJECTS SECTION
      const projectsSection = document.getElementById('projects');
      if (projectsSection && projects.length > 0) {
        const projectsContainer = projectsSection.querySelector('.space-y-16');
        
        if (projectsContainer) {
          const articles = projectsContainer.querySelectorAll('article');
          
          if (articles.length > 0) {
            const templateArticle = articles[0].outerHTML;
            projectsContainer.innerHTML = '';
            
            projects.forEach((project) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateArticle;
              const article = temp.firstElementChild;
              
              // Image
              const img = article.querySelector('img');
              if (img) {
                img.src = project.imageUrl;
                img.alt = project.title;
              }
              
              // Title
              const title = article.querySelector('h3');
              if (title) title.textContent = project.title;
              
              // Tags subtitle
              const subtitle = article.querySelector('p.text-neutral-400.text-xs');
              if (subtitle && project.tags.length > 0) {
                subtitle.textContent = project.tags.slice(0, 3).join(' & ');
              }
              
              // Description
              const desc = article.querySelector('p.text-neutral-300.text-sm');
              if (desc) desc.textContent = project.description || '';
              
              // Link
              const link = article.querySelector('a.inline-flex');
              if (link) {
                if (project.links.live) {
                  link.href = project.links.live;
                  const linkText = link.querySelector('span');
                  if (linkText) linkText.textContent = 'View Project';
                } else if (project.links.github) {
                  link.href = project.links.github;
                  const linkText = link.querySelector('span');
                  if (linkText) linkText.textContent = 'View GitHub';
                } else {
                  link.style.display = 'none';
                }
              }
              
              projectsContainer.appendChild(article);
            });
          }
        }
      } else if (projects.length === 0 && projectsSection) {
        projectsSection.style.display = 'none';
      }
      
      // 5. EXPERIENCE SECTION
      const experienceSection = document.getElementById('experience');
      if (experienceSection && experience.length > 0) {
        const expTimeline = experienceSection.querySelector('.space-y-12');
        
        if (expTimeline) {
          const expItems = expTimeline.querySelectorAll('.relative.pl-8');
          
          if (expItems.length > 0) {
            const templateItem = expItems[0].outerHTML;
            expTimeline.innerHTML = '';
            
            experience.forEach((exp, idx) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateItem;
              const item = temp.firstElementChild;
              
              // Role
              const role = item.querySelector('h3');
              if (role) role.textContent = exp.role;
              
              // Period
              const period = item.querySelector('span.text-xs.font-mono');
              if (period) period.textContent = exp.period;
              
              // Company
              const company = item.querySelector('.text-sm.font-bold');
              if (company) company.textContent = exp.company;
              
              // Description
              const desc = item.querySelector('p.text-neutral-600, p.text-sm');
              if (desc) desc.textContent = exp.description || '';
              
              // Timeline dot styling (first is highlighted)
              const dot = item.querySelector('.absolute.-left-\\\\[5px\\\\]');
              if (dot) {
                if (idx === 0) {
                  dot.className = dot.className.replace('bg-neutral-400', 'bg-primary');
                  dot.className = dot.className.replace('bg-neutral-600', 'bg-primary');
                }
              }
              
              expTimeline.appendChild(item);
            });
          }
        }
      } else if (experience.length === 0 && experienceSection) {
        experienceSection.style.display = 'none';
      }
      
      // 6. FOOTER
      const footer = document.querySelector('footer');
      if (footer) {
        // Update contact email
        const contactBtn = footer.querySelector('a[href^="mailto:"]');
        if (contactBtn && personalInfo.email) {
          contactBtn.href = \`mailto:\${personalInfo.email}\`;
        }
        
        // Update copyright
        const copyright = footer.querySelector('.mb-4.md\\\\:mb-0, .text-xs');
        if (copyright && personalInfo.name) {
          copyright.textContent = \`© \${new Date().getFullYear()} \${personalInfo.name}.\`;
        }
        
        // Update social links
        const footerLinks = footer.querySelectorAll('.flex.space-x-6 a');
        const platforms = ['twitter', 'instagram', 'dribbble'];
        footerLinks.forEach((link, idx) => {
          if (idx < platforms.length) {
            const url = getSocialUrl(platforms[idx]);
            if (url) {
              link.href = url;
            } else {
              link.style.display = 'none';
            }
          }
        });
      }
    } catch (e) {
      console.error("Data injection error:", e);
    }
  }
</script>`;

    // Insert the script before the closing </body> tag
    const modifiedHtml = templateHtml.replace(
      /<\/body>/i,
      `${injectionScript}\n</body>`,
    );

    return new NextResponse(modifiedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Hyun Barng template preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate hyun barng template preview" },
      { status: 500 },
    );
  }
}
