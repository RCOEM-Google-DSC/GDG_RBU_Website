import { NavItem, Project, Experience, SkillCategory, Stat } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

export const PROJECTS: Project[] = [
  {
    title: 'Vantage Analytics',
    description: 'A financial data visualization platform using React and D3.js.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo0k-TFFLpRj27FoXVZ_9BMY3U3oLZKHCYQrLg9gxFrlcJNdGrVLOZYZ74yp3UX_29dBDyuY4uh__AlzE8opTLKX3jRCs3rTWq-_MJxNK7-nEZF7uBtWDNDNRxRxKr1RoXFohgI84N_ogm6T9nd4BLdpuhC7uyT5AZX8En6JCx0Yll3_49Anu6R4PF3qDmsdT6ErGE-JITbXMDPBaC27NebUOAcg69ef-RkQWsFn4cmSfS0TsT_hAVY4Ydo5Jk-xjWFNDI9QoK6x1r',
    tags: ['React', 'D3.js', 'Node.js'],
    links: { github: '#' }
  },
  {
    title: 'MediScan AI',
    description: 'Deep learning model for early detection of anomalies in X-ray scans.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGA48PKkl0-9RMSRN68_RzCdF7pO_bOnuV0_bi5GW8CYnnwfnnyRc8ywHHKb4LqEotWPrME59NmyapwwloyCPvsSvV8mcl3lMHcHhvmR4xWP9Zzg1xqRiXZZT1SrAeFI8WzxDvNKjWpqG-qwb-vc529NwRyUTGSJ7CMpu60SRaIzEDuK8Rwe3H36CS0wNaP5WVUJwk4Gj3bIKDijbfbMZyF6Bt-kOb_tZ8VHYp76oBW7E08qUCEn-Zu-RvhiFPDjvM8oTpgCJdWyx',
    tags: ['Python', 'PyTorch', 'FastAPI'],
    links: { github: '#' }
  },
  {
    title: 'Urban Wheels',
    description: 'E-commerce platform for high-end urban cycling gear.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2iajEFssF-wmXu5ythDYk6NzWR_jukR5TkoifWNe6JMM0-jemyQcDRAl7NFGDhW8gLMsaCsRVZHjtmZZImF7DoiIsV3M8mqGDlsdaGNayQ6ph1J38qmsNlxqn0hwVoLMftGroAiN4wduW3Ig8H2IXCMjf_IHKn4dFTBNA83ys27V8VzcFeNPpcQZFD_RuKJ2TTbsRLvRFy9157Mg-hPvyCpye6tZFXEnSYagovQl9sEW-7INz6o0sGjTsVsAikHgrVMUjN2nLfpF',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    links: { github: '#' }
  },
  {
    title: 'DevFlow CLI',
    description: 'Open-source command line tool to automate developer workflow setups.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASuqosmRUUeayNiFkNGyYbqahdEp_tzxoirgsPpITtdHpFPSPIaxjtnC4cDfUKtCj6gepuL0SmuI8FeBT3U6kfhfRuc-KBRhBufxtQ1jajpVyrDZYvhJb9EJ5VqPwiGeeFjEtU1ptgNwfxcUbjqyMLchXiPW5q8d29fuVB4G_r_zYEYxPPNyAOJKxbQZwfJMG_taiC7TViBXf_CKct27tHSwJ0E6HM3u83WF3XOJQf1cfsd0UtfcL4G_OtTIvsw5DajQnvu62oXv8j',
    tags: ['Rust', 'Shell', 'GitHub Actions'],
    links: { github: '#' }
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'TechCorp Solutions',
    period: '2021 — Present',
    description: 'Spearheaded the migration of legacy monoliths to microservices architecture, improving system uptime by 99.9%. Led a team of 5 developers in building a new customer-facing dashboard using Next.js and GraphQL.',
    tags: ['System Architecture', 'Team Leadership']
  },
  {
    role: 'Machine Learning Engineer',
    company: 'DataVision Inc.',
    period: '2019 — 2021',
    description: 'Developed predictive models for retail inventory management, reducing waste by 15%. Implemented NLP pipelines for sentiment analysis on customer feedback data using TensorFlow and Python.',
    tags: ['TensorFlow', 'Python', 'Data Pipeline']
  },
  {
    role: 'Web Developer',
    company: 'Creative Agency X',
    period: '2017 — 2019',
    description: 'Collaborated with designers to implement pixel-perfect frontend interfaces for high-profile clients. Optimized frontend performance achieving 95+ Lighthouse scores.',
    tags: ['JavaScript', 'Responsive Design']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: ['Python', 'TypeScript', 'JavaScript (ES6+)', 'SQL', 'Rust']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React / Next.js', 'FastAPI', 'PyTorch', 'Tailwind CSS', 'Scikit-learn']
  },
  {
    title: 'Tools & Infrastructure',
    skills: ['Docker', 'AWS', 'Git & CI/CD', 'PostgreSQL']
  }
];

export const STATS: Stat[] = [
  { value: '4+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '15', label: 'Happy Clients' },
  { value: '100%', label: 'Code Quality' }
];
