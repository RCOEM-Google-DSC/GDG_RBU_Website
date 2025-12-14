"use client";

import { useAuthUser } from "./useAuthUser";
import {
  canAccessAdminPanel,
  canManageUsers,
  canManageEvents,
  canManagePartners,
  canViewParticipants,
  UserRole,
} from "@/lib/rbac";

/**
 * Custom hook for role-based access control
 * Provides permission check functions based on current user's role
 */
export function useRBAC() {
  const { user, loading } = useAuthUser();

  const userRole = (user?.role || "user") as UserRole;

  return {
    user,
    loading,
    userRole,
    // Permission check functions
    canAccessAdminPanel: canAccessAdminPanel(userRole),
    canManageUsers: canManageUsers(userRole),
    canManageEvents: canManageEvents(userRole),
    canManagePartners: canManagePartners(userRole),
    canViewParticipants: canViewParticipants(userRole),
  };
}
