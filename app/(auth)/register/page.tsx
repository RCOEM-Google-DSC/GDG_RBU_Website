"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";
import AuthForm from "@/app/Components/Auth/AuthForm";

export default function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [isSignupText, setIsSignupText] = useState(false);

  // refs for measuring
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [slideX, setSlideX] = useState(0);

  // Delay text change for the toggle button so it happens while sliding
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignupText(isSignup);
    }, 900);
    return () => clearTimeout(timer);
  }, [isSignup]);

  // measure slide distance to end-of-form exactly
  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const c = containerRef.current;
      const b = btnRef.current;
      if (!c || !b) return;
      const containerWidth = c.clientWidth;
      const btnWidth = b.clientWidth;
      const marginFix = 12;
      const max = Math.max(0, containerWidth - btnWidth - marginFix);
      setSlideX(max);
    };

    compute();

    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(compute);
      if (containerRef.current) ro.observe(containerRef.current);
      if (btnRef.current) ro.observe(btnRef.current);
      ro.observe(document.documentElement);
    } catch (e) {
      window.addEventListener("resize", compute);
    }

    const fontCheck = setTimeout(compute, 250);
    return () => {
      if (ro) {
        try {
          ro.disconnect();
        } catch { }
      } else {
        window.removeEventListener("resize", compute);
      }
      clearTimeout(fontCheck);
    };
  }, []);

  // Styling helpers
  const buttonShadowClass = "shadow-[3px_3px_0_0_#ffffff,3px_3px_0_3px_#000000]";
  const buttonHoverClass =
    "hover:shadow-[1px_1px_0_0_#ffffff,1px_1px_0_3px_#000000] hover:translate-x-[2px] hover:translate-y-[2px]";
  const buttonActiveClass =
    "active:shadow-none active:translate-x-[3px] active:translate-y-[3px]";

  return (
    <div className="relative min-h-screen pt-[70px] w-full bg-[#faf9f6] overflow-hidden flex flex-col items-stretch font-sans selection:bg-yellow-300">
      <Toaster position="top-right" />

      <main className="relative flex-1 flex items-center justify-center px-4 py-8 md:px-6 md:py-12">
        {/* --- GRID BACKGROUND (ANIMATED) --- */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            backgroundPosition: isSignup ? "0px 120px" : "0px 0px",
            transition: "background-position 6000ms cubic-bezier(0.19,1,0.22,1)",
            willChange: "background-position",
          }}
        />

        {/* Decorative blocks - hidden on mobile and tablet, constrained to page */}
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div
            className={`hidden lg:block absolute top-[10%] -left-[320px] z-[1]
              w-[800px] h-[250px]
              bg-red-500 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-100
              ${isSignup ? "translate-x-[calc(100vw-150px)]" : "translate-x-[-100px]"}`}
            aria-hidden
          />
          <div
            className={`hidden lg:block absolute top-[30%] -left-[200px] z-[2]
              w-[500px] h-[180px]
              bg-blue-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-200
              ${isSignup ? "translate-x-[calc(100vw-100px)]" : "translate-x-[-80px]"}`}
            aria-hidden
          />
          <div
            className={`hidden lg:block absolute top-[50%] -left-[450px] z-[3]
              w-[1000px] h-[260px]
              bg-yellow-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-75
              ${isSignup ? "translate-x-[calc(100vw-100px)]" : "translate-x-[-150px]"}`}
            aria-hidden
          />
          <div
            className={`hidden lg:block absolute top-[65%] -left-[250px] z-[4]
              w-[650px] h-[245px]
              bg-green-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-150
              ${isSignup ? "translate-x-[calc(100vw-120px)]" : "translate-x-[-100px]"}`}
            aria-hidden
          />
        </div>

        {/* --- SLANTED CORNER STICKS - positioned at top-right corner with individual animations --- */}
        <div className="hidden lg:block absolute top-0 right-0 pointer-events-none">
          <div
            className={`absolute top-[20px] right-[100px] w-[500px] h-[30px] bg-green-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full -rotate-[35deg] transition-all duration-[2000ms] ease-in-out delay-100 ${isSignup ? "translate-x-[-800px] translate-y-[600px]" : "translate-x-0 translate-y-0"
              }`}
          />
          <div
            className={`absolute top-[60px] right-[50px] w-[600px] h-[30px] bg-blue-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full -rotate-[35deg] transition-all duration-[2000ms] ease-in-out delay-200 ${isSignup ? "translate-x-[-900px] translate-y-[700px]" : "translate-x-0 translate-y-0"
              }`}
          />
          <div
            className={`absolute top-[100px] right-[120px] w-[400px] h-[30px] bg-yellow-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full -rotate-[35deg] transition-all duration-[2000ms] ease-in-out delay-150 ${isSignup ? "translate-x-[-700px] translate-y-[500px]" : "translate-x-0 translate-y-0"
              }`}
          />
          <div
            className={`absolute top-[140px] right-[-50px] w-[700px] h-[30px] bg-red-500 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full -rotate-[35deg] transition-all duration-[2000ms] ease-in-out delay-75 ${isSignup ? "translate-x-[-1000px] translate-y-[800px]" : "translate-x-0 translate-y-0"
              }`}
          />
        </div>

        {/* --- MAIN CONTAINER --- */}
        <div ref={containerRef} className={`relative z-10 w-full max-w-[420px] overflow-visible flex flex-col gap-4 sm:gap-6 transition-all duration-[2000ms] ease-in-out`}>
          {/* --- AUTH FORM COMPONENT --- */}
          <AuthForm isSignup={isSignup} onToggleMode={() => setIsSignup(false)} />

          {/* --- TOGGLE BUTTON (Outside Form) --- */}
          <div className="relative w-full h-11 overflow-visible">
            <div
              className="absolute top-0 left-0 h-full flex items-center transition-transform duration-[5700ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                transform: `translateX(${isSignup ? slideX : 0}px)`,
                willChange: "transform",
                paddingRight: 12,
              }}
            >
              <button
                ref={btnRef}
                onClick={() => setIsSignup((s) => !s)}
                className={`h-11 flex items-center justify-center gap-2 bg-black border-[3px] border-black text-white px-6 rounded-lg font-bold transition-all text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
                style={{ minWidth: 160 }}
              >
                {isSignupText ? "Log in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
