import { isDevelopmentMode } from "./rbac.config";

/**
 * User role type definition
 */
export type UserRole = "admin" | "member" | "user";

/**
 * Check if user has required permission level
 * @param userRole - Current user's role
 * @param requiredRole - Required role for the action
 * @returns true if user has permission, false otherwise
 */
export function hasPermission(
  userRole: UserRole | string,
  requiredRole: UserRole,
): boolean {
  if (isDevelopmentMode) return true;

  const roleHierarchy: Record<UserRole, number> = {
    admin: 3,
    member: 2,
    user: 1,
  };

  const userLevel = roleHierarchy[userRole as UserRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

/**
 * Check if user can access admin panel
 * Only admin and member roles can access, user role is blocked
 */
export function canAccessAdminPanel(userRole: UserRole | string): boolean {
  if (isDevelopmentMode) return true;
  return userRole === "admin" || userRole === "member";
}

/**
 * Check if user can manage users (change roles, delete users)
 * Only admin role can manage users
 */
export function canManageUsers(userRole: UserRole | string): boolean {
  if (isDevelopmentMode) return true;
  return userRole === "admin";
}

/**
 * Check if user can manage events (create, edit, delete events)
 * Both admin and member roles can manage events
 */
export function canManageEvents(userRole: UserRole | string): boolean {
  if (isDevelopmentMode) return true;
  return userRole === "admin" || userRole === "member";
}

/**
 * Check if user can manage partners (create, edit, delete partners)
 * Both admin and member roles can manage partners
 */
export function canManagePartners(userRole: UserRole | string): boolean {
  if (isDevelopmentMode) return true;
  return userRole === "admin" || userRole === "member";
}

/**
 * Check if user can view and manage event participants
 * Both admin and member roles can manage participants
 */
export function canViewParticipants(userRole: UserRole | string): boolean {
  if (isDevelopmentMode) return true;
  return userRole === "admin" || userRole === "member";
}
