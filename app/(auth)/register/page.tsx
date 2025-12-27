"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/supabase/supabase";
import { AuthForm } from "@/app/Components/Auth/AuthForm";
export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
        toast.success("Welcome back! Redirecting...");
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
        provider: provider,
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
    <AuthForm
      isLogin={isLogin}
      toggleForm={toggleForm}
      handleSignup={handleSignup}
      handleLogin={handleLogin}
      handleOAuthLogin={handleOAuthLogin}
      signupData={signupData}
      setSignupData={setSignupData}
      loginData={loginData}
      setLoginData={setLoginData}
      loading={loading}
    />
  );
}
