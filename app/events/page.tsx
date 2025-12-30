// app/(yourpath)/EventsPage.tsx  (or wherever your component lives)
"use client";

import React, { useEffect, useState } from "react";
import EventTicket from "../Components/Common/UpcomingEvent";
import PastEvent from "../Components/Common/PastEvent";
import { getUpcomingEvents, getPastEvents } from "@/supabase/supabase";
import Footer from "../Components/Landing/Footer";

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
  website_url?: string | null;

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

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const [upcoming, past] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
      ]);

      
      setUpcomingEvents((upcoming || []) as Event[]);
      setPastEvents((past || []) as Event[]);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">LOADING EVENTS...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCF8]">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  min-h-screen">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* upcoming event */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 font-retron">
            Upcoming Event
          </h1>

          {upcomingEvents.length === 0 ? (
            <div className="text-gray-500 text-center py-12">
              No upcoming events at the moment.
            </div>
          ) : (
            <div className="space-y-6">
              {upcomingEvents.map((event) => {
                const registerUrl = event.register_url ?? REGISTER_URL;
                const imageSrc = cloudinarySafe(
                  event.image_url ?? FALLBACK_IMAGE,
                );

                // debug each item's image prior to passing to EventTicket
                console.log(
                  `Event ${event.id} image:`,
                  event.image_url,
                  "-> use:",
                  imageSrc,
                );

                return (
                  <EventTicket
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={
                      event.date
                        ? new Date(event.date)
                        : new Date(event.event_time)
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
              })}
            </div>
          )}
        </div>
      </div>

      {/* past events */}
      <section className=" py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 font-retron">
            Past Events
          </h1>
          {pastEvents.length === 0 ? (
            <div className="text-gray-500 text-center py-12">
              No past events to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {pastEvents.map((event) => {
                const imageSrc = cloudinarySafe(
                  event.image_url ?? FALLBACK_IMAGE,
                );
                return (
                  <PastEvent
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={
                      event.date ||
                      new Date(event.event_time)
                        .toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase()
                    }
                    image={imageSrc}
                    tags={[event.status]}
                    tagColor="#4285F4"
                    description={event.description}
                    website_url={event.website_url == null ? `/events/${event.id}` : event.website_url}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mt-20">
        <Footer />
      </section>
    </div>
  );
};

export default EventsPage;
