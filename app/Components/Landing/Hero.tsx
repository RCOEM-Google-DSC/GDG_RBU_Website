// app/components/HeroExact.tsx
// Responsive Neo-Brutalist Hero with exact SVG path + video
// Tailwind CSS required

'use client';

import React from 'react';

export default function HeroExact() {
  return (
    <section className="relative w-full min-h-screen bg-[#FDFCF8] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="
          relative z-10
          max-w-[1600px] mx-auto
          px-5 sm:px-8 lg:px-12
          pt-10 sm:pt-16 lg:pt-24
          pb-12 lg:pb-24
          grid grid-cols-1 lg:grid-cols-12
          gap-8 lg:gap-0
          items-start
        "
      >
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6 relative z-30">
          <h1
            className="
              uppercase font-extrabold tracking-tight
              mb-4
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              leading-[0.95]
              lg:relative lg:-mr-32
            "
          >
            <span className="block whitespace-normal md:whitespace-nowrap">
              GOOGLE DEVELOPERS
            </span>
            <span className="block">GROUP, RBU</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              font-mono
              text-lg sm:text-xl
              leading-[1.75]
              lg:text-4xl
              text-black
              max-w-[800px]
            "
          >
            empowering students with<br />
            cutting-edge tech skills,<br />
            community, and resources<br />
            for a future in technology
          </p>

          {/* BUTTONS — WHITE SHADOW ON HOVER */}
          <div className="mt-8 flex gap-5">
            {/* Learn more */}
            <div className="relative group">
              <div
                className="
                  absolute -right-2 -bottom-2
                  bg-black
                  w-full h-full
                  transition-all duration-200
                  group-hover:bg-white
                  group-hover:translate-x-1
                  group-hover:translate-y-1
                "
              />
              <button
                className="
                  relative
                  border-2 border-black
                  bg-white text-black
                  h-12 px-7
                  text-sm font-bold uppercase
                  transition-all duration-200
                  group-hover:bg-black
                  group-hover:text-white
                  group-hover:rotate-[-2deg]
                  group-hover:scale-105
                  active:scale-95
                "
              >
                Learn more
              </button>
            </div>

            {/* Join */}
            <div className="relative group">
              <div
                className="
                  absolute -right-2 -bottom-2
                  bg-black
                  w-full h-full
                  transition-all duration-200
                  group-hover:bg-white
                  group-hover:translate-x-1
                  group-hover:translate-y-1
                "
              />
              <button
                className="
                  relative
                  border-2 border-black
                  bg-white text-black
                  h-12 px-7
                  text-sm font-bold uppercase
                  transition-all duration-200
                  group-hover:bg-black
                  group-hover:text-white
                  group-hover:rotate-[2deg]
                  group-hover:scale-105
                  active:scale-95
                "
              >
                Join
              </button>
            </div>
          </div>

          {/* Sticker */}
          <div className="mt-6">
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold -rotate-3">
              GDG • RBU
            </div>
          </div>
        </div>

        {/* RIGHT SVG SHAPE */}
        <div
          className="
            lg:col-span-6
            relative
            mt-4 sm:mt-6 lg:mt-10
            lg:-ml-8
            scale-[0.9] sm:scale-100 lg:scale-110 xl:scale-125
            origin-top lg:origin-left
          "
        >
          <svg
            width="100%"
            viewBox="0 0 1206 846"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="heroClip">
                <path d="M2.5 789.376C2.5 811.467 20.4086 829.376 42.5 829.376L319.873 829.376H806.751C848.725 829.376 882.751 795.35 882.751 753.376V674.5C882.751 652.409 900.66 634.5 922.751 634.5H1115.5C1157.47 634.5 1191.5 600.474 1191.5 558.5V291.418V42.5C1191.5 20.4086 1173.59 2.5 1151.5 2.5H881.026H569.765C547.673 2.5 529.765 20.4086 529.765 42.5V119.5V147.395C529.765 169.486 511.856 187.395 489.765 187.395H300.9H42.4999C20.4086 187.395 2.5 205.303 2.5 227.395V485.58V789.376Z" />
              </clipPath>
            </defs>

            {/* White inset */}
            <path
              d="M2.5 789.376C2.5 811.467 20.4086 829.376 42.5 829.376L319.873 829.376H806.751C848.725 829.376 882.751 795.35 882.751 753.376V674.5C882.751 652.409 900.66 634.5 922.751 634.5H1115.5C1157.47 634.5 1191.5 600.474 1191.5 558.5V291.418V42.5C1191.5 20.4086 1173.59 2.5 1151.5 2.5H881.026H569.765C547.673 2.5 529.765 20.4086 529.765 42.5V119.5V147.395C529.765 169.486 511.856 187.395 489.765 187.395H300.9H42.4999C20.4086 187.395 2.5 205.303 2.5 227.395V485.58V789.376Z"
              fill="#FDFCF8"
              transform="translate(6 7)"
            />

            {/* Video */}
            <foreignObject width="1206" height="846" clipPath="url(#heroClip)">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="https://devfest.gdgpune.in/_nuxt/hero-video-new.CpPeEJWA.webm"
                  type="video/webm"
                />
              </video>
            </foreignObject>

            {/* Stroke */}
            <path
              d="M2.5 789.376C2.5 811.467 20.4086 829.376 42.5 829.376L319.873 829.376H806.751C848.725 829.376 882.751 795.35 882.751 753.376V674.5C882.751 652.409 900.66 634.5 922.751 634.5H1115.5C1157.47 634.5 1191.5 600.474 1191.5 558.5V291.418V42.5C1191.5 20.4086 1173.59 2.5 1151.5 2.5H881.026H569.765C547.673 2.5 529.765 20.4086 529.765 42.5V119.5V147.395C529.765 169.486 511.856 187.395 489.765 187.395H300.9H42.4999C20.4086 187.395 2.5 205.303 2.5 227.395V485.58V789.376Z"
              fill="none"
              stroke="black"
              strokeWidth="5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
