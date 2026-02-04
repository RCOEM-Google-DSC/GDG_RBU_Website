"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// Transformers
import {
  transformToArchitectural,
  transformToSoft,
  transformToMagazine,
  transformToMinimalistGrid,
  transformToHyunBarng,
} from "@/lib/portfolio-transformers";

// Template Components
import { Header as ArchHeader } from "@/app/(portfolio)/architectural/components/Header";
import { Hero as ArchHero } from "@/app/(portfolio)/architectural/components/Hero";
import { Skills as ArchSkills } from "@/app/(portfolio)/architectural/components/Skills";
import { Projects as ArchProjects } from "@/app/(portfolio)/architectural/components/Projects";
import { Experience as ArchExperience } from "@/app/(portfolio)/architectural/components/Experience";
import { Footer as ArchFooter } from "@/app/(portfolio)/architectural/components/Footer";

import SoftHeader from "@/app/(portfolio)/soft/components/Header";
import SoftHero from "@/app/(portfolio)/soft/components/Hero";
import SoftSkills from "@/app/(portfolio)/soft/components/Skills";
import SoftProjects from "@/app/(portfolio)/soft/components/Projects";
import SoftExperience from "@/app/(portfolio)/soft/components/Experience";
import SoftFooter from "@/app/(portfolio)/soft/components/Footer";

import MagHeader from "@/app/(portfolio)/magazine/components/Header";
import MagHero from "@/app/(portfolio)/magazine/components/Hero";
import MagSkills from "@/app/(portfolio)/magazine/components/Skills";
import MagWork from "@/app/(portfolio)/magazine/components/Work";
import MagExperience from "@/app/(portfolio)/magazine/components/Experience";
import MagFooter from "@/app/(portfolio)/magazine/components/Footer";

import { Header as MinHeader } from "@/app/(portfolio)/minimalist-grid/components/Header";
import { Hero as MinHero } from "@/app/(portfolio)/minimalist-grid/components/Hero";
import { Skills as MinSkills } from "@/app/(portfolio)/minimalist-grid/components/Skills";
import { Projects as MinProjects } from "@/app/(portfolio)/minimalist-grid/components/Projects";
import { Experience as MinExperience } from "@/app/(portfolio)/minimalist-grid/components/Experience";
import { Footer as MinFooter } from "@/app/(portfolio)/minimalist-grid/components/Footer";

import { Navbar as HyunNav } from "@/app/(portfolio)/hyun-barng/components/Navbar";
import { Hero as HyunHero } from "@/app/(portfolio)/hyun-barng/components/Hero";
import { Skills as HyunSkills } from "@/app/(portfolio)/hyun-barng/components/Skills";
import { Projects as HyunProjects } from "@/app/(portfolio)/hyun-barng/components/Projects";
import { Experience as HyunExperience } from "@/app/(portfolio)/hyun-barng/components/Experience";
import { Footer as HyunFooter } from "@/app/(portfolio)/hyun-barng/components/Footer";

export default function PortfolioPreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const templateId = params.templateId as string;

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        setFormData(JSON.parse(decodeURIComponent(dataParam)));
      } catch (e) {
        console.error("Failed to parse preview data", e);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  if (!formData) {
    return <div className="p-10 text-center">No preview data found</div>;
  }

  // Render Template based on templateId
  switch (templateId) {
    case "architectural": {
      const data = transformToArchitectural(formData);
      return (
        <div className="min-h-screen bg-black text-zinc-100 antialiased">
          <ArchHeader socials={data.socials} />
          <main>
            <ArchHero personalInfo={data.personalInfo} />
            <ArchSkills skills={data.skills} />
            <ArchProjects projects={data.projects} />
            <ArchExperience experience={data.experience} />
          </main>
          <ArchFooter personalInfo={data.personalInfo} socials={data.socials} />
        </div>
      );
    }

    case "soft": {
      const data = transformToSoft(formData);
      return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans">
          <SoftHeader socials={data.socials} />
          <main>
            <SoftHero personalInfo={data.personalInfo} />
            <SoftSkills skills={data.skills} />
            <SoftProjects projects={data.projects} />
            <SoftExperience experience={data.experience} />
          </main>
          <SoftFooter personalInfo={data.personalInfo} socials={data.socials} />
        </div>
      );
    }

    case "magazine": {
      const data = transformToMagazine(formData);
      return (
        <div className="min-h-screen bg-[#F5F5F1] text-black">
          <MagHeader socials={data.socials} />
          <main>
            <MagHero personalInfo={data.personalInfo} />
            <MagSkills skills={data.skills} />
            <MagWork projects={data.projects} />
            <MagExperience experience={data.experience} />
          </main>
          <MagFooter personalInfo={data.personalInfo} socials={data.socials} />
        </div>
      );
    }

    case "minimalist-grid": {
      const data = transformToMinimalistGrid(formData);
      return (
        <div className="min-h-screen bg-white">
          <MinHeader name={data.personalInfo.name} socials={data.socials} email={data.personalInfo.email} />
          <main>
            <MinHero personalInfo={data.personalInfo} socials={data.socials} />
            <MinSkills skills={data.skills} />
            <MinProjects projects={data.projects} />
            <MinExperience experience={data.experience} />
          </main>
          <MinFooter name={data.personalInfo.name} socials={data.socials} />
        </div>
      );
    }

    case "hyun-barng": {
      const data = transformToHyunBarng(formData);
      return (
        <div className="min-h-screen bg-white dark:bg-black relative">
          <div className="grain-overlay" />
          <HyunNav name={data.personalInfo.name} />
          <main>
            <HyunHero personalInfo={data.personalInfo} socials={data.socials} />
            <HyunSkills skills={data.skills} />
            <HyunProjects projects={data.projects} />
            <HyunExperience experience={data.experience} />
          </main>
          <HyunFooter name={data.personalInfo.name} email={data.personalInfo.email} socials={data.socials} />
        </div>
      );
    }

    default:
      return <div className="p-10 text-center">Template "{templateId}" not supported for Next.js preview</div>;
  }
}
