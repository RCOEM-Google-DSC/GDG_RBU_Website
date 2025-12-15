import React from 'react';
import { 
  Trophy, Medal, Image as ImageIcon, Users, ArrowLeft, 
  MapPin, Calendar, Share2, Heart, Download, ExternalLink 
} from 'lucide-react';

const CompletedEventPage = () => {

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500/30 text-sm md:text-base">

      <main>
        
        {/* Retro Hero Section */}
        <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden flex flex-col justify-end pb-12">
          <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
               alt="Event Recap Hero" 
               className="w-full h-full object-cover grayscale-20"
             />
             <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

            <div className="flex flex-col md:flex-row md:items-end justify-between ">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-green-500/90 text-white border border-green-400/50 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                            <CheckCircleIcon size={10} /> Completed
                        </span>
                        
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white shadow-black drop-shadow-md">Spidercraft Web Hack</h1>
                    <p className="text-gray-200 text-base max-w-xl shadow-black drop-shadow-sm">
                        A 24-hour web development marathon where innovation met execution.
                    </p>
                    <span className="text-gray-300 text-xs shadow-black drop-shadow-md">Oct 28, 2024</span>
                </div>
                
                {/* Quick Stats */}
                <div className="flex gap-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white shadow-black drop-shadow-md">150+</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hackers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white shadow-black drop-shadow-md">32</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Projects</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white shadow-black drop-shadow-md">₹50k</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Prize Pool</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

            {/* Event Summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 prose prose-gray max-w-none">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Event Wrap-up</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Spidercraft Web Hack 2024 was a phenomenal success, bringing together the brightest minds from across the region. Over 24 hours, teams brainstormed, coded, and deployed innovative solutions tackling real-world problems in Healthcare, EdTech, and Sustainability.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        We witnessed incredible usage of modern tech stacks including Next.js, Firebase, and Gemini AI. The energy was palpable, with mentors from top tech companies guiding students through their debugging nightmares.
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg h-fit">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Highlights</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span>
                            Keynote by Google GDE
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm"></span>
                            Midnight Pizza Party
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-sm"></span>
                            Live Coding Battles
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></span>
                            Networking Mixer
                        </li>
                    </ul>
                </div>
            </section>

            {/* Winners Podium (Professional Structure) */}
            <section>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Trophy className="text-yellow-500" size={24} />
                    <h2 className="text-2xl font-bold text-center text-gray-900">Hall of Fame</h2>
                </div>

                {/* Podium Layout */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-5xl mx-auto">
                    
                    {/* 2nd Place (Left) */}
                    <div className="order-2 md:order-1 w-full md:w-[30%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
                        <div className="h-44 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 2" />
                            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md border border-white/50 text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <Medal size={12} className="text-gray-400" /> 2nd Place
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-gray-900 mb-1">Team CyberPunk</h3>
                            <p className="text-xs text-gray-500 mb-3">Project: EcoTrack</p>
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
                            </div>
                        </div>
                        {/* Silver Base Line */}
                        <div className="h-1.5 w-full bg-gray-300"></div>
                    </div>

                    {/* 1st Place (Center - Taller & Elevated) */}
                    <div className="order-1 md:order-2 w-full md:w-[35%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-2xl overflow-hidden relative group z-10 transform md:-translate-y-6">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                        <div className="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 1" />
                            <div className="absolute top-3 left-3 bg-yellow-50 backdrop-blur-md border border-yellow-200 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <Trophy size={12} className="text-yellow-600" /> Winner
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Team Nova</h3>
                            <p className="text-sm text-yellow-600 mb-4 font-medium">Project: MedAssist AI</p>
                            <div className="flex justify-center -space-x-2 mb-2">
                                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>)}
                            </div>
                        </div>
                        {/* Gold Base Line */}
                        <div className="h-2 w-full bg-yellow-400"></div>
                    </div>

                    {/* 3rd Place (Right) */}
                    <div className="order-3 md:order-3 w-full md:w-[30%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
                        <div className="h-40 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 3" />
                            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md border border-white/50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <Medal size={12} className="text-amber-700" /> 3rd Place
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-gray-900 mb-1">Team Pixel</h3>
                            <p className="text-xs text-gray-500 mb-3">Project: EduVibe</p>
                            <div className="flex -space-x-2">
                                {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
                            </div>
                        </div>
                        {/* Bronze Base Line */}
                        <div className="h-1.5 w-full bg-amber-700/60"></div>
                    </div>

                </div>
            </section>

            {/* Organizing Team */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Users className="text-blue-600" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">The Crew</h2>
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        alt="Organizing Team" 
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">GDG RBU Team 2024</h3>
                        <p className="text-gray-200 max-w-2xl text-sm">
                            The passionate individuals who worked behind the scenes to make Spidercraft Web Hack a reality. From logistics to technical support, this team made it happen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Photo Gallery - Bento Grid Style */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="text-pink-600" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">Captured Moments</h2>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                    {/* Large Featured Shot */}
                    <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                            <span className="text-white text-sm font-semibold">Keynote Session</span>
                        </div>
                    </div>

                    {/* Tall Shot */}
                    <div className="md:col-span-1 md:row-span-2 relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 1 */}
                    <div className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 2 */}
                    <div className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Wide Shot */}
                    <div className="md:col-span-2 relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 3 */}
                    <div className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>

                    {/* Standard Shot 4 */}
                    <div className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                    </div>
                </div>
            </section>

        </div>

      </main>
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