import React from 'react';

interface ExperienceItemProps {
    role: string;
    period: string;
    company: string;
    description: string;
    isLatest?: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ role, period, company, description, isLatest }) => (
    <div className="relative pl-8 md:pl-12">
        <div className={`absolute -left-[5px] top-2 w-3 h-3 rounded-full border-2 border-white dark:border-background-dark ${isLatest ? 'bg-primary' : 'bg-neutral-400 dark:bg-neutral-600'}`}></div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="font-display text-xl uppercase">{role}</h3>
            <span className="text-xs font-mono text-neutral-500">{period}</span>
        </div>
        <div className="mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">{company}</div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
            {description}
        </p>
    </div>
);

interface ExperienceProps {
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    isLatest: boolean;
  }>;
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl uppercase tracking-tighter mb-4">The Journey</h2>
          <div className="w-24 h-[1px] bg-neutral-900 dark:bg-white mx-auto"></div>
        </div>
        
        <div className="relative border-l border-neutral-300 dark:border-neutral-700 ml-3 md:ml-0 space-y-12">
            {experience.map((job) => (
                <ExperienceItem 
                    key={job.id}
                    role={job.role}
                    period={job.period}
                    company={job.company}
                    description={job.description}
                    isLatest={job.isLatest}
                />
            ))}
        </div>
      </div>
    </section>
  );
};