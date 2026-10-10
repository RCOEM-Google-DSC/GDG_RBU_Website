import { Atkinson_Hyperlegible_Next, Google_Sans_Code } from "next/font/google";

export const briefSans = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-brief-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const briefMono = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-brief-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const briefFontClasses = `${briefSans.variable} ${briefMono.variable} [--font-geist-sans:var(--font-brief-sans)] [--font-geist-mono:var(--font-brief-mono)] font-sans`;
