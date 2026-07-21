import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || index === undefined || !parent) return;

      parent.children[index] = {
        type: "mdxJsxFlowElement" as any,
        name: "MermaidDiagram",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: node.value,
          },
        ],
        children: [],
      };
    });
  };
}
