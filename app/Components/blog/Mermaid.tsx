"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export const Mermaid = ({ chart }: { chart: string }) => {
  const [svgCode, setSvgCode] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      themeVariables: {
        fontFamily: "'Inter', sans-serif",
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvgCode(svg);
      } catch (error) {
        console.error("Mermaid parsing failed", error);
        setSvgCode(`<div class="text-red-500 font-medium p-4">Failed to render Mermaid diagram. Check syntax.</div>`);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="my-8 flex justify-center w-full">
      <div 
        className="w-full max-w-4xl p-8 rounded-xl border border-gray-200 shadow-sm bg-white overflow-x-auto flex justify-center items-center"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
    </div>
  );
};
