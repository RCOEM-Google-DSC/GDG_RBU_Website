"use client";
import React, { useState } from "react";
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Github,
    Chrome,
    ArrowLeft,
} from "lucide-react";
import { supabase } from "@/supabase/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// --- SUBCOMPONENTS ---
function Input({ icon, ...props }: any) {
    return (
        <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black transition-colors group-focus-within:text-blue-600">
                {icon}
            </span>
            <input
                className="w-full bg-white border-[3px] border-black rounded-lg py-3 pl-10 pr-4 font-bold placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 transition-all"
                {...props}
            />
        </div>
    );
}

function SocialButton({
    icon,
    onClick,
    disabled,
    showSpinner,
}: {
    icon: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    showSpinner?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`w-11 h-11 flex items-center justify-center bg-black border-[3px] border-black rounded-full shadow-[3px_3px_0_0_#888] hover:shadow-[1px_1px_0_0_#888] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all font-black text-xs px-2 ${disabled ? "opacity-60 cursor-not-allowed" : ""
                }`}
        >
            {showSpinner ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
                icon
            )}
        </button>
    );
}

function Spinner() {
    return (
        <span
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"
            aria-hidden
        />
    );
}

interface AuthFormProps {
    isSignup: boolean;
    onToggleMode: () => void;
}

export default function AuthForm({ isSignup, onToggleMode }: AuthFormProps) {
    const router = useRouter();

    // input states
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    // loading / feedback
    const [loading, setLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState<
        "login" | "signup" | "oauth" | null
    >(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Styling helpers
    const buttonShadowClass =
        "shadow-[3px_3px_0_0_#ffffff,3px_3px_0_3px_#000000]";
    const buttonHoverClass =
        "hover:shadow-[1px_1px_0_0_#ffffff,1px_1px_0_3px_#000000] hover:translate-x-[2px] hover:translate-y-[2px]";
    const buttonActiveClass =
        "active:shadow-none active:translate-x-[3px] active:translate-y-[3px]";

    // ------------------- AUTH HANDLERS -------------------
    async function handleLogin(e?: React.FormEvent) {
        e?.preventDefault?.();
        setLoading(true);
        setCurrentAction("login");
        setError(null);
        setMessage(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword(
                {
                    email: loginEmail,
                    password: loginPassword,
                }
            );
            if (authError) throw authError;
            setMessage("Logged in successfully");
            toast.success("Logged in successfully");
            setTimeout(() => {
                router.push("/");
            }, 650);
        } catch (err: any) {
            const msg = err?.message || "Login failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
            setCurrentAction(null);
        }
    }

    async function handleSignup(e?: React.FormEvent) {
        e?.preventDefault?.();
        setLoading(true);
        setCurrentAction("signup");
        setError(null);
        setMessage(null);

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: signupEmail,
                password: signupPassword,
            });
            if (authError) throw authError;
            setMessage(
                "Sign-up initiated. Check your email for confirmation (if enabled)."
            );
            toast.success("Sign-up initiated — check your email");
            setTimeout(() => {
                router.push("/");
            }, 850);
        } catch (err: any) {
            const msg = err?.message || "Sign up failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
            setCurrentAction(null);
        }
    }

    async function handleOAuth(provider: "github" | "google") {
        setLoading(true);
        setCurrentAction("oauth");
        setError(null);
        setMessage(null);
        try {
            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider: provider as any,
            });
            if (oauthError) throw oauthError;
            toast.success("Redirecting to provider...");
        } catch (err: any) {
            const msg = err?.message || "OAuth sign in failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
            setCurrentAction(null);
        }
    }

    return (
        <div className="w-full bg-white border-[3px] border-black rounded-xl shadow-[8px_8px_0_0_#000] p-4 sm:p-6 md:p-8">
            <div className="relative min-h-[380px] sm:min-h-[420px] md:min-h-[460px] overflow-hidden">
                {/* LOGIN FORM */}
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col ${isSignup
                        ? "opacity-0 invisible -translate-x-[100px]"
                        : "opacity-100 visible translate-x-0 delay-300"
                        }`}
                >
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3">
                        &lt; &gt; LOGIN
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-bold mb-4 sm:mb-6">welcome back!</p>

                    <div className="h-0.5 bg-black mb-4 sm:mb-6 w-full" />

                    <form className="flex flex-col" onSubmit={handleLogin}>
                        <div className="mb-5 sm:mb-7 md:mb-6 ">
                            <Input
                                icon={<Mail size={18} />}
                                placeholder="E-mail"
                                type="email"
                                value={loginEmail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-12 sm:mb-16 md:mb-20 mt-4 sm:mt-6">
                            <Input
                                icon={<Lock size={18} />}
                                placeholder="Password"
                                type="password"
                                value={loginPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        {error && !isSignup && (
                            <p className="text-xs sm:text-sm text-red-600 mb-2">{error}</p>
                        )}
                        {message && !isSignup && (
                            <p className="text-xs sm:text-sm text-green-600 mb-2">{message}</p>
                        )}

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto">
                            <button
                                type="submit"
                                disabled={loading}
                                aria-busy={loading && currentAction === "login"}
                                className={`h-11 flex items-center justify-center gap-2 bg-black text-white border-[3px] border-black px-4 sm:px-6 py-3 rounded-lg font-bold transition-all text-xs sm:text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
                            >
                                {loading && currentAction === "login" ? (
                                    <>
                                        <Spinner /> <span className="sr-only">loading</span>
                                    </>
                                ) : (
                                    <>
                                        {loading ? "..." : "login"} <ArrowRight size={16} />
                                    </>
                                )}
                            </button>

                            <span className="text-xs sm:text-sm font-bold text-gray-400 text-center sm:text-left">or</span>
                            <div className="flex gap-2 justify-center sm:justify-start">
                                <SocialButton
                                    icon={<Github className="text-white" size={20} />}
                                    onClick={() => handleOAuth("github")}
                                    disabled={loading}
                                    showSpinner={loading && currentAction === "oauth"}
                                />
                                <SocialButton
                                    icon={<Chrome className="text-[#4285F4]" size={20} />}
                                    onClick={() => handleOAuth("google")}
                                    disabled={loading}
                                    showSpinner={loading && currentAction === "oauth"}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* SIGNUP FORM */}
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col ${!isSignup
                        ? "opacity-0 invisible translate-x-[100px]"
                        : "opacity-100 visible translate-x-0 delay-300"
                        }`}
                >
                    <div className="flex justify-between items-center mb-1">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black">
                            &lt; &gt; SIGN UP
                        </h1>
                        <button
                            onClick={onToggleMode}
                            className="p-1 hover:bg-gray-100 rounded-full border border-transparent hover:border-black transition-all"
                            aria-label="Go back to login"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-bold mb-4 sm:mb-6">
                        get started with GDG RBU
                    </p>

                    <div className="h-0.5 bg-black mb-4 sm:mb-6 w-full" />

                    <form className="flex flex-col" onSubmit={handleSignup}>
                        <div className="mb-3 sm:mb-4">
                            <Input
                                icon={<User size={18} />}
                                placeholder="Username"
                                value={signupUsername}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 sm:mb-4">
                            <Input
                                icon={<Mail size={18} />}
                                placeholder="E-mail"
                                type="email"
                                value={signupEmail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <Input
                                icon={<Lock size={18} />}
                                placeholder="Password"
                                type="password"
                                value={signupPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupPassword(e.target.value)}
                            />
                        </div>

                        {error && isSignup && (
                            <p className="text-xs sm:text-sm text-red-600 mb-2">{error}</p>
                        )}
                        {message && isSignup && (
                            <p className="text-xs sm:text-sm text-green-600 mb-2">{message}</p>
                        )}

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto">
                            <button
                                type="submit"
                                disabled={loading}
                                aria-busy={loading && currentAction === "signup"}
                                className={`h-11 flex items-center justify-center gap-2 bg-black text-white border-[3px] border-black px-4 sm:px-6 py-3 rounded-lg font-bold transition-all text-xs sm:text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
                            >
                                {loading && currentAction === "signup" ? (
                                    <>
                                        <Spinner /> <span className="sr-only">loading</span>
                                    </>
                                ) : (
                                    <>
                                        {loading ? "..." : "sign up"} <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                            <span className="text-xs sm:text-sm font-bold text-gray-400 text-center sm:text-left">or</span>
                            <div className="flex gap-2 justify-center sm:justify-start">
                                <SocialButton
                                    icon={<Github className="text-white" size={20} />}
                                    onClick={() => handleOAuth("github")}
                                    disabled={loading}
                                    showSpinner={loading && currentAction === "oauth"}
                                />
                                <SocialButton
                                    icon={<Chrome className="text-[#4285F4]" size={20} />}
                                    onClick={() => handleOAuth("google")}
                                    disabled={loading}
                                    showSpinner={loading && currentAction === "oauth"}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
