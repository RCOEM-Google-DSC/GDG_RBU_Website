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
} from "lucide-react";

export default function EditProfileModal({ onClose, profile, userId }) {
  const u = profile.users;

  const [imagePreview, setImagePreview] = useState(u.image_url);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    github: u?.profile_links?.github || "",
    linkedin: u?.profile_links?.linkedin || "",
    instagram: profile.instagram || "",
    leetcode: profile.leetcode || "",
    bio: profile.bio || "",
    thought: profile.thought || "",
    domain: profile.domain || "",
    cv_url: profile.cv_url || "",
  });

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ---------- CLOUDINARY UPLOAD ----------
  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    const data = await res.json();
    setUploading(false);

    if (data?.url) {
      setImagePreview(data.url);

      await supabase
        .from("users")
        .update({ image_url: data.url })
        .eq("id", userId);
    }
  };

  // ---------- SAVE ----------
  const handleSave = async () => {
    await supabase
      .from("users")
      .update({
        profile_links: {
          github: form.github,
          linkedin: form.linkedin,
        },
      })
      .eq("id", userId);

    await supabase
      .from("team_members")
      .update({
        domain: form.domain,
        bio: form.bio,
        thought: form.thought,
        instagram: form.instagram,
        leetcode: form.leetcode,
        cv_url: form.cv_url,
      })
      .eq("userid", userId);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
          <p className="text-slate-500 text-sm">Update your team details</p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* IMAGE */}
          <div className="flex items-center gap-6">
            <img
              src={imagePreview}
              className="w-28 h-28 rounded-2xl border border-slate-300 object-cover"
            />

            <label className="px-4 py-2 bg-slate-900 text-white rounded-xl cursor-pointer flex items-center gap-2 shadow">
              <Upload size={18} />
              {uploading ? "Uploading..." : "Change Image"}
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* DOMAIN */}
          <Field
            label="Domain"
            icon={<Hash size={18} />}
            value={form.domain}
            onChange={(e) => updateForm("domain", e.target.value)}
          />

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
          <Field
            label="GitHub"
            icon={<Github size={18} />}
            value={form.github}
            onChange={(e) => updateForm("github", e.target.value)}
          />

          <Field
            label="LinkedIn"
            icon={<Linkedin size={18} />}
            value={form.linkedin}
            onChange={(e) => updateForm("linkedin", e.target.value)}
          />

          <Field
            label="Instagram"
            icon={<Instagram size={18} />}
            value={form.instagram}
            onChange={(e) => updateForm("instagram", e.target.value)}
          />

          <Field
            label="LeetCode"
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
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl shadow hover:bg-black transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

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
