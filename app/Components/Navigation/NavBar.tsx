"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import ProfileDropdown from "../Common/ProfileDropdown";
import MobileProfileDropdown from "../Common/MobileProfileDropdown";
import { Menu, X, Terminal, User as UserIcon } from "lucide-react";
import Image from "next/image";

const LINK_STYLES = [
  { color: "bg-blue-400", hover: "hover:bg-blue-500/90" },
  { color: "bg-red-400", hover: "hover:bg-red-500/90" },
  { color: "bg-yellow-400", hover: "hover:bg-yellow-500/90" },
  { color: "bg-green-400", hover: "hover:bg-green-500/90" },
  { color: "bg-indigo-400", hover: "hover:bg-indigo-500/90" },
];

const NAV_ROUND = "rounded-md";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/links", label: "Links" },
  { href: "/docs", label: "Docs" },
];

export default function NavBar() {
  const [user, setUser] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // keep scroll position when locking body
  const scrollRef = useRef<number>(0);

  // load user data
  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user ?? null);
    };
    fetchUser();

    const { data: sub } = supabase.auth.onAuthStateChange((ev, sess) => {
      if (ev === "SIGNED_IN") setUser(sess?.user ?? null);
      if (ev === "SIGNED_OUT") setUser(null);
    });

    return () => {
      mounted = false;
      sub.subscription?.unsubscribe?.();
    };
  }, []);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr < lastScrollY || curr < 10) setIsVisible(true);
      else if (curr > lastScrollY && curr > 100) setIsVisible(false);
      setLastScrollY(curr);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // lock body while mobile menu open (robust)
  useEffect(() => {
    if (isMobileMenuOpen) {
      // store current scroll
      scrollRef.current = window.scrollY || window.pageYOffset || 0;
      // hide overflow on documentElement too (helps some browsers)
      document.documentElement.style.overflow = "hidden";
      // freeze body in place
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // restore
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      // restore scroll to where it was
      window.scrollTo(0, scrollRef.current);
    }

    // cleanup in case component unmounts while open
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed  top-0 left-0 right-0 z-50 h-[70px] py-11 flex items-center justify-between px-6 md:px-10 bg-[#FCFDF8] shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/icons/gdg-logo.svg"
            width={72}
            height={52}
            alt="GDG Logo"
            className=" object-contain"
            onError={(e: any) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="hidden w-[72px] h-[52px] items-center justify-center border-2 border-black bg-white">
            <Terminal size={24} />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link, idx) => {
            const style = LINK_STYLES[idx % LINK_STYLES.length];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2 font-black text-black ${style.color}
                border-2 border-black
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                hover:scale-110 ${style.hover}
                active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                transition-all duration-200 ${NAV_ROUND}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop profile / join */}
        <div className="hidden md:block">
          {user ? (
            <ProfileDropdown />
          ) : (
            <Link
              href="/register"
              className={`px-6 py-3 font-bold text-white bg-black border-2 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:bg-gray-300 hover:text-black
              hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              transition-all ${NAV_ROUND}`}
            >
              Join Us
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 bg-white border-2 border-black
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50
        border-l-2 border-black
        shadow-[-4px_0px_0px_0px_rgba(0,0,0,0.1)]
        transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close X button added at top-right inside the sidebar */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 md:hidden p-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="pt-28 px-6 flex flex-col h-full">
          <h2 className="mb-6 pb-4 border-b-2 border-black font-black text-2xl uppercase">
            Menu
          </h2>

          <div className="flex flex-col space-y-5">
            {NAV_LINKS.map((link, idx) => {
              const style = LINK_STYLES[idx % LINK_STYLES.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 font-black text-black ${style.color}
                  border-2 border-black
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-1 active:translate-y-1 active:shadow-none
                  transition-all ${NAV_ROUND}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto mb-10 pt-6 border-t-2 border-black">
            {user ? (
              <MobileProfileDropdown
                onLogout={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className={` block px-6 py-3 font-bold text-white bg-black border-2 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:bg-gray-300 hover:text-black
              hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              transition-all ${NAV_ROUND}`}
              >
                JOIN US
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
