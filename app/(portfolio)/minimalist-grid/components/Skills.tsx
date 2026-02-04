import React from 'react';
import { Section } from './Section';

interface SkillsProps {
  skills: Array<{
    category: string;
    skills: string[];
  }>;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <Section title="Skills" id="skills">
      <div className="grid grid-cols-1 gap-12">
        {skills.map((group) => (
          <div key={group.category} className="group">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-medium rounded-sm border bg-white text-slate-700 border-slate-200 hover:border-slate-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};