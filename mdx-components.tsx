import defaultMdxComponents from "fumadocs-ui/mdx";
import { Steps } from "fumadocs-ui/components/steps";
import type { MDXComponents } from "mdx/types";
import { DownloadButton } from "@/app/Components/docs/DownloadButton";
import { CopyButton } from "@/app/Components/docs/CopyButton";
import { MermaidDiagram } from "@/app/Components/docs/MermaidPre";
import { DocsPre, DocsCode } from "@/app/Components/docs/DocsCodeBlock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  const { pre: _pre, ...rest } = defaultMdxComponents;

  return {
    ...rest,
    pre: DocsPre,
    code: DocsCode,
    Steps,
    MermaidDiagram,
    DownloadButton,
    CopyButton,
    ...components,
  };
}
