"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SOCIAL_PLATFORMS } from "@/lib/types";
import {
    Github,
    Linkedin,
    Instagram,
    Facebook,
    Youtube,
    Dribbble,
    Globe,
    Mail,
} from "lucide-react";

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

interface PlatformSelectorProps {
    value: string;
    onChange: (value: string) => void;
    disabledPlatforms?: string[];
    className?: string;
}

const platformIcons: Record<string, React.ReactNode> = {
    github: <Github className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    twitter: <XIcon className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    youtube: <Youtube className="h-4 w-4" />,
    dribbble: <Dribbble className="h-4 w-4" />,
    behance: <Globe className="h-4 w-4" />,
    medium: <Globe className="h-4 w-4" />,
    dev: <Globe className="h-4 w-4" />,
    hashnode: <Globe className="h-4 w-4" />,
    leetcode: <Globe className="h-4 w-4" />,
    portfolio: <Globe className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />,
};

export function PlatformSelector({
    value,
    onChange,
    disabledPlatforms = [],
    className,
}: PlatformSelectorProps) {
    const [open, setOpen] = React.useState(false);

    const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    {selectedPlatform ? (
                        <span className="flex items-center gap-2">
                            {platformIcons[selectedPlatform.value]}
                            {selectedPlatform.label}
                        </span>
                    ) : (
                        <span className="text-muted-foreground">Select platform...</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-[200px] p-2" align="start">
                <div className="grid gap-1">
                    {SOCIAL_PLATFORMS.map((platform) => {
                        const isDisabled = disabledPlatforms.includes(platform.value);
                        return (
                            <Button
                                key={platform.value}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-9 px-2",
                                    value === platform.value && "bg-accent",
                                    isDisabled && "opacity-50 cursor-not-allowed",
                                )}
                                onClick={() => {
                                    if (!isDisabled) {
                                        onChange(platform.value);
                                        setOpen(false);
                                    }
                                }}
                                disabled={isDisabled}
                            >
                                <span className="flex items-center gap-2 flex-1">
                                    {platformIcons[platform.value]}
                                    {platform.label}
                                </span>
                                <Check
                                    className={cn(
                                        "h-4 w-4",
                                        value === platform.value ? "opacity-100" : "opacity-0",
                                    )}
                                />
                            </Button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}
