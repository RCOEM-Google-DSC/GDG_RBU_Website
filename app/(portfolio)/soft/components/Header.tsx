"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu } from "lucide-react";
import { toggleTheme as toggleThemeUtil } from "../lib/theme";

interface HeaderProps {
  socials?: Array<{
    platform: string;
    url: string;
  }>;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasExperience?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  socials,
  hasAbout = true,
  hasSkills = true,
  hasProjects = true,
  hasExperience = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize isDark state based on current theme
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setIsDark(newTheme === "dark");
  };

  const navItems = [
    { label: "Home", href: "#", show: true },
    { label: "About", href: "#about", show: hasAbout },
    { label: "Skills", href: "#skills", show: hasSkills },
    { label: "Projects", href: "#projects", show: hasProjects },
    { label: "Experience", href: "#experience", show: hasExperience },
    { label: "Contact", href: "#contact", show: true },
  ].filter((item) => item.show);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300  ${isScrolled ? "bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-display italic text-2xl font-bold">
              dev.portfolio
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 transition-transform hover:rotate-12" />
              ) : (
                <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
              )}
            </button>

            <Link
              href="#contact"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Let's Talk
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            >
              {isDark ? (
                <Sun className="w-5 h-5 transition-transform hover:rotate-12" />
              ) : (
                <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-light dark:text-text-dark focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block px-3 py-2 mt-4 text-center bg-primary text-white rounded-md font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
