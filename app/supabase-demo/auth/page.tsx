"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Lock,
    Mail,
    User,
    Eye,
    EyeOff,
    LogIn,
    UserPlus,
    LogOut,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Shield,
    Key,
    Clock,
    RefreshCw,
} from "lucide-react";
import { supabase, getSession, getCurrentUserId } from "@/supabase/supabase";

export default function AuthDemoPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Auth State
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Form Data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
    });

    // Check auth on mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const currentSession = await getSession();
                if (currentSession) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                }
            } catch (err) {
                console.error("Auth check error:", err);
            } finally {
                setCheckingAuth(false);
            }
        }

        checkAuth();

        // Subscribe to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);

            // Ensure user exists in public.users table (fallback if trigger fails)
            if (newSession?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
                try {
                    const userId = newSession.user.id;
                    const userEmail = newSession.user.email || '';
                    const userName = newSession.user.user_metadata?.full_name || 
                                   newSession.user.user_metadata?.name || 
                                   userEmail || 
                                   'User';
                    const provider = newSession.user.app_metadata?.provider || 'email';

                    // Check if user exists in public.users
                    const { data: existingUser, error: checkError } = await supabase
                        .from('users')
                        .select('id')
                        .eq('id', userId)
                        .single();

                    // If user doesn't exist, create them directly (RLS policy allows it)
                    if (!existingUser && checkError?.code === 'PGRST116') {
                        // Direct insert works now that RLS policy is fixed
                        const { error: insertError } = await supabase
                            .from('users')
                            .insert({
                                id: userId,
                                name: userName,
                                email: userEmail,
                                role: 'user',
                                image_url: 'user.png',
                                provider: provider,
                                badges: [],
                                profile_links: null,
                                section: '',
                                branch: '',
                                phone_number: '',
                            });

                        if (insertError) {
                            console.error('Failed to create user in public.users:', {
                                insertError: insertError,
                                message: insertError.message,
                                code: insertError.code,
                                details: insertError.details,
                                hint: insertError.hint,
                                userId: userId,
                                userEmail: userEmail,
                            });
                        } else {
                            console.log('User created successfully');
                        }
                    }
                } catch (err) {
                    console.error('Error ensuring user exists:', err);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Login handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            setMessage({ type: "success", text: "Successfully logged in!" });
            setUser(data.user);
            setSession(data.session);
        } catch (err: any) {
            setMessage({ type: "error", text: err.message || "Login failed" });
        } finally {
            setIsLoading(false);
        }
    };

    // Signup handler
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                },
            });

            if (error) throw error;

            setMessage({
                type: "success",
                text: "Account created! Check your email to verify.",
            });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message || "Signup failed" });
        } finally {
            setIsLoading(false);
        }
    };

    // Logout handler
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await supabase.auth.signOut();
            setUser(null);
            setSession(null);
            setMessage({ type: "success", text: "Successfully logged out!" });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message || "Logout failed" });
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh session
    const refreshSession = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.refreshSession();
            if (error) throw error;
            setSession(data.session);
            setMessage({ type: "success", text: "Session refreshed!" });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message || "Failed to refresh" });
        } finally {
            setIsLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="text-green-500 animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => router.push("/supabase-demo")}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <ArrowLeft size={16} />
                            Back to Demos
                        </button>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                            <Lock size={12} />
                            Authentication Demo
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Auth Form */}
                    <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500"></div>

                        {!user ? (
                            <>
                                {/* Tabs */}
                                <div className="flex mb-6 bg-[#151515] rounded-lg p-1">
                                    <button
                                        onClick={() => setActiveTab("login")}
                                        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "login"
                                            ? "bg-green-500/20 text-green-400"
                                            : "text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        <LogIn size={16} />
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("signup")}
                                        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "signup"
                                            ? "bg-green-500/20 text-green-400"
                                            : "text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        <UserPlus size={16} />
                                        Sign Up
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={activeTab === "login" ? handleLogin : handleSignup}>
                                    {activeTab === "signup" && (
                                        <div className="mb-4">
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                    size={18}
                                                />
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    className="w-full bg-[#151515] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600 text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="you@example.com"
                                                className="w-full bg-[#151515] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className="w-full bg-[#151515] border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600 text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {message && (
                                        <div
                                            className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm ${message.type === "success"
                                                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                                                : "bg-red-500/10 border border-red-500/30 text-red-400"
                                                }`}
                                        >
                                            {message.type === "success" ? (
                                                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                            ) : (
                                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                            )}
                                            {message.text}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : activeTab === "login" ? (
                                            <>
                                                <LogIn size={18} /> Login
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={18} /> Create Account
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Logged In State */
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                        <User className="text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">
                                            {user.user_metadata?.full_name || "User"}
                                        </p>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                    <div className="ml-auto px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
                                        Authenticated
                                    </div>
                                </div>

                                {message && (
                                    <div
                                        className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm ${message.type === "success"
                                            ? "bg-green-500/10 border border-green-500/30 text-green-400"
                                            : "bg-red-500/10 border border-red-500/30 text-red-400"
                                            }`}
                                    >
                                        {message.type === "success" ? (
                                            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                        )}
                                        {message.text}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={refreshSession}
                                        disabled={isLoading}
                                        className="flex-1 bg-[#151515] border border-white/10 text-white font-medium py-3 rounded-lg hover:border-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw size={16} /> Refresh Session
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoading}
                                        className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 font-medium py-3 rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Session Info Panel */}
                    <div className="space-y-6">
                        {/* Session Status */}
                        <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Shield className="text-blue-400" size={18} />
                                Session Status
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-white/5">
                                    <span className="text-gray-500 text-sm">Status</span>
                                    <span className={`text-sm font-medium ${session ? "text-green-400" : "text-gray-500"}`}>
                                        {session ? "Active" : "No Session"}
                                    </span>
                                </div>

                                {session && (
                                    <>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-500 text-sm">User ID</span>
                                            <span className="text-xs font-mono text-gray-400 truncate max-w-[150px]">
                                                {user?.id}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-500 text-sm">Provider</span>
                                            <span className="text-sm text-gray-400">
                                                {session.user?.app_metadata?.provider || "email"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-gray-500 text-sm">Token Type</span>
                                            <span className="text-sm text-gray-400">
                                                {session.token_type || "bearer"}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Token Info */}
                        {session && (
                            <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Key className="text-yellow-400" size={18} />
                                    Access Token
                                </h3>
                                <div className="bg-[#151515] rounded-lg p-3 overflow-hidden">
                                    <code className="text-xs text-gray-400 break-all font-mono">
                                        {session.access_token?.substring(0, 50)}...
                                    </code>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <Clock size={12} />
                                    Expires: {new Date(session.expires_at * 1000).toLocaleString()}
                                </p>
                            </div>
                        )}

                        {/* How it Works */}
                        <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                            <h3 className="text-white font-semibold mb-4">How It Works</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <p>
                                    1. <span className="text-green-400">signInWithPassword()</span> - Authenticates user with email/password
                                </p>
                                <p>
                                    2. <span className="text-green-400">signUp()</span> - Creates new user account with optional metadata
                                </p>
                                <p>
                                    3. <span className="text-green-400">getSession()</span> - Retrieves current JWT session
                                </p>
                                <p>
                                    4. <span className="text-green-400">onAuthStateChange()</span> - Listens to auth events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
