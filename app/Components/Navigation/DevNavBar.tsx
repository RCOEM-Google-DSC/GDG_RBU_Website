import Link from 'next/link'
import React from 'react'

const DevNavBar = () => {
    return (
        <div className='flex p-5 justify-between items-center'>
            <div className="flex justify-between gap-5">
                <Link href="/Other/event-details"  >Event details</Link>
                <Link href="/Other/completed"  >Completed events</Link>
            </div>

            <div className="flex gap-5">
                <Link href="/admin">Admin</Link>
                <Link href="/register">Register</Link>
                <Link href="/signin">Sign In</Link>
            </div>
        </div>
    )
}

export default DevNavBar