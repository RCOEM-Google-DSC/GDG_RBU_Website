import React from "react";

interface SkillsProps {
  skills: string[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  // Since we only get a flat list of skills from schema, we can either display them flat 
  // or use a helper to categorize them if we want to preserve the original look.
  // For now, I'll display them in a single group to follow the schema strictly.

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] hidden lg:block rounded-xl overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1ILmeEMU5jA3xkHr_AUd7f12qJUTLq-pThvxU5BlJ8y3N9i8GpREfwYy4AcaLMdYHUoUpYoMZ7UUlY1dP-yBCOf-i90XdsFxYkduIoSBZas1Pl7IzJ-KD11VdmQVUOZCk2Xo-twDaF_9RSpvjBHzVcUtng4ANnQyFVRUkhoz4ob1F5kp5tlz8RtqO_PnTbws1ZBJjVBM4att-ygvQDxEdIokZ0EiH86YnXQV0MGHDqknYi_Uug6o9-pCgPMntmOPxOrf1RO4_QkvV"
              alt="Coding Setup"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </div>

          <div>
            <div className="inline-block border-b border-gray-300 dark:border-gray-600 pb-2 mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                Technical Proficiency
              </span>
            </div>
            <h2 className="font-display text-4xl mb-8">
              The tools I use to{" "}
              <span className="italic font-normal">create.</span>
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="font-display text-xl mb-4 italic">
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 dark:text-black bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-sm hover:border-secondary dark:hover:border-secondary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;