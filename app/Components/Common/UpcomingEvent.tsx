import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpcomingEventCardProps } from '@/lib/types';

const UpcomingEvent = ({ id, title, date, time, image, tags, tagColor, description }: UpcomingEventCardProps) => {
  return (
    // Main Container
    <div className="w-full font-sans">

      {/* Card Wrapper - Single container on mobile with overlay, side-by-side on desktop */}
      <div className="relative w-full max-w-7xl mx-auto">

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:flex lg:flex-row w-full h-[500px] gap-6">

          {/* LEFT SECTION: Event Image & Details */}
          <div className="relative w-[65%] h-full rounded-4xl overflow-hidden group shadow-xl">
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
                  <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                    {title}
                  </h2>
                  <p className='text-base text-white/80 line-clamp-3'>
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

          {/* RIGHT SECTION: Gold Pass Ticket - Desktop Only */}
          <div
            className="relative w-[35%] h-full bg-[#FFC20E] rounded-4xl p-8 flex flex-col justify-between drop-shadow-xl z-10"
            style={{
              maskImage: 'radial-gradient(circle at left center, transparent 24px, black 24.5px)',
              WebkitMaskImage: 'radial-gradient(circle at left center, transparent 24px, black 24.5px)'
            }}
          >

            {/* Ticket Top */}
            <div>
              <Zap className="w-12 h-12 text-black mb-4 stroke-[1.5]" />
              <h3 className="text-6xl font-black text-black leading-[0.9] mb-4">
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
            <div>
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-1">Date & Time</p>
                <p className="text-xl font-bold text-black">
                  {date instanceof Date ? date.toLocaleDateString() : date} <br />{time}
                </p>
              </div>

              <Button className="w-full bg-black text-white py-4 rounded-md font-bold text-lg hover:bg-neutral-800 transition-colors">
                Register Now
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: Image with overlaid ticket card */}
        <div className="lg:hidden relative w-full h-[500px] sm:h-[600px] rounded-3xl overflow-hidden shadow-xl">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
            alt="Robot AI"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

          {/* Content Container */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">

            {/* Top Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase">
                {tags && tags[0]}
              </span>
            </div>

            {/* Bottom Section with Title */}
            <div className="relative">
              <div className='mb-3'>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  {title}
                </h2>
                <p className='text-sm text-white/80 line-clamp-2 mb-4'>
                  {description}
                </p>
              </div>

              <Link href={`/events/${id}`} aria-label={`View details for ${title}`}>
                <Button className="w-12 h-12 bg-[#FFC20E] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors mb-4">
                  <ArrowUpRight className="text-black w-5 h-5" strokeWidth={2.5} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Overlaid Ticket Card - Top Right - More Compact */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-32 sm:w-36 bg-[#FFC20E] rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 border-black z-20">
            {/* Ticket Content - Compact Layout */}
            <div className="space-y-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[1.5]" />
              <h3 className="text-lg sm:text-xl font-black text-black leading-[0.85]">
                New<br />Event
              </h3>

              <div className="w-full h-px border-b border-dashed border-black/30"></div>

              <p className="font-mono text-black/70 text-[8px] sm:text-[9px] tracking-wide leading-tight">
                Access to all VIP labs
              </p>

              <div>
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-black/60 mb-0.5">Date & Time</p>
                <p className="text-[10px] sm:text-xs font-bold text-black leading-tight">
                  {date instanceof Date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : date}
                  <br />
                  {time}
                </p>
              </div>

              <Button className="w-full bg-black text-white py-1.5 sm:py-2 rounded-md font-bold text-[10px] sm:text-xs hover:bg-neutral-800 transition-colors">
                Register
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpcomingEvent;