import React from 'react';
import { Icon } from './Icons';

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    email: string;
  };
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, socials }) => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter text-slate-900 mb-6 leading-tight">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl leading-relaxed border-l-4 border-slate-900 pl-6 mb-8">
            {personalInfo.role}
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
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
              href={`mailto:${personalInfo.email}`}
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="md:col-span-4 flex justify-start md:justify-end">
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
};