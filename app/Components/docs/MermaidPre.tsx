"use client";

import { useEffect, useState, useId } from "react";
import mermaid from "mermaid";

if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    suppressErrorRendering: true,
    themeVariables: { fontFamily: "'Inter', sans-serif" },
  });
}

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const [svgCode, setSvgCode] = useState("");
  const id = useId();

  useEffect(() => {
    if (!chart?.trim()) return;
    const elId = `mermaid-${id.replace(/:/g, "")}`;
    mermaid
      .parse(chart, { suppressErrors: true })
      .then((valid) => {
        if (!valid) {
          setSvgCode(`<div class="text-red-500 font-medium p-4">Failed to render Mermaid diagram. Check syntax.</div>`);
          return;
        }
        return mermaid.render(elId, chart);
      })
      .then((result) => {
        if (result) setSvgCode(result.svg);
      })
      .catch(() => {
        setSvgCode(`<div class="text-red-500 font-medium p-4">Failed to render Mermaid diagram. Check syntax.</div>`);
        document.getElementById(elId)?.remove();
        document.getElementById(`d${elId}`)?.remove();
      });
  }, [chart, id]);

  return (
    <div className="my-8 flex justify-center w-full" suppressHydrationWarning>
      <div
        className="w-full max-w-4xl p-8 rounded-xl border border-gray-200 shadow-sm bg-white overflow-x-auto flex justify-center items-center"
        dangerouslySetInnerHTML={{ __html: svgCode }}
        suppressHydrationWarning
      />
    </div>
  );
};
