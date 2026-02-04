import React from 'react';

interface PhilosophyProps {
  about: string;
}

const Philosophy: React.FC<PhilosophyProps> = ({ about }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black" id="about">
      <div className="col-span-12 lg:col-span-7 p-8 lg:p-16 flex flex-col justify-center">
        <h2 className="font-display text-3xl lg:text-5xl font-black uppercase leading-tight mb-8">
          About My<br />Philosophy
        </h2>
        <div className="max-w-xl">
          <p className="font-sans text-sm lg:text-base leading-loose mb-6 whitespace-pre-line">
            {about || "I believe in the web as a medium for functional art. My approach combines rigorous engineering standards with an eye for stark, minimalist aesthetics. Code is not just about function; it's about structure, clarity, and intent."}
          </p>
          <p className="font-sans text-xs italic text-gray-500">
            "Simplicity is the ultimate sophistication."
          </p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 relative overflow-hidden min-h-[300px]">
        <img 
          alt="Workspace desk" 
          className="absolute inset-0 w-full h-full object-cover grayscale" 
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?fit=crop&w=800&q=80"
        />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
          <p className="writing-vertical font-display font-bold uppercase tracking-widest text-xs whitespace-nowrap opacity-50">
            Code Design Build Deploy Code Design Build Deploy
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;