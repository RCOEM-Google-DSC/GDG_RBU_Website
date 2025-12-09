import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='flex p-5 justify-between items-center'>
            <div className="flex justify-between gap-5">
                <Link href="/Other/register"  >Register</Link>
                <Link href="/Other/events"  >Events</Link>
                <Link href="/Other/event-details"  >Event details</Link>
                <Link href="/Other/completed"  >Completed events</Link>
                <Link href="/profile"  >Profile</Link>
                <Link href="/Other/complete-profile"  >Cloudinary Profile</Link>
                <Link href="/supabase-demo"  >Supabase Demo</Link>
                <Link href="/website"  >Website</Link>
                
            </div>

            <div className="flex gap-5">
                <Link href="/register">Register</Link>
                <Link href="/signin">Sign In</Link>
            </div>
        </div>
    )
}

export default NavBar