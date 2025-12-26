"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import {
  Github,
  Linkedin,
  Instagram,
  Code,
  FileText,
  Type,
  Phone,
  MapPin,
  User as UserIcon,
  Mail,
  Pencil,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Zod Schema for Profile Form
const profileFormSchema = z.object({
  image_url: z.string().url().optional().or(z.literal("")),
  branch: z.string().optional(),
  section: z.string().optional(),
  phone_number: z.string().optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  domain: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  thought: z.string().max(500, "Thought must be less than 500 characters").optional(),
  leetcode: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  club_email: z.string().email().optional().or(z.literal("")),
  cv_url: z.string().url().optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  profile: {
    users?: {
      image_url?: string;
      branch?: string;
      section?: string;
      phone_number?: string;
      profile_links?: {
        github?: string;
        linkedin?: string;
      };
      name?: string;
      email?: string;
    };
    domain?: string;
    bio?: string;
    thought?: string;
    leetcode?: string;
    twitter?: string;
    instagram?: string;
    club_email?: string;
    cv_url?: string;
  };
  userId: string;
}

export default function EditProfileModal({
  open,
  onClose,
  onSuccess,
  profile,
  userId,
}: EditProfileModalProps) {
  const u = profile?.users ?? {};

  const [imagePreview, setImagePreview] = useState(u.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with react-hook-form and zod
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
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
    },
  });

  /* -------- IMAGE UPLOAD -------- */
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      form.setValue("image_url", data.url);

      await supabase.from("users").update({ image_url: data.url }).eq("id", userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  // save
  const onSubmit = async (values: ProfileFormValues) => {
    setError(null);

    try {
      console.log("Form values:", values);

      const userUpdate = {
        branch: values.branch,
        section: values.section,
        phone_number: values.phone_number,
        image_url: values.image_url,
        profile_links: {
          github: values.github,
          linkedin: values.linkedin,
        },
      };

      const { error: userError } = await supabase.from("users").update(userUpdate).eq("id", userId);

      if (userError) {
        console.error("User update error:", userError);
        throw userError;
      }

      const memberUpdate = {
        domain: values.domain || null,
        bio: values.bio || null,
        thought: values.thought || null,
        instagram: values.instagram || null,
        twitter: values.twitter || null,
        leetcode: values.leetcode || null,
        club_email: values.club_email || null,
        cv_url: values.cv_url || null,
      };

      console.log("Member update payload:", memberUpdate);
      console.log("Bio value:", values.bio);
      console.log("Thought value:", values.thought);
      console.log("Updating for userId:", userId);

      // First, check if a team_members record exists for this user
      const { data: existingMember } = await supabase
        .from("team_members")
        .select("id")
        .eq("userid", userId)
        .maybeSingle();

      console.log("Existing team member record:", existingMember);

      let updateData;
      let memberError;

      if (!existingMember) {
        // If no record exists, insert a new one
        console.log("No team_members record found, creating one...");
        const insertResult = await supabase
          .from("team_members")
          .insert({ userid: userId, ...memberUpdate })
          .select();

        updateData = insertResult.data;
        memberError = insertResult.error;
      } else {
        // Update existing record
        console.log("Updating existing team_members record...");
        const updateResult = await supabase
          .from("team_members")
          .update(memberUpdate)
          .eq("userid", userId)
          .select();

        updateData = updateResult.data;
        memberError = updateResult.error;
      }

      if (memberError) {
        console.error("Member update error:", memberError);
        throw memberError;
      }

      // Trigger data refresh in parent component
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{
        backgroundColor: "#ffffff",
        border: "4px solid #000000",
        boxShadow: "4px 4px 0px #000000",
        borderRadius: 0,
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black" style={{ color: "#000000" }}>
            Edit Profile
          </DialogTitle>
          <DialogDescription className="font-bold" style={{ color: "#000000" }}>
            Update your team details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* IMAGE + NAME & EMAIL DISPLAY */}
            <div className="flex items-start gap-6 pb-6" style={{
              borderBottom: "3px solid #000000",
            }}>
              {/* Profile Image with Pencil Icon */}
              <div className="relative group">
                <div className="w-28 h-28 overflow-hidden" style={{
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                }}>
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Pencil Icon Button */}
                <Label
                  htmlFor="image-upload"
                  className="absolute bottom-1 right-1 text-white p-2 cursor-pointer transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                  style={{
                    backgroundColor: "#000000",
                    border: "2px solid #000000",
                    boxShadow: "2px 2px 0px #000000",
                  }}
                  title="Change profile picture"
                >
                  <Pencil size={16} />
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </Label>

                {/* Upload Indicator */}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Name & Email Info */}
              <div className="flex flex-col items-start justify-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <UserIcon size={18} className="text-slate-400" />
                  <span className="text-lg font-semibold text-slate-800">
                    {u.name || "Name not set"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {u.email || "Email not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* USER FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Phone size={16} />
                      Phone Number
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <MapPin size={16} />
                      Branch
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter branch"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Type size={16} />
                      Section
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter section"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="club_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Mail size={16} />
                      Club Email
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        type="email"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* BIO */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                    <Type size={16} />
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="resize-none font-medium"
                      style={{
                        border: "3px solid #000000",
                        boxShadow: "3px 3px 0px #000000",
                      }}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* THOUGHT */}
            <FormField
              control={form.control}
              name="thought"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                    <FileText size={16} />
                    Thought
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="resize-none font-medium"
                      style={{
                        border: "3px solid #000000",
                        boxShadow: "3px 3px 0px #000000",
                      }}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SOCIAL LINKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Github size={16} />
                      GitHub URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Linkedin size={16} />
                      LinkedIn URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/username"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Instagram size={16} />
                      Instagram
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://instagram.com/username"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Code size={16} />
                      Twitter
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://twitter.com/username"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leetcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <Code size={16} />
                      LeetCode URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://leetcode.com/username"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cv_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold" style={{ color: "#000000" }}>
                      <FileText size={16} />
                      Resume URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/resume.pdf"
                        {...field}
                        className="font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="text-sm font-bold p-3" style={{
                color: "#dc2626",
                backgroundColor: "#fef2f2",
                border: "3px solid #000000",
                boxShadow: "3px 3px 0px #000000",
              }}>
                {error}
              </div>
            )}

            {/* FOOTER BUTTONS */}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="font-bold transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                style={{
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="font-bold text-white transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                style={{
                  backgroundColor: "#000000",
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                }}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
