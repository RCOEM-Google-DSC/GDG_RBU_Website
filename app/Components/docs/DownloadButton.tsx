"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  filename: string;
  content: string;
}

export function DownloadButton({ filename, content }: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      className="gap-2 bg-accent-foreground dark:bg-accent text-white"
      size="sm"
    >
      <Download size={16} />
      Download {filename}
    </Button>
  );
}
