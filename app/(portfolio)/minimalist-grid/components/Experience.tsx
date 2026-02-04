import React from 'react';
import { Section } from './Section';

interface ExperienceProps {
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <Section title="Experience" id="experience">
      <div className="relative border-l border-slate-200 ml-3 space-y-12 pb-4">
        {experience.map((job) => (
          <div key={job.id} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white border-2 border-slate-900 rounded-full"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {job.role}
              </h3>
              <span className="font-mono text-sm text-slate-400 mt-1 sm:mt-0">
                {job.period}
              </span>
            </div>
            
            <div className="text-lg text-slate-800 font-medium mb-4">
              {job.company}
            </div>
            
            <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};