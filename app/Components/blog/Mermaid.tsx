"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid once globally at the module level on client-side
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    suppressErrorRendering: true,
    themeVariables: {
      fontFamily: "'Inter', sans-serif",
    },
  });
}

export const Mermaid = ({ chart }: { chart: string }) => {
  const [svgCode, setSvgCode] = useState<string>("");

  useEffect(() => {
    const renderChart = async () => {
      if (!chart || !chart.trim()) {
        setSvgCode("");
        return;
      }
      
      const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
      
      try {
        const isValid = await mermaid.parse(chart, { suppressErrors: true });
        if (isValid === false) {
          setSvgCode(`<div class="text-red-500 font-medium p-4">Failed to render Mermaid diagram. Check syntax.</div>`);
          return;
        }
        
        const { svg } = await mermaid.render(id, chart);
        setSvgCode(svg);
      } catch (error) {
        setSvgCode(`<div class="text-red-500 font-medium p-4">Failed to render Mermaid diagram. Check syntax.</div>`);
        
        // Clean up any stray container elements left in the DOM by Mermaid on error
        const container = document.getElementById(id) || document.getElementById(`d${id}`);
        if (container) {
          container.remove();
        }
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
