"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import ProfileDropdown from '../Common/ProfileDropdown'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down and past a threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-2 shadow-md bg-white border-b transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* logo */}
        <div className="z-50">
          <Link href="/">
            <Image src="/icons/gdg.svg" alt="GDG Logo" width={50} height={50} />
          </Link>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
          <Link href="/team" className="text-gray-700 hover:text-gray-900 transition-colors">Team</Link>
          <Link href="/events" className="text-gray-700 hover:text-gray-900 transition-colors">Events</Link>
          <Link href="/links" className="text-gray-700 hover:text-gray-900 transition-colors">Links</Link>
        </div>

        {/* Desktop profile dropdown or register button */}
        <div className="hidden md:block">
          {user ? (
            <ProfileDropdown />
          ) : (
            <Link href={"/register"} className="text-gray-700 hover:text-gray-900 transition-colors">
              Register
            </Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={28} className="transition-transform duration-300" />
          ) : (
            <Menu size={28} className="transition-transform duration-300" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-40 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-6">
            <Link
              href="/"
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/team"
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Team
            </Link>
            <Link
              href="/events"
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link
              href="/links"
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Links
            </Link>
          </div>

          {/* Mobile profile section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {user ? (
              <div onClick={closeMobileMenu}>
                <ProfileDropdown />
              </div>
            ) : (
              <Link
                href={"/register"}
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar