import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface SoftTemplateData {
  personalInfo: {
    name: string;
    email: string;
    about: string;
    github?: string;
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

    // Read the soft template HTML
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "soft",
      "code.html",
    );

    let templateHtml: string;
    try {
      templateHtml = await fs.readFile(templatePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "Soft template not found" },
        { status: 404 },
      );
    }

    // Transform data for soft template
    const templateData: SoftTemplateData = {
      personalInfo: {
        name: portfolio?.display_name || "Your Name",
        email:
          social_links
            ?.find((s: any) => s.platform === "email")
            ?.url?.replace("mailto:", "") || "",
        about: portfolio?.about_me || "",
        github:
          social_links?.find((s: any) => s.platform === "github")?.url || "",
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
    console.log("Injecting data for Soft template", portfolioData);
    
    try {
      // Helper function to get social link URL
      function getSocialUrl(platform) {
        const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
        return link ? link.url : '';
      }
      
      // 1. HERO SECTION - Update name and intro
      const heroIntro = document.querySelector('p.text-lg.md\\\\:text-xl');
      if (heroIntro && personalInfo.name) {
        heroIntro.innerHTML = heroIntro.innerHTML.replace(/I'm [^,]+,/, \`I'm \${personalInfo.name},\`);
      }
      
      // Update nav brand
      const navBrand = document.querySelector('.font-display.italic.text-2xl');
      if (navBrand && personalInfo.name) {
        navBrand.textContent = personalInfo.name.toLowerCase().replace(/\\s+/g, '.') + '.dev';
      }
      
      // Update GitHub button in hero
      const githubBtn = document.querySelector('a[href="https://github.com"]');
      if (githubBtn && personalInfo.github) {
        githubBtn.href = personalInfo.github;
      }
      
      // 2. ABOUT SECTION
      if (personalInfo.about) {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
          const cardsContainer = aboutSection.querySelector('.grid.grid-cols-1.md\\\\:grid-cols-3');
          if (cardsContainer) {
            const aboutCard = document.createElement('div');
            aboutCard.className = 'md:col-span-3 p-8 border border-gray-100 dark:border-gray-800 rounded-xl bg-background-light dark:bg-background-dark mb-8';
            aboutCard.innerHTML = \`<p class="text-muted-light dark:text-muted-dark text-sm leading-relaxed">\${personalInfo.about}</p>\`;
            cardsContainer.parentNode.insertBefore(aboutCard, cardsContainer);
          }
        }
      }
      
      // 3. SKILLS SECTION
      const skillsSection = document.getElementById('skills');
      if (skillsSection && skills.length > 0) {
        const skillContainers = skillsSection.querySelectorAll('.flex.flex-wrap.gap-3');
        skillContainers.forEach((container, idx) => {
          if (idx === 0) {
            container.innerHTML = skills.map(skill => 
              \`<span class="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-sm">\${skill}</span>\`
            ).join('');
            // Update category title
            const categoryTitle = container.parentElement?.querySelector('h3.font-display');
            if (categoryTitle) categoryTitle.textContent = 'Technical Skills';
          } else {
            container.parentElement.style.display = 'none';
          }
        });
      } else if (skillsSection) {
        skillsSection.style.display = 'none';
      }
      
      // 4. PROJECTS SECTION
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const projectsGrid = projectsSection.querySelector('.grid');
        if (projectsGrid && projects.length > 0) {
          const projectCards = projectsGrid.querySelectorAll('div.group.cursor-pointer');
          
          if (projectCards.length > 0) {
            const templateCard = projectCards[0].outerHTML;
            projectsGrid.innerHTML = '';
            
            projects.forEach((project) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateCard;
              const card = temp.firstElementChild;
              
              // Update image
              const img = card.querySelector('img');
              if (img) {
                img.src = project.imageUrl;
                img.alt = project.title;
              }
              
              // Update title
              const title = card.querySelector('h3');
              if (title) title.textContent = project.title;
              
              // Update description
              const desc = card.querySelector('p.text-muted-light');
              if (desc) desc.textContent = project.description || 'No description provided';
              
              // Update tags
              const tagsContainer = card.querySelector('.flex.gap-2.text-xs');
              if (tagsContainer && project.tags.length > 0) {
                tagsContainer.innerHTML = project.tags.slice(0, 3).map(tag => \`<span>\${tag}</span>\`).join(' • ');
              } else if (tagsContainer) {
                tagsContainer.style.display = 'none';
              }
              
              // Update links
              const linksOverlay = card.querySelector('.absolute.inset-0.bg-black\\\\/40');
              if (linksOverlay) {
                const links = linksOverlay.querySelectorAll('a');
                if (links[0]) {
                  if (project.links.github) {
                    links[0].href = project.links.github;
                  } else {
                    links[0].style.display = 'none';
                  }
                }
                if (links[1]) {
                  if (project.links.live) {
                    links[1].href = project.links.live;
                  } else {
                    links[1].style.display = 'none';
                  }
                }
              }
              
              projectsGrid.appendChild(card);
            });
          }
        } else if (projects.length === 0) {
          projectsSection.style.display = 'none';
        }
      }
      
      // 5. EXPERIENCE SECTION
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        const expTimeline = experienceSection.querySelector('.space-y-12');
        if (expTimeline && experience.length > 0) {
          const expItems = expTimeline.querySelectorAll('.relative.pl-8');
          
          if (expItems.length > 0) {
            const templateItem = expItems[0].outerHTML;
            expTimeline.innerHTML = '';
            
            experience.forEach((exp, idx) => {
              const temp = document.createElement('div');
              temp.innerHTML = templateItem;
              const item = temp.firstElementChild;
              
              // Update role
              const role = item.querySelector('h3');
              if (role) role.textContent = exp.role;
              
              // Update period
              const period = item.querySelector('span.font-mono');
              if (period) period.textContent = exp.period;
              
              // Update company
              const company = item.querySelector('h4');
              if (company) company.textContent = exp.company;
              
              // Update description
              const desc = item.querySelector('p.leading-relaxed');
              if (desc) desc.textContent = exp.description || '';
              
              // Hide tags container
              const tagsContainer = item.querySelector('.flex.flex-wrap.gap-2');
              if (tagsContainer) tagsContainer.style.display = 'none';
              
              // Update timeline dot color
              const dot = item.querySelector('span.absolute.-left-\\\\[5px\\\\]');
              if (dot && idx === 0) {
                dot.className = dot.className.replace('bg-gray-300', 'bg-secondary');
              }
              
              expTimeline.appendChild(item);
            });
          }
        } else if (experience.length === 0) {
          experienceSection.style.display = 'none';
        }
      }
      
      // 6. FOOTER / CONTACT
      const footerName = document.querySelector('footer h3.font-display');
      if (footerName && personalInfo.name) {
        footerName.textContent = personalInfo.name;
      }
      
      const footerEmail = document.querySelector('footer a[href^="mailto:"]');
      if (footerEmail && personalInfo.email) {
        footerEmail.href = \`mailto:\${personalInfo.email}\`;
        footerEmail.textContent = personalInfo.email;
      }
      
      // Update social links in footer
      const footerSocials = document.querySelector('footer .flex.space-x-4');
      if (footerSocials && socials.length > 0) {
        const socialIcons = footerSocials.querySelectorAll('a');
        socialIcons.forEach(icon => {
          const iconClass = icon.querySelector('i')?.className || '';
          let platform = '';
          if (iconClass.includes('twitter')) platform = 'twitter';
          if (iconClass.includes('linkedin')) platform = 'linkedin';
          if (iconClass.includes('github')) platform = 'github';
          if (iconClass.includes('dribbble')) platform = 'dribbble';
          
          const url = getSocialUrl(platform);
          if (url) {
            icon.href = url;
          } else {
            icon.style.display = 'none';
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
    console.error("Soft template preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate soft template preview" },
      { status: 500 },
    );
  }
}
