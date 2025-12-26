"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/supabase/supabase"; // <- adjust path if needed
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [isSignupText, setIsSignupText] = useState(false);

  // input states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // loading / feedback
  const [loading, setLoading] = useState(false);
  // which action triggered loading: "login" | "signup" | "oauth" | null
  const [currentAction, setCurrentAction] = useState<"login" | "signup" | "oauth" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // refs for measuring
  const containerRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [slideX, setSlideX] = useState(0);

  // Delay text change for the toggle button so it happens while sliding
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignupText(isSignup);
    }, 900);
    return () => clearTimeout(timer);
  }, [isSignup]);

  // measure slide distance to end-of-form exactly
  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const c = containerRef.current;
      const b = btnRef.current;
      if (!c || !b) return;
      const containerWidth = c.clientWidth; // includes padding
      const btnWidth = b.clientWidth; // includes padding
      // marginFix prevents the button's border/shadow from being clipped at the edge.
      const marginFix = 12;
      const max = Math.max(0, containerWidth - btnWidth - marginFix);
      setSlideX(max);
    };

    compute();

    // ResizeObserver for precise updates (works when elements reflow)
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(compute);
      if (containerRef.current) ro.observe(containerRef.current);
      if (btnRef.current) ro.observe(btnRef.current);
      ro.observe(document.documentElement);
    } catch (e) {
      // fallback to window resize
      window.addEventListener("resize", compute);
    }

    // also recompute if fonts load or images affect layout
    const fontCheck = setTimeout(compute, 250);
    return () => {
      if (ro) {
        try {
          ro.disconnect();
        } catch {}
      } else {
        window.removeEventListener("resize", compute);
      }
      clearTimeout(fontCheck);
    };
  }, []);

  // Auth state listener (optional)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {});
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  // ================= DISABLE SCROLL (no global.css edits) =================
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.body.style.overflow = prevBodyOverflow || "";
    };
  }, []);

  // Styling helpers (kept exactly as you used)
  const buttonShadowClass = "shadow-[3px_3px_0_0_#ffffff,3px_3px_0_3px_#000000]";
  const buttonHoverClass =
    "hover:shadow-[1px_1px_0_0_#ffffff,1px_1px_0_3px_#000000] hover:translate-x-[2px] hover:translate-y-[2px]";
  const buttonActiveClass =
    "active:shadow-none active:translate-x-[3px] active:translate-y-[3px]";

  // helper to show spinner element
  function Spinner() {
    return <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" aria-hidden />;
  }

  // ------------------- AUTH HANDLERS -------------------
  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault?.();
    setLoading(true);
    setCurrentAction("login");
    setError(null);
    setMessage(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (authError) throw authError;
      setMessage("Logged in successfully");
      toast.success("Logged in successfully");
      // small delay so user sees toast briefly before redirect
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
      setMessage("Sign-up initiated. Check your email for confirmation (if enabled).");
      toast.success("Sign-up initiated — check your email");
      // If you want to redirect after signup, optionally do it here:
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

  async function handleOAuth(provider: "github" | "google" | string) {
    setLoading(true);
    setCurrentAction("oauth");
    setError(null);
    setMessage(null);
    try {
      // this will redirect to provider (Supabase handles the redirect)
      const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider });
      if (oauthError) throw oauthError;
      // note: for providers that redirect, this code path may not continue locally
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
  // -----------------------------------------------------

  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6] overflow-hidden flex flex-col items-stretch font-sans selection:bg-yellow-300">
      {/* Sonner toaster — remove if you already have a global Toaster */}
      <Toaster position="top-right" />

      {/* MAIN */}
      <main className="relative flex-1 flex items-center justify-center">
        {/* --- GRID BACKGROUND (ANIMATED) --- */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            backgroundPosition: isSignup ? "0px 120px" : "0px 0px",
            transition: "background-position 6000ms cubic-bezier(0.19,1,0.22,1)",
            willChange: "background-position",
          }}
        />

        {/* Decorative blocks etc (kept as-is) */}
        <div className="absolute top-0 bottom-0 w-full pointer-events-none">
          <div
            className={`hidden md:block absolute top-[0%] -left-[320px] z-10
              w-[800px] h-[250px]
              bg-red-500 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-100
              ${isSignup ? "translate-x-[calc(100vw-150px)]" : "translate-x-0"}`}
            aria-hidden
          />
          <div
            className={`hidden md:block absolute top-[25%] -left-[200px] z-20
              w-[500px] h-[180px]
              bg-blue-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-200
              ${isSignup ? "translate-x-[calc(100vw-100px)]" : "translate-x-0"}`}
            aria-hidden
          />
          <div
            className={`hidden md:block absolute top-[43%] -left-[450px] z-30
              w-[1000px] h-[260px]
              bg-yellow-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-75
              ${isSignup ? "translate-x-[calc(100vw-100px)]" : "translate-x-0"}`}
            aria-hidden
          />
          <div
            className={`hidden md:block absolute top-[66%] -left-[250px] z-40
              w-[650px] h-[245px]
              bg-green-400 border-[3px] border-black
              shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]
              rounded-xl transition-transform duration-[2000ms] ease-in-out delay-150
              ${isSignup ? "translate-x-[calc(100vw-120px)]" : "translate-x-0"}`}
            aria-hidden
          />
        </div>

        {/* --- SLANTED CORNER STICKS --- */}
        <div
          className={`hidden md:flex absolute z-[50] flex-col items-end gap-3 pointer-events-none transition-transform duration-[2000ms] ease-in-out top-[-20%] right-[-5%] ${
            isSignup ? "translate-x-[calc(-100vw+500px)] translate-y-[calc(100vh-120px)] -rotate-35 " : "translate-x-[10%] translate-y-[calc(100vh-700px)] -rotate-35 "
          }`}
        >
          <div className="w-[500px] h-[30px] bg-green-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full mr-8" />
          <div className="w-[600px] h-[30px] bg-blue-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full mr-2" />
          <div className="w-[400px] h-[30px] bg-yellow-400 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full mr-6" />
          <div className="w-[700px] h-[30px] bg-red-500 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] rounded-full" />
        </div>

        {/* --- MAIN CONTAINER (Wrapper for Card + Outside Button) --- */}
        {/* NOTE: added 'overflow-visible' so the sliding toggle's shadow/border won't be clipped */}
        <div ref={containerRef} className={`relative z-10 w-full max-w-[420px] overflow-visible flex flex-col gap-6 transition-all duration-[2000ms] ease-in-out`}>
          {/* --- FORM CARD --- */}
          <div className="w-full bg-white border-[3px] border-black rounded-xl shadow-[8px_8px_0_0_#000] p-6 sm:p-8">
            <div className="relative min-h-[420px] sm:min-h-[460px] overflow-hidden">
              {/* LOGIN FORM */}
              <div className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out flex flex-col ${isSignup ? "opacity-0 invisible -translate-x-[100px]" : "opacity-100 visible translate-x-0 delay-300"}`}>
                <h1 className="text-2xl sm:text-3xl font-black mb-3">&lt; &gt; LOGIN</h1>
                <p className="text-sm text-gray-500 font-bold mb-6">welcome back!</p>

                <div className="h-[2px] bg-black mb-6 w-full" />

                <form className="flex flex-col" onSubmit={handleLogin}>
                  <div className="mb-7 sm:mb-6 ">
                    <Input icon={<Mail size={18} />} placeholder="E-mail" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  </div>

                  <div className="mb-20 mt-6">
                    <Input icon={<Lock size={18} />} placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </div>

                  {error && !isSignup && <p className="text-sm text-red-600 mb-2">{error}</p>}
                  {message && !isSignup && <p className="text-sm text-green-600 mb-2">{message}</p>}

                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading && currentAction === "login"}
                      className={`h-[44px] flex items-center justify-center gap-2 bg-black text-white border-[3px] border-black px-6 py-3 rounded-lg font-bold transition-all text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
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

                    <span className="text-sm font-bold text-gray-400">or</span>
                    <div className="flex gap-2">
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
              <div className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out flex flex-col ${!isSignup ? "opacity-0 invisible translate-x-[100px]" : "opacity-100 visible translate-x-0 delay-300"}`}>
                <div className="flex justify-between items-center mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black">&lt; &gt; SIGN UP</h1>
                  <button onClick={() => setIsSignup(false)} className="p-1 hover:bg-gray-100 rounded-full border border-transparent hover:border-black transition-all" aria-label="Go back to login">
                    <ArrowLeft size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 font-bold mb-6">get started with GDG RBU</p>

                <div className="h-[2px] bg-black mb-6 w-full" />

                <form className="flex flex-col" onSubmit={handleSignup}>
                  <div className="mb-4">
                    <Input icon={<User size={18} />} placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <Input icon={<Mail size={18} />} placeholder="E-mail" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                  </div>
                  <div className="mb-6">
                    <Input icon={<Lock size={18} />} placeholder="Password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                  </div>

                  {error && isSignup && <p className="text-sm text-red-600 mb-2">{error}</p>}
                  {message && isSignup && <p className="text-sm text-green-600 mb-2">{message}</p>}

                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading && currentAction === "signup"}
                      className={`h-[44px] flex items-center justify-center gap-2 bg-black text-white border-[3px] border-black px-6 py-3 rounded-lg font-bold transition-all text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
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
                    <span className="text-sm font-bold text-gray-400">or</span>
                    <div className="flex gap-2">
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

          {/* --- TOGGLE BUTTON (Outside Form) --- */}
          {/* Make the overflow visible so the button's border/shadow isn't clipped. */}
          <div className="relative w-full h-[44px] overflow-visible">
            <div
              className="absolute top-0 left-0 h-full flex items-center transition-transform duration-[5700ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                transform: `translateX(${isSignup ? slideX : 0}px)`,
                willChange: "transform",
                // small right padding to ensure the button never touches the container edge visually
                paddingRight: 12,
              }}
            >
              <button
                ref={btnRef}
                onClick={() => {
                  setError(null);
                  setMessage(null);
                  setIsSignup((s) => !s);
                }}
                className={`h-[44px] flex items-center justify-center gap-2 bg-black border-[3px] border-black text-white px-6 rounded-lg font-bold transition-all text-sm ${buttonShadowClass} ${buttonHoverClass} ${buttonActiveClass}`}
                style={{ minWidth: 160 }}
              >
                {isSignupText ? "Log in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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

function SocialButton({ icon, onClick, disabled, showSpinner }: { icon: React.ReactNode; onClick?: () => void; disabled?: boolean; showSpinner?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-[44px] h-[44px] flex items-center justify-center bg-black border-[3px] border-black rounded-full shadow-[3px_3px_0_0_#888] hover:shadow-[1px_1px_0_0_#888] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all font-black text-xs px-2 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {showSpinner ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : icon}
    </button>
  );
}
