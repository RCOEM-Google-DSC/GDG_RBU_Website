"use client";

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

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  if (!mounted) {
    return (
      <footer className="w-full pt-8 bg-gray-100 text-black">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
            <div>Loading...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full pt-8 pb-0">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="w-full p-6 md:p-10"
          style={{
            backgroundColor: isDark ? "#1f2937" : "#f9fafb",
            border: "4px solid #000000",
            boxShadow: "8px 8px 0px #000000",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-8 pb-8 border-b-4 border-black border-dashed">
            <Image
              src="/icons/gdg-logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className=""
            />
            <h1
              className="font-black text-2xl sm:text-3xl text-center font-retron"
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
            <div className="flex flex-col gap-5 flex-1">
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

              <Link
                href="mailto:gdsc@rknec.edu"
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
                  <p>gdsc@rknec.edu</p>
                </span>
              </Link>
            </div>

            {/* Updated Social Media Block (responsive-safe) */}
            <div
              className="flex flex-col items-center justify-center bg-indigo-500/90 gap-4 p-4 md:p-5 md:min-w-[280px]"
              style={{
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                color: "#000000",
              }}
            >
              <p className="text-lg font-black" style={{ color: "#ffffff" }}>
                Follow Us:
              </p>

              <div className="flex gap-3 items-center">
                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/gdg_rbu/"
                  target="_blank"
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shrink-0"
                  style={{
                    backgroundColor: "#f87171",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="Instagram"
                >
                  <AiOutlineInstagram size={18} style={{ color: "#000000" }} />
                </Link>

                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/company/gdg-rbu/"
                  target="_blank"
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shrink-0"
                  style={{
                    backgroundColor: "#60a5fa",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} style={{ color: "#000000" }} />
                </Link>

                {/* X (Twitter) */}
                <Link
                  href="https://x.com/gdsc_rcoem"
                  target="_blank"
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shrink-0"
                  style={{
                    backgroundColor: "#4ade80",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  aria-label="X"
                >
                  <Image
                    src="/icons/x-logo.png"
                    alt="X Logo"
                    width={24}
                    height={24}
                    className="w-5 h-5"
                    unoptimized
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

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
