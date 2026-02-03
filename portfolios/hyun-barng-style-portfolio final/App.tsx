import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';

// Icons are loaded via Google Fonts in index.html to match the reference exactly,
// but we could swap to Lucide-React if preferred. Keeping strictly to visual reference.

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Default to dark mode if system prefers or if no preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <div className="w-full h-24 bg-background-light dark:bg-background-dark flex justify-center items-center overflow-hidden">
            <div className="h-full w-[1px] bg-neutral-300 dark:bg-neutral-800 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-neutral-900 dark:border-white bg-transparent"></div>
            </div>
        </div>
        <About />
        <Skills />
        <div className="flex justify-center bg-background-light dark:bg-background-dark py-12">
            <div className="flex space-x-2">
                <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
                <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
                <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
            </div>
        </div>
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default App;