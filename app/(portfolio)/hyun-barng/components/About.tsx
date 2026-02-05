import React from 'react';

interface AboutProps {
  about: string;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  if (!about) return null;

  return (
    <section id="about" className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-8">
          Beyond The <span className="text-neutral-500">Surface</span>
        </h2>
        
        <div className="text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto space-y-4">
          {about.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};