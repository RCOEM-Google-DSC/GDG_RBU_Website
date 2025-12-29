// app/events/[eventid]/page.tsx  (or wherever you keep it)
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Ticket, Users, ArrowDownRight, Sparkles } from "lucide-react";
import { getEvent, getGalleryImages, getEventWithPartner } from "@/supabase/supabase";

export default function EventPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventid: string }>;
}) {
  const params = React.use(paramsPromise);
  const { eventid } = params;

  const [event, setEvent] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prefer the helper that returns partner data if available.
        // If getEventWithPartner exists and works, use it; otherwise fallback to getEvent.
        let eventData: any = null;
        try {
          eventData = await getEventWithPartner(eventid);
        } catch (e) {
          // fallback to original getEvent if partner helper fails for any reason
          eventData = await getEvent(eventid);
        }

        if (!eventData) notFound();

        setEvent(eventData);

        if (eventData.gallery_uid) {
          const images = await getGalleryImages(eventData.gallery_uid);
          setGalleryImages(images);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        notFound();
      }
    };

    fetchData();
  }, [eventid]);

  if (loading || !event) {
    return (
      <div className="min-h-screen grid place-items-center font-black text-2xl">
        LOADING EVENT…
      </div>
    );
  }

  /* ---------------- DERIVED ---------------- */
  const eventDate = new Date(event.event_time || event.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const participants = event.max_participants
    ? `${event.max_participants}+`
    : "∞";

  const price = event.is_paid ? `₹${event.fee}` : "FREE";

  /* ---------------- STYLES ---------------- */
  const border = "border-4 border-black";
  const shadow = "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
  const cardBase = `bg-white ${border} ${shadow}`;

  // small helper to normalize partner data and image urls
  const makeSafeUrl = (u: string | null | undefined) =>
    u ? String(u).replace("/upload/", "/upload/f_auto,q_auto/") : "";

  // partner may be returned as `partners` (object or array) depending on your supabase query
  const rawPartners = event.partners ?? event.partner ?? null; // try multiple possible keys
  const partnersArray = Array.isArray(rawPartners)
    ? rawPartners
    : rawPartners
    ? [rawPartners]
    : [];

  return (
    <div className="min-h-screen  font-mono text-black selection:bg-[#8338ec] selection:text-white pb-32 relative overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* hero */}
      <div className="relative max-w-6xl mx-auto p-4 md:p-6 pt-0 pb-12 md:pb-16">
        {/* TITLE CARD */}
        <div
          className={`absolute top-12 md:top-16 left-4 md:left-6 z-20 bg-[#ffbe0b] p-3 md:p-4 rotate-0 md:-rotate-2 ${border} ${shadow} max-w-sm md:max-w-md`}
        >
          <h1 className="text-2xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase">
            {event.title}
          </h1>
          <div className="mt-2 font-bold border-t-2 border-black pt-2 flex justify-between text-xs md:text-sm">
            <span>{eventDate}</span>
            <span>{event.venue || "TBA"}</span>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className={`relative z-10 w-full h-[300px] md:h-[420px] ${border}
          shadow-[6px_6px_0px_0px_#8338ec] md:shadow-[8px_8px_0px_0px_#8338ec] bg-white p-2 rotate-0 md:rotate-1 mt-24 md:mt-20`}
        >
          <Image
            height={420}
            width={800}
            src={
              event.image_url
                ? event.image_url.replace("/upload/", "/upload/f_auto,q_auto/")
                : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop"
            }
            alt={event.title}
            className="w-full h-full object-cover border-2 border-black"
          />

          <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-2 md:p-3 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] z-30">
            <ArrowDownRight
              size={24}
              className="md:w-8 md:h-8 text-[#8338ec]"
            />
          </div>
        </div>
      </div>

      {/* ---------------- DESCRIPTION + STATS ---------------- */}
      <section className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
        {/* DESCRIPTION */}
        <div className="md:col-span-8">
          <div
            className={`${cardBase} p-6 md:p-8 rotate-0 md:-rotate-1 relative`}
          >
            <Sparkles
              className="absolute -top-4 -left-4 text-[#ffbe0b] fill-[#ffbe0b]"
              size={40}
            />
            <h2 className="text-2xl md:text-3xl font-black bg-black text-white inline-block px-2 py-1 mb-4 -rotate-0 md:-rotate-1">
              THE BRIEF
            </h2>
            <p className="text-base md:text-xl font-bold leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="md:col-span-4">
          <div
            className={`bg-[#8338ec] p-6 md:p-8 ${border} shadow-[6px_6px_0px_0px_#000]
            rotate-0 md:rotate-2 text-center text-white flex flex-col items-center justify-center h-full min-h-[240px]`}
          >
            <Users size={40} className="md:w-12 md:h-12 mb-3" />
            <span className="text-5xl md:text-6xl font-black">
              {participants}
            </span>
            <span className="bg-white text-black px-3 py-1 font-black uppercase text-sm md:text-base mt-2 -rotate-0 md:-rotate-2 border-2 border-black">
              Minds Blown
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- PARTNERS (ADDED) ---------------- */}
      {partnersArray.length > 0 && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black bg-white px-6 py-2 border-4 border-black rotate-0 md:-rotate-2 shadow-[4px_4px_0px_0px_#000]">
              PARTNER{partnersArray.length > 1 ? "S" : ""}
            </h2>
          </div>

          <div className={`${cardBase} p-6 md:p-8 flex flex-col gap-6`}>
            {partnersArray.map((p: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="w-full md:w-1/3 flex items-center justify-center">
                  {p.logo_url ? (
                    <Image
                      src={makeSafeUrl(p.logo_url)}
                      alt={p.name || `partner-${idx}`}
                      width={320}
                      height={140}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-40 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center">
                      <span className="text-sm text-gray-500">No logo</span>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-2/3 flex flex-col items-start md:items-start gap-2">
                  <div className="font-black text-lg">{p.name || "Partner"}</div>
                  {p.website && (
                    <div className="text-sm text-gray-600 break-all">{p.website}</div>
                  )}
                  <div className="mt-3">
                    {p.website ? (
                      <a
                        href={String(p.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#ffbe0b] text-black px-6 py-3 font-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 active:translate-y-1 transition-all"
                      >
                        Visit partner website
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 bg-gray-200 text-black px-6 py-3 font-black border-4 border-black shadow-[6px_6px_0px_0px_#000] opacity-60 cursor-not-allowed"
                      >
                        No website available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- THE CREW ---------------- */}
      {event.crew_url && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black bg-white px-6 py-2 border-4 border-black rotate-0 md:-rotate-2 shadow-[4px_4px_0px_0px_#000]">
              THE CREW
            </h2>
          </div>

          <div
            className={`${cardBase} p-3 md:p-4 bg-[#ffbe0b] rotate-0 md:rotate-1`}
          >
            <div className="bg-black p-2 border-4 border-black rotate-0 md:-rotate-1">
              <Image
              height={340}
              width={600}
                src={event.crew_url.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto/",
                )}
                alt="The Crew"
                className="w-full h-[280px] md:h-[340px] object-cover border-2 border-white contrast-125"
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------------- GALLERY ---------------- */}
      {galleryImages.length > 0 && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 pb-24 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-6 border-b-4 border-[#8338ec] inline-block">
            Evidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((src, i) => {
              const rotationClass =
                i % 2 === 0 ? "md:-rotate-2" : "md:rotate-2";
              return (
                <div key={i} className="relative group">
                  <div
                    className={`bg-white p-4 pb-12 ${border}
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                  rotate-0 ${rotationClass}
                  hover:rotate-0 hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="aspect-square border-2 border-black overflow-hidden bg-gray-200">
                      <Image
                        height={320}
                        width={320}
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 font-black text-center text-gray-400 uppercase tracking-widest">
                      FIG. {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

  
    </div>
  );
}
