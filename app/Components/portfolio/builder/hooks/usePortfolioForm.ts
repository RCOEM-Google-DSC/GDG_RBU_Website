"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { formSchema, type FormData } from "../helpers/schema";
import { STEPS } from "../helpers/constants";
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
  const [showPublishDialog, setShowPublishDialog] = React.useState(false);
  const [isPendingPublish, setIsPendingPublish] = React.useState(false);

  const [activePortfolioId, setActivePortfolioId] = React.useState<
    string | undefined
  >(existingPortfolio?.id);


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

  const checkPublishedAndSave = async () => {
    try {
      // If we're publishing, check if there's another one already published
      const res = await fetch("/api/portfolio");
      const { portfolio } = await res.json();

      // If there is a portfolio and it's published, and it's not the one we're editing
      if (
        portfolio &&
        portfolio.is_published &&
        portfolio.id !== activePortfolioId
      ) {
        setShowPublishDialog(true);
      } else {
        await handleSave(true);
      }
    } catch (error) {
      console.error("Error checking published status:", error);
      await handleSave(true); // Fallback to normal save
    }
  };

  const handleSave = async (publish: boolean = false) => {
    // Trigger validation
    const isValid = await form.trigger();
    if (!isValid) {
      if (publish) {
        toast.error("Please fix the errors in the form before publishing.");
        return;
      } else {
        toast.error(
          "Some fields have errors, but progress will be saved where possible.",
        );
      }
    }

    setIsSaving(true);
    try {
      const data = form.getValues();

      // Fetch current state to handle deletions
      let currentPortfolio = null;
      if (activePortfolioId) {
        const res = await fetch(`/api/portfolio?id=${activePortfolioId}`);
        if (res.ok) {
          const json = await res.json();
          currentPortfolio = json.portfolio;
        }
      }

      // Save/update portfolio
      const portfolioMethod = activePortfolioId ? "PUT" : "POST";
      const portfolioRes = await fetch("/api/portfolio", {
        method: portfolioMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data.portfolio,
          id: activePortfolioId,
          is_published: publish,
        }),
      });

      if (!portfolioRes.ok) {
        const error = await portfolioRes.json();
        throw new Error(error.error || "Failed to save portfolio");
      }

      const { portfolio: savedPortfolio } = await portfolioRes.json();
      const portfolioId = savedPortfolio.id;
      setActivePortfolioId(portfolioId);

      // Handle project deletions
      if (currentPortfolio?.projects) {
        const currentIds = data.projects.map((p) => p.id).filter(Boolean);
        const toDelete = currentPortfolio.projects.filter(
          (p: any) => !currentIds.includes(p.id),
        );
        for (const p of toDelete) {
          await fetch(`/api/portfolio/projects/${p.id}`, { method: "DELETE" });
        }
      }

      // Save projects
      for (let i = 0; i < data.projects.length; i++) {
        const project = data.projects[i];
        const projectData = {
          ...project,
          portfolio_id: portfolioId,
          display_order: i + 1,
        };
        const res = project.id
          ? await fetch(`/api/portfolio/projects/${project.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(projectData),
            })
          : await fetch("/api/portfolio/projects", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(projectData),
            });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          const errMsg = err.error || "Unknown error";
          console.error(`Project save error (${res.status}):`, errMsg);
          toast.error(`Failed to save project: ${errMsg}`);
        }
      }

      // Handle experience deletions
      if (currentPortfolio?.experience) {
        const currentIds = data.experience.map((e) => e.id).filter(Boolean);
        const toDelete = currentPortfolio.experience.filter(
          (e: any) => !currentIds.includes(e.id),
        );
        for (const e of toDelete) {
          await fetch(`/api/portfolio/experience/${e.id}`, {
            method: "DELETE",
          });
        }
      }

      // Save experience
      for (let i = 0; i < data.experience.length; i++) {
        const exp = data.experience[i];
        const expData = {
          ...exp,
          portfolio_id: portfolioId,
          display_order: i + 1,
        };
        const res = exp.id
          ? await fetch(`/api/portfolio/experience/${exp.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(expData),
            })
          : await fetch("/api/portfolio/experience", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(expData),
            });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          const errMsg = err.error || "Unknown error";
          console.error(`Experience save error (${res.status}):`, errMsg);
          toast.error(`Failed to save experience: ${errMsg}`);
        }
      }

      // Handle social link deletions
      if (currentPortfolio?.social_links) {
        const currentIds = data.social_links.map((s) => s.id).filter(Boolean);
        const toDelete = currentPortfolio.social_links.filter(
          (s: any) => !currentIds.includes(s.id),
        );
        for (const s of toDelete) {
          await fetch(`/api/portfolio/social-links/${s.id}`, {
            method: "DELETE",
          });
        }
      }

      // Save social links
      for (let i = 0; i < data.social_links.length; i++) {
        const link = data.social_links[i];
        const linkData = {
          ...link,
          portfolio_id: portfolioId,
          display_order: i + 1,
        };
        const res = link.id
          ? await fetch(`/api/portfolio/social-links/${link.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(linkData),
            })
          : await fetch("/api/portfolio/social-links", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(linkData),
            });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          const errMsg = err.error || "Unknown error";
          console.error(`Social link save error (${res.status}):`, errMsg);
          toast.error(`Failed to save social link: ${errMsg}`);
        }
      }

      toast.success(publish ? "Portfolio published!" : "Portfolio saved!");

      // Fetch the updated portfolio using the specific ID to get new IDs for projects/experience/social_links
      const refreshRes = await fetch(`/api/portfolio?id=${portfolioId}`);
      if (refreshRes.ok) {
        const { portfolio: refreshedPortfolio } = await refreshRes.json();
        if (refreshedPortfolio) {
          // Update projects with new IDs using a safe merge
          if (refreshedPortfolio.projects) {
            const currentProjects = form.getValues("projects");
            const updatedProjects = currentProjects.map((p, idx) => {
              // Try to find matching project from DB to get its ID
              const saved = refreshedPortfolio.projects.find(
                (sp: any) =>
                  (p.id && sp.id === p.id) ||
                  (sp.title === p.title && sp.display_order === idx + 1),
              );
              return saved
                ? {
                    ...p,
                    id: saved.id,
                    description: saved.description ?? p.description,
                    image_url: saved.image_url ?? p.image_url,
                  }
                : p;
            });
            form.setValue("projects", updatedProjects);
          }

          // Update experience with new IDs using a safe merge
          if (refreshedPortfolio.experience) {
            const currentExp = form.getValues("experience");
            const updatedExp = currentExp.map((e, idx) => {
              const saved = refreshedPortfolio.experience.find(
                (se: any) =>
                  (e.id && se.id === e.id) ||
                  (se.company === e.company && se.display_order === idx + 1),
              );
              return saved ? { ...e, id: saved.id } : e;
            });
            form.setValue("experience", updatedExp);
          }

          // Update social links with new IDs using a safe merge
          if (refreshedPortfolio.social_links) {
            const currentLinks = form.getValues("social_links");
            const updatedLinks = currentLinks.map((l) => {
              const saved = refreshedPortfolio.social_links.find(
                (sl: any) => (l.id && sl.id === l.id) || sl.platform === l.platform,
              );
              return saved ? { ...l, id: saved.id } : l;
            });
            form.setValue("social_links", updatedLinks);
          }
        }
      }

      if (publish) {
        const templateId = data.portfolio.template_id;
        router.push(`/${templateId}/${userId}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
      setShowPublishDialog(false);
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
      window.open(
        `/portfolio-preview/${formData.portfolio.template_id}?data=${dataStr}`,
        "_blank",
      );
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
    showPublishDialog,
    setShowPublishDialog,
    handleSave,
    checkPublishedAndSave,
    handlePreview,
    nextStep,
    prevStep,
    usedPlatforms,
    projectsFieldArray,
    experienceFieldArray,
    socialLinksFieldArray,
  };
}
