"use client";
import React, { useEffect, useState } from "react";
import GDGPreloader from "./Components/Common/GDGPreloader";
import EventTicket from "./Components/Common/UpcomingEvent";
import { motion } from "framer-motion";
import Faq from "./Components/Landing/FAQ";
import MeetOurTeam from "./Components/Landing/MeetOurTeam";
import Footer from "./Components/Landing/Footer";
import Hero from "./Components/Landing/Hero";
import { createClient } from "@/supabase/client";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  description: string;
  event_time: string;
  image_url?: string | null;
  venue?: string | null;
  date?: string | null;
  time?: string | null;
  status: string;
  register_url?: string | null;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop";

const REGISTER_URL =
  "https://vision.hack2skill.com/event/gdgoc-25-techsprint-rbu?utm_source=hack2skill&utm_medium=homepage";

const cloudinarySafe = (url?: string | null) => {
  if (!url) return FALLBACK_IMAGE;
  return url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  /* Fetch events */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const supabase = createClient();
        const { data: upcoming } = await supabase
          .from("events")
          .select("*")
          .eq("status", "upcoming")
          .order("event_time", { ascending: true });
        if (upcoming) setEvents(upcoming as Event[]);
      } catch (err) {
        console.error("Error fetching upcoming events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <GDGPreloader />

      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: "80px 80px",
        }}
      />

      {/* hero section */}
      <section className="w-full relative z-10 md:-mt-20 ">
        <Hero />
      </section>

      {/* upcoming events section */}
      <section className="w-full px-6 md:px-10 lg:px-20 sm:-mt-20 relative z-10">
        <motion.div
          className="w-full flex flex-col items-center justify-center pt-0 pb-12 sm:pt-0 sm:pb-14 text-foreground px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-8 sm:my-10 font-retron ">
            Upcoming Event
          </h2>

          {events.length > 0 ? (
            events.map((event) => {
              const registerUrl = event.register_url ?? REGISTER_URL;
              const imageSrc = cloudinarySafe(event.image_url ?? FALLBACK_IMAGE);
              return (
                <EventTicket
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={
                    event.date ? new Date(event.date) : new Date(event.event_time)
                  }
                  time={
                    event.time ||
                    new Date(event.event_time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  image={imageSrc}
                  tags={[event.status]}
                  tagColor="#FBBC04"
                  description={event.description}
                  registerUrl={registerUrl}
                />
              );
            })
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative w-full">
                {/* Shadow layer */}
                <div className="absolute top-3 left-3 right-0 bottom-0 bg-black rounded-3xl" />

                {/* Main card */}
                <div className="relative bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-3 bg-[#FFC20E]" />

                  {/* Content */}
                  <div className="p-8 sm:p-12 text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-[#FFC20E] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
                      <svg
                        className="w-10 h-10 sm:w-12 sm:h-12 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    {/* Heading */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 font-product-sans">
                      No Events Right Now
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed">
                      We're cooking up something amazing! Stay tuned for our next event announcement.
                      In the meantime, check out what we've done before.
                    </p>

                    {/* CTA Button */}
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-lg rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      View Past Events
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Bottom decorative elements */}
                  <div className="flex gap-2 px-8 pb-8">
                    <div className="flex-1 h-2 bg-[#4285F4] rounded-full border border-black" />
                    <div className="flex-1 h-2 bg-[#EA4335] rounded-full border border-black" />
                    <div className="flex-1 h-2 bg-[#FBBC04] rounded-full border border-black" />
                    <div className="flex-1 h-2 bg-[#34A853] rounded-full border border-black" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* team section */}
      <section className="w-full sm:px-6 md:px-10 lg:px-20 py-8 max-h-screen/20 sm:py-10 md:py-12 lg:py-16 relative z-10">
        <MeetOurTeam />
      </section>

      {/* faq section */}
      <section className="w-full relative bg-none">
        <Faq />
      </section>

      {/* footer */}
      <Footer />
    </motion.div>
  );
}
