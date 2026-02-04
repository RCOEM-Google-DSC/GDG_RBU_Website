import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SectionDivider from '../components/SectionDivider';
import Skills from '../components/Skills';
import Work from '../components/Work';
import Experience from '../components/Experience';
import Philosophy from '../components/Philosophy';
import Footer from '../components/Footer';
import { getPortfolioData } from '../lib/getPortfolioData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { userId } = await params;
  const portfolioData = await getPortfolioData(userId);

  if (!portfolioData) {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.',
    };
  }

  return {
    title: `${portfolioData.personalInfo.name} - Portfolio`,
    description: portfolioData.personalInfo.about || `Portfolio of ${portfolioData.personalInfo.name}`,
    openGraph: {
      title: `${portfolioData.personalInfo.name} - Portfolio`,
      description: portfolioData.personalInfo.about || `Portfolio of ${portfolioData.personalInfo.name}`,
      type: 'profile',
    },
  };
}

export default async function MagazinePortfolio({ params }: PageProps) {
  const { userId } = await params;
  const portfolioData = await getPortfolioData(userId);

  if (!portfolioData) {
    notFound();
  }

  return (
    <main className="w-full max-w-[1440px] mx-auto min-h-screen border-l border-r border-black flex flex-col bg-white text-black">
      <Header socials={portfolioData.socials} />
      <Hero personalInfo={portfolioData.personalInfo} />
      
      {portfolioData.skills.length > 0 && (
        <>
          <SectionDivider 
            number="01" 
            title="The Code<br/>Era Begins" 
            subtitle="Skills" 
          />
          <Skills skills={portfolioData.skills} />
        </>
      )}

      {portfolioData.projects.length > 0 && (
        <Work projects={portfolioData.projects} />
      )}

      {portfolioData.experience.length > 0 && (
        <>
          <SectionDivider 
            number="02" 
            title="Dev<br/>Journey" 
            subtitle="Experience" 
            align="right"
          />
          <Experience experience={portfolioData.experience} />
        </>
      )}
      
      <Philosophy about={portfolioData.personalInfo.about} />
      <Footer 
        personalInfo={portfolioData.personalInfo} 
        socials={portfolioData.socials}
      />
    </main>
  );
}
