import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black" id="about">
      <div className="col-span-12 lg:col-span-7 p-8 lg:p-16 flex flex-col justify-center">
        <h2 className="font-display text-3xl lg:text-5xl font-black uppercase leading-tight mb-8">
          About My<br />Philosophy
        </h2>
        <div className="max-w-xl">
          <p className="font-sans text-sm lg:text-base leading-loose mb-6">
            I believe in the web as a medium for functional art. My approach combines rigorous engineering standards with an eye for stark, minimalist aesthetics. Code is not just about function; it's about structure, clarity, and intent.
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDmGGnqCa_oJceDO7fueg3fsNaMXKPc0gzS10zid7rGEuPYVrtIVk75nbGUC0Wm9Qqll66oAw3EZk3RhJVVcWAUUM2uTWSUlm0dx3A5_fsxFnn3nKXkQQTkSgZ9kWUfS3zvqiP3A-zsCYkgGjjHPXe3uSw5PEvmHm4PAPQGerTIaFM1L4dyT8Ch5MYA-QU5uv75ogST4eAxs9fAKVIWUszIQRpXHWlue8xppWCSGoqO2Q8CTZLcYxk-e-kRYKaSxdseP9z84i4HhI"
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