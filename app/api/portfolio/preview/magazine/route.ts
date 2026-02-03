import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface MagazineTemplateData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    tagline: string;
    location: string;
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

    // Read the magazine template HTML
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "magazine",
      "code.html",
    );

    let templateHtml: string;
    try {
      templateHtml = await fs.readFile(templatePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "Magazine template not found" },
        { status: 404 },
      );
    }

    // Transform data for magazine template
    const names = (portfolio?.display_name || "Your Name").split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    const templateData: MagazineTemplateData = {
      personalInfo: {
        name: portfolio?.display_name || "Your Name",
        firstName,
        lastName,
        email:
          social_links
            ?.find((s: any) => s.platform === "email")
            ?.url?.replace("mailto:", "") || "",
        about: portfolio?.about_me || "",
        tagline: "Developer Portfolio",
        location: "Remote",
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
        period: `${e.start_date || ""} — ${e.is_current ? "Present" : e.end_date || ""}`,
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
    console.log("Injecting data for Magazine template", portfolioData);
    
    try {
      // Helper function to get social link URL
      function getSocialUrl(platform) {
        const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
        return link ? link.url : '';
      }
      
      // 1. HEADER / HERO SECTION
      // Update main name
      const mainTitle = document.querySelector('h1.font-display.text-6xl, h1.text-5xl');
      if (mainTitle) {
        mainTitle.innerHTML = \`\${personalInfo.firstName}<br/>\${personalInfo.lastName}\`;
      }
      
      // Update subtitle/role
      const subtitle = document.querySelector('p.font-display.text-xs.font-bold');
      if (subtitle) {
        subtitle.textContent = personalInfo.tagline;
      }
      
      // Update bio/about
      const bio = document.querySelector('p.font-sans.text-sm.md\\\\:text-base.max-w-md, p.max-w-md');
      if (bio && personalInfo.about) {
        bio.textContent = personalInfo.about;
      }
      
      // Update location
      const locationEl = document.querySelector('.z-10.absolute.bottom-4, .uppercase.tracking-widest');
      if (locationEl) {
        locationEl.textContent = personalInfo.location;
      }
      
      // 2. SKILLS SECTION
      const skillsSections = document.querySelectorAll('section.grid.grid-cols-1.md\\\\:grid-cols-3');
      if (skillsSections.length > 0 && skills.length > 0) {
        const skillsSection = skillsSections[0];
        const skillColumns = skillsSection.querySelectorAll('.p-8, .p-6');
        
        if (skillColumns.length >= 3) {
          const skillsPerColumn = Math.ceil(skills.length / 3);
          
          skillColumns.forEach((col, idx) => {
            const ul = col.querySelector('ul');
            if (ul) {
              const startIdx = idx * skillsPerColumn;
              const endIdx = Math.min(startIdx + skillsPerColumn, skills.length);
              const colSkills = skills.slice(startIdx, endIdx);
              
              if (colSkills.length > 0) {
                ul.innerHTML = colSkills.map(skill => 
                  \`<li class="flex justify-between items-center group cursor-default">
                    <span>\${skill}</span>
                    <span class="opacity-0 group-hover:opacity-100 transition-opacity material-icons-outlined text-xs">code</span>
                  </li>\`
                ).join('');
              } else {
                col.style.display = 'none';
              }
            }
          });
          
          // Update column headers
          const headers = skillsSection.querySelectorAll('h3');
          if (headers.length >= 3) {
            headers[0].textContent = 'Primary Skills';
            if (skills.length <= skillsPerColumn) {
              headers[0].textContent = 'Skills';
              if (skillColumns[1]) skillColumns[1].style.display = 'none';
              if (skillColumns[2]) skillColumns[2].style.display = 'none';
            }
          }
        }
      } else if (skills.length === 0 && skillsSections.length > 0) {
        skillsSections[0].style.display = 'none';
      }
      
      // 3. PROJECTS SECTION
      const projectsSection = document.getElementById('projects');
      if (projectsSection && projects.length > 0) {
        // Featured project (first in projects section)
        const featuredContainer = projectsSection.querySelector('.col-span-12.lg\\\\:col-span-4');
        if (featuredContainer && projects[0]) {
          const p = projects[0];
          
          const title = featuredContainer.querySelector('h3');
          if (title) title.innerHTML = p.title.replace(' ', '<br/>');
          
          const desc = featuredContainer.querySelector('p.font-sans.text-sm');
          if (desc) desc.textContent = p.description || '';
          
          // Update tags
          const tagsContainer = featuredContainer.querySelector('.flex.gap-2.mb-8, .flex.gap-2');
          if (tagsContainer && p.tags.length > 0) {
            tagsContainer.innerHTML = p.tags.slice(0, 3).map(tag => 
              \`<span class="border border-border-light dark:border-border-dark px-2 py-1 text-[10px] uppercase font-bold">\${tag}</span>\`
            ).join('');
          }
          
          // Update links
          const linkBtns = featuredContainer.querySelectorAll('.grid.grid-cols-2 a, .flex.gap-2 a');
          if (linkBtns.length >= 2) {
            if (p.links.github) {
              linkBtns[0].href = p.links.github;
            } else {
              linkBtns[0].style.visibility = 'hidden';
            }
            if (p.links.live) {
              linkBtns[1].href = p.links.live;
            } else {
              linkBtns[1].style.visibility = 'hidden';
            }
          }
        }
        
        // Featured project image
        const featuredImg = projectsSection.querySelector('img[alt="Abstract interface design"], img');
        if (featuredImg && projects[0]?.imageUrl) {
          featuredImg.src = projects[0].imageUrl;
          featuredImg.alt = projects[0].title;
        }
        
        // Other projects (grid below)
        const otherProjectsSection = projectsSection.nextElementSibling;
        if (otherProjectsSection?.classList.contains('grid')) {
          const projectCards = otherProjectsSection.querySelectorAll('div.group');
          
          if (projectCards.length > 0 && projects.length > 1) {
            const templateCard = projectCards[0].outerHTML;
            otherProjectsSection.innerHTML = '';
            
            projects.slice(1).forEach((project) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateCard;
              const card = temp.firstElementChild;
              
              const img = card.querySelector('img');
              if (img) {
                img.src = project.imageUrl;
                img.alt = project.title;
              }
              
              const title = card.querySelector('h4');
              if (title) title.textContent = project.title;
              
              const desc = card.querySelector('p.font-sans.text-xs, p.text-sm');
              if (desc) desc.textContent = project.description || '';
              
              const tagsContainer = card.querySelector('.flex.gap-2');
              if (tagsContainer && project.tags.length > 0) {
                tagsContainer.innerHTML = project.tags.slice(0, 3).map(tag => 
                  \`<span class="text-[10px] font-bold uppercase text-gray-400">\${tag}</span>\`
                ).join('');
              }
              
              otherProjectsSection.appendChild(card);
            });
          } else if (projects.length <= 1) {
            otherProjectsSection.style.display = 'none';
          }
        }
      } else if (projects.length === 0) {
        if (projectsSection) projectsSection.style.display = 'none';
        const otherProjects = projectsSection?.nextElementSibling;
        if (otherProjects) otherProjects.style.display = 'none';
      }
      
      // 4. EXPERIENCE SECTION
      // Find experience section by looking for specific patterns
      const allSections = document.querySelectorAll('section');
      let expSection = null;
      
      // Try to find by ID or class patterns
      const expSectionById = document.getElementById('experience');
      if (expSectionById) {
        expSection = expSectionById.querySelector('.grid, .space-y-6');
      } else {
        // Look for section with experience-like content
        allSections.forEach(section => {
          const rows = section.querySelectorAll('.grid.grid-cols-1.lg\\\\:grid-cols-12.border-b, .border-b.py-8');
          if (rows.length > 0 && !expSection) {
            expSection = section;
          }
        });
      }
      
      if (expSection && experience.length > 0) {
        const expRows = expSection.querySelectorAll('.grid.border-b, .grid.group, .border-b.py-8');
        
        if (expRows.length > 0) {
          const templateRow = expRows[0].outerHTML;
          const container = expRows[0].parentElement;
          if (container) {
            container.innerHTML = '';
            
            experience.forEach(exp => {
              const temp = document.createElement('div');
              temp.innerHTML = templateRow;
              const row = temp.firstElementChild;
              
              // Update date
              const dateEl = row.querySelector('.col-span-12.lg\\\\:col-span-2, .text-sm.font-mono');
              if (dateEl) dateEl.textContent = exp.period;
              
              // Update role
              const roleEl = row.querySelector('h3');
              if (roleEl) roleEl.textContent = exp.role.toUpperCase();
              
              // Update company
              const companyEl = row.querySelector('.col-span-12.lg\\\\:col-span-6 span.font-sans, h4');
              if (companyEl) companyEl.textContent = exp.company;
              
              // Update description if exists
              const descEl = row.querySelector('p.text-sm');
              if (descEl && exp.description) descEl.textContent = exp.description;
              
              container.appendChild(row);
            });
          }
        }
      } else if (experience.length === 0 && expSection) {
        expSection.style.display = 'none';
      }
      
      // 5. FOOTER / CONTACT
      const footer = document.querySelector('footer');
      if (footer) {
        // Update email link
        const emailLink = footer.querySelector('a[href^="mailto:"]');
        if (emailLink && personalInfo.email) {
          emailLink.href = \`mailto:\${personalInfo.email}\`;
        }
        
        // Update copyright
        const copyright = footer.querySelector('.text-xs.text-gray-400, .text-sm');
        if (copyright && personalInfo.name) {
          copyright.textContent = \`© \${new Date().getFullYear()} \${personalInfo.name}. No cookies. No tracking.\`;
        }
        
        // Update social links
        const socialLinks = footer.querySelectorAll('.grid.grid-cols-2 a, .flex.gap-4 a');
        if (socialLinks.length >= 3) {
          const platforms = ['linkedin', 'twitter', 'instagram'];
          socialLinks.forEach((link, idx) => {
            if (idx < platforms.length) {
              const url = getSocialUrl(platforms[idx]);
              if (url) {
                link.href = url;
              } else {
                link.style.visibility = 'hidden';
              }
            }
          });
        }
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
    console.error("Magazine template preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate magazine template preview" },
      { status: 500 },
    );
  }
}
