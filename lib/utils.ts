import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get initials from a name
 * @param name Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a profile image URL using DiceBear Avatars API with initials
 * @param name Full name for generating initials
 * @param email Optional email for consistent seed
 * @returns URL to avatar image
 */
export function generateProfileImageUrl(name: string, email?: string): string {
  const seed = email || name;
  const colors = [
    "b6e3f4",
    "ffd6a5",
    "caffbf",
    "fdffb6",
    "ffadad",
    "e0c3fc",
    "fde2e4",
    "d1f7c4",
    "ffe5ec",
    "faf4b7",
    "e5d9f2",
    "c9e4de",
    "f7d9c4",
    "ffeedd",
  ];

  // Simple hash function to pick a consistent color
  const hashCode = seed.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const colorIndex = Math.abs(hashCode) % colors.length;
  const backgroundColor = colors[colorIndex];

  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${backgroundColor}`;
}
