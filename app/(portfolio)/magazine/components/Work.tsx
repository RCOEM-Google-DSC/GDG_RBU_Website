import React from 'react';
import { ArrowUpRight, Code, Eye } from 'lucide-react';

interface WorkProps {
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

const Work: React.FC<WorkProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  const featuredProject = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <div id="works">
      {/* Featured Project */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black">
        <div className="col-span-12 lg:col-span-8 relative group overflow-hidden border-b lg:border-b-0 border-black">
          <img 
            alt={featuredProject.title} 
            className="w-full h-[400px] lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            src={featuredProject.imageUrl} 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase">
            Featured Project
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="flex-grow p-8 flex flex-col justify-center">
            <h3 className="font-display text-4xl font-bold uppercase mb-4">{featuredProject.title}</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
              {featuredProject.description}
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-black divide-x divide-black">
            {featuredProject.links.github && (
              <a href={featuredProject.links.github} target="_blank" rel="noreferrer" className="p-6 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors font-display text-sm font-bold uppercase">
                <Code className="w-4 h-4" /> Source
              </a>
            )}
            {featuredProject.links.live && (
              <a href={featuredProject.links.live} target="_blank" rel="noreferrer" className="p-6 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors font-display text-sm font-bold uppercase">
                <Eye className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Grid Projects */}
      {gridProjects.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {gridProjects.map((project) => (
            <div key={project.id} className="group flex flex-col">
              <div className="relative overflow-hidden h-64 border-b border-black">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src={project.imageUrl} 
                />
              </div>
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display text-2xl font-bold uppercase">{project.title}</h4>
                  <div className="flex gap-2">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors">
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="font-sans text-xs text-gray-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Work;