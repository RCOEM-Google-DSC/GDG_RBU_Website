import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
    const personalInfo = {
      name: portfolio?.display_name?.toUpperCase() || "YOUR NAME",
      role: "Developer",
      about: portfolio?.about_me || "Welcome to my portfolio",
      location: "Location",
      email:
        social_links
          ?.find((s: { platform: string }) => s.platform === "email")
          ?.url?.replace("mailto:", "") || "email@example.com",
      phone: "",
    };

    const transformedProjects = (projects || []).map(
      (
        p: {
          id?: string;
          title: string;
          description?: string;
          image_url?: string;
          technologies?: string[];
          github_url?: string;
          live_url?: string;
        },
        index: number,
      ) => ({
        id: p.id || String(index + 1),
        title: p.title || "Untitled Project",
        role: "Developer",
        description: p.description || "",
        imageUrl:
          p.image_url || `https://picsum.photos/id/${index + 10}/800/600`,
        tags: p.technologies || [],
        duration: "",
        links: {
          github: p.github_url || "",
          live: p.live_url || "",
        },
      }),
    );

    const transformedExperience = (experience || []).map(
      (
        e: {
          id?: string;
          role: string;
          company: string;
          start_date: string;
          end_date?: string;
          is_current?: boolean;
          description?: string;
        },
        index: number,
      ) => ({
        id: e.id || String(index + 1),
        role: e.role || "Role",
        company: e.company || "Company",
        period: `${e.start_date || ""} - ${e.is_current ? "Present" : e.end_date || ""}`,
        description: e.description || "",
      }),
    );

    const skills = portfolio?.skills || [];
    const transformedSkills = [{ category: "Skills", skills: skills }];

    const transformedSocials = (social_links || []).map(
      (s: { platform: string; url: string }) => ({
        platform: s.platform,
        url: s.url,
        icon: s.platform.toLowerCase(),
      }),
    );

    // Inject data based on template type
    let modifiedHtml = templateHtml;

    if (templateId === "architectural") {
      modifiedHtml = injectArchitecturalData(modifiedHtml, {
        personalInfo,
        transformedProjects,
        transformedExperience,
        transformedSkills,
        transformedSocials,
      });
    } else {
      const injectionScript = getTemplateInjectionScript(templateId, {
        personalInfo,
        projects: transformedProjects,
        experience: transformedExperience,
        skills: transformedSkills,
        socials: transformedSocials,
      });

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

function injectArchitecturalData(html: string, data: any) {
  const dataScript = `
    // --- INJECTED PORTFOLIO DATA ---
    const PERSONAL_INFO = ${JSON.stringify(data.personalInfo)};
    const PROJECTS = ${JSON.stringify(data.transformedProjects)};
    const EXPERIENCE = ${JSON.stringify(data.transformedExperience)};
    const SKILLS = ${JSON.stringify(data.transformedSkills)};
    const SOCIALS = ${JSON.stringify(data.transformedSocials)};
    // --- END INJECTED DATA ---`;

  return html.replace(
    /\/\/ --- CONSTANTS ---[\s\S]*?\/\/ --- COMPONENTS ---/,
    `// --- CONSTANTS ---\n${dataScript}\n\n        // --- COMPONENTS ---`,
  );
}

function getTemplateInjectionScript(templateId: string, data: any) {
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
    console.log("Injecting data for template: ${templateId}");
    
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
    // 1. Personal Info
    // Hero Name
    const heroName = document.querySelector('h1 span.italic'); 
    // The soft template has "Building for intelligence" in h1, and "I'm Alex Jensen" in p
    // Actually looking at the file:
    // h1 is "Building for <br/> <span class="italic text-secondary">intelligence.</span>"
    // p is "I'm Alex Jensen, a Full Stack..."
    
    // Replace text in the paragraph
    const introP = document.querySelector('p.text-lg.md\\:text-xl');
    if (introP) {
      // Preserve the styling if possible, but simplest is to replace the text content carefully
      // or use regex on the innerHTML for precise targeting
      introP.innerHTML = introP.innerHTML.replace(/I'm [^,]+,/, \`I'm \${personalInfo.name},\`);
      introP.innerHTML = introP.innerHTML.replace(/Full Stack Developer & ML Enthusiast/, personalInfo.tagline);
      introP.innerHTML = introP.innerHTML.replace(/based in [^.]+/, \`based in \${personalInfo.location}\`);
    }

    // Nav Brand
    const navBrand = document.querySelector('.font-display.italic.text-2xl');
    if (navBrand) navBrand.textContent = personalInfo.name.toLowerCase().replace(/\\s/g, '.');

    // Footer contact
    const footerEmail = document.querySelector('a[href^="mailto:"]');
    if (footerEmail) {
       footerEmail.textContent = "Let's Talk"; 
       footerEmail.href = \`mailto:\${personalInfo.email}\`;
    }

    // 2. Projects
    const projectsContainer = document.querySelector('#projects .grid');
    if (projectsContainer) {
      const templateCard = projectsContainer.querySelector('div.group'); // Get first card as template
      if (templateCard) {
        // Clear container but keep template
        const templateHTML = templateCard.outerHTML;
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
          const temp = document.createElement('div');
          temp.innerHTML = templateHTML;
          const card = temp.firstElementChild;
          
          // Image
          const img = card.querySelector('img');
          if (img) {
            img.src = project.imageUrl || 'https://via.placeholder.com/800x600';
            img.alt = project.title;
          }
          
          // Title
          const title = card.querySelector('h3');
          if (title) title.textContent = project.title;
          
          // Description
          const desc = card.querySelector('p.text-muted-light');
          if (desc) desc.textContent = project.description;
          
          // Tags
          const tagsContainer = card.querySelector('.flex.gap-2.text-xs');
          if (tagsContainer) {
             tagsContainer.innerHTML = project.techStack.map(tag => \`<span>\${tag}</span>\`).join(' • ');
          }
          
          // Links
          const links = card.querySelector('.absolute.inset-0.flex');
          if (links) {
             const github = links.children[0];
             const demo = links.children[1];
             if (github) github.href = project.links.github || '#';
             if (demo) demo.href = project.links.live || '#';
          }
          
          projectsContainer.appendChild(card);
        });
      }
    }

    // 3. Experience
    const expContainer = document.querySelector('#experience .space-y-12');
    if (expContainer) {
       const templateItem = expContainer.querySelector('.relative.pl-8');
       if (templateItem) {
         const templateHTML = templateItem.outerHTML;
         expContainer.innerHTML = '';
         
         experience.forEach((exp, index) => {
            const temp = document.createElement('div');
            temp.innerHTML = templateHTML;
            const item = temp.firstElementChild;
            
            // Adjust timeline dot color (alternating in original, random here or standard)
            const dot = item.querySelector('span.absolute');
            // Keep styling as is
            
            // Role
            const role = item.querySelector('h3');
            if (role) role.textContent = exp.role;
            
            // Period
            const period = item.querySelector('span.font-mono');
            if (period) period.textContent = exp.period;
            
            // Company
            const company = item.querySelector('h4');
            if (company) company.textContent = exp.company;
            
            // Description
            const desc = item.querySelector('p.leading-relaxed');
            if (desc) desc.textContent = exp.description;
            
            // Tags - Soft template has them in experience
             const tagsContainer = item.querySelector('.flex.flex-wrap.gap-2');
             if (tagsContainer) {
               // We don't have explicit tags for experience in our schema usually, but if we do:
               // tagsContainer.style.display = 'none'; // hide if no data
               // Or use generic skills? Let's hide to be safe or leave static if strictly needed, 
               // but better to clear standard static data
               tagsContainer.innerHTML = '';
             }

            expContainer.appendChild(item);
         });
       }
    }

    // 4. Skills (Lists in bottom section)
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
       // The soft template has "Languages & Core", etc.
       // We'll just grab the first list and populate it with everything for simplicity, 
       // or try to distribute if we had categories.
       const skillContainer = skillsSection.querySelector('.flex.flex-wrap.gap-3');
       if (skillContainer) {
         skillContainer.innerHTML = skills.map(skill => 
           \`<span class="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-sm">\${skill}</span>\`
         ).join('');
       }
    }
  `;
}

function getMinimalistGridTemplateLogic() {
  return `
    // 1. Personal Info - Minimalist uses "Alex Morgan" usually
    // Header Name
    const headerName = document.querySelector('header .font-bold.text-xl');
    if (headerName) headerName.textContent = personalInfo.name.toUpperCase();
    
    // Wrapper/Main Name
    const mainHeading = document.querySelector('h1.text-6xl');
    if (mainHeading) mainHeading.innerHTML = personalInfo.name.replace(' ', '<br/>');

    // Intro Text
    const introText = document.querySelector('p.text-xl.max-w-2xl');
    if (introText) {
       introText.textContent = personalInfo.about;
    }

    // 2. Projects
    const projectsGrid = document.getElementById('work'); 
    // Note: ID might be 'work' or 'projects' in minimalist
    const targetGrid = projectsGrid ? projectsGrid.querySelector('.grid') : document.querySelector('section.grid-cols-1.md\\:grid-cols-2');
    
    if (targetGrid) {
       const cards = targetGrid.querySelectorAll('a.group');
       if (cards.length > 0) {
          const template = cards[0].outerHTML;
          targetGrid.innerHTML = '';
          
          projects.forEach(project => {
             const temp = document.createElement('div');
             temp.innerHTML = template;
             const card = temp.firstElementChild;
             
             // Link
             if (card.tagName === 'A') card.href = project.links.live || project.links.github || '#';
             
             // Image
             const img = card.querySelector('img');
             if (img) {
               img.src = project.imageUrl || 'https://via.placeholder.com/600x400';
               img.alt = project.title;
             }
             
             // Title
             const title = card.querySelector('h3');
             if (title) title.textContent = project.title;
             
             // Tags
             const tags = card.querySelector('p.text-sm.text-gray-500');
             if (tags) tags.textContent = project.techStack.join(' / ');
             
             targetGrid.appendChild(card);
          });
       }
    }

    // 3. Experience 
    // Minimalist usually has a simple list
    const expDict = document.querySelector('.divide-y.divide-neutral-200');
    if (expDict) {
       const rows = expDict.querySelectorAll('.grid');
       if (rows.length > 0) {
          const template = rows[0].outerHTML;
          expDict.innerHTML = '';
          
          experience.forEach(exp => {
             const temp = document.createElement('div');
             temp.innerHTML = template;
             const row = temp.firstElementChild;
             
             // Period
             const period = row.querySelector('.col-span-12.md\\:col-span-3');
             if (period) period.textContent = exp.period;
             
             // Company - Role
             const mainCol = row.querySelector('.col-span-12.md\\:col-span-9');
             if (mainCol) {
                const title = mainCol.querySelector('h3');
                if (title) title.textContent = exp.company;
                
                const role = mainCol.querySelector('p.text-neutral-500');
                if (role) role.textContent = exp.role;
                
                const desc = mainCol.querySelector('p.mt-4');
                if (desc) desc.textContent = exp.description;
             }
             
             expDict.appendChild(row);
          });
       }
    }
  `;
}

function getMagazineTemplateLogic() {
  return `
    // 1. Personal Info
    // Sidebar Name vertical
    const verticalName = document.querySelector('.writing-vertical');
    
    // Main Title "Alex Vander"
    const mainTitle = document.querySelector('h1.font-display.text-6xl');
    if (mainTitle) {
      const names = personalInfo.name.split(' ');
      const firstName = names[0];
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
      mainTitle.innerHTML = \`\${firstName}<br/>\${lastName}\`;
    }
    
    // Subtitle / Layout
    const subtitle = document.querySelector('p.font-display.text-xs.font-bold');
    if (subtitle) subtitle.textContent = personalInfo.tagline;
    
    const bio = document.querySelector('p.font-sans.text-sm.md\\:text-base');
    if (bio) bio.textContent = personalInfo.about;
    
    // Location
    const loc = document.querySelector('.uppercase.tracking-widest.z-10');
    if (loc) loc.textContent = personalInfo.location;

    // 2. Projects
    // Magazine has grid layout
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
       // Finds the container with Featured Project
       // This template is complex, has specific featured vs others logic
       // Simplest strategy: Find the header "FinDash Analytics" and trace back to container
       const sampleTitle = projectsSection.querySelector('h3.font-display');
       if (sampleTitle) {
          // Assuming single project display as per snippet or similar structure
          // This template seems to have one big featured project in snippet? 
          // Let's check if there are multiple. 
          // Snippet showed FinDash, E-Comm API, Vision AI. 
          // They have different markup structures!
          
          // Implementation: Try to map first 3 projects to the 3 slots if available
          
          // Slot 1: Featured (FinDash)
          const featuredContainer = projectsSection; // It starts with id="projects"
          if (projects[0]) {
             const p = projects[0];
             const title = featuredContainer.querySelector('div.col-span-12.lg\\:col-span-4 h3');
             if (title) title.innerHTML = p.title.replace(' ', '<br/>');
             
             const desc = featuredContainer.querySelector('div.col-span-12.lg\\:col-span-4 p.font-sans');
             if (desc) desc.textContent = p.description;
             
             const img = featuredContainer.querySelector('img[alt="Abstract interface design"]');
             if (img) img.src = p.imageUrl || img.src;
          }
          
          // Slot 2 & 3: The grid below (E-Comm, Vision AI)
          const nextSection = projectsSection.nextElementSibling; 
          // The snippet shows HTML structure. After section#projects comes:
          // <section class="grid grid-cols-1 md:grid-cols-2 ...">
          if (nextSection && nextSection.classList.contains('grid-cols-1')) {
             const items = nextSection.querySelectorAll('div.group');
             items.forEach((item, idx) => {
                const p = projects[idx + 1]; // Offset 1
                if (p) {
                   const t = item.querySelector('h4');
                   if (t) t.textContent = p.title;
                   
                   const d = item.querySelector('p.font-sans');
                   if (d) d.textContent = p.description;
                   
                   const img = item.querySelector('img');
                   if (img) img.src = p.imageUrl || img.src;
                   
                   const tags = item.querySelector('.flex.gap-2');
                   if (tags) {
                     tags.innerHTML = p.techStack.slice(0,3).map(tag => 
                       \`<span class="text-[10px] font-bold uppercase text-gray-400">\${tag}</span>\`
                     ).join('');
                   }
                } else {
                   item.style.display = 'none';
                }
             });
          }
       }
    }

    // 3. Experience - "Dev Journey"
    const expSection = document.querySelectorAll('section')[3]; // Heuristic if ID missing
    // Or search for "2021 — Now"
    // Better: find section containing "Dev<br/>Journey"
    // The snippet has "Experience" section after "Dev Journey" block
    
    // Look for grid rows with dates
    const expRows = document.querySelectorAll('.grid.border-b.group');
    if (expRows.length > 0) {
       // We have rows. Capture template of one row.
       const template = expRows[0].outerHTML;
       // Find parent container
       const container = expRows[0].parentElement;
       
       container.innerHTML = '';
       
       experience.forEach(exp => {
          const temp = document.createElement('div');
          temp.innerHTML = template;
          const row = temp.firstElementChild; // .grid ...
          
          // Date
          const dateEl = row.querySelector('.col-span-12.lg\\:col-span-2');
          if (dateEl) dateEl.textContent = exp.period;
          
          // Role
          const roleEl = row.querySelector('h3');
          if (roleEl) roleEl.textContent = exp.role;
          
          // Company
          const compEl = row.querySelector('.font-sans.text-base');
          if (compEl) compEl.textContent = exp.company;
          
          container.appendChild(row);
       });
    }
  `;
}

function getHyunBarngTemplateLogic() {
  return `
    // 1. Personal Info
    // Nav Name
    const navName = document.querySelector('nav a.font-display');
    if (navName) navName.textContent = personalInfo.name.toUpperCase() + '_';

    // Hero Title "Build The Unseen Logic" -> Replace if user wants custom tagline, 
    // but maybe stick to name + tagline
    const heroTitle = document.querySelector('h1.font-display');
    if (heroTitle) {
      // Keep "Build The" style? Or replace fully.
      // Let's replace with Tagline split
      // "Full Stack Dev"
      heroTitle.innerHTML = personalInfo.tagline.replace(' ', '<br/> <span class="text-neutral-500">') + '</span>';
    }
    
    // Hero Subtitle
    const heroSub = document.querySelector('p.font-light.text-neutral-400');
    if (heroSub) heroSub.textContent = personalInfo.about.slice(0, 50) + '...';
    
    // About Section
    const aboutTitle = document.querySelector('#about h2');
    if (aboutTitle) aboutTitle.textContent = personalInfo.tagline;
    
    const aboutText = document.querySelector('#about p.text-lg');
    if (aboutText) aboutText.textContent = '"' + personalInfo.about + '"';
    
    // Location
    const loc = document.querySelector('#about .text-xs.font-bold');
    if (loc) loc.textContent = 'Based in ' + personalInfo.location;

    // 2. Skills
    const skillsGrid = document.querySelector('#skills .grid'); 
    // This has 3 groups: Languages, Frameworks, ML & Tools
    // We can just dump everything into the first valid group and hide others or try to categorize
    if (skillsGrid) {
       // Simple approach: clear grid, make one big category for "My Skills"
       skillsGrid.innerHTML = '';
       
       const groupDiv = document.createElement('div');
       groupDiv.className = 'group';
       
       // Icon
       groupDiv.innerHTML = \`
         <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
            <span class="material-icons-outlined text-4xl">code</span>
         </div>
         <h3 class="font-display text-xl uppercase mb-4">Core Tech</h3>
         <div class="flex flex-wrap justify-center gap-2">
           \${skills.map(s => \`<span class="px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400">\${s}</span>\`).join('')}
         </div>
       \`;
       
       skillsGrid.className = 'flex justify-center'; // Center single item
       skillsGrid.appendChild(groupDiv);
    }

    // 3. Projects
    const projectsContainer = document.querySelector('#projects .space-y-16');
    if (projectsContainer) {
       const articleTemplate = projectsContainer.querySelector('article');
       if (articleTemplate) {
         const template = articleTemplate.outerHTML;
         projectsContainer.innerHTML = '';
         
         projects.forEach(project => {
            const temp = document.createElement('div');
            temp.innerHTML = template;
            const article = temp.firstElementChild;
            
            // Image
            const img = article.querySelector('img');
            if (img) img.src = project.imageUrl || img.src;
            
            // Title
            const h3 = article.querySelector('h3');
            if (h3) h3.textContent = project.title;
            
            // Tags (Subtitle)
            const sub = article.querySelector('p.uppercase.tracking-widest');
            if (sub) sub.textContent = project.techStack.join(' | ');
            
            // Description
            const desc = article.querySelector('p.text-neutral-300');
            if (desc) desc.textContent = project.description;
            
            projectsContainer.appendChild(article);
         });
       }
    }

    // 4. Experience
    const expList = document.querySelector('#experience .space-y-12');
    if (expList) {
       const expTemplate = expList.querySelector('.relative.pl-8');
       if (expTemplate) {
         const tmpl = expTemplate.outerHTML;
         expList.innerHTML = '';
         
         experience.forEach(exp => {
            const temp = document.createElement('div');
            temp.innerHTML = tmpl;
            const item = temp.firstElementChild;
            
            // Role
            const role = item.querySelector('h3');
            if (role) role.textContent = exp.role;
            
            // Period
            const period = item.querySelector('.font-mono');
            if (period) period.textContent = exp.period;
            
            // Company
            const comp = item.querySelector('.mb-2.text-sm.font-bold');
            if (comp) comp.textContent = exp.company;
            
            // Description
            const desc = item.querySelector('p.text-sm.leading-relaxed');
            if (desc) desc.textContent = exp.description;
            
            expList.appendChild(item);
         });
       }
    }
  `;
}

function getGenericTemplateLogic() {
  return `
    // Fallback simple replacement
    const nameEls = document.querySelectorAll('h1, h2');
    nameEls.forEach(el => {
      if (el.textContent.includes('Alex')) el.textContent = personalInfo.name;
    });
  `;
}
