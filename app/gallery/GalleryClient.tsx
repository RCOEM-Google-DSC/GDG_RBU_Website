"use client";

import { Lightbox } from "@/app/Components/session-docs/Lightbox";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";
import type { GalleryFilterOption, GalleryPhotoItem } from "@/lib/types";
import { Images } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Footer from "../Components/Landing/Footer";

type GalleryClientProps = {
  photos: GalleryPhotoItem[];
  filters: GalleryFilterOption[];
};

const ROTATIONS = [
  "md:-rotate-2",
  "md:rotate-2",
  "md:-rotate-1",
  "md:rotate-1",
];
const FILTER_COLORS = [
  "bg-[#4285F4]",
  "bg-[#EA4335]",
  "bg-[#FBBC04]",
  "bg-[#34A853]",
];

export default function GalleryClient({ photos, filters }: GalleryClientProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({
    open: false,
    src: "",
  });

  const filteredPhotos = useMemo(() => {
    if (!selectedEventId) return photos;
    return photos.filter((photo) => photo.eventId === selectedEventId);
  }, [photos, selectedEventId]);

  const groupedPhotos = useMemo(() => {
    const groups = new Map<
      string,
      {
        eventId: string;
        eventTitle: string;
        eventDateLabel: string;
        photos: GalleryPhotoItem[];
      }
    >();

    filteredPhotos.forEach((photo) => {
      const existingGroup = groups.get(photo.eventId);

      if (existingGroup) {
        existingGroup.photos.push(photo);
        return;
      }

      groups.set(photo.eventId, {
        eventId: photo.eventId,
        eventTitle: photo.eventTitle,
        eventDateLabel: photo.eventDateLabel,
        photos: [photo],
      });
    });

    const preferredOrder = selectedEventId
      ? [selectedEventId]
      : filters.map((filter) => filter.eventId);

    const orderedGroups: Array<{
      eventId: string;
      eventTitle: string;
      eventDateLabel: string;
      photos: GalleryPhotoItem[];
    }> = [];

    const seen = new Set<string>();

    preferredOrder.forEach((eventId) => {
      const group = groups.get(eventId);
      if (!group) return;
      orderedGroups.push(group);
      seen.add(eventId);
    });

    groups.forEach((group, eventId) => {
      if (seen.has(eventId)) return;
      orderedGroups.push(group);
    });

    return orderedGroups;
  }, [filteredPhotos, filters, selectedEventId]);

  const toggleFilter = (eventId: string) => {
    setSelectedEventId((current) => (current === eventId ? null : eventId));
  };

  const openLightbox = (src: string) => {
    setLightbox({ open: true, src });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "" });
  };

  return (
    <div className="min-h-screen font-mono pt-6 sm:pt-8 md:pt-10 text-black selection:bg-[#8338ec] selection:text-white relative overflow-x-hidden bg-[#FDFCF8]">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <section className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <NeoBrutalism
          border={4}
          shadow="xl"
          className="bg-white p-4 sm:p-5 md:p-8 rotate-0 md:-rotate-1"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight">
                Evidence
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-bold text-gray-700 mt-1 sm:mt-2 uppercase tracking-wide">
                Global Event Gallery
              </p>
            </div>

            <NeoBrutalism
              border={4}
              shadow="md"
              className="bg-[#ffbe0b] px-3 py-3 sm:px-4 sm:py-4 text-[11px] sm:text-xs md:text-sm font-black uppercase"
            >
              {photos.length} Photo{photos.length === 1 ? "" : "s"}
            </NeoBrutalism>
          </div>

          <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-gray-700 mt-4 mb-3">
            {selectedEventId
              ? `Showing ${filteredPhotos.length} photos`
              : `Showing all ${filteredPhotos.length} photos across ${filters.length} events`}
          </p>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 md:flex-wrap">
            {filters.map((filter, index) => {
              const isSelected = selectedEventId === filter.eventId;
              const bgColor = FILTER_COLORS[index % FILTER_COLORS.length];

              return (
                <button
                  key={filter.eventId}
                  onClick={() => toggleFilter(filter.eventId)}
                  className={nb({
                    border: 3,
                    shadow: isSelected ? "xl" : "md",
                    hover: "liftSmall",
                    active: "push",
                    className: `shrink-0 px-3 py-2 md:px-4 md:py-2 font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wide transition-transform ${
                      isSelected
                        ? "bg-black text-white"
                        : `${bgColor} text-black`
                    }`,
                  })}
                  aria-pressed={isSelected}
                >
                  <span>{filter.eventTitle}</span>
                  <span className="ml-2 opacity-80">
                    ({filter.totalPhotos})
                  </span>
                </button>
              );
            })}

            {selectedEventId && (
              <button
                onClick={() => setSelectedEventId(null)}
                className={nb({
                  border: 3,
                  shadow: "md",
                  hover: "liftSmall",
                  active: "push",
                  className:
                    "shrink-0 px-3 py-2 md:px-4 md:py-2 bg-white text-black font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wide",
                })}
              >
                Clear Filter
              </button>
            )}
          </div>
        </NeoBrutalism>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-10 sm:pb-12">
        {photos.length === 0 ? (
          <NeoBrutalism
            border={4}
            shadow="xl"
            className="bg-white p-10 text-center"
          >
            <Images size={46} className="mx-auto mb-4" />
            <h3 className="text-2xl font-black uppercase mb-3">
              No Gallery Photos Yet
            </h3>
            <p className="font-bold text-gray-600 uppercase tracking-wide text-sm">
              Event photos will appear here once galleries are available.
            </p>
          </NeoBrutalism>
        ) : filteredPhotos.length === 0 ? (
          <NeoBrutalism
            border={4}
            shadow="xl"
            className="bg-white p-10 text-center"
          >
            <h3 className="text-2xl font-black uppercase mb-3">
              No Photos In This Filter
            </h3>
            <p className="font-bold text-gray-600 uppercase tracking-wide text-sm">
              Try another event or clear the current filter.
            </p>
          </NeoBrutalism>
        ) : (
          <div className="space-y-12">
            {groupedPhotos.map((group, groupIndex) => (
              <NeoBrutalism
                key={group.eventId}
                border={4}
                shadow="xl"
                className="relative bg-white p-4 md:p-6"
              >
                <NeoBrutalism
                  border={3}
                  shadow="md"
                  rounded="full"
                  className="inline-flex max-w-full items-center bg-[#ffbe0b] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wide mb-4 md:mb-6"
                >
                  <span className="truncate max-w-[160px] sm:max-w-[260px] md:max-w-[320px]">
                    {group.eventTitle}
                  </span>
                  <span className="mx-1.5 sm:mx-2">•</span>
                  <span>{group.eventDateLabel}</span>
                </NeoBrutalism>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                  {group.photos
                    .filter((photo) => !photo.isTeamPhoto)
                    .map((photo, index) => {
                      const rotationClass =
                        ROTATIONS[(index + groupIndex) % ROTATIONS.length];

                      return (
                        <div key={photo.id} className="relative group">
                          <NeoBrutalism
                            border={4}
                            shadow="lg"
                            className={`bg-white p-4 pb-12 rotate-0 ${rotationClass} hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
                            onClick={() => openLightbox(photo.photoUrl)}
                          >
                            <div className="aspect-square border-2 border-black overflow-hidden bg-gray-200">
                              <Image
                                src={photo.photoUrl}
                                alt={`${photo.eventTitle} gallery photo ${photo.figureNumber}`}
                                width={500}
                                height={500}
                                loading="lazy"
                                unoptimized
                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            <p className="mt-4 text-center font-black text-gray-500 uppercase tracking-[0.2em] text-xs">
                              FIG. {String(photo.figureNumber).padStart(2, "0")}
                            </p>
                          </NeoBrutalism>
                        </div>
                      );
                    })}
                </div>

                {group.photos.some((photo) => photo.isTeamPhoto) && (
                  <div className="mt-6 sm:mt-8">
                    {group.photos
                      .filter((photo) => photo.isTeamPhoto)
                      .map((teamPhoto) => (
                        <NeoBrutalism
                          key={teamPhoto.id}
                          border={4}
                          shadow="xl"
                          className="bg-blue-400/70 p-3 md:p-4 cursor-pointer group"
                          onClick={() => openLightbox(teamPhoto.photoUrl)}
                        >
                          <NeoBrutalism
                            border={3}
                            shadow="none"
                            className="bg-black p-2 md:p-3"
                          >
                            <div className="w-full overflow-hidden border-2 border-white bg-black">
                              <Image
                                src={teamPhoto.photoUrl}
                                alt={`${teamPhoto.eventTitle} team photo`}
                                width={1600}
                                height={900}
                                loading="lazy"
                                unoptimized
                                sizes="100vw"
                                className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain md:object-cover group-hover:scale-[1.01] transition-transform duration-300"
                              />
                            </div>
                          </NeoBrutalism>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <NeoBrutalism
                              border={2}
                              shadow="sm"
                              rounded="full"
                              className="inline-flex items-center bg-[#34A853] px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wide text-black"
                            >
                              The Team
                            </NeoBrutalism>
                            <p className="font-black text-gray-700 uppercase tracking-[0.2em] text-xs">
                              FIG.{" "}
                              {String(teamPhoto.figureNumber).padStart(2, "0")}
                            </p>
                          </div>
                        </NeoBrutalism>
                      ))}
                  </div>
                )}
              </NeoBrutalism>
            ))}
          </div>
        )}
      </section>

      <Lightbox
        open={lightbox.open}
        src={lightbox.src}
        onCloseAction={closeLightbox}
      />
      <Footer />
    </div>
  );
}
