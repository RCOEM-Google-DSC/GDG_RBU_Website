"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { Mail, Lock, User, ArrowRight, ClipboardList } from "lucide-react";
import { BiLogIn } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast, Toaster } from "sonner";

export default function RegisterPage() {
  const [mode, setMode] = useState("login");
  const [hasInteracted, setHasInteracted] = useState(false);
  const cardStageRef = useRef<HTMLDivElement | null>(null);
  const containerWidthRef = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const BUTTON_W = 140;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const readButtonComp = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--button-comp") || "0px";
    return parseFloat(raw) || 0;
  };

  const computeMaxTranslate = (width: number): number => {
    const parsed = readButtonComp();
    return Math.round((width || 380) - BUTTON_W + parsed);
  };

  useLayoutEffect(() => {
    const container = cardStageRef.current;
    if (container) {
      const w = container.clientWidth || container.getBoundingClientRect().width || Math.min(window.innerWidth * 0.92, 380);
      containerWidthRef.current = w;
      const max = computeMaxTranslate(w);
      setTranslateX(mode === "login" ? max : 0);
    } else {
      const fallback = Math.min(window.innerWidth * 0.92, 380);
      containerWidthRef.current = fallback;
      setTranslateX(mode === "login" ? computeMaxTranslate(fallback) : 0);
    }
  }, []);

  useEffect(() => {
    const w = containerWidthRef.current || (cardStageRef.current ? cardStageRef.current.clientWidth : 0);
    const max = computeMaxTranslate(w || Math.min(window.innerWidth * 0.92, 380));
    setTranslateX(mode === "login" ? max : 0);
  }, [mode]);

  useEffect(() => {
    const onResize = () => {
      const container = cardStageRef.current;
      const w = container ? container.clientWidth : Math.min(window.innerWidth * 0.92, 380);
      containerWidthRef.current = w;
      const max = computeMaxTranslate(w);
      setTranslateX(mode === "login" ? max : 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mode]);

  const handleToggle = () => {
    if (!hasInteracted) setHasInteracted(true);
    setMode((m) => (m === "login" ? "signup" : "login"));
  };

  async function handleEmailLogin(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("You are logged in");
    } catch (err) {
      console.error(err);
      toast.error((err as Error)?.message || "Login error");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignup(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast.success("Sign-up successful. You can complete your profile in the profile section.");
    } catch (err) {
      console.error(err);
      toast.error((err as Error)?.message || "Sign-up error");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "github" | "google") {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      toast.error((err as Error)?.message || "OAuth error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative h-[calc(100vh-70px)] overflow-hidden">
      <Toaster />
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none hidden md:block absolute left-4 bottom-6 transform-gpu lg:left-52
        lg:bottom-20 will-change-transform float-slow decor-svg"
        aria-hidden="true"
      >
        <svg viewBox="0 0 268 498" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M57.5 100.5H19C14.3056 100.5 10.5 104.306 10.5 109V143.5C10.5 150.404 16.0964 156 23 156C29.9036 156 35.5 161.596 35.5 168.5V196C35.5 204.284 42.2157 211 50.5 211H200C208.284 211 215 204.284 215 196V166.25C215 160.589 219.589 156 225.25 156C230.911 156 235.5 151.411 235.5 145.75V117.5C235.5 109.216 228.784 102.5 220.5 102.5H184.5C176.216 102.5 169.5 109.216 169.5 117.5V141C169.5 149.284 162.784 156 154.5 156H87.5C79.2157 156 72.5 149.284 72.5 141V115.5C72.5 107.216 65.7843 100.5 57.5 100.5Z" fill="black"/>
          <path d="M52.5 96.5H14C9.30558 96.5 5.5 100.306 5.5 105V139.5C5.5 146.404 11.0964 152 18 152C24.9036 152 30.5 157.596 30.5 164.5V192C30.5 200.284 37.2157 207 45.5 207H195C203.284 207 210 200.284 210 192V162.25C210 156.589 214.589 152 220.25 152C225.911 152 230.5 147.411 230.5 141.75V113.5C230.5 105.216 223.784 98.5 215.5 98.5H179.5C171.216 98.5 164.5 105.216 164.5 113.5V137C164.5 145.284 157.784 152 149.5 152H82.5C74.2157 152 67.5 145.284 67.5 137V111.5C67.5 103.216 60.7843 96.5 52.5 96.5Z" fill="#34A853" stroke="black"/>
          <path d="M92.5 95V74C92.5 65.7157 99.2157 59 107.5 59H111C119.284 59 126 52.2843 126 44V19.5C126 11.2157 132.716 4.5 141 4.5H175C183.284 4.5 190 11.2157 190 19.5V45.5C190 52.9558 183.956 59 176.5 59C169.044 59 163 65.0442 163 72.5V95C163 103.284 156.284 110 148 110H107.5C99.2157 110 92.5 103.284 92.5 95Z" fill="black"/>
          <path d="M87.5 91V70C87.5 61.7157 94.2157 55 102.5 55H106C114.284 55 121 48.2843 121 40V15.5C121 7.21573 127.716 0.5 136 0.5H170C178.284 0.5 185 7.21573 185 15.5V41.5C185 48.9558 178.956 55 171.5 55C164.044 55 158 61.0442 158 68.5V91C158 99.2843 151.284 106 143 106H102.5C94.2157 106 87.5 99.284 87.5 91Z" fill="#FFC20E" stroke="black"/>
          <path d="M198.5 224.5H51C42.7157 224.5 36 231.216 36 239.5V263C36 271.284 42.7157 278 51 278H151.5C159.784 278 166.5 284.716 166.5 293V320C166.5 328.284 159.784 335 151.5 335H72C63.7157 335 57 341.716 57 350V373C57 381.284 50.2843 388 42 388H20.5C12.2157 388 5.5 394.716 5.5 403V428C5.5 436.284 12.2157 443 20.5 443H45C53.2843 443 60 449.716 60 458V483C60 491.284 66.7157 498 75 498H253C261.284 498 268 491.284 268 483V293C268 284.716 261.284 278 253 278H228.5C220.216 278 213.5 271.284 213.5 263V239.5C213.5 231.216 206.784 224.5 198.5 224.5Z" fill="black"/>
          <path d="M193.5 218.5H46C37.7157 218.5 31 225.216 31 233.5V257C31 265.284 37.7157 272 46 272H146.5C154.784 272 161.5 278.716 161.5 287V314C161.5 322.284 154.784 329 146.5 329H67C58.7157 329 52 335.716 52 344V367C52 375.284 45.2843 382 37 382H15.5C7.21573 382 0.5 388.716 0.5 397V422C0.5 430.284 7.21573 437 15.5 437H40C48.2843 437 55 443.716 55 452V477C55 485.284 61.7157 492 70 492H248C256.284 492 263 485.284 263 477V287C263 278.716 256.284 272 248 272H223.5C215.216 272 208.5 265.284 208.5 257V233.5C208.5 225.216 201.784 218.5 193.5 218.5Z" fill="#EA4335" stroke="black"/>
          <path d="M179.5 383.5H144.5C136.216 383.5 129.5 390.216 129.5 398.5V422.5C129.5 430.784 136.216 437.5 144.5 437.5H179.5C187.784 437.5 194.5 430.784 194.5 422.5V398.5C194.5 390.216 187.784 383.5 179.5 383.5Z" fill="black" stroke="black"/>
          <path d="M175.5 380.5H140.5C132.216 380.5 125.5 387.216 125.5 395.5V419.5C125.5 427.784 132.216 434.5 140.5 434.5H175.5C183.784 434.5 190.5 427.784 190.5 419.5V395.5C190.5 387.216 183.784 380.5 175.5 380.5Z" fill="#F8FDFA" stroke="black"/>
        </svg>
      </div>

      <div
        className="pointer-events-none hidden md:block absolute right-4 top-6 transform-gpu lg:right-52
        lg:top-20 will-change-transform float-fast decor-svg"
        aria-hidden="true"
      >
        <svg viewBox="0 0 270 499" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M210.831 398.196L249.331 398.323C254.025 398.339 257.844 394.546 257.859 389.852L257.974 355.352C257.996 348.448 252.419 342.833 245.515 342.811C238.611 342.788 233.034 337.173 233.057 330.269L233.148 302.769C233.175 294.485 226.482 287.747 218.197 287.72L68.6983 287.224C60.4141 287.197 53.6761 293.89 53.6487 302.174L53.55 331.924C53.5313 337.585 48.927 342.159 43.2661 342.14C37.6052 342.121 33.001 346.695 32.9822 352.356L32.8885 380.606C32.8611 388.89 39.5545 395.628 47.8387 395.656L83.8385 395.775C92.1228 395.802 98.8607 389.109 98.8882 380.825L98.9661 357.325C98.9936 349.041 105.732 342.347 114.016 342.375L181.015 342.597C189.3 342.624 195.993 349.362 195.966 357.646L195.881 383.146C195.854 391.43 202.547 398.168 210.831 398.196Z" fill="black"/>
          <path d="M215.816 402.212L254.315 402.34C259.01 402.355 262.828 398.562 262.844 393.868L262.958 359.368C262.981 352.465 257.403 346.85 250.499 346.827C243.596 346.804 238.018 341.189 238.041 334.286L238.132 306.786C238.16 298.501 231.466 291.763 223.182 291.736L73.6827 291.24C65.3985 291.213 58.6605 297.906 58.633 306.191L58.5344 335.94C58.5157 341.601 53.9114 346.175 48.2505 346.156C42.5896 346.138 37.9853 350.711 37.9666 356.372L37.8729 384.622C37.8455 392.906 44.5389 399.644 52.8231 399.672L88.8229 399.791C97.1071 399.819 103.845 393.125 103.873 384.841L103.95 361.341C103.978 353.057 110.716 346.363 119 346.391L186 346.613C194.284 346.641 200.977 353.378 200.95 361.663L200.865 387.163C200.838 395.447 207.531 402.185 215.816 402.212Z" fill="#34A853" stroke="black"/>
          <path d="M175.811 403.58L175.741 424.58C175.714 432.864 168.976 439.557 160.691 439.53L157.191 439.518C148.907 439.491 142.169 446.184 142.142 454.468L142.061 478.968C142.033 487.252 135.295 493.946 127.011 493.918L93.0111 493.806C84.7269 493.778 78.0334 487.04 78.0609 478.756L78.1471 452.756C78.1718 445.3 84.236 439.276 91.6918 439.301C99.1476 439.326 105.212 433.302 105.236 425.846L105.311 403.346C105.339 395.062 112.076 388.368 120.361 388.396L160.86 388.53C169.145 388.558 175.838 395.295 175.811 403.58Z" fill="black"/>
          <path d="M180.799 407.596L180.729 428.596C180.702 436.88 173.964 443.574 165.68 443.546L162.18 443.535C153.895 443.507 147.158 450.201 147.13 458.485L147.049 482.985C147.021 491.269 140.283 497.962 131.999 497.935L97.9994 497.822C89.7152 497.795 83.0217 491.057 83.0492 482.773L83.1354 456.773C83.1601 449.317 89.2243 443.293 96.6801 443.318C104.136 443.342 110.2 437.318 110.225 429.862L110.299 407.363C110.327 399.078 117.065 392.385 125.349 392.412L165.849 392.547C174.133 392.574 180.826 399.312 180.799 407.596Z" fill="#FFC20E" stroke="black"/>
          <path d="M70.2422 273.729L217.741 274.218C226.026 274.245 232.764 267.552 232.791 259.268L232.869 235.768C232.896 227.484 226.203 220.746 217.919 220.718L117.419 220.385C109.135 220.358 102.442 213.62 102.469 205.335L102.559 178.336C102.586 170.051 109.324 163.358 117.608 163.385L197.108 163.649C205.392 163.676 212.13 156.983 212.157 148.699L212.234 125.699C212.261 117.415 218.999 110.721 227.283 110.749L248.783 110.82C257.067 110.847 263.805 104.154 263.833 95.8697L263.916 70.8699C263.943 62.5856 257.25 55.8477 248.966 55.8202L224.466 55.739C216.181 55.7115 209.488 48.9736 209.515 40.6894L209.598 15.6895C209.626 7.40526 202.932 0.667309 194.648 0.639847L16.6491 0.049783C8.36489 0.0223209 1.62694 6.71575 1.59947 15L0.969632 204.999C0.94217 213.283 7.6356 220.021 15.9198 220.049L40.4197 220.13C48.7039 220.157 55.3973 226.895 55.3699 235.179L55.292 258.679C55.2645 266.964 61.9579 273.701 70.2422 273.729Z" fill="black"/>
          <path d="M75.2226 279.746L222.722 280.235C231.006 280.262 237.744 273.569 237.771 265.284L237.849 241.784C237.877 233.5 231.183 226.762 222.899 226.735L122.4 226.402C114.116 226.374 107.422 219.636 107.45 211.352L107.539 184.352C107.567 176.068 114.304 169.374 122.589 169.402L202.088 169.665C210.372 169.693 217.11 163 217.138 154.715L217.214 131.715C217.242 123.431 223.98 116.738 232.264 116.765L253.764 116.837C262.048 116.864 268.786 110.171 268.813 101.886L268.896 76.8865C268.924 68.6022 262.23 61.8643 253.946 61.8368L229.446 61.7556C221.162 61.7281 214.468 54.9902 214.496 46.706L214.579 21.7061C214.606 13.4219 207.913 6.68391 199.629 6.65645L21.6296 6.06638C13.3454 6.03892 6.60741 12.7324 6.57994 21.0166L5.9501 211.016C5.92264 219.3 12.6161 226.038 20.9003 226.065L45.4002 226.146C53.6844 226.174 60.3778 232.912 60.3504 241.196L60.2725 264.696C60.245 272.98 66.9384 279.718 75.2226 279.746Z" fill="#EA4335" stroke="black"/>
          <path d="M106.999 109H141.999C150.283 109 156.999 102.284 156.999 94.0001V70.0001C156.999 61.7158 150.283 55.0001 141.999 55.0001H106.999C98.7147 55.0001 91.9989 61.7158 91.9989 70.0001V94.0001C91.9989 102.284 98.7147 109 106.999 109Z" fill="black" stroke="black"/>
          <path d="M110.999 112H145.999C154.283 112 160.999 105.284 160.999 97.0001V73.0001C160.999 64.7158 154.283 58.0001 145.999 58.0001H110.999C102.7 58.0001 95.9989 64.7158 95.9989 73.0001V97.0001C95.9989 105.284 102.715 112 110.999 112Z" fill="#FDFCF8" stroke="black"/>
        </svg>
      </div>

      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div ref={cardStageRef} className="relative w-[92vw] max-w-[380px] h-[520px]">
            <div
              aria-hidden={mode !== "login"}
              style={{
                transition: "opacity 420ms ease, transform 700ms cubic-bezier(.22,.9,.26,1)",
              }}
              className={`absolute inset-0 z-10 rounded-sm border-[4px] border-black shadow-[10px_10px_0_#000] p-8 bg-[#6F6EF6] ${
                mode === "login" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"
              }`}
            >
              <h1 className="text-[28px] font-black text-black flex items-center gap-2">
                <BiLogIn /> LOGIN
              </h1>
              <p className="text-sm text-white mt-1">welcome back!</p>
              <div className="h-[2px] w-full bg-black my-6" />
              <div className="relative mb-5">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  className="w-full pl-12 py-3 bg-[#FDFCF8] border-[3px] border-black shadow-[4px_4px_0_#000] outline-none"
                />
              </div>
              <div className="relative mb-8">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="w-full pl-12 py-3 bg-[#FDFCF8] border-[3px] border-black shadow-[4px_4px_0_#000] outline-none"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handleEmailLogin}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-between w-[170px] px-5 py-3 bg-black text-white border-[3px] border-black shadow-[4px_4px_0_red] font-bold"
                >
                  <span className="flex items-center gap-2">
                    <BiLogIn /> login
                  </span>
                  <span className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <ArrowRight size={14} />
                  </span>
                </button>

                <span className="text-black text-sm">or</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleOAuth("github")}
                    aria-label="Sign in with GitHub"
                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center border-2 border-black text-lg"
                    title="Sign in with GitHub"
                  >
                    <FaGithub size={20} color="white" />
                  </button>
                  <button
                    onClick={() => handleOAuth("google")}
                    aria-label="Sign in with Google"
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center border-2 border-black font-bold text-lg"
                    title="Sign in with Google"
                  >
                    <FcGoogle size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div
              aria-hidden={mode !== "signup"}
              style={{
                transition: "opacity 420ms ease, transform 700ms cubic-bezier(.22,.9,.26,1)",
              }}
              className={`absolute inset-0 z-20 rounded-sm border-[4px] border-black shadow-[10px_10px_0_#000] p-8 bg-[#FFC20E] ${
                mode === "signup" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
              }`}
            >
              <h1 className="text-[28px] font-black text-black flex items-center gap-2">
                <ClipboardList /> SIGN UP
              </h1>
              <p className="text-xs text-black mt-1">get started with a new account</p>
              <div className="h-[2px] w-full bg-black my-6" />
              <div className="relative mb-4">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  className="w-full pl-12 py-3 bg-white border-[3px] border-black shadow-[4px_4px_0_#000] outline-none"
                />
              </div>
              <div className="relative mb-4">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  className="w-full pl-12 py-3 bg-white border-[3px] border-black shadow-[4px_4px_0_#000] outline-none"
                />
              </div>
              <div className="relative mb-6">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="w-full pl-12 py-3 bg-white border-[3px] border-black shadow-[4px_4px_0_#000] outline-none"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handleEmailSignup}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-between w-[170px] px-5 py-3 bg-black text-white border-[3px] border-black shadow-[4px_4px_0_green] font-bold"
                >
                  sign up
                  <span className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <ArrowRight size={14} />
                  </span>
                </button>

                <span className="text-black text-sm">or</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleOAuth("github")}
                    aria-label="Sign in with GitHub"
                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center border-2 border-black text-lg"
                    title="Sign in with GitHub"
                  >
                    <FaGithub size={20} color="white" />
                  </button>
                  <button
                    onClick={() => handleOAuth("google")}
                    aria-label="Sign in with Google"
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center border-2 border-black font-bold text-lg"
                    title="Sign in with Google"
                  >
                    <FcGoogle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-[-72px] sm:bottom-[-88px] floating-toggle ${hasInteracted ? "transition-on" : ""} ${mode === "login" ? "is-login" : "is-signup"}`}
            style={{
              left: 0,
              transform: `translateX(${translateX}px)`,
            }}
          >
            <div className="relative w-[140px] h-[56px]">
              <div
                className="absolute right-[-10px] bottom-[-10px] w-full h-full rounded-md"
                style={{
                  background: "#3B82F6",
                  border: "2px solid #000",
                  zIndex: 1,
                }}
              />
              <button
                onClick={handleToggle}
                type="button"
                aria-label={mode === "login" ? "Sign up" : "Login"}
                className="relative z-20 w-full h-full bg-black text-white rounded-md border-2 border-black shadow-[6px_6px_0_#000] font-bold text-2xl"
              >
                {mode === "login" ? "sign up" : "login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
