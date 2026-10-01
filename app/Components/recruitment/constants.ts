// Domain definitions, form options, and constants for the recruitment system

export const DOMAINS = [
  {
    id: "web-dev",
    name: "Web Development",
    shortName: "WEB DEV",
    color: "#4285F4",
    description:
      "Build modern, responsive web applications using cutting-edge technologies like React, Next.js, and more. Shape the digital face of GDG RBU.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "cp",
    name: "Competitive Programming",
    shortName: "CP",
    color: "#EA4335",
    description:
      "Sharpen your problem-solving skills, participate in coding contests, and represent GDG RBU on global competitive programming platforms.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    shortName: "DESIGN",
    color: "#FBBC04",
    description:
      "Craft stunning visuals, UI/UX designs, and brand assets that define the look and feel of GDG RBU across all platforms.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "mac",
    name: "ML / AI / Cloud",
    shortName: "MAC",
    color: "#34A853",
    description:
      "Explore machine learning, artificial intelligence, and cloud computing. Build intelligent solutions and deploy them at scale.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "management",
    name: "Management",
    shortName: "MANAGEMENT",
    color: "#8338EC",
    description:
      "Lead and organize events, manage teams, handle logistics, and ensure every GDG RBU initiative runs smoothly from start to finish.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    shortName: "MARKETING",
    color: "#FF6B35",
    description:
      "Drive outreach, build partnerships, and amplify GDG RBU's presence. Create strategies that bring our community together.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
  {
    id: "socials",
    name: "Socials",
    shortName: "SOCIALS",
    color: "#E91E63",
    description:
      "Create engaging content, manage social media channels, capture events through photography and video, and tell the GDG RBU story.",
    tasks: [
      {
        title: "Task details coming soon",
        description: "Check back shortly for the full task brief.",
      },
    ],
  },
] as const;

export type DomainId = (typeof DOMAINS)[number]["id"];

// Domain preference options for the radio grid
export const DOMAIN_PREFERENCE_OPTIONS = [
  "Tech Team",
  "Management Team",
  "Competitive Programming Team",
  "Design Team",
  "Socials Team",
  "Marketing",
] as const;

export const YEAR_OPTIONS = [
  { label: "2nd Year", value: 2 },
  { label: "3rd Year", value: 3 },
] as const;

export const TECH_DOMAIN_OPTIONS = [
  "Web Development",
  "Android Development",
  "Flutter",
  "Cloud Computing",
  "Machine Learning",
  "None",
] as const;

export const SOCIALS_DOMAIN_OPTIONS = [
  "Video Editing",
  "Content Writing",
  "Social and Outreach",
  "Photography",
  "None",
] as const;

// Form data shape
export type RecruitmentFormData = {
  // Personal details
  name: string;
  email: string;
  phone: string;
  year: number | null;
  branch: string;

  // Domain preferences (radio grid)
  domain_pref_1: string;
  domain_pref_2: string;
  domain_pref_3: string;

  // Sub-domain preferences
  tech_domain: string;
  socials_domain: string;

  // Profile links
  linkedin_url: string;
  github_url: string;
  codeforces_url: string;
  codechef_url: string;
  other_cp_url: string;

  // About
  cgpa: string;
  resume_url: string;
  resume_filename: string;
  motive: string;
  value_addition: string;
  projects: string;

  // Task submission
  task_domain: string;
  task_links: string[];
  task_details: Record<string, unknown>;
};

export const EMPTY_FORM: RecruitmentFormData = {
  name: "",
  email: "",
  phone: "",
  year: null,
  branch: "",
  domain_pref_1: "",
  domain_pref_2: "",
  domain_pref_3: "",
  tech_domain: "",
  socials_domain: "",
  linkedin_url: "",
  github_url: "",
  codeforces_url: "",
  codechef_url: "",
  other_cp_url: "",
  cgpa: "",
  resume_url: "",
  resume_filename: "",
  motive: "",
  value_addition: "",
  projects: "",
  task_domain: "",
  task_links: [""],
  task_details: {},
};

export const LOCALSTORAGE_KEY = "gdg_recruitment_draft";
