import React from 'react';
import { 
  Calendar, MapPin, Clock, ArrowLeft, ArrowRight, 
  Share2, Award, Gift, Target, CheckCircle2, 
  Users, Trophy, Zap, Download, Star, Info,
  Ticket, CreditCard, UserPlus, Shirt, Smile, Coffee, Book
} from 'lucide-react';

const EventDetailsPage = () => {
  // Reused Navbar for consistency
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold text-xl">{`<`}</span>
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
              <span className="text-green-500 font-bold text-xl">{`>`}</span>
            </div>
            <span className="text-white font-medium text-lg tracking-tight ml-2">GDG RBU</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
                Join Community
             </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 text-sm md:text-base">
      <Navbar />

      <main className="pt-16">
        
        {/* Hero Section - Reduced Height & Text */}
        <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden flex flex-col justify-center">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
               alt="Event Hero" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
             <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button className="w-fit flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group text-sm">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Events
            </button>

            <div className="flex items-center gap-3 mb-5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wide">
                    Conference
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                    <Star size={10} className="fill-yellow-400" /> Premium
                </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 max-w-4xl leading-tight tracking-tight">
              Cloud Next <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Extended 2025</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Experience the future of cloud computing. Join us for an immersive day of keynotes, hands-on labs, and networking with industry leaders.
            </p>

            <div className="flex flex-wrap items-center gap-3">
               <button className="bg-white text-black px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Register Now <ArrowRight size={18} />
               </button>
               <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 flex items-center gap-2 text-sm">
                  <Share2 size={18} /> Share
               </button>
            </div>
          </div>
        </section>

        {/* Key Info Bar - More Compact */}
        <section className="border-y border-white/10 bg-[#0A0A0A]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                    <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-default">
                        <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Date</p>
                            <p className="text-white font-semibold text-sm">Dec 15, 2025</p>
                        </div>
                    </div>
                    <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-default">
                        <div className="p-2.5 rounded-full bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Time</p>
                            <p className="text-white font-semibold text-sm">10:00 AM IST</p>
                        </div>
                    </div>
                    <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-default">
                        <div className="p-2.5 rounded-full bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Venue</p>
                            <p className="text-white font-semibold text-sm truncate">Tech Hub Auditorium</p>
                        </div>
                    </div>
                    <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-default">
                        <div className="p-2.5 rounded-full bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Ticket size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Entry Fee</p>
                            <p className="text-white font-semibold text-sm">₹150.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Main Content Area - Reduced Spacing */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* About Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                        <Zap className="text-yellow-500 fill-yellow-500" size={28} /> About The Event
                    </h2>
                    <div className="prose prose-invert max-w-none text-gray-400 text-base leading-relaxed space-y-3">
                        <p>
                            Cloud Next Extended 2025 is the community-led extension of Google Cloud Next. It brings the excitement of the global conference to our local campus. 
                        </p>
                        <p>
                            Whether you're a beginner exploring cloud concepts or an advanced developer looking to master Kubernetes, this event has something for everyone. We will cover topics ranging from <span className="text-white font-medium">Generative AI, Serverless Architectures, to Big Data Analytics</span>.
                        </p>
                    </div>
                </div>
                <div className="relative h-56 lg:h-80 min-h-[250px] rounded-3xl overflow-hidden border border-white/10 group">
                     <img 
                        src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop" 
                        alt="About Visual" 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                </div>
            </section>

            {/* Registration Timeline */}
            <section className="py-4">
                <div className="max-w-4xl mx-auto">
                     <h2 className="text-2xl font-bold mb-10 text-center">Registration Process</h2>
                     
                     <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-0">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-5 left-12 right-12 h-0.5 bg-linear-to-r from-blue-600/30 via-blue-400/50 to-blue-600/30 z-0"></div>
                        
                        {/* Connecting Line (Mobile) */}
                        <div className="md:hidden absolute left-5 top-6 bottom-6 w-0.5 bg-linear-to-b from-blue-600/30 via-blue-400/50 to-blue-600/30 z-0"></div>
                        
                        {[
                            { title: "Enter Details", desc: "Fill personal info", step: "1" },
                            { title: "Make Payment", desc: "Secure transaction", step: "2" },
                            { title: "Get Ticket", desc: "Receive QR via email", step: "3" },
                            { title: "Check-in", desc: "Show QR at venue", step: "4" }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-row md:flex-col items-center gap-5 w-full md:w-auto mb-6 md:mb-0 bg-black md:bg-transparent p-2 md:p-0 rounded-xl relative z-10 group cursor-default">
                                {/* Circle */}
                                <div className="w-10 h-10 rounded-full bg-[#0F0F0F] border border-white/20 text-white font-bold flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,1)] group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 text-sm">
                                    {item.step}
                                </div>
                                {/* Text */}
                                <div className="text-left md:text-center">
                                    <h3 className="text-sm font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                    <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Tasks */}
            <section>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-3">
                     <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <Target className="text-red-500" size={28} /> Your Mission
                     </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                        <div className="text-3xl font-bold text-blue-500 mb-3">01</div>
                        <h3 className="text-lg font-bold text-white mb-1.5">Team Up</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Form teams of up to 4 members. Join our Discord to find teammates.</p>
                    </div>
                    <div className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
                        <div className="text-3xl font-bold text-green-500 mb-3">02</div>
                        <h3 className="text-lg font-bold text-white mb-1.5">Learn</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Attend at least 3 technical sessions to unlock the "Learner" badge.</p>
                    </div>
                    <div className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-colors">
                        <div className="text-3xl font-bold text-yellow-500 mb-3">03</div>
                        <h3 className="text-lg font-bold text-white mb-1.5">Conquer</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Complete 5 hands-on labs to earn certification & win prizes.</p>
                    </div>
                </div>
            </section>

            {/* Rewards & Perks - Redesigned */}
            <section>
                 <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                   <Award className="text-blue-500" size={28} /> Rewards & Perks
                 </h2>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Certificate Card - Premium & Large */}
                    <div className="lg:col-span-2 bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                        <Award size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Official Certification</h3>
                                </div>
                                <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-8">
                                    Earn a verifiable certificate of completion from Google Developer Groups. Perfect for your LinkedIn profile and professional portfolio.
                                </p>
                            </div>
                            
                            {/* Visual Certificate */}
                            <div className="w-full h-48 md:h-64 bg-[#1A1A1A] rounded-xl border border-white/10 relative overflow-hidden group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] transition-all duration-500">
                                <div className="absolute inset-0 bg-white/5 opacity-10"></div>
                                <div className="absolute inset-4 border-2 border-double border-white/10 rounded-lg flex flex-col items-center justify-center p-6 text-center">
                                    {/* Google G Logo Placeholder */}
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                                        <span className="text-blue-400 font-bold text-lg">G</span>
                                    </div>
                                    <h4 className="text-white font-serif text-lg tracking-wide mb-1">Certificate of Completion</h4>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">Presented to</p>
                                    <span className="text-2xl font-serif text-blue-400 font-bold italic">John Doe</span>
                                    <div className="mt-auto w-full flex justify-between items-end opacity-50">
                                        <div className="flex flex-col gap-1">
                                            <div className="h-0.5 w-16 bg-white/30"></div>
                                            <span className="text-[8px] text-gray-500">Organizer</span>
                                        </div>
                                        <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center">
                                            <Award size={12} className="text-white/50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    </div>

                    {/* Swag List - Vertical Column */}
                    <div className="lg:col-span-1 flex flex-col h-full">
                        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                                    <Gift size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Exclusive Swag</h3>
                                    <p className="text-xs text-gray-500">For top performers & quiz winners</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 flex-grow justify-center">
                                {[
                                    {name:"Diary", icon: Book, color: "text-blue-400", bg: "bg-blue-500/10"},
                                    { name: "T-Shirt", icon: Shirt, color: "text-blue-400", bg: "bg-blue-500/10" },
                                    { name: "Stickers", icon: Smile, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                                    { name: "Badge", icon: Award, color: "text-purple-400", bg: "bg-purple-500/10" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item cursor-default border border-transparent hover:border-white/5">
                                        <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color} group-hover/item:scale-110 transition-transform`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-300 group-hover/item:text-white transition-colors">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                 </div>
            </section>

            {/* Gallery */}
            <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                   <Users className="text-green-500" size={28} /> Previous Vibes
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-80">
                    <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold border border-white px-4 py-2 rounded-full text-sm">View Gallery</span>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073&auto=format&fit=crop" alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>
            </section>

            {/* Organizer Section */}
            <section className="border-t border-white/10 pt-12">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#111] rounded-3xl p-6 border border-white/10">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1.5">Organized by GDG RBU</h3>
                        <p className="text-gray-400 text-sm max-w-md">We are a community of developers, designers, and tech enthusiasts. Join us to learn, share, and grow together.</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                             {[1,2,3,4].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-700"></div>
                             ))}
                         </div>
                         <button className="text-blue-400 font-bold text-xs hover:underline">Contact Organizers</button>
                    </div>
                 </div>
            </section>

        </div>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-6 text-center text-gray-500 text-xs">
        <p>© 2025 GDG RBU. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventDetailsPage;