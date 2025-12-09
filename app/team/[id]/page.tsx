"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import TeamMemberCard from "@/app/Components/Reusables/TeamMemberCard";

interface UserProfile {
  name: string | null;
  image_url: string | null;
  profile_links: {
    github?: string;
    linkedin?: string;
  } | null;
}

interface TeamMember {
  id: string;
  domain: string | null;
  created_at: string;
  users: UserProfile | null;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      setLoading(true);

      const { data, error } = await supabase
        .from("team_members")
        .select(`
          id,
          domain,
          created_at,
          users (
            name,
            image_url,
            profile_links
          )
        `)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(
          "Supabase error:",
          error.message,
          error.code,
          error.details
        );
        setLoading(false);
        return;
      }

      setTeam(data as TeamMember[]);
      setLoading(false);
    }

    loadTeam();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading team...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10">Our Team</h2>

        <div className="flex flex-wrap justify-center gap-12">
          {team.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.users?.name || "Team Member"}
              role={member.domain || "Member"}
              imageUrl={member.users?.image_url || "/default.jpg"}
              githubUrl={
                member.users?.profile_links?.github || "#"
              }
              linkedinUrl={
                member.users?.profile_links?.linkedin || "#"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
