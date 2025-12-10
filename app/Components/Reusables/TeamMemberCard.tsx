"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";



interface TeamMemberCardProps {
  id: string; 
  name: string;
  role: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}



const createPath = (
  w: number,
  h: number,
  r: number,
  nw: number,
  nh: number
): string => {
  return `
    M ${r},0 
    L ${w - r},0 
    Q ${w},0 ${w},${r} 
    L ${w},${h - nh - r} 
    Q ${w},${h - nh} ${w - r},${h - nh} 
    L ${w - nw + r},${h - nh} 
    Q ${w - nw},${h - nh} ${w - nw},${h - nh + r} 
    L ${w - nw},${h - r} 
    Q ${w - nw},${h} ${w - nw - r},${h} 
    L ${r},${h} 
    Q 0,${h} 0,${h - r} 
    L 0,${r} 
    Q 0,0 ${r},0 
    Z
  `;
};


function TeamMemberCard({
  id,
  name,
  role,
  imageUrl,
  githubUrl,
  linkedinUrl,
}: TeamMemberCardProps) {
  const router = useRouter();
  const [authUserId, setAuthUserId] = useState<string | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthUserId(data.session?.user?.id ?? null);
    });
  }, []);

  const handleCardClick = () => {
 
    if (authUserId && authUserId === id) {
      router.push("/profile");
      return;
    }

   
    router.push(`/team-profile/${id}`);
  };

  const width = 300;
  const height = 400;
  const cornerRadius = 24;
  const notchWidth = 180;
  const notchHeight = 110;
  const gap = 12;

  const outerPath = createPath(
    width,
    height,
    cornerRadius,
    notchWidth,
    notchHeight
  );

  const innerW = width - gap * 2;
  const innerH = height - gap * 2;
  const innerR = Math.max(0, cornerRadius - gap);
  const innerPath = createPath(
    innerW,
    innerH,
    innerR,
    notchWidth,
    notchHeight
  );

  const clipId = `clip-${id}`;

  return (
    <div
      className="relative inline-block group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
      style={{ width, height }}
      onClick={handleCardClick}
    >
      <svg
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full drop-shadow-xl"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={innerPath} />
          </clipPath>
        </defs>

        {/* Outer */}
        <path d={outerPath} fill="white" />

        <g transform={`translate(${gap}, ${gap})`}>
          <image
            href={imageUrl}
            width={innerW}
            height={innerH}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <path d={innerPath} fill="none" stroke="black" strokeWidth="2" />
        </g>

        <path d={outerPath} fill="none" stroke="black" strokeWidth="2.5" />
      </svg>

      <div
        className="absolute bottom-[35px] flex gap-4 z-10 -translate-x-1/2"
        style={{ left: (width - notchWidth) / 2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:scale-110 transition-transform bg-white/80 p-2 rounded-full border"
        >
          <Github size={20} strokeWidth={2.5} />
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:scale-110 transition-transform bg-white/80 p-2 rounded-full border hover:bg-[#0077b5] hover:text-white"
        >
          <Linkedin size={20} strokeWidth={2.5} />
        </a>
      </div>

    
      <div
        className="absolute bottom-0 right-0 bg-white border-2 border-black rounded-[20px] flex flex-col items-center justify-center overflow-hidden"
        style={{ width: notchWidth - 10, height: notchHeight - 10 }}
      >
        <div className="w-full h-1/2 flex items-center justify-center border-b-2 border-black bg-yellow-50/50">
          <span className="text-sm tracking-widest font-bold uppercase">
            {role}
          </span>
        </div>
        <div className="w-full h-1/2 flex items-center justify-center px-1 text-center">
          <span className="text-lg font-black leading-none">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
