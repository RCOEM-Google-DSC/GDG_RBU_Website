import React from 'react';
import { Code, Layers, Wrench } from 'lucide-react';

interface SkillsProps {
  skills: Array<{
    category: string;
    skills: string[];
  }>;
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const getIconForCategory = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('language')) return <Code className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />;
    if (cat.includes('framework') || cat.includes('library')) return <Layers className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />;
    return <Wrench className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />;
  };

  return (
    <section id="skills" className="grid grid-cols-1 md:grid-cols-3 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
      {skills.map((skillGroup, idx) => (
        <div key={idx} className="p-8 flex flex-col h-full">
          <h3 className="font-display text-lg font-bold uppercase border-b border-black pb-4 mb-6">{skillGroup.category}</h3>
          <ul className="space-y-3 font-sans text-sm">
            {skillGroup.skills.map((skill) => (
              <li key={skill} className="flex justify-between items-center group cursor-default">
                <span>{skill}</span>
                {getIconForCategory(skillGroup.category)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Skills;