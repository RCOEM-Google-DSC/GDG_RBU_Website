"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/Navigation/NavBar";
import DevNavBar from "./Components/Navigation/DevNavBar";
import { Toaster } from "sonner";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const productSans = Geist({
  variable: "--font-product-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith('/docs');

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${productSans.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <RootProvider
          theme={{
            enabled: false
          }}
        >
          {/* <DevNavBar/> */}
          <NavBar />
          {/* {!isDocsPage && (
            <div className="w-full pointer-events-none z-0">
              <GridBackground />
            </div>
          )} */}
          <main className="relative w-full pt-[70px]">
            {children}
          </main>
          <Toaster position="top-right" richColors />
        </RootProvider>
      </body>
    </html>
  );
}
