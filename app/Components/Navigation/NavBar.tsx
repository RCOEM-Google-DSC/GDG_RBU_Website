import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfileDropdown from '../Common/ProfileDropdown'
const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-8 shadow-md relative z-50 bg-white">
        {/* logo */}
        <div>
            <Image src="/icons/gdg.svg" alt="GDG Logo" width={50} height={50} />
        </div>

        {/* navigation links */}

        <div className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/events" className="text-gray-700 hover:text-gray-900">Events</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        </div>

        {/* profile dropdown */}
        <div>
            <ProfileDropdown />
        </div>
    </nav>
  )
}

export default NavBar