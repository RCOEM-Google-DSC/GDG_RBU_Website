import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

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

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="py-20 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="block text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-center">
            Recent <span className="italic">deployments.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 shadow-md aspect-video">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-medium mb-2 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-light dark:text-muted-dark text-sm mb-3">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#"
            className="inline-block border-b border-black dark:border-white pb-1 hover:text-secondary dark:hover:text-secondary hover:border-secondary dark:hover:border-secondary transition-all"
          >
            View Archive on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
