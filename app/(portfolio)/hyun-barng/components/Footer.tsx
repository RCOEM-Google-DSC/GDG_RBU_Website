import React from 'react';
import Link from 'next/link';

interface FooterProps {
  name: string;
  email: string;
  socials: Array<{
    platform: string;
    url: string;
  }>;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasExperience?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  email,
  socials,
  hasAbout,
  hasSkills,
  hasProjects,
  hasExperience,
}) => {
  return (
    <footer className="bg-background-light dark:bg-background-dark pt-24 pb-12 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">Want to know more?</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12">Let's Chat!</h2>
        
        <a href={`mailto:${email}`} className="inline-block bg-primary text-white dark:text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg">
          Contact Me
        </a>

        <nav className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link href="#" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Home</Link>
          {hasAbout && <Link href="#about" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">About</Link>}
          {hasSkills && <Link href="#skills" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Skills</Link>}
          {hasProjects && <Link href="#projects" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Projects</Link>}
          {hasExperience && <Link href="#experience" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Experience</Link>}
        </nav>
        
        <div className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {name}.
          </div>
          <div className="flex space-x-6">
            {socials.map((social) => (
              <a 
                key={social.platform}
                href={social.url} 
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};