import React from 'react';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const TeamMemberCard = ({ name, role, photoUrl, githubUrl, linkedinUrl }) => {
  return (
    // Card Container
    <div className="group relative w-full max-w-sm h-[36rem] mx-auto rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ease-out cursor-pointer">
      
      {/* Image Section (70% height) 
        - Added grayscale transition for "moody" to "vibrant" effect
        - Added subtle overlay gradient for depth
      */}
      <div className="h-[72%] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
        
        <img 
          src={photoUrl} 
          alt={name} 
          className="h-full w-full object-cover object-center transform transition-all duration-700 ease-out will-change-transform grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
        />

        {/* Floating Action Button (appears on hover) */}
        <div className="absolute top-4 right-4 z-20 translate-y-[-150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-full text-slate-800 shadow-lg hover:bg-white hover:text-indigo-600">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Content Section (30% height)
        - Clean white background
        - Serif font for the name for editorial vibe
        - Staggered animation for content
      */}
      <div className="h-[28%] bg-white relative z-20 flex flex-col justify-center px-8 transition-transform duration-500 group-hover:-translate-y-1">
        
        {/* Name & Role */}
        <div className="space-y-1 mb-4">
          <h3 className="text-3xl font-serif italic text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
            {role}
          </p>
        </div>

        {/* Social Links - Minimalist line style */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <SocialLink href={githubUrl} icon={<Github size={18} />} />
          <SocialLink href={linkedinUrl} icon={<Linkedin size={18} />} />
          <SocialLink href="#" icon={<Twitter size={18} />} />
          
          <div className="ml-auto w-12 h-[1px] bg-slate-200 group-hover:w-20 group-hover:bg-indigo-300 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};

// Minimalist Social Link
const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-slate-800 transition-colors duration-300 p-1 hover:bg-slate-50 rounded-full"
  >
    {icon}
  </a>
);

// Main Layout
const Card = () => {
  const member = {
    name: "Alex Morgan",
    role: "Lead Developer",
    // Using a high-quality portrait that works well with the "editorial" style
    photoUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com"
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-8 font-sans">
      <TeamMemberCard {...member} />
    </div>
  );
};

export default Card;