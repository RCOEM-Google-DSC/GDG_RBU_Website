import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  hasAbout?: boolean;
  hasProjects?: boolean;
  hasSkills?: boolean;
  hasExperience?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  personalInfo,
  socials,
  hasAbout,
  hasProjects,
  hasSkills,
  hasExperience,
}) => {
  return (
    <footer className="bg-black py-20 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Column 1 - Contact */}
          {(personalInfo.email || personalInfo.phone) && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
                Get in Touch
              </h4>
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg md:text-xl text-white hover:text-red-600 transition-colors block mb-2"
                >
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <p className="text-zinc-400">{personalInfo.phone}</p>
              )}
            </div>
          )}

          {/* Column 2 - Socials */}
          {socials && socials.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
                Find Me Here
              </h4>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white hover:bg-zinc-900 transition-all rounded-full group"
                    aria-label={social.platform}
                  >
                    <ArrowUpRight
                      size={18}
                      className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            © {new Date().getFullYear()} {personalInfo.name}. All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            {hasAbout && (
              <Link
                href="#about"
                className="text-xs text-zinc-600 uppercase tracking-wider hover:text-zinc-400 transition-colors"
              >
                About
              </Link>
            )}
            {hasProjects && (
              <Link
                href="#projects"
                className="text-xs text-zinc-600 uppercase tracking-wider hover:text-zinc-400 transition-colors"
              >
                Projects
              </Link>
            )}
            {hasSkills && (
              <Link
                href="#skills"
                className="text-xs text-zinc-600 uppercase tracking-wider hover:text-zinc-400 transition-colors"
              >
                Skills
              </Link>
            )}
            {hasExperience && (
              <Link
                href="#experience"
                className="text-xs text-zinc-600 uppercase tracking-wider hover:text-zinc-400 transition-colors"
              >
                Experience
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
