"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, getCurrentUserId } from "../../supabase/supabase";

type Status =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function CompleteProfileForm() {
  // Auth data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60";

  const readOnlyInput =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-400 cursor-not-allowed";

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setName(
          user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            ""
        );
        setEmail(user.email || "");
      }
    };

    loadUser();
  }, []);

  // Open file picker
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Upload profile picture (Cloudinary)
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus({ type: "idle" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Image upload failed");
      }

      setImageUrl(data.url);
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Image upload failed",
      });
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle" });

    try {
      const userId = await getCurrentUserId();
      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("users")
        .update({
          section,
          branch,
          phone_number: phone,
          image_url: imageUrl || null,
          profile_links: {
            github: github || null,
            linkedin: linkedin || null,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      setStatus({
        type: "success",
        message: "Profile updated successfully 🎉",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Profile update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="h-16 w-16 rounded-full object-cover border border-zinc-700"
                alt="Profile"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500">
                👤
              </div>
            )}

            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center"
            >
              📷
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">
              Complete your profile
            </h1>
            <p className="text-sm text-zinc-400">
              Add your details so we can recognize you in events.
            </p>
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <input readOnly value={name} className={readOnlyInput} />
          <input readOnly value={email} className={readOnlyInput} />
        </div>

        {/* Academic */}
        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="GitHub URL"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Status */}
        {status.type === "error" && (
          <p className="text-sm text-red-400">{status.message}</p>
        )}
        {status.type === "success" && (
          <p className="text-sm text-emerald-400">{status.message}</p>
        )}
        {uploading && (
          <p className="text-xs text-zinc-400">Uploading image…</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2.5 text-white font-medium disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
