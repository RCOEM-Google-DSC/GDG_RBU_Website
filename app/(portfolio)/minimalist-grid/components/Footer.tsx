import React from 'react';
import Link from 'next/link';
import { Icon } from './Icons';

interface FooterProps {
  name: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasExperience?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  socials,
  hasAbout,
  hasSkills,
  hasProjects,
  hasExperience,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold font-display mb-2">
              {name}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex gap-6">
              {socials.map((social) => (
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

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              <Link href="#" className="hover:text-white transition-colors text-sm">Home</Link>
              {hasAbout && <Link href="#about" className="hover:text-white transition-colors text-sm">About</Link>}
              {hasSkills && <Link href="#skills" className="hover:text-white transition-colors text-sm">Skills</Link>}
              {hasProjects && <Link href="#projects" className="hover:text-white transition-colors text-sm">Projects</Link>}
              {hasExperience && <Link href="#experience" className="hover:text-white transition-colors text-sm">Experience</Link>}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};