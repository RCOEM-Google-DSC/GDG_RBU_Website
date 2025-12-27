"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const colors = [
    { bg: "bg-blue-400", shadow: "#4285F4" },
    { bg: "bg-red-400", shadow: "#EA4335" },
    { bg: "bg-yellow-400", shadow: "#FBBC04" },
    { bg: "bg-green-400", shadow: "#34A853" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-4  relative overflow-hidden">
      {/* Background dots pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating shapes - hidden on mobile */}
      <div className="hidden md:block absolute top-10 left-10 w-16 h-16 bg-yellow-400 border-4 border-black rotate-12" />
      <div className="hidden md:block absolute top-20 right-20 w-20 h-20 bg-blue-400 border-4 border-black rounded-full animate-pulse" />
      <div className="hidden md:block absolute bottom-23 left-20 w-24 h-24 bg-red-400 border-4 border-black -rotate-12" />
      <div className="hidden md:block absolute bottom-26 right-10 w-16 h-16 bg-green-400 border-4 border-black rotate-45" />

      {/* Floating shapes mobile - bigger sizes */}
      <div className="md:hidden absolute top-5 left-2 w-12 h-12 bg-yellow-400 border-2 border-black rotate-12" />
      <div className="md:hidden absolute top-5 right-2 w-14 h-14 bg-blue-400 border-2 border-black rounded-full" />
      <div className="md:hidden absolute bottom-32 left-2 w-16 h-16 bg-red-400 border-2 border-black -rotate-12" />
      <div className="md:hidden absolute bottom-32 right-2 w-12 h-12 bg-green-400 border-2 border-black rotate-45" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* 404 Badge */}
        <div className="flex justify-center mb-3 md:mb-6">
          <div
            className="bg-[#8338ec] text-white px-4 md:px-8 py-2 md:py-3 border-3 md:border-4 border-black 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2"
          >
            <span className="text-lg md:text-2xl font-black uppercase tracking-wider">
              Error 404
            </span>
          </div>
        </div>

        {/* Message card */}
        <div
          className="bg-white border-3 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
          p-5 md:p-8 lg:p-12 mb-5 md:mb-8 rotate-1"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase mb-3 md:mb-4 text-center">
            Page Not Found!
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-700 leading-relaxed">
            Oops! Looks like this page took a coffee break and never came back.
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link href="/">
            <button
              className="w-full bg-blue-400 border-3 md:border-4 border-black 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              transition-all py-3 md:py-4 px-4 md:px-6 font-black text-black uppercase text-base md:text-lg
              flex items-center justify-center gap-2 md:gap-3"
            >
              <Home size={20} className="md:w-6 md:h-6" />
              Go Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-red-400 border-3 md:border-4 border-black 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
            hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            transition-all py-3 md:py-4 px-4 md:px-6 font-black text-black uppercase text-base md:text-lg
            flex items-center justify-center gap-2 md:gap-3"
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
            Go Back
          </button>
        </div>

        {/* Fun fact */}
        <div className="mt-8 md:mt-12 mb-8 text-center">
          <div
            className="inline-block bg-yellow-400 border-3 md:border-4 border-black px-4 md:px-6 py-2 md:py-3 
            shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1"
          >
            <p className="font-black text-xs sm:text-sm md:text-base uppercase">
              💡 Fun Fact: The first 404 error was at CERN in 1992!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
