import React from 'react';

export const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center bg-background-dark text-white pt-20 px-6 overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFNxIiiMPhfy3_dS3-JZq7D8dZS-l9oBvA9WX9cz0FSKFLsAOTvqysFngMoFmKjbEZ9dDtS91ljKYRD5cAubQdOwnjWnrqbN0xZWjIwCEHsSA_jj4bDxyVzzxPOanmtZQHlTApKpOMIM4FEmos0AUDkhnkvw9m4UeYAwHuOTreoSQCU3SkxJfUAcqtCO06osrsrcdQTdm2QoNc-G7ZZrSy3XBMtCXw_5UAaRWi6BzXLFlSEWq1wM9o9hpgkhbUIXaChNG97Ru5tVI" 
          alt="Abstract dark geometric shapes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-block bg-neutral-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border border-neutral-700 animate-fade-in-up">
          Portfolio 2024
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none">
          Build The<br/>
          <span className="text-neutral-500">Unseen</span> Logic
        </h1>
        
        <p className="font-light text-neutral-400 text-sm md:text-base max-w-lg mx-auto tracking-wide">
          FULL STACK DEVELOPER | MACHINE LEARNING ENTHUSIAST
        </p>
        
        <div className="pt-8 flex justify-center gap-6">
          <a href="#" className="group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
            <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
          <a href="#" className="group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
            <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <span className="material-icons-outlined text-neutral-500">arrow_downward</span>
      </div>
    </header>
  );
};