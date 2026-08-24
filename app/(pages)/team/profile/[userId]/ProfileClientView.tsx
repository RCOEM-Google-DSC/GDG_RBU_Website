"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Code,
  Mail,
  Send,
  Download,
  Pencil,
  LayoutDashboard,
  Info,
} from "lucide-react";
import EditProfileModal from "@/app/Components/team/EditProfileModal";
import { SocialButton } from "@/app/Components/team/SocialButton";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

/* Decorations */
const DecoCross = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
  >
    <path d="M6 6L18 18M6 18L18 6" />
  </svg>
);
const DecoZigZag = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 20"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
  >
    <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" />
  </svg>
);
const DecoCircle = ({ className }: { className?: string }) => (
  <div
    className={`${className} rounded-full border-4 border-black bg-transparent`}
  />
);

export interface ProfileData {
  userid: string;
  domain?: string | null;
  club_role?: string | null;
  bio?: string | null;
  thought?: string | null;
  leetcode?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  club_email?: string | null;
  cv_url?: string | null;
  users: {
    id: string;
    name: string;
    email: string;
    image_url?: string | null;
    profile_links?: {
      github?: string;
      linkedin?: string;
      resume?: string;
    };
    branch?: string;
    section?: string;
    phone_number?: string;
    role?: string;
  };
}

interface ProfileClientViewProps {
  profile: ProfileData;
  isSelf: boolean;
  authUserId: string | null;
}

export default function ProfileClientView({
  profile,
  isSelf,
  authUserId,
}: ProfileClientViewProps) {
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);

  const handleProfileUpdate = () => {
    router.refresh();
  };

  const u = profile.users ?? {};
  const resumeUrl = profile.cv_url || u?.profile_links?.resume;

  return (
    <div className="min-h-screen text-black relative overflow-hidden font-['Gesit','Gesit-Regular',sans-serif] selection:bg-yellow-300 selection:text-black">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <DecoCross className="hidden md:block absolute top-20 right-20 w-12 h-12 text-black opacity-100 rotate-12" />
        <DecoCross className="hidden md:block absolute bottom-40 left-10 w-16 h-16 text-black opacity-100 -rotate-12" />
        <DecoCircle className="hidden md:block absolute top-[40%] right-[10%] w-24 h-24 border-black opacity-100" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16 md:mb-20">
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative group">
              <NeoBrutalism
                border={4}
                rounded="xl"
                shadow="xl"
                hover="lift"
                className="relative w-80 h-80 md:w-96 md:h-96 bg-white overflow-hidden p-0"
              >
                <Image
                  height={800}
                  width={800}
                  alt={u?.name ?? "profile"}
                  src={u?.image_url ?? "/placeholder.png"}
                  className="w-full h-full object-cover transition-all duration-300"
                  priority
                />
              </NeoBrutalism>

              <NeoBrutalism
                border={2}
                shadow="md"
                className="absolute -top-6 -right-6 bg-yellow-300 px-3 py-1 font-black transform rotate-12"
              >
                HELLO!
              </NeoBrutalism>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase leading-[0.9]">
                {u?.name}
              </h1>
              <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold transform -rotate-1">
                {(profile.club_role === "mentor" ? "MENTOR" : (profile.domain || "Member")).toUpperCase()}
              </div>
            </div>

            <NeoBrutalism
              border={2}
              shadow="xl"
              className="bg-white p-6 relative"
            >
              <DecoZigZag className="absolute -top-3 left-4 w-20 h-4 text-yellow-400" />
              <p className="text-xl font-bold leading-relaxed">
                &quot;{profile.bio || "No bio yet."}&quot;
              </p>
            </NeoBrutalism>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <a
                href={`mailto:${u?.email}`}
                className={nb({
                  border: 2,
                  shadow: "md",
                  hover: "lift",
                  active: "push",
                  className:
                    "flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black font-black text-lg hover:bg-yellow-400",
                })}
              >
                <Send size={20} strokeWidth={3} /> SAY HELLO
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={nb({
                    border: 2,
                    shadow: "md",
                    hover: "lift",
                    active: "push",
                    className:
                      "flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-lg hover:bg-gray-50",
                  })}
                >
                  <Download size={20} strokeWidth={3} /> RESUME
                </a>
              )}

              {isSelf && (
                <>
                  <Link
                    href="/portfolio-builder"
                    className={nb({
                      border: 2,
                      shadow: "md",
                      hover: "lift",
                      active: "push",
                      className:
                        "flex items-center gap-2 px-4 py-3 bg-green-400 text-black font-bold hover:bg-green-500",
                    })}
                  >
                    <LayoutDashboard size={18} strokeWidth={2.5} /> PORTFOLIO
                  </Link>

                  <button
                    onClick={() => setShowEdit(true)}
                    className={nb({
                      border: 2,
                      shadow: "md",
                      hover: "lift",
                      active: "push",
                      className:
                        "flex items-center gap-2 px-4 py-3 bg-blue-300 text-black font-bold hover:bg-blue-400",
                    })}
                  >
                    <Pencil size={18} strokeWidth={2.5} />
                  </button>

                  <Link
                    href="/admin"
                    className={nb({
                      border: 2,
                      shadow: "md",
                      hover: "lift",
                      active: "push",
                      className:
                        "flex items-center gap-2 px-4 py-3 bg-red-300 text-black font-bold hover:bg-red-400",
                    })}
                  >
                    <LayoutDashboard size={18} strokeWidth={2.5} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NeoBrutalism
            border={2}
            shadow="xl"
            className="bg-yellow-50 p-8 relative min-h-[250px] flex flex-col justify-center"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/10 rotate-2 backdrop-blur-sm border-l border-r border-white/30"></div>
            <div className="absolute top-4 right-4 text-black">
              <Code size={32} strokeWidth={2.5} />
            </div>

            <h3 className="text-base font-black uppercase text-black mb-4 border-b-2 border-black inline-block self-start">
              Philosophy
            </h3>
            <p className="text-2xl font-black italic text-black leading-tight">
              &quot;{profile.thought || "No thought shared."}&quot;
            </p>
          </NeoBrutalism>

          <NeoBrutalism
            border={2}
            shadow="xl"
            className="md:col-span-2 bg-white p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <h3 className="flex w-60 items-center gap-2 text-lg font-black uppercase bg-black text-white px-2 py-1">
                  <Info size={18} /> Campus Info
                </h3>
                <ul className="text-black font-bold text-lg space-y-1 pl-2 border-l-4 border-gray-200">
                  <li>{u?.branch || "—"}</li>
                  <li>Section {u?.section || "?"}</li>
                  {isSelf && <li>Phone: {u?.phone_number || "—"}</li>}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="flex w-45 items-center gap-2 text-lg font-black uppercase bg-black text-white px-2 py-1">
                  <Mail size={18} /> Contacts
                </h3>
                <ul className="text-black font-bold text-lg pl-2 border-l-4 border-gray-200">
                  <li className="break-all max-w-full overflow-x-auto">{u?.email}</li>
                </ul>
              </div>
            </div>

            <div className="border-t-4 border-black pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="font-black text-xl uppercase">
                  Find me on:
                </span>

                <div className="flex gap-4 flex-wrap">
                  <SocialButton
                    platform="github"
                    href={u?.profile_links?.github}
                    label="GitHub"
                  />
                  <SocialButton
                    platform="linkedin"
                    href={u?.profile_links?.linkedin}
                    label="LinkedIn"
                  />
                  <SocialButton
                    platform="twitter"
                    href={profile.twitter}
                    label="Twitter"
                  />
                  <SocialButton
                    platform="instagram"
                    href={profile.instagram}
                    label="Instagram"
                  />
                  <SocialButton
                    platform="leetcode"
                    href={profile.leetcode}
                    label="LeetCode"
                  />
                </div>
              </div>
            </div>
          </NeoBrutalism>
        </div>
      </div>

      {showEdit && authUserId && (
        <EditProfileModal
          open={showEdit}
          onClose={() => setShowEdit(false)}
          onSuccess={handleProfileUpdate}
          profile={profile}
          userId={authUserId}
        />
      )}
    </div>
  );
}
