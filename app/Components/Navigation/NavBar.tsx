"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import ProfileDropdown from '../Common/ProfileDropdown'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  return (
    <nav className={`flex items-center justify-between px-10 py-3 shadow-md bg-white border-b transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* logo */}
      <div>
        <Image src="/icons/gdg.svg" alt="GDG Logo" width={50} height={50} />
      </div>

      {/* navigation links */}

      <div className="space-x-6">
        <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <Link href="/team" className="text-gray-700 hover:text-gray-900">Team</Link>
        <Link href="/events" className="text-gray-700 hover:text-gray-900">Events</Link>
        <Link href="/links" className="text-gray-700 hover:text-gray-900">Links</Link>
      </div>

      {/* profile dropdown or register button */}
      <div>
        {user ? (
          <ProfileDropdown />
        ) : (
          <Link href={"/register"}>
            Register
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar