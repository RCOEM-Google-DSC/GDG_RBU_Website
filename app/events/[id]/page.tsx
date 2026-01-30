// app/events/[id]/page.tsx  (or wherever you keep it)
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Ticket, Users, ArrowDownRight, Sparkles } from "lucide-react";
import {
  getEvent,
  getGalleryImages,
  getEventWithPartner,
  getEventFeedback,
} from "@/supabase/supabase";
import { Lightbox } from "@/app/Components/session-docs/Lightbox";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import NeoLoader from "@/app/Components/Common/NeoLoader";
import { Feedback } from "@/app/Components/feedback/Feedback";

export default function EventPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const { id } = params;

  const [event, setEvent] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({
    open: false,
    src: "",
  });
  const [feedback, setFeedback] = useState<any[]>([]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prefer the helper that returns partner data if available.
        // If getEventWithPartner exists and works, use it; otherwise fallback to getEvent.
        let eventData: any = null;
        try {
          eventData = await getEventWithPartner(id);
        } catch (e) {
          // fallback to original getEvent if partner helper fails for any reason
          eventData = await getEvent(id);
        }

        if (!eventData) notFound();

        setEvent(eventData);

        if (eventData.gallery_uid) {
          const images = await getGalleryImages(eventData.gallery_uid);
          setGalleryImages(images);
        }

        // Fetch feedback for the event
        try {
          const feedbackData = await getEventFeedback(id);
          setFeedback(feedbackData || []);
        } catch (err) {
          console.error("Error fetching feedback:", err);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        notFound();
      }
    };

    fetchData();
  }, [id]);

  if (loading || !event) {
    return <NeoLoader fullScreen text="LOADING EVENT..." />;
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

  const openImageViewer = (src: string) => {
    setLightbox({ open: true, src });
  };

  return (
    <div className="min-h-screen  font-mono text-black selection:bg-[#8338ec] selection:text-white pb-32 relative overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* hero */}
      <div className="relative max-w-6xl mx-auto p-4 md:p-6 pt-0 pb-12 md:pb-16">
        {/* NOTE: changed structure so the yellow tag is positioned relative to the image box wrapper */}
        <div className="relative">
          {/* HERO IMAGE (the bordered box) */}
          <NeoBrutalism
            border={4}
            shadow="none"
            className={`relative z-10 w-full h-[300px] md:h-[420px] 
            shadow-[6px_6px_0px_0px_#8338ec] md:shadow-[8px_8px_0px_0px_#8338ec] bg-white p-2 rotate-0 md:rotate-1 mt-36 sm:mt-32 md:mt-20 cursor-pointer group`}
            onClick={() =>
              openImageViewer(
                event.image_url
                  ? event.image_url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto/",
                  )
                  : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop",
              )
            }
          >
            <Image
              height={420}
              width={800}
              src={
                event.image_url
                  ? event.image_url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto/",
                  )
                  : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop"
              }
              alt={event.title}
              className="w-full h-full object-cover border-2 border-black  transition-transform duration-300"
            />

            <NeoBrutalism
              border={4}
              shadow="md"
              rounded="full"
              className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-2 md:p-3 z-30"
            >
              <ArrowDownRight
                size={24}
                className="md:w-8 md:h-8 text-[#8338ec]"
              />
            </NeoBrutalism>
          </NeoBrutalism>

          {/* TITLE CARD: positioned relative to the image box wrapper and pulled ABOVE it */}
          <NeoBrutalism
            border={4}
            shadow="xl"
            className={`absolute left-4 -top-10 md:-top-14 z-20 bg-[#ffbe0b] p-3 md:p-4 rotate-0 md:-rotate-2 max-w-sm md:max-w-md`}
          >
            <h1 className="text-2xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase">
              {event.title}
            </h1>
            <div className="mt-2 font-bold border-t-2 border-black pt-2 flex justify-between text-xs md:text-sm">
              <span>{eventDate}</span>
              <span className="ml-5 lg:ml-8">{event.venue || "TBA"}</span>
            </div>
          </NeoBrutalism>
        </div>
      </div>

      {/* ---------------- DESCRIPTION + STATS ---------------- */}
      <section className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
        {/* DESCRIPTION */}
        <div className="md:col-span-8">
          <NeoBrutalism
            border={4}
            shadow="xl"
            className="bg-white p-6 md:p-8 rotate-0 md:-rotate-1 relative"
          >
            <Sparkles
              className="absolute -top-4 -left-4 text-[#ffbe0b] fill-[#ffbe0b]"
              size={40}
            />
            <h2 className="text-2xl md:text-3xl font-black bg-black text-white inline-block px-2 py-1 mb-4 rotate-0 md:-rotate-1">
              THE BRIEF
            </h2>
            <p className="text-base md:text-xl font-bold leading-relaxed">
              {event.description}
            </p>
          </NeoBrutalism>
        </div>

        {/* STATS */}
        <div className="md:col-span-4 space-y-6">
          <NeoBrutalism
            border={4}
            shadow="lg"
            className="bg-[#8338ec] p-6 md:p-8 rotate-0 md:rotate-2 text-center text-white flex flex-col items-center justify-center h-full min-h-60"
          >
            <Users size={40} className="md:w-12 md:h-12 mb-3" />
            <span className="text-5xl md:text-6xl font-black">
              {participants}
            </span>
            <span className="bg-white text-black px-3 py-1 font-black uppercase text-sm md:text-base mt-2 rotate-0 md:-rotate-2 border-2 border-black">
              Minds Blown
            </span>
          </NeoBrutalism>

          {/* Download Badge Button - Show if badge_url exists */}
          {event.badge_url && (
            <a
              href={`/events/${id}/badge`}
              className={nb({
                border: 4,
                shadow: "lg",
                hover: "shadowGrow",
                className:
                  " bg-[#ffbe0b] p-6 md:p-8 rotate-0 md:-rotate-2 text-center text-black font-black uppercase text-lg md:text-xl flex flex-col items-center justify-center gap-3 cursor-pointer",
              })}
            >
              <Ticket size={40} className="md:w-12 md:h-12" />
              <span>Download Badge</span>
            </a>
          )}
        </div>
      </section>

      {/* ---------------- PARTNERS ---------------- */}
      {partnersArray.length > 0 && (
        <section className="max-w-6xl my-20 mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <NeoBrutalism
              border={4}
              shadow="md"
              className="text-2xl md:text-3xl font-black bg-white px-6 py-2 rotate-0 md:-rotate-2"
            >
              PARTNER{partnersArray.length > 1 ? "S" : ""}
            </NeoBrutalism>
          </div>

          <NeoBrutalism
            border={4}
            shadow="xl"
            className="bg-white p-6 md:p-8 flex flex-col gap-6"
          >
            {partnersArray.map((p: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center gap-4 md:gap-8"
              >
                {/* left: partner image  */}
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

                {/* right: partner details */}
                <div className="w-full md:w-2/3 flex flex-col items-start md:items-start gap-2">
                  <h3 className="font-black text-3xl">{p.name || "Partner"}</h3>
                  <div className="mt-3">
                    {p.website ? (
                      <a
                        href={String(p.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={nb({
                          border: 4,
                          shadow: "lg",
                          hover: "lift",
                          active: "push",
                          className:
                            "inline-flex items-center gap-2 bg-[#ffbe0b] text-black px-6 py-3 font-black",
                        })}
                      >
                        Visit partner website
                      </a>
                    ) : (
                      <button
                        disabled
                        className={nb({
                          border: 4,
                          shadow: "lg",
                          className:
                            "inline-flex items-center gap-2 bg-gray-200 text-black px-6 py-3 font-black opacity-60 cursor-not-allowed",
                        })}
                      >
                        No website available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </NeoBrutalism>
        </section>
      )}

      {/* ---------------- THE CREW ---------------- */}
      {event.crew_url && (
        <section className="max-w-6xl my-20 mx-auto p-4 md:p-6 relative z-10">
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
            className="bg-[#ffbe0b] p-3 md:p-4 rotate-0 md:rotate-1 cursor-pointer group"
            onClick={() =>
              openImageViewer(
                event.crew_url.replace("/upload/", "/upload/f_auto,q_auto/"),
              )
            }
          >
            <div className="bg-black p-2 border-4 border-black rotate-0 md:-rotate-1">
              <Image
                height={600}
                width={600}
                src={event.crew_url.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto/",
                )}
                alt="The Crew"
                className="w-full h-auto md:h-[530px] object-contain md:object-cover border-2 border-white contrast-125 group-hover:scale-101 transition-transform duration-300"
              />
            </div>
          </NeoBrutalism>
        </section>
      )}

      {/* ---------------- GALLERY ---------------- */}
      {galleryImages.length > 0 && (
        <section className="max-w-6xl mx-auto p-4 md:p-6 pb-24 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-6 border-b-4 border-[#8338ec] inline-block">
            Evidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((src, i) => {
              const rotationClass =
                i % 2 === 0 ? "md:-rotate-2" : "md:rotate-2";
              return (
                <div key={i} className="relative group">
                  <NeoBrutalism
                    border={4}
                    shadow="lg"
                    className={`bg-white p-4 pb-12
                  rotate-0 ${rotationClass}
                  hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer`}
                    onClick={() => openImageViewer(src)}
                  >
                    <div className="aspect-square border-2 border-black overflow-hidden bg-gray-200">
                      <Image
                        height={320}
                        width={320}
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-4 font-black text-center text-gray-400 uppercase tracking-widest">
                      FIG. {String(i + 1).padStart(2, "0")}
                    </div>
                  </NeoBrutalism>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Feedback Section */}
      <section className="my-24 max-w-6xl mx-auto p-4 md:p-6 relative z-10">
        <NeoBrutalism border={4} shadow="xl" className="bg-white p-8">
          <Feedback eventId={id} initialFeedback={feedback} />
        </NeoBrutalism>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightbox.open}
        src={lightbox.src}
        onClose={() => setLightbox({ open: false, src: "" })}
      />
    </div>
  );
}
