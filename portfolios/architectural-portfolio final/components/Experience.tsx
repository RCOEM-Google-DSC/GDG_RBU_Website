import React from 'react';
import { EXPERIENCE } from '../constants';
import { SectionHeading } from './ui/SectionHeading';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-black border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Experience" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left empty col on large screens for layout rhythm */}
            <div className="hidden md:block md:col-span-2"></div>
            
            <div className="md:col-span-10 space-y-12">
                {EXPERIENCE.map((item) => (
                    <div key={item.id} className="relative pl-8 md:pl-0 border-l border-zinc-800 md:border-l-0">
                        {/* Mobile Timeline Dot */}
                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-accent md:hidden"></div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                            <div className="md:col-span-3">
                                <span className="text-accent font-mono text-sm tracking-widest uppercase block mb-1">
                                    {item.period}
                                </span>
                                <h4 className="text-white font-bold text-lg">{item.company}</h4>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide text-zinc-200 mb-4">
                                    {item.role}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};