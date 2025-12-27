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
      className="w-full pt-8 pb-0"
      // style={{
      //   backgroundColor: "#ffffff",
      // }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Unified Footer Section - Neo-brutalism style */}
        <div
          className="w-full p-6 md:p-10"
          style={{
            backgroundColor: isDark ? "#1f2937" : "#f9fafb",
            border: "4px solid #000000",
            boxShadow: "8px 8px 0px #000000",
          }}
        >
          {/* Top Section: Logo and Title */}
          <div className="flex flex-col items-center justify-center gap-4 mb-8 pb-8 border-b-4 border-black border-dashed">
            <Image
              src="/icons/gdg-logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className=""
            />
            <h1
              className="font-black text-2xl sm:text-3xl text-center"
              style={{ color: isDark ? "#ffffff" : "#000000" }}
            >
              Google Developer Groups
            </h1>
            <p
              className="text-base sm:text-lg font-bold text-center"
              style={{ color: isDark ? "#ffffff" : "#000000" }}
            >
              <span>On Campus</span> • Ramdeobaba University
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-5">
            {/* Middle Section: Contact Info */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Location */}
              <div
                className="p-5 flex items-start gap-3"
                style={{
                  backgroundColor: "#60a5fa",
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                }}
              >
                <IoLocationOutline
                  size={28}
                  style={{ color: "#000000", flexShrink: 0 }}
                />
                <div
                  className="flex flex-col text-sm sm:text-base leading-tight font-bold"
                  style={{ color: "#000000" }}
                >
                  <span>Ramdeobaba University</span>
                  <span>
                    Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013
                  </span>
                </div>
              </div>

              {/* Email */}
              <Link
                href="#"
                className="p-5 text-sm sm:text-base font-black transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                style={{
                  backgroundColor: "#FFC20E",
                  border: "3px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                  color: "#000000",
                }}
              >
                <span className="flex items-center gap-3">
                  <CgMail size={28} />
                  <p>dsc.rknec@gmail.com</p>
                </span>
              </Link>
            </div>

            {/* Bottom Section: Social Media */}
            <div
              className="flex flex-col items-center justify-center bg-indigo-500/90 gap-6 p-5 md:min-w-[280px]"
              style={{
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                color: "#000000",
              }}
            >
              <p className="text-lg font-black" style={{ color: "#ffffff" }}>
                Follow Us:
              </p>
              <div className="flex gap-4 items-center">
                <Link
                  href="#"
                  target="_blank"
                  className="p-4 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                  style={{
                    backgroundColor: "#f87171",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="Instagram"
                >
                  <AiOutlineInstagram size={24} style={{ color: "#000000" }} />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="p-4 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                  style={{
                    backgroundColor: "#60a5fa",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={24} style={{ color: "#000000" }} />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="p-4 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                  style={{
                    backgroundColor: "#4ade80",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="X"
                >
                  <Image
                    src="/icons/x-logo.png"
                    width={24}
                    height={24}
                    style={{ color: "#000000" }}
                    alt="X Logo"
                  ></Image>
                </Link>
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
          className="w-full h-30 sm:h-48 md:h-52 object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
