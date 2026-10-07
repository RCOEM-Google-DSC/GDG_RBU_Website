"use client";

import React, { useRef, useState } from "react";
import {
  User, Mail, Phone, GraduationCap, Briefcase, Linkedin, Github,
  Upload, ChevronDown, ChevronUp, Loader2, FileText, X
} from "lucide-react";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";
import {
  PersonalDetailsData,
  YEAR_OPTIONS,
  TECH_DOMAIN_OPTIONS,
  SOCIALS_DOMAIN_OPTIONS,
  DOMAIN_PREFERENCE_OPTIONS,
} from "./constants";

interface PersonalDetailsFormProps {
  form: PersonalDetailsData;
  setForm: (f: PersonalDetailsData) => void;
  collapsed: boolean;
  onToggle: () => void;
  onComplete: () => void;
  saving?: boolean;
  alreadySaved?: boolean;
}

export default function PersonalDetailsForm({
  form,
  setForm,
  collapsed,
  onToggle,
  onComplete,
  saving = false,
  alreadySaved = false,
}: PersonalDetailsFormProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof PersonalDetailsData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 2 MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setForm({
        ...form,
        resume_url: data.url,
        resume_filename: file.name,
      });
      toast.success("Resume uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const validateAndContinue = () => {
    if (!form.name?.trim()) { toast.error("Name is required"); return; }
    if (!form.email?.trim()) { toast.error("Email is required"); return; }
    if (!form.phone?.trim()) { toast.error("Phone number is required"); return; }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) { toast.error("Enter a valid 10-digit phone number"); return; }
    if (!form.year) { toast.error("Year is required"); return; }
    if (!form.branch?.trim()) { toast.error("Branch is required"); return; }
    if (!form.domain_pref_1) { toast.error("Domain Preference 1 is required"); return; }

    // Validate no duplicate domain preferences
    const prefs = [form.domain_pref_1, form.domain_pref_2, form.domain_pref_3].filter(Boolean);
    const uniquePrefs = new Set(prefs);
    if (prefs.length !== uniquePrefs.size) {
      toast.error("Each domain preference must be different. Please fix duplicate preferences.");
      return;
    }

    if (!form.linkedin_url?.trim()) { toast.error("LinkedIn URL is required"); return; }
    if (!form.tech_domain) { toast.error("Tech domain preference is required"); return; }
    if (!form.socials_domain) { toast.error("Socials domain preference is required"); return; }
    if (!form.codeforces_url?.trim()) { toast.error("Codeforces profile is required (type 'Nil' if none)"); return; }
    if (!form.codechef_url?.trim()) { toast.error("Codechef profile is required (type 'Nil' if none)"); return; }
    if (!form.resume_url) { toast.error("Resume upload is required"); return; }
    if (!form.motive?.trim()) { toast.error("Motive to join is required"); return; }
    if (!form.value_addition?.trim()) { toast.error("Value addition answer is required"); return; }
    if (!form.projects?.trim()) { toast.error("Projects/experience is required"); return; }

    onComplete();
  };

  return (
    <div className={nb({ border: 3, shadow: "lg", className: "bg-white overflow-hidden" })}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#4285F4] text-white font-black uppercase tracking-wider text-sm hover:bg-[#3b78e0] transition-colors"
      >
        <span className="flex items-center gap-2">
          <User size={18} />
          Personal Details
          {collapsed && form.name && (
            <span className="text-xs font-mono font-normal opacity-80 normal-case">
              — {form.name}
            </span>
          )}
        </span>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      {/* Form Body */}
      {!collapsed && (
        <div className="p-6 md:p-8 space-y-5">
          {/* Name */}
          <FieldWrapper label="Name" required>
            <InputWithIcon
              icon={User}
              value={form.name}
              onChange={(v) => update("name", v)}
              placeholder="e.g. Rahul Sharma"
            />
          </FieldWrapper>

          {/* Email */}
          <FieldWrapper label="Email ID" required>
            <InputWithIcon
              icon={Mail}
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="e.g. rahul@gmail.com"
              type="email"
            />
          </FieldWrapper>

          {/* Phone */}
          <FieldWrapper label="Contact Number (WhatsApp)" required>
            <InputWithIcon
              icon={Phone}
              value={form.phone}
              onChange={(v) => update("phone", v)}
              placeholder="e.g. 9876543210"
            />
          </FieldWrapper>

          {/* Year + Branch in row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper label="Year" required>
              <SelectField
                value={form.year ?? ""}
                onChange={(v) => update("year", v ? Number(v) : null)}
                placeholder="Select year"
                options={YEAR_OPTIONS.map((y) => ({
                  label: y.label,
                  value: String(y.value),
                }))}
              />
            </FieldWrapper>

            <FieldWrapper label="Branch" required>
              <InputWithIcon
                icon={Briefcase}
                value={form.branch}
                onChange={(v) => update("branch", v)}
                placeholder="e.g. CSE, DS, AIML"
              />
            </FieldWrapper>
          </div>

          {/* Domain Preference Grid */}
          <FieldWrapper label="Domain Preference" required>
            <DomainPreferenceGrid
              pref1={form.domain_pref_1}
              pref2={form.domain_pref_2}
              pref3={form.domain_pref_3}
              onChange={(p1, p2, p3) =>
                setForm({ ...form, domain_pref_1: p1, domain_pref_2: p2, domain_pref_3: p3 })
              }
            />
          </FieldWrapper>

          {/* Tech + Socials Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper label="Preferable Tech Domain" required>
              <SelectField
                value={form.tech_domain}
                onChange={(v) => update("tech_domain", v)}
                placeholder="Select tech domain"
                options={TECH_DOMAIN_OPTIONS.map((o) => ({ label: o, value: o }))}
              />
            </FieldWrapper>

            <FieldWrapper label="Preferable Socials Domain" required>
              <SelectField
                value={form.socials_domain}
                onChange={(v) => update("socials_domain", v)}
                placeholder="Select socials domain"
                options={SOCIALS_DOMAIN_OPTIONS.map((o) => ({ label: o, value: o }))}
              />
            </FieldWrapper>
          </div>

          {/* LinkedIn */}
          <FieldWrapper label="LinkedIn Profile URL" required>
            <InputWithIcon
              icon={Linkedin}
              value={form.linkedin_url}
              onChange={(v) => update("linkedin_url", v)}
              placeholder="https://linkedin.com/in/username"
              type="url"
            />
          </FieldWrapper>

          {/* GitHub */}
          <FieldWrapper label="GitHub Profile URL">
            <InputWithIcon
              icon={Github}
              value={form.github_url}
              onChange={(v) => update("github_url", v)}
              placeholder="https://github.com/username"
              type="url"
            />
          </FieldWrapper>

          {/* CP Profiles */}
          <FieldWrapper label="Codeforces Profile Link" required hint="Type 'Nil' if none">
            <InputWithIcon
              value={form.codeforces_url}
              onChange={(v) => update("codeforces_url", v)}
              placeholder="https://codeforces.com/profile/username or Nil"
            />
            <p className="text-xs text-amber-600 font-medium mt-1">
              ⚠ For the CP domain, providing your Codeforces link is mandatory. Applications without it will not be considered.
            </p>
          </FieldWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper label="Codechef Profile Link" required hint="Type 'Nil' if none">
              <InputWithIcon
                value={form.codechef_url}
                onChange={(v) => update("codechef_url", v)}
                placeholder="https://codechef.com/users/username or Nil"
              />
              <p className="text-xs text-amber-600 font-medium mt-1">
                ⚠ For the CP domain, providing your Codechef link is mandatory. Applications without it will not be considered.
              </p>
            </FieldWrapper>

            <FieldWrapper label="Other CP Profile" hint="Optional">
              <InputWithIcon
                value={form.other_cp_url}
                onChange={(v) => update("other_cp_url", v)}
                placeholder="LeetCode, HackerRank, etc."
              />
            </FieldWrapper>
          </div>

          {/* CGPA */}
          <FieldWrapper label="Current CGPA" hint="Optional">
            <InputWithIcon
              value={form.cgpa}
              onChange={(v) => update("cgpa", v)}
              placeholder="e.g. 8.69"
              type="number"
            />
          </FieldWrapper>

          {/* Resume Upload */}
          <FieldWrapper label="Resume" required hint="PDF only, max 2 MB">
            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className={nb({
                  border: 2,
                  shadow: "md",
                  className:
                    "flex items-center gap-2 px-4 py-3 bg-white font-mono text-sm hover:bg-gray-50",
                })}
              >
                {uploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploading ? "Uploading..." : "Choose File"}
              </button>

              {form.resume_filename && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border-2 border-green-300 text-sm font-mono">
                  <FileText size={14} className="text-green-600" />
                  <span className="truncate max-w-[200px]">{form.resume_filename}</span>
                  <button
                    onClick={() => setForm({ ...form, resume_url: "", resume_filename: "" })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </FieldWrapper>

          {/* Motive */}
          <FieldWrapper label="What is your motive to join GDG?" required>
            <textarea
              value={form.motive}
              onChange={(e) => update("motive", e.target.value)}
              placeholder="Share your motivation..."
              rows={3}
              className={nb({
                border: 2,
                shadow: "md",
                className: "w-full py-3 px-4 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm resize-none",
              })}
            />
          </FieldWrapper>

          {/* Value Addition */}
          <FieldWrapper label="How can you add value to the GDG community?" required>
            <textarea
              value={form.value_addition}
              onChange={(e) => update("value_addition", e.target.value)}
              placeholder="Tell us how you can contribute..."
              rows={3}
              className={nb({
                border: 2,
                shadow: "md",
                className: "w-full py-3 px-4 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm resize-none",
              })}
            />
          </FieldWrapper>

          {/* Projects */}
          <FieldWrapper
            label="Any project/previous work/experience to showcase?"
            required
            hint="GitHub link, Google Drive link, or portfolio URL"
          >
            <textarea
              value={form.projects}
              onChange={(e) => update("projects", e.target.value)}
              placeholder="Share links or describe your work..."
              rows={3}
              className={nb({
                border: 2,
                shadow: "md",
                className: "w-full py-3 px-4 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm resize-none",
              })}
            />
          </FieldWrapper>

          {/* Continue Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={validateAndContinue}
              disabled={saving || uploading}
              className={nb({
                border: 3,
                shadow: "md",
                hover: "lift",
                active: "push",
                className:
                  "flex items-center gap-2 bg-black text-white px-6 py-3 font-bold uppercase tracking-wider text-sm disabled:opacity-60",
              })}
            >
              {saving
                ? "Saving..."
                : alreadySaved
                  ? "Update Details & Continue"
                  : "Save Details & Continue"}
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========== Reusable Sub-Components ========== */

function FieldWrapper({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans font-black uppercase tracking-tight text-xs flex items-center gap-1.5">
        {label}
        {required && <span className="text-[#EA4335]">*</span>}
        {hint && <span className="font-mono font-normal text-gray-400 normal-case text-[10px]">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function InputWithIcon({
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  icon?: any;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
          <Icon size={18} strokeWidth={2.5} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={nb({
          border: 2,
          shadow: "md",
          className: `w-full py-3 ${Icon ? "pl-11" : "pl-4"} pr-4 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm placeholder:text-gray-400 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`,
        })}
      />
    </div>
  );
}

function SelectField({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={nb({
          border: 2,
          shadow: "md",
          className:
            "w-full py-3 pl-4 pr-10 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm appearance-none cursor-pointer",
        })}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown size={14} />
      </div>
    </div>
  );
}

function DomainPreferenceGrid({
  pref1,
  pref2,
  pref3,
  onChange,
}: {
  pref1: string;
  pref2: string;
  pref3: string;
  onChange: (p1: string, p2: string, p3: string) => void;
}) {
  const prefs = [pref1, pref2, pref3];

  // Detect duplicate preferences
  const duplicates = new Set<number>();
  for (let i = 0; i < prefs.length; i++) {
    if (!prefs[i]) continue;
    for (let j = i + 1; j < prefs.length; j++) {
      if (prefs[j] && prefs[i] === prefs[j]) {
        duplicates.add(i);
        duplicates.add(j);
      }
    }
  }
  const hasDuplicates = duplicates.size > 0;

  const handleChange = (prefIndex: number, value: string) => {
    const next = [...prefs];
    next[prefIndex] = value;
    // Auto-clear other preferences that have the same value
    for (let i = 0; i < next.length; i++) {
      if (i !== prefIndex && next[i] === value) {
        next[i] = "";
      }
    }
    onChange(next[0], next[1], next[2]);
  };

  return (
    <div>
      {hasDuplicates && (
        <div className="mb-2 flex items-center gap-2 bg-red-50 border-2 border-red-400 text-red-700 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wide">
          <span className="text-red-500 text-base">⚠</span>
          Each preference must be a different domain. Please fix duplicates before submitting.
        </div>
      )}
      <div className={nb({ border: 2, shadow: "md", className: `bg-white overflow-x-auto ${hasDuplicates ? "border-red-400" : ""}` })}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 px-3 text-left font-black uppercase tracking-wider" />
              {DOMAIN_PREFERENCE_OPTIONS.map((domain) => (
                <th
                  key={domain}
                  className="py-3 px-2 text-center font-bold uppercase tracking-wider text-[10px] sm:text-xs"
                >
                  {domain}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["Preference 1", "Preference 2", "Preference 3"].map((label, i) => (
              <tr
                key={label}
                className={`${i < 2 ? "border-b border-gray-200" : ""} ${duplicates.has(i) ? "bg-red-50" : ""}`}
              >
                <td className={`py-3 px-3 font-bold whitespace-nowrap ${duplicates.has(i) ? "text-red-600" : ""}`}>
                  {label}
                  {duplicates.has(i) && <span className="text-red-500 ml-1">✗</span>}
                </td>
                {DOMAIN_PREFERENCE_OPTIONS.map((domain) => (
                  <td key={domain} className="py-3 px-2 text-center">
                    <input
                      type="radio"
                      name={`pref-${i}`}
                      checked={prefs[i] === domain}
                      onChange={() => handleChange(i, domain)}
                      className={`w-4 h-4 cursor-pointer ${duplicates.has(i) ? "accent-red-500" : "accent-[#4285F4]"}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
