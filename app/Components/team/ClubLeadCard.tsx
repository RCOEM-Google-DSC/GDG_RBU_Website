"use client";
import Image from "next/image";
import { Github, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClubLeadCard() {
  const [clubLead, setClubLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
            userid: data.userid,
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

  const handleCardClick = () => {
    router.push(`/team/profile/${clubLead.userid}`);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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

      {/* Main Card - Clickable Div */}
      <div
        onClick={handleCardClick}
        className="relative bg-white p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 md:gap-16 w-full group cursor-pointer"
        style={{
          border: "4px solid #000000",
        }}
      >
        {/* Arrow indicator - Top Right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-full p-1.5 sm:p-2 shadow-md opacity-90 group-hover:opacity-100 transition-opacity z-20">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" strokeWidth={2.5} />
        </div>

        {/* Photo Section */}
        <div className="relative shrink-0 flex justify-center w-full md:w-auto">
          {/* CLUB LEAD Label */}
          <div
            className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 px-3 py-1.5 sm:px-4 sm:py-2 z-10 -rotate-6"
            style={{
              backgroundColor: "#FFD23D",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            <span className="text-xs sm:text-sm font-black tracking-tight uppercase">
              CLUB LEAD
            </span>
          </div>

          {/* Photo */}
          <div
            className="drop-shadow-2xl w-[200px] h-[260px] sm:w-[220px] sm:h-[280px] md:w-[260px] md:h-80 bg-white relative rounded-lg overflow-hidden border-2 border-gray-200"
          >
            <Image
              src={clubLead.imageUrl}
              alt={clubLead.name}
              fill
              className="object-cover "
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
                onClick={handleSocialClick}
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-black p-2 rounded-full border border-black/10 hover:border-black shadow-sm"
              >
                <Github className="w-5 h-5" strokeWidth={2} />
              </Link>

              <Link
                href={clubLead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-[#0077b5] p-2 rounded-full border border-black/10 hover:border-[#0077b5] shadow-sm"
              >
                <Linkedin className="w-5 h-5" strokeWidth={2} />
              </Link>
              <Link
                href={clubLead.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                className="text-black hover:text-white transition-all duration-300 bg-gray-100 hover:bg-linear-to-tr hover:from-[#feda75] hover:via-[#fa7e1e] hover:to-[#d62976] p-2 rounded-full border border-black/10 hover:border-[#d62976] shadow-sm"
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
