import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { getPortfolioData } from "../lib/getPortfolioData";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ userId: string }>;
}


export default async function ArchitecturalPortfolio({ params }: PageProps) {


    const { userId } = await params;


    const portfolioData = await getPortfolioData(userId, "architectural");





    if (!portfolioData) {


        notFound();


    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 antialiased selection:bg-accent selection:text-white">
            <Header 
                name={portfolioData.personalInfo.name}
                socials={portfolioData.socials} 
                hasAbout={!!portfolioData.personalInfo.about}
                hasProjects={portfolioData.projects.length > 0}
                hasSkills={portfolioData.skills.length > 0}
                hasExperience={portfolioData.experience.length > 0}
            />
            <main>
                <Hero personalInfo={portfolioData.personalInfo} projects={portfolioData.projects} />
                <Skills skills={portfolioData.skills} />
                <Projects projects={portfolioData.projects} />
                <Experience experience={portfolioData.experience} />
            </main>
            <Footer
                personalInfo={portfolioData.personalInfo}
                socials={portfolioData.socials}
                hasAbout={!!portfolioData.personalInfo.about}
                hasProjects={portfolioData.projects.length > 0}
                hasSkills={portfolioData.skills.length > 0}
                hasExperience={portfolioData.experience.length > 0}
            />
        </div>
    );
}
