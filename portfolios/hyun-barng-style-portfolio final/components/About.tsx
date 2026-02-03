import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-8">
          Engineer The Confidence
        </h2>
        
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden mb-12 shadow-2xl group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhVWnA-1g3AeBewpGXhWk4r_7mBoRFB1GSV8Qq05V5cl-bL990piKrRTqVZeUQyB99NHk-AKf4Mqta0XAWwQLv-hgOmtQFalTqUjwsZ7cagyYbs3J7MsjNwzp-Ps16OAcVfcI3X1lMydlRkuPxid9kaZ1gYYkFcK9nnI8gJaBynnz4W9G_b01qbkN_mmRwxE_SGfWPcs8ld8oXrQ4eSs982IEY2c3GpBkVciChCU5R6PT2igy4lw5KbL2fg8b8NNZ06IGT7CVE0OE" 
            alt="Coding environment" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md px-8 py-4 border border-white/10 rounded-full transform group-hover:-translate-y-2 transition-transform duration-500">
              <p className="text-white font-mono text-xs md:text-sm">HELLO_WORLD.py</p>
            </div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          "...one of the few developers who bridges the gap between complex backend logic and seamless frontend experiences. Focused on scalability and user-centric architecture."
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Based in San Francisco
          </div>
        </div>
      </div>
    </section>
  );
};