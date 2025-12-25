"use client";

import { useEffect, useState } from "react";
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
import { toast } from "sonner";

const ProfileDropdown = ({ onLogout }: { onLogout?: () => void } = {}) => {
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

        // 1️⃣ Fetch auth session (for email)
        const { data: sessionData } = await supabase.auth.getSession();
        setUserEmail(sessionData.session?.user?.email ?? null);

        // 2️⃣ Fetch profile fields from users table
        const { data: profileData, error: pErr } = await supabase
          .from("users")
          .select("name, image_url, role")
          .eq("id", userId)
          .single();
        if (pErr) {
          console.warn("profile fetch error", pErr);
        }
        setFullName(profileData?.name ?? null);
        setImageUrl(profileData?.image_url ?? null);
        setRole(profileData?.role ?? null);

        // 3️⃣ Check team membership (if any)
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
      if (onLogout) onLogout();
    }
  };

  if (loading) return null;
  if (!userEmail) return null;

  const profileLink =
    role === "admin" || role === "member"
      ? `/team/profile/${teamId ?? ""}`
      : "/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 rounded-2xl"
        >
          <Avatar className="h-9 w-9 rounded-full">
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt={fullName ?? userEmail} />
            ) : (
              <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
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

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <p className="font-semibold">{fullName || userEmail.split("@")[0]}</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer px-4 py-3 rounded-lg">
          <CgProfile className="h-4 w-4 mr-3 text-black" />
          <Link href={profileLink} className="flex items-center w-full">
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer px-4 py-3 rounded-lg"
        >
          <CiLogout className="h-4 w-4 mr-3" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
