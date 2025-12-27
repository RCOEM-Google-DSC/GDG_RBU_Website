"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CopyButtonProps {
  content: string;
  filename: string;
}

export function CopyButton({ content, filename }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button onClick={handleCopy} variant="outline" className="gap-2" size="sm">
      {copied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy {filename.split(".")[0]}
        </>
      )}
    </Button>
  );
}
