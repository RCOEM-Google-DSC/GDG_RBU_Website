import React from "react";
import { SectionHeading } from "./ui/SectionHeading";

interface SkillsProps {
  skills: Array<{
    category: string;
    skills: string[];
  }>;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Don't render if no skills
  if (
    !skills ||
    skills.length === 0 ||
    skills.every((group) => group.skills.length === 0)
  ) {
    return null;
  }

  return (
    <section id="skills" className="py-24 border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Etcetera" className="mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills
            .filter((group) => group.skills.length > 0)
            .map((group) => (
              <div key={group.category} className="space-y-6">
                <h3 className="font-display text-2xl uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm hover:border-accent hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
