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
import { createClient } from "@/supabase/client";
import { Camera } from "lucide-react";
import ImageCropModal from "../team/ImageCropModal";

interface CompleteProfileDialogProps {
  user: UIUser;
  trigger?: React.ReactNode;
}

/* ✅ ONLY ADDITION (DOES NOT REMOVE ANYTHING) */
const isValidImageUrl = (url?: string) =>
  typeof url === "string" && url.startsWith("http");

export function CompleteProfileDialog({
  user,
  trigger,
}: CompleteProfileDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form fields
  const [section, setSection] = useState(user.section || "");
  const [name, setName] = useState(user.name || "");
  const [branch, setBranch] = useState("");
  const [isOtherBranch, setIsOtherBranch] = useState(false);
  const [customBranch, setCustomBranch] = useState("");
  const [phone, setPhone] = useState(user.phone || "");
  const [imageUrl, setImageUrl] = useState(user.avatarUrl || "");
  const [github, setGithub] = useState(user.profileLinks.github || "");
  const [linkedin, setLinkedin] = useState(user.profileLinks.linkedin || "");
  const [twitter, setTwitter] = useState(user.profileLinks.twitter || "");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>("");
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const branchs = ["CSE", "AIML", "AIDS", "ECE", "ECS", "Mechanical", "Civil", "Other"];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Handle branch selection
  const handleBranchChange = (value: string) => {
    if (value === "Other") {
      setIsOtherBranch(true);
      setBranch("");
      setCustomBranch("");
    } else {
      setIsOtherBranch(false);
      setBranch(value);
      setCustomBranch("");
    }
  };
  // Open file picker
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image selection for cropping
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for cropping
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);

    // Reset the input so the same file can be selected again
    e.target.value = "";
  };

  // Upload cropped image
  const handleCropComplete = async (croppedImageBlob: Blob) => {
    setUploading(true);
    setStatus({ type: "idle" });

    try {
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "profile-image.jpg");

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
      setShowCropModal(false);
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
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("users")
        .update({
          name,
          section,
          branch: isOtherBranch ? customBranch : branch,
          phone_number: phone,
          image_url: imageUrl || null,
          profile_links: {
            github: github || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

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
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        <DialogContent
          className="overflow-y-auto p-6 max-w-4xl max-h-[90vh]"
          style={{
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            borderRadius: 0,
          }}
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <div className="flex items-center gap-5">
                {/* Avatar with Neo-Brutalism */}
                <div className="relative shrink-0">
                  <div
                    className="size-20 overflow-hidden"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "4px 4px 0px #000000",
                      borderRadius: 0,
                    }}
                  >
                    {isValidImageUrl(imageUrl) ? (
                      <Image
                        src={imageUrl}
                        width={80}
                        height={80}
                        className="size-20 object-cover"
                        alt="Profile"
                      />
                    ) : (
                      <div
                        className="size-20 flex items-center justify-center text-3xl"
                        style={{ backgroundColor: "#ffd23d" }}
                      >
                        👤
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    disabled={uploading}
                    className="bg-gray-300 absolute -bottom-1 -right-1 size-8 flex items-center justify-center font-bold transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  >
                    <Camera />
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
                  <DialogTitle
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "#000000" }}
                  >
                    COMPLETE YOUR PROFILE
                  </DialogTitle>
                  <DialogDescription
                    className="font-bold mt-1"
                    style={{ color: "#000000" }}
                  >
                    Add your details so we can recognize you in events.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-6 py-6">
              {/* Name & Email (Read-only) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-bold text-sm" style={{ color: "#000000" }}>NAME</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-bold text-sm" style={{ color: "#000000" }}>EMAIL</Label>
                  <Input
                    id="email"
                    value={user.email}
                    readOnly
                    className="bg-neutral-100 cursor-not-allowed font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="section" className="font-bold text-sm" style={{ color: "#000000" }}>SECTION</Label>
                  <Input
                    id="section"
                    placeholder="A, B, C..."
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="branch" className="font-bold text-sm" style={{ color: "#000000" }}>
                    BRANCH
                    {isOtherBranch && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOtherBranch(false);
                          setBranch("");
                          setCustomBranch("");
                        }}
                        className="ml-2 text-xs font-normal underline"
                        style={{ color: "#4284ff" }}
                      >
                        (Back to dropdown)
                      </button>
                    )}
                  </Label>
                  {isOtherBranch ? (
                    <Input
                      id="branch"
                      placeholder="Enter your branch"
                      value={customBranch}
                      onChange={(e) => setCustomBranch(e.target.value)}
                      className="bg-white font-medium"
                      style={{
                        border: "3px solid #000000",
                        boxShadow: "3px 3px 0px #000000",
                        borderRadius: 0,
                      }}
                      autoFocus
                    />
                  ) : (
                    <Select value={branch} onValueChange={handleBranchChange}>
                      <SelectTrigger
                        className="w-full bg-white font-medium"
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                          borderRadius: 0,
                        }}
                      >
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          border: "3px solid #000000",
                          boxShadow: "3px 3px 0px #000000",
                          borderRadius: 0,
                        }}
                      >
                        {branchs.map((b) => (
                          <SelectItem key={b} value={b} className="font-medium">
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-bold text-sm" style={{ color: "#000000" }}>PHONE</Label>
                  <Input
                    id="phone"
                    placeholder="1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="github" className="font-bold text-sm" style={{ color: "#000000" }}>GITHUB URL</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin" className="font-bold text-sm" style={{ color: "#000000" }}>LINKEDIN URL</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="twitter" className="font-bold text-sm" style={{ color: "#000000" }}>TWITTER URL</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/username"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="bg-white font-medium"
                    style={{
                      border: "3px solid #000000",
                      boxShadow: "3px 3px 0px #000000",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>

              {/* Status Messages */}
              {status.type === "error" && (
                <div
                  className="text-sm font-bold px-4 py-2"
                  style={{
                    color: "#000000",
                    backgroundColor: "#ff5050",
                    border: "3px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                    borderRadius: 0,
                  }}
                >
                  {status.message}
                </div>
              )}
              {status.type === "success" && (
                <div
                  className="text-sm font-bold px-4 py-2"
                  style={{
                    color: "#000000",
                    backgroundColor: "#00f566",
                    border: "3px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                    borderRadius: 0,
                  }}
                >
                  {status.message}
                </div>
              )}
              {uploading && (
                <p className="text-sm font-bold" style={{ color: "#000000" }}>Uploading image…</p>
              )}
            </div>

            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="font-bold transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                    borderRadius: 0,
                    color: "#000000",
                  }}
                >
                  CANCEL
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading || uploading}
                className="font-bold transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                style={{
                  backgroundColor: loading || uploading ? "#d1d5db" : "#000000",
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                  borderRadius: 0,
                  color: "#ffffff",
                }}
              >
                {loading ? "SAVING..." : "SAVE PROFILE"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Crop Modal */}
      {
        showCropModal && imageToCrop && (
          <ImageCropModal
            open={showCropModal}
            imageSrc={imageToCrop}
            onClose={() => setShowCropModal(false)}
            onCropComplete={handleCropComplete}
            uploading={uploading}
          />
        )
      }
    </>
  );
}
