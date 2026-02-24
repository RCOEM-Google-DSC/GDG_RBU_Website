"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

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
      <NeoBrutalism border={4} shadow="none" className="hidden md:block absolute top-10 left-10 w-16 h-16 bg-yellow-400 rotate-12" > </NeoBrutalism>
      <NeoBrutalism border={4} shadow="none" rounded="full" className="hidden md:block absolute top-20 right-20 w-20 h-20 bg-blue-400 animate-pulse" > </NeoBrutalism>
      <NeoBrutalism border={4} shadow="none" className="hidden md:block absolute bottom-23 left-20 w-24 h-24 bg-red-400 -rotate-12" > </NeoBrutalism>
      <NeoBrutalism border={4} shadow="none" className="hidden md:block absolute bottom-26 right-10 w-16 h-16 bg-green-400 rotate-45" > </NeoBrutalism>

      {/* Floating shapes mobile - bigger sizes */}
      <NeoBrutalism border={2} shadow="none" className="md:hidden absolute top-5 left-2 w-12 h-12 bg-yellow-400 rotate-12" > </NeoBrutalism>
      <NeoBrutalism border={2} shadow="none" rounded="full" className="md:hidden absolute top-5 right-2 w-14 h-14 bg-blue-400" > </NeoBrutalism>
      <NeoBrutalism border={2} shadow="none" className="md:hidden absolute bottom-32 left-2 w-16 h-16 bg-red-400 -rotate-12" > </NeoBrutalism>
      <NeoBrutalism border={2} shadow="none" className="md:hidden absolute bottom-32 right-2 w-12 h-12 bg-green-400 rotate-45" > </NeoBrutalism>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* 404 Badge */}
        <div className="flex justify-center mb-3 md:mb-6">
          <NeoBrutalism
            border={3}
            shadow="md"
            className="bg-[#8338ec] text-white px-4 md:px-8 py-2 md:py-3 -rotate-2 md:border-4 md:shadow-[8px_8px_0px_0px_#000]"
          >
            <span className="text-lg md:text-2xl font-black uppercase tracking-wider">
              Error 404
            </span>
          </NeoBrutalism>
        </div>

        {/* Message card */}
        <NeoBrutalism
          border={3}
          shadow="lg"
          className="bg-white p-5 md:p-8 lg:p-12 mb-5 md:mb-8 rotate-1 md:border-4 md:shadow-[12px_12px_0px_0px_#000]"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase mb-3 md:mb-4 text-center">
            Page Not Found!
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-700 leading-relaxed">
            Oops! Looks like this page took a coffee break and never came back.
          </p>
        </NeoBrutalism>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link href="/">
            <button
              className={nb({
                border: 3,
                shadow: "md",
                hover: "lift",
                active: "push",
                className:
                  "w-full bg-blue-400 py-3 md:py-4 px-4 md:px-6 font-black text-black uppercase text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 md:border-4 md:shadow-[6px_6px_0px_0px_#000] md:hover:shadow-[8px_8px_0px_0px_#000]",
              })}
            >
              <Home size={20} className="md:w-6 md:h-6" />
              Go Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className={nb({
              border: 3,
              shadow: "md",
              hover: "lift",
              active: "push",
              className:
                "w-full bg-red-400 py-3 md:py-4 px-4 md:px-6 font-black text-black uppercase text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 md:border-4 md:shadow-[6px_6px_0px_0px_#000] md:hover:shadow-[8px_8px_0px_0px_#000]",
            })}
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
