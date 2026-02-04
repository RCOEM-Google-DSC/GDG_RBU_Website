import React from "react";

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    about: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 border-b border-zinc-900 overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full grid grid-cols-6 md:grid-cols-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-zinc-700 h-full"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Main Title Area */}
        <div className="md:col-span-8">
          <div className="relative">
            {/* Decorative Element */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 mb-6 rounded-tr-3xl"></div>

            <h1 className="font-display font-bold text-7xl md:text-[9rem] leading-[0.85] tracking-tighter uppercase text-white mb-6">
              {personalInfo.name.split(" ")[0]}
              <br />
              <span className="text-zinc-500">
                {personalInfo.name.split(" ")[1] || ""}
              </span>
            </h1>
          </div>

          <div className="mt-8 md:mt-12 max-w-xl">
            <p className="font-mono text-red-600 text-sm mb-2 tracking-widest uppercase">
              {personalInfo.role}
            </p>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              {personalInfo.about}
            </p>
          </div>
        </div>

        {/* Right / Bottom area (Image/Visuals) */}
        <div className="md:col-span-4 flex flex-col items-end justify-end h-full mt-12 md:mt-0">
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://picsum.photos/300/200?grayscale"
              alt="Work 1"
              className="w-full h-24 object-cover rounded-sm"
            />
            <img
              src="https://picsum.photos/301/200?grayscale"
              alt="Work 2"
              className="w-full h-24 object-cover rounded-sm"
            />
            <img
              src="https://picsum.photos/302/200?grayscale"
              alt="Work 3"
              className="w-full h-24 object-cover rounded-sm"
            />
            <div className="w-full h-24 bg-zinc-900 flex items-center justify-center border border-zinc-800 rounded-sm">
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                Explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
