"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import {
  Check, Sparkles, ClipboardList, Code, BarChart3, Palette, Brain,
  Users, Megaphone, Camera, MessageCircle, Hash, Target,
} from "lucide-react";

import {
  DOMAINS,
  EMPTY_PERSONAL_DETAILS,
  EMPTY_TASK_SUBMISSION,
  PERSONAL_DETAILS_KEY,
  TASK_DRAFT_KEY,
  LOCALSTORAGE_KEY,
  PersonalDetailsData,
  TaskSubmissionData,
} from "@/app/Components/recruitment/constants";
import PersonalDetailsForm from "@/app/Components/recruitment/PersonalDetailsForm";
import TaskSubmissionForm from "@/app/Components/recruitment/TaskSubmissionForm";
import DomainBrief from "@/app/Components/recruitment/DomainBrief";
import SubmissionPreview from "@/app/Components/recruitment/SubmissionPreview";
import CountdownTimer, { getDeadlinePhase } from "@/app/Components/recruitment/CountdownTimer";
import Footer from "@/app/Components/Landing/Footer";

type Step = "form" | "preview";

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

  const [personal, setPersonal] = useState<PersonalDetailsData>(EMPTY_PERSONAL_DETAILS);
  const [task, setTask] = useState<TaskSubmissionData>(EMPTY_TASK_SUBMISSION);
  const [activeDomain, setActiveDomain] = useState<string>(DOMAINS[0].id);
  const [personalCollapsed, setPersonalCollapsed] = useState(false);
  const [taskCollapsed, setTaskCollapsed] = useState(true);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const [hasPersonal, setHasPersonal] = useState(false);
  const [submittedDomains, setSubmittedDomains] = useState<string[]>([]);
  const [config, setConfig] = useState<{ whatsapp_url: string; discord_url: string } | null>(null);

  const persistPersonal = useCallback((p: PersonalDetailsData) => {
    setPersonal(p);
    try {
      localStorage.setItem(PERSONAL_DETAILS_KEY, JSON.stringify(p));
    } catch {}
  }, []);

  const persistTask = useCallback(
    (t: TaskSubmissionData) => {
      setTask(t);
      try {
        localStorage.setItem(TASK_DRAFT_KEY, JSON.stringify({ ...t, domainId: activeDomain }));
      } catch {}
    },
    [activeDomain],
  );

  // ---- Load drafts (new keys + legacy combined key migration) ----
  // A ?domain= query param (from "View Task" cards) always wins over a saved draft.
  useEffect(() => {
    let queryDomain: string | null = null;
    try {
      const q = new URLSearchParams(window.location.search).get("domain");
      if (q && DOMAINS.some((d) => d.id === q)) queryDomain = q;
    } catch {}

    try {
      const legacy = localStorage.getItem(LOCALSTORAGE_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const { task_domain, task_links, task_details, ...rest } = parsed;
        if (!localStorage.getItem(PERSONAL_DETAILS_KEY)) {
          localStorage.setItem(PERSONAL_DETAILS_KEY, JSON.stringify(rest));
        }
        if (!localStorage.getItem(TASK_DRAFT_KEY) && task_domain) {
          localStorage.setItem(
            TASK_DRAFT_KEY,
            JSON.stringify({ task_domain, task_links, task_details }),
          );
        }
        localStorage.removeItem(LOCALSTORAGE_KEY);
      }

      const savedPersonal = localStorage.getItem(PERSONAL_DETAILS_KEY);
      if (savedPersonal) {
        const parsed = JSON.parse(savedPersonal) as PersonalDetailsData;
        setPersonal({ ...EMPTY_PERSONAL_DETAILS, ...parsed });
        if (parsed.name && parsed.email && parsed.phone) {
          setPersonalCollapsed(true);
          setTaskCollapsed(false);
        }
      }
      const savedTask = localStorage.getItem(TASK_DRAFT_KEY);
      if (queryDomain) {
        const qd = DOMAINS.find((d) => d.id === queryDomain)!;
        setActiveDomain(queryDomain);
        if (savedTask) {
          const parsed = JSON.parse(savedTask);
          const next = {
            task_domain: qd.name,
            task_links: parsed.task_links || [""],
            task_details: parsed.task_details || {},
          };
          setTask(next);
          try {
            localStorage.setItem(
              TASK_DRAFT_KEY,
              JSON.stringify({ ...parsed, ...next, domainId: queryDomain }),
            );
          } catch {}
        } else {
          const next = { ...EMPTY_TASK_SUBMISSION, task_domain: qd.name };
          setTask(next);
          try {
            localStorage.setItem(
              TASK_DRAFT_KEY,
              JSON.stringify({ ...next, domainId: queryDomain }),
            );
          } catch {}
        }
      } else if (savedTask) {
        const parsed = JSON.parse(savedTask);
        if (parsed.task_domain) {
          const dom = DOMAINS.find((d) => d.name === parsed.task_domain);
          if (dom) setActiveDomain(dom.id);
        }
        setTask({
          task_domain: parsed.task_domain || "",
          task_links: parsed.task_links || [""],
          task_details: parsed.task_details || {},
        });
        if (parsed.domainId) {
          setActiveDomain(parsed.domainId);
        }
      }
    } catch {}
  }, []);

  // ---- Load applicant + task submissions for logged-in user ----
  useEffect(() => {
    const loadExisting = async () => {
      const uid = await getCurrentUserId();
      if (!uid) return;

      const { data: applicant } = await supabase
        .from("recruitment_applicants")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (applicant) {
        setApplicantId(applicant.id);
        setHasPersonal(true);
        setPersonal((prev) => ({
          ...prev,
          name: applicant.name ?? prev.name,
          email: applicant.email ?? prev.email,
          phone: applicant.phone ?? prev.phone,
          year: applicant.year ?? prev.year,
          branch: applicant.branch ?? prev.branch,
          domain_pref_1: applicant.domain_pref_1 ?? prev.domain_pref_1,
          domain_pref_2: applicant.domain_pref_2 ?? prev.domain_pref_2,
          domain_pref_3: applicant.domain_pref_3 ?? prev.domain_pref_3,
          tech_domain: applicant.tech_domain ?? prev.tech_domain,
          socials_domain: applicant.socials_domain ?? prev.socials_domain,
          linkedin_url: applicant.linkedin_url ?? prev.linkedin_url,
          github_url: applicant.github_url ?? prev.github_url,
          codeforces_url: applicant.codeforces_url ?? prev.codeforces_url,
          codechef_url: applicant.codechef_url ?? prev.codechef_url,
          other_cp_url: applicant.other_cp_url ?? prev.other_cp_url,
          cgpa: applicant.cgpa != null ? String(applicant.cgpa) : prev.cgpa,
          resume_url: applicant.resume_url ?? prev.resume_url,
          motive: applicant.motive ?? prev.motive,
          value_addition: applicant.value_addition ?? prev.value_addition,
          projects: applicant.projects ?? prev.projects,
        }));
        setPersonalCollapsed(true);
        setTaskCollapsed(false);
      }

      const { data: tasks } = await supabase
        .from("recruitment_task_submissions")
        .select("task_domain")
        .eq("user_id", uid);

      if (tasks && tasks.length > 0) {
        setSubmittedDomains(tasks.map((t) => t.task_domain));
      }
    };
    loadExisting();
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

  // ---- Save personal details to recruitment_applicants (upsert) ----
  const onPersonalComplete = async () => {
    const uid = await getCurrentUserId();
    if (!uid) {
      localStorage.setItem(PERSONAL_DETAILS_KEY, JSON.stringify(personal));
      toast.info("Please log in to save your personal details");
      router.push(`/register?redirect=/recruitment/task`);
      return;
    }

    // Sync email/name with auth account
    const { data: userData } = await supabase
      .from("users")
      .select("email, name")
      .eq("id", uid)
      .single();

    const payload = { ...personal };
    if (userData?.email && userData.email !== payload.email) {
      payload.email = userData.email;
      toast.info("Email updated to match your logged-in account");
    }
    if (!payload.name && userData?.name) {
      payload.name = userData.name;
    }

    setSavingPersonal(true);
    try {
      const { data, error } = await supabase
        .from("recruitment_applicants")
        .upsert(
          [
            {
              user_id: uid,
              name: payload.name.trim(),
              email: payload.email.trim(),
              phone: payload.phone.trim(),
              year: payload.year,
              branch: payload.branch.trim(),
              domain_pref_1: payload.domain_pref_1,
              domain_pref_2: payload.domain_pref_2 || null,
              domain_pref_3: payload.domain_pref_3 || null,
              tech_domain: payload.tech_domain,
              socials_domain: payload.socials_domain,
              linkedin_url: payload.linkedin_url.trim(),
              github_url: payload.github_url?.trim() || null,
              codeforces_url: payload.codeforces_url.trim(),
              codechef_url: payload.codechef_url?.trim() || null,
              other_cp_url: payload.other_cp_url?.trim() || null,
              cgpa: payload.cgpa ? parseFloat(payload.cgpa) : null,
              resume_url: payload.resume_url,
              motive: payload.motive.trim(),
              value_addition: payload.value_addition.trim(),
              projects: payload.projects.trim(),
            },
          ],
          { onConflict: "user_id" },
        )
        .select("id")
        .single();

      if (error) throw error;

      persistPersonal(payload);
      setApplicantId(data.id);
      setHasPersonal(true);
      toast.success("Personal details saved. Now submit your task.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save personal details");
      return;
    } finally {
      setSavingPersonal(false);
    }

    const formsTop = formsRef.current
      ? formsRef.current.getBoundingClientRect().top + window.scrollY - 80
      : 0;

    setPersonalCollapsed(true);
    setTaskCollapsed(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: formsTop, behavior: "instant" as ScrollBehavior });
    });
  };

  // ---- When domain tab changes ----
  const handleDomainChange = (domainId: string) => {
    setActiveDomain(domainId);
    const domain = DOMAINS.find((d) => d.id === domainId);
    if (domain) {
      persistTask({ ...task, task_domain: domain.name });
    }
  };

  // ---- Handle "Review & Submit" from task form (gate on personal details) ----
  const handleReviewSubmit = async () => {
    if (!hasPersonal || !applicantId) {
      // Re-check DB in case applicant was created in another tab
      const uid = await getCurrentUserId();
      if (uid) {
        const { data } = await supabase
          .from("recruitment_applicants")
          .select("id")
          .eq("user_id", uid)
          .maybeSingle();
        if (data) {
          setApplicantId(data.id);
          setHasPersonal(true);
        } else {
          toast.error("Submit your personal details first");
          setPersonalCollapsed(false);
          setTaskCollapsed(true);
          return;
        }
      } else {
        try {
          localStorage.setItem(TASK_DRAFT_KEY, JSON.stringify(task));
        } catch {}
        toast.info("Please log in to submit your task");
        router.push(`/register?redirect=/recruitment/task`);
        return;
      }
    }

    const domain = DOMAINS.find((d) => d.id === activeDomain);
    const updatedTask = { ...task, task_domain: domain?.name || activeDomain || task.task_domain };

    const uid = await getCurrentUserId();
    if (!uid) {
      localStorage.setItem(TASK_DRAFT_KEY, JSON.stringify(updatedTask));
      toast.info("Please log in to submit your task");
      router.push(`/register?redirect=/recruitment/task`);
      return;
    }

    persistTask(updatedTask);
    setStep("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Final task submit to recruitment_task_submissions ----
  const handleFinalSubmit = async () => {
    // Block submission if deadline has passed
    if (getDeadlinePhase() === "closed") {
      toast.error("Submissions are closed. The deadline has passed.");
      return;
    }

    setSubmitting(true);

    try {
      const uid = await getCurrentUserId();
      if (!uid) {
        toast.error("Session expired. Please log in again.");
        router.push(`/register?redirect=/recruitment/task`);
        return;
      }

      // Gate: applicant row must exist
      let currentApplicantId = applicantId;
      if (!currentApplicantId) {
        const { data: applicant } = await supabase
          .from("recruitment_applicants")
          .select("id")
          .eq("user_id", uid)
          .maybeSingle();
        if (!applicant) {
          toast.error("Submit your personal details before submitting a task");
          setStep("form");
          setPersonalCollapsed(false);
          setTaskCollapsed(true);
          return;
        }
        currentApplicantId = applicant.id;
        setApplicantId(applicant.id);
        setHasPersonal(true);
      }

      const validLinks = task.task_links.filter((l) => l.trim());
      if (validLinks.length === 0) {
        toast.error("At least one task link is required");
        setStep("form");
        return;
      }

      const { error } = await supabase.from("recruitment_task_submissions").upsert(
        [
          {
            user_id: uid,
            applicant_id: currentApplicantId,
            task_domain: task.task_domain,
            task_links: validLinks,
            task_details: task.task_details || {},
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "user_id,task_domain" },
      );

      if (error) {
        toast.error(error.message || "Task submission failed");
        return;
      }

      localStorage.removeItem(TASK_DRAFT_KEY);
      setSubmittedDomains((prev) =>
        prev.includes(task.task_domain) ? prev : [...prev, task.task_domain],
      );
      toast.success("Task submitted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const alreadySubmittedActiveDomain = submittedDomains.includes(
    DOMAINS.find((d) => d.id === activeDomain)?.name || task.task_domain,
  );

  // ---- Submitted banner (inline — tasks stay visible regardless of submission) ----
  // (rendered in the form view below)

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
            personal={personal}
            task={task}
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
  const isClosed = getDeadlinePhase() === "closed";

  // ---- Closed gate ----
  if (isClosed && step === "form") {
    return (
      <div className="min-h-screen text-black selection:bg-[#4285F4] selection:text-white">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-2xl mx-auto px-4 py-20 md:py-32 text-center">
          <CountdownTimer />
          <div className="mt-8">
            <Link
              href="/recruitment"
              className={nb({
                border: 4,
                shadow: "lg",
                hover: "lift",
                className: "inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-sm",
              })}
            >
              ← Back to Recruitment
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            Step 1: save your personal details. Step 2: submit your domain task.
          </p>
          {hasPersonal && (
            <p className="font-mono text-xs text-green-700 mt-1 flex items-center gap-1">
              <Check size={14} /> Personal details saved — task submission unlocked
            </p>
          )}

          {/* Compact Countdown Timer */}
          <div className="mt-4">
            <CountdownTimer compact />
          </div>

          <NeoBrutalism
            border={3}
            shadow="md"
            className="mt-5 flex items-start gap-3 bg-[#FFF4D6] px-4 py-3 max-w-3xl"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-[#FBBC04]">
              <Target size={18} strokeWidth={2.75} />
            </span>
            <p className="text-sm md:text-base leading-relaxed text-gray-900">
              <strong className="font-black">Focus on the task for your first-preference domain.</strong>{" "}
              Only attempt tasks from other domains if you have sufficient time left.
            </p>
          </NeoBrutalism>
        </motion.div>

        {/* Submitted banner — always visible alongside tasks once submitted */}
        {submittedDomains.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <NeoBrutalism border={3} shadow="lg" className="bg-[#34A853] text-white p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-white bg-black/20">
                  <Sparkles size={24} />
                </span>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight font-retron mb-1">
                    Task Submitted!
                  </h2>
                  <p className="font-mono text-xs md:text-sm text-white/90 mb-4">
                    Submitted for: <strong>{submittedDomains.join(", ")}</strong>.
                    Shortlisted candidates will be contacted for interviews. You can still browse
                    all tasks below and submit for other domains.
                  </p>
                  <p className="font-bold text-[11px] uppercase tracking-wider text-white/70 mb-2">
                    Join our community — it&apos;s mandatory
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
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
                            "flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 font-bold text-xs",
                        })}
                      >
                        <MessageCircle size={16} />
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
                            "flex items-center justify-center gap-2 bg-[#5865F2] text-white px-5 py-2.5 font-bold text-xs",
                        })}
                      >
                        <Hash size={16} />
                        Join Discord Server
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </NeoBrutalism>
          </motion.div>
        )}

        {/* Domain Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {DOMAINS.map((domain) => {
              const submitted = submittedDomains.includes(domain.name);
              return (
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
                  {submitted && <Check size={14} strokeWidth={3} />}
                </button>
              );
            })}
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
            {alreadySubmittedActiveDomain && (
              <div className="mb-3 inline-flex items-center gap-1.5 bg-green-100 border-[3px] border-green-600 text-green-800 px-3 py-1.5 font-mono text-[11px] font-bold uppercase">
                <Check size={12} /> Submitted for {activeDomainData?.name} — resubmitting will update it
              </div>
            )}
            {activeDomainData && <DomainBrief domain={activeDomainData} />}
          </motion.div>
        </AnimatePresence>

        {/* Forms */}
        <div className="space-y-6" ref={formsRef}>
          {/* Personal Details — Step 1, saved to recruitment_applicants */}
          <PersonalDetailsForm
            form={personal}
            setForm={persistPersonal}
            collapsed={personalCollapsed}
            onToggle={() => setPersonalCollapsed(!personalCollapsed)}
            onComplete={onPersonalComplete}
            saving={savingPersonal}
            alreadySaved={hasPersonal}
          />

          {/* Task Submission — Step 2, gated on personal details */}
          <div ref={taskFormRef}>
            <TaskSubmissionForm
              form={task}
              setForm={persistTask}
              collapsed={taskCollapsed}
              onToggle={() => setTaskCollapsed(!taskCollapsed)}
              onSubmit={handleReviewSubmit}
              submitting={submitting}
              personalSubmitted={hasPersonal}
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
