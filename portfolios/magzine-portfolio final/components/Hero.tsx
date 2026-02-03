import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black">
      {/* Portrait Column */}
      <div className="col-span-12 lg:col-span-5 relative overflow-hidden group border-b lg:border-b-0 border-black min-h-[400px] lg:min-h-[600px]">
        <img 
          alt="Portrait of developer" 
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV5oFS6Ol8SdQ4YJW9tPu_9SEGyrB3qjq7ZtcfLGUCZcDvtFfnVRKuJxeW0FnWBt6L5Pq-4jFLmLoEn7X-ky_jEJergmw5H_WuhEMqln7D7KPqzhx59_aaf65_ymxglBBvxNbX21ErgCAm6GkwI154qKd6NuaGKsRkfnqGB67VRnPblGTG4kgL1JlikuWWUmEw9nkqpRq62AgPvVw5BRLSmkHxXM0cD6PzTDCfp-_Jb2ZJ3HuaAyGTG2pG50AVF5NxFGRyWW5HzcQ"
        />
        <div className="absolute bottom-4 left-4 bg-white px-2 py-1 border border-black text-[10px] uppercase font-bold tracking-widest z-10">
          San Francisco, CA
        </div>
      </div>

      {/* Content Column */}
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
        <div className="p-8 lg:p-12">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">
            Full Stack Developer | ML Enthusiast
          </p>
          <h1 className="font-display text-6xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tight mb-6">
            Alex<br />Vander
          </h1>
          <p className="font-sans text-sm md:text-base max-w-md leading-relaxed text-gray-600">
            Building digital experiences with a focus on brutalist design principles and scalable architecture. Formerly at TechCorp, currently pushing pixels and training models.
          </p>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 border-t border-black h-full max-h-[120px] divide-x divide-black">
          <div className="p-6 flex flex-col justify-between hover:bg-black hover:text-white transition-colors cursor-default group">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-display font-bold">Open to Work</span>
            </div>
          </div>
          <a href="#projects" className="p-6 flex items-center justify-between hover:bg-black hover:text-white transition-colors cursor-pointer group">
            <span className="font-display font-bold uppercase tracking-wide">View Projects</span>
            <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;