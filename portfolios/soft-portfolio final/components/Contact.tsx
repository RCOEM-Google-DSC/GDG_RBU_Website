import React from 'react';
import { STATS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-3 py-1 mb-6 border border-gray-600 rounded-full text-xs font-medium tracking-widest uppercase text-gray-400">
          Get In Touch
        </span>
        <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">
          Ready to bring your <br /> <span className="italic text-gray-400">ideas to life?</span>
        </h2>
        
        <div className="flex justify-center">
          <a href="mailto:hello@alexjensen.dev" className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-secondary hover:text-white transition-colors">
            Book a Free Call
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-gray-800 pt-10">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-xs uppercase text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
