import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceProps {
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="border-b border-black">
      {experience.map((exp) => (
        <div key={exp.id} className="grid grid-cols-1 lg:grid-cols-12 border-b border-black last:border-b-0 group hover:bg-gray-50 transition-colors">
          <div className="col-span-12 lg:col-span-2 p-6 flex items-center font-display font-bold text-lg text-gray-400 group-hover:text-black transition-colors">
            {exp.period}
          </div>
          <div className="col-span-12 lg:col-span-4 p-6 flex items-center border-t lg:border-t-0 lg:border-l border-black">
            <h3 className="font-display text-xl font-bold uppercase">{exp.role}</h3>
          </div>
          <div className="col-span-12 lg:col-span-6 p-6 flex items-center justify-between border-t lg:border-t-0 lg:border-l border-black">
            <div className="flex flex-col">
              <span className="font-sans text-base font-medium">{exp.company}</span>
              <p className="font-sans text-xs text-gray-500 mt-1 max-w-lg">{exp.description}</p>
            </div>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;