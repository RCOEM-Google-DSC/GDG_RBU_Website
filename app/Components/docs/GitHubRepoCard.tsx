"use client";

import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GitHubRepoCardProps {
  repoUrl?: string;
  label?: string;
}

export default function GitHubRepoCard({
  repoUrl = "https://github.com/RCOEM-Google-DSC/ideathon",
  label = "View Repository on GitHub",
}: GitHubRepoCardProps) {
  return (
    <div className="my-6">
      <Button
        asChild
        className="gap-2 bg-accent-foreground dark:bg-accent text-white"
        size="sm"
      >
        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
          <Github size={16} />
          {label}
        </a>
      </Button>
    </div>
  );
}
