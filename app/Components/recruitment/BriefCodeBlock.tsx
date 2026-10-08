"use client";

import { useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";
import http from "highlight.js/lib/languages/http";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import { Check, Copy } from "lucide-react";
import type { BriefCode } from "./constants";
import styles from "./BriefCodeBlock.module.css";

hljs.registerLanguage("http", http);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);

export default function BriefCodeBlock({
  code,
  accent,
}: {
  code: BriefCode;
  /** Domain colour used for the caption bar. */
  accent: string;
}) {
  const [copied, setCopied] = useState(false);

  const html = useMemo(
    () =>
      hljs.getLanguage(code.lang)
        ? hljs.highlight(code.content, { language: code.lang }).value
        : hljs.highlightAuto(code.content).value,
    [code.content, code.lang],
  );
  const lineCount = code.content.split("\n").length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <figure
      className={`${styles.root} border-[3px] border-black shadow-[5px_5px_0_0_#000] bg-[#121212] overflow-hidden`}
    >
      <figcaption
        className="flex items-center gap-2 border-b-[3px] border-black px-3 py-2"
        style={{ backgroundColor: accent }}
      >
        <span className="font-mono text-[11px] font-black uppercase tracking-widest text-black">
          {code.caption ?? "Code"}
        </span>
        <span className="bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
          {code.lang}
        </span>
        <button
          onClick={handleCopy}
          className="ml-auto inline-flex items-center gap-1.5 border-2 border-black bg-white px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          aria-label="Copy code"
        >
          {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={3} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <div className="flex overflow-x-auto">
        <div
          aria-hidden
          className="select-none shrink-0 border-r-2 border-[#2a2a2a] py-4 pl-3 pr-3 text-right font-mono text-[13px] md:text-sm leading-6 text-[#5f6368]"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="m-0 flex-1 py-4 pl-4 pr-6">
          <code
            className="block font-mono text-[13px] md:text-sm leading-6 whitespace-pre"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      </div>
    </figure>
  );
}
