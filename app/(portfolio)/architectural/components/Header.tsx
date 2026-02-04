import React from "react";

interface HeaderProps {
  socials?: Array<{
    platform: string;
    url: string;
  }>;
}

export const Header: React.FC<HeaderProps> = ({ socials }) => {
  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-display font-bold text-xl text-accent tracking-widest text-red-600">
          A.CHEN<span className="text-white">.</span>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
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
