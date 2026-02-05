import React from "react";
import Link from "next/link";

interface HeaderProps {
  name?: string;
  socials?: Array<{
    platform: string;
    url: string;
  }>;
  hasAbout?: boolean;
  hasProjects?: boolean;
  hasSkills?: boolean;
  hasExperience?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  name, 
  socials,
  hasAbout = true,
  hasProjects = true,
  hasSkills = true,
  hasExperience = true
}) => {
  const links = [
    { label: "About", href: "#about", show: hasAbout },
    { label: "Projects", href: "#projects", show: hasProjects },
    { label: "Skills", href: "#skills", show: hasSkills },
    { label: "Experience", href: "#experience", show: hasExperience },
  ].filter(link => link.show);

  const displayName = name ? name.toUpperCase() : "PORTFOLIO";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-display font-bold text-xl text-accent tracking-widest text-red-600">
          {displayName}<span className="text-white">.</span>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden text-xs text-zinc-500 uppercase tracking-widest">
          Menu
        </div>
      </div>
    </nav>
  );
};
