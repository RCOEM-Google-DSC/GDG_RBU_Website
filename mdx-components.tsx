import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { DownloadButton } from "@/app/Components/docs/DownloadButton";
import { CopyButton } from "@/app/Components/docs/CopyButton";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DownloadButton,
    CopyButton,
    ...components,
  };
}
