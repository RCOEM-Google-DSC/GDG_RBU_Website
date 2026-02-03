import React from 'react';

const SkillCard: React.FC<{ 
    icon: string; 
    title: string; 
    skills: string[] 
}> = ({ icon, title, skills }) => (
    <div className="group">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
            <span className="material-icons-outlined text-4xl">{icon}</span>
        </div>
        <h3 className="font-display text-xl uppercase mb-4">{title}</h3>
        <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl uppercase tracking-tighter mb-4">Complexity Made Simple</h2>
          <div className="w-24 h-[1px] bg-neutral-300 dark:bg-neutral-700 mx-auto"></div>
          <p className="mt-4 text-neutral-500 text-sm uppercase tracking-wider">The tech stack defining my work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <SkillCard 
                icon="code" 
                title="Languages" 
                skills={["Python", "JavaScript/TS", "Rust", "SQL"]} 
            />
            <SkillCard 
                icon="layers" 
                title="Frameworks" 
                skills={["React / Next.js", "Django", "FastAPI", "Tailwind"]} 
            />
            <SkillCard 
                icon="psychology" 
                title="ML & Tools" 
                skills={["PyTorch", "TensorFlow", "Docker", "AWS"]} 
            />
        </div>
      </div>
    </section>
  );
};