export const STEPS = [
  { id: 1, title: "Template" },
  { id: 2, title: "Basic Info" },
  { id: 3, title: "Skills" },
  { id: 4, title: "Projects" },
  { id: 5, title: "Experience" },
  { id: 6, title: "Social" },
] as const;

export type Step = (typeof STEPS)[number];
