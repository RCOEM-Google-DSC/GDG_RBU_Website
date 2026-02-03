import React from 'react';

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className = "" }) => {
  return (
    <div className={`flex items-start gap-4 mb-16 ${className}`}>
      {/* The architectural "Quote" mark or logo element */}
      <div className="flex shrink-0">
        <div className="w-8 h-12 bg-white rounded-tl-lg"></div>
        <div className="w-8 h-12 bg-accent rounded-br-lg -ml-4 mt-4 mix-blend-screen"></div> 
        {/* Simple geometric logo abstraction similar to the image */}
      </div>
      <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-white">
        {title}
      </h2>
    </div>
  );
};