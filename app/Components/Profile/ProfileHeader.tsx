"use client";

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { UIUser } from "../../../lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CompleteProfileDialog } from "./CompleteProfileDialog";

interface ProfileHeaderProps {
  user: UIUser;
}

// ✅ fallback avatar (MUST exist in /public)
const DEFAULT_AVATAR = "/avatar-placeholder.png";

export function ProfileHeader({ user }: ProfileHeaderProps) {
  // ✅ SAFE image src (this fixes the Invalid URL crash)
  const avatarSrc =
    user.avatarUrl &&
    typeof user.avatarUrl === "string" &&
    user.avatarUrl.startsWith("http")
      ? user.avatarUrl
      : DEFAULT_AVATAR;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Side - Avatar & Social */}
      <div className="lg:col-span-4">
        <div className="relative">
          <div className="absolute bg-black h-full w-full rounded-xl top-2 left-2" />
          <div className="relative bg-white border-[3px] border-black rounded-xl p-6 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="absolute bg-black size-40 rounded-full top-2 left-2" />
              <div className="relative size-40 rounded-full border-[3px] border-black overflow-hidden bg-white">
                <Image
                  src={avatarSrc}
                  width={300}
                  height={300}
                  alt={user.name || "Profile"}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-black text-black tracking-tight mb-1">
                {user.name || "UNNAMED USER"}
              </h1>
            </div>

            {/* Social Icons - Fixed */}
            <div className="flex gap-2 justify-center mb-6">
              {[
                { Icon: Github, key: "github", href: user.profileLinks?.github, color: "bg-black", isImage: false },
                { Icon: Linkedin, key: "linkedin", href: user.profileLinks?.linkedin, color: "bg-[#4284ff]", isImage: false },
                { Icon: null, key: "twitter", href: user.profileLinks?.twitter, color: "bg-black", isImage: true, imageSrc: "/icons/x-logo.png" },
              ].map(({ Icon, key, href, color, isImage, imageSrc }) =>
                href ? (
                  <div key={key} className="relative">
                    <div className="absolute bg-black size-11 rounded-lg top-1 left-1" />
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${key} profile`}
                      className={`relative flex items-center justify-center size-11 ${color} border-2 border-black rounded-lg text-white hover:translate-y-0.5 transition-transform`}
                    >
                      {isImage && imageSrc ? (
                        <Image src={imageSrc} alt={key} width={20} height={20} className="w-5 h-5" />
                      ) : (
                        Icon && <Icon className="w-5 h-5" />
                      )}
                    </Link>
                  </div>
                ) : (
                  <div key={key} className="relative opacity-40">
                    <div className="absolute bg-neutral-400 size-11 rounded-lg top-1 left-1" />
                    <div className="relative flex items-center justify-center size-11 bg-neutral-300 border-2 border-black rounded-lg text-neutral-500 cursor-not-allowed">
                      {isImage && imageSrc ? (
                        <Image src={imageSrc} alt={key} width={20} height={20} className="w-5 h-5 opacity-50" />
                      ) : (
                        Icon && <Icon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Edit Button */}
            <CompleteProfileDialog
              user={user}
              trigger={
                <div className="relative w-full">
                  <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
                  <Button className="relative w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 border-2 border-black text-white px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-transform hover:translate-y-0.5">
                    EDIT PROFILE
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Right Side - Info & Contact */}
      <div className="lg:col-span-8 space-y-6">
        {/* Bio Card */}
        {user.bio && (
          <div className="relative">
            <div className="absolute bg-black h-full w-full rounded-xl top-2 left-2" />
            <div className="relative bg-white border-[3px] border-black rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <h3 className="text-xl font-black text-black tracking-tight pt-1">ABOUT ME</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed font-medium pl-1">
                {user.bio}
              </p>
            </div>
          </div>
        )}

        {/* Contact Info Grid */}
        <div className="relative">
          <div className="absolute bg-black h-full w-full rounded-xl top-2 left-2" />
          <div className="relative h-63 bg-white border-[3px] border-black rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <h3 className="text-xl font-black text-black tracking-tight pt-1">CONTACT INFO</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
              {user.email && (
                <div className="relative">
                  <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
                  <div className="relative flex items-center gap-2 bg-yellow-200 border-2 border-black px-4 py-3 rounded-lg font-medium">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                </div>
              )}

              {user.phone && (
                <div className="relative">
                  <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
                  <div className="relative flex items-center gap-2 bg-red-400 border-2 border-black px-4 py-3 rounded-lg font-medium text-white">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </div>
              )}

              {(user.section || user.branch) && (
                <div className="relative md:col-span-2">
                  <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
                  <div className="relative flex items-center gap-2 bg-indigo-400 border-2 border-black px-4 py-3 rounded-lg font-medium text-white">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-sm">
                      {user.section && user.branch 
                        ? `${user.section} - ${user.branch}`
                        : user.section || user.branch}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
