"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  FileCheck2,
  ListChecks,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import type { Domain } from "./constants";
import { downloadTaskPdf } from "./taskPdf";

export default function DomainBrief({ domain }: { domain: Domain }) {
  const [active, setActive] = useState(0);
  const [generating, setGenerating] = useState(false);
  const brief = domain.briefs[Math.min(active, domain.briefs.length - 1)];

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      await downloadTaskPdf(domain, brief);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <NeoBrutalism border={3} shadow="lg" className="bg-white overflow-hidden">
      {/* Header */}
      <div
        className="px-6 md:px-8 pt-6 pb-5 border-b-4 border-black"
        style={{ backgroundColor: `${domain.color}14` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="px-3 py-1.5 font-black text-[11px] uppercase tracking-widest text-white border-[3px] border-black"
            style={{ backgroundColor: domain.color }}
          >
            {domain.shortName}
          </div>
          <span className="font-mono text-xs text-gray-500">
            Position: <strong className="text-black">{brief.position}</strong>
          </span>
          {brief.badge && (
            <span className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              {brief.badge}
            </span>
          )}
          <button
            onClick={handleDownload}
            disabled={generating}
            className={nb({
              border: 3,
              shadow: "md",
              hover: "lift",
              active: "push",
              className:
                "ml-auto inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-black text-[11px] uppercase tracking-wider disabled:opacity-60",
            })}
          >
            <Download size={14} strokeWidth={3} />
            {generating
              ? "Making PDF..."
              : `PDF${domain.briefs.length > 1 ? ` - ${brief.label}` : ""}`}
          </button>
        </div>
        <h2 className="mt-3 text-xl md:text-2xl font-black uppercase tracking-tight">
          {domain.name}
        </h2>
        <p className="mt-2 font-mono text-xs md:text-sm leading-relaxed text-gray-700">
          {brief.overview}
        </p>
        {brief.note && (
          <p className="mt-3 inline-block bg-[#FBBC04]/20 border-2 border-[#FBBC04] px-3 py-1.5 font-mono text-[11px] md:text-xs font-bold">
            {brief.note}
          </p>
        )}
      </div>

      {/* Inner tabs */}
      {domain.briefs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-6 md:px-8 pt-5 pb-1">
          {domain.briefs.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setActive(i)}
              className={nb({
                border: 3,
                shadow: i === active ? "md" : "sm",
                active: "push",
                className: `whitespace-nowrap px-4 py-2 font-black text-[11px] md:text-xs uppercase tracking-wider ${
                  i === active ? "text-white" : "bg-white text-black hover:bg-gray-50"
                }`,
              })}
              style={i === active ? { backgroundColor: domain.color } : undefined}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={brief.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="px-6 md:px-8 py-6 space-y-6"
        >
          {brief.sections.map((s, i) => (
            <section key={i}>
              <h3 className="flex items-center gap-2 font-black text-sm uppercase tracking-tight mb-2">
                <span
                  className="w-3 h-3 border-2 border-black shrink-0"
                  style={{ backgroundColor: domain.color }}
                />
                {s.heading}
              </h3>
              {s.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="font-mono text-xs md:text-[13px] leading-relaxed text-gray-700 mb-2 pl-5"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="pl-5 space-y-1.5">
                  {s.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 font-mono text-xs md:text-[13px] leading-relaxed text-gray-700"
                    >
                      <ListChecks
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: domain.color }}
                        strokeWidth={2.5}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.links && (
                <div className="flex flex-wrap gap-2 mt-3 pl-5">
                  {s.links.map((l) => (
                    <a
                      key={l.url + l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={nb({
                        border: 2,
                        shadow: "sm",
                        hover: "lift",
                        active: "push",
                        className:
                          "inline-flex items-center gap-1.5 bg-white px-3 py-1.5 font-mono text-[11px] font-bold text-[#4285F4] underline",
                      })}
                    >
                      {l.label}
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Submission */}
          <div className="border-[3px] border-black bg-gray-50 p-4 md:p-5">
            <h3 className="flex items-center gap-2 font-black text-sm uppercase tracking-tight mb-3">
              <Send size={15} strokeWidth={2.5} />
              Submission
            </h3>
            <ul className="space-y-1.5">
              {brief.submission.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 font-mono text-xs md:text-[13px] leading-relaxed"
                >
                  <FileCheck2 size={14} className="mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="flex items-center gap-2 font-black text-sm uppercase tracking-tight mb-3">
              <Phone size={15} strokeWidth={2.5} />
              Queries? Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {brief.contacts.map((c) => (
                <a
                  key={c.name + c.phone}
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className={nb({
                    border: 2,
                    shadow: "sm",
                    hover: "lift",
                    className:
                      "flex items-center justify-between gap-2 bg-white px-3 py-2",
                  })}
                >
                  <span>
                    <span className="block font-bold text-xs">{c.name}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                      {c.role}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] font-bold whitespace-nowrap">
                    {c.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </NeoBrutalism>
  );
}
