import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Globe,
  LucideIcon,
} from "lucide-react";

interface FooterProps {
  personalInfo: {
    name: string;
    about: string;
    email: string;
  };
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  email: Mail,
  website: Globe,
};

const Footer: React.FC<FooterProps> = ({ personalInfo, socials }) => {
  if (!personalInfo) return null;

  return (
    <footer className="bg-background-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-display italic text-3xl mb-6">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400 max-w-sm mb-6">{personalInfo.about}</p>
            <div className="flex space-x-4">
              {socials.map((social) => {
                const IconComponent =
                  socialIconMap[social.platform.toLowerCase()] || Globe;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-white transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-white transition-colors"
                >
                  Experience
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
