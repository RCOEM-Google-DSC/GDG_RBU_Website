"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  ListChecks,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import type { Domain } from "./constants";
import { downloadTaskPdf } from "./taskPdf";
import BriefCodeBlock from "./BriefCodeBlock";
import { briefFontClasses } from "./fonts";

/** Contact roles colour-coded by tier: GDG RBU-wide, domain lead, domain co-lead. */
function roleColor(role: string) {
  if (role.startsWith("GDG RBU")) return "#4285F4";
  if (/co-lead/i.test(role)) return "#34A853";
  return "#EA4335";
}

/** Black or white, whichever contrasts more with the hex background. */
function textOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? "#000" : "#fff";
}

/** Render `backtick` spans as inline code. */
function Inline({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
      <code
        key={i}
        className="rounded-sm border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-[#C5221F]"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

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
    <NeoBrutalism border={3} shadow="lg" className={`bg-white overflow-hidden ${briefFontClasses}`}>
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
        {brief.overview.split("\n").map((line, i) => (
          <p
            key={i}
            className="mt-2 max-w-[72ch] text-base md:text-lg leading-relaxed text-gray-800"
          >
            <Inline text={line} />
          </p>
        ))}
        {brief.note && (
          <p className="mt-3 inline-block bg-[#FBBC04]/20 border-2 border-[#FBBC04] px-3 py-1.5 max-w-[80ch] text-sm md:text-[15px] font-semibold leading-relaxed">
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
              <h3 className="flex items-center gap-2 font-extrabold text-[15px] md:text-base uppercase tracking-wide mb-2">
                <span
                  className="w-3 h-3 border-2 border-black shrink-0"
                  style={{ backgroundColor: domain.color }}
                />
                {s.heading}
              </h3>
              {s.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="max-w-[72ch] text-base md:text-[17px] leading-relaxed text-gray-800 mb-2 pl-5"
                >
                  <Inline text={p} />
                </p>
              ))}
              {s.table && (
                <div className="mt-3 ml-5 overflow-x-auto border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr style={{ backgroundColor: domain.color, color: textOn(domain.color) }}>
                        {s.table.columns.map((c, j) => (
                          <th
                            key={j}
                            className={`border-b-[3px] border-black px-3 md:px-4 py-2 text-xs md:text-sm font-extrabold uppercase tracking-wider ${
                              j === 1 ? "text-center w-20" : ""
                            }`}
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, r) => (
                        <tr
                          key={r}
                          style={r % 2 ? { backgroundColor: `${domain.color}12` } : undefined}
                          className={r % 2 ? undefined : "bg-white"}
                        >
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={`shadow-[inset_0_2px_0_0_rgba(0,0,0,0.12)] px-3 md:px-4 py-2.5 align-top text-[15px] md:text-base leading-snug text-gray-900 ${
                                j === 0 ? "font-bold whitespace-nowrap" : ""
                              } ${j === 1 ? "text-center font-mono font-black" : ""}`}
                            >
                              <Inline text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.bullets && (
                <ul className="pl-5 space-y-2">
                  {s.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 max-w-[72ch] text-base md:text-[17px] leading-relaxed text-gray-800"
                    >
                      <ListChecks
                        size={16}
                        className="mt-[5px] md:mt-1.5 shrink-0"
                        style={{ color: domain.color }}
                        strokeWidth={2.5}
                      />
                      <span>
                        <Inline text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {s.code && (
                <div className="mt-3 pl-5 space-y-3">
                  {s.code.map((c, j) => (
                    <BriefCodeBlock key={j} code={c} accent={domain.color} />
                  ))}
                </div>
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
          <div className="border-[3px] border-black shadow-[5px_5px_0_0_#000]">
            <h3
              className="flex items-center gap-2 border-b-[3px] border-black px-4 md:px-5 py-2.5 font-extrabold text-[15px] md:text-base uppercase tracking-wider"
              style={{ backgroundColor: domain.color, color: textOn(domain.color) }}
            >
              <Send size={15} strokeWidth={2.75} />
              Submission
            </h3>
            <ol
              className="space-y-3 p-4 md:p-5"
              style={{ backgroundColor: `${domain.color}12` }}
            >
              {brief.submission.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 max-w-[72ch] text-base md:text-[17px] leading-relaxed text-gray-900"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black font-mono text-xs font-black shadow-[2px_2px_0_0_#000]"
                    style={{ backgroundColor: domain.color, color: textOn(domain.color) }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-px md:pt-0.5">
                    <Inline text={s} />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="flex items-center gap-2 font-extrabold text-[15px] md:text-base uppercase tracking-wide mb-3">
              <Phone size={15} strokeWidth={2.5} />
              Queries? Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {brief.contacts.map((c) => {
                const color = roleColor(c.role);
                return (
                  <a
                    key={c.name + c.phone}
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className={nb({
                      border: 2,
                      shadow: "sm",
                      hover: "lift",
                      className:
                        "flex items-center justify-between gap-3 bg-white border-l-[8px] px-3 py-2.5",
                    })}
                    style={{ borderLeftColor: color }}
                  >
                    <span className="min-w-0">
                      <span className="block font-bold text-sm md:text-[15px]">{c.name}</span>
                      <span
                        className="mt-1 inline-block border-2 border-black px-1.5 py-px font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wider"
                        style={{ backgroundColor: color, color: textOn(color) }}
                      >
                        {c.role}
                      </span>
                    </span>
                    <span className="font-mono text-xs md:text-[13px] font-bold whitespace-nowrap">
                      {c.phone}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </NeoBrutalism>
  );
}
