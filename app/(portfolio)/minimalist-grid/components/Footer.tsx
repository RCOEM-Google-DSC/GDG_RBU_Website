import React from 'react';
import { Icon } from './Icons';

interface FooterProps {
  name: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export const Footer: React.FC<FooterProps> = ({ name, socials }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-white text-2xl font-bold font-display mb-2">
              {name}
            </h2>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex justify-start md:justify-end gap-6">
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
      </div>
    </footer>
  );
};