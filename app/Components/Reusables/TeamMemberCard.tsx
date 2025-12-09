import React from "react";
import { Github, Linkedin } from "lucide-react";

interface PathDimensions {
  w: number;
  h: number;
  r: number;
  nw: number;
  nh: number;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

const createPath = (w: number, h: number, r: number, nw: number, nh: number): string => {
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

export default function TeamMemberCard({
  name,
  role,
  imageUrl,
  githubUrl,
  linkedinUrl,
  
}: TeamMemberCardProps) {
  const width = 300;
  const height = 400;
  const cornerRadius = 24; 
  const notchWidth = 160;
  const notchHeight = 110;
  const gap = 12;

  const outerPath = createPath(width, height, cornerRadius, notchWidth, notchHeight);
  const innerW = width - gap * 2;
  const innerH = height - gap * 2;
  const innerR = Math.max(0, cornerRadius - gap);
  const innerPath = createPath(innerW, innerH, innerR, notchWidth, notchHeight);

  const clipId = `clip-${name.replace(/\s/g, "")}`;

  return (
    <div
     
      className="relative inline-block group cursor-pointer"
      style={{ width, height }}
    >
      <svg width={width} height={height} className="absolute inset-0 w-full h-full drop-shadow-xl">
        <defs>
          <clipPath id={clipId}>
            <path d={innerPath} />
          </clipPath>
        </defs>

        <path d={outerPath} fill="white" />

        <g transform={`translate(${gap}, ${gap})`}>
          <image
            href={imageUrl}
            x="0"
            y="0"
            width={innerW}
            height={innerH}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />

          <path d={innerPath} fill="none" stroke="black" strokeWidth="2" />
        </g>

        <path d={outerPath} fill="none" stroke="black" strokeWidth="2.5" />
      </svg>

      {/* Social Icons */}
      <div
        className="absolute bottom-[35px] left-[24px] flex gap-4 z-10"
        onClick={(e) => e.stopPropagation()} // So clicking icons doesn’t open profile
      >
        <a
          href={githubUrl}
          target="_blank"
          className="text-black hover:scale-110 transition-transform bg-white/30 p-1.5 rounded-full border border-black/10"
        >
          <Github size={24} strokeWidth={2.5} />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          className="text-black hover:scale-110 transition-transform bg-white/30 p-1.5 rounded-full border border-black/10"
        >
          <Linkedin size={24} strokeWidth={2.5} />
        </a>
      </div>

      {/* Bottom Label */}
      <div
        className="absolute bottom-0 right-0 bg-white border-2 border-black rounded-[20px] flex flex-col items-center justify-center overflow-hidden"
        style={{ width: notchWidth - 10, height: notchHeight - 10 }}
      >
        <div className="w-full h-1/2 flex items-center justify-center border-b-2 border-black">
          <span className="text-lg font-medium uppercase">{role}</span>
        </div>
        <div className="w-full h-1/2 flex items-center justify-center">
          <span className="text-lg font-bold">{name}</span>
        </div>
      </div>
    </div>
  );
}
