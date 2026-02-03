import { Project, Experience, Skill, SkillCategory, SocialLink } from './types';

export const PROFILE = {
  name: "Alex Vandal",
  role: "Senior Full Stack Engineer | AI Architect",
  tagline: "Building scalable digital infrastructure and intuitive interfaces.",
  about: `I am a product-minded engineer with a passion for clean code and pragmatic solutions. 
  
  With over 8 years of experience in the tech industry, I specialize in bridging the gap between complex backend logic and seamless frontend experiences. My approach is rooted in simplicity and performance, avoiding over-engineering while ensuring scalability. I thrive in environments where technical excellence meets user-centric design.`,
  avatarUrl: "https://picsum.photos/400/400",
  email: "alex.vandal@example.com"
};

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", category: SkillCategory.LANGUAGES, featured: true },
  { name: "Python", category: SkillCategory.LANGUAGES },
  { name: "Go", category: SkillCategory.LANGUAGES },
  { name: "React / Next.js", category: SkillCategory.FRAMEWORKS, featured: true },
  { name: "Node.js", category: SkillCategory.FRAMEWORKS },
  { name: "Tailwind CSS", category: SkillCategory.FRAMEWORKS },
  { name: "PostgreSQL", category: SkillCategory.TOOLS },
  { name: "Docker & K8s", category: SkillCategory.TOOLS, featured: true },
  { name: "AWS", category: SkillCategory.TOOLS },
  { name: "GraphQL", category: SkillCategory.TOOLS },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "1",
    role: "Senior Software Engineer",
    company: "TechNova Solutions",
    startDate: "2021",
    endDate: null,
    description: "Leading the core platform team. Re-architected the legacy monolith into microservices, improving deployment frequency by 400%. Mentoring junior developers and defining code quality standards."
  },
  {
    id: "2",
    role: "Full Stack Developer",
    company: "Creative Pulse",
    startDate: "2018",
    endDate: "2021",
    description: "Developed and maintained client-facing web applications using React and Node.js. Collaborated closely with designers to implement pixel-perfect UIs."
  },
  {
    id: "3",
    role: "Junior Developer",
    company: "StartUp Inc",
    startDate: "2016",
    endDate: "2018",
    description: "Contributed to the frontend codebase. Implemented responsive designs and optimized page load performance."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "EcoStream Analytics",
    description: "A real-time data visualization dashboard for renewable energy consumption. Handles millions of data points with sub-second latency.",
    imageUrl: "https://picsum.photos/800/600?random=1",
    tags: ["React", "D3.js", "WebSockets"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  },
  {
    id: "p2",
    title: "Nexus CMS",
    description: "A headless CMS built for high-performance marketing sites. Features a custom rich-text editor and granular permission system.",
    imageUrl: "https://picsum.photos/800/600?random=2",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "p3",
    title: "AutoDeploy CLI",
    description: "Open-source command line tool to automate cloud infrastructure provisioning. 2k+ stars on GitHub.",
    imageUrl: "https://picsum.photos/800/600?random=3",
    tags: ["Go", "AWS SDK", "CLI"],
    githubUrl: "#"
  },
  {
    id: "p4",
    title: "Finance Tracker",
    description: "Personal finance PWA focused on privacy and offline-first capabilities.",
    imageUrl: "https://picsum.photos/800/600?random=4",
    tags: ["TypeScript", "PWA", "IndexedDB"],
    githubUrl: "#",
    liveUrl: "#"
  }
];