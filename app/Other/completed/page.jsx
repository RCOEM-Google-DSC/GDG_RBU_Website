import React from 'react';
import { 
  Calendar, MapPin, Users, ArrowLeft, Share2, 
  Trophy, Medal, Image as ImageIcon, Heart, 
  Download, ExternalLink, ChevronRight
} from 'lucide-react';

const CompletedEventPage = () => {
  // Reused Navbar
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
        
        {/* Retro Hero Section */}
        <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden flex flex-col justify-end pb-12">
          <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
               alt="Event Recap Hero" 
               className="w-full h-full object-cover grayscale-[50%]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button className="w-fit flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group text-sm">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Archive
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                            <CheckCircleIcon size={10} /> Completed
                        </span>
                        <span className="text-gray-400 text-xs">Oct 28, 2024</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">Spidercraft Web Hack</h1>
                    <p className="text-gray-300 text-base max-w-xl">
                        A 24-hour web development marathon where innovation met execution.
                    </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex gap-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">150+</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Hackers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">32</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Projects</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">₹50k</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Prize Pool</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

            {/* Event Summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Event Wrap-up</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Spidercraft Web Hack 2024 was a phenomenal success, bringing together the brightest minds from across the region. Over 24 hours, teams brainstormed, coded, and deployed innovative solutions tackling real-world problems in Healthcare, EdTech, and Sustainability.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        We witnessed incredible usage of modern tech stacks including Next.js, Firebase, and Gemini AI. The energy was palpable, with mentors from top tech companies guiding students through their debugging nightmares.
                    </p>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-white/10 h-fit">
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Highlights</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Keynote by Google GDE
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Midnight Pizza Party
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                            Live Coding Battles
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Networking Mixer
                        </li>
                    </ul>
                </div>
            </section>

            {/* Winners Podium (Professional Structure) */}
            <section>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Trophy className="text-yellow-500" size={24} />
                    <h2 className="text-2xl font-bold text-center">Hall of Fame</h2>
                </div>

                {/* Podium Layout */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-5xl mx-auto">
                    
                    {/* 2nd Place (Left) */}
                    <div className="order-2 md:order-1 w-full md:w-[30%] bg-[#111] rounded-t-2xl rounded-b-lg border border-white/10 overflow-hidden relative group">
                        <div className="h-44 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 2" />
                            <div className="absolute top-3 left-3 bg-slate-300/20 backdrop-blur-md border border-slate-400/50 text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                                <Medal size={12} className="text-slate-300" /> 2nd Place
                            </div>
                        </div>
                        <div className="p-5 bg-gradient-to-b from-[#111] to-[#151515]">
                            <h3 className="font-bold text-white mb-1">Team CyberPunk</h3>
                            <p className="text-xs text-gray-500 mb-3">Project: EcoTrack</p>
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#111]"></div>)}
                            </div>
                        </div>
                        {/* Silver Base Line */}
                        <div className="h-1 w-full bg-slate-400/50"></div>
                    </div>

                    {/* 1st Place (Center - Taller & Elevated) */}
                    <div className="order-1 md:order-2 w-full md:w-[35%] bg-[#151515] rounded-t-2xl rounded-b-lg border border-yellow-500/30 overflow-hidden relative group z-10 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] transform md:-translate-y-6">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                        <div className="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 1" />
                            <div className="absolute top-3 left-3 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50 text-yellow-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                                <Trophy size={12} className="text-yellow-400" /> Winner
                            </div>
                        </div>
                        <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-[#151515] text-center">
                            <h3 className="text-xl font-bold text-white mb-1">Team Nova</h3>
                            <p className="text-sm text-yellow-500/80 mb-4">Project: MedAssist AI</p>
                            <div className="flex justify-center -space-x-2 mb-2">
                                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#151515]"></div>)}
                            </div>
                        </div>
                        {/* Gold Base Line */}
                        <div className="h-1.5 w-full bg-yellow-500"></div>
                    </div>

                    {/* 3rd Place (Right) */}
                    <div className="order-3 md:order-3 w-full md:w-[30%] bg-[#111] rounded-t-2xl rounded-b-lg border border-white/10 overflow-hidden relative group">
                        <div className="h-40 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 3" />
                            <div className="absolute top-3 left-3 bg-orange-700/20 backdrop-blur-md border border-orange-600/50 text-orange-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                                <Medal size={12} className="text-orange-400" /> 3rd Place
                            </div>
                        </div>
                        <div className="p-5 bg-gradient-to-b from-[#111] to-[#151515]">
                            <h3 className="font-bold text-white mb-1">Team Pixel</h3>
                            <p className="text-xs text-gray-500 mb-3">Project: EduVibe</p>
                            <div className="flex -space-x-2">
                                {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#111]"></div>)}
                            </div>
                        </div>
                        {/* Bronze Base Line */}
                        <div className="h-1 w-full bg-orange-700/60"></div>
                    </div>

                </div>
            </section>

            {/* Organizing Team */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Users className="text-blue-500" size={24} />
                    <h2 className="text-2xl font-bold">The Crew</h2>
                </div>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        alt="Organizing Team" 
                        className="w-full h-[400px] object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-2xl font-bold text-white mb-2">GDG RBU Team 2024</h3>
                        <p className="text-gray-300 max-w-2xl text-sm">
                            The passionate individuals who worked behind the scenes to make Spidercraft Web Hack a reality. From logistics to technical support, this team made it happen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Photo Gallery - Bento Grid Style */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="text-pink-500" size={24} />
                        <h2 className="text-2xl font-bold">Captured Moments</h2>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                    {/* Large Featured Shot */}
                    <div className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">Keynote Session</span>
                        </div>
                    </div>

                    {/* Tall Shot - Top Right Image Changed */}
                    <div className="md:col-span-1 md:row-span-2 relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 1 */}
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 2 */}
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Wide Shot */}
                    <div className="md:col-span-2 relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 3 */}
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 4 */}
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
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

// Simple Icon component for the "Completed" badge
const CheckCircleIcon = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default CompletedEventPage;