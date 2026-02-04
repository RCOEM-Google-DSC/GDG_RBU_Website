import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';
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

export default async function HyunPortfolio({ params }: PageProps) {
    const { userId } = await params;
    const portfolioData = await getPortfolioData(userId);

    if (!portfolioData) {
        notFound();
    }

    return (
        <div className="relative min-h-screen">
            <div className="grain-overlay" />
            <Navbar name={portfolioData.personalInfo.name} />
            <main>
                <Hero personalInfo={portfolioData.personalInfo} socials={portfolioData.socials} />
                <div className="w-full h-24 bg-background-light dark:bg-background-dark flex justify-center items-center overflow-hidden">
                    <div className="h-full w-[1px] bg-neutral-300 dark:bg-neutral-800 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-neutral-900 dark:border-white bg-transparent"></div>
                    </div>
                </div>
                <About about={portfolioData.personalInfo.about} />
                <Skills skills={portfolioData.skills} />
                <div className="flex justify-center bg-background-light dark:bg-background-dark py-12">
                    <div className="flex space-x-2">
                        <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
                        <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
                        <div className="h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600"></div>
                    </div>
                </div>
                <Projects projects={portfolioData.projects} />
                <Experience experience={portfolioData.experience} />
            </main>
            <Footer
                name={portfolioData.personalInfo.name}
                email={portfolioData.personalInfo.email}
                socials={portfolioData.socials}
            />
        </div>
    );
}
