import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2021 — Now',
      role: 'Senior Frontend Engineer',
      company: 'TechCorp Solutions',
    },
    {
      period: '2019 — 2021',
      role: 'Full Stack Developer',
      company: 'Creative Agency X',
    },
    {
      period: '2018 — 2019',
      role: 'Junior Web Developer',
      company: 'StartUp Inc.',
    },
  ];

  return (
    <section className="border-b border-black">
      {experiences.map((exp, index) => (
        <div key={index} className="grid grid-cols-1 lg:grid-cols-12 border-b border-black last:border-b-0 group hover:bg-gray-50 transition-colors">
          <div className="col-span-12 lg:col-span-2 p-6 flex items-center font-display font-bold text-lg text-gray-400 group-hover:text-black transition-colors">
            {exp.period}
          </div>
          <div className="col-span-12 lg:col-span-4 p-6 flex items-center border-t lg:border-t-0 lg:border-l border-black">
            <h3 className="font-display text-xl font-bold uppercase">{exp.role}</h3>
          </div>
          <div className="col-span-12 lg:col-span-6 p-6 flex items-center justify-between border-t lg:border-t-0 lg:border-l border-black">
            <span className="font-sans text-base font-medium">{exp.company}</span>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;