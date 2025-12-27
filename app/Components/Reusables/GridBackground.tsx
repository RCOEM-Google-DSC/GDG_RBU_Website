"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export function GridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        x={1}
        y={1}
        className={cn(
          "mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
    </div>
  );
}
