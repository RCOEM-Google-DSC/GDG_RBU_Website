// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import ConditionalLayout from "./Components/ConditionalLayout";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
  getOrganizationJsonLd,
  getSiteUrl,
  getWebsiteJsonLd,
} from "@/lib/seo";

const retron = localFont({
  src: "../lib/Retron2000.ttf",
  variable: "--font-retron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
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
  creator: "GDG RBU",
  publisher: "GDG RBU",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
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
          ${retron.variable}
          font-sans antialiased flex flex-col min-h-screen
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationJsonLd(),
              getWebsiteJsonLd(),
            ]),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                if (typeof window === 'undefined') return;
                var path = window.location.pathname || '/';
                path = (path === '/') ? '/' : path.replace(/\\/+$/, '');
                // Allow forcing with ?showPreloader in URL — keep parity with GDGPreloader
                var force = (new URLSearchParams(window.location.search).has('showPreloader'));
                if (path !== '/' && !force) return;
                if (sessionStorage.getItem('gdgPreloaderShown') === '1' && !force) return;
                document.documentElement.classList.add('preloader-active');
              } catch (e) {
                // swallow errors
              }
            })();`,
          }}
        />

        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster position="top-right" richColors closeButton={true} />
      </body>
    </html>
  );
}
