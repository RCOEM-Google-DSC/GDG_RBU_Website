"use client";

import React, { useEffect, useState } from "react";



const GDGPreloader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const getForceShow = () => {
    try {
      return (
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("showPreloader")
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const rawPath = window.location.pathname || "/";
    const path = rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "");
    const force = getForceShow();

    if (path !== "/" && !force) return;

    const alreadyShown = sessionStorage.getItem("gdgPreloaderShown") === "1";
    if (alreadyShown && !force) return;

    try {
      sessionStorage.setItem("gdgPreloaderShown", "1");
    } catch (e) {
   
      console.warn("GDGPreloader: sessionStorage write failed", e);
    }

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    setVisible(true);
    document.documentElement.classList.add("preloader-active");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("preloader-active");
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.body.style.overflow = prevBodyOverflow || "";
      setVisible(false);
    }, 4000); 

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("preloader-active");
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.body.style.overflow = prevBodyOverflow || "";
    };
  }, []);

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      className="gdg-preloader-wrapper"
      role="status"
      aria-hidden="true"
      data-preloader="gdg"
    >
      <style>{`
        .gdg-preloader-wrapper {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: grid;
            place-items: center;
            background-color: #ffffff; /* plain background: ripple/grid removed */
            font-family: 'Google Sans', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow: hidden;
            touch-action: none;
            overscroll-behavior: none;
            perspective: 1000px;
        }

        .loader-container {
            position: relative;
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform-style: preserve-3d;
            padding: 18px;
            box-sizing: border-box;
        }

        /* Adjust this width to increase/decrease logo size */
        .gdg-svg {
            width: 520px;
            height: auto;
            max-width: calc(100% - 64px);
            max-height: 420px;
            overflow: visible;
            filter: drop-shadow(0 18px 40px rgba(0,0,0,0.15));
            transform-origin: center;
        }

        .logo-part {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
            will-change: transform, opacity;
        }

        /* Keep your sequential pulse / orbit styles untouched (if you prefer pulse-only update later I can change) */
        #group-red { animation: orbit-enter-red 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-blue { animation: orbit-enter-blue 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-green { animation: orbit-enter-green 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-yellow { animation: orbit-enter-yellow 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }

        .loading-text {
            margin-top: 2rem;
            color: #202124;
            font-size: 1.2rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            font-weight: 800;
            position: relative;
            text-shadow: 2px 2px 0px rgba(31,134,251,0.12), -2px -2px 0px rgba(253,43,37,0.08);
            animation: text-flicker 4s infinite;
        }

        /* Keyframes (preserved behavior) */
        @keyframes orbit-enter-red {
            0% { transform: translate3d(-1200px, -600px, -1000px) rotate3d(1, 1, 0, 720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0, 0, 0) rotate3d(0,0,0,0) scale(1); filter: saturate(1); }
            30% { transform: scale(1.05); filter: saturate(1.4) drop-shadow(0 10px 30px rgba(253,43,37,0.22)); }
            35% { transform: scale(1); filter: saturate(1); }
            65% { transform: translate3d(0,0,0) rotate3d(0,0,0,0); opacity: 1; }
            100% { transform: translate3d(-120px, -90px, 0) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-blue {
            0% { transform: translate3d(-1000px, 700px, -700px) rotate3d(0,1,1,-720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0,0,0) rotate3d(0,0,0,0) scale(1); filter: saturate(1); }
            45% { transform: scale(1.02); filter: saturate(1.35) drop-shadow(0 10px 30px rgba(31,134,251,0.22)); }
            65% { transform: translate3d(0,0,0) rotate3d(0,0,0,0); opacity: 1; }
            100% { transform: translate3d(-120px, 90px, 0) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-green {
            0% { transform: translate3d(1000px, -600px, -700px) rotate3d(1,0,1,720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0,0,0) rotate3d(0,0,0,0) scale(1); filter: saturate(1); }
            55% { transform: scale(1.02); filter: saturate(1.35) drop-shadow(0 10px 30px rgba(0,170,71,0.20)); }
            65% { transform: translate3d(0,0,0) rotate3d(0,0,0,0); opacity: 1; }
            100% { transform: translate3d(120px, -90px, 0) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-yellow {
            0% { transform: translate3d(1000px, 700px, -1200px) rotate3d(0,1,-1,-720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0,0,0) rotate3d(0,0,0,0) scale(1); filter: saturate(1); }
            65% { transform: scale(1.02); filter: saturate(1.35) drop-shadow(0 10px 30px rgba(255,166,0,0.18)); }
            100% { transform: translate3d(120px, 90px, 0) scale(1); opacity: 0; }
        }

        @keyframes text-flicker {
            0%, 69% { opacity: 1; transform: skewX(0deg); }
            70% { opacity: 0.85; transform: skewX(-8deg); text-shadow: -2px 0 rgba(253,43,37,0.3), 2px 0 rgba(31,134,251,0.3); }
            71% { opacity: 1; transform: skewX(10deg); text-shadow: 2px 0 rgba(0,170,71,0.28), -2px 0 rgba(255,166,0,0.28); }
            72% { opacity: 1; transform: skewX(0deg); text-shadow: 2px 2px 0 rgba(31,134,251,0.14), -2px -2px 0 rgba(253,43,37,0.12); }
            95% { opacity: 1; }
            100% { opacity: 0; }
        }

        @media (max-width: 900px) {
          .gdg-svg { width: calc(100% - 64px); max-height: 320px; }
          .loading-text { font-size: 1.0rem; margin-top: 1.2rem; letter-spacing: 0.2em; }
        }

        @media (max-width: 480px) {
          .gdg-svg { width: calc(100% - 32px); max-height: 220px; }
          .loading-text { font-size: 0.95rem; margin-top: 0.9rem; letter-spacing: 0.18em; }
        }
      `}</style>

      <div className="loader-container">
       
        <svg
          className="gdg-svg"
          width="156"
          height="86"
          viewBox="0 0 156 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <g id="group-red" className="logo-part">
            <path d="M45.4377 8.54478L12.5118 30.906C5.60173 35.599 4.02525 44.6976 8.99066 51.2285C13.9561 57.7594 23.583 59.2494 30.4931 54.5565L63.419 32.1952C70.3291 27.5023 71.9056 18.4036 66.9402 11.8727C61.9748 5.34184 52.3478 3.85186 45.4377 8.54478Z" fill="#FD2B25"/>
          </g>

          <g id="group-blue" className="logo-part">
            <path d="M30.5283 30.9567C23.6182 26.2638 13.9912 27.7538 9.02581 34.2847C4.06041 40.8155 5.63689 49.9142 12.547 54.6071L45.4728 76.9684C52.3829 81.6613 62.0099 80.1713 66.9753 73.6405C71.9407 67.1096 70.3642 58.0109 63.4541 53.318L30.5283 30.9567Z" fill="#1F86FB"/>
          </g>

          <g id="group-yellow" className="logo-part">
            <path d="M125.028 30.9471L92.1026 53.3084C85.1925 58.0013 83.6161 67.1 88.5815 73.6309C93.5469 80.1618 103.174 81.6517 110.084 76.9588L143.01 54.5976C149.92 49.9046 151.496 40.8059 146.531 34.2751C141.566 27.7442 131.939 26.2542 125.028 30.9471Z" fill="#FFA600"/>
          </g>

          <g id="group-green" className="logo-part">
            <path d="M110.057 8.49725C103.147 3.80433 93.5195 5.2943 88.5541 11.8252C83.5887 18.3561 85.1652 27.4548 92.0753 32.1477L125.001 54.5089C131.911 59.2018 141.538 57.7119 146.504 51.181C151.469 44.6501 149.893 35.5514 142.982 30.8585L110.057 8.49725Z" fill="#00AA47"/>
          </g>
        </svg>

       
      </div>
    </div>
  );
};

export default GDGPreloader;
