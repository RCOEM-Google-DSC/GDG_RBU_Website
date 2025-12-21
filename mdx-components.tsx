import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DownloadButton } from '@/app/Components/docs/DownloadButton';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        DownloadButton,
        ...components,
    };
}
