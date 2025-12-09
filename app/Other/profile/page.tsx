"use client"

import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Award, Calendar, Share2, ExternalLink, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('events');

  // Mock User Data
  const user = {
    name: "Alex Developer",
    role: "GDG Lead & Full Stack Developer",
    email: "alex.dev@example.com",
    phone: "+91 98765 43210",
    location: "RBU Campus, Nagpur",
    bio: "Passionate about building scalable web applications and fostering developer communities. Always learning, always coding.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  };

  // Mock Events Data
  const myEvents = [
    {
      id: 1,
      title: "GenAI Study Jams",
      date: "Sep 20, 2024",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      theme: "blue"
    },
    {
      id: 2,
      title: "SpiderCraft Hackathon",
      date: "Jan 15, 2025",
      status: "Winner",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?auto=format&fit=crop&q=80&w=800",
      theme: "red"
    },
    {
      id: 3,
      title: "WebWiz Workshop",
      date: "Aug 10, 2024",
      status: "Speaker",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      theme: "green"
    }
  ];

  // Mock Badges Data
  const myBadges = [
    { id: 1, name: "AI Explorer", color: "text-blue-400", bg: "bg-blue-500/10", icon: <Award size={24} /> },
    { id: 2, name: "Hackathon Hero", color: "text-red-400", bg: "bg-red-500/10", icon: <Award size={24} /> },
    { id: 3, name: "Community Lead", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: <Award size={24} /> },
    { id: 4, name: "Cloud Certified", color: "text-green-400", bg: "bg-green-500/10", icon: <Award size={24} /> },
    { id: 5, name: "Code Ninja", color: "text-purple-400", bg: "bg-purple-500/10", icon: <Award size={24} /> },
    { id: 6, name: "Mentor", color: "text-orange-400", bg: "bg-orange-500/10", icon: <Award size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
  

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Profile Card Section */}
        <div className="relative mb-16">
          {/* Background Decorative Glows */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              
              {/* Left Side: Circular Image */}
              <div className="relative group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500">
                  <div className="w-full h-full rounded-full border-4 border-black overflow-hidden relative">
                    <img 
                      src={user.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 right-4 bg-[#202124] text-white text-xs px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-2">
                    {user.name}
                  </h1>
                  <p className="text-xl text-blue-400 font-medium">{user.role}</p>
                </div>

                <p className="text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                  {user.bio}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                  <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Mail size={18} className="text-red-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Phone size={18} className="text-green-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <MapPin size={18} className="text-yellow-400" />
                    <span>{user.location}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-4 pt-4">
                  <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:-translate-y-1">
                    <Github size={20} />
                  </button>
                  <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-all hover:-translate-y-1">
                    <Linkedin size={20} />
                  </button>
                  <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-all hover:-translate-y-1">
                    <Twitter size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* My Events Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-1 h-8 bg-blue-500 rounded-full block"></span>
                My Events
              </h2>
              <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                    {/* Event Image */}
                    <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute bottom-2 left-2 z-20 px-2 py-1 rounded text-xs font-medium bg-${event.theme}-500/20 text-${event.theme}-400 border border-${event.theme}-500/30 backdrop-blur-sm`}>
                        {event.status}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Calendar size={14} />
                          {event.date}
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                          <Download size={16} />
                          Download Certificate
                        </button>
                        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Badges Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-1 h-8 bg-yellow-500 rounded-full block"></span>
                My Badges
              </h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
               {/* Decorative Gradient */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="grid grid-cols-2 gap-4">
                {myBadges.map((badge) => (
                  <div key={badge.id} className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-default">
                    <div className={`w-12 h-12 rounded-full ${badge.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <span className={badge.color}>{badge.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-center text-gray-300 group-hover:text-white">{badge.name}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-xl border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View All Achievements <ExternalLink size={14} />
              </button>
            </div>
            
            {/* Quick Stats or Additional Info */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-6 mt-6">
                <h3 className="text-lg font-bold mb-4">Community Impact</h3>
                <div className="flex justify-between items-center text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-400">12</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Events</div>
                    </div>
                     <div className="w-px h-8 bg-white/10"></div>
                    <div>
                        <div className="text-2xl font-bold text-red-400">5</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Hackathons</div>
                    </div>
                     <div className="w-px h-8 bg-white/10"></div>
                    <div>
                        <div className="text-2xl font-bold text-green-400">8</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Talks</div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default App;