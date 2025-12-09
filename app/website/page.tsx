import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import TicketCard from '../Components/Reusables/TicketCard';
import Card from '../Components/Reusables/Card';
import EventCard from '../Components/Reusables/EventCard';
import Image from 'next/image';
const event={
      title: "Modern Art Gallery Opening",
      category: "Exhibition",
      month: "DEC",
      day: "05",
      time: "06:30 PM",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#rsvp"
    }

const EventTicket = () => {
  return (
    // Main Container - Background set to White as requested
    // <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans">

    //   {/* Card Wrapper */}
    //   <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[500px] gap-4 md:gap-0">

    //     {/* LEFT SECTION: Event Image & Details */}
    //     <div className="relative w-full md:w-[65%] h-[400px] md:h-full rounded-4xl overflow-hidden group shadow-xl">
    //       {/* Background Image */}
    //       <img 
    //         src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" 
    //         alt="Robot AI" 
    //         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    //       />

    //       {/* Dark Overlay for text readability */}
    //       <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

    //       {/* Content Container */}
    //       <div className="absolute inset-0 p-8 flex flex-col justify-between">

    //         {/* Top Tags */}
    //         <div className="flex flex-wrap gap-3">
    //           <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase">
    //             Artificial Intelligence
    //           </span>
    //           <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase">
    //             New Event
    //           </span>
    //         </div>

    //         {/* Bottom Info */}
    //         <div>
    //           <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
    //             Introduction to Generative AI and Large Language Models.
    //           </h2>

    //           <button
    //             className="w-14 h-14 bg-[#FFC20E] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
    //             title="Learn more about the event"
    //             aria-label="Learn more about the event"
    //           >
    //             <ArrowUpRight className="text-black w-6 h-6" strokeWidth={2.5} />
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* RIGHT SECTION: Gold Pass Ticket */}
    //     <div className="relative w-full md:w-[35%] h-auto md:h-full bg-[#FFC20E] rounded-4xl p-8 flex flex-col justify-between shadow-xl md:-ml-4 z-10">

    //       {/* The "Cutout" Notch - Matches the page background (white) */}
    //       <div className="hidden md:block absolute top-1/2 -left-6 w-12 h-12 bg-white rounded-full -translate-y-1/2" />

    //       {/* Ticket Top */}
    //       <div>
    //         <Zap className="w-12 h-12 text-black mb-4 stroke-[1.5]" />
    //         <h3 className="text-5xl font-black text-black leading-[0.9] mb-4">
    //           GOLD<br />PASS
    //         </h3>

    //         <div className="w-full flex items-center gap-2 mb-2 opacity-60">
    //            {/* Dashed line effect */}
    //           <div className="h-px w-full border-b border-dashed border-black/50"></div>
    //         </div>

    //         <p className="font-mono text-black/70 text-sm tracking-wide">
    //           Access to all VIP labs
    //         </p>
    //       </div>

    //       {/* Ticket Bottom */}
    //       <div className="mt-8 md:mt-0">
    //         <div className="mb-6">
    //           <p className="text-xs font-bold uppercase tracking-widest text-black/60 mb-1">Date</p>
    //           <p className="text-2xl font-bold text-black">12 NOV 2025</p>
    //         </div>

    //         <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-colors">
    //           Get Ticket
    //         </button>
    //       </div>
    //     </div>

    //   </div>
    // </div>

    <div  className='bg-black min-h-screen grid-rows-2 p-10'>
      
      {/* <TicketCard />

      <Card/>

      <EventCard event={event} /> */}
    </div>
  );
};

export default EventTicket;