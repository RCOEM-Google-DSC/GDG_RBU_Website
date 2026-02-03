import React from 'react';
import { Section } from './components/Section';
import { Icon } from './components/Icons';
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, SOCIALS } from './constants';
import { SkillCategory } from './types';

const App: React.FC = () => {
  
  // Header / Hero
  const Hero = () => (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter text-slate-900 mb-6 leading-tight">
            {PROFILE.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl leading-relaxed border-l-4 border-slate-900 pl-6 mb-8">
            {PROFILE.role}
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                aria-label={social.platform}
              >
                <Icon name={social.icon} className="w-5 h-5" />
              </a>
            ))}
            <a 
              href={`mailto:${PROFILE.email}`}
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="md:col-span-4 flex justify-start md:justify-end">
          {/* Decorative abstract element mimicking the technical drawing lines in reference */}
          <div className="hidden md:block w-48 h-48 border border-slate-200 relative">
             <div className="absolute top-0 right-0 w-full h-px bg-slate-200 transform rotate-45 origin-top-left"></div>
             <div className="absolute bottom-0 left-0 w-px h-full bg-slate-200"></div>
             <div className="absolute bottom-4 right-4 text-6xl font-display font-bold text-slate-100">
               01
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Section
  const About = () => (
    <Section title="About" id="about">
      <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
        {PROFILE.about.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </div>
    </Section>
  );

  // Skills Section
  const Skills = () => {
    // Group skills by category
    const skillsByCategory = SKILLS.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<SkillCategory, typeof SKILLS>);

    return (
      <Section title="Skills" id="skills">
        <div className="grid grid-cols-1 gap-12">
          {(Object.keys(skillsByCategory) as SkillCategory[]).map((category) => (
            <div key={category} className="group">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory[category].map((skill) => (
                  <span
                    key={skill.name}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-sm border
                      ${skill.featured 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}
                      transition-colors
                    `}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  };

  // Projects Section
  const Projects = () => (
    <Section title="Selected Work" id="projects" fullWidth>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className={`bg-white p-6 md:p-10 flex flex-col h-full group hover:bg-slate-50 transition-colors ${index === 0 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4">
                  {project.title}
                </h3>
                <div className="flex gap-2 text-xs font-mono text-slate-500 mb-4">
                  {project.tags.map(tag => <span key={tag}>#{tag}</span>)}
                </div>
              </div>
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <Icon name="github" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="text-slate-400 hover:text-slate-900 transition-colors">
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

  // Experience Section
  const Experience = () => (
    <Section title="Experience" id="experience">
      <div className="relative border-l border-slate-200 ml-3 space-y-12 pb-4">
        {EXPERIENCE.map((job) => (
          <div key={job.id} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white border-2 border-slate-900 rounded-full"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {job.role}
              </h3>
              <span className="font-mono text-sm text-slate-400 mt-1 sm:mt-0">
                {job.startDate} — {job.endDate || "Present"}
              </span>
            </div>
            
            <div className="text-lg text-slate-800 font-medium mb-4">
              {job.company}
            </div>
            
            <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );

  // Footer Section
  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-white text-2xl font-bold font-display mb-2">
              {PROFILE.name}
            </h2>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex justify-start md:justify-end gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                className="hover:text-white transition-colors"
              >
                <Icon name={social.icon} className="w-6 h-6" />
                <span className="sr-only">{social.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white">
      {/* Top Navigation Bar mimicking news site header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <span className="font-display font-bold text-lg tracking-tight">
             AV.
           </span>
           <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
             <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
             <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
             <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
             <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
           </div>
           <a 
            href={`mailto:${PROFILE.email}`}
            className="md:hidden p-2 text-slate-900"
           >
             <Icon name="mail" />
           </a>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </main>

      <Footer />
    </div>
  );
};

export default App;