import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md h-16 border-b border-neutral-200 dark:border-neutral-800' 
        : 'bg-transparent h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="font-display uppercase text-xl tracking-tighter hover:opacity-70 transition-opacity text-neutral-900 dark:text-white">
          ALEX DEV_
        </a>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">
          {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          <span className="material-icons-outlined text-sm">brightness_4</span>
        </button>
      </div>
    </nav>
  );
};