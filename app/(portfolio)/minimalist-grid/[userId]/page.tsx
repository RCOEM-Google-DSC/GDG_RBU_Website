import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';
import { getPortfolioData } from '../lib/getPortfolioData';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ userId: string }>;
}


export default async function MinimalistPortfolio({ params }: PageProps) {
  const { userId } = await params;
  const portfolioData = await getPortfolioData(userId, "minimalist-grid");

  if (!portfolioData) {
    notFound();
  }
    return (
        <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white">
            <Header 
                name={portfolioData.personalInfo.name} 
                socials={portfolioData.socials} 
                email={portfolioData.personalInfo.email} 
                hasAbout={!!portfolioData.personalInfo.about}
                hasSkills={portfolioData.skills.length > 0}
                hasProjects={portfolioData.projects.length > 0}
                hasExperience={portfolioData.experience.length > 0}
            />
            <main>
                <Hero personalInfo={portfolioData.personalInfo} socials={portfolioData.socials} />
                <About about={portfolioData.personalInfo.about} />
                <Skills skills={portfolioData.skills} />
                <Projects projects={portfolioData.projects} />
                <Experience experience={portfolioData.experience} />
            </main>
            <Footer
                name={portfolioData.personalInfo.name}
                socials={portfolioData.socials}
                hasAbout={!!portfolioData.personalInfo.about}
                hasSkills={portfolioData.skills.length > 0}
                hasProjects={portfolioData.projects.length > 0}
                hasExperience={portfolioData.experience.length > 0}
            />
        </div>
    );
}
