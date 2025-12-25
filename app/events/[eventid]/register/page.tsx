"use client";

import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code,
  Mail,
  Send,
  MapPin,
  Download,
  Pencil,
  LayoutDashboard,
  X,
  ExternalLink,
} from "lucide-react";
import { useParams } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import EditProfileModal from "@/app/Components/team/EditProfileModal";
import Image from "next/image";
import Link from "next/link";

/* ---------------- NEO-BRUTALIST DECORATIONS (keeps original look + animations) ---------------- */

const DecoCross = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="4">
    <path d="M6 6L18 18M6 18L18 6" />
  </svg>
);

const DecoZigZag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" stroke="currentColor" strokeWidth="4">
    <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" />
  </svg>
);

const DecoCircle = ({ className }: { className?: string }) => (
  <div className={`${className} rounded-full border-4 border-black bg-transparent`} />
);

const SocialLinkNeo = ({ icon: Icon, href, label, colorClass = "hover:bg-blue-200" }: any) =>
  !href ? null : (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`
        group relative p-3 bg-white border-2 border-black text-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${colorClass}
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        transition-all duration-200
      `}
      title={label}
    >
      <Icon size={20} strokeWidth={2.5} />
    </a>
  );

/* -------------------------- MAIN -------------------------- */

export default function TeamProfilePage() {
  const { userId } = useParams();

  const [profile, setProfile] = useState<any>(null);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [authRole, setAuthRole] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  /* LOAD AUTH USER */
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const uid = data.session?.user?.id ?? null;
      setAuthUserId(uid);

      if (uid) {
        const { data: row } = await supabase.from("users").select("role").eq("id", uid).single();
        setAuthRole(row?.role ?? null);
      }
    });
  }, []);

  const isSelf = authUserId === userId;

  /* LOAD PROFILE (keeps existing backend query) */
  const loadProfile = async () => {
    const { data } = await supabase
      .from("team_members")
      .select(
        `
        userid,
        domain,
        bio,
        thought,
        leetcode,
        twitter,
        instagram,
        club_email,
        cv_url,
        users (
          id,
          name,
          email,
          image_url,
          profile_links,
          branch,
          section,
          phone_number
        )
      `
      )
      .eq("userid", userId)
      .maybeSingle();

    setProfile(data);
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!profile)
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">LOADING PROFILE...</div>
      </div>
    );

  const u = profile.users;
  const resumeUrl = profile.cv_url || u?.profile_links?.resume;

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-black relative overflow-hidden font-sans selection:bg-yellow-300 selection:text-black">
      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <DecoCross className="hidden md:block absolute top-20 right-20 w-12 h-12 text-black opacity-100 rotate-12" />
        <DecoCross className="hidden md:block absolute bottom-40 left-10 w-16 h-16 text-black opacity-100 -rotate-12" />
        <DecoCircle className="hidden md:block absolute top-[40%] right-[10%] w-24 h-24 border-black opacity-100" />
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* -------- TOP SECTION -------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16 md:mb-20">
          {/* AVATAR CARD */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative group">
              {/* Background offset square */}
              <div className="absolute top-4 left-4 w-full h-full bg-black rounded-xl transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2"></div>

              <div className="relative w-64 h-64 bg-white border-4 border-black rounded-xl overflow-hidden p-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:-translate-x-1">
                <Image
                  height={400}
                  width={400}
                  alt={u?.name ?? "profile"}
                  src={u?.image_url ?? "/placeholder.png"}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Floating Decoration */}
              <div className="absolute -top-6 -right-6 bg-yellow-300 border-2 border-black px-3 py-1 font-black transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                HELLO!
              </div>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase leading-[0.9]">
                {u?.name}
              </h1>
              <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold transform -rotate-1">
                {profile.domain?.toUpperCase()}
              </div>
            </div>

            {/* BIO CARD */}
            <div className="bg-white p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
              <DecoZigZag className="absolute -top-3 left-4 w-20 h-4 text-yellow-400" />
              <p className="text-xl font-bold leading-relaxed">"{profile.bio || "No bio yet."}"</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              {/* Say Hello */}
              <a
                href={`mailto:${u?.email}`}
                className="
                  flex items-center gap-2 px-6 py-3 
                  bg-yellow-300 text-black font-black text-lg
                  border-2 border-black
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-1 active:translate-y-1 active:shadow-none
                  transition-all duration-200
                "
              >
                <Send size={20} strokeWidth={3} /> SAY HELLO
              </a>

              {/* Resume */}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  className="
                    flex items-center gap-2 px-6 py-3 
                    bg-white text-black font-black text-lg
                    border-2 border-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    hover:bg-gray-50 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                    active:translate-y-0 active:shadow-none active:translate-x-1
                    transition-all duration-200
                  "
                >
                  <Download size={20} strokeWidth={3} /> RESUME
                </a>
              )}

              {/* Edit + Dashboard (If Self) */}
              {isSelf && (
                <>
                  <button
                    onClick={() => setShowEdit(true)}
                    className="
                      flex items-center gap-2 px-4 py-3 
                      bg-blue-300 text-black font-bold border-2 border-black
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      hover:bg-blue-400 hover:-translate-y-1
                      active:shadow-none active:translate-x-1 active:translate-y-1
                      transition-all
                    "
                  >
                    <Pencil size={18} strokeWidth={2.5} />
                  </button>

                  <Link
                    href="/admin"
                    className="
                      flex items-center gap-2 px-4 py-3 
                      bg-red-300 text-black font-bold border-2 border-black
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      hover:bg-red-400 hover:-translate-y-1
                      active:shadow-none active:translate-x-1 active:translate-y-1
                      transition-all
                    "
                  >
                    <LayoutDashboard size={18} strokeWidth={2.5} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* -------- LOWER SECTION -------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PHILOSOPHY CARD */}
          <div className="bg-yellow-50 border-2 border-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[250px] flex flex-col justify-center">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/10 rotate-2 backdrop-blur-sm border-l border-r border-white/30"></div>

            <div className="absolute top-4 right-4 text-black">
              <Code size={32} strokeWidth={2.5} />
            </div>

            <h3 className="text-base font-black uppercase text-black mb-4 border-b-2 border-black inline-block self-start">Philosophy</h3>

            <p className="text-2xl font-black italic text-black leading-tight">"{profile.thought || "No thought shared."}"</p>
          </div>

          {/* INFO & SOCIALS CONTAINER */}
          <div className="md:col-span-2 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* CAMPUS INFO */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-black uppercase bg-black text-white px-2 py-1 inline-block transform -rotate-1">
                  <MapPin size={18} /> Campus Info
                </h3>
                <ul className="text-black font-bold text-lg space-y-1 pl-2 border-l-4 border-gray-200">
                  <li>{u?.branch || "—"}</li>
                  <li>Section {u?.section || "?"}</li>
                  {isSelf && <li>Phone: {u?.phone_number || "—"}</li>}
                </ul>
              </div>

              {/* CONTACT */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-black uppercase bg-black text-white px-2 py-1 inline-block transform rotate-1">
                  <Mail size={18} /> Contacts
                </h3>
                <ul className="text-black font-bold text-lg pl-2 border-l-4 border-gray-200 break-all">
                  <li>{u?.email}</li>
                </ul>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="border-t-4 border-black pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="font-black text-xl uppercase">Find me on:</span>

                <div className="flex gap-4 flex-wrap">
                  <SocialLinkNeo icon={Github} href={u?.profile_links?.github} label="GitHub" colorClass="hover:bg-gray-200" />
                  <SocialLinkNeo icon={Linkedin} href={u?.profile_links?.linkedin} label="LinkedIn" colorClass="hover:bg-blue-300" />
                  <SocialLinkNeo icon={Twitter} href={profile.twitter} label="Twitter" colorClass="hover:bg-sky-300" />
                  <SocialLinkNeo icon={Instagram} href={profile.instagram} label="Instagram" colorClass="hover:bg-pink-300" />

                  {profile.leetcode && (
                    <a
                      href={profile.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex items-center gap-2 px-4 py-3 
                        bg-orange-300 border-2 border-black text-black font-bold
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-400
                        active:shadow-none active:translate-y-[2px] active:translate-x-[2px]
                        transition-all
                      "
                    >
                      <Code size={20} strokeWidth={2.5} /> LeetCode
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL RENDER */}
      {showEdit && authUserId && (
        <EditProfileModal open={showEdit} onClose={() => setShowEdit(false)} onSuccess={loadProfile} profile={profile} userId={authUserId} />
      )}
    </div>
  );
}
