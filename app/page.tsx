"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Button  onClick={() => router.push('/register')}>Register</Button>
     <Button  onClick={() => router.push('/events')}>Events</Button>
     <Button  onClick={() => router.push('/event-details')}>Event details</Button>
     <Button  onClick={() => router.push('/completed')}>Completed events</Button>
     <Button  onClick={() => router.push('/profile')}>Profile</Button>
    </div>
  );
}
