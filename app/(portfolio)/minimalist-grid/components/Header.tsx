import React from 'react';
import Link from 'next/link';
import { Icon } from './Icons';

interface HeaderProps {
  name: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  email: string;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasExperience?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  name, 
  socials, 
  email,
  hasAbout = true,
  hasSkills = true,
  hasProjects = true,
  hasExperience = true
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
    
  const links = [
    { label: "About", href: "#about", show: hasAbout },
    { label: "Skills", href: "#skills", show: hasSkills },
    { label: "Projects", href: "#projects", show: hasProjects },
    { label: "Experience", href: "#experience", show: hasExperience },
  ].filter(link => link.show);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-tight">
          {initials}.
        </span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-slate-900 transition-colors">
              {link.label}
            </Link>
          ))}
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