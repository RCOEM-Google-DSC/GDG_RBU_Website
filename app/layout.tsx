import "./globals.css";
import NavBar from "./Components/Navigation/NavBar";
import { Toaster } from "sonner";
import { RootProvider } from "fumadocs-ui/provider/next";
import GDGPreloader from "./Components/Common/GDGPreloader";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "GDG RBU | Google Developer Group at RBU",
  description:
    "Official website of Google Developer Group at RBU. Join us for tech talks, workshops, hackathons, and developer events. Learn, build, and connect with the tech community.",
  keywords: [
    "GDG",
    "GDG RBU",
    "Google Developer Group",
    "Google Developer Group RBU",
    "RBU",
    "RCOEM",
    "developer community",
    "tech events",
    "workshops",
    "hackathons",
    "coding events",
    "tech talks",
    "developer meetups",
    "student developers",
    "Google technologies",
    "web development",
    "mobile development",
    "cloud computing",
    "machine learning",
    "AI events",
    "Nagpur tech community",
    "programming events",
    "tech conferences",
    "developer networking",
  ],
  authors: [{ name: "GDG RBU" }],
  openGraph: {
    title: "GDG RBU | Google Developer Group at RBU",
    description: "Join the official Google Developer Group at RBU for tech events, workshops, and community learning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body
        className={`
          ${GeistSans.variable}
          ${GeistMono.variable}
          font-sans antialiased flex flex-col min-h-screen
        `}
      >
        <RootProvider theme={{ enabled: false }}>
          {/* PRELOADER MOUNTS ONCE */}
          <GDGPreloader />

          {/* Inline CSS to hide nav / toasts while preloader-active and to hide the preloader wrapper when not active */}
          <style>{`
            /* Show the preloader wrapper only while html.preloader-active is present */
            html.preloader-active .gdg-preloader-wrapper {
              display: grid !important;
            }

            /* IMPORTANT: hide the wrapper once preloader-active is removed */
            html:not(.preloader-active) .gdg-preloader-wrapper {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
              opacity: 0 !important;
            }

            /* hide the site nav while preloader-active is present */
            html.preloader-active nav,
            html.preloader-active .navbar,
            html.preloader-active #navbar,
            html.preloader-active .site-nav,
            html.preloader-active .nav-wrapper {
              display: none !important;
            }

            /* hide sonner toasts during preloader so nothing overlaps */
            html.preloader-active .sonner-toast,
            html.preloader-active .toaster,
            html.preloader-active .toaster-root {
              display: none !important;
            }

            /* prevent scroll while preloader-active */
            html.preloader-active,
            html.preloader-active body {
              overflow: hidden !important;
              touch-action: none !important;
              overscroll-behavior: none !important;
            }

            /* optionally hide focus outlines during preload to avoid tiny flicker */
            html.preloader-active *:focus {
              outline: none !important;
            }
          `}</style>

          <NavBar />
          <main className="relative w-full pt-[70px]">{children}</main>
          <Toaster position="top-right" richColors />
        </RootProvider>
      </body>
    </html>
  );
}
