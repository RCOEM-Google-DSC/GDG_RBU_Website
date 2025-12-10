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
import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error signing out", {
          description: error.message,
          position: "bottom-right",
        });
      } else {
        toast.success("Signed out successfully", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Error signing out", {
        description: "An unexpected error occurred",
        position: "bottom-right",
      });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2"
            >
              <Avatar className="h-8 w-8">
                {user?.user_metadata?.avatar_url ? (
                  <AvatarImage src={user.user_metadata.avatar_url} />
                ) : (
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </span>
              </div>
              <AiOutlineDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-semibold">My Account</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <CgProfile className="h-4 w-4 mr-2 text-black" />
              <Link href="/profile" className="flex items-center w-full">
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              <CiLogout className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      
    </>
  );
};


export default ProfileDropdown;
