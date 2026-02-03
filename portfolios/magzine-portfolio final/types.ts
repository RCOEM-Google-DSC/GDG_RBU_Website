export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
  links: {
    source: string;
    demo?: string;
  };
}

export interface Experience {
  period: string;
  role: string;
  company: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
