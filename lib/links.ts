export type LinkItem = {
  id: string;
  title: string;
  logo: string,
  description?: string;
  url: string;
  
};

export const LINKS: LinkItem[] = [
  {
    id: "email",
    title: "Email",
    logo: "email",
    url: "gdsc@rknec.edu",
    description: "Contact us via email",
  },
  {
    id: "discord",
    title: "Join Discord",
    logo: "discord",
    url: "https://discord.com/invite/SBKyNqkaCp",
    description: "Join our community on Discord",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    logo: "linkedin",
    url: "https://www.linkedin.com/company/gdsc-rcoem/",
    description: "Connect with us on LinkedIn",
  },
  {
    id: "instagram",
    title: "Instagram",
    logo: "instagram",
    url: "https://www.instagram.com/gdg_rbu/",
    description: "Follow us on Instagram",
  },
  {
    id: "twitter",
    title: "Twitter",
    logo: "twitter",
    url: "https://twitter.com/gdsc_rcoem",
    description: "Follow us on Twitter",
  },
  {
    id: "contact",
    title: "YouTube",
    logo: "youtube",
    url: "https://youtube.com/@gdsc_rcoem",
    description: "Watch our latest videos and tutorials",
  },
];
