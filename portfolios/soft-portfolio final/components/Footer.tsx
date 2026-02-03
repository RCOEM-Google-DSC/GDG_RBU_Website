import React from 'react';
import { NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-background-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-display italic text-3xl mb-6">Alex Jensen</h3>
            <p className="text-gray-400 max-w-sm mb-6">
              Crafting digital experiences with code and creativity. Specializing in full-stack development and machine learning applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-dribbble text-xl"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="mailto:alex@example.com" className="hover:text-white transition-colors">alex@example.com</a></li>
              <li>San Francisco, CA</li>
              <li className="pt-4">
                <a href="#" className="inline-block border-b border-gray-600 hover:border-white pb-1 transition-colors">Download Resume</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2023 Alex Jensen. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
