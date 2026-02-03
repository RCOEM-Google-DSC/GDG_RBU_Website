import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black">
      <div className="col-span-12 lg:col-span-6 p-12 lg:p-24 flex flex-col justify-between min-h-[300px]">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">Contact</p>
          <a href="mailto:hello@alexvander.dev" className="font-display text-3xl lg:text-5xl font-black uppercase hover:underline decoration-2 underline-offset-4 decoration-black">
            Let's<br />Connect
          </a>
        </div>
        <div className="mt-8">
          <p className="font-sans text-xs text-gray-400">© 2024 Alex Vander. No cookies. No tracking.</p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col">
        <div className="flex-grow grid grid-cols-2 divide-x divide-black border-b border-black">
          <a href="#" className="flex items-center justify-center font-display font-bold uppercase hover:bg-black hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="flex items-center justify-center font-display font-bold uppercase hover:bg-black hover:text-white transition-colors">
            Twitter
          </a>
        </div>
        <div className="flex-grow grid grid-cols-2 divide-x divide-black">
          <a href="#" className="flex items-center justify-center font-display font-bold uppercase hover:bg-black hover:text-white transition-colors">
            Instagram
          </a>
          <button 
            onClick={scrollToTop}
            className="flex items-center justify-center bg-black text-white cursor-pointer group hover:bg-gray-800 transition-colors"
          >
            <ArrowUp className="transform group-hover:-translate-y-1 transition-transform w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;