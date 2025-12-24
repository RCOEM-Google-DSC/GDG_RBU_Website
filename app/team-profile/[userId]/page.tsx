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
} from "lucide-react";
import { useParams } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import EditProfileModal from "@/app/Components/team/EditProfileModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ---------------- ILLUSTRATIONS ---------------- */

const IllustrationCoder = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 150"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10 140h180" />
    <path d="M50 140l-10-40h120l-10 40" />
    <rect x="55" y="60" width="90" height="50" rx="4" />
    <path d="M95 85l5 5 10-10" />
    <path d="M100 60v10" />
    <circle cx="100" cy="35" r="15" />
    <path d="M70 140c0-20 10-35 30-35s30 15 30 35" />
    <path d="M160 140v-50c0-10 10-20 20-20h5" />
    <path d="M185 80l-10-10 20-5 5 20-15-5" />
  </svg>
);

const IllustrationPhone = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 160"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="20" y="10" width="60" height="120" rx="8" />
    <rect x="30" y="25" width="40" height="30" rx="2" strokeOpacity="0.5" />
    <circle cx="40" cy="70" r="4" strokeOpacity="0.5" />
    <circle cx="60" cy="70" r="4" strokeOpacity="0.5" />
    <circle cx="40" cy="90" r="4" strokeOpacity="0.5" />
    <circle cx="60" cy="90" r="4" strokeOpacity="0.5" />
    <circle cx="85" cy="25" r="8" />
    <path d="M85 17v16M77 25h16" />
  </svg>
);

const IllustrationCoffee = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 80 80"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 30h40v25a15 15 0 01-15 15H35a15 15 0 01-15-15V30z" />
    <path d="M60 40h10a5 5 0 010 10h-10" />
    <path d="M30 15q5-5 5-10" />
    <path d="M40 10q5-5 5-10" />
    <path d="M50 15q5-5 5-10" />
  </svg>
);

const IllustrationCube = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IllustrationSwirl = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M10 90 Q 50 10 90 90" strokeDasharray="6,6" />
  </svg>
);

const SocialLink = ({ icon: Icon, href }: { icon: React.ElementType; href?: string | null }) =>
  !href ? null : (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 
                 hover:text-slate-900 hover:border-slate-900 transition-all duration-300 
                 hover:-translate-y-1 shadow-sm"
    >
      <Icon size={20} strokeWidth={1.5} />
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
        const { data: row } = await supabase
          .from("users")
          .select("role")
          .eq("id", uid)
          .single();

        setAuthRole(row?.role ?? null);
      }
    });
  }, []);

  const isSelf = authUserId === userId;

  /* LOAD PROFILE */
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
  }, [userId]);

  if (!profile) return <div className="p-10">Loading...</div>;

  const u = profile.users;
  const resumeUrl = profile.cv_url || u?.profile_links?.resume;

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-slate-800 relative overflow-hidden">
      {/* DARKER BACKGROUND SHAPES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background dots */}
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: "radial-gradient(#A0AEC0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        ></div>

        {/* Hide shapes on mobile */}
        <IllustrationSwirl className="hidden md:block absolute top-[-60px] left-[-60px] w-56 h-56 text-slate-400 rotate-45 opacity-70" />
        <IllustrationCube className="hidden md:block absolute top-[12%] right-[8%] w-14 h-14 text-slate-500 opacity-80" />
        <IllustrationCube className="hidden md:block absolute bottom-[18%] left-[5%] w-10 h-10 text-slate-500 opacity-80" />
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* -------- TOP SECTION -------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center mb-16 md:mb-20">
          {/* AVATAR */}
          <div className="md:col-span-5 relative flex flex-col items-center md:items-start">
            <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64">
              <div className="w-full h-full rounded-4xl overflow-hidden border-2 border-slate-800 shadow-[6px_6px_0_rgba(30,41,59,0.2)] bg-white p-2">
                <Image
                  height={400}
                  width={400}
                  alt={u.name}
                  src={u.image_url}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:col-span-7 text-center md:text-left space-y-6 md:space-y-8 relative">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
              {u.name}
            </h1>

            <p className="text-xl text-slate-500 font-light">
              {profile.domain?.toUpperCase()}
            </p>

            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
              <p className="text-slate-600 text-lg">
                "{profile.bio || "No bio yet."}"
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 pt-2">
              {/* Say Hello */}
              <Link
                href={`mailto:${u.email}`}
                className="flex items-center gap-2 px-7 py-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-colors duration-2"
              >
                <Send size={18} /> Say Hello
              </Link>

              {/* Resume */}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl"
                >
                  <Download size={18} /> Resume
                </a>
              )}

              {/* Edit + Dashboard */}
              {isSelf && (
                <>
                  <button
                    onClick={() => setShowEdit(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 border border-slate-300 rounded-xl hover:bg-slate-200 transition-colors duration-200"
                  >
                    <Pencil size={18} /> Edit Profile
                  </button>

                  <button className=" bg-blue-100 border border-blue-300 hover:bg-blue-200 text-black rounded-xl transition-colors duration-200">
                    <Link href='/admin' className="flex gap-2 px-6 py-3 items-center">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* -------- LOWER SECTION -------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thought */}
          <div className="bg-[#ECECEC] rounded-3xl p-8 relative w-full">
            <div className="absolute top-0 right-0 p-8 text-slate-400">
              <Code size={48} />
            </div>

            <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">
              Philosophy
            </h3>

            <p className="text-2xl font-serif italic text-slate-800">
              "{profile.thought || "No thought shared."}"
            </p>
          </div>

          {/* Contact + Socials */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            {/* FIXED GRID FOR MOBILE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              {/* CAMPUS INFO */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-500 mb-3">
                  <MapPin size={16} /> Campus Info
                </h3>
                <ul className="text-slate-600 space-y-2">
                  <li>{u.branch || "—"}</li>
                  <li>Section {u.section || "?"}</li>
                  {isSelf && <li>Phone: {u.phone_number || "—"}</li>}
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-500 mb-3">
                  <Mail size={16} /> Contacts
                </h3>
                <ul className="text-slate-600 space-y-2 break-all">
                  <li>{u.email}</li>
                </ul>
              </div>
            </div>

            {/* Socials */}
            <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-slate-400 md:whitespace-nowrap">
                Find me on
              </span>

              {/* Icons */}
              <div className="flex gap-3 flex-wrap md:flex-nowrap">
                <SocialLink icon={Github} href={u.profile_links?.github} />
                <SocialLink icon={Linkedin} href={u.profile_links?.linkedin} />
                <SocialLink icon={Twitter} href={profile.twitter} />
                <SocialLink icon={Instagram} href={profile.instagram} />

                {profile.leetcode && (
                  <a
                    href={profile.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-700"
                  >
                    <Code size={18} /> LeetCode
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showEdit && authUserId && (
        <EditProfileModal
          open={showEdit}
          onClose={() => setShowEdit(false)}
          onSuccess={loadProfile}
          profile={profile}
          userId={authUserId}
        />
      )}
    </div>
  );
}
