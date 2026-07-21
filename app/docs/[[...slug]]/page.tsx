
import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";

type PageItem = {
  type: "page";
  name: string;
  url: string;
  description?: string;
  external?: boolean;
};

function flattenPages(node: any): PageItem[] {
  if (node.type === "page" && !node.external) return [node];
  if (node.type === "folder") {
    const pages: PageItem[] = [];
    if (node.index) pages.push(...flattenPages(node.index));
    for (const child of node.children) pages.push(...flattenPages(child));
    return pages;
  }
  return [];
}

function getFooterItems(): PageItem[] {
  const tree = (source as any).getPageTree();
  return flattenPages(tree);
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const pages = getFooterItems();
  const idx = pages.findIndex((p) => p.url === page.url);
  const footerItems = {
    previous: idx > 0 ? pages[idx - 1] : undefined,
    next: idx < pages.length - 1 ? pages[idx + 1] : undefined,
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ items: footerItems }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
