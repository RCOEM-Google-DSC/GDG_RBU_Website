import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpcomingEventCardProps } from '@/lib/types';

const UpcomingEvent = ({ id, title, date, time, image, tags, tagColor, description }: UpcomingEventCardProps) => {
  return (
    // Main Container
    <div className="  flex items-center justify-center p-4 md:p-8 font-sans">

      {/* Card Wrapper - Added gap-6 and removed overlap logic */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[500px] gap-6">

        {/* LEFT SECTION: Event Image & Details */}
        <div className="relative w-full md:w-[65%] h-[400px] md:h-full rounded-4xl overflow-hidden group shadow-xl">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
            alt="Robot AI"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

          {/* Content Container */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">

            {/* Top Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase">
                {tags && tags[0]}
              </span>
            </div>

            {/* Bottom Info */}
            <div>
              <div className='mb-3'>
                <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                  {title}
                </h2>
                <p className=' text-white/80'>
                  {description}
                </p>
              </div>

              <Link href={`/events/${id}`} aria-label={`View details for ${title}`}>
                <Button className="w-14 h-14 bg-[#FFC20E] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                  <ArrowUpRight className="text-black w-6 h-6" strokeWidth={2.5} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Gold Pass Ticket */}
        {/* Removed negative margin (-ml-4) to separate the sections */}
        <div className="relative w-full md:w-[35%] h-auto md:h-full bg-[#FFC20E] rounded-4xl p-8 flex flex-col justify-between shadow-xl z-10">

          {/* Left Side Cutout - Matches the background */}
          <div className="hidden md:block absolute top-1/2 -left-6 w-12 h-12 bg-white rounded-full -translate-y-1/2" />

          {/* Ticket Top */}
          <div>
            <Zap className="w-12 h-12 text-black mb-4 stroke-[1.5]" />
            <h3 className="text-5xl font-black text-black leading-[0.9] mb-4">
              New<br />Event
            </h3>

            <div className="w-full flex items-center gap-2 mb-2 opacity-60">
              <div className="h-px w-full border-b border-dashed border-black/50"></div>
            </div>

            <p className="font-mono text-black/70 text-sm tracking-wide">
              Access to all VIP labs
            </p>
          </div>

          {/* Ticket Bottom */}
          <div className="mt-8 md:mt-0">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-1">Date & Time</p>
              <p className="text-xl font-bold text-black">{date instanceof Date ? date.toLocaleDateString() : date} <br />{time}</p>
            </div>

            <Button className="w-full bg-black text-white py-4 rounded-md font-bold text-lg hover:bg-neutral-800 transition-colors">
              Register Now
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpcomingEvent;