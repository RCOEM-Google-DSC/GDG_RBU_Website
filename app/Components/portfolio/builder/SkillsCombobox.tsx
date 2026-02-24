"use client";

import * as React from "react";
import { X, Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LANGUAGE_OPTIONS, FRAMEWORK_OPTIONS, TOOL_OPTIONS } from "@/lib/types";

interface SkillsComboboxProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    className?: string;
    category?: "languages" | "frameworks" | "tools";
}

export function SkillsCombobox({
    value,
    onChange,
    placeholder = "Search and select skills...",
    className,
    category,
}: SkillsComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // Get the appropriate skill options based on category
    const skillOptions = React.useMemo((): string[] => {
        if (category === "languages") return [...LANGUAGE_OPTIONS] as string[];
        if (category === "frameworks") return [...FRAMEWORK_OPTIONS] as string[];
        if (category === "tools") return [...TOOL_OPTIONS] as string[];
        return [];
    }, [category]);

    const filteredSkills = React.useMemo(() => {
        if (!search) return skillOptions;
        return skillOptions.filter((skill) =>
            skill.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search, skillOptions]);

    const handleSelect = (skill: string) => {
        if (value.includes(skill)) {
            onChange(value.filter((s) => s !== skill));
        } else {
            onChange([...value, skill]);
        }
    };

    const handleRemove = (skill: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((s) => s !== skill));
    };

    const handleAddCustom = () => {
        const trimmed = search.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setSearch("");
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-auto min-h-10 py-2"
                    >
                        <span className="text-muted-foreground">{placeholder}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full min-w-[320px] p-0" align="start">
                    <div className="p-2 border-b">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search skills or type custom..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddCustom();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                        {filteredSkills.length === 0 ? (
                            <div className="py-4 text-center text-sm text-muted-foreground">
                                No skills found.{" "}
                                {search && (
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="px-1 h-auto"
                                        onClick={handleAddCustom}
                                    >
                                        Add &quot;{search}&quot; as custom skill
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="grid gap-1">
                                {filteredSkills.map((skill) => (
                                    <Button
                                        key={skill}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start h-8 px-2",
                                            value.includes(skill) && "bg-accent",
                                        )}
                                        onClick={() => handleSelect(skill)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value.includes(skill) ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        {skill}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                    {search && !skillOptions.includes(search) && (
                        <div className="p-2 border-t">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full"
                                onClick={handleAddCustom}
                            >
                                Add &quot;{search}&quot; as custom skill
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* Selected Skills Display */}
            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="gap-1 pl-2 pr-1 py-1"
                        >
                            {skill}
                            <button
                                type="button"
                                className="ml-1 rounded-full hover:bg-muted p-0.5"
                                onClick={(e) => handleRemove(skill, e)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {skill}</span>
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            <p className="text-xs text-muted-foreground">
                {value.length} skill{value.length !== 1 ? "s" : ""} selected
            </p>
        </div>
    );
}
