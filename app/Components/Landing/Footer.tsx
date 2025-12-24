"use client";
import { BsTwitter } from "react-icons/bs";

import { IoLocationOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme, accounting for system preference
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Fallback for SSR
  if (!mounted) {
    return (
      <footer className="w-full pt-8 bg-gray-100 text-black">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
            {/* Simplified content for SSR */}
            <div>Loading...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="w-full pt-8"
      style={{
        backgroundColor: isDark ? "rgb(24 24 27)" : "#f3f4f6",
        color: isDark ? "white" : "black",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
          {/* left section */}
          <aside className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/icons/gdg-logo.svg"
              alt="Logo"
              width={170}
              height={170}
              className=""
            />
            <h1
              className="font-medium text-2xl sm:text-3xl text-center md:text-left"
              style={{ color: isDark ? "white" : "black" }}
            >
              Google Developer Groups
            </h1>
            <p className="text-base sm:text-lg font-medium text-muted-foreground text-center md:text-left">
              <span className="text-blue-500">On Campus</span> • Ramdeobaba
              University
            </p>
          </aside>

          {/* divider (only on md+) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="h-64 w-px bg-gray-300 dark:bg-slate-600" />
          </div>

          {/* divider only on sm */}
          <div className="md:hidden w-full ">
            <div className="h-px w-full bg-gray-300 dark:bg-slate-600" />
          </div>

          {/* right section */}
          <div className="flex flex-col gap-6">
            <span className="flex items-start gap-3">
              <IoLocationOutline
                size={28}
                style={{ color: isDark ? "white" : "black" }}
              />
              <div
                className="flex flex-col text-sm sm:text-base leading-tight"
                style={{ color: isDark ? "white" : "black" }}
              >
                <span>
                  Shri Ramdeobaba College of Engineering and Management,
                </span>
                <span>
                  Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013
                </span>
              </div>
            </span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 w-full">
              <Link href="#" className="underline text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <CgMail
                    size={24}
                    style={{ color: isDark ? "white" : "black" }}
                  />
                  <p style={{ color: isDark ? "white" : "black" }}>
                    dsc.rknec@gmail.com
                  </p>
                </span>
              </Link>

              {/* social media  */}
              <div className="flex flex-col gap-2 sm:items-center sm:justify-center">
                <p
                  className="text-base font-semibold"
                  style={{ color: isDark ? "white" : "black" }}
                >
                  Follow Us:
                </p>
                <div className="flex gap-3 items-center">
                  <Link
                    href="#"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="Instagram"
                  >
                    <AiOutlineInstagram
                      size={20}
                      style={{ color: isDark ? "white" : "black" }}
                    />
                  </Link>
                  <Link
                    href="#"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn
                      size={20}
                      style={{ color: isDark ? "white" : "black" }}
                    />
                  </Link>
                  <Link
                    href="#"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="X"
                  >
                    <BsTwitter
                      size={20}
                      style={{ color: isDark ? "white" : "" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom pic */}
      <div className="w-full ">
        <Image
          src="/assets/footer-pic.svg"
          alt="Footer"
          width={1920}
          height={180}
          className="w-full h-40 sm:h-48 md:h-52 object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
