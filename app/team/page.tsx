"use client";

import React, { useEffect, useState } from "react";

import { supabase } from "@/supabase/supabase";
import TeamMemberCard from "../Components/Reusables/TeamMemberCard";

import { teamImg } from "@/db/mockdata";
import Image from "next/image";
import { Button } from "react-day-picker";

type TeamRow = {
  id: string;
  userid: string;
  domain: string;
  users: {
    name: string;
    image_url: string | null;
    profile_links: {
      github?: string;
      linkedin?: string;
    } | null;
  } | null;
};

type Member = {
  id: string;
  userid: string;
  domain: string;
  name: string;
  image_url: string;
  github?: string;
  linkedin?: string;
};



const DOMAIN_ORDER = [
  "web dev",
  "cp",
  "mac",
  "design",
  "marketing",
  "management",
  "social",
];


export default function TeamPage() {
  const [team, setTeam] = useState<Member[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          id,
          userid,
          domain,
          users (
            name,
            image_url,
            profile_links
          )
        `);

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      const formatted: Member[] =
        (data as any)?.map((row: TeamRow) => ({
          id: row.id,
          userid: row.userid,
          domain: row.domain,
          name: row.users?.name ?? "Unknown",
          image_url: row.users?.image_url ?? "",
          github: row.users?.profile_links?.github,
          linkedin: row.users?.profile_links?.linkedin,
        })) ?? [];

      setTeam(formatted);
    };

    load();
  }, []);



  const groupedDomains = team.reduce<Record<string, Member[]>>((acc, m) => {
    if (!acc[m.domain]) acc[m.domain] = [];
    acc[m.domain].push(m);
    return acc;
  }, {});



  const domains = DOMAIN_ORDER.reduce<Record<string, Member[]>>(
    (acc, domain) => {
      if (groupedDomains[domain]) {
        acc[domain] = groupedDomains[domain];
      }
      return acc;
    },
    {}
  );



  return (
    <div className="min-h-screen bg-[#FDFCF8] text-black pt-8 px-4 lg:px-8 pb-8">

      {/* hero: group photo */}
      <section className="pt-5 [min-h-screen]-8 pb-20 border-b-2 border-black">
        <div className="w-full flex items-start justify-between">
          <div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] lg:mt-10">
              Meet our
              <br />
              team.
            </h1>

            {/* domain jump buttons */}
            <div className="mt-12 flex flex-wrap gap-3 lg:mt-30">
              {Object.keys(domains).map((domain) => (
                <button
                  key={domain}
                  onClick={() =>
                    document
                      .getElementById(`domain-${domain}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="
                    px-5 py-2 border-2 border-black rounded-full 
                    text-sm font-semibold uppercase tracking-wide 
                    hover:bg-black hover:text-white transition
                  "
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-[720px] h-[480px] border-2 border-black rounded-2xl overflow-hidden mr-4">
              <Image
                src={teamImg}
                alt="Our Team"
                width={720}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      <div className="border-t-2 border-black">
        {Object.entries(domains).map(([domain, members]) => (
          <section
            key={domain}
            id={`domain-${domain}`}
            className="flex relative min-h-screen border-b border-black"
          >
            {/* left domain name */}
            <div className="w-[35%] xl:w-[30%] p-8 md:p-12">
              <div className="sticky top-24">
                {/* top icon */}
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center relative mb-12">

                  <div className="absolute w-full h-full rounded-full border border-black top-1 left-1" />

                  <div className="w-8 h-8 border border-black rounded-full animate-[spin_10s_linear_infinite]" />
                </div>

                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                  {domain}
                </h1>
              </div>
            </div>

            <div className="ml-10 w-px bg-black mt-16 mb-0" />


            <div className="flex-1 relative">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="p-8 md:p-16 lg:p-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-32 gap-y-32 justify-items-center">
                  {members.map((m) => (
                    <TeamMemberCard
                      key={m.id}
                      id={m.userid}
                      name={m.name}
                      role="TEAM"
                      imageUrl={m.image_url}
                      githubUrl={m.github ?? ""}
                      linkedinUrl={m.linkedin ?? ""}
                    />
                  ))}
                </div>

                <div className="h-32" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
