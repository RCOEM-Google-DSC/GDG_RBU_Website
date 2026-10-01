"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import {
  Check, Sparkles, ClipboardList, Code, BarChart3, Palette, Brain,
  Users, Megaphone, Camera, MessageCircle, Hash,
} from "lucide-react";

import {
  DOMAINS,
  EMPTY_FORM,
  LOCALSTORAGE_KEY,
  RecruitmentFormData,
} from "@/app/Components/recruitment/constants";
import PersonalDetailsForm from "@/app/Components/recruitment/PersonalDetailsForm";
import TaskSubmissionForm from "@/app/Components/recruitment/TaskSubmissionForm";
import SubmissionPreview from "@/app/Components/recruitment/SubmissionPreview";
import Footer from "@/app/Components/Landing/Footer";

type Step = "form" | "preview" | "success";

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  "web-dev": <Code size={20} strokeWidth={2.5} />,
  cp: <BarChart3 size={20} strokeWidth={2.5} />,
  design: <Palette size={20} strokeWidth={2.5} />,
  mac: <Brain size={20} strokeWidth={2.5} />,
  management: <Users size={20} strokeWidth={2.5} />,
  marketing: <Megaphone size={20} strokeWidth={2.5} />,
  socials: <Camera size={20} strokeWidth={2.5} />,
};

export default function TaskPage() {
  const router = useRouter();
  const taskFormRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<RecruitmentFormData>(EMPTY_FORM);
  const [activeDomain, setActiveDomain] = useState<string>(DOMAINS[0].id);
  const [personalCollapsed, setPersonalCollapsed] = useState(false);
  const [taskCollapsed, setTaskCollapsed] = useState(true);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [config, setConfig] = useState<{ whatsapp_url: string; discord_url: string } | null>(null);

  // ---- Load draft from localStorage on mount ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALSTORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RecruitmentFormData;
        setForm(parsed);
        if (parsed.task_domain) {
          const dom = DOMAINS.find((d) => d.name === parsed.task_domain);
          if (dom) setActiveDomain(dom.id);
        }
        if (parsed.name && parsed.email && parsed.phone) {
          setPersonalCollapsed(true);
          setTaskCollapsed(false);
        }
        toast.info("Your draft has been restored");
      }
    } catch {}
  }, []);

  // ---- Check if user already submitted ----
  useEffect(() => {
    const checkExisting = async () => {
      const uid = await getCurrentUserId();
      if (!uid) return;

      const { data } = await supabase
        .from("recruitment_submissions")
        .select("id")
        .eq("user_id", uid)
        .maybeSingle();

      if (data) {
        setAlreadySubmitted(true);
      }
    };
    checkExisting();
  }, []);

  // ---- Fetch recruitment config (WhatsApp + Discord links) ----
  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("recruitment_config")
        .select("whatsapp_url, discord_url")
        .eq("is_active", true)
        .maybeSingle();
      if (data) setConfig(data);
    };
    fetchConfig();
  }, []);

  // ---- Persist form to localStorage on change ----
  const persistForm = useCallback((f: RecruitmentFormData) => {
    setForm(f);
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(f));
    } catch {}
  }, []);

  // ---- When personal details complete, collapse and scroll to task form ----
  const onPersonalComplete = () => {
    // Calculate the target scroll position BEFORE collapsing
    const formsTop = formsRef.current
      ? formsRef.current.getBoundingClientRect().top + window.scrollY - 80
      : 0;

    setPersonalCollapsed(true);
    setTaskCollapsed(false);

    // Instantly jump to the forms section so there's no visible jump
    requestAnimationFrame(() => {
      window.scrollTo({ top: formsTop, behavior: "instant" as ScrollBehavior });
    });
  };

  // ---- When domain tab changes ----
  const handleDomainChange = (domainId: string) => {
    setActiveDomain(domainId);
    const domain = DOMAINS.find((d) => d.id === domainId);
    if (domain) {
      persistForm({ ...form, task_domain: domain.name });
    }
  };

  // ---- Handle "Review & Submit" from task form ----
  const handleReviewSubmit = async () => {
    const domain = DOMAINS.find((d) => d.id === activeDomain);
    const updatedForm = { ...form, task_domain: domain?.name || activeDomain };

    // Check login
    const uid = await getCurrentUserId();

    if (!uid) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedForm));
      toast.info("Please log in to submit your application");
      router.push(`/register?redirect=/recruitment/task`);
      return;
    }

    // Get logged-in email and override form email
    const { data: userData } = await supabase
      .from("users")
      .select("email, name")
      .eq("id", uid)
      .single();

    if (userData?.email && userData.email !== updatedForm.email) {
      updatedForm.email = userData.email;
      toast.info("Email updated to match your logged-in account");
    }

    if (!updatedForm.name && userData?.name) {
      updatedForm.name = userData.name;
    }

    persistForm(updatedForm);
    setStep("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Final submit to Supabase ----
  const handleFinalSubmit = async () => {
    setSubmitting(true);

    try {
      const uid = await getCurrentUserId();
      if (!uid) {
        toast.error("Session expired. Please log in again.");
        router.push(`/register?redirect=/recruitment/task`);
        return;
      }

      const validLinks = form.task_links.filter((l) => l.trim());

      const { error } = await supabase.from("recruitment_submissions").insert([
        {
          user_id: uid,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          year: form.year,
          branch: form.branch.trim(),
          domain_pref_1: form.domain_pref_1,
          domain_pref_2: form.domain_pref_2 || null,
          domain_pref_3: form.domain_pref_3 || null,
          tech_domain: form.tech_domain,
          socials_domain: form.socials_domain,
          linkedin_url: form.linkedin_url.trim(),
          github_url: form.github_url?.trim() || null,
          codeforces_url: form.codeforces_url.trim(),
          codechef_url: form.codechef_url?.trim() || null,
          other_cp_url: form.other_cp_url?.trim() || null,
          cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
          resume_url: form.resume_url,
          motive: form.motive.trim(),
          value_addition: form.value_addition.trim(),
          projects: form.projects.trim(),
          task_domain: form.task_domain,
          task_links: validLinks,
          task_details: form.task_details || {},
        },
      ]);

      if (error) {
        if (error.message?.includes("unique") || error.message?.includes("duplicate")) {
          toast.error("You have already submitted an application");
          setAlreadySubmitted(true);
        } else {
          toast.error(error.message || "Submission failed");
        }
        return;
      }

      localStorage.removeItem(LOCALSTORAGE_KEY);
      toast.success("Application submitted successfully!");
      setStep("success");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Already submitted view ----
  if (alreadySubmitted && step !== "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <NeoBrutalism border={4} shadow="xl" className="bg-white p-8 md:p-12 text-center max-w-md">
          <Check size={48} className="mx-auto mb-4 text-[#34A853]" />
          <h2 className="text-2xl font-black uppercase mb-2">Already Submitted</h2>
          <p className="font-mono text-sm text-gray-600 mb-6">
            You have already submitted your recruitment application. We&apos;ll get back to you soon!
          </p>
          <button
            onClick={() => router.push("/")}
            className={nb({
              border: 3,
              shadow: "md",
              hover: "lift",
              className: "bg-black text-white px-6 py-3 font-bold text-sm",
            })}
          >
            Go Home
          </button>
        </NeoBrutalism>
      </div>
    );
  }

  // ---- Success view ----
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NeoBrutalism border={4} shadow="xl" className="bg-[#34A853] text-white p-8 md:p-12 text-center max-w-lg">
            <Sparkles size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-black uppercase mb-2 font-retron">You&apos;re In!</h2>
            <p className="font-mono text-sm text-white/90 mb-8">
              Your application has been submitted. Shortlisted candidates will be contacted for interviews. Best of luck!
            </p>

            {/* Mandatory community links */}
            <div className="space-y-3 mb-8">
              <p className="font-bold text-xs uppercase tracking-wider text-white/70 mb-3">
                Join our community — it&apos;s mandatory
              </p>
              {config?.whatsapp_url && (
                <a
                  href={config.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={nb({
                    border: 3,
                    shadow: "md",
                    hover: "lift",
                    active: "push",
                    className:
                      "w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3 font-bold text-sm",
                  })}
                >
                  <MessageCircle size={18} />
                  Join WhatsApp Group
                </a>
              )}
              {config?.discord_url && (
                <a
                  href={config.discord_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={nb({
                    border: 3,
                    shadow: "md",
                    hover: "lift",
                    active: "push",
                    className:
                      "w-full flex items-center justify-center gap-3 bg-[#5865F2] text-white px-6 py-3 font-bold text-sm",
                  })}
                >
                  <Hash size={18} />
                  Join Discord Server
                </a>
              )}
            </div>

            <button
              onClick={() => router.push("/")}
              className={nb({
                border: 3,
                shadow: "md",
                hover: "lift",
                className: "bg-white text-black px-6 py-3 font-bold text-sm",
              })}
            >
              Go Home
            </button>
          </NeoBrutalism>
        </motion.div>
      </div>
    );
  }

  // ---- Preview step ----
  if (step === "preview") {
    return (
      <div className="min-h-screen text-black">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <SubmissionPreview
            form={form}
            onBack={() => setStep("form")}
            onConfirm={handleFinalSubmit}
            submitting={submitting}
          />
        </div>
      </div>
    );
  }

  // ---- Main form step ----
  const activeDomainData = DOMAINS.find((d) => d.id === activeDomain);

  return (
    <div className="min-h-screen text-black selection:bg-[#4285F4] selection:text-white">
      {/* Background grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <NeoBrutalism border={3} shadow="md" className="inline-block bg-[#FBBC04] px-4 py-2 mb-4">
            <span className="font-black text-xs tracking-widest uppercase flex items-center gap-2">
              <ClipboardList size={14} strokeWidth={3} />
              Task Submission
            </span>
          </NeoBrutalism>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-retron">
            Choose Your Domain & Submit
          </h1>
          <p className="font-mono text-sm text-gray-600 mt-2">
            Select a domain, view the task, fill your details, and submit your work.
          </p>
        </motion.div>

        {/* Domain Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => handleDomainChange(domain.id)}
                className={nb({
                  border: 3,
                  shadow: activeDomain === domain.id ? "md" : "sm",
                  active: "push",
                  className: `flex items-center gap-2 px-4 py-2.5 font-black text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                    activeDomain === domain.id
                      ? "text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`,
                })}
                style={
                  activeDomain === domain.id
                    ? { backgroundColor: domain.color }
                    : undefined
                }
              >
                {DOMAIN_ICONS[domain.id]}
                {domain.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Task Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mb-8"
          >
            <NeoBrutalism border={3} shadow="lg" className="bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{
                    backgroundColor: activeDomainData?.color,
                    border: "2px solid black",
                  }}
                >
                  {DOMAIN_ICONS[activeDomain]}
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    {activeDomainData?.name}
                  </h2>
                  <p className="font-mono text-xs text-gray-500">Task Details</p>
                </div>
              </div>

              {activeDomainData?.tasks.map((task, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h3 className="font-bold text-sm mb-1">{task.title}</h3>
                  <p className="font-mono text-xs text-gray-600">{task.description}</p>
                </div>
              ))}
            </NeoBrutalism>
          </motion.div>
        </AnimatePresence>

        {/* Forms */}
        <div className="space-y-6" ref={formsRef}>
          {/* Personal Details */}
          <PersonalDetailsForm
            form={form}
            setForm={persistForm}
            collapsed={personalCollapsed}
            onToggle={() => setPersonalCollapsed(!personalCollapsed)}
            onComplete={onPersonalComplete}
          />

          {/* Task Submission — scroll target */}
          <div ref={taskFormRef}>
            <TaskSubmissionForm
              form={form}
              setForm={persistForm}
              collapsed={taskCollapsed}
              onToggle={() => {
                if (taskCollapsed && !form.name) {
                  toast.error("Fill personal details first");
                  return;
                }
                setTaskCollapsed(!taskCollapsed);
              }}
              onSubmit={handleReviewSubmit}
              submitting={submitting}
            />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
