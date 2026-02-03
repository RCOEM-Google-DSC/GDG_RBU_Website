"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// This page renders the actual Vite React templates with user's portfolio data
// It dynamically loads the template and injects the user's data

interface PortfolioData {
    portfolio: {
        template_id: string;
        display_name: string;
        profile_image_url?: string;
        about_me?: string;
        skills: string[];
    };
    projects: Array<{
        title: string;
        description?: string;
        image_url?: string;
        github_url?: string;
        live_url?: string;
        technologies: string[];
    }>;
    experience: Array<{
        company: string;
        role: string;
        description?: string;
        start_date: string;
        end_date?: string;
        is_current: boolean;
    }>;
    social_links: Array<{
        platform: string;
        url: string;
    }>;
}

export default function PortfolioPreviewPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const templateId = params.templateId as string;

    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Get data from URL params
            const dataParam = searchParams.get("data");
            if (dataParam) {
                const data = JSON.parse(decodeURIComponent(dataParam));
                setPortfolioData(data);
            } else {
                setError("No portfolio data provided");
            }
        } catch (e) {
            console.error("Failed to parse portfolio data:", e);
            setError("Failed to parse portfolio data");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600 font-semibold">Loading template...</p>
                </div>
            </div>
        );
    }

    if (error || !portfolioData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg border-4 border-red-500">
                    <p className="text-red-600 font-bold text-lg mb-2">
                        ⚠️ Preview Error
                    </p>
                    <p className="text-gray-600">
                        {error || "No portfolio data available"}
                    </p>
                </div>
            </div>
        );
    }

    // For now, show a message that templates need to be served separately
    // In production, you would serve the Vite templates on different ports or build them
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Info Banner */}
                <div className="bg-yellow-100 border-4 border-yellow-500 p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-2xl font-black mb-2">🎨 Template Preview Mode</h2>
                    <p className="font-bold text-gray-700">
                        Template: <span className="text-blue-600">{templateId}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        To see the actual Vite template, run it in development mode:
                    </p>
                    <code className="block mt-2 bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                        cd portfolios/[template-folder] && npm install && npm run dev
                    </code>
                </div>

                {/* Portfolio Data Display */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2">
                            👤 Profile
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <span className="font-bold text-gray-600">Name:</span>
                                <p className="text-lg font-black">
                                    {portfolioData.portfolio.display_name}
                                </p>
                            </div>
                            {portfolioData.portfolio.about_me && (
                                <div>
                                    <span className="font-bold text-gray-600">About:</span>
                                    <p className="text-gray-700">
                                        {portfolioData.portfolio.about_me}
                                    </p>
                                </div>
                            )}
                            {portfolioData.portfolio.skills.length > 0 && (
                                <div>
                                    <span className="font-bold text-gray-600">Skills:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {portfolioData.portfolio.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-purple-300 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Links Card */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2">
                            🔗 Social Links
                        </h3>
                        {portfolioData.social_links.length > 0 ? (
                            <ul className="space-y-2">
                                {portfolioData.social_links.map((link, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 p-2 bg-blue-50 border-2 border-black"
                                    >
                                        <span className="font-bold text-gray-600 capitalize min-w-[80px]">
                                            {link.platform}:
                                        </span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline font-semibold truncate"
                                        >
                                            {link.url}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No social links added</p>
                        )}
                    </div>

                    {/* Projects Card */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:col-span-2">
                        <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2">
                            💼 Projects ({portfolioData.projects.length})
                        </h3>
                        {portfolioData.projects.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {portfolioData.projects.map((project, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-green-50 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <h4 className="font-black text-lg">{project.title}</h4>
                                        {project.description && (
                                            <p className="text-gray-700 text-sm mt-2">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {project.technologies.map((tech, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-2 py-0.5 bg-yellow-200 border border-black text-xs font-bold"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex gap-2 mt-3">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold text-blue-600 hover:underline"
                                                >
                                                    GitHub →
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold text-green-600 hover:underline"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No projects added</p>
                        )}
                    </div>

                    {/* Experience Card */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:col-span-2">
                        <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2">
                            🏢 Experience ({portfolioData.experience.length})
                        </h3>
                        {portfolioData.experience.length > 0 ? (
                            <div className="space-y-4">
                                {portfolioData.experience.map((exp, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-orange-50 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-black text-lg">{exp.role}</h4>
                                                <p className="text-gray-600 font-bold">{exp.company}</p>
                                            </div>
                                            <span className="text-sm font-bold text-gray-500 bg-white px-2 py-1 border-2 border-black">
                                                {exp.start_date} -{" "}
                                                {exp.is_current ? "Present" : exp.end_date}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-700 text-sm mt-2">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No experience added</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
