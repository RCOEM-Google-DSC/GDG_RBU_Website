"use client";

import React from "react";
import { ArrowLeft, Send, FileText, ExternalLink, ClipboardList } from "lucide-react";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import { RecruitmentFormData } from "./constants";

interface SubmissionPreviewProps {
  form: RecruitmentFormData;
  onBack: () => void;
  onConfirm: () => void;
  submitting: boolean;
}

export default function SubmissionPreview({
  form,
  onBack,
  onConfirm,
  submitting,
}: SubmissionPreviewProps) {
  return (
    <div className="space-y-6">
      <NeoBrutalism border={3} shadow="lg" className="bg-white p-6 md:p-8">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
          <ClipboardList size={24} strokeWidth={2.5} />
          Review Your Submission
        </h3>

        {/* Personal Details */}
        <Section title="Personal Details" color="#4285F4">
          <Row label="Name" value={form.name} />
          <Row label="Email" value={form.email} />
          <Row label="Phone" value={form.phone} />
          <Row label="Year" value={form.year ? `${form.year}${getSuffix(form.year)} Year` : "—"} />
          <Row label="Branch" value={form.branch} />
        </Section>

        {/* Domain Preferences */}
        <Section title="Domain Preferences" color="#FBBC04">
          <Row label="Preference 1" value={form.domain_pref_1} />
          <Row label="Preference 2" value={form.domain_pref_2 || "—"} />
          <Row label="Preference 3" value={form.domain_pref_3 || "—"} />
          <Row label="Tech Domain" value={form.tech_domain} />
          <Row label="Socials Domain" value={form.socials_domain} />
        </Section>

        {/* Profile Links */}
        <Section title="Profile Links" color="#34A853">
          <Row label="LinkedIn" value={form.linkedin_url} isLink />
          <Row label="GitHub" value={form.github_url || "—"} isLink={!!form.github_url} />
          <Row label="Codeforces" value={form.codeforces_url} isLink={form.codeforces_url !== "Nil"} />
          {form.codechef_url && <Row label="Codechef" value={form.codechef_url} isLink={form.codechef_url !== "Nil"} />}
          {form.other_cp_url && <Row label="Other CP" value={form.other_cp_url} isLink />}
        </Section>

        {/* About */}
        <Section title="About You" color="#EA4335">
          {form.cgpa && <Row label="CGPA" value={form.cgpa} />}
          <Row
            label="Resume"
            value={form.resume_filename || "Uploaded"}
            icon={<FileText size={14} className="text-green-600" />}
          />
          <LongRow label="Motive to Join" value={form.motive} />
          <LongRow label="Value Addition" value={form.value_addition} />
          <LongRow label="Projects/Experience" value={form.projects} />
        </Section>

        {/* Task Submission */}
        <Section title={`Task — ${form.task_domain}`} color="#8338EC">
          {form.task_links
            .filter((l) => l.trim())
            .map((link, i) => (
              <Row key={i} label={`Link ${i + 1}`} value={link} isLink />
            ))}
        </Section>
      </NeoBrutalism>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className={nb({
            border: 3,
            shadow: "md",
            hover: "lift",
            active: "push",
            className:
              "flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-wider text-sm",
          })}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={onConfirm}
          disabled={submitting}
          className={nb({
            border: 3,
            shadow: "md",
            hover: "lift",
            active: "push",
            className:
              "flex items-center gap-2 bg-[#34A853] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm disabled:opacity-60",
          })}
        >
          {submitting ? "Submitting..." : "Submit"}
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* ========== Sub-Components ========== */

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 border-2 border-black" style={{ backgroundColor: color }} />
        <h4 className="font-black uppercase tracking-wider text-sm">{title}</h4>
      </div>
      <div className="pl-5 space-y-2 border-l-2 border-gray-200">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  isLink,
  icon,
}: {
  label: string;
  value: string;
  isLink?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="font-bold text-gray-500 min-w-[100px] sm:min-w-[130px] shrink-0 font-mono text-xs uppercase">
        {label}
      </span>
      {icon && <span className="mt-0.5">{icon}</span>}
      {isLink && value && value !== "—" ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4285F4] underline flex items-center gap-1 break-all font-mono text-xs"
        >
          {value}
          <ExternalLink size={10} />
        </a>
      ) : (
        <span className="break-all font-mono text-xs">{value || "—"}</span>
      )}
    </div>
  );
}

function LongRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <span className="font-bold text-gray-500 font-mono text-xs uppercase block mb-1">
        {label}
      </span>
      <p className="font-mono text-xs leading-relaxed bg-gray-50 p-3 border border-gray-200 rounded">
        {value || "—"}
      </p>
    </div>
  );
}

function getSuffix(n: number): string {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}
