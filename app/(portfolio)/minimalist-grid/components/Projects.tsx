import React from 'react';
import { Section } from './Section';
import { Icon } from './Icons';

interface ProjectsProps {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    links: {
      live?: string;
      github?: string;
    };
  }>;
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <Section title="Selected Work" id="projects" fullWidth>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`bg-white p-6 md:p-10 flex flex-col h-full group hover:bg-slate-50 transition-colors ${index === 0 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4">
                  {project.title}
                </h3>
              </div>
              <div className="flex gap-3">
                {project.links.github && (
                  <a href={project.links.github} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <Icon name="github" />
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <Icon name="link" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-slate-600 mb-8 max-w-xl leading-relaxed">
              {project.description}
            </p>

            <div className="mt-auto">
               <div className="overflow-hidden bg-slate-100 border border-slate-100 aspect-video relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};