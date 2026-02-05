import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Oswald", "sans-serif"],
        playfair: ["'Playfair Display'", "serif"],
      },
      colors: {
        accent: "#DC2626", // Red-600 for architectural portfolio
        primary: "#1A1A1A",
        secondary: "#D1A086",
        "background-light": "#F2F0EB",
        "surface-light": "#E8E6E1",
        "background-dark": "#121212",
        "surface-dark": "#1E1E1E",
        "text-light": "#333333",
        "text-dark": "#E5E5E5",
        "muted-light": "#666666",
        "muted-dark": "#A3A3A3",
      },
    },
  },
  plugins: [],
};

export default config;
