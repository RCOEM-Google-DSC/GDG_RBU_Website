import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="gdg-docs-wrapper">
      <DocsLayout tree={source.pageTree} {...baseOptions()}>
        {children}
      </DocsLayout>
    </div>
  );
}
