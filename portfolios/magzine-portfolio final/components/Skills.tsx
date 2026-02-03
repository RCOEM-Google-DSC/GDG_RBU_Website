import React from 'react';
import { Code, Layers, Wrench } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
      <div className="p-8 flex flex-col h-full">
        <h3 className="font-display text-lg font-bold uppercase border-b border-black pb-4 mb-6">Languages</h3>
        <ul className="space-y-3 font-sans text-sm">
          {['JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5 & CSS3', 'SQL'].map((skill) => (
            <li key={skill} className="flex justify-between items-center group cursor-default">
              <span>{skill}</span>
              <Code className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 flex flex-col h-full">
        <h3 className="font-display text-lg font-bold uppercase border-b border-black pb-4 mb-6">Frameworks</h3>
        <ul className="space-y-3 font-sans text-sm">
          {['React / Next.js', 'Vue.js', 'Tailwind CSS', 'Django', 'TensorFlow'].map((skill) => (
            <li key={skill} className="flex justify-between items-center group cursor-default">
              <span>{skill}</span>
              <Layers className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 flex flex-col h-full">
        <h3 className="font-display text-lg font-bold uppercase border-b border-black pb-4 mb-6">Tools</h3>
        <ul className="space-y-3 font-sans text-sm">
          {['Git & GitHub', 'Docker', 'AWS (EC2, S3)', 'Figma', 'Postman'].map((skill) => (
            <li key={skill} className="flex justify-between items-center group cursor-default">
              <span>{skill}</span>
              <Wrench className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;