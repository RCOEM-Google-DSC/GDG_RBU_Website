"use client";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "hyun-portfolio-theme";

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
};

export const getInitialTheme = (): Theme => {
  return getStoredTheme() || getSystemTheme();
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleTheme = (): Theme => {
  const currentTheme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  return newTheme;
};

export const initializeTheme = (): void => {
  const theme = getInitialTheme();
  setTheme(theme);
};
