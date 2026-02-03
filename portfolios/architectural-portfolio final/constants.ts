import { Project, ExperienceItem, SkillGroup, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "ALEX CHEN",
  role: "Full Stack Engineer | UI Specialist",
  about: "I am a product-focused engineer who believes in solving meaningful problems through elegant code and intuitive interfaces. My passion lies in the subtle intersection of technical performance and artistic design. I don't just build features; I craft experiences that respect the user's time and intelligence.",
  location: "San Francisco, CA",
  email: "alex.chen@example.com",
  phone: "+1 (555) 012-3456"
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Artceps",
    role: "UX Research; Interface Design",
    description: "A comprehensive digital marketplace for independent artists. Implements a novel auction mechanism and real-time gallery previews using WebGL. Connect with movies, people and cinema more than ever.",
    imageUrl: "https://picsum.photos/id/12/800/600",
    tags: ["React", "WebGL", "Node.js"],
    duration: "3 months",
    links: {
      live: "https://example.com",
      github: "https://github.com"
    }
  },
  {
    id: "2",
    title: "Sahayak",
    role: "Service Design",
    description: "An AI-powered dashboard for logistical supply chains. Connect with the right household help easily through our verified vetting system and real-time tracking.",
    imageUrl: "https://picsum.photos/id/24/800/600",
    tags: ["Next.js", "Python", "TensorFlow"],
    duration: "2 months",
    links: {
      live: "https://example.com"
    }
  },
  {
    id: "3",
    title: "STEMpedia",
    role: "Lead Developer",
    description: "An educational platform gamifying STEM concepts for early learners. Features interactive visualizations and progress tracking for educators.",
    imageUrl: "https://picsum.photos/id/35/800/600",
    tags: ["Vue", "D3.js", "Firebase"],
    duration: "5 months",
    links: {
      github: "https://github.com"
    }
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "TechFlow Systems",
    period: "2021 - Present",
    description: "Leading the migration of legacy dashboards to a modern React architecture. Improved load times by 40% and established a new internal design system."
  },
  {
    id: "2",
    role: "UI Developer",
    company: "Creative Grid",
    period: "2019 - 2021",
    description: "Collaborated with designers to implement pixel-perfect landing pages for Fortune 500 clients. Specialized in complex animations and interaction design."
  },
  {
    id: "3",
    role: "Junior Web Developer",
    company: "StartUp Inc",
    period: "2018 - 2019",
    description: "Built and maintained client-facing e-commerce storefronts. Assisted in backend API development using Express."
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL", "HTML5/CSS3"]
  },
  {
    category: "Frameworks",
    skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express", "Django"]
  },
  {
    category: "Tools",
    skills: ["Git", "Docker", "AWS", "Figma", "PostgreSQL", "Jest"]
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { platform: "Email", url: "mailto:alex.chen@example.com", icon: "mail" }
];