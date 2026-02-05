"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../lib/theme";

interface NavbarProps {
  name: string;
  hasAbout?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasExperience?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  hasAbout = true,
  hasSkills = true,
  hasProjects = true,
  hasExperience = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initialize isDark state based on current theme
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleDarkMode = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === "dark");
  };

  const displayName = name.toUpperCase() + "_";

  const navItems = [
    { label: "About", show: hasAbout },
    { label: "Skills", show: hasSkills },
    { label: "Projects", show: hasProjects },
    { label: "Experience", show: hasExperience },
  ].filter((item) => item.show);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? "bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md h-16 border-b border-neutral-200 dark:border-neutral-800"
          : "bg-transparent h-24"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="#"
          className="font-display uppercase text-xl tracking-tighter hover:opacity-70 transition-opacity text-neutral-900 dark:text-white"
        >
          {displayName}
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <button
          onClick={handleToggleDarkMode}
          className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <Sun className="w-4 h-4 transition-transform hover:rotate-12" />
          ) : (
            <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
          )}
        </button>
      </div>
    </nav>
  );
};
