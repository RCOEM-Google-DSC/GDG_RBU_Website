"use client";
import { motion, AnimatePresence } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { ClipboardList } from "lucide-react";
import { BiLogIn } from "react-icons/bi";
import { svgPaths } from "@/lib/svg/svg";

interface AuthFormProps {
  isLogin: boolean;
  toggleForm: () => void;
  handleSignup: (e: React.FormEvent) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleOAuthLogin: (provider: "google" | "github") => void;
  signupData: { username: string; email: string; password: string };
  setSignupData: (data: any) => void;
  loginData: { email: string; password: string };
  setLoginData: (data: any) => void;
  loading: boolean;
}

interface FormProps {
  onToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
  data: any;
  setData: (data: any) => void;
  loading: boolean;
  onOAuth: (provider: "google" | "github") => void;
}

export function AuthForm({
  isLogin,
  toggleForm,
  handleSignup,
  handleLogin,
  handleOAuthLogin,
  signupData,
  setSignupData,
  loginData,
  setLoginData,
  loading,
}: AuthFormProps) {
  return (
    <div className="bg-[#fdfcf8] min-h-screen w-full overflow-hidden relative">
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
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1441 1434"
          >
            <path d={svgPaths.p32db1280} stroke="url(#paint0_radial)" />
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
      login: { left: 1329, top: -215 },
    },
    {
      color: "#ffd23d",
      signup: { left: -250, top: 450 },
      login: { left: 1355, top: -288 },
    },
    {
      color: "#4284ff",
      signup: { left: -313, top: 430 },
      login: { left: 1261, top: -259 },
    },
    {
      color: "#08ef69",
      signup: { left: -387, top: 420 },
      login: { left: 1282, top: -328 },
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
      login: { left: -223, top: 20 },
    },
    {
      color: "#57a6ff",
      signup: { left: 1032, top: 200 },
      login: { left: -333, top: 200 },
    },
    {
      color: "#ffca38",
      signup: { left: 912, top: 380 },
      login: { left: -79, top: 380 },
    },
    {
      color: "#00f566",
      signup: { left: 811, top: 500 },
      login: { left: -144, top: 500 },
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
      login: { left: 250, top: 0 },
    },
    {
      color: "#ffd23d",
      signup: { left: -270, top: 450 },
      login: { left: 250, top: -60 },
    },
    {
      color: "#4284ff",
      signup: { left: -313, top: 430 },
      login: { left: 220, top: -100 },
    },
    {
      color: "#08ef69",
      signup: { left: -370, top: 420 },
      login: { left: 150, top: -100 },
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

function SignUpForm({
  onToggle,
  onSubmit,
  data,
  setData,
  loading,
  onOAuth,
}: FormProps) {
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
      <form
        onSubmit={onSubmit}
        className="relative bg-white border-[3px] border-black border-solid rounded-xl h-[440px] w-[420px] px-6 py-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-[32px] flex items-center mb-0.5">
            <ClipboardList className="size-8" /> SIGN UP
          </h1>
          <p className="text-[#9c9c9c] text-sm mb-3">
            Get started with GDG RBU
          </p>
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
                <path
                  d="M1 8h14M8 1l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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

function LoginForm({
  onToggle,
  onSubmit,
  data,
  setData,
  loading,
  onOAuth,
}: FormProps) {
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
      <form
        onSubmit={onSubmit}
        className="relative bg-white border-[3px] border-black border-solid rounded-xl h-[440px] w-[420px] px-[24px] py-[18px]"
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-[32px] mb-0.5 flex items-center">
            <BiLogIn className="size-10" /> LOGIN
          </h1>
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
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M8 5l3 3-3 3M11 8H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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

function SignUpFormMobile({
  onToggle,
  onSubmit,
  data,
  setData,
  loading,
  onOAuth,
}: FormProps) {
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
        <form
          onSubmit={onSubmit}
          className="relative bg-white border-[3px] border-black border-solid rounded-xl w-full px-6 sm:px-[28px] py-6 sm:py-[27px]"
        >
          {/* Header */}
          <div className="mb-6 sm:mb-[25px]">
            <h1 className="text-[32px] sm:text-[40px] flex items-center mb-0.5">
              {" "}
              <ClipboardList className="size-8" /> SIGN UP
            </h1>
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
            <span className="mx-4 text-center text-xl sm:text-left tracking-[-1.5px]">
              or
            </span>
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

function LoginFormMobile({
  onToggle,
  onSubmit,
  data,
  setData,
  loading,
  onOAuth,
}: FormProps) {
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
        <form
          onSubmit={onSubmit}
          className="relative bg-white border-[3px] border-black border-solid rounded-xl w-full px-6 sm:px-[28px] py-6 sm:py-[27px]"
        >
          {/* Header */}
          <div className="mb-6 sm:mb-[25px]">
            <h1 className="text-[32px] sm:text-[40px] flex items-center mb-0.5">
              {" "}
              <BiLogIn className="size-10" /> LOGIN
            </h1>
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
            <span className="mx-4 text-center text-xl sm:text-left tracking-[-1.5px]">
              or
            </span>
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
