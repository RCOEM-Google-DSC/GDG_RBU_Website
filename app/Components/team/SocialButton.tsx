import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Linkedin, Instagram, Globe } from "lucide-react";
import { TbBrandLeetcode } from "react-icons/tb";
export type SocialPlatform = "github" | "linkedin" | "twitter" | "instagram" | "leetcode" | "website";

interface SocialButtonProps {
  href?: string | null;
  platform: SocialPlatform;
  label?: string;
  className?: string;
}

const platformConfig: Record<SocialPlatform, {
  icon: React.ElementType;
  bgClass: string;
  textClass: string;
  hoverClass: string
}> = {
  github: {
    icon: AiFillGithub,
    bgClass: "bg-white",
    textClass: "text-black",
    hoverClass: "hover:bg-[#24292e] hover:text-white",
  },
  linkedin: {
    icon: Linkedin,
    bgClass: "bg-white",
    textClass: "text-[#0077b5]",
    hoverClass: "hover:bg-[#0077b5] hover:text-white",
  },
  twitter: {
    icon: FaXTwitter,
    bgClass: "bg-white",
    textClass: "text-black",
    hoverClass: "hover:bg-black hover:text-white",
  },
  instagram: {
    icon: Instagram,
    bgClass: "bg-white",
    textClass: "text-[#E1306C]",
    hoverClass: "hover:bg-[#E1306C] hover:text-white",
  },
  leetcode: {
    icon: TbBrandLeetcode,
    bgClass: "bg-white",
    textClass: "text-black",
    hoverClass: "hover:bg-[#FFA116] ",
  },
  website: {
    icon: Globe,
    bgClass: "bg-white",
    textClass: "text-gray-700",
    hoverClass: "hover:bg-gray-700 hover:text-white",
  },
};

export function SocialButton({ href, platform, label, className = "" }: SocialButtonProps) {
  if (!href) return null;

  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label || platform}
      className={`
        group flex items-center gap-2 p-3
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
        ${config.bgClass}
        ${config.textClass}
        ${config.hoverClass}
        ${className}
      `}
    >
      <Icon size={23} strokeWidth={2.5} className="" />
      {platform === "leetcode" && label && <span className="font-bold">{label}</span>}
    </a>
  );
}