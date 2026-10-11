"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/supabase/client";

type AuthUser = {
  id: string;
  role: "admin" | "member" | "user";
} | null;

// The role is resolved via a server route (/api/auth/role) instead of a direct
// browser Supabase query. The browser client coordinates token refresh through
// navigator.locks, and on page load that lock can be contended so a client-side
// getSession()/DB query occasionally never settles — leaving the admin page
// stuck on its loading spinner. The server route reads the same auth cookies
// without any browser lock, so the lookup resolves reliably every load.
const ROLE_FETCH_MAX_ATTEMPTS = 4;
const ROLE_FETCH_RETRY_DELAY_MS = 300;
const ROLE_FETCH_TIMEOUT_MS = 8000;

type RoleResponse = {
  authenticated?: boolean;
  id?: string;
  role?: "admin" | "member" | "user" | null;
};

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const isMountedRef = useRef(true);
  const inFlightRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchRoleOnce = async (): Promise<RoleResponse | null> => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), ROLE_FETCH_TIMEOUT_MS);
      try {
        const res = await fetch("/api/auth/role", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) return null;
        return (await res.json()) as RoleResponse;
      } catch {
        return null;
      } finally {
        clearTimeout(timer);
      }
    };

    // Resolve the role, retrying only when the user is authenticated but the
    // role hasn't materialized yet (e.g. right after login). Always flips
    // `loading` to false so the page can never hang on the spinner.
    const resolveRole = async () => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      try {
        for (let attempt = 1; attempt <= ROLE_FETCH_MAX_ATTEMPTS; attempt++) {
          const result = await fetchRoleOnce();
          if (!isMountedRef.current) return;

          const role = result?.role;
          if (role === "admin" || role === "member" || role === "user") {
            setUser({ id: result!.id as string, role });
            setLoading(false);
            return;
          }

          // Not authenticated -> no point retrying; stays null (blocked).
          if (result && result.authenticated === false) {
            setUser(null);
            setLoading(false);
            return;
          }

          // Authenticated-but-no-role or a transient failure: retry briefly.
          if (attempt < ROLE_FETCH_MAX_ATTEMPTS) {
            await new Promise((r) => setTimeout(r, ROLE_FETCH_RETRY_DELAY_MS));
          } else {
            setUser(null);
            setLoading(false);
          }
        }
      } finally {
        inFlightRef.current = false;
      }
    };

    resolveRole();

    // React to sign-in / sign-out. Note: we only call fetch() here (never an
    // awaited Supabase auth call), so this does not deadlock the auth lock.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (!isMountedRef.current) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        setTimeout(() => {
          if (isMountedRef.current) void resolveRole();
        }, 0);
      }
    });

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
}
