"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

type AuthUser = {
  id: string;
  role: "admin" | "member" | "user";
} | null;

export function useAuthUser() {
  const supabase = useMemo(() => createClient(), []);
  
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        // fetch role from users table
        const { data, error } = await supabase
          .from("users")
          .select("id, role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
          setUser(null);
        } else if (data) {
          setUser({
            id: data.id,
            role: data.role as "admin" | "member" | "user",
          });
        }
      } catch (err) {
        console.error("Auth hook error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [supabase]);

  return { user, loading };
}
