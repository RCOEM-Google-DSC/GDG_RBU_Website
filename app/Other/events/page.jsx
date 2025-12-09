"use client"
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, ExternalLink, Share2, Ticket, Users, MonitorPlay, Zap, Radio, Code2 } from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Navigation Component
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* GDG Logo Icon */}
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold text-xl">{`<`}</span>
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
              <span className="text-green-500 font-bold text-xl">{`>`}</span>
            </div>
            <span className="text-white font-medium text-lg tracking-tight ml-2">GDG RBU</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</a>
            <a href="#" className="text-white text-sm font-medium">Events</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Tutorials</a>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Upcoming Event Card (Horizontal Style) - Scaled Down
  const UpcomingEventCard = () => (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0F0F0F] border border-white/10 group hover:border-blue-500/30 transition-all duration-300">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row min-h-[350px]">
        {/* Content Side */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-wide uppercase">
              Conference
            </span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold border border-blue-500/20">
              <Zap size={10} className="fill-blue-400" /> Trending
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Cloud Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Extended 2025</span>
          </h2>

          <p className="text-gray-400 text-base mb-6 max-w-xl leading-relaxed">
            Join us for an extended version of Google Cloud Next with hands-on sessions, demos, and expert talks on the latest cloud technologies, AI innovations, and DevOps practices.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Cloud', 'GenAI', 'DevOps', 'Infrastructure'].map((tag, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium border ${
                i === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                i === 1 ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                i === 2 ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                'border-red-500/30 text-red-400 bg-red-500/5'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5 text-gray-400 mb-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-blue-400" />
              <span>December 15, 2025</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-blue-400" />
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-blue-400" />
              <span>Tech Hub, Innovation Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
              Register Now <ArrowRight size={16} />
            </button>
            <button className="bg-white/5 text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <Share2 size={18} />
            </button>
            <div className="flex items-center gap-2 ml-3 text-gray-500 text-xs">
              <Users size={14} />
              <span>120+ registered</span>
            </div>
          </div>
        </div>

        {/* Image Side (Desktop) */}
        <div className="lg:w-5/12 relative min-h-[250px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F0F0F] lg:bg-gradient-to-l lg:from-transparent lg:to-[#0F0F0F] z-10" />
            <img 
                src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop" 
                alt="Cloud Event"
                className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
            {/* Floating Element on Image */}
            <div className="absolute bottom-6 right-6 z-20 hidden lg:block">
                <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JD</span>
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">John Doe</p>
                            <p className="text-gray-400 text-[10px]">Google Cloud Expert</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-[10px] italic">"Don't miss the keynote on the future of serverless computing!"</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  // Past Event Card (Vertical Style) - Scaled Down
  const EventCard = ({ event }) => (
    <div className="group bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden hover:border-gray-600 transition-all duration-300 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium">
                {event.type}
            </span>
        </div>
        {/* Date Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-10">
            <div className="bg-[#1A1A1A] px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
                <Calendar size={12} className="text-blue-400" />
                <span className="text-white text-[10px] font-bold">{event.date}</span>
            </div>
        </div>
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {event.tags.map((tag, i) => (
            <span key={i} className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                tag.color === 'blue' ? 'border-blue-900 text-blue-400 bg-blue-900/10' :
                tag.color === 'green' ? 'border-green-900 text-green-400 bg-green-900/10' :
                tag.color === 'red' ? 'border-red-900 text-red-400 bg-red-900/10' :
                tag.color === 'yellow' ? 'border-yellow-900 text-yellow-400 bg-yellow-900/10' :
                'border-purple-900 text-purple-400 bg-purple-900/10'
            }`}>
              {tag.text}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-xs mb-5 line-clamp-3 flex-grow leading-relaxed">
          {event.description}
        </p>

        {/* Footer Info */}
        <div className="border-t border-white/5 pt-3 mt-auto">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
                    <Clock size={12} />
                    <span>{event.time}</span>
                </div>
            </div>
            
            <button className="w-full bg-white text-black py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                View Details <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );

  // Data based on your previous images
  const pastEvents = [
    {
      title: "DevFest Nagpur 2025",
      date: "Dec 21, 2025",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      description: "DevFest Nagpur 2025 is a flagship tech conference bringing together developers, students, and tech enthusiasts to learn, connect and explore latest Google techs.",
      tags: [
        { text: "AI", color: "blue" },
        { text: "Android", color: "green" },
        { text: "Cloud", color: "yellow" },
        { text: "Web", color: "red" }
      ],
      location: "Nagpur, IN",
      time: "09:00 AM - 06:00 PM"
    },
    {
      title: "GenAI Study Jams",
      date: "Nov 15, 2024",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      description: "Deep dive into Generative AI with hands-on codelabs. Learn how to build sophisticated AI applications using Google's latest models.",
      tags: [
        { text: "GenAI", color: "blue" },
        { text: "ML", color: "yellow" },
        { text: "Python", color: "purple" }
      ],
      location: "DT Seminar Hall",
      time: "10:00 AM - 02:00 PM"
    },
    {
      title: "Spidercraft Web Hack",
      date: "Oct 28, 2024",
      type: "Hackathon",
      image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?q=80&w=1974&auto=format&fit=crop",
      description: "A 24-hour web development hackathon where creativity meets code. Build stunning web experiences and win exciting prizes.",
      tags: [
        { text: "Web", color: "blue" },
        { text: "React", color: "green" },
        { text: "Design", color: "red" }
      ],
      location: "Innovation Lab",
      time: "24 Hours"
    },
    {
      title: "Bappa ka Prashad 4.0",
      date: "Sep 15, 2024",
      type: "Coding",
      image: "https://images.unsplash.com/photo-1599580486848-d30d1d7310df?q=80&w=2069&auto=format&fit=crop",
      description: "Where devotion meets coding. An annual coding competition celebrating the festive spirit with algorithmic challenges.",
      tags: [
        { text: "DSA", color: "yellow" },
        { text: "Logic", color: "blue" },
        { text: "Comp", color: "green" }
      ],
      location: "Computer Center",
      time: "11:00 AM - 04:00 PM"
    },
    {
      title: "GDG Orientation '24",
      date: "Aug 21, 2024",
      type: "Meetup",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      description: "Welcome to the family! An introductory session for new members to understand our mission, vision, and upcoming roadmap.",
      tags: [
        { text: "Community", color: "red" },
        { text: "Networking", color: "blue" }
      ],
      location: "Main Auditorium",
      time: "03:00 PM - 05:00 PM"
    },
    {
      title: "Wizcraft Design Talk",
      date: "Aug 05, 2024",
      type: "Talk",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      description: "Exploring the nuances of UI/UX design. Learn from industry experts about creating intuitive and accessible user interfaces.",
      tags: [
        { text: "UI/UX", color: "purple" },
        { text: "Figma", color: "green" },
        { text: "Art", color: "red" }
      ],
      location: "Design Studio",
      time: "02:00 PM - 04:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 text-sm md:text-base">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-1 w-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
             <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">Events & Workshops</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Innovation</span>
          </h1>
          <p className="text-gray-400 text-base max-w-xl">
            Explore our upcoming conferences, hackathons, and study jams. Join a community of developers shaping the future.
          </p>
        </div>

        {/* Featured / Upcoming Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Radio className="text-red-500 animate-pulse" size={20} /> 
              Upcoming Highlight
            </h2>
          </div>
          <UpcomingEventCard />
        </section>

        {/* Filters & Grid Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <h2 className="text-2xl font-bold">Past Events</h2>
            
            {/* Simple Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {['all', 'workshop', 'hackathon', 'conference'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    activeTab === tab 
                      ? 'bg-white text-black border-white' 
                      : 'bg-[#1A1A1A] text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="border border-white/20 text-white hover:bg-white hover:text-black px-6 py-2.5 rounded-full transition-all font-medium inline-flex items-center gap-2 text-sm">
               Load More Archives <ExternalLink size={14} />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-white">GDG RBU</span>
                    </div>
                    <p className="text-gray-400 max-w-sm leading-relaxed text-sm">
                        Google Developer Groups On Campus RBU is a community of developers, designers, and tech enthusiasts. We learn, share, and grow together.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Events</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Team</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Join Us</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 text-sm">Connect</h4>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            <Share2 size={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all cursor-pointer">
                            <MonitorPlay size={16} />
                        </div>
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                            <Ticket size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-xs">© 2025 GDG RBU. All rights reserved.</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;