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
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <nav className="flex items-center justify-between px-10 py-3 shadow-md relative z-50 bg-white">
      {/* logo */}
      <div>
        <Image src="/icons/gdg.svg" alt="GDG Logo" width={50} height={50} />
      </div>

      {/* navigation links */}

      <div className="space-x-6">
        <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <Link href="/team" className="text-gray-700 hover:text-gray-900">Team</Link>
        <Link href="/events" className="text-gray-700 hover:text-gray-900">Events</Link>
        <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
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