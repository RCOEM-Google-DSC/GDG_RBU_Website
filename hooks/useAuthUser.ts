"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

type AuthUser = {
  id: string;
  role: "admin" | "member" | "user";
} | null;

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      // fetch role from users table
      const { data } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setUser({
          id: data.id,
          role: data.role,
        });
      }

      setLoading(false);
    };

    load();
  }, []);

  return { user, loading };
}
