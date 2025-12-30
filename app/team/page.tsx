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
        // 1) fetch team_members rows (we keep github/linkedin from team_members as fallback)
        const { data: teamData, error: teamError } = await supabase
          .from("team_members")
          .select(`
            id,
            userid,
            domain,
            github,
            linkedin,
            "club role"
          `);

        if (teamError) {
          console.error("Error fetching team members:", teamError);
          return;
        }

        if (!teamData || teamData.length === 0) {
          setDomainLeads([]);
          setTeamMembers([]);
          return;
        }

        // 2) collect unique user ids (userid is the UUID referencing users.id)
        const userIds = Array.from(
          new Set(
            teamData
              .map((m: any) => m.userid)
              .filter(Boolean)
          )
        );

        // 3) fetch users by id to get profile_links, name, email, image_url
        let usersData: any[] = [];
        if (userIds.length > 0) {
          const { data: uData, error: uError } = await supabase
            .from("users")
            .select("id, name, email, image_url, profile_links")
            .in("id", userIds);

          if (uError) {
            console.error("Error fetching users:", uError);
          } else if (uData) {
            usersData = uData;
          }
        }

        // create a map of users keyed by id for quick lookup
        const userMap: Record<string, any> = {};
        usersData.forEach((u: any) => {
          userMap[String(u.id)] = u;
        });

        // 4) Build leads and members arrays, preferring users.profile_links for github/linkedin
        const leads: DomainLead[] = [];
        const members: Member[] = [];

        teamData.forEach((memberRow: any) => {
          // find corresponding user row (if any)
          const userRow = userMap[String(memberRow.userid)];

          // profile_links may be stored as an object or a JSON string depending on how it was inserted
          let profileLinks: any = {};
          if (userRow && userRow.profile_links) {
            try {
              profileLinks =
                typeof userRow.profile_links === "string"
                  ? JSON.parse(userRow.profile_links)
                  : userRow.profile_links;
            } catch (e) {
              // parsing failed — treat as empty object
              profileLinks = {};
            }
          }

          // prefer profile_links from users table, otherwise fallback to columns on team_members row, otherwise generic defaults
          const githubUrl =
            (profileLinks && profileLinks.github) ||
            memberRow.github ||
            "https://github.com";
          const linkedinUrl =
            (profileLinks && profileLinks.linkedin) ||
            memberRow.linkedin ||
            "https://linkedin.com";

          const memberDataBase = {
            id: memberRow.id,
            userid: memberRow.userid,
            domain: memberRow.domain || "",
            name: (userRow && userRow.name) || "Unknown",
            email: (userRow && userRow.email) || "",
            image_url: (userRow && userRow.image_url) || "https://placehold.co/400x500/png",
            github: githubUrl,
            linkedin: linkedinUrl,
          };

          // club role handling: if club role is domain lead, push to leads
          if (memberRow["club role"] === "domain lead") {
            leads.push({
              ...memberDataBase,
              role: `${memberRow.domain} Lead`,
            });
          } else if (!memberRow["club role"] || memberRow["club role"] !== "club lead") {
            // regular member
            members.push(memberDataBase);
          } else {
            // If there are other club roles (e.g., "club lead") we treat them as members (preserving original behaviour)
            members.push(memberDataBase);
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
