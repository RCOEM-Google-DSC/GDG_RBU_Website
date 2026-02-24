"use client";

import { useEffect, useState } from "react";
import TeamMemberCard from "../Components/Reusables/TeamMemberCard";
import LeaderCard from "../Components/Reusables/LeaderCard";
import ClubLeadCard from "../Components/team/ClubLeadCard";
import Image from "next/image";
import Footer from "../Components/Landing/Footer";
import { supabase } from "@/supabase/supabase";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import NeoLoader from "../Components/Common/NeoLoader";

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
  club_role?: string;
};

type Mentor = {
  id: string;
  userid: string;
  name: string;
  domain?: string; // Optional domain for mentors
  image_url: string;
  github?: string;
  linkedin?: string;
};

type Senior = {
  id: string;
  userid: string;
  domain: string;
  name: string;
  image_url: string;
  github?: string;
  linkedin?: string;
};

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [domainLeads, setDomainLeads] = useState<DomainLead[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch all team members with user data
        const { data: teamData, error: teamError } = await supabase.from(
          "team_members",
        ).select(`
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

        // Separate members by club role
        const leads: DomainLead[] = [];
        const members: Member[] = [];
        const mentorsList: Mentor[] = [];
        const seniorsList: Senior[] = [];

        teamData?.forEach((member: any) => {
          const userData = member.users;
          const memberData = {
            id: member.id,
            userid: member.userid,
            domain: member.domain || "",
            name: userData?.name || "Unknown",
            email: userData?.email || "",
            image_url:
              userData?.image_url || "https://placehold.co/400x500/png",
            github: userData?.profile_links?.github || "https://github.com",
            linkedin:
              userData?.profile_links?.linkedin || "https://linkedin.com",
            club_role: member["club role"],
          };

          const clubRole = member["club role"];

          if (clubRole === "mentor") {
            mentorsList.push({
              id: memberData.id,
              userid: memberData.userid,
              name: memberData.name,
              domain: memberData.domain || undefined,
              image_url: memberData.image_url,
              github: memberData.github,
              linkedin: memberData.linkedin,
            });
          } else if (clubRole === "domain lead" || clubRole === "core") {
            leads.push({
              ...memberData,
              role: `${member.domain} Lead`,
              club_role: clubRole,
            });
          } else if (clubRole === "senior") {
            seniorsList.push({
              id: memberData.id,
              userid: memberData.userid,
              domain: memberData.domain,
              name: memberData.name,
              image_url: memberData.image_url,
              github: memberData.github,
              linkedin: memberData.linkedin,
            });
          } else if (!clubRole || clubRole !== "club lead") {
            // Regular team member
            members.push(memberData);
          }
        });

        // Sort leads so that "domain lead" items come first, then "core", then others (stable)
        const sortedLeads = leads.sort((a, b) => {
          const order = (role?: string) => {
            if (role === "domain lead") return 0;
            if (role === "core") return 1;
            return 2;
          };
          return order(a.club_role) - order(b.club_role);
        });

        setDomainLeads(sortedLeads);
        setTeamMembers(members);
        setMentors(mentorsList);
        setSeniors(seniorsList);
      } catch (error) {
        console.error("Error in fetchTeamData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Group members by domain
  const groupedDomains = teamMembers.reduce<Record<string, Member[]>>(
    (acc, m) => {
      if (!m.domain) return acc; // Skip members without domain
      if (!acc[m.domain]) acc[m.domain] = [];
      acc[m.domain].push(m);
      return acc;
    },
    {},
  );

  // Get all unique domains from both leads and members, then sort them alphabetically
  const domainsFromMembers = Object.keys(groupedDomains);
  const domainsFromLeads = domainLeads.map((lead) => lead.domain);
  const allDomains = [...new Set([...domainsFromMembers, ...domainsFromLeads])];
  const domains = allDomains.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  if (loading) {
    return <NeoLoader fullScreen text="LOADING TEAM..." />;
  }

  return (
    <div className="min-h-screen  text-black pt-8 ">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* hero: group photo */}
      <section className="pt-5 pb-12 md:pb-20 px-8 border-b-4 border-black">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* left: title and domain buttons */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] lg:mt-10 font-retron fade-in-20 delay-500">
              Meet our
              <br />
              team.
            </h1>

            {/* domain jump buttons */}
            <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3 ">
              {mentors.length > 0 && (
                <button
                  onClick={() =>
                    document
                      .getElementById("mentors-section")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className={nb({
                    border: 3,
                    shadow: "sm",
                    hover: "lift",
                    className:
                      "px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wide",
                  })}
                  style={{
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
                  Mentors
                </button>
              )}
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() =>
                    document
                      .getElementById(`domain-${domain}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className={nb({
                    border: 3,
                    shadow: "sm",
                    hover: "lift",
                    className:
                      "px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wide",
                  })}
                  style={{
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
            <NeoBrutalism
              border={4}
              shadow="lg"
              className="w-[520px] xl:w-[720px] h-[347px] xl:h-[480px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dlvkywzol/image/upload/v1767200855/IMG-20251014-WA0066_zwzfw3.jpg"
                alt="Our Team"
                width={720}
                height={480}
                className="w-full h-full object-cover"
              />
            </NeoBrutalism>
          </div>
        </div>
      </section>

      {/* Club Lead Section */}
      <section className="py-12 md:py-20 px-8 flex justify-center items-center border-b-4 border-black">
        <ClubLeadCard />
      </section>

      {/* Mentors Section */}
      {mentors.length > 0 && (
        <section
          id="mentors-section"
          className="flex flex-col md:flex-row relative min-h-screen px-8 border-b-[3px] border-black"
        >
          {/* left: Mentors title */}
          <div className="w-full md:w-[35%] xl:w-[30%] p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="md:sticky md:top-24">
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-retron">
                Mentors
              </h1>
            </div>
          </div>

          <div className="hidden md:block md:ml-4 lg:ml-10 w-px bg-black md:mt-16 md:mb-0" />

          {/* right: Mentor cards */}
          <div className="flex-1 relative">
            <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-24 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                {mentors.map((mentor) =>
                  mentor.domain ? (
                    <LeaderCard
                      key={mentor.id}
                      id={mentor.userid}
                      name={mentor.name}
                      role="MENTOR"
                      imageUrl={mentor.image_url}
                      githubUrl={mentor.github ?? ""}
                      linkedinUrl={mentor.linkedin ?? ""}
                      domain={mentor.domain}
                    />
                  ) : (
                    <TeamMemberCard
                      key={mentor.id}
                      id={mentor.userid}
                      name={mentor.name}
                      role="MENTOR"
                      imageUrl={mentor.image_url}
                      githubUrl={mentor.github ?? ""}
                      linkedinUrl={mentor.linkedin ?? ""}
                    />
                  ),
                )}
              </div>
              <div className="h-16 md:h-32" />
            </div>
          </div>
        </section>
      )}

      {/* domains section */}
      <div className="px-8 border-t-4 border-black">
        {domains.map((domain) => {
          const members = groupedDomains[domain] || [];
          // Find ALL domain leads for this domain
          const currentDomainLeads = domainLeads
            .filter((lead) => lead.domain === domain)
            // ensure domain leads appear first, then core, then others
            .sort((a, b) => {
              const order = (role?: string) => {
                if (role === "domain lead") return 0;
                if (role === "core") return 1;
                return 2;
              };
              return order(a.club_role) - order(b.club_role);
            });

          // Find seniors for this domain
          const currentSeniors = seniors.filter(
            (senior) => senior.domain === domain,
          );
          // Count only "domain lead" club roles (exclude "core") for Co Lead logic
          const actualDomainLeadsCount = currentDomainLeads.filter(
            (lead) => lead.club_role === "domain lead",
          ).length;

          return (
            <section
              key={domain}
              id={`domain-${domain}`}
              className="flex flex-col md:flex-row relative min-h-screen border-b-[3px] border-black"
            >
              {/* left domain name */}
              <div className="w-full md:w-[35%] xl:w-[30%] p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="md:sticky md:top-24">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-retron">
                    {domain}
                  </h1>
                </div>
              </div>

              <div className="hidden md:block md:ml-4 lg:ml-10 w-px bg-black md:mt-16 md:mb-0" />

              <div className="flex-1 relative">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-24 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                    {/* Render ALL domain leads first (sorted: domain lead -> core -> others) */}
                    {currentDomainLeads.map((lead) => (
                      <LeaderCard
                        key={lead.id}
                        id={lead.userid}
                        name={lead.name}
                        role={lead.role}
                        imageUrl={lead.image_url}
                        githubUrl={lead.github ?? ""}
                        linkedinUrl={lead.linkedin ?? ""}
                        leadTitle={
                          lead.club_role === "core"
                            ? "Core"
                            : actualDomainLeadsCount > 1
                              ? "Co Lead"
                              : "Lead"
                        }
                      />
                    ))}

                    {/* Render seniors after domain leads */}
                    {currentSeniors.map((senior) => (
                      <TeamMemberCard
                        key={senior.id}
                        id={senior.userid}
                        name={senior.name}
                        role="SENIOR"
                        imageUrl={senior.image_url}
                        githubUrl={senior.github ?? ""}
                        linkedinUrl={senior.linkedin ?? ""}
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
