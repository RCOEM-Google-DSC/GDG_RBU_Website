// app/layout.tsx
import "./globals.css";
import NavBar from "./Components/Navigation/NavBar";
import { Toaster } from "sonner";
import { RootProvider } from "fumadocs-ui/provider/next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "GDG",
  description: "GDG Website",
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
          <main className="relative w-full pt-[80px]">
            {children}
          </main>
          <Toaster position="top-right" richColors />
        </RootProvider>
      </body>
    </html>
  );
}
