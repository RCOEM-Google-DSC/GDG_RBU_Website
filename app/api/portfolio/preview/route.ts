import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Project {
  id?: string;
  title: string;
  description?: string;
  image_url?: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
}

interface Experience {
  id?: string;
  role: string;
  company: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Portfolio {
  display_name?: string;
  about_me?: string;
  skills?: string[];
  profile_image_url?: string;
}

interface PortfolioData {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    location: string;
    email: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    links: { github: string; live: string };
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  skills: string[];
  socials: Array<{ platform: string; url: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { templateId, portfolio, projects, experience, social_links } = data;

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 },
      );
    }

    // Read the template HTML file
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      templateId,
      "code.html",
    );

    let templateHtml: string;
    try {
      templateHtml = await fs.readFile(templatePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 },
      );
    }

    // Transform data to match template format
    const typedPortfolio = portfolio as Portfolio | undefined;
    const typedProjects = projects as Project[] | undefined;
    const typedExperience = experience as Experience[] | undefined;
    const typedSocialLinks = social_links as SocialLink[] | undefined;

    const personalInfo = {
      name: typedPortfolio?.display_name || "Your Name",
      role: "Developer",
      about: typedPortfolio?.about_me || "",
      location: "Location",
      email:
        typedSocialLinks
          ?.find((s) => s.platform === "email")
          ?.url?.replace("mailto:", "") || "",
    };

    const transformedProjects = (typedProjects || []).map((p, index) => ({
      id: p.id || String(index + 1),
      title: p.title || "Untitled Project",
      description: p.description || "",
      imageUrl:
        p.image_url || `https://picsum.photos/seed/${index + 10}/800/600`,
      tags: p.technologies || [],
      links: {
        github: p.github_url || "",
        live: p.live_url || "",
      },
    }));

    const transformedExperience = (typedExperience || []).map((e, index) => ({
      id: e.id || String(index + 1),
      role: e.role || "Role",
      company: e.company || "Company",
      period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
      description: e.description || "",
    }));

    const skills = typedPortfolio?.skills || [];

    const transformedSocials = (typedSocialLinks || []).map((s) => ({
      platform: s.platform,
      url: s.url,
    }));

    const portfolioData: PortfolioData = {
      personalInfo,
      projects: transformedProjects,
      experience: transformedExperience,
      skills,
      socials: transformedSocials,
    };

    // Inject data based on template type
    let modifiedHtml = templateHtml;

    if (templateId === "architectural") {
      modifiedHtml = injectArchitecturalData(modifiedHtml, portfolioData);
    } else {
      const injectionScript = getTemplateInjectionScript(
        templateId,
        portfolioData,
      );
      // Insert the script before the closing </body> tag
      modifiedHtml = modifiedHtml.replace(
        /<\/body>/i,
        `${injectionScript}\n</body>`,
      );
    }

    return new NextResponse(modifiedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Preview generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 },
    );
  }
}

// --- HELPER FUNCTIONS ---

function injectArchitecturalData(html: string, data: PortfolioData) {
  const dataScript = `
    // --- INJECTED PORTFOLIO DATA ---
    const PERSONAL_INFO = ${JSON.stringify(data.personalInfo)};
    const PROJECTS = ${JSON.stringify(data.projects)};
    const EXPERIENCE = ${JSON.stringify(data.experience)};
    const SKILLS = ${JSON.stringify(data.skills)};
    const SOCIALS = ${JSON.stringify(data.socials)};
    // --- END INJECTED DATA ---`;

  return html.replace(
    /\/\/ --- CONSTANTS ---[\s\S]*?\/\/ --- COMPONENTS ---/,
    `// --- CONSTANTS ---\n${dataScript}\n\n        // --- COMPONENTS ---`,
  );
}

function getTemplateInjectionScript(templateId: string, data: PortfolioData) {
  const commonData = `
    const portfolioData = {
      personalInfo: ${JSON.stringify(data.personalInfo)},
      projects: ${JSON.stringify(data.projects)},
      experience: ${JSON.stringify(data.experience)},
      skills: ${JSON.stringify(data.skills)},
      socials: ${JSON.stringify(data.socials)}
    };
  `;

  let specificLogic = "";

  switch (templateId) {
    case "soft":
      specificLogic = getSoftTemplateLogic();
      break;
    case "minimalist-grid":
      specificLogic = getMinimalistGridTemplateLogic();
      break;
    case "magazine":
      specificLogic = getMagazineTemplateLogic();
      break;
    case "hyun-barng":
      specificLogic = getHyunBarngTemplateLogic();
      break;
    default:
      specificLogic = getGenericTemplateLogic();
  }

  return `
<script>
  ${commonData}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectData);
  } else {
    injectData();
  }

  function injectData() {
    const { personalInfo, projects, experience, skills, socials } = portfolioData;
    console.log("Injecting data for template: ${templateId}", portfolioData);
    
    try {
      ${specificLogic}
    } catch (e) {
      console.error("Data injection error:", e);
    }
  }
</script>`;
}

function getSoftTemplateLogic() {
  return `
    // ========== SOFT TEMPLATE ==========
    
    // Helper function to get social link URL
    function getSocialUrl(platform) {
      const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
      return link ? link.url : '';
    }
    
    // 1. HERO SECTION
    // Update the main intro paragraph with name
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
    const githubUrl = getSocialUrl('github');
    if (githubBtn && githubUrl) {
      githubBtn.href = githubUrl;
    }
    
    // 2. ABOUT SECTION - Update philosophy cards if about_me is provided
    if (personalInfo.about) {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const aboutHeading = aboutSection.querySelector('h2');
        if (aboutHeading) {
          aboutHeading.innerHTML = \`About \<span class="italic text-secondary"\>Me\</span\>\`;
        }
        // Add about text
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
      // Clear all existing skill containers and replace with user skills
      const skillContainers = skillsSection.querySelectorAll('.flex.flex-wrap.gap-3');
      skillContainers.forEach((container, idx) => {
        if (idx === 0) {
          container.innerHTML = skills.map(skill => 
            \`<span class="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-sm">\${skill}</span>\`
          ).join('');
        } else {
          // Hide other skill categories
          container.parentElement.style.display = 'none';
        }
      });
      // Update first category title
      const firstCategoryTitle = skillsSection.querySelector('h3.font-display');
      if (firstCategoryTitle) {
        firstCategoryTitle.textContent = 'Technical Skills';
      }
    } else if (skillsSection && skills.length === 0) {
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
          
          projects.forEach((project, idx) => {
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
        // Hide projects section if no projects
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
            
            // Hide tags container (we don't have experience tags in schema)
            const tagsContainer = item.querySelector('.flex.flex-wrap.gap-2');
            if (tagsContainer) tagsContainer.style.display = 'none';
            
            // Update timeline dot color (first one is active/highlighted)
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
  `;
}

function getMinimalistGridTemplateLogic() {
  return `
    // ========== MINIMALIST-GRID TEMPLATE ==========
    
    // Helper function to get social link URL
    function getSocialUrl(platform) {
      const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
      return link ? link.url : '';
    }
    
    // 1. HERO / HEADER SECTION
    // Update the main name in hero
    const mainHeading = document.querySelector('h1.text-6xl');
    if (mainHeading && personalInfo.name) {
      const names = personalInfo.name.split(' ');
      mainHeading.innerHTML = names.join(' <br />');
    }
    
    // Update role/tagline
    const roleText = document.querySelector('p.text-xl.md\\\\:text-2xl');
    if (roleText && personalInfo.about) {
      // Extract first sentence or use about as subtitle
      const subtitle = personalInfo.about.split('.')[0] || 'Developer';
      roleText.innerHTML = subtitle + '.';
    }
    
    // Update nav brand
    const navBrand = document.querySelector('.text-2xl.font-display');
    if (navBrand && personalInfo.name) {
      navBrand.textContent = personalInfo.name.split(' ')[0].toUpperCase() + '.';
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
        // Hide additional paragraphs if they exist
        for (let i = 1; i < aboutParagraphs.length; i++) {
          aboutParagraphs[i].style.display = 'none';
        }
      }
    }
    
    // 3. SKILLS SECTION (Technical Arsenal)
    if (aboutSection && skills.length > 0) {
      const skillGroups = aboutSection.querySelectorAll('.space-y-8 > div');
      skillGroups.forEach((group, idx) => {
        const skillContainer = group.querySelector('.flex.flex-wrap.gap-2');
        if (skillContainer) {
          if (idx === 0) {
            // First group gets all skills
            const categoryTitle = group.querySelector('h4');
            if (categoryTitle) categoryTitle.textContent = 'Technical Skills';
            skillContainer.innerHTML = skills.map(skill => 
              \`<span class="px-3 py-1 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark text-sm">\${skill}</span>\`
            ).join('');
          } else {
            // Hide other groups
            group.style.display = 'none';
          }
        }
      });
    }
    
    // 4. PROJECTS SECTION
    const projectsHeader = document.getElementById('projects');
    if (projectsHeader) {
      // Featured project section
      const featuredSection = projectsHeader.nextElementSibling;
      if (featuredSection && projects.length > 0) {
        const firstProject = projects[0];
        
        // Update featured project
        const featTitle = featuredSection.querySelector('h3.text-3xl');
        if (featTitle) featTitle.textContent = firstProject.title;
        
        const featDesc = featuredSection.querySelector('p.text-gray-600');
        if (featDesc) featDesc.textContent = firstProject.description || '';
        
        const featImg = featuredSection.querySelector('img');
        if (featImg) {
          featImg.src = firstProject.imageUrl;
          featImg.alt = firstProject.title;
        }
        
        // Update links
        const featLinks = featuredSection.querySelectorAll('.flex.gap-4 a');
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
          const projectCards = projectsGrid.querySelectorAll('.group');
          
          if (projectCards.length > 0) {
            const templateCard = projectCards[0].outerHTML;
            projectsGrid.innerHTML = '';
            
            // Skip first project (already shown as featured)
            projects.slice(1).forEach((project, idx) => {
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
              
              const links = card.querySelectorAll('.flex.gap-4 a');
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
        // Hide projects section header and container
        projectsHeader.style.display = 'none';
        if (featuredSection) featuredSection.style.display = 'none';
        const nextGrid = featuredSection?.nextElementSibling;
        if (nextGrid) nextGrid.style.display = 'none';
      }
    }
    
    // 5. EXPERIENCE SECTION
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const expTimeline = experienceSection.querySelector('.space-y-12, .relative.border-l');
      if (expTimeline && experience.length > 0) {
        const expItems = expTimeline.querySelectorAll('.pl-8, .relative.pl-8');
        
        if (expItems.length > 0) {
          const templateItem = expItems[0].parentElement?.outerHTML || expItems[0].outerHTML;
          expTimeline.innerHTML = '';
          
          experience.forEach((exp, idx) => {
            const temp = document.createElement('div');
            temp.innerHTML = templateItem;
            const item = temp.firstElementChild;
            
            const role = item.querySelector('h3.text-xl');
            if (role) role.textContent = exp.role;
            
            const period = item.querySelector('span.text-sm.font-mono');
            if (period) period.textContent = exp.period;
            
            const company = item.querySelector('p.text-md');
            if (company) company.textContent = exp.company;
            
            const desc = item.querySelector('p.text-sm.text-gray-600');
            if (desc) desc.textContent = exp.description || '';
            
            expTimeline.appendChild(item);
          });
        }
      } else if (experience.length === 0) {
        experienceSection.style.display = 'none';
        // Also hide "Latest Articles" sidebar if it exists
        const articlesSidebar = experienceSection.querySelector('.lg\\\\:col-span-1');
        if (articlesSidebar) articlesSidebar.style.display = 'none';
      }
    }
    
    // 6. FOOTER / CONTACT
    const footer = document.getElementById('contact');
    if (footer) {
      const footerEmail = footer.querySelector('a[href^="mailto:"]');
      if (footerEmail && personalInfo.email) {
        footerEmail.href = \`mailto:\${personalInfo.email}\`;
        footerEmail.textContent = personalInfo.email;
      }
      
      // Update footer social links
      const footerSocials = footer.querySelectorAll('.flex.justify-center.gap-8 a');
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
      const copyright = footer.querySelector('.text-xs.text-gray-400');
      if (copyright && personalInfo.name) {
        copyright.textContent = \`© \${new Date().getFullYear()} \${personalInfo.name}. All rights reserved.\`;
      }
    }
  `;
}

function getMagazineTemplateLogic() {
  return `
    // ========== MAGAZINE TEMPLATE ==========
    
    // Helper function to get social link URL
    function getSocialUrl(platform) {
      const link = socials.find(s => s.platform.toLowerCase() === platform.toLowerCase());
      return link ? link.url : '';
    }
    
    // 1. HEADER / HERO SECTION
    // Update main name
    const mainTitle = document.querySelector('h1.font-display.text-6xl');
    if (mainTitle && personalInfo.name) {
      const names = personalInfo.name.split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';
      mainTitle.innerHTML = \`\${firstName}<br/>\${lastName}\`;
    }
    
    // Update subtitle/role
    const subtitle = document.querySelector('p.font-display.text-xs.font-bold');
    if (subtitle) {
      subtitle.textContent = 'Developer Portfolio';
    }
    
    // Update bio/about
    const bio = document.querySelector('p.font-sans.text-sm.md\\\\:text-base.max-w-md');
    if (bio && personalInfo.about) {
      bio.textContent = personalInfo.about;
    }
    
    // Update location
    const locationEl = document.querySelector('.z-10.absolute.bottom-4');
    if (locationEl) {
      // Keep or update location
    }
    
    // Update header nav links
    const githubNav = document.querySelectorAll('header .flex div')[3]; // GitHub position
    if (githubNav && getSocialUrl('github')) {
      githubNav.onclick = () => window.open(getSocialUrl('github'), '_blank');
      githubNav.style.cursor = 'pointer';
    }
    
    // 2. SKILLS SECTION
    const skillsSections = document.querySelectorAll('section.grid.grid-cols-1.md\\\\:grid-cols-3');
    if (skillsSections.length > 0 && skills.length > 0) {
      const skillsSection = skillsSections[0];
      const skillColumns = skillsSection.querySelectorAll('.p-8');
      
      if (skillColumns.length >= 3) {
        // Distribute skills across columns or put all in first
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
            skillColumns[1]?.style.display === 'none';
            skillColumns[2]?.style.display === 'none';
          }
        }
      }
    } else if (skills.length === 0) {
      const skillsSectionParent = document.querySelector('section.grid.grid-cols-1.md\\\\:grid-cols-3');
      if (skillsSectionParent) skillsSectionParent.style.display = 'none';
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
        const tagsContainer = featuredContainer.querySelector('.flex.gap-2.mb-8');
        if (tagsContainer && p.tags.length > 0) {
          tagsContainer.innerHTML = p.tags.slice(0, 3).map(tag => 
            \`<span class="border border-border-light dark:border-border-dark px-2 py-1 text-[10px] uppercase font-bold">\${tag}</span>\`
          ).join('');
        }
        
        // Update links
        const linkBtns = featuredContainer.querySelectorAll('.grid.grid-cols-2 a');
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
      const featuredImg = projectsSection.querySelector('img[alt="Abstract interface design"]');
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
          
          projects.slice(1).forEach((project, idx) => {
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
            
            const desc = card.querySelector('p.font-sans.text-xs');
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
      // Hide projects section
      if (projectsSection) projectsSection.style.display = 'none';
      const otherProjects = projectsSection?.nextElementSibling;
      if (otherProjects) otherProjects.style.display = 'none';
    }
    
    // 4. EXPERIENCE SECTION
    // Find experience rows
    const allSections = document.querySelectorAll('section');
    let expSection = null;
    allSections.forEach(section => {
      if (section.innerHTML.includes('Dev') && section.innerHTML.includes('Journey')) {
        expSection = section.nextElementSibling;
      }
    });
    
    if (!expSection) {
      // Alternative: find by looking for experience rows
      const expRows = document.querySelectorAll('.grid.grid-cols-1.lg\\\\:grid-cols-12.border-b.group');
      if (expRows.length > 0) {
        expSection = expRows[0].parentElement;
      }
    }
    
    if (expSection && experience.length > 0) {
      const expRows = expSection.querySelectorAll('.grid.border-b, .grid.group');
      
      if (expRows.length > 0) {
        const templateRow = expRows[0].outerHTML;
        expSection.innerHTML = '';
        
        experience.forEach(exp => {
          const temp = document.createElement('div');
          temp.innerHTML = templateRow;
          const row = temp.firstElementChild;
          
          // Update date
          const dateEl = row.querySelector('.col-span-12.lg\\\\:col-span-2');
          if (dateEl) dateEl.textContent = exp.period.replace(' - ', ' — ');
          
          // Update role
          const roleEl = row.querySelector('h3');
          if (roleEl) roleEl.textContent = exp.role.toUpperCase();
          
          // Update company
          const companyEl = row.querySelector('.col-span-12.lg\\\\:col-span-6 span.font-sans');
          if (companyEl) companyEl.textContent = exp.company;
          
          expSection.appendChild(row);
        });
      }
    } else if (experience.length === 0) {
      // Hide experience section and its header
      const devJourneyHeader = document.querySelector('div:has(> span:contains("02"))');
      if (devJourneyHeader) devJourneyHeader.style.display = 'none';
      if (expSection) expSection.style.display = 'none';
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
      const copyright = footer.querySelector('.text-xs.text-gray-400');
      if (copyright && personalInfo.name) {
        copyright.textContent = \`© \${new Date().getFullYear()} \${personalInfo.name}. No cookies. No tracking.\`;
      }
      
      // Update social links
      const socialLinks = footer.querySelectorAll('.grid.grid-cols-2 a');
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
  `;
}

function getHyunBarngTemplateLogic() {
  return `
    // ========== HYUN-BARNG TEMPLATE ==========
    
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
    
    // Hero title - we'll keep the style but can update
    const heroTitle = document.querySelector('h1.font-display.text-5xl');
    if (heroTitle) {
      // Keep dramatic title or personalize
      const nameParts = personalInfo.name.split(' ');
      if (nameParts.length > 1) {
        heroTitle.innerHTML = \`\${nameParts[0]}<br /><span class="text-neutral-500">\${nameParts.slice(1).join(' ')}</span>\`;
      }
    }
    
    // Hero subtitle
    const heroSub = document.querySelector('p.font-light.text-neutral-400');
    if (heroSub) {
      heroSub.textContent = (skills.slice(0, 3).join(' | ') || 'Developer').toUpperCase();
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
      if (aboutTitle && personalInfo.name) {
        aboutTitle.textContent = \`About \${personalInfo.name.split(' ')[0]}\`;
      }
      
      const aboutText = aboutSection.querySelector('p.text-lg');
      if (aboutText && personalInfo.about) {
        aboutText.textContent = '"' + personalInfo.about + '"';
      }
      
      // Location
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
        // Distribute skills or consolidate
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
    } else if (skills.length === 0) {
      if (skillsSection) skillsSection.style.display = 'none';
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
          
          projects.forEach((project, idx) => {
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
                link.querySelector('span')?.replaceWith(document.createTextNode('View Project'));
              } else if (project.links.github) {
                link.href = project.links.github;
                const textNode = Array.from(link.childNodes).find(n => n.nodeType === 3);
                if (textNode) textNode.textContent = 'View GitHub';
              } else {
                link.style.display = 'none';
              }
            }
            
            projectsContainer.appendChild(article);
          });
        }
      }
    } else if (projects.length === 0) {
      if (projectsSection) projectsSection.style.display = 'none';
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
            const desc = item.querySelector('p.text-neutral-600');
            if (desc) desc.textContent = exp.description || '';
            
            // Timeline dot styling (first is highlighted)
            const dot = item.querySelector('.absolute.-left-\\\\[5px\\\\]');
            if (dot) {
              if (idx === 0) {
                dot.className = dot.className.replace('bg-neutral-400', 'bg-primary');
              }
            }
            
            expTimeline.appendChild(item);
          });
        }
      }
    } else if (experience.length === 0) {
      if (experienceSection) experienceSection.style.display = 'none';
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
      const copyright = footer.querySelector('.mb-4.md\\\\:mb-0');
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
  `;
}

function getGenericTemplateLogic() {
  return `
    // Generic fallback - simple name replacement
    const nameElements = document.querySelectorAll('h1, h2, nav a');
    nameElements.forEach(el => {
      if (el.textContent?.includes('Alex')) {
        el.textContent = el.textContent.replace(/Alex[\\s\\w]*/gi, personalInfo.name);
      }
    });
    
    // Hide sections if no data
    if (projects.length === 0) {
      const projectsSection = document.getElementById('projects') || document.querySelector('[id*="project"]');
      if (projectsSection) projectsSection.style.display = 'none';
    }
    
    if (experience.length === 0) {
      const expSection = document.getElementById('experience') || document.querySelector('[id*="experience"]');
      if (expSection) expSection.style.display = 'none';
    }
    
    if (skills.length === 0) {
      const skillsSection = document.getElementById('skills') || document.querySelector('[id*="skill"]');
      if (skillsSection) skillsSection.style.display = 'none';
    }
  `;
}
