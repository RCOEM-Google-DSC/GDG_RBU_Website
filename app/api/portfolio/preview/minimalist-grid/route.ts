import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface MinimalistGridTemplateData {
  personalInfo: {
    name: string;
    email: string;
    about: string;
    subtitle: string;
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

    // Read the minimalist-grid template HTML
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "minimalist-grid",
      "code.html",
    );

    let templateHtml: string;
    try {
      templateHtml = await fs.readFile(templatePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "Minimalist Grid template not found" },
        { status: 404 },
      );
    }

    // Transform data for minimalist-grid template
    const subtitle = portfolio?.about_me?.split(".")[0] || "Developer";
    const templateData: MinimalistGridTemplateData = {
      personalInfo: {
        name: portfolio?.display_name || "Your Name",
        email:
          social_links
            ?.find((s: any) => s.platform === "email")
            ?.url?.replace("mailto:", "") || "",
        about: portfolio?.about_me || "",
        subtitle: subtitle,
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
    console.log("Injecting data for Minimalist Grid template", portfolioData);
    
    try {
      // Helper function to get social link URL
      function getSocialUrl(platform) {
        const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
        return link ? link.url : '';
      }
      
      // 1. HERO / HEADER SECTION
      const mainHeading = document.querySelector('h1.text-6xl, h1.text-5xl');
      if (mainHeading && personalInfo.name) {
        const names = personalInfo.name.split(' ');
        mainHeading.innerHTML = names.join('<br />');
      }
      
      // Update role/tagline
      const roleText = document.querySelector('p.text-xl.md\\\\:text-2xl, p.text-lg');
      if (roleText && personalInfo.subtitle) {
        roleText.innerHTML = personalInfo.subtitle + '.';
      }
      
      // Update nav brand
      const navBrand = document.querySelector('.text-2xl.font-display, header .font-bold.text-xl');
      if (navBrand && personalInfo.name) {
        const firstName = personalInfo.name.split(' ')[0];
        navBrand.textContent = firstName.toUpperCase() + '.';
      }
      
      // Update social icons in hero
      const heroSocials = document.querySelector('.flex.gap-4');
      if (heroSocials) {
        const socialLinks = heroSocials.querySelectorAll('a');
        socialLinks.forEach(link => {
          const img = link.querySelector('img');
          if (img) {
            const alt = img.alt?.toLowerCase() || '';
            let platform = '';
            if (alt.includes('github')) platform = 'github';
            if (alt.includes('linkedin')) platform = 'linkedin';
            if (alt.includes('x') || alt.includes('twitter')) platform = 'twitter';
            
            const url = getSocialUrl(platform);
            if (url) {
              link.href = url;
            } else {
              link.style.display = 'none';
            }
          }
        });
      }
      
      // 2. ABOUT SECTION
      const aboutSection = document.getElementById('about');
      if (aboutSection && personalInfo.about) {
        const aboutParagraphs = aboutSection.querySelectorAll('p.mb-6, p:not(.mb-6)');
        if (aboutParagraphs.length > 0) {
          aboutParagraphs[0].textContent = personalInfo.about;
          // Hide additional paragraphs
          for (let i = 1; i < aboutParagraphs.length; i++) {
            aboutParagraphs[i].style.display = 'none';
          }
        }
      }
      
      // 3. SKILLS SECTION
      if (aboutSection && skills.length > 0) {
        const skillGroups = aboutSection.querySelectorAll('.space-y-8 > div, .space-y-6 > div');
        skillGroups.forEach((group, idx) => {
          const skillContainer = group.querySelector('.flex.flex-wrap.gap-2');
          if (skillContainer) {
            if (idx === 0) {
              const categoryTitle = group.querySelector('h4');
              if (categoryTitle) categoryTitle.textContent = 'Technical Skills';
              skillContainer.innerHTML = skills.map(skill => 
                \`<span class="px-3 py-1 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark text-sm">\${skill}</span>\`
              ).join('');
            } else {
              group.style.display = 'none';
            }
          }
        });
      }
      
      // 4. PROJECTS SECTION
      const projectsHeader = document.getElementById('projects') || document.getElementById('work');
      if (projectsHeader) {
        // Featured project section
        const featuredSection = projectsHeader.nextElementSibling;
        if (featuredSection && projects.length > 0) {
          const firstProject = projects[0];
          
          // Update featured project
          const featTitle = featuredSection.querySelector('h3.text-3xl, h3.text-2xl');
          if (featTitle) featTitle.textContent = firstProject.title;
          
          const featDesc = featuredSection.querySelector('p.text-gray-600, p.text-muted-foreground');
          if (featDesc) featDesc.textContent = firstProject.description || '';
          
          const featImg = featuredSection.querySelector('img');
          if (featImg) {
            featImg.src = firstProject.imageUrl;
            featImg.alt = firstProject.title;
          }
          
          // Update links
          const featLinks = featuredSection.querySelectorAll('.flex.gap-4 a, .flex.gap-2 a');
          if (featLinks.length >= 2) {
            if (firstProject.links.github) {
              featLinks[0].href = firstProject.links.github;
            } else {
              featLinks[0].style.display = 'none';
            }
            if (firstProject.links.live) {
              featLinks[1].href = firstProject.links.live;
            } else {
              featLinks[1].style.display = 'none';
            }
          }
          
          // Other projects grid
          const projectsGrid = featuredSection.nextElementSibling;
          if (projectsGrid && projects.length > 1) {
            const projectCards = projectsGrid.querySelectorAll('.group, a.group');
            
            if (projectCards.length > 0) {
              const templateCard = projectCards[0].outerHTML;
              projectsGrid.innerHTML = '';
              
              // Skip first project (already shown as featured)
              projects.slice(1).forEach((project) => {
                const temp = document.createElement('div');
                temp.innerHTML = templateCard;
                const card = temp.firstElementChild;
                
                const img = card.querySelector('img');
                if (img) {
                  img.src = project.imageUrl;
                  img.alt = project.title;
                }
                
                const title = card.querySelector('h3');
                if (title) title.textContent = project.title;
                
                const desc = card.querySelector('p.text-sm');
                if (desc) desc.textContent = project.description || '';
                
                const links = card.querySelectorAll('.flex.gap-4 a, .flex.gap-2 a');
                if (links.length >= 2) {
                  if (project.links.github) {
                    links[0].href = project.links.github;
                  } else {
                    links[0].style.display = 'none';
                  }
                  if (project.links.live) {
                    links[1].href = project.links.live;
                  } else {
                    links[1].style.display = 'none';
                  }
                }
                
                projectsGrid.appendChild(card);
              });
            }
          } else if (projectsGrid && projects.length <= 1) {
            projectsGrid.style.display = 'none';
          }
        } else if (projects.length === 0) {
          projectsHeader.style.display = 'none';
          if (featuredSection) featuredSection.style.display = 'none';
          const nextGrid = featuredSection?.nextElementSibling;
          if (nextGrid) nextGrid.style.display = 'none';
        }
      }
      
      // 5. EXPERIENCE SECTION
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        const expTimeline = experienceSection.querySelector('.space-y-12, .relative.border-l, .divide-y');
        if (expTimeline && experience.length > 0) {
          const expItems = expTimeline.querySelectorAll('.pl-8, .relative.pl-8, .grid');
          
          if (expItems.length > 0) {
            const templateItem = expItems[0].parentElement?.outerHTML || expItems[0].outerHTML;
            expTimeline.innerHTML = '';
            
            experience.forEach((exp) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateItem;
              const item = temp.firstElementChild;
              
              const role = item.querySelector('h3.text-xl, h3');
              if (role) role.textContent = exp.role;
              
              const period = item.querySelector('span.text-sm.font-mono, span.font-mono');
              if (period) period.textContent = exp.period;
              
              const company = item.querySelector('p.text-md, h4, .font-bold');
              if (company) company.textContent = exp.company;
              
              const desc = item.querySelector('p.text-sm.text-gray-600, p.leading-relaxed');
              if (desc) desc.textContent = exp.description || '';
              
              expTimeline.appendChild(item);
            });
          }
        } else if (experience.length === 0) {
          experienceSection.style.display = 'none';
        }
      }
      
      // 6. FOOTER / CONTACT
      const footer = document.getElementById('contact') || document.querySelector('footer');
      if (footer) {
        const footerEmail = footer.querySelector('a[href^="mailto:"]');
        if (footerEmail && personalInfo.email) {
          footerEmail.href = \`mailto:\${personalInfo.email}\`;
          footerEmail.textContent = personalInfo.email;
        }
        
        // Update footer social links
        const footerSocials = footer.querySelectorAll('.flex.justify-center.gap-8 a, .flex.gap-4 a');
        footerSocials.forEach(link => {
          const img = link.querySelector('img');
          if (img) {
            const alt = img.alt?.toLowerCase() || '';
            let platform = '';
            if (alt.includes('github')) platform = 'github';
            if (alt.includes('linkedin')) platform = 'linkedin';
            if (alt.includes('instagram')) platform = 'instagram';
            
            const url = getSocialUrl(platform);
            if (url) {
              link.href = url;
            } else {
              link.style.display = 'none';
            }
          }
        });
        
        // Update copyright name
        const copyright = footer.querySelector('.text-xs.text-gray-400, .text-sm.text-muted-foreground');
        if (copyright && personalInfo.name) {
          copyright.textContent = \`© \${new Date().getFullYear()} \${personalInfo.name}. All rights reserved.\`;
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
    console.error("Minimalist Grid template preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate minimalist grid template preview" },
      { status: 500 },
    );
  }
}
