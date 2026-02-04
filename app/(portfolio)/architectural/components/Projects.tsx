import React from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRight, Github } from "lucide-react";

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
  // Don't render if no projects
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-24 border-b border-zinc-900 bg-black relative"
    >
      {/* Background Grid Lines (Horizontal only for this section to break rhythm) */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full flex flex-col justify-between">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-zinc-700 w-full h-full"
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Projects" />

        <div className="space-y-0">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative grid grid-cols-1 md:grid-cols-12 border-t border-zinc-800 py-16 gap-8 transition-colors duration-500 hover:bg-zinc-900/30"
            >
              {/* Left Column: Details */}
              <div className="md:col-span-4 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <h3 className="font-display font-bold text-4xl text-white mb-6 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-8 md:mt-0">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-black transition-all"
                      aria-label="View live project"
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
                      aria-label="View on GitHub"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
