import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
  };
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, socials }) => {
  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center bg-background-dark text-white pt-20 px-6 overflow-hidden">
      {/* Background Abstract - Subtle gradient instead of hardcoded image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#404040_0%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-background-dark via-transparent to-background-dark"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-block bg-neutral-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border border-neutral-700 animate-fade-in-up">
          Portfolio {new Date().getFullYear()}
        </div>

        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none">
          {personalInfo.name.split(" ").slice(0, -1).join(" ")}
          <br />
          <span className="text-neutral-500">
            {personalInfo.name.split(" ").slice(-1)}
          </span>
        </h1>

        <p className="font-light text-neutral-400 text-sm md:text-base max-w-lg mx-auto tracking-wide uppercase">
          {personalInfo.role}
        </p>

        <div className="pt-8 flex justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                {social.platform}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ArrowDown className="w-5 h-5 text-neutral-500" />
      </div>
    </header>
  );
};
