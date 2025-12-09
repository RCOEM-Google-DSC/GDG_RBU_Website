"use client"
import React, { useState, useEffect } from 'react';
import {
    Layers,
    Mail,
    Layout,
    Monitor,
    ChevronRight,
    CheckCircle,
    Database,
    FileText,
    Settings,
    Menu,
    X,
    Download,
    User,
    BarChart,
    Github,
    Twitter
} from 'lucide-react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-transparent py-6">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">enso</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
                    <a href="#" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                        <Download size={16} />
                        <span>Download v1.0</span>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

const AppMockup = () => {
    return (
        <div className="relative w-full h-full max-h-[600px] rounded-xl shadow-2xl bg-white border border-gray-200 overflow-hidden flex flex-col transform transition-all hover:scale-[1.01] duration-500">
            {/* Window Controls */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Collapses on smaller screens */}
                <div className="w-16 lg:w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-6 shrink-0 transition-all">
                    <div className="space-y-1">
                        <div className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Assets</div>
                        <div className="flex items-center gap-3 px-2 lg:px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium justify-center lg:justify-start">
                            <FileText size={16} /> <span className="hidden lg:inline">Certificate</span>
                        </div>
                        <div className="flex items-center gap-3 px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors justify-center lg:justify-start">
                            <Mail size={16} /> <span className="hidden lg:inline">Email</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Mailing</div>
                        <div className="flex items-center gap-3 px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors justify-center lg:justify-start">
                            <Layers size={16} /> <span className="hidden lg:inline">Bulk Mailing</span>
                        </div>
                    </div>
                    <div className="mt-auto hidden lg:flex">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">B</div>
                            <div>
                                <p className="font-medium text-gray-900">Bhuvnesh</p>
                                <p>Creator</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white p-4 lg:p-8 overflow-hidden relative flex flex-col">
                    <div className="flex items-center gap-2 mb-6 shrink-0">
                        <FileText className="text-gray-400" size={20} />
                        <h2 className="text-xl font-semibold text-gray-800">Certificate Maker</h2>
                    </div>

                    <div className="flex gap-6 h-full overflow-hidden">
                        {/* Configuration Panel */}
                        <div className="flex-1 space-y-4 lg:space-y-6 overflow-y-auto mock-scroll pr-2">
                            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Configuration</h3>
                                    <Settings size={18} className="text-gray-400" />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
                                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 bg-gray-50">
                                            -- Choose a Template --
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 border border-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">Test Mode</button>
                                        <button className="flex-1 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">Bulk Generate</button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                                        <div className="relative">
                                            <User size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                            <input disabled type="text" placeholder="Enter name for certificate..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm bg-white" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4 lg:mt-6">
                                        <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">Preview</button>
                                        <button className="flex-[2] py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-200">Save Certificate</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Generation Panel (Right side) */}
                        <div className="w-56 hidden xl:block border border-gray-200 rounded-xl p-4 bg-gray-50/50 shrink-0">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent</h3>
                            <div className="space-y-2">
                                {['Sarvesh K.', 'Gauri T.', 'Khizra B.'].map((name, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-600 flex justify-between items-center">
                                        {name}
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="antialiased bg-[#FAFAFA] h-screen w-full overflow-hidden flex flex-col relative selection:bg-blue-100 selection:text-blue-900">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@100;300;400&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                }
                .font-jp {
                    font-family: 'Noto Sans JP', sans-serif;
                }
                .mock-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .mock-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .mock-scroll::-webkit-scrollbar-thumb {
                    background-color: #E5E7EB;
                    border-radius: 20px;
                }
                `}
            </style>

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-6 pt-20 flex items-center justify-center">
                <div className="w-full grid lg:grid-cols-12 gap-12 items-center h-full max-h-[800px]">

                    {/* Left Column: Content */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-center lg:text-left">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Stable Release v1.0
                            </div>
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                                Simply impactful <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Certificates.</span>
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed mb-4">
                                <b>enso</b> (円相) is a desktop tool designed to streamline certificate generation. Create hundreds of personalized certificates and mail them directly.
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 justify-center lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-600" /> Bulk Generation
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-600" /> Direct Mailing
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-600" /> Cross-platform
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                            <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 hover:shadow-2xl hover:-translate-y-1">
                                <Monitor size={20} />
                                Download for Desktop
                            </button>
                        </div>

                        <div className="pt-8 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-400">
                            <p>© 2024 Enso Project.</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-gray-600 transition-colors"><Github size={16} /></a>
                                <a href="#" className="hover:text-gray-600 transition-colors"><Twitter size={16} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: App Mockup */}
                    <div className="lg:col-span-7 w-full h-full max-h-[600px] hidden md:flex items-center justify-center perspective-1000">
                        <div className="w-full h-full transform rotate-y-[-5deg] rotate-x-[2deg] hover:rotate-0 transition-all duration-700 ease-out">
                            <AppMockup />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;