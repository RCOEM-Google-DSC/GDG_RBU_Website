"use client";
import React, { useState } from 'react';
import { Menu, AtSign } from 'lucide-react';

import Link from 'next/link';

interface HeaderProps {
  socials: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  hasWorks?: boolean;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasExperience?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  socials,
  hasWorks = true,
  hasAbout = true,
  hasSkills = true,
  hasExperience = true
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const githubLink = socials.find(s => s.platform.toLowerCase() === 'github')?.url || 'https://github.com';
  const emailLink = socials.find(s => s.platform.toLowerCase() === 'email')?.url || socials.find(s => s.url.includes('mailto:'))?.url || '#';

  const navLinks = [
    { label: "Works", href: "#projects", show: hasWorks },
    { label: "About", href: "#about", show: hasAbout },
    { label: "Skills", href: "#skills", show: hasSkills },
    { label: "Experience", href: "#experience", show: hasExperience },
  ].filter(link => link.show);

  return (
    <header className="grid grid-cols-12 border-b border-black divide-x divide-black sticky top-0 z-50 bg-white">
      {/* Mobile Menu Icon */}
      <div 
        className="col-span-12 md:col-span-1 p-4 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors border-b md:border-b-0 border-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </div>

      {/* Navigation Links - Hidden on mobile unless open, visible on md+ */}
      <div className={`col-span-12 md:col-span-11 grid grid-cols-12 ${isMenuOpen ? 'block' : 'hidden md:grid'}`}>
        {navLinks.map((link, idx) => (
          <Link 
            key={link.label} 
            href={link.href} 
            className={`col-span-12 md:col-span-2 p-4 flex items-center justify-center font-display font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer border-b md:border-b-0 border-black md:border-r ${idx === navLinks.length - 1 ? 'md:border-r' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        
        {/* Fill remaining space to keep layout consistent if links are few */}
        {navLinks.length < 5 && Array.from({ length: 5 - navLinks.length }).map((_, i) => (
          <div key={`spacer-${i}`} className="hidden md:block col-span-2 border-r border-black" />
        ))}

        <a href={githubLink} target="_blank" rel="noreferrer" className="col-span-12 md:col-span-1 p-4 flex items-center justify-center font-display font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer border-b md:border-b-0 border-black md:border-r">
          Github
        </a>
        <a href={emailLink.startsWith('mailto:') ? emailLink : `mailto:${emailLink}`} className="col-span-12 md:col-span-1 p-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
          <AtSign className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;