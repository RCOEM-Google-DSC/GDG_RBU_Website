"use client";
import React, { useEffect, useState } from "react";
import GDGPreloader from "./Components/Common/GDGPreloader";
import EventTicket from "./Components/Common/UpcomingEvent";
import { motion } from "framer-motion";
import Faq from "./Components/Landing/FAQ";
import MeetOurTeam from "./Components/Landing/MeetOurTeam";
import Footer from "./Components/Landing/Footer";
import Hero from "./Components/Landing/Hero";
import { getUpcomingEvents } from "@/supabase/supabase";

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
        const upcoming = await getUpcomingEvents();
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
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {/* Mount preloader here — it contains the session guard so it shows only once per tab,
          and GDGPreloader itself checks the pathname so it only runs on Home ("/"). */}
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
      <section className="w-full relative z-10">
        <Hero />
      </section>

      {/* upcoming events section */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-10 relative z-10">
        <motion.div
          className="w-full flex flex-col items-center justify-center pt-0 pb-12 sm:pt-0 sm:pb-14 bg-background text-foreground px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-6 sm:my-10 self-start">
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
            <div className="text-gray-500 text-center py-12">
              No upcoming events at the moment.
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
