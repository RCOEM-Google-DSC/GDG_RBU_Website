import React from "react";

interface ExperienceProps {
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <span className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-semibold tracking-[0.2em] uppercase">
            Career History
          </span>
        </div>

        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-4 md:ml-0 space-y-12">
          {experience.map((job, index) => (
            <div key={job.id} className="relative pl-8 md:pl-12 group">
              <span
                className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-background-dark transition-colors ${index === 0 ? "bg-secondary" : "bg-gray-300 dark:bg-gray-600 group-hover:bg-secondary"}`}
              ></span>

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h3 className="text-2xl font-display">{job.role}</h3>
                <span className="font-mono text-sm text-muted-light dark:text-muted-dark">
                  {job.period}
                </span>
              </div>

              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500 dark:text-gray-400">
                {job.company}
              </h4>
              <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-4">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;