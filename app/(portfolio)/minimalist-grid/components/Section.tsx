import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "", id, fullWidth = false }) => {
  return (
    <section id={id} className={`border-t border-slate-200 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 min-h-[200px]">
          {/* Title Column */}
          <div className="md:col-span-3 py-8 md:py-12 md:border-r border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 sticky top-24">
              {title}
            </h2>
          </div>
          
          {/* Content Column */}
          <div className={`md:col-span-9 py-8 md:py-12 ${fullWidth ? '' : 'md:pl-4'}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};