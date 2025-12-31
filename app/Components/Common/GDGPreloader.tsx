"use client";
import React, { useEffect, useState } from "react";

/**
 * Show the preloader only once per browser tab/session.
 * Behavior: only show when the current pathname is "/" (home).
 *
 * Fix for hydration mismatch:
 *  - Do not render any DOM until the component has mounted on the client.
 *  - After mount, run the same session+route logic and then render the preloader DOM.
 *
 * NOTE: All of your original SVG paths and styles are preserved exactly.
 */

const GDGPreloader: React.FC = () => {
  // mounted prevents rendering any DOM on the server or during initial hydration.
  const [mounted, setMounted] = useState(false);

  // visible controls whether the preloader DOM is shown after mount.
  const [visible, setVisible] = useState(false);

  // helper to check force-show param
  const getForceShow = () => {
    try {
      return typeof window !== "undefined" && new URLSearchParams(window.location.search).has("showPreloader");
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // mark as mounted (ensures we don't render the preloader until client mount)
    setMounted(true);

    // now run the rest only on client
    if (typeof window === "undefined") return;

    const rawPath = window.location.pathname || "/";
    const path = rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "");
    const force = getForceShow();

    // route guard: only show on root path (unless forced)
    if (path !== "/" && !force) {
      // do not set visible -> component stays null
      return;
    }

    // session guard
    const alreadyShown = sessionStorage.getItem("gdgPreloaderShown") === "1";
    if (alreadyShown && !force) {
      return;
    }

    // mark shown for session
    try {
      sessionStorage.setItem("gdgPreloaderShown", "1");
    } catch (e) {
      // ignore storage failures
      // eslint-disable-next-line no-console
      console.warn("GDGPreloader: sessionStorage write failed", e);
    }

    // store previous overflow so we can restore
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    // activate preloader and lock scroll
    setVisible(true);
    document.documentElement.classList.add("preloader-active");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // remove after animation duration
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

  // Don't render anything until we've mounted on the client.
  if (!mounted) return null;

  // Only render preloader DOM when visible is true.
  if (!visible) return null;

  return (
    <div className="gdg-preloader-wrapper" aria-hidden="true" role="status">
      <style>{`
        .gdg-preloader-wrapper {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: grid;
            place-items: center;
            background-color: #ffffff;
            font-family: 'Google Sans', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow: hidden;
            touch-action: none;
            overscroll-behavior: none;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                linear-gradient(0deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
            perspective: 1000px;
        }

        .loader-container {
            position: relative;
            width: 100%;
            max-width: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform-style: preserve-3d;
            padding: 18px;
            box-sizing: border-box;
        }

        .gdg-svg {
            width: 100%;
            height: auto;
            max-height: 350px;
            overflow: visible;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
        }

        .logo-part {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
            will-change: transform, opacity;
        }

        #group-red { animation: orbit-enter-red 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-blue { animation: orbit-enter-blue 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-green { animation: orbit-enter-green 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
        #group-yellow { animation: orbit-enter-yellow 4s cubic-bezier(0.7, 0, 0.3, 1) infinite; }

        .shockwave {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 5px solid rgba(66, 133, 244, 0.3);
            box-shadow: 0 0 50px rgba(66, 133, 244, 0.2), inset 0 0 20px rgba(66, 133, 244, 0.2);
            opacity: 0;
            z-index: -1;
            pointer-events: none;
            animation: shockwave-pulse 4s linear infinite;
        }

        .loading-text {
            margin-top: 3rem;
            color: #202124;
            font-size: 2rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            font-weight: 800;
            position: relative;
            text-shadow: 2px 2px 0px rgba(31, 134, 251, 0.2), -2px -2px 0px rgba(253, 43, 37, 0.2);
            animation: text-flicker 4s infinite;
        }

        @keyframes orbit-enter-red {
            0% { transform: translate3d(-1000px, -500px, -1000px) rotate3d(1, 1, 0, 720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0) scale(1); filter: saturate(1); }
            30% { transform: scale(1.05); filter: saturate(1.5) drop-shadow(0 5px 15px rgba(253, 43, 37, 0.4)); }
            35% { transform: scale(1); filter: saturate(1); }
            65% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0); opacity: 1; }
            100% { transform: translate3d(-50px, -50px, 0px) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-blue {
            0% { transform: translate3d(-1000px, 500px, -500px) rotate3d(0, 1, 1, -720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0) scale(1); filter: saturate(1); }
            40% { transform: scale(1); filter: saturate(1); }
            45% { transform: scale(1.05); filter: saturate(1.5) drop-shadow(0 5px 15px rgba(31, 134, 251, 0.4)); }
            50% { transform: scale(1); filter: saturate(1); }
            65% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0); opacity: 1; }
            100% { transform: translate3d(-50px, 50px, 0px) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-green {
            0% { transform: translate3d(1000px, -500px, -500px) rotate3d(1, 0, 1, 720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0) scale(1); filter: saturate(1); }
            50% { transform: scale(1); filter: saturate(1); }
            55% { transform: scale(1.05); filter: saturate(1.5) drop-shadow(0 5px 15px rgba(0, 170, 71, 0.4)); }
            60% { transform: scale(1); filter: saturate(1); }
            65% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0); opacity: 1; }
            100% { transform: translate3d(50px, -50px, 0px) scale(1); opacity: 0; }
        }

        @keyframes orbit-enter-yellow {
            0% { transform: translate3d(1000px, 500px, -1000px) rotate3d(0, 1, -1, -720deg) scale(0); opacity: 0; }
            20% { opacity: 1; }
            25% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0) scale(1); filter: saturate(1); }
            60% { transform: scale(1); filter: saturate(1); }
            65% { transform: scale(1.05); filter: saturate(1.5) drop-shadow(0 5px 15px rgba(255, 166, 0, 0.4)); }
            70% { transform: scale(1); filter: saturate(1); }
            65% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0); opacity: 1; }
            100% { transform: translate3d(50px, 50px, 0px) scale(1); opacity: 0; }
        }

        @keyframes shockwave-pulse {
            0%, 24% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); }
            25% { opacity: 1; transform: translate(-50%, -50%) scale(0.2); border-width: 20px; }
            35% { opacity: 0; transform: translate(-50%, -50%) scale(4); border-width: 0px; }
            100% { opacity: 0; }
        }

        @keyframes text-flicker {
            0%, 69% { opacity: 1; transform: skewX(0deg); }
            70% { opacity: 0.8; transform: skewX(-10deg); text-shadow: -2px 0 rgba(253, 43, 37, 0.4), 2px 0 rgba(31, 134, 251, 0.4); }
            71% { opacity: 1; transform: skewX(10deg); text-shadow: 2px 0 rgba(0, 170, 71, 0.4), -2px 0 rgba(255, 166, 0, 0.4); }
            72% { opacity: 1; transform: skewX(0deg); text-shadow: 2px 2px 0px rgba(31, 134, 251, 0.2), -2px -2px 0px rgba(253, 43, 37, 0.2); }
            95% { opacity: 1; }
            100% { opacity: 0; }
        }

        @media (max-width: 420px) {
          .gdg-svg { max-height: 240px; }
          .loading-text { font-size: 1.2rem; margin-top: 1.6rem; letter-spacing: 0.2em; }
          .loader-container { padding: 12px; }
        }
      `}</style>

      <div className="loader-container">
        <div className="shockwave"></div>

        {/* SVG - unchanged (full paths preserved) */}
        <svg viewBox="0 0 1104 585" fill="none" xmlns="http://www.w3.org/2000/svg" className="gdg-svg">
          <defs>
            <filter id="color-boost">
              <feColorMatrix type="saturate" values="1.2"/>
            </filter>
          </defs>

          {/* Red */}
          <g id="group-red" className="logo-part">
            <path d="M125.608 412.083C118.984 412.083 111.898 411.631 105.283 410.274C72.2011 405.297 43.3657 387.65 23.5219 361.861C4.14102 335.618 -3.88911 303.947 1.78183 272.275C6.98092 240.602 25.4092 213.003 52.3484 194L301.896 22.5187C329.307 3.96831 362.389 -3.72395 395.471 1.70557C428.553 6.68308 457.388 24.3285 477.232 50.1183C496.613 76.361 504.652 108.033 498.972 139.705C493.773 171.377 475.345 198.977 448.406 217.979L198.858 389.46C177.118 404.392 152.075 412.083 126.079 412.083H125.608ZM374.675 16.6372C352.463 16.6372 330.251 23.4236 311.814 36.0925L62.2747 207.573C38.6384 223.862 23.5219 247.39 18.7947 274.989C14.0674 302.137 20.682 329.737 37.6948 351.907C54.7076 374.53 79.2876 389.008 108.114 393.533C136.478 398.057 165.304 391.723 188.46 375.435L438.008 203.954C461.635 187.665 476.76 164.137 481.488 136.538C486.215 109.39 479.6 81.7905 462.587 59.6204C445.566 36.9974 420.995 22.5187 392.159 17.9941C386.488 17.0892 380.346 16.6372 374.675 16.6372Z" fill="#202124"/>
            <path d="M306.436 29.2545L56.9598 200.872C4.60384 236.889 -7.34335 306.72 30.2789 356.843C67.9011 406.966 140.849 418.401 193.205 382.383L442.681 210.766C495.037 174.749 506.984 104.919 469.362 54.7961C431.74 4.67316 358.792 -6.76198 306.436 29.2545Z" fill="#FD2B25"/>
          </g>

          {/* Blue */}
          <g id="group-blue" className="logo-part">
            <path d="M374.657 583.564C348.67 583.564 323.147 575.872 301.878 560.941L52.3305 389.46C-3.90696 351.002 -16.6732 275.441 23.504 221.599C42.8849 195.357 72.1832 178.164 105.265 173.186C138.347 168.21 171.438 175.449 198.849 194L448.388 365.481C504.634 403.939 517.392 479.499 477.223 533.342C457.842 559.584 428.544 576.777 395.453 581.754C388.367 582.659 381.752 583.564 375.137 583.564H374.657ZM125.59 188.57C119.919 188.57 113.776 189.023 108.105 189.928C79.7415 194.452 54.6986 209.383 37.6858 231.553C20.6641 254.176 14.0495 281.324 18.7768 308.471C23.5041 335.618 39.1013 359.598 62.2569 375.887L311.805 547.367C335.432 563.656 363.787 569.99 392.15 565.466C420.505 560.941 445.557 546.011 462.57 523.841C479.582 501.218 486.197 474.07 481.47 446.922C476.751 419.775 461.154 395.795 437.99 379.506L188.451 208.025C170.013 195.357 148.274 188.57 125.59 188.57Z" fill="#202124"/>
            <path d="M193.472 201.26C141.116 165.242 68.1771 176.677 30.5549 226.801C-7.06735 276.924 4.87094 346.754 57.2269 382.771L306.703 554.388C359.059 590.405 432.007 578.97 469.629 528.847C507.252 478.724 495.304 408.894 442.948 372.877L193.472 201.26Z" fill="#1F86FB"/>
          </g>

          {/* Yellow */}
          <g id="group-yellow" className="logo-part">
            <path d="M728.196 583.565C688.971 583.565 650.69 566.372 626.11 533.795C585.942 479.952 598.699 404.845 654.945 365.934L904.484 194.453C931.895 175.902 964.986 168.211 998.068 173.64C1031.15 178.617 1059.98 196.263 1079.83 222.053C1120.01 275.895 1107.24 351.003 1051 389.914L801.455 561.395C779.243 576.779 753.719 584.018 728.196 584.018V583.565ZM977.272 188.571C955.06 188.571 932.848 195.358 914.411 208.027L664.872 379.507C616.664 412.989 605.314 477.69 640.292 523.841C675.27 569.991 742.849 580.85 791.057 547.368L1040.6 375.887C1088.81 342.406 1100.15 277.705 1065.18 231.554C1048.16 208.932 1023.59 194.453 994.756 189.929C989.085 189.024 982.942 188.571 977.272 188.571Z" fill="#202124"/>
            <path d="M909.487 201.189L660.011 372.806C607.655 408.824 595.716 478.654 633.339 528.777C670.961 578.899 743.9 590.335 796.256 554.318L1045.73 382.7C1098.09 346.684 1110.04 276.853 1072.41 226.73C1034.79 176.607 961.843 165.172 909.487 201.189Z" fill="#FFA600"/>
          </g>

          {/* Green */}
          <g id="group-green" className="logo-part">
            <path d="M977.272 412.081C951.276 412.081 925.752 404.389 904.484 389.458L654.945 217.977C598.699 179.518 585.942 103.958 626.11 50.1156C666.287 -3.72663 745.217 -15.9426 801.455 22.516L1051 193.997C1107.24 232.456 1120.01 308.016 1079.83 361.858C1060.45 388.101 1031.15 405.294 998.068 410.271C990.973 411.176 984.358 412.081 977.743 412.081H977.272ZM640.292 59.6177C623.279 82.2407 616.664 109.387 621.383 136.535C626.11 163.683 641.707 187.662 664.872 203.951L914.411 375.432C938.047 391.72 966.402 398.055 994.756 393.53C1023.11 389.006 1048.16 374.074 1065.18 351.904C1082.2 329.281 1088.81 302.134 1084.08 274.987C1079.36 247.839 1063.76 223.859 1040.6 207.571L791.057 36.0898C742.849 2.60779 675.27 13.4668 640.292 59.6177Z" fill="#202124"/>
            <path d="M796.051 28.8893C743.695 -7.12721 670.747 4.30793 633.125 54.4309C595.503 104.554 607.45 174.384 659.806 210.401L909.283 382.018C961.639 418.035 1034.58 406.6 1072.2 356.477C1109.82 306.354 1097.88 236.524 1045.53 200.507L796.051 28.8893Z" fill="#00AA47"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GDGPreloader;