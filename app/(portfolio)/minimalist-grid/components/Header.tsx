import React from 'react';
import { Icon } from './Icons';

interface HeaderProps {
  name: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  email: string;
}

export const Header: React.FC<HeaderProps> = ({ name, socials, email }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-tight">
          {initials}.
        </span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
          <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
        </div>
        <a 
          href={`mailto:${email}`}
          className="md:hidden p-2 text-slate-900"
        >
          <Icon name="mail" />
        </a>
      </div>
    </nav>
  );
};