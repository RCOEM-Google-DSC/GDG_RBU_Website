"use client";

import { useEffect, useState, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { Check, Copy } from "lucide-react";

function extractText(children: any): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children?.props?.children) return extractText(children.props.children);
  return "";
}

function extractLang(children: any): string | null {
  const code = children?.props ?? children;
  const match = /language-(\w+)/.exec(code?.className || "");
  return match ? match[1] : null;
}

export const DocsPre = (props: any) => {
  const codeText = extractText(props.children);
  const lang = extractLang(props.children);
  const [highlighted, setHighlighted] = useState("");
  const [copied, setCopied] = useState(false);
  const isMounted = useRef(false);
  const hiddenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isMounted.current = true;
    // wait a small delay for the DOM to have the content
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      let content = hiddenRef.current?.textContent || codeText || extractText(props.children);
      if (!content) return;
      try {
        const l = lang || null;
        const result = l && hljs.getLanguage(l)
          ? hljs.highlight(content, { language: l })
          : hljs.highlightAuto(content);
        setHighlighted(result.value);
      } catch {
        setHighlighted(hljs.highlightAuto(content).value);
      }
    }, 0);
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    const text = codeText || extractText(props.children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = highlighted.split("\n");

  return (
    <div className="relative group my-8">
      <div ref={hiddenRef} className="hidden" style={{ display: "none" }}>
        {props.children}
      </div>
      {lang && (
        <div className="absolute -top-3 left-4 bg-[#1e1e1e] text-[#d4d4d4] px-3 py-1 text-xs font-bold uppercase tracking-wider z-10 rounded-sm select-none">
          {lang}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-[#1e1e1e]/80 hover:bg-[#1e1e1e] text-gray-400 hover:text-white rounded-md transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
      <div
        className="overflow-x-auto rounded-lg bg-[#282c34] border border-[#3c3c3c]"
      >
        <table className="w-full border-collapse bg-[#282c34]" style={{ tableLayout: "auto" }}>
          <tbody className="bg-[#282c34]">
            {lines.map((line, i) => (
              <tr key={i} className="leading-relaxed">
                <td
                  className="text-right pr-4 pl-4 select-none text-[#636d83] text-sm"
                  style={{
                    width: "1%",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    paddingTop: i === 0 ? "1.5rem" : "0.25rem",
                    paddingBottom: i === lines.length - 1 ? "1.5rem" : "0.25rem",
                  }}
                >
                  {i + 1}
                </td>
                <td
                  className="pr-4 pl-4 bg-[#282c34]"
                  style={{
                    paddingTop: i === 0 ? "1.5rem" : "0.25rem",
                    paddingBottom: i === lines.length - 1 ? "1.5rem" : "0.25rem",
                  }}
                >
                  <code
                    className="hljs"
                    style={{
                      fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                      fontSize: "0.95rem",
                      background: "transparent",
                      padding: 0,
                      whiteSpace: "pre",
                    }}
                    dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DocsCode = (props: any) => {
  return (
    <code
      className="bg-[#282c34] text-[#e06c75] px-2 py-0.5 rounded font-mono text-sm font-bold mx-1"
      {...props}
    >
      {props.children}
    </code>
  );
};
