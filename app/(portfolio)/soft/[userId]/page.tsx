import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { getPortfolioData } from '../lib/getPortfolioData';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ userId: string }>;
}


export default async function SoftPortfolio({ params }: PageProps) {
    const { userId } = await params;
    const portfolioData = await getPortfolioData(userId);

    if (!portfolioData) {
        notFound();
    }

    return (
        <>
            <Header socials={portfolioData.socials} />
            <main>
                <Hero personalInfo={portfolioData.personalInfo} />
                <Philosophy />
                <Skills skills={portfolioData.skills} />
                <Projects projects={portfolioData.projects} />
                <Experience experience={portfolioData.experience} />
                <Contact personalInfo={portfolioData.personalInfo} />
            </main>
            <Footer
                personalInfo={portfolioData.personalInfo}
                socials={portfolioData.socials}
            />
        </>
    );
}
