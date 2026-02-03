import React from 'react';
import { PROJECTS } from '../constants';
import { SectionHeading } from './ui/SectionHeading';
import { ArrowUpRight, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-b border-zinc-900 bg-black relative">
       {/* Background Grid Lines (Horizontal only for this section to break rhythm) */}
       <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="h-full w-full flex flex-col justify-between">
            {Array.from({ length: 10 }).map((_, i) => (
               <div key={i} className="border-b border-zinc-700 w-full h-full"></div>
            ))}
         </div>
       </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Projects" />

        <div className="space-y-0">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative grid grid-cols-1 md:grid-cols-12 border-t border-zinc-800 py-16 gap-8 transition-colors duration-500 hover:bg-zinc-900/30`}
            >
              
              {/* Left Column: Details */}
              <div className="md:col-span-4 flex flex-col justify-between order-2 md:order-1">
                <div>
                   {project.role && (
                    <span className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                      {project.role}
                    </span>
                   )}
                   <h3 className="font-display font-bold text-4xl text-white mb-6 group-hover:text-accent transition-colors">
                     {project.title}
                   </h3>
                   
                   {project.duration && (
                     <div className="mb-6">
                       <span className="text-xs text-zinc-500 uppercase tracking-wide">Duration</span>
                       <p className="text-zinc-300">{project.duration}</p>
                     </div>
                   )}
                </div>

                <div className="flex items-center gap-4 mt-8 md:mt-0">
                  {project.links.live && (
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-black transition-all"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
                  {project.links.github && (
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:bg-white hover:border-white hover:text-black transition-all"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="md:col-span-8 order-1 md:order-2">
                <div className="relative overflow-hidden aspect-video md:aspect-[21/9] bg-zinc-900 border border-zinc-800">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Overlay Text/Description */}
                    <div className="absolute bottom-0 right-0 p-8 bg-black/80 backdrop-blur-md max-w-md border-t border-l border-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <p className="text-zinc-300 text-sm leading-relaxed">
                         {project.description}
                       </p>
                       <div className="flex gap-2 mt-4 flex-wrap">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase border border-zinc-600 px-2 py-1 text-zinc-400">
                              {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};