import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark pt-24 pb-12 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">Want to know more?</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12">Let's Chat!</h2>
        
        <a href="mailto:hello@example.com" className="inline-block bg-primary text-white dark:text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg">
          Contact Me
        </a>
        
        <div className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
          <div className="mb-4 md:mb-0">
            &copy; 2024 Alex Dev.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  );
};