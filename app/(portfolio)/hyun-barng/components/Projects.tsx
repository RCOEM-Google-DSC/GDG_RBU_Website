import React from "react";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  linkUrl: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  subtitle,
  description,
  image,
  linkUrl,
}) => (
  <article className="relative group rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">
    <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
      />
    </div>
    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/50 to-transparent">
      <div className="md:flex justify-between items-end">
        <div className="mb-6 md:mb-0">
          <h3 className="text-white font-display text-3xl md:text-5xl uppercase mb-2">
            {title}
          </h3>
          <p className="text-neutral-400 text-xs uppercase tracking-widest">
            {subtitle}
          </p>
        </div>
        <div className="max-w-md">
          <p className="text-neutral-300 text-sm leading-relaxed mb-6">
            {description}
          </p>
          <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors"
          >
            View Project <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </article>
);

interface ProjectsProps {
  projects: Array<{
    id: string;
    title: string;
    subtitle: string;
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
    <section
      id="projects"
      className="bg-background-light dark:bg-background-dark py-24 px-4 md:px-0"
    >
      <div className="max-w-7xl mx-auto mb-16 px-6 text-center">
        <h2 className="text-neutral-900 dark:text-white font-display text-4xl uppercase tracking-wider">
          Featured Works
        </h2>
      </div>
      <div className="space-y-16 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            image={project.imageUrl}
            linkUrl={project.links.live || project.links.github || "#"}
          />
        ))}
      </div>
    </section>
  );
};
