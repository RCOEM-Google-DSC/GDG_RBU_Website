import React, { useState } from 'react';
import { Menu, AtSign } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="grid grid-cols-12 border-b border-black divide-x divide-black sticky top-0 z-50 bg-white">
      {/* Mobile Menu Icon */}
      <div 
        className="col-span-12 md:col-span-1 p-4 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors border-b md:border-b-0 border-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </div>

      {/* Navigation Links - Hidden on mobile unless open, visible on md+ */}
      <div className={`col-span-12 md:col-span-11 grid grid-cols-12 ${isMenuOpen ? 'block' : 'hidden md:grid'}`}>
        <a href="#works" className="col-span-12 md:col-span-2 p-4 flex items-center justify-center font-display font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer border-b md:border-b-0 border-black md:border-r">
          Works
        </a>
        <a href="#about" className="col-span-12 md:col-span-2 p-4 flex items-center justify-center font-display font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer border-b md:border-b-0 border-black md:border-r">
          About
        </a>
        <div className="col-span-12 md:col-span-4 p-4 flex items-center justify-center font-display font-bold uppercase tracking-widest border-b md:border-b-0 border-black md:border-r bg-gray-50">
          Available for hire
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="col-span-12 md:col-span-2 p-4 flex items-center justify-center font-display font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer border-b md:border-b-0 border-black md:border-r">
          Github
        </a>
        <a href="mailto:hello@alexvander.dev" className="col-span-12 md:col-span-2 p-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
          <AtSign className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;