"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  className?: string;
  number?: string;
  title?: string;
  description?: string;
  category?: string;
  onClick?: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  className,
  number = "5",
  title = "Universal ticket",
  description = "Receive a universal entry ticket to five events related to modern technologies – You can read about the details by clicking here.",
  category = "CONFIRMATION",
  onClick
}) => {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      {/* 
        Main Card Container 
        Using clip-path for the custom shape:
        - Top-right diagonal cut
        - Left notch
        - Rounded corners are handled by border-radius where clip-path doesn't cut
      */}
      <div className="filter drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 h-full">
        <div 
          className="relative bg-white text-black p-6 md:p-8 rounded-[2rem] overflow-hidden h-full min-h-[340px] flex flex-col justify-between"
          style={{
            clipPath: `polygon(
              0 0, 
              calc(100% - 50px) 0, 
              100% 50px, 
              100% 100%, 
              0 100%, 
              0 calc(50% + 15px), 
              15px 50%, 
              0 calc(50% - 15px)
            )`
          }}
        >
          {/* Background Number */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-bold text-gray-100 select-none pointer-events-none z-0 leading-none">
            {number}
          </div>

          {/* Header Section */}
          <div className="relative z-10 space-y-5 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                {category}
              </span>
            </div>
            
            <div className="flex items-start justify-between gap-4 pt-4">
              <h3 className="text-3xl font-bold leading-[1.1] tracking-tight max-w-[70%]">
                {title}
              </h3>
              <button 
                onClick={onClick}
                className="flex-shrink-0 w-12 h-12 bg-[#EDF256] rounded-full flex items-center justify-center hover:bg-[#dce04e] transition-colors cursor-pointer mt-1"
                aria-label="View details"
              >
                <ArrowRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="relative z-10 space-y-5 mt-auto pt-8">
             {/* Progress Bar / Separator */}
             <div className="w-full h-0.5 bg-gray-100 relative rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-200/80"></div> 
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
             </div>

             <p className="text-xs text-gray-500 leading-relaxed font-medium pr-2">
               {description.split('clicking here')[0]}
               <a href="#" className="underline decoration-1 underline-offset-2 text-black hover:text-gray-700 transition-colors">
                 clicking here.
               </a>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
