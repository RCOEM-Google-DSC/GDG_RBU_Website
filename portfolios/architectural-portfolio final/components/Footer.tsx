import React from 'react';
import { SOCIALS, PERSONAL_INFO } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
              Get in Touch
            </h4>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg md:text-xl text-white hover:text-accent transition-colors block mb-2">
              {PERSONAL_INFO.email}
            </a>
            <p className="text-zinc-400">{PERSONAL_INFO.phone}</p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
              Location
            </h4>
            <p className="text-lg md:text-xl text-white">
              {PERSONAL_INFO.location}
            </p>
            <p className="text-zinc-400">Open to remote work</p>
          </div>

           {/* Column 3 */}
           <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
              Find Me Here
            </h4>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white hover:bg-zinc-900 transition-all rounded-full group"
                  aria-label={social.platform}
                >
                  <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-zinc-600 uppercase tracking-wider cursor-pointer hover:text-zinc-400">About</span>
            <span className="text-xs text-zinc-600 uppercase tracking-wider cursor-pointer hover:text-zinc-400">Projects</span>
            <span className="text-xs text-zinc-600 uppercase tracking-wider cursor-pointer hover:text-zinc-400">Etcetera</span>
          </div>
        </div>

      </div>
    </footer>
  );
};