"use client";

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { UIUser } from "../../../lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CompleteProfileDialog } from "./CompleteProfileDialog";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

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
        <NeoBrutalism border={3} shadow="xl" rounded="xl" className="bg-white p-6 flex flex-col items-center">
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
                { Icon: Github, key: "github", href: user.profileLinks?.github, color: "bg-black" },
                { Icon: Linkedin, key: "linkedin", href: user.profileLinks?.linkedin, color: "bg-[#4284ff]" },
                { Icon: FaXTwitter, key: "twitter", href: user.profileLinks?.twitter, color: "bg-black" },
              ].map(({ Icon, key, href, color }) =>
                href ? (
                    <Link
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${key} profile`}
                      className={nb({
                          border: 2,
                          shadow: "md",
                          rounded: "lg",
                          hover: "liftSmall",
                          className: `flex items-center justify-center size-11 ${color} text-white`
                      })}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                ) : (
                  <NeoBrutalism
                      key={key}
                      border={2}
                      shadow="md"
                      rounded="lg"
                      className="opacity-40 flex items-center justify-center size-11 bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  >
                      <Icon className="w-5 h-5" />
                  </NeoBrutalism>
                ),
              )}
            </div>

            {/* Edit Button */}
            <CompleteProfileDialog
              user={user}
              trigger={
                <Button className={nb({
                      border: 2,
                      shadow: "lg",
                      rounded: "xl",
                      hover: "liftSmall",
                      className: "w-full flex items-center justify-center gap-2 bg-black text-white px-5 py-3 font-bold text-sm whitespace-nowrap hover:bg-neutral-800"
                  })}>
                    EDIT PROFILE
                  </Button>
              }
            />
          </NeoBrutalism>
      </div>

      {/* Right Side - Info & Contact */}
      <div className="lg:col-span-8 space-y-6">
        {/* Bio Card */}
        {user.bio && (
          <NeoBrutalism border={3} shadow="xl" rounded="xl" className="bg-white p-6">
              <div className="flex items-start gap-3 mb-3">
                <h3 className="text-xl font-black text-black tracking-tight pt-1">ABOUT ME</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed font-medium pl-1">
                {user.bio}
              </p>
          </NeoBrutalism>
        )}

        {/* Contact Info Grid */}
        <NeoBrutalism border={3} shadow="xl" rounded="xl" className="h-63 bg-white p-6">
            <div className="flex items-start gap-3 mb-4">
              <h3 className="text-xl font-black text-black tracking-tight pt-1">CONTACT INFO</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
              {user.email && (
                <NeoBrutalism border={2} shadow="md" rounded="lg" className="flex items-center gap-2 bg-yellow-200 px-4 py-3 font-medium">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">{user.email}</span>
                </NeoBrutalism>
              )}

              {user.phone && (
                <NeoBrutalism border={2} shadow="md" rounded="lg" className="flex items-center gap-2 bg-red-400 px-4 py-3 font-medium text-white">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{user.phone}</span>
                </NeoBrutalism>
              )}

              {(user.section || user.branch) && (
                <NeoBrutalism border={2} shadow="md" rounded="lg" className="md:col-span-2 flex items-center gap-2 bg-indigo-400 px-4 py-3 font-medium text-white">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-sm">
                      {user.section && user.branch 
                        ? `${user.section} - ${user.branch}`
                        : user.section || user.branch}
                    </span>
                </NeoBrutalism>
              )}
            </div>
          </NeoBrutalism>
        
      </div>
    </div>
  );
}