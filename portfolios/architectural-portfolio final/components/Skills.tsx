import React from 'react';
import { SKILLS } from '../constants';
import { SectionHeading } from './ui/SectionHeading';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Etcetera" className="mb-20" /> 
        {/* Using "Etcetera" as requested in image reference, though code structure calls it Skills */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SKILLS.map((group) => (
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
        
        {/* Decorative Quote from image "Not always working..." */}
        <div className="mt-24 pt-24 border-t border-zinc-900 relative">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-display text-4xl md:text-5xl text-white leading-tight">
                    Not always working <br />
                    <span className="text-zinc-600">(but always curious)</span>
                </p>
                <div className="mt-8 flex justify-center gap-4">
                     <div className="w-2 h-2 bg-accent rounded-full"></div>
                     <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                     <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};