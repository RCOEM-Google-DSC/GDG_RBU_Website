"use client";

import { useEffect, useState } from "react";
import TeamMemberCard from "../Components/Reusables/TeamMemberCard";
import LeaderCard from "../Components/Reusables/LeaderCard";
import ClubLeadCard from "../Components/team/ClubLeadCard";
import { teamImg } from "@/db/mockdata";
import Image from "next/image";
import Footer from "../Components/Landing/Footer";
import { supabase } from "@/supabase/supabase";

type Member = {
  id: string;
  userid: string;
  domain: string;
  name: string;
  image_url: string;
  github?: string;
  linkedin?: string;
};

type DomainLead = {
  id: string;
  userid: string;
  domain: string;
  name: string;
  email: string;
  image_url: string;
  github?: string;
  linkedin?: string;
  role: string;
};


export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [domainLeads, setDomainLeads] = useState<DomainLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch all team members with user data
        const { data: teamData, error: teamError } = await supabase
          .from("team_members")
          .select(`
            id,
            userid,
            domain,
           
            "club role",
            users (
              name,
              email,
              image_url,
              profile_links

            )
          `);

        if (teamError) {
          console.error("Error fetching team members:", teamError);
          return;
        }

        // Separate domain leads from regular members
        const leads: DomainLead[] = [];
        const members: Member[] = [];

        teamData?.forEach((member: any) => {
          const userData = member.users;
          const memberData = {
            id: member.id,
            userid: member.userid,
            domain: member.domain || "",
            name: userData?.name || "Unknown",
            email: userData?.email || "",
            image_url: userData?.image_url || "https://placehold.co/400x500/png",
            github: userData?.profile_links?.github || "https://github.com",
            linkedin: userData?.profile_links?.linkedin || "https://linkedin.com",
          };

          // Check if this member is a domain lead by checking club_role
          // Note: using bracket notation because of space in column name
          if (member["club role"] === "domain lead") {
            leads.push({
              ...memberData,
              role: `${member.domain} Lead`,
            });
          } else if (!member["club role"] || member["club role"] !== "club lead") {
            // Regular team member (not club lead or domain lead)
            members.push(memberData);
          }
        });

        setDomainLeads(leads);
        setTeamMembers(members);
      } catch (error) {
        console.error("Error in fetchTeamData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Group members by domain
  const groupedDomains = teamMembers.reduce<Record<string, Member[]>>((acc, m) => {
    if (!m.domain) return acc; // Skip members without domain
    if (!acc[m.domain]) acc[m.domain] = [];
    acc[m.domain].push(m);
    return acc;
  }, {});

  // Get all unique domains from both leads and members, then sort them alphabetically
  const domainsFromMembers = Object.keys(groupedDomains);
  const domainsFromLeads = domainLeads.map(lead => lead.domain);
  const allDomains = [...new Set([...domainsFromMembers, ...domainsFromLeads])];
  const domains = allDomains.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">LOADING TEAM...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-black pt-8 ">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* hero: group photo */}
      <section
        className="pt-5 pb-12 md:pb-20 px-8"
        style={{
          borderBottom: "4px solid #000000",
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* left: title and domain buttons */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] lg:mt-10 font-retron">
              Meet our
              <br />
              team.
            </h1>

            {/* domain jump buttons */}
            <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3 ">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() =>
                    document
                      .getElementById(`domain-${domain}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:translate-x-1 hover:translate-y-1 "
                  style={{
                    border: "3px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#000000";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#000000";
                  }}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* right: team image */}
          <div className="hidden lg:block shrink-0 ">
            <div
              className="w-[520px] xl:w-[720px] h-[347px] xl:h-[480px] overflow-hidden"
              style={{
                border: "4px solid #000000",
                boxShadow: "6px 6px 0px #000000",
              }}
            >
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

      {/* Club Lead Section */}
      <section
        className="py-12 md:py-20 px-8 flex justify-center items-center"
        style={{
          borderBottom: "4px solid #000000",
        }}
      >
        <ClubLeadCard/>
      </section>

      {/* domains section */}
      <div
        className="px-8"
        style={{
          borderTop: "4px solid #000000",
        }}
      >
        {domains.map((domain) => {
          const members = groupedDomains[domain] || [];
          // Find ALL domain leads for this domain
          const currentDomainLeads = domainLeads.filter((lead) => lead.domain === domain);

          return (
            <section
              key={domain}
              id={`domain-${domain}`}
              className="flex flex-col md:flex-row relative min-h-screen"
              style={{
                borderBottom: "3px solid #000000",
              }}
            >
              {/* left domain name */}
              <div className="w-full md:w-[35%] xl:w-[30%] p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="md:sticky md:top-24">

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-retron">
                    {domain}
                  </h1>
                </div>
              </div>

              <div className="hidden md:block md:ml-4 lg:ml-10 w-px bg-black md:mt-16 md:mb-0" />

              <div className="flex-1 relative">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-24 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                    {/* Render ALL domain leads first */}
                    {currentDomainLeads.map((lead) => (
                      <LeaderCard
                        key={lead.id}
                        id={lead.userid}
                        name={lead.name}
                        role={lead.role}
                        imageUrl={lead.image_url}
                        githubUrl={lead.github ?? ""}
                        linkedinUrl={lead.linkedin ?? ""}
                      />
                    ))}

                    {/* Render regular team members */}
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

                  <div className="h-16 md:h-32" />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* footer */}
      <section className="mt-20">
        <Footer />
      </section>
    </div>
  );
}
