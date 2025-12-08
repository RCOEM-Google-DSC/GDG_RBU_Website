"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-5 justify-center min-h-screen">
      <Link href="/register">Register</Link>
      <Link href="/events">Events</Link>
      <Link href="/event-details">Event details</Link>
      <Link href="/completed">Completed events</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/complete-profile">Cloudinary Profile</Link>
      <Link href="/supabase-demo">Supabase Demo</Link>
    </div>
  );
}

