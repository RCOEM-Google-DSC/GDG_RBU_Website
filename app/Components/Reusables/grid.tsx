import React from "react";
import { cn } from "@/lib/utils";

export default function GridBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  // IMPORTANT: no more `fixed` – the grid is now confined
  // to whatever container wraps this component.
  return (
    <div className="relative w-full h-full bg-white dark:bg-black font-sans text-neutral-900 dark:text-neutral-50">
      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
        aria-hidden="true"
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden="true"
      />

      {/* Content sits above the grid */}
      {children && <div className="relative z-10 w-full min-h-full">{children}</div>}
    </div>
  );
}
