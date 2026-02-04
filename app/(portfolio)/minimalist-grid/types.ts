export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | null; // null implies "Present"
  description: string;
}

export enum SkillCategory {
  LANGUAGES = 'Languages',
  FRAMEWORKS = 'Frameworks',
  TOOLS = 'Tools & DevOps',
}

export interface Skill {
  name: string;
  category: SkillCategory;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Identifying string for icon component
}