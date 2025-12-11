"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineDown } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) return;

        // 1️⃣ Fetch auth user (for email)
        const { data: sessionData } = await supabase.auth.getSession();
        setUserEmail(sessionData.session?.user?.email ?? null);

        // 2️⃣ Fetch users table (your actual stored profile)
        const { data: profileData } = await supabase
          .from("users")
          .select("name, image_url, role")
          .eq("id", userId)
          .single();

        setFullName(profileData?.name ?? null);
        setImageUrl(profileData?.image_url ?? null);
        setRole(profileData?.role ?? null);

        // 3️⃣ Check if team member
        const { data: team } = await supabase
          .from("team_members")
          .select("userid")
          .eq("userid", userId)
          .maybeSingle();

        if (team) setTeamId(team.userid);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out", {
        description: error.message,
        position: "bottom-right",
      });
    } else {
      toast.success("Signed out", { position: "bottom-right" });
    }
  };

  if (loading) return null;

  if (!userEmail) return null;

  // Dynamic profile:
  const profileLink =
    role === "admin" || role === "member"
      ? `/team-profile/${teamId}`
      : "/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
          <Avatar className="h-8 w-8">
            {/* 👇 FINAL FIX — Always shows stored image_url */}
            {imageUrl ? (
              <AvatarImage src={imageUrl} />
            ) : (
              <AvatarFallback>
                {userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium">
              {fullName || userEmail.split("@")[0]}
            </span>
          </div>

          <AiOutlineDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-semibold">My Account</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <CgProfile className="h-4 w-4 mr-2 text-black" />
          <Link href={profileLink} className="flex items-center w-full">
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <CiLogout className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
