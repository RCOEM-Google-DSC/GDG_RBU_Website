"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";

import { useRouter } from "next/navigation";
import TeamMemberCard from "@/app/Components/Reusables/TeamMemberCard";

interface TeamMember {
  id: string;
  club_email: string;
  domain: string;
  cv_url: string;
  github: string;
  linkedin: string;
  created_at: string;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) setTeam(data);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10">Our Team</h2>

        <div className="flex flex-wrap justify-center gap-12">
          {team.map((m) => (
            <TeamMemberCard
              key={m.id}
              name={m.club_email?.split("@")[0] || "Team Member"}
              role={m.domain || "Member"}
              imageUrl={m.cv_url || "/default.jpg"}
              githubUrl={m.github || "#"}
              linkedinUrl={m.linkedin || "#"}
              onClick={() => router.push(`/team/${m.id}`)} // 👈 redirect
            />
          ))}
        </div>
      </div>
    </div>
  );
}
