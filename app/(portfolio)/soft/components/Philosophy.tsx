import React from 'react';
interface PhilosophyProps {
  about?: string;
}

const Philosophy: React.FC<PhilosophyProps> = ({ about }) => {
  if (!about) return null;

  return (
    <section id="about" className="py-20 bg-white  dark:bg-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <span className="px-4 py-2 border-y border-gray-200   dark:border-gray-700 text-xs font-semibold tracking-[0.2em] uppercase">My Philosophy</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-center mb-16 leading-tight">
          About <span className="italic text-secondary">My Work.</span>
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-light dark:text-muted-dark text-lg leading-relaxed whitespace-pre-line">
            {about}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
