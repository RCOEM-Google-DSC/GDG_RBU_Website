"use client";
import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";

export default function ClubLeadCard() {
  const [clubLead, setClubLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubLead = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select(`
            userid,
            github,
            linkedin,
            instagram,
            bio,
            thought,
            users (
              name,
              image_url
            )
          `)
          .eq("club role", "club lead")
          .single();

        if (error) {
          console.error("Error fetching club lead:", error);
          return;
        }

        if (data) {
          const user = Array.isArray(data.users) ? data.users[0] : data.users;
          setClubLead({
            name: user?.name || "Club Lead",
            quote: data.thought || "Building communities, one event at a time",
            imageUrl: user?.image_url || "/placeholder.png",
            github: data.github || "https://github.com/",
            linkedin: data.linkedin || "https://linkedin.com/",
            instagram: data.instagram || "https://instagram.com/",
          });
        }
      } catch (error) {
        console.error("Error in fetchClubLead:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubLead();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="text-center py-8">
          <div className="text-xl font-black animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!clubLead) {
    return null;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Shadow */}
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: "#000000",
          top: "8px",
          left: "8px",
        }}
      />

      {/* Main Card */}
      <div
        className="relative bg-white p-8 sm:p-12 flex flex-col md:flex-row items-start gap-10 sm:gap-16 w-full"
        style={{
          border: "4px solid #000000",
        }}
      >
        {/* Photo Section */}
        <div className="relative shrink-0">
          {/* CLUB LEAD Label */}
          <div
            className="absolute -top-4 -left-4 px-4 py-2 z-10 -rotate-6"
            style={{
              backgroundColor: "#FFD23D",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            <span className="text-sm font-black tracking-tight uppercase">
              CLUB LEAD
            </span>
          </div>

          {/* Photo */}
          <div
            className="w-[220px] h-[280px] sm:w-[260px] sm:h-80 bg-white relative"
            style={{
              border: "4px solid #000000",
              boxShadow: "8px 8px 0px #000000",
            }}
          >
            <Image
              src={clubLead.imageUrl}
              alt={clubLead.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col w-full">
          <div className="flex flex-col gap-6">
            {/* Name */}
            <div className="text-center md:text-left">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none">
                {clubLead.name}
              </h3>
            </div>

            {/* Quote */}
            <div className="text-center md:text-left relative">
              <p className="text-lg md:text-xl font-medium text-neutral-800 italic leading-relaxed pr-8">
                &quot;{clubLead.quote}&quot;
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
              <Link
                href={clubLead.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-black p-2 rounded-full border border-black/10 hover:border-black shadow-sm"
              >
                <Github className="w-5 h-5" strokeWidth={2} />
              </Link>

              <Link
                href={clubLead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-[#0077b5] p-2 rounded-full border border-black/10 hover:border-[#0077b5] shadow-sm"
              >
                <Linkedin className="w-5 h-5" strokeWidth={2} />
              </Link>
              <Link
                href={clubLead.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-pink-500 p-2 rounded-full border border-black/10 hover:border-pink-500 shadow-sm"
              >
                <Instagram className="w-5 h-5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quote Mark */}
        <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 opacity-100">
          <span className="text-black text-6xl md:text-8xl font-black leading-none">
            &rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}
