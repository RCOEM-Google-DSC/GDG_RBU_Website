"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Code, Palette, Brain, Megaphone, Camera, BarChart3, Rocket } from "lucide-react";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import { DOMAINS } from "@/app/Components/recruitment/constants";
import Footer from "@/app/Components/Landing/Footer";

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  "web-dev": <Code size={28} strokeWidth={2.5} />,
  cp: <BarChart3 size={28} strokeWidth={2.5} />,
  design: <Palette size={28} strokeWidth={2.5} />,
  mac: <Brain size={28} strokeWidth={2.5} />,
  management: <Users size={28} strokeWidth={2.5} />,
  marketing: <Megaphone size={28} strokeWidth={2.5} />,
  socials: <Camera size={28} strokeWidth={2.5} />,
};

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen text-black selection:bg-[#4285F4] selection:text-white">
      {/* Background grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <NeoBrutalism
            border={3}
            shadow="md"
            className="inline-block bg-[#FBBC04] px-5 py-2 mb-8"
          >
            <span className="font-black text-sm tracking-widest uppercase flex items-center gap-2">
              <Rocket size={16} strokeWidth={3} />
              Recruitment 2026-27
            </span>
          </NeoBrutalism>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase font-retron mb-6">
            Join{" "}
            <span className="relative inline-block">
              <span className="relative z-10">GDG</span>
              <span className="absolute -bottom-1 left-0 right-0 h-4 bg-[#4285F4] -z-0" />
            </span>{" "}
            <br className="hidden sm:block" />
            RBU
          </h1>

          <p className="text-lg md:text-xl font-mono max-w-2xl mx-auto mb-10 leading-relaxed">
            Google Developer Groups on Campus — Ramdeobaba University.
            Be part of a community that builds, learns, and grows together.
          </p>

          <Link
            href="/recruitment/task"
            className={nb({
              border: 4,
              shadow: "lg",
              hover: "lift",
              active: "push",
              className:
                "inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-black text-lg uppercase tracking-wide",
            })}
          >
            Apply Now
            <ArrowRight size={22} strokeWidth={3} />
          </Link>
        </motion.div>
      </section>

      {/* ABOUT GDG */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <NeoBrutalism
              border={4}
              shadow="xl"
              className="bg-white p-8 md:p-10 h-full"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 font-retron">
                What is GDG?
              </h2>
              <div className="h-1 w-16 bg-[#4285F4] mb-6" />
              <p className="font-mono text-sm leading-relaxed mb-4">
                Google Developer Groups on Campus (GDG) is a community of
                developers, designers, and tech enthusiasts backed by Google.
                We organize workshops, hackathons, study jams, and speaker
                sessions to help students learn and grow.
              </p>
              <p className="font-mono text-sm leading-relaxed">
                At RBU, our chapter brings together passionate students from all
                branches who want to explore technology, build real projects,
                and make an impact.
              </p>
            </NeoBrutalism>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NeoBrutalism
              border={4}
              shadow="xl"
              className="bg-[#FBBC04] p-8 md:p-10 h-full"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 font-retron">
                Why Join Us?
              </h2>
              <div className="h-1 w-16 bg-black mb-6" />
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 font-black text-lg">→</span>
                  <span>Work on real projects with real impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 font-black text-lg">→</span>
                  <span>Learn from workshops, bootcamps, and study jams</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 font-black text-lg">→</span>
                  <span>Network with developers across the country</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 font-black text-lg">→</span>
                  <span>Build your portfolio and leadership skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 font-black text-lg">→</span>
                  <span>Get Google swag, certificates, and recognition</span>
                </li>
              </ul>
            </NeoBrutalism>
          </motion.div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <NeoBrutalism
            border={4}
            shadow="md"
            className="inline-block bg-white px-6 py-3"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-retron">
              Our Domains
            </h2>
          </NeoBrutalism>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <NeoBrutalism
                border={4}
                shadow="lg"
                hover="lift"
                className="bg-white p-6 h-full flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: domain.color,
                    border: "3px solid black",
                  }}
                >
                  <span className="text-white">
                    {DOMAIN_ICONS[domain.id]}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                  {domain.name}
                </h3>

                {/* Description */}
                <p className="font-mono text-xs leading-relaxed text-gray-700 flex-1">
                  {domain.description}
                </p>

                {/* Tag */}
                <div className="mt-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-black"
                    style={{ backgroundColor: domain.color, color: "white" }}
                  >
                    {domain.shortName}
                  </span>
                </div>
              </NeoBrutalism>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
        <NeoBrutalism
          border={4}
          shadow="xl"
          className="bg-black text-white p-8 md:p-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 font-retron">
            Ready to Build?
          </h2>
          <p className="font-mono text-sm md:text-base max-w-xl mx-auto mb-8 text-white/80">
            Complete your task submission and become a part of GDG RBU.
            Show us what you&apos;ve got.
          </p>
          <Link
            href="/recruitment/task"
            className={nb({
              border: 4,
              shadow: "lg",
              hover: "lift",
              active: "push",
              className:
                "inline-flex items-center gap-3 bg-[#FBBC04] text-black px-8 py-4 font-black text-lg uppercase tracking-wide",
            })}
          >
            Submit Your Task
            <ArrowRight size={22} strokeWidth={3} />
          </Link>
        </NeoBrutalism>
      </section>

      <Footer />
    </div>
  );
}
