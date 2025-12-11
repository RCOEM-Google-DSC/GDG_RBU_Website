"use client";

import { useState } from "react";
import { supabase } from "@/supabase/supabase";
import {
  X,
  Upload,
  Github,
  Linkedin,
  Instagram,
  Code,
  FileText,
  Type,
  Hash,
  Phone,
  MapPin,
  User as UserIcon,
  Mail,
} from "lucide-react";

export default function EditProfileModal({ onClose, profile, userId }) {
  const u = profile?.users ?? {};

  const DOMAINS = ["web dev", "design", "cp", "mac", "marketing", "management", "social"];

  const [imagePreview, setImagePreview] = useState(u.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    image_url: u.image_url || "",
    branch: u.branch || "",
    section: u.section || "",
    phone_number: u.phone_number || "",
    github: u?.profile_links?.github || "",
    linkedin: u?.profile_links?.linkedin || "",
    domain: profile.domain || "",
    bio: profile.bio || "",
    thought: profile.thought || "",
    leetcode: profile.leetcode || "",
    twitter: profile.twitter || "",
    instagram: profile.instagram || "",
    club_email: profile.club_email || "",
    cv_url: profile.cv_url || "",
  });

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* -------- IMAGE UPLOAD -------- */
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();

      if (!data?.url) throw new Error("Upload failed");

      setImagePreview(data.url);
      updateForm("image_url", data.url);

      await supabase.from("users").update({ image_url: data.url }).eq("id", userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  /* -------- SAVE -------- */
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const userUpdate = {
        branch: form.branch,
        section: form.section,
        phone_number: form.phone_number,
        image_url: form.image_url,
        profile_links: {
          github: form.github,
          linkedin: form.linkedin,
        },
      };

      await supabase.from("users").update(userUpdate).eq("id", userId);

      const memberUpdate = {
        domain: form.domain,
        bio: form.bio,
        thought: form.thought,
        instagram: form.instagram,
        twitter: form.twitter,
        leetcode: form.leetcode,
        club_email: form.club_email,
        cv_url: form.cv_url,
      };

      await supabase.from("team_members").update(memberUpdate).eq("userid", userId);

      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl relative">

        <button onClick={onClose} className="absolute right-4 top-4 text-slate-500 hover:text-black">
          <X size={22} />
        </button>

        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
          <p className="text-slate-500 text-sm">Update your team details</p>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* IMAGE + EMAIL DISPLAY */}
          <div className="flex items-center gap-6">
            <img
              src={imagePreview}
              className="w-28 h-28 rounded-2xl border border-slate-300 object-cover"
            />

            <div className="flex flex-col gap-3">
              <label className="px-4 py-2 bg-slate-900 text-white rounded-xl cursor-pointer flex items-center gap-2 shadow">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Change Image"}
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>

              <div className="text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <UserIcon size={14} />
                  <span>{u.name}</span>
                </div>

                <div className="mt-1 text-xs text-slate-500">Email (not editable)</div>
                <input
                  value={u.email}
                  disabled
                  className="w-full bg-slate-50 border border-slate-100 rounded-md px-3 py-2 text-sm text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* USER FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Phone Number"
              icon={<Phone size={18} />}
              value={form.phone_number}
              onChange={(e) => updateForm("phone_number", e.target.value)}
            />

            <Field
              label="Branch"
              icon={<MapPin size={18} />}
              value={form.branch}
              onChange={(e) => updateForm("branch", e.target.value)}
            />

            <Field
              label="Section"
              icon={<Type size={18} />}
              value={form.section}
              onChange={(e) => updateForm("section", e.target.value)}
            />
          </div>

          {/* DOMAIN */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Domain</label>

            <div className="flex gap-2 items-center border border-slate-300 rounded-xl p-3 bg-white">
              <Hash size={18} className="text-slate-500" />
              <select
                className="w-full outline-none text-slate-700 bg-transparent"
                value={form.domain}
                onChange={(e) => updateForm("domain", e.target.value)}
              >
                <option value="">Select Domain</option>
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BIO */}
          <Field
            label="Bio"
            textarea
            icon={<Type size={18} />}
            value={form.bio}
            onChange={(e) => updateForm("bio", e.target.value)}
          />

          {/* THOUGHT */}
          <Field
            label="Thought"
            textarea
            icon={<FileText size={18} />}
            value={form.thought}
            onChange={(e) => updateForm("thought", e.target.value)}
          />

          {/* LINKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="GitHub URL"
              icon={<Github size={18} />}
              value={form.github}
              onChange={(e) => updateForm("github", e.target.value)}
            />
            <Field
              label="LinkedIn URL"
              icon={<Linkedin size={18} />}
              value={form.linkedin}
              onChange={(e) => updateForm("linkedin", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Instagram"
              icon={<Instagram size={18} />}
              value={form.instagram}
              onChange={(e) => updateForm("instagram", e.target.value)}
            />
            <Field
              label="Twitter"
              icon={<Code size={18} />}
              value={form.twitter}
              onChange={(e) => updateForm("twitter", e.target.value)}
            />
          </div>

          <Field
            label="LeetCode URL"
            icon={<Code size={18} />}
            value={form.leetcode}
            onChange={(e) => updateForm("leetcode", e.target.value)}
          />

          <Field
            label="Resume URL"
            icon={<FileText size={18} />}
            value={form.cv_url}
            onChange={(e) => updateForm("cv_url", e.target.value)}
          />

          <Field
            label="Club Email"
            icon={<Mail size={18} />}
            value={form.club_email}
            onChange={(e) => updateForm("club_email", e.target.value)}
          />

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl shadow hover:bg-black transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({ label, icon, value, onChange, textarea }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-600">{label}</label>

      <div className="flex gap-2 items-start border border-slate-300 rounded-xl p-3 bg-white">
        <div className="text-slate-500 mt-1">{icon}</div>

        {textarea ? (
          <textarea
            className="w-full outline-none resize-none text-slate-700"
            rows={3}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            className="w-full outline-none text-slate-700"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
