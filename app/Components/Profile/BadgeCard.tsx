import { cn } from "@/lib/utils";
import { UIBadge } from "../../../lib/types";

interface BadgeCardProps {
  badge: UIBadge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl transition-transform hover:scale-105",
        badge.color
      )}
    >
      <div className="mb-2 p-2 bg-white/50 dark:bg-black/20 rounded-full">
        {badge.icon}
      </div>
      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200 text-center">
        {badge.name}
      </span>
    </div>
  );
}
