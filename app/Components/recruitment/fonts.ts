import { Atkinson_Hyperlegible_Next, Google_Sans_Code } from "next/font/google";

// Task-brief fonts. Atkinson Hyperlegible keeps similar glyphs (I l 1, 0 O)
// distinct; Google Sans Code is used for code and labels.
export const briefSans = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-brief-sans",
  display: "swap",
});

export const briefMono = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-brief-mono",
  display: "swap",
});

/**
 * Classes for a brief's root element. `@theme inline` compiles `font-sans` /
 * `font-mono` to the Geist variables, so pointing those at the brief fonts
 * switches every descendant without touching the rest of the site.
 */
export const briefFontClasses = `${briefSans.variable} ${briefMono.variable} [--font-geist-sans:var(--font-brief-sans)] [--font-geist-mono:var(--font-brief-mono)] font-sans`;
