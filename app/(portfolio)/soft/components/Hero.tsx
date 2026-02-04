import React from "react";
import { Brain } from "lucide-react";

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    profileImage: string;
  };
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  if (!personalInfo) return null;

  return (
    <section className="relative pt-20 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up z-10">
            <div className="inline-block px-3 py-1 mb-6 border border-gray-300 dark:border-gray-600 rounded-full text-xs font-medium tracking-widest uppercase text-muted-light dark:text-muted-dark">
              Available for hire
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
              Building for <br />{" "}
              <span className="italic text-secondary">intelligence.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-light dark:text-muted-dark mb-8 max-w-lg leading-relaxed">
              I'm {personalInfo.name}, {personalInfo.about}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex justify-center items-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:-translate-y-1"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-medium hover:border-primary dark:hover:border-white transition-all"
              >
                Contact Me
              </a>
            </div>
            <div className="flex items-center gap-6 text-muted-light dark:text-muted-dark text-sm font-medium uppercase tracking-wider">
              <span>Web</span>
              <span className="w-px h-4 bg-gray-300 dark:bg-gray-700"></span>
              <span>Machine Learning</span>
              <span className="w-px h-4 bg-gray-300 dark:bg-gray-700"></span>
              <span>Cloud Architecture</span>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] group">
              <img
                src={
                  personalInfo.profileImage ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCY0Md-cwfMCyptfszzctS9FI9bcNn5ZbIkutbYaNjPjUVx0JOIj_8-UugXusDPpASa9CkMwWz3y7ymja_bA5mBV6RCBTLmLd-QMiYAxLUFPIEGHyv5QHvzywKoFZ-EUVW9uKg0q7S7qPorj4myXgF3g9I5Mj_7CYjc2XQtZ2aAMppXJLt6WMh5CTt__kuWmUtIGWOXVwgI5uR0dURQjV4CXgLYrRpQxGuIIYS-BR8E9gWrR8U3Ilf8lnENlZTfP0ZNgzPu-usK_AVj"
                }
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Current Focus
                    </p>
                    <p className="font-display font-bold italic text-lg">
                      {personalInfo.role}
                    </p>
                  </div>
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <Brain className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
