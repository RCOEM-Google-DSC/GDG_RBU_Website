"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { formSchema, type FormData } from "../schema";
import { STEPS } from "../constants";
import type { Portfolio } from "@/lib/types";

interface UsePortfolioFormProps {
  existingPortfolio?: Portfolio;
  userId: string;
}

export function usePortfolioForm({
  existingPortfolio,
  userId,
}: UsePortfolioFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = React.useState(false);

  // Transform existing portfolio data to convert null to undefined for form compatibility
  const transformedProjects =
    existingPortfolio?.projects?.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      image_url: p.image_url ?? "",
      github_url: p.github_url ?? "",
      live_url: p.live_url ?? "",
      technologies: p.technologies ?? [],
    })) ?? [];

  const transformedExperience =
    existingPortfolio?.experience?.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      description: e.description ?? "",
      start_date: e.start_date,
      end_date: e.end_date ?? "",
      is_current: e.is_current,
    })) ?? [];

  const transformedSocialLinks =
    existingPortfolio?.social_links?.map((s) => ({
      id: s.id,
      platform: s.platform,
      url: s.url,
    })) ?? [];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolio: {
        template_id: existingPortfolio?.template_id ?? "",
        display_name: existingPortfolio?.display_name ?? "",
        profile_image_url: existingPortfolio?.profile_image_url ?? "",
        about_me: existingPortfolio?.about_me ?? "",
        languages: existingPortfolio?.languages ?? [],
        frameworks: existingPortfolio?.frameworks ?? [],
        tools: existingPortfolio?.tools ?? [],
        is_published: existingPortfolio?.is_published ?? false,
      },
      projects: transformedProjects,
      experience: transformedExperience,
      social_links: transformedSocialLinks,
    },
  });

  const projectsFieldArray = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const experienceFieldArray = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const socialLinksFieldArray = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    try {
      const data = form.getValues();

      // Save/update portfolio
      const portfolioMethod = existingPortfolio ? "PUT" : "POST";
      const portfolioRes = await fetch("/api/portfolio", {
        method: portfolioMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data.portfolio,
          is_published: publish,
        }),
      });

      if (!portfolioRes.ok) {
        const error = await portfolioRes.json();
        throw new Error(error.error || "Failed to save portfolio");
      }

      // Save projects
      for (const project of data.projects) {
        if (project.id) {
          await fetch(`/api/portfolio/projects/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
          });
        } else {
          await fetch("/api/portfolio/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
          });
        }
      }

      // Save experience
      for (const exp of data.experience) {
        if (exp.id) {
          await fetch(`/api/portfolio/experience/${exp.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exp),
          });
        } else {
          await fetch("/api/portfolio/experience", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exp),
          });
        }
      }

      // Save social links
      for (const link of data.social_links) {
        if (link.id) {
          await fetch(`/api/portfolio/social-links/${link.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(link),
          });
        } else {
          await fetch("/api/portfolio/social-links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(link),
          });
        }
      }

      toast.success(publish ? "Portfolio published!" : "Portfolio saved!");

      if (publish) {
        const templateId = data.portfolio.template_id;
        router.push(`/${templateId}/${userId}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = async () => {
    const formData = form.getValues();
    if (!formData.portfolio.template_id) {
      toast.error("Please select a template first");
      return;
    }

    try {
      // Serialize form data and open in new tab
      const dataStr = encodeURIComponent(JSON.stringify(formData));
      window.open(`/portfolio-preview/${formData.portfolio.template_id}?data=${dataStr}`, "_blank");
    } catch (error) {
      console.error("Preview error:", error);
      toast.error("Failed to generate preview");
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const usedPlatforms = form.watch("social_links").map((l) => l.platform);

  return {
    form,
    currentStep,
    setCurrentStep,
    isSaving,
    isGeneratingPreview,
    handleSave,
    handlePreview,
    nextStep,
    prevStep,
    usedPlatforms,
    projectsFieldArray,
    experienceFieldArray,
    socialLinksFieldArray,
  };
}
