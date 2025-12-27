// app/layout.tsx
import "./globals.css";
import NavBar from "./Components/Navigation/NavBar";
import { Toaster } from "sonner";
import { RootProvider } from "fumadocs-ui/provider/next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "GDG RBU | Google Developer Group at RBU",
  description: "Official website of Google Developer Group RBU. Join us for tech talks, workshops, hackathons, and developer events. Learn, build, and connect with the tech community.",
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
          <NavBar />
          <main className="relative w-full pt-20">{children}</main>
          <Toaster position="top-right" richColors />
        </RootProvider>
      </body>
    </html>
  );
}
