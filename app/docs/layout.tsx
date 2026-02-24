import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import "./docs.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider theme={{ enabled: false }}>
      <div id="gdg-docs-wrapper">
        <DocsLayout tree={source.pageTree} {...baseOptions()}>
          {children}
        </DocsLayout>
      </div>
    </RootProvider>
  );
}
