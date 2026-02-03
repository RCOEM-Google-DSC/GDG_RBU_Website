"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Globe,
    Mail,
    ExternalLink,
    Calendar,
    Building2,
} from "lucide-react";
import type {
    Portfolio,
    PortfolioProject,
    PortfolioExperience,
    PortfolioSocialLink,
} from "@/lib/types";

interface PortfolioRendererProps {
    portfolio: Portfolio;
    projects: PortfolioProject[];
    experience: PortfolioExperience[];
    socialLinks: PortfolioSocialLink[];
    user: {
        name?: string;
        email?: string;
        avatar_url?: string;
    };
}

const socialIcons: Record<string, React.ReactNode> = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
    portfolio: <Globe className="h-5 w-5" />,
};

function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function PortfolioRenderer({
    portfolio,
    projects,
    experience,
    socialLinks,
    user,
}: PortfolioRendererProps) {
    const sortedProjects = [...projects].sort(
        (a, b) => a.display_order - b.display_order,
    );
    const sortedExperience = [...experience].sort(
        (a, b) => a.display_order - b.display_order,
    );
    const sortedSocialLinks = [...socialLinks].sort(
        (a, b) => a.display_order - b.display_order,
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 px-4">
                <div className="container max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                            <AvatarImage
                                src={portfolio.profile_image_url || user.avatar_url}
                                alt={portfolio.display_name}
                            />
                            <AvatarFallback className="text-4xl font-bold">
                                {portfolio.display_name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">
                                {portfolio.display_name}
                            </h1>

                            {/* Social Links */}
                            {sortedSocialLinks.length > 0 && (
                                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                                    {sortedSocialLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
                                            title={link.platform}
                                        >
                                            {socialIcons[link.platform] || (
                                                <Globe className="h-5 w-5" />
                                            )}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
                {/* About Section */}
                {portfolio.about_me && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="h-1 w-8 bg-primary rounded-full" />
                            About
                        </h2>
                        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {portfolio.about_me}
                        </p>
                    </section>
                )}

                {/* Skills Section */}
                {portfolio.skills && portfolio.skills.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="h-1 w-8 bg-primary rounded-full" />
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {portfolio.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 text-sm"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {sortedProjects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="h-1 w-8 bg-primary rounded-full" />
                            Projects
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {sortedProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {project.image_url && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                            <div className="flex gap-2">
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted-foreground hover:text-primary transition-colors"
                                                        title="View on GitHub"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted-foreground hover:text-primary transition-colors"
                                                        title="View Live"
                                                    >
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {project.description && (
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.technologies &&
                                            project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.map((tech, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {sortedExperience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="h-1 w-8 bg-primary rounded-full" />
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {sortedExperience.map((exp) => (
                                <div
                                    key={exp.id}
                                    className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors"
                                >
                                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Building2 className="h-4 w-4" />
                                                {exp.company}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 md:mt-0">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(exp.start_date)} -{" "}
                                            {exp.is_current
                                                ? "Present"
                                                : formatDate(exp.end_date || "")}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="text-muted-foreground mt-2">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t py-8 mt-12">
                <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} {portfolio.display_name}. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
