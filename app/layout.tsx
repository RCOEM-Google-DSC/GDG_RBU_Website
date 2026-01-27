// app/layout.tsx
import "./globals.css";
import NavBar from "./Components/Navigation/NavBar";
import { Toaster } from "sonner";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";

const retron = localFont({
  src: "../lib/Retron2000.ttf",
  variable: "--font-retron",
  display: "swap",
});

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
    description:
      "Join the official Google Developer Group at RBU for tech events, workshops, and community learning.",
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
          ${retron.variable}
          font-sans antialiased flex flex-col min-h-screen
        `}
      >
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

        <NavBar />
        <main className="relative w-full pt-[70px]">{children}</main>
        <Toaster position="top-right" richColors closeButton={true} />
      </body>
    </html>
  );
}
