"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
    Database,
    User,
    Calendar,
    Shield,
    ArrowRight,
    Lock,
    Users,
    Zap,
} from "lucide-react";

const DemoCard = ({
    title,
    description,
    icon: Icon,
    color,
    href,
    features,
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    href: string;
    features: string[];
}) => {
    const router = useRouter();

    const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/30",
            text: "text-blue-400",
            glow: "hover:shadow-blue-500/20",
        },
        green: {
            bg: "bg-green-500/10",
            border: "border-green-500/30",
            text: "text-green-400",
            glow: "hover:shadow-green-500/20",
        },
        purple: {
            bg: "bg-purple-500/10",
            border: "border-purple-500/30",
            text: "text-purple-400",
            glow: "hover:shadow-purple-500/20",
        },
        orange: {
            bg: "bg-orange-500/10",
            border: "border-orange-500/30",
            text: "text-orange-400",
            glow: "hover:shadow-orange-500/20",
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div
            onClick={() => router.push(href)}
            className={`group relative bg-[#0F0F0F] rounded-2xl border ${colors.border} p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colors.glow} overflow-hidden`}
        >
            {/* Gradient overlay */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent ${colors.text} opacity-50`}></div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 border ${colors.border}`}>
                <Icon className={colors.text} size={28} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                {title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

            {/* Features */}
            <div className="space-y-2 mb-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`}></div>
                        {feature}
                    </div>
                ))}
            </div>

            {/* Arrow */}
            <div className={`flex items-center gap-2 ${colors.text} text-sm font-medium group-hover:translate-x-1 transition-transform`}>
                Explore Demo <ArrowRight size={16} />
            </div>
        </div>
    );
};

export default function SupabaseDemoPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <span className="text-blue-500 font-bold text-xl">{`<`}</span>
                                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                                <span className="text-green-500 font-bold text-xl">{`>`}</span>
                            </div>
                            <span className="text-white font-medium text-lg tracking-tight ml-2">
                                GDG RBU
                            </span>
                        </div>
                        <button
                            onClick={() => router.push("/")}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                        <Database size={16} />
                        Supabase Integration
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Database & Auth Demos
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore live demos of Supabase integration including authentication,
                        database operations, and real-time features.
                    </p>
                </div>

                {/* Connection Status */}
                <div className="mb-12 bg-[#0F0F0F] rounded-2xl border border-white/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-gray-400">
                            Connected to Supabase
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Zap size={14} className="text-yellow-400" />
                        Real-time enabled
                    </div>
                </div>

                {/* Demo Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <DemoCard
                        title="Authentication"
                        description="Complete auth flow with email/password signup, login, session management and protected routes."
                        icon={Lock}
                        color="green"
                        href="/supabase-demo/auth"
                        features={[
                            "Email & Password Auth",
                            "Session Management",
                            "User Metadata",
                            "Secure Token Handling",
                        ]}
                    />

                    <DemoCard
                        title="Events Database"
                        description="Full CRUD operations on the events table with real-time updates and RLS policies."
                        icon={Calendar}
                        color="blue"
                        href="/supabase-demo/events"
                        features={[
                            "Create, Read, Update Events",
                            "Row Level Security",
                            "Filtering & Sorting",
                            "Organizer Permissions",
                        ]}
                    />

                    <DemoCard
                        title="User Profile"
                        description="View and manage user profile data, registrations, and personalized settings."
                        icon={User}
                        color="purple"
                        href="/supabase-demo/profile"
                        features={[
                            "Session Info Display",
                            "User Registrations",
                            "Profile Updates",
                            "Auth State Changes",
                        ]}
                    />

                    <DemoCard
                        title="Registrations"
                        description="Event registration system with team support, RLS enforcement, and user tracking."
                        icon={Users}
                        color="orange"
                        href="/supabase-demo/registrations"
                        features={[
                            "Team Registration",
                            "RLS Policy Demo",
                            "User ID Auto-set",
                            "Registration History",
                        ]}
                    />
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#0F0F0F] rounded-xl border border-white/10 p-5">
                        <Shield className="text-blue-400 mb-3" size={24} />
                        <h4 className="text-white font-semibold mb-2">Row Level Security</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            All tables are protected with RLS policies ensuring users can only
                            access data they're authorized to see.
                        </p>
                    </div>

                    <div className="bg-[#0F0F0F] rounded-xl border border-white/10 p-5">
                        <Zap className="text-yellow-400 mb-3" size={24} />
                        <h4 className="text-white font-semibold mb-2">Real-time Updates</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Changes in the database are reflected instantly without page
                            refresh using Supabase's real-time subscriptions.
                        </p>
                    </div>

                    <div className="bg-[#0F0F0F] rounded-xl border border-white/10 p-5">
                        <Database className="text-green-400 mb-3" size={24} />
                        <h4 className="text-white font-semibold mb-2">PostgreSQL</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Powered by PostgreSQL with full SQL capabilities, complex queries,
                            and reliable data storage.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
