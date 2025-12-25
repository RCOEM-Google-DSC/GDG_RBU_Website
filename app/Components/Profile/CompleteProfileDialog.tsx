"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { UIUser } from "../../../lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase, getCurrentUserId } from "../../../supabase/supabase";

interface CompleteProfileDialogProps {
  user: UIUser;
  trigger?: React.ReactNode;
}

/* ✅ ONLY ADDITION (DOES NOT REMOVE ANYTHING) */
const isValidImageUrl = (url?: string) =>
  typeof url === "string" && url.startsWith("http");

export function CompleteProfileDialog({ user, trigger }: CompleteProfileDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form fields
  const [section, setSection] = useState(
    user.location?.includes(",") ? user.location.split(",")[0].trim() : (user.location || "")
  );
  const [branch, setBranch] = useState("");
  const [customBranch, setCustomBranch] = useState("");
  const [phone, setPhone] = useState(user.phone || "");
  const [imageUrl, setImageUrl] = useState(user.avatarUrl || "");
  const [github, setGithub] = useState(user.profileLinks.github || "");
  const [linkedin, setLinkedin] = useState(user.profileLinks.linkedin || "");
  const [twitter, setTwitter] = useState(user.profileLinks.twitter || "");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });

  const branchs = ["CSE", "AIML", "AIDS", "ECE", "ECS","Mechanical", "Civil"];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Open file picker
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Upload profile picture
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setStatus({ type: "success", message: "Image uploaded successfully!" });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Image upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  // Submit profile update
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
          branch: branch === "Other" ? customBranch : branch,
          phone_number: phone,
          image_url: imageUrl || null,
          profile_links: {
            github: github || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      setStatus({
        type: "success",
        message: "Profile updated successfully 🎉",
      });

      // Close dialog after 1.5 seconds
      setTimeout(() => {
        setDialogOpen(false);
        window.location.reload();
      }, 1500);
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="overflow-y-auto p-5 max-w-4xl max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-4">
              {/* Avatar (ONLY FIX IS HERE) */}
              <div className="relative">
                {isValidImageUrl(imageUrl) ? (
                  <Image
                    src={imageUrl}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                    alt="Profile"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-2xl">
                    👤
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={uploading}
                  className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center disabled:opacity-60"
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
                <DialogTitle>Complete your profile</DialogTitle>
                <DialogDescription>
                  Add your details so we can recognize you in events.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            {/* Name & Email (Read-only) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={user.name}
                  readOnly
                  className="bg-neutral-100 dark:bg-neutral-800 cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  className="bg-neutral-100 dark:bg-neutral-800 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-3 gap-6 space-x-3">
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  placeholder="A, B, C..."
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="branch">Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branchs.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {branch === "Other" && (
                  <Input
                    id="customBranch"
                    placeholder="Enter your branch"
                    value={customBranch}
                    onChange={(e) => setCustomBranch(e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
            </div>

            {/* Status Messages */}
            {status.type === "error" && (
              <p className="text-sm text-red-600 dark:text-red-400">{status.message}</p>
            )}
            {status.type === "success" && (
              <p className="text-sm text-green-600 dark:text-green-400">{status.message}</p>
            )}
            {uploading && (
              <p className="text-xs text-neutral-500">Uploading image…</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
