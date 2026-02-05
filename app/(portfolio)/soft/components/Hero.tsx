import Link from "next/link";
import { Brain } from "lucide-react";

interface HeroProps {
  personalInfo: {
    name: string;
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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
              Building for <br />{" "}
              <span className="italic text-secondary">intelligence.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-light dark:text-muted-dark mb-8 max-w-lg leading-relaxed">
              I'm {personalInfo.name}, {personalInfo.about}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="#projects"
                className="inline-flex justify-center items-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:-translate-y-1"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-medium hover:border-primary dark:hover:border-white transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] group">
              {personalInfo.profileImage ? (
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 font-display italic text-4xl">
                  {personalInfo.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
