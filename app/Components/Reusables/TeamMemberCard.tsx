"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

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
  nh: number,
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
    router.push(`/team/profile/${id}`);
  };

  const width = 350;
  const height = 467;
  const cornerRadius = 24;
  const notchWidth = 200;
  const notchHeight = 90;
  const borderWidth = 8;

  const outerPath = createPath(
    width,
    height,
    cornerRadius,
    notchWidth,
    notchHeight,
  );

  const innerW = width - borderWidth * 2;
  const innerH = height - borderWidth * 2;
  const innerR = Math.max(0, cornerRadius - borderWidth);
  const innerPath = createPath(innerW, innerH, innerR, notchWidth, notchHeight);

  const clipId = `clip-team-${id}`;

  return (
    <div
      className="relative inline-block cursor-pointer w-full max-w-[350px] aspect-3/4"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-full group transition-transform duration-300 hover:-translate-y-2">

        {/* 🔹 GLASS ARROW BUTTON (ONLY ADDITION) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className={nb({
            border: 2,
            shadow: "xs",
            rounded: "full",
            hover: "none",
            className:
              "absolute top-3 right-3 z-30 w-9 h-9 flex items-center justify-center backdrop-blur-md bg-white/40 border-black/20 transition-all duration-200 hover:bg-black hover:text-white hover:scale-110",
          })}
          aria-label="Open profile"
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 w-full h-full drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id={clipId}>
              <path d={innerPath} />
            </clipPath>
          </defs>

          <path d={outerPath} fill="black" />

          <g transform={`translate(${borderWidth}, ${borderWidth})`}>
            <path d={innerPath} fill="white" />
            <g clipPath={`url(#${clipId})`}>
              <image
                href={imageUrl}
                x="0"
                y="0"
                width={innerW}
                height={innerH}
                preserveAspectRatio="xMidYMid slice"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </g>
          </g>
        </svg>

        {/* Social icons */}
        <div
          className="absolute flex items-center justify-center gap-1 z-20"
          style={{
            bottom: borderWidth + 15,
            left: (width - notchWidth) / 2 - 25,
            transform: "translateX(-50%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-all duration-300 bg-white/30 hover:bg-black backdrop-blur-md p-1.5 rounded-full border border-black/10 hover:border-black shadow-sm"
          >
            <Github className="w-5 h-5" strokeWidth={2} />
          </Link>

          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-all duration-300 bg-white/30 hover:bg-[#0077b5] backdrop-blur-md p-1.5 rounded-full border border-black/10 hover:border-[#0077b5] shadow-sm"
          >
            <Linkedin className="w-5 h-5" strokeWidth={2} />
          </Link>
        </div>

        {/* Name */}
        <div
          className={nb({
            border: 3,
            shadow: "none",
            rounded: "2xl",
            className: "absolute bottom-0 right-0 bg-white md:rounded-[20px] flex items-center justify-center overflow-hidden px-3 md:px-4 z-10"
          })}
          style={{
            width: `${((notchWidth - borderWidth * 2) / width) * 100}%`,
            height: `${((notchHeight - borderWidth * 2) / height) * 100}%`,
            margin: `${(borderWidth / width) * 100}%`,
          }}
        >
          <span className="text-base md:text-lg font-black leading-tight text-center">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
