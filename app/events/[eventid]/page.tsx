"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Ticket, Users, ArrowDownRight, Sparkles } from "lucide-react";
import { getEvent, getGalleryImages } from "@/supabase/supabase";

export default function EventPage({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) {
  const [event, setEvent] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    params.then(async ({ eventid }) => {
      try {
        const eventData = await getEvent(eventid);
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
    });
  }, [params]);

  if (loading || !event) {
    return (
      <div className="min-h-screen grid place-items-center font-black text-2xl">
        LOADING EVENT…
      </div>
    );
  }

  /* ---------------- DERIVED ---------------- */
  const eventDate = new Date(
    event.event_time || event.date
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const participants =
    event.max_participants ? `${event.max_participants}+` : "∞";

  const price = event.is_paid ? `₹${event.fee}` : "FREE";

  /* ---------------- STYLES ---------------- */
  const border = "border-4 border-black";
  const shadow = "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
  const cardBase = `bg-white ${border} ${shadow}`;

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-mono text-black selection:bg-[#8338ec] selection:text-white pb-32 relative overflow-x-hidden">

      {/* BACKGROUND DOTS */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ---------------- HERO ---------------- */}
      <div className="relative max-w-7xl mx-auto p-4 md:p-12 pt-12 mb-12">
        {/* TITLE CARD */}
        <div
          className={`absolute top-0 left-4 md:left-12 z-20 bg-[#ffbe0b] p-6 -rotate-2 ${border} ${shadow} max-w-lg`}
        >
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
            {event.title}
          </h1>
          <div className="mt-2 font-bold border-t-4 border-black pt-2 flex justify-between">
            <span>{eventDate}</span>
            <span>{event.venue || "TBA"}</span>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className={`relative z-10 w-full aspect-video md:aspect-[21/9] ${border}
          shadow-[16px_16px_0px_0px_#8338ec] bg-white p-2 rotate-1 mt-16 md:mt-8`}
        >
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover border-2 border-black"
          />

          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] z-30">
            <ArrowDownRight size={48} className="text-[#8338ec]" />
          </div>
        </div>
      </div>

      {/* ---------------- DESCRIPTION + STATS ---------------- */}
      <section className="max-w-7xl mx-auto p-4 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

        {/* DESCRIPTION */}
        <div className="md:col-span-8">
          <div className={`${cardBase} p-8 md:p-12 -rotate-1 relative`}>
            <Sparkles
              className="absolute -top-6 -left-6 text-[#ffbe0b] fill-[#ffbe0b]"
              size={64}
            />
            <h2 className="text-3xl font-black bg-black text-white inline-block px-2 py-1 mb-6 -rotate-1">
              THE BRIEF
            </h2>
            <p className="text-xl md:text-3xl font-bold leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="md:col-span-4">
          <div
            className={`bg-[#8338ec] p-8 ${border} shadow-[8px_8px_0px_0px_#000]
            rotate-2 text-center text-white flex flex-col items-center justify-center aspect-square`}
          >
            <Users size={64} className="mb-4" />
            <span className="text-8xl font-black">{participants}</span>
            <span className="bg-white text-black px-4 py-1 font-black uppercase text-xl mt-2 -rotate-2 border-2 border-black">
              Minds Blown
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- THE CREW ---------------- */}
      {event.crew_url && (
        <section className="max-w-7xl mx-auto p-4 md:p-12 relative z-10">
          <div className="flex justify-center mb-8">
            <h2 className="text-5xl font-black bg-white px-8 py-2 border-4 border-black -rotate-2 shadow-[4px_4px_0px_0px_#000]">
              THE CREW
            </h2>
          </div>

          <div className={`${cardBase} p-4 bg-[#ffbe0b] rotate-1`}>
            <div className="bg-black p-2 border-4 border-black -rotate-1">
              <img
                src={event.crew_url}
                alt="The Crew"
                className="w-full h-[420px] object-cover border-2 border-white contrast-125"
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------------- GALLERY ---------------- */}
      {galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto p-4 md:p-12 pb-24 relative z-10">
          <h2 className="text-4xl font-black uppercase mb-12 border-b-8 border-[#8338ec] inline-block">
            Evidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative group">
                <div
                  className={`bg-white p-4 pb-12 ${border}
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                  ${i % 2 === 0 ? "-rotate-2" : "rotate-2"}
                  hover:rotate-0 hover:scale-105 transition-transform duration-300`}
                >
                  <div className="aspect-square border-2 border-black overflow-hidden bg-gray-200">
                    <img
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
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {event.status === "upcoming" && (
        <div className="fixed bottom-8 right-4 md:right-8 z-50">
          <button
            className={`bg-[#ffbe0b] text-black text-xl md:text-2xl font-black
            py-4 px-8 border-4 border-black
            shadow-[8px_8px_0px_0px_#000]
            hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]
            active:translate-y-1 active:shadow-[4px_4px_0px_0px_#000]
            transition-all flex items-center gap-3 rotate-1`}
          >
            <Ticket size={28} />
            GRAB TICKET {price}
          </button>
        </div>
      )}
    </div>
  );
}
