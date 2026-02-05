import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import Link from 'next/link';

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    email: string;
    phone: string;
    profileImage: string | null;
  };
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  // Split name for the magazine layout if it contains a space
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black">
      {/* Portrait Column */}
      <div className="col-span-12 lg:col-span-5 relative overflow-hidden group border-b lg:border-b-0 border-black min-h-[400px] lg:min-h-[600px]">
        {personalInfo.profileImage ? (
          <img 
            alt={`Portrait of ${personalInfo.name}`} 
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            src={personalInfo.profileImage} 
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-neutral-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
            <span className="font-display font-black text-9xl opacity-10">{firstName.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Content Column */}
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
        <div className="p-8 lg:p-12">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">
            {personalInfo.role}
          </p>
          <h1 className="font-display text-6xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tight mb-6">
            {firstName}{lastName && <><br />{lastName}</>}
          </h1>
          {personalInfo.about && (
            <p className="font-sans text-sm md:text-base max-w-md leading-relaxed text-gray-700">
              {personalInfo.about}
            </p>
          )}
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 border-t border-black h-full max-h-[120px]">
          <Link href="#projects" className="p-10 flex items-center justify-between hover:bg-black hover:text-white transition-colors cursor-pointer group">
            <span className="font-display font-bold text-xl uppercase tracking-widest">View Selected Works</span>
            <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;