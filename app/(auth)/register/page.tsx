"use client"
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { ClipboardList, Form } from "lucide-react";

// SVG Path Data - Inlined for single file
const svgPathsSignup = {
  p18ad1d00: "M17 19C17 16.2386 13.4183 14 9 14C4.58172 14 1 16.2386 1 19M9 11C6.23858 11 4 8.76142 4 6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6C14 8.76142 11.7614 11 9 11Z",
  p28ca4600: "M7.84615 20.7554C7.48988 19.7072 7.28745 18.5874 7.28745 17.4359C7.28745 16.2844 7.48988 15.1646 7.84615 14.1164V9.58974H1.89474C0.647773 12.0244 -0.00109899 14.7114 1.39722e-06 17.4359C1.39722e-06 20.2551 0.68826 22.9234 1.89474 25.2821L7.84615 20.7554Z",
  p2dc2a800: "M11 13L14 10M14 10L11 7M14 10H6M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z",
  p30369180: "M22 3.66667C19.5924 3.66667 17.2084 4.14087 14.9841 5.06221C12.7598 5.98354 10.7388 7.33397 9.03638 9.03638C5.59821 12.4745 3.66667 17.1377 3.66667 22C3.66667 30.1033 8.92833 36.9783 16.2067 39.4167C17.1233 39.5633 17.4167 38.995 17.4167 38.5C17.4167 38.0783 17.4167 36.9233 17.4167 35.4017C12.3383 36.5017 11.2567 32.945 11.2567 32.945C10.4133 30.8183 9.22167 30.25 9.22167 30.25C7.55333 29.1133 9.35 29.15 9.35 29.15C11.1833 29.2783 12.155 31.0383 12.155 31.0383C13.75 33.825 16.445 33 17.49 32.56C17.655 31.3683 18.1317 30.5617 18.645 30.1033C14.575 29.645 10.3033 28.0683 10.3033 21.0833C10.3033 19.0483 11 17.4167 12.1917 16.115C12.0083 15.6567 11.3667 13.75 12.375 11.275C12.375 11.275 13.915 10.78 17.4167 13.145C18.865 12.7417 20.4417 12.54 22 12.54C23.5583 12.54 25.135 12.7417 26.5833 13.145C30.085 10.78 31.625 11.275 31.625 11.275C32.6333 13.75 31.9917 15.6567 31.8083 16.115C33 17.4167 33.6967 19.0483 33.6967 21.0833C33.6967 28.0867 29.4067 29.6267 25.3183 30.085C25.9783 30.6533 26.5833 31.7717 26.5833 33.4767C26.5833 35.9333 26.5833 37.9133 26.5833 38.5C26.5833 38.995 26.8767 39.5817 27.8117 39.4167C35.09 36.96 40.3333 30.1033 40.3333 22C40.3333 19.5924 39.8591 17.2084 38.9378 14.9841C38.0165 12.7598 36.666 10.7388 34.9636 9.03638C33.2612 7.33397 31.2402 5.98354 29.0159 5.06221C26.7916 4.14087 24.4076 3.66667 22 3.66667V3.66667Z",
  p32db1280: "M120.51 0.5V1433.5M240.503 0.5V1433.5M360.5 0.5V1433.5M480.51 0.5V1433.5M600.503 0.5V1433.5M720.5 0.5V1433.5M840.51 0.5V1433.5M960.503 0.5V1433.5M1080.5 0.5V1433.5M1200.51 0.5V1433.5M1320.5 0.5V1433.5M0.5 119.916H1440.5M0.5 239.333H1440.5M0.5 358.75H1440.5M0.5 478.166H1440.5M0.5 597.583H1440.5M0.5 717H1440.5M0.5 836.417H1440.5M0.5 955.833H1440.5M0.5 1075.25H1440.5M0.5 1194.67H1440.5M0.5 1314.08H1440.5M0.5 0.5V1433.5H1440.5V0.5H0.5Z",
  p36261300: "M2 2L8.10764 6.61227L8.10967 6.61396C8.78785 7.11129 9.12714 7.3601 9.49876 7.45622C9.82723 7.54117 10.1725 7.54117 10.501 7.45622C10.8729 7.36001 11.2132 7.11047 11.8926 6.61227C11.8926 6.61227 15.8101 3.60594 18 2M1 11.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40974 1.71547 1.71547 1.40974 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H15.8002C16.9203 1 17.4796 1 17.9074 1.21799C18.2837 1.40974 18.5905 1.71547 18.7822 2.0918C19 2.5192 19 3.079 19 4.19691V11.8036C19 12.9215 19 13.4805 18.7822 13.9079C18.5905 14.2842 18.2837 14.5905 17.9074 14.7822C17.48 15 16.921 15 15.8031 15H4.19691C3.079 15 2.5192 15 2.0918 14.7822C1.71547 14.5905 1.40974 14.2842 1.21799 13.9079C1 13.4801 1 12.9203 1 11.8002Z",
  p5f1fe80: "M34 17.5548C34 16.3047 33.8902 15.1027 33.6863 13.9487H17.4359V20.7683H26.7218C26.3218 22.972 25.1062 24.8392 23.2788 26.0893V30.5128H28.8551C32.1177 27.4436 34 22.9239 34 17.5548Z",
  pa7de840: "M17.198 6.84912C19.7371 6.84912 22.0167 7.71798 23.809 9.42439L28.7692 4.48519C25.7742 1.70641 21.8595 0 17.198 0C10.4377 0 4.58922 3.85899 1.74359 9.48701L7.52132 13.9487C8.88125 9.87839 12.6938 6.84912 17.198 6.84912Z",
  pb4601c0: "M6.23047 7H4.2002C3.08009 7 2.51962 7 2.0918 7.21799C1.71547 7.40973 1.40974 7.71547 1.21799 8.0918C1 8.51962 1 9.08009 1 10.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40974 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07902 19 4.19694 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2842 16.7822 17.9079C17 17.4805 17 16.9215 17 15.8036V10.1969C17 9.07899 17 8.5192 16.7822 8.0918C16.5905 7.71547 16.2837 7.40973 15.9074 7.21799C15.4796 7 14.9203 7 13.8002 7H11.7689M6.23047 7H11.7689M6.23047 7C6.10302 7 6 6.89668 6 6.76923V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V6.76923C12 6.89668 11.8964 7 11.7689 7",
  pf975800: "M17.2703 34.8718C21.9615 34.8718 25.8945 33.3298 28.7692 30.6997L23.154 26.3789C21.5982 27.4121 19.608 28.0227 17.2703 28.0227C12.745 28.0227 8.91462 24.9934 7.54834 20.9231H1.74359V25.3848C4.60253 31.0128 10.4784 34.8718 17.2703 34.8718Z",
};

const svgPathsLogin = {
  p28ca4600: "M7.84615 20.7554C7.48988 19.7072 7.28745 18.5874 7.28745 17.4359C7.28745 16.2844 7.48988 15.1646 7.84615 14.1164V9.58974H1.89474C0.647773 12.0244 -0.00109899 14.7114 1.39722e-06 17.4359C1.39722e-06 20.2551 0.68826 22.9234 1.89474 25.2821L7.84615 20.7554Z",
  p2dc2a800: "M11 13L14 10M14 10L11 7M14 10H6M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z",
  p30369180: "M22 3.66667C19.5924 3.66667 17.2084 4.14087 14.9841 5.06221C12.7598 5.98354 10.7388 7.33397 9.03638 9.03638C5.59821 12.4745 3.66667 17.1377 3.66667 22C3.66667 30.1033 8.92833 36.9783 16.2067 39.4167C17.1233 39.5633 17.4167 38.995 17.4167 38.5C17.4167 38.0783 17.4167 36.9233 17.4167 35.4017C12.3383 36.5017 11.2567 32.945 11.2567 32.945C10.4133 30.8183 9.22167 30.25 9.22167 30.25C7.55333 29.1133 9.35 29.15 9.35 29.15C11.1833 29.2783 12.155 31.0383 12.155 31.0383C13.75 33.825 16.445 33 17.49 32.56C17.655 31.3683 18.1317 30.5617 18.645 30.1033C14.575 29.645 10.3033 28.0683 10.3033 21.0833C10.3033 19.0483 11 17.4167 12.1917 16.115C12.0083 15.6567 11.3667 13.75 12.375 11.275C12.375 11.275 13.915 10.78 17.4167 13.145C18.865 12.7417 20.4417 12.54 22 12.54C23.5583 12.54 25.135 12.7417 26.5833 13.145C30.085 10.78 31.625 11.275 31.625 11.275C32.6333 13.75 31.9917 15.6567 31.8083 16.115C33 17.4167 33.6967 19.0483 33.6967 21.0833C33.6967 28.0867 29.4067 29.6267 25.3183 30.085C25.9783 30.6533 26.5833 31.7717 26.5833 33.4767C26.5833 35.9333 26.5833 37.9133 26.5833 38.5C26.5833 38.995 26.8767 39.5817 27.8117 39.4167C35.09 36.96 40.3333 30.1033 40.3333 22C40.3333 19.5924 39.8591 17.2084 38.9378 14.9841C38.0165 12.7598 36.666 10.7388 34.9636 9.03638C33.2612 7.33397 31.2402 5.98354 29.0159 5.06221C26.7916 4.14087 24.4076 3.66667 22 3.66667V3.66667Z",
  p32db1280: "M120.51 0.5V1433.5M240.503 0.5V1433.5M360.5 0.5V1433.5M480.51 0.5V1433.5M600.503 0.5V1433.5M720.5 0.5V1433.5M840.51 0.5V1433.5M960.503 0.5V1433.5M1080.5 0.5V1433.5M1200.51 0.5V1433.5M1320.5 0.5V1433.5M0.5 119.916H1440.5M0.5 239.333H1440.5M0.5 358.75H1440.5M0.5 478.166H1440.5M0.5 597.583H1440.5M0.5 717H1440.5M0.5 836.417H1440.5M0.5 955.833H1440.5M0.5 1075.25H1440.5M0.5 1194.67H1440.5M0.5 1314.08H1440.5M0.5 0.5V1433.5H1440.5V0.5H0.5Z",
  p36261300: "M2 2L8.10764 6.61227L8.10967 6.61396C8.78785 7.11129 9.12714 7.3601 9.49876 7.45622C9.82723 7.54117 10.1725 7.54117 10.501 7.45622C10.8729 7.36001 11.2132 7.11047 11.8926 6.61227C11.8926 6.61227 15.8101 3.60594 18 2M1 11.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40974 1.71547 1.71547 1.40974 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H15.8002C16.9203 1 17.4796 1 17.9074 1.21799C18.2837 1.40974 18.5905 1.71547 18.7822 2.0918C19 2.5192 19 3.079 19 4.19691V11.8036C19 12.9215 19 13.4805 18.7822 13.9079C18.5905 14.2842 18.2837 14.5905 17.9074 14.7822C17.48 15 16.921 15 15.8031 15H4.19691C3.079 15 2.5192 15 2.0918 14.7822C1.71547 14.5905 1.40974 14.2842 1.21799 13.9079C1 13.4801 1 12.9203 1 11.8002Z",
  p5f1fe80: "M34 17.5548C34 16.3047 33.8902 15.1027 33.6863 13.9487H17.4359V20.7683H26.7218C26.3218 22.972 25.1062 24.8392 23.2788 26.0893V30.5128H28.8551C32.1177 27.4436 34 22.9239 34 17.5548Z",
  pa7de840: "M17.198 6.84912C19.7371 6.84912 22.0167 7.71798 23.809 9.42439L28.7692 4.48519C25.7742 1.70641 21.8595 0 17.198 0C10.4377 0 4.58922 3.85899 1.74359 9.48701L7.52132 13.9487C8.88125 9.87839 12.6938 6.84912 17.198 6.84912Z",
  pb4601c0: "M6.23047 7H4.2002C3.08009 7 2.51962 7 2.0918 7.21799C1.71547 7.40973 1.40974 7.71547 1.21799 8.0918C1 8.51962 1 9.08009 1 10.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40974 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07902 19 4.19694 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2842 16.7822 17.9079C17 17.4805 17 16.9215 17 15.8036V10.1969C17 9.07899 17 8.5192 16.7822 8.0918C16.5905 7.71547 16.2837 7.40973 15.9074 7.21799C15.4796 7 14.9203 7 13.8002 7H11.7689M6.23047 7H11.7689M6.23047 7C6.10302 7 6 6.89668 6 6.76923V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V6.76923C12 6.89668 11.8964 7 11.7689 7",
  pf975800: "M17.2703 34.8718C21.9615 34.8718 25.8945 33.3298 28.7692 30.6997L23.154 26.3789C21.5982 27.4121 19.608 28.0227 17.2703 28.0227C12.745 28.0227 8.91462 24.9934 7.54834 20.9231H1.74359V25.3848C4.60253 31.0128 10.4784 34.8718 17.2703 34.8718Z",
};

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form state
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.username) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            username: signupData.username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created! Redirecting...");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Welcome back!");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || `Failed to login with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfcf8] min-h-screen w-full overflow-hidden relative ">
      {/* Desktop view - absolute positioned for 1440px design */}
      <div className="hidden lg:block relative min-h-screen w-[1440px] mx-auto">
        {/* Background radial gradient lines */}
        <motion.div
          className="absolute h-[1433px] w-[1440px]"
          animate={{
            top: isLogin ? "-486px" : "0px",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1441 1434">
            <path d={svgPathsSignup.p32db1280} stroke="url(#paint0_radial)" />
            <defs>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="matrix(-736.581 -572 574.794 -733 818.979 630)"
                gradientUnits="userSpaceOnUse"
                id="paint0_radial"
                r="1"
              >
                <stop offset="0.211538" stopOpacity="0.7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Diagonal Lines */}
        <DiagonalLines isLogin={isLogin} />

        {/* Big Shapes */}
        <BigShapes isLogin={isLogin} />

        {/* Form Container */}
        <div className="relative z-10 min-h-screen w-full">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm
                key="login"
                onToggle={toggleForm}
                onSubmit={handleLogin}
                data={loginData}
                setData={setLoginData}
                loading={loading}
                onOAuth={handleOAuthLogin}
              />
            ) : (
              <SignUpForm
                key="signup"
                onToggle={toggleForm}
                onSubmit={handleSignup}
                data={signupData}
                setData={setSignupData}
                loading={loading}
                onOAuth={handleOAuthLogin}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile/Tablet view - centered and responsive */}
      <div className="lg:hidden relative min-h-screen flex items-center justify-center px-4 py-8">
        {/* Simplified background elements for mobile - only lines, no shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <DiagonalLinesMobile isLogin={isLogin} />
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginFormMobile
                key="login"
                onToggle={toggleForm}
                onSubmit={handleLogin}
                data={loginData}
                setData={setLoginData}
                loading={loading}
                onOAuth={handleOAuthLogin}
              />
            ) : (
              <SignUpFormMobile
                key="signup"
                onToggle={toggleForm}
                onSubmit={handleSignup}
                data={signupData}
                setData={setSignupData}
                loading={loading}
                onOAuth={handleOAuthLogin}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DiagonalLines({ isLogin }: { isLogin: boolean }) {
  const lines = [
    {
      color: "#ff5050",
      signup: { left: -10, top: 340 },
      login: { left: 1329, top: -215 }
    },
    {
      color: "#ffd23d",
      signup: { left: -250, top: 450 },
      login: { left: 1355, top: -288 }
    },
    {
      color: "#4284ff",
      signup: { left: -313, top: 430 },
      login: { left: 1261, top: -259 }
    },
    {
      color: "#08ef69",
      signup: { left: -387, top: 420 },
      login: { left: 1282, top: -328 }
    },
  ];

  return (
    <>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className="absolute h-[390.058px] w-[469.432px] flex items-center justify-center pointer-events-none"
          animate={{
            left: `${isLogin ? line.login.left : line.signup.left}px`,
            top: `${isLogin ? line.login.top : line.signup.top}px`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="rotate-[140.911deg]">
            <div
              className="h-[33px] w-[578px] rounded-[16.5px]"
              style={{ backgroundColor: line.color }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}

function BigShapes({ isLogin }: { isLogin: boolean }) {
  const shapes = [
    {
      color: "#ff4540",
      signup: { left: 842, top: 20 },
      login: { left: -223, top: 20 }
    },
    {
      color: "#57a6ff",
      signup: { left: 1032, top: 200 },
      login: { left: -333, top: 200 }
    },
    {
      color: "#ffca38",
      signup: { left: 912, top: 380 },
      login: { left: -79, top: 380 }
    },
    {
      color: "#00f566",
      signup: { left: 811, top: 500 },
      login: { left: -144, top: 500 }
    },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute h-[306px] w-[629px] rounded-xl pointer-events-none"
          style={{
            backgroundColor: shape.color,
          }}
          animate={{
            left: `${isLogin ? shape.login.left : shape.signup.left}px`,
            top: `${isLogin ? shape.login.top : shape.signup.top}px`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div
            aria-hidden="true"
            className="absolute  inset-0.5 pointer-events-none rounded-xl shadow-[-7px_8px_6px_3px_rgba(0,0,0,0.31)]"
          />
        </motion.div>
      ))}
    </>
  );
}

function DiagonalLinesMobile({ isLogin }: { isLogin: boolean }) {
  const lines = [
    {
      color: "#ff5050",
      signup: { left: -240, top: 480 },
      login: { left: 250, top: 0 }
    },
    {
      color: "#ffd23d",
      signup: { left: -270, top: 450 },
      login: { left: 250, top: -60 }
    },
    {
      color: "#4284ff",
      signup: { left: -313, top: 430 },
      login: { left: 220, top: -100 }
    },
    {
      color: "#08ef69",
      signup: { left: -370, top: 420 },
      login: { left: 150, top: -100 }
    },
  ];

  return (
    <>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className="absolute h-[390.058px] w-[469.432px] flex items-center justify-center pointer-events-none"
          animate={{
            left: `${isLogin ? line.login.left : line.signup.left}px`,
            top: `${isLogin ? line.login.top : line.signup.top}px`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="rotate-[140.911deg]">
            <div
              className="h-[33px] w-[578px] rounded-[16.5px]"
              style={{ backgroundColor: line.color }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}

interface FormProps {
  onToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
  data: any;
  setData: (data: any) => void;
  loading: boolean;
  onOAuth: (provider: "google" | "github") => void;
}

function SignUpForm({ onToggle, onSubmit, data, setData, loading, onOAuth }: FormProps) {
  return (
    <motion.div
      className="absolute left-[172px] top-10"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Card Shadow */}
      <div className="absolute bg-black h-[440px] w-[420px] rounded-xl top-2 left-[7px]" />

      {/* Form Card */}
      <form onSubmit={onSubmit} className="relative bg-white border-[3px] border-black border-solid rounded-xl h-[440px] w-[420px] px-6 py-6">
        {/* Header */}
        <div>
          <h1 className="text-[32px] flex items-center mb-0.5"><ClipboardList className="size-8" /> SIGN UP</h1>
          <p className="text-[#9c9c9c] text-sm mb-3">Get started with GDG RBU</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-black mb-5" />

        {/* Form Fields */}
        <div className="space-y-3.5 mb-4">
          <FormInput
            icon="user"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <FormInput
            icon="mail"
            placeholder="E-mail"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <FormInput
            icon="lock"
            placeholder="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        {/* Sign Up Button and Social Buttons Row */}
        <div className="flex items-center gap-3 mb-4">
          {/* Sign Up Button */}
          <div className="relative">
            <div className="absolute bg-black h-[49px] w-36 rounded-xl top-[3px] left-1" />
            <button
              type="submit"
              disabled={loading}
              className="relative bg-black text-white border-2 border-black rounded-xl w-[145px] h-[52px] text-[20px] tracking-[-2px] hover:translate-y-1 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Sign Up"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Or Text */}
          <p className="text-xl tracking-[-1.5px]">or</p>

          {/* Social Buttons */}
          <div className="flex gap-2">
            {/* Google Button */}
            <div className="relative">
              <div className="absolute bg-black h-[52px] w-[52px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("google")}
                disabled={loading}
                className="relative bg-white border-2 border-black rounded-xl size-[52px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GoogleIcon />
              </button>
            </div>
            {/* GitHub Button */}
            <div className="relative">
              <div className="absolute bg-black h-[52px] w-[52px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("github")}
                disabled={loading}
                className="relative bg-black border-2 border-black rounded-xl size-[52px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GithubIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Link */}
        <p className="text-center text-sm tracking-[-0.5px] mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggle}
            className="font-semibold underline hover:opacity-70 transition-opacity"
          >
            Login
          </button>
        </p>
      </form>
    </motion.div>
  );
}

function LoginForm({ onToggle, onSubmit, data, setData, loading, onOAuth }: FormProps) {
  return (
    <motion.div
      className="absolute left-[846px] top-[20px]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Card Shadow */}
      <div className="absolute bg-black h-[440px] w-[420px] rounded-xl top-2 left-[7px]" />

      {/* Form Card */}
      <form onSubmit={onSubmit} className="relative bg-white border-[3px] border-black border-solid rounded-xl h-[440px] w-[420px] px-[24px] py-[18px]">
        {/* Header */}
        <div className="flex flex-col items-start justify-center">

          <h1 className="text-[32px]  mb-0.5 flex items-center"><BiLogIn className="size-10" /> LOGIN</h1>
          <p className="text-[#9c9c9c] text-sm mb-[12px]">Welcome back!</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-black mb-[20px]" />

        {/* Form Fields */}
        <div className="space-y-[12px] mb-4">
          <FormInput
            icon="mail"
            placeholder="E-mail"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <FormInput
            icon="lock"
            placeholder="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        {/* Login Button and Social Buttons Row */}
        <div className="flex items-center gap-[12px] mb-4">
          {/* Login Button */}
          <div className="relative">
            <div className="absolute bg-black h-[49px] w-[144px] rounded-xl top-[3px] left-1" />
            <button
              type="submit"
              disabled={loading}
              className="relative bg-black text-white border-2 border-black rounded-xl w-[145px] h-[52px] text-[20px] tracking-[-2px] hover:translate-y-1 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Login"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 5l3 3-3 3M11 8H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Or Text */}
          <p className="text-xl tracking-[-1.5px]">or</p>

          {/* Social Buttons */}
          <div className="flex gap-2">
            {/* Google Button */}
            <div className="relative">
              <div className="absolute bg-black h-[52px] w-[52px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("google")}
                disabled={loading}
                className="relative bg-white border-2 border-black rounded-xl size-[52px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GoogleIcon />
              </button>
            </div>
            {/* GitHub Button */}
            <div className="relative">
              <div className="absolute bg-black h-[52px] w-[52px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("github")}
                disabled={loading}
                className="relative bg-black border-2 border-black rounded-xl size-[52px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GithubIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Link */}
        <p className="text-center text-sm tracking-[-0.5px] mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onToggle}
            className="font-semibold underline hover:opacity-70 transition-opacity"
          >
            Sign Up
          </button>
        </p>
      </form>
    </motion.div>
  );
}

function SignUpFormMobile({ onToggle, onSubmit, data, setData, loading, onOAuth }: FormProps) {
  return (
    <>
      <motion.div
        className="relative w-full max-w-[420px] mx-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Card Shadow */}
        <div className="absolute bg-black h-full w-full rounded-xl top-2.5 left-[9px]" />

        {/* Form Card */}
        <form onSubmit={onSubmit} className="relative bg-white border-[3px] border-black border-solid rounded-xl w-full px-6 sm:px-[28px] py-6 sm:py-[27px]">
          {/* Header */}
          <div className="mb-6 sm:mb-[25px]">

            <h1 className="text-[32px] sm:text-[40px] flex items-center mb-0.5"> <ClipboardList className="size-8" /> SIGN UP</h1>
            <p className="text-[#9c9c9c] text-sm ">Get started with GDG RBU</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-black mb-8 sm:mb-[58px]" />

          {/* Form Fields */}
          <div className="space-y-6 sm:space-y-[38px] mb-6 sm:mb-[28px]">
            <FormInputMobile
              icon="user"
              placeholder="Username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <FormInputMobile
              icon="mail"
              placeholder="E-mail"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <FormInputMobile
              icon="lock"
              placeholder="Password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          {/* Sign Up Button */}
          <div className="relative mb-3 sm:mb-[11px]">
            <div className="absolute bg-slate-800 h-[52px] w-full sm:w-[157px] rounded-xl top-[3px] left-1" />
            <button
              type="submit"
              disabled={loading}
              className="relative bg-white border-2 border-black rounded-xl w-full sm:w-[158px] h-[54px] text-[20px] sm:text-[24px] tracking-[-2.4px] hover:translate-y-1 transition-transform disabled:opacity-50"
            >
              {loading ? "..." : "Sign Up"}
            </button>
          </div>

          {/* Or Divider */}
            <div className="flex items-center w-full mb-3 sm:mb-[11px]">
            <div className="flex-1 border-t border-gray-600" />
            <span className="mx-4 text-center text-xl sm:text-left tracking-[-1.5px]">or</span>
            <div className="flex-1 border-t border-gray-600" />
            </div>

          {/* Social Buttons */}
          <div className="flex justify-center sm:justify-start gap-[8px] mb-6 sm:mb-[25px] sm:ml-[99px]">
            {/* Google Button */}
            <div className="relative">
              <div className="absolute bg-black h-[54px] w-[54px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("google")}
                disabled={loading}
                className="relative bg-white border-2 border-black rounded-xl size-[54px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GoogleIcon />
              </button>
            </div>
            {/* GitHub Button */}
            <div className="relative">
              <div className="absolute bg-black h-[54px] w-[54px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("github")}
                disabled={loading}
                className="relative bg-black border-2 border-black rounded-xl size-[54px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GithubIcon />
              </button>
            </div>
          </div>

          {/* Toggle Link */}
          <p className="text-center text-sm tracking-[-0.5px] mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggle}
              className="font-semibold underline hover:opacity-70 transition-opacity"
            >
              Login
            </button>
          </p>
        </form>
      </motion.div>
    </>
  );
}

function LoginFormMobile({ onToggle, onSubmit, data, setData, loading, onOAuth }: FormProps) {
  return (
    <>
      <motion.div
        className="relative w-full max-w-[420px] mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Card Shadow */}
        <div className="absolute bg-black h-full w-full rounded-xl top-2.5 left-[9px]" />

        {/* Form Card */}
        <form onSubmit={onSubmit} className="relative bg-white border-[3px] border-black border-solid rounded-xl w-full px-6 sm:px-[28px] py-6 sm:py-[27px]">
          {/* Header */}
          <div className="mb-6 sm:mb-[25px]">
            <h1 className="text-[32px] sm:text-[40px] flex items-center mb-0.5"> <BiLogIn className="size-10" /> LOGIN</h1>
            <p className="text-[#9c9c9c] text-sm">Welcome back!</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-black mb-10 sm:mb-[101px]" />

          {/* Form Fields */}
          <div className="space-y-6 sm:space-y-[38px] mb-6 sm:mb-[28px]">
            <FormInputMobile
              icon="mail"
              placeholder="E-mail"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <FormInputMobile
              icon="lock"
              placeholder="Password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <div className="relative mb-3 sm:mb-[11px]">
            <div className="absolute bg-black h-[52px] w-full sm:w-[157px] rounded-xl top-[3px] left-1" />
            <button
              type="submit"
              disabled={loading}
              className="relative bg-white border-2 border-black rounded-xl w-full sm:w-[158px] h-[54px] text-[20px] sm:text-[24px] tracking-[-2.4px] hover:translate-y-1 transition-transform disabled:opacity-50"
            >
              {loading ? "..." : "Login"}
            </button>
          </div>

          {/* Or Divider */}
          <div className="flex items-center w-full mb-3 sm:mb-[11px]">
            <div className="flex-1 border-t border-gray-600" />
            <span className="mx-4 text-center text-xl sm:text-left tracking-[-1.5px]">or</span>
            <div className="flex-1 border-t border-gray-600" />
            </div>

          {/* Social Buttons */}
          <div className="flex justify-center sm:justify-start gap-2 sm:gap-2 mb-6 sm:mb-[25px] sm:ml-[119px]">
            {/* Google Button */}
            <div className="relative">
              <div className="absolute bg-black h-[54px] w-[54px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("google")}
                disabled={loading}
                className="relative bg-white border-2 border-black rounded-xl size-[54px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GoogleIcon />
              </button>
            </div>
            {/* GitHub Button */}
            <div className="relative">
              <div className="absolute bg-black h-[54px] w-[54px] rounded-xl top-[3px] left-[3px]" />
              <button
                type="button"
                onClick={() => onOAuth("github")}
                disabled={loading}
                className="relative bg-black border-2 border-black rounded-xl size-[54px] flex items-center justify-center hover:translate-y-1 transition-transform disabled:opacity-50"
              >
                <GithubIcon />
              </button>
            </div>
          </div>

          {/* Toggle Link */}
          <p className="text-center text-sm tracking-[-0.5px] mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggle}
              className="font-semibold underline hover:opacity-70 transition-opacity"
            >
              Sign Up
            </button>
          </p>
        </form>
      </motion.div>
    </>
  );
}

function FormInput({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: "user" | "mail" | "lock";
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute bg-black h-[48px] w-[352px] rounded-xl top-[7px] left-[6px]" />
      <div className="relative bg-white border-2 border-black rounded-xl h-[51.503px] w-[352.131px] flex items-center px-[18px]">
        <div className="mr-[15px]">
          {icon === "user" && <HiOutlineUser size={20} color="#161616" />}
          {icon === "mail" && <HiOutlineMail size={20} color="#161616" />}
          {icon === "lock" && <HiOutlineLockClosed size={20} color="#161616" />}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-[#979797] text-4 tracking-[-1.6px] placeholder:text-[#979797]"
        />
      </div>
    </div>
  );
}

function FormInputMobile({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: "user" | "mail" | "lock";
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative w-full">
      <div className="absolute bg-black h-[48px] w-full rounded-xl top-[7px] left-[6px]" />
      <div className="relative bg-white border-2 border-black rounded-xl h-[51.503px] w-full flex items-center px-[18px]">
        <div className="mr-[15px] flex-shrink-0">
          {icon === "user" && <HiOutlineUser size={20} color="#161616" />}
          {icon === "mail" && <HiOutlineMail size={20} color="#161616" />}
          {icon === "lock" && <HiOutlineLockClosed size={20} color="#161616" />}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-[#979797] text-4 tracking-[-1.6px] placeholder:text-[#979797]"
        />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return <FcGoogle size={24} />;
}

function GithubIcon() {
  return <FaGithub size={24} color="white" />;
}
