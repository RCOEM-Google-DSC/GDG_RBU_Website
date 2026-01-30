// app/events/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Ticket,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { getEventWithPartner } from "@/supabase/supabase";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

type EventRecord = {
  id: string;
  title?: string;
  description?: string;
  venue?: string | null;
  date?: string | null;
  time?: string | null;
  event_time?: string | null;
  image_url?: string | null;
  crew_url?: string | null;
  is_paid?: boolean | null;
  fee?: number | null;
  status?: string | null;
  whatsapp_url?: string | null;
  gallery_uid?: string | null;
  partner_id?: string | null;
  partners?: any; // can be object or array
  is_team_event?: boolean | null;
  min_team_size?: number | null;
  max_team_size?: number | null;
  // other fields allowed
  [k: string]: any;
};

export default function UpcomingEventPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resolved =
          typeof (params as any).then === "function"
            ? await (params as any)
            : (params as any);
        const { id } = resolved;

        // <-- fetch event WITH partner relation
        const eventData = await getEventWithPartner(id);
        if (!eventData) {
          if (!mounted) return;
          setNotFoundState(true);
          setLoading(false);
          return;
        }

        if (!mounted) return;
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error("Event load error", err);
        if (mounted) {
          setNotFoundState(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center font-black text-2xl bg-[#FDFCF8]">
        Loading event…
      </div>
    );
  }

  if (notFoundState || !event) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#FDFCF8]">
        <div className="text-center">
          <h2 className="text-3xl font-black">Event not found</h2>
          <p className="text-gray-600 mt-2">This event doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push("/events")}
            className={nb({
              border: 4,
              shadow: "lg",
              className: "mt-6 inline-block bg-black text-white px-5 py-3 font-bold",
            })}
          >
            Back to events
          </button>
        </div>
      </div>
    );
  }

  // ---------------- helpers ----------------
  const safeImg = (url?: string | null, fallback = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop") =>
    url ? String(url).replace("/upload/", "/upload/f_auto,q_auto/") : fallback;
  const resigerUrl = "https://vision.hack2skill.com/event/gdgoc-25-techsprint-rbu?utm_source=hack2skill&utm_medium=homepage" 

  // partner may come as object or array depending on how the join returns
  const partnerData = (() => {
    if (!event.partners) return null;
    if (Array.isArray(event.partners)) return event.partners[0] ?? null;
    return event.partners;
  })();

  const eventImage = safeImg(event.image_url);
  const crewImage = event.crew_url ? safeImg(event.crew_url) : null;

  const eventDate = (() => {
    if (event.date) return event.date;
    if (event.event_time) {
      try {
        return new Date(String(event.event_time)).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch {}
    }
    return "TBA";
  })();

  const eventTime = (() => {
    if (event.time) return event.time;
    if (event.event_time) {
      try {
        return new Date(String(event.event_time)).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {}
    }
    return "TBA";
  })();

  const eventVenue = event.venue || event.location || "TBA";
  const price = event.is_paid ? `₹${event.fee ?? 0}` : "FREE";

  return (
    <div className="min-h-screen font-mono text-black selection:bg-[#8338ec] selection:text-white pb-32 relative overflow-x-hidden bg-[#FDFCF8]">
      {/* background grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: "80px 80px",
        }}
      />

      {/* HERO */}
      <div className="relative max-w-6xl mx-auto p-4 md:p-6 pt-0 pb-12 md:pb-16">
        <NeoBrutalism
          border={4}
          shadow="xl"
          className="absolute top-12 md:top-16 left-4 md:left-6 z-20 bg-[#ffbe0b] p-3 md:p-4 rotate-0 md:-rotate-2 max-w-sm md:max-w-md"
        >
          <h1 className="text-2xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase">{event.title}</h1>
          <div className="mt-2 font-bold border-t-2 border-black pt-2 flex justify-between text-xs md:text-sm">
            <span>{eventDate}</span>
            <span>{eventVenue}</span>
          </div>
        </NeoBrutalism>

        <NeoBrutalism
          border={4}
          shadow="none"
          className="relative z-10 w-full h-[300px] md:h-[420px] shadow-[6px_6px_0px_0px_#8338ec] md:shadow-[8px_8px_0px_0px_#8338ec] bg-white p-2 rotate-0 md:rotate-1 mt-24 md:mt-20"
        >
          <Image height={420} width={1200} src={eventImage} alt={event.title || "Event image"} className="w-full h-full object-cover border-2 border-black" />

          <NeoBrutalism
            border={4}
            shadow="md"
            className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-2 md:p-3 rounded-full z-30"
          >
            <ArrowDownRight size={24} className="md:w-8 md:h-8 text-[#8338ec]" />
          </NeoBrutalism>
        </NeoBrutalism>
      </div>

      {/* DESCRIPTION + KEY INFO */}
      <section className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
        {/* DESCRIPTION */}
        <div className="md:col-span-8">
          <NeoBrutalism
            border={4}
            shadow="xl"
            className="bg-white p-6 md:p-8 rotate-0 md:-rotate-1 relative"
          >
            <Sparkles className="absolute -top-4 -left-4 text-[#ffbe0b] fill-[#ffbe0b]" size={40} />
            <h2 className="text-2xl md:text-3xl font-black bg-black text-white inline-block px-2 py-1 mb-4 -rotate-0 md:-rotate-1">THE BRIEF</h2>
            <p className="text-base md:text-xl font-bold leading-relaxed">{event.description}</p>
          </NeoBrutalism>
        </div>

        {/* KEY INFO */}
        <div className="md:col-span-4">
          <NeoBrutalism
            border={4}
            shadow="lg"
            className="p-6 md:p-8 rotate-0 md:rotate-2 text-center bg-white flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 justify-center">
              <div className="p-2.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                <p className="text-gray-900 font-semibold text-sm">{eventDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <div className="p-2.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Time</p>
                <p className="text-gray-900 font-semibold text-sm">{eventTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <div className="p-2.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Venue</p>
                <p className="text-gray-900 font-semibold text-sm truncate max-w-[140px]" title={eventVenue}>{eventVenue}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <div className="p-2.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Ticket size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Entry Fee</p>
                <p className="text-gray-900 font-semibold text-sm">{price}</p>
              </div>
            </div>
          </NeoBrutalism>
        </div>
      </section>

      {/* CREW */}
      {crewImage && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <NeoBrutalism
              border={4}
              shadow="md"
              className="text-2xl md:text-3xl font-black bg-white px-6 py-2 rotate-0 md:-rotate-2"
            >
              THE CREW
            </NeoBrutalism>
          </div>

          <NeoBrutalism
            border={4}
            shadow="xl"
            className="p-3 md:p-4 bg-[#ffbe0b] rotate-0 md:rotate-1"
          >
            <NeoBrutalism
              border={4}
              shadow="none"
              className="bg-black p-2 rotate-0 md:-rotate-1"
            >
              <Image height={340} width={600} src={crewImage} alt="The Crew" className="w-full h-[280px] md:h-[340px] object-cover border-2 border-white contrast-125" />
            </NeoBrutalism>
          </NeoBrutalism>
        </section>
      )}

      {/* PARTNER */}
      {partnerData && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <NeoBrutalism
              border={4}
              shadow="md"
              className="text-2xl md:text-3xl font-black bg-white px-6 py-2 rotate-0 md:-rotate-2"
            >
              PARTNER
            </NeoBrutalism>
          </div>

          <NeoBrutalism
            border={4}
            shadow="xl"
            className="p-6 md:p-8 rotate-0 md:rotate-1 bg-white"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {partnerData.logo_url && (
                <NeoBrutalism
                  border={4}
                  shadow="md"
                  className="bg-white p-4"
                >
                  <Image
                    src={String(partnerData.logo_url).replace("/upload/", "/upload/f_auto,q_auto/")}
                    alt={partnerData.name || "Partner logo"}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </NeoBrutalism>
              )}

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black mb-2">{partnerData.name}</h3>
                {partnerData.website && (
                  <a
                    href={partnerData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={nb({
                      border: 4,
                      shadow: "md",
                      hover: "liftSmall",
                      className:
                        "inline-block mt-2 bg-[#ffbe0b] text-black font-black px-4 py-2",
                    })}
                  >
                    Visit partner
                  </a>
                )}
              </div>
            </div>
          </NeoBrutalism>
        </section>
      )}

      {/* TEAM DETAILS (if applicable) */}
      {event.is_team_event && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <NeoBrutalism
              border={4}
              shadow="md"
              className="text-2xl md:text-3xl font-black bg-white px-6 py-2 rotate-0 md:-rotate-2"
            >
              TEAM INFO
            </NeoBrutalism>
          </div>

          <NeoBrutalism
            border={4}
            shadow="xl"
            className="p-6 md:p-8 rotate-0 md:rotate-1 bg-white"
          >
            <p className="font-bold mb-2">This is a team event.</p>
            <div className="flex gap-4 items-center">
              <NeoBrutalism
                border={4}
                shadow="md"
                className="bg-white p-3"
              >
                <div className="text-sm text-gray-500">Min team size</div>
                <div className="text-xl font-black">{event.min_team_size ?? "N/A"}</div>
              </NeoBrutalism>
              <NeoBrutalism
                border={4}
                shadow="md"
                className="bg-white p-3"
              >
                <div className="text-sm text-gray-500">Max team size</div>
                <div className="text-xl font-black">{event.max_team_size ?? "N/A"}</div>
              </NeoBrutalism>
            </div>
          </NeoBrutalism>
        </section>
      )}

      {/* CTA: Register */}
      {event.status === "upcoming" && (
        <div className="fixed bottom-6 md:bottom-8 right-4 md:right-6 z-50">
          <button
            onClick={() => {
              router.push(resigerUrl);
            }}
            className={nb({
              border: 4,
              shadow: "lg",
              hover: "lift",
              active: "push",
              className:
                "bg-[#ffbe0b] text-black text-lg md:text-xl font-black py-3 px-6 md:py-4 md:px-8 flex items-center gap-2 md:gap-3 rotate-0 md:rotate-1 md:shadow-[8px_8px_0_0px_#000]",
            })}
          >
            <Ticket size={20} className="md:w-7 md:h-7" />
            Register
          </button>
        </div>
      )}
    </div>
  );
}
