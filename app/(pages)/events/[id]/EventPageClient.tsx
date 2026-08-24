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
  hasUserSubmittedFeedback,
  checkUserAttendedEvent,
  getCurrentUserId,
} from "@/supabase/supabase";
import { Lightbox } from "@/app/Components/session-docs/Lightbox";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import { Feedback } from "@/app/Components/feedback/Feedback";

export default function EventPageClient({ id }: { id: string }) {
  const [event, setEvent] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({
    open: false,
    src: "",
  });
  const [feedback, setFeedback] = useState<any[]>([]);
  const [canSubmitFeedback, setCanSubmitFeedback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let eventData: any = null;
        try {
          eventData = await getEventWithPartner(id);
        } catch {
          eventData = await getEvent(id);
        }

        if (!eventData) notFound();

        setEvent(eventData);

        if (eventData.gallery_uid) {
          const images = await getGalleryImages(eventData.gallery_uid);
          setGalleryImages(images);
        }

        try {
          const feedbackData = await getEventFeedback(id);
          setFeedback(feedbackData || []);
        } catch (err) {
          console.error("Error fetching feedback:", err);
        }

        const userId = await getCurrentUserId();
        if (userId) {
          const hasAttended = await checkUserAttendedEvent(id);
          const hasSubmitted = await hasUserSubmittedFeedback(id);
          const eventDate = new Date(eventData.event_time || eventData.date);
          const isPastEvent = eventDate < new Date();

          setCanSubmitFeedback(hasAttended && !hasSubmitted && isPastEvent);
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
    return (
      <div className="min-h-screen grid place-items-center font-black text-2xl">
        LOADING EVENT…
      </div>
    );
  }

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

  const makeSafeUrl = (u: string | null | undefined) =>
    u ? String(u).replace("/upload/", "/upload/f_auto,q_auto/") : "";

  const rawPartners = event.partners ?? event.partner ?? null;
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
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto p-4 md:p-6 pt-0 pb-12 md:pb-16">
        <div className="relative">
          <NeoBrutalism
            border={4}
            shadow="none"
            className={`relative z-10 w-full h-[300px] md:h-[420px] 
            shadow-[6px_6px_0px_0px_#8338ec] md:shadow-[8px_8px_0px_0px_#8338ec] bg-white p-2 rotate-0 md:rotate-1 mt-36 sm:mt-32 md:mt-20 cursor-pointer group`}
            onClick={() =>
              openImageViewer(
                event.image_url
                  ? event.image_url.replace("/upload/", "/upload/f_auto,q_auto/")
                  : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop",
              )
            }
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
              className="w-full h-full object-cover border-2 border-black  transition-transform duration-300"
            />

            <NeoBrutalism border={4} shadow="md" rounded="full" className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-2 md:p-3 z-30">
              <ArrowDownRight
                size={24}
                className="md:w-8 md:h-8 text-[#8338ec]"
              />
            </NeoBrutalism>
          </NeoBrutalism>

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

      <section className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
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

          {event.badge_url && (
            <a
              href={`/events/${id}/badge`}
              className={nb({
                border: 4,
                shadow: "lg",
                hover: "shadowGrow",
                className:
                  "bg-[#ffbe0b] p-6 md:p-8 rotate-0 md:-rotate-2 text-center text-black font-black uppercase text-lg md:text-xl flex flex-col items-center justify-center gap-3 cursor-pointer",
              })}
            >
              <Ticket size={40} className="md:w-12 md:h-12" />
              <span>Download Badge</span>
            </a>
          )}
        </div>
      </section>

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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {partnersArray.map((partner: any, idx: number) => (
              <NeoBrutalism
                key={idx}
                border={4}
                shadow="lg"
                className="bg-white p-3 md:p-4 flex items-center justify-center aspect-square"
              >
                {partner.logo_url ? (
                  <Image
                    src={makeSafeUrl(partner.logo_url)}
                    alt={partner.name || `Partner ${idx + 1}`}
                    width={220}
                    height={220}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="font-black text-center text-sm md:text-base">
                    {partner.name || `Partner ${idx + 1}`}
                  </span>
                )}
              </NeoBrutalism>
            ))}
          </div>
        </section>
      )}

      {galleryImages.length > 0 && (
        <section className="max-w-6xl my-20 mx-auto p-4 md:p-6 relative z-10">
          <div className="flex justify-center mb-6">
            <NeoBrutalism
              border={4}
              shadow="md"
              className="text-2xl md:text-3xl font-black bg-white px-6 py-2 rotate-0 md:rotate-2"
            >
              GALLERY
            </NeoBrutalism>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                type="button"
                className="block text-left"
                onClick={() => openImageViewer(makeSafeUrl(src))}
              >
                <NeoBrutalism
                  border={4}
                  shadow="lg"
                  className="bg-white p-2 cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={makeSafeUrl(src)}
                      alt={`${event.title} gallery image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </NeoBrutalism>
              </button>
            ))}
          </div>
        </section>
      )}

      {(feedback.length > 0 || canSubmitFeedback) && (
        <section className="max-w-6xl my-20 mx-auto p-4 md:p-6 relative z-10">
          <Feedback
            eventId={id}
            initialFeedback={feedback}
            canSubmitFeedback={canSubmitFeedback}
          />
        </section>
      )}

      <Lightbox
        open={lightbox.open}
        src={lightbox.src}
        onCloseAction={() => setLightbox({ open: false, src: "" })}
      />
    </div>
  );
}
