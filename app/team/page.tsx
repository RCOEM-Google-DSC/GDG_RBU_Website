"use client";

import TeamMemberCard from "../Components/Reusables/TeamMemberCard";
import LeaderCard from "../Components/Reusables/LeaderCard";
import { teamImg } from "@/db/mockdata";
import { domainLeads, teamMembers } from "@/db/members";
import Image from "next/image";
import Footer from "../Components/Landing/Footer";

type Member = {
  id: string;
  userid: string;
  domain: string;
  name: string;
  image_url: string;
  github?: string;
  linkedin?: string;
};


export default function TeamPage() {
  // Use hardcoded team members data
  const team = teamMembers;

  // Group members by domain
  const groupedDomains = team.reduce<Record<string, Member[]>>((acc, m) => {
    if (!m.domain) return acc; // Skip members without domain
    if (!acc[m.domain]) acc[m.domain] = [];
    acc[m.domain].push(m);
    return acc;
  }, {});

  // Get all unique domains and sort them alphabetically
  const domains = Object.keys(groupedDomains).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

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
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] lg:mt-10">
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
                  className="px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
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

      {/* domains section */}
      <div
        className="px-8"
        style={{
          borderTop: "4px solid #000000",
        }}
      >
        {domains.map((domain) => {
          const members = groupedDomains[domain];
          // Find the domain lead for this domain
          const domainLead = domainLeads.find((lead) => lead.domain === domain);

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

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                    {domain}
                  </h1>
                </div>
              </div>

              <div className="hidden md:block md:ml-4 lg:ml-10 w-px bg-black md:mt-16 md:mb-0" />

              <div className="flex-1 relative">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-24 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                    {/* Render domain lead first if exists */}
                    {domainLead && (
                      <LeaderCard
                        key={domainLead.id}
                        id={domainLead.id}
                        name={domainLead.name}
                        role={domainLead.role}
                        imageUrl={domainLead.image_url}
                        githubUrl={domainLead.profile_links.github ?? ""}
                        linkedinUrl={domainLead.profile_links.linkedin ?? ""}
                      />
                    )}

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
