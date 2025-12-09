
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <a 
      href={event.link}
      className="group relative block w-full max-w-[340px] h-[420px] mx-auto overflow-hidden rounded-3xl shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={event.image} 
          alt={event.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        
        {/* Top Tag */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-xs font-medium tracking-wide text-white">{event.category}</span>
        </div>

        {/* Text Content */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-3 text-indigo-300 font-medium text-sm">
            <Calendar size={16} />
            <span>{event.month} {event.day}, {event.time}</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 leading-snug">{event.title}</h3>
          
          <p className="text-white/70 text-sm line-clamp-2 mb-4 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
            Join us for an unforgettable experience. Click to reserve your spot today.
          </p>
          
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-indigo-300 transition-colors">
            <span>Get Tickets</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default EventCard;