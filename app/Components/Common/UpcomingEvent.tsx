import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpcomingEventCardProps } from "@/lib/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop";

const UpcomingEvent = ({
  id,
  title,
  date,
  time,
  image,
  tags,
  tagColor,
  description,
  registerUrl,
}: UpcomingEventCardProps) => {
  // use the image prop, fallback if missing
  const imageSrc = image || FALLBACK_IMAGE;
  const handleRegisterClick = () => {
    if (registerUrl) {
      window.open(registerUrl, "_blank");
    }
  };

  return (
    // Main Container
    <div className="w-full font-sans">
      {/* Card Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:flex lg:flex-row w-full h-[500px] gap-6">
          {/* LEFT SECTION: Event Image & Details */}
          <div className="relative w-[65%] h-full rounded-3xl overflow-hidden group border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
            {/* Background Image */}
            <img
              src={imageSrc}
              alt={title || "Event image"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              {/* Top Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full border-2 border-black bg-white text-black text-xs font-bold tracking-wider uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {tags && tags[0]}
                </span>
              </div>

              {/* Bottom Info */}
              <div>
                <div className="mb-3">
                  <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                    {title}
                  </h2>
                  <p className="text-base text-white/80 line-clamp-3">
                    {description}
                  </p>
                </div>

                <Link
                  href={`/events/upcoming/${id}`}
                  aria-label={`View details for ${title}`}
                >
                  <Button className="w-14 h-14 bg-[#FFC20E] rounded-full flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                    <ArrowUpRight
                      className="text-black w-6 h-6"
                      strokeWidth={2.5}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Gold Pass Ticket - Desktop Only */}
          <div className="relative w-[35%] h-full">
            {/* Border/shadow layer - positioned to bottom-right */}
            <div
              className="absolute top-2 left-2 right-0 bottom-0 bg-black rounded-3xl"
              style={{
                maskImage:
                  "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
                WebkitMaskImage:
                  "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
              }}
            />

            {/* Main ticket content with border */}
            <div
              className="absolute top-0 left-0 right-2 bottom-2 bg-black rounded-3xl"
              style={{
                maskImage:
                  "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
                WebkitMaskImage:
                  "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
              }}
            >
              {/* Inner yellow content */}
              <div
                className="absolute inset-1 bg-[#FFC20E] rounded-3xl p-8 flex flex-col justify-between"
                style={{
                  maskImage:
                    "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
                  WebkitMaskImage:
                    "radial-gradient(circle at left center, transparent 24px, black 24.5px)",
                }}
              >
                {/* Ticket Top */}
                <div>
                  <Zap className="w-12 h-12 text-black mb-4 stroke-[1.5]" />
                  <h3 className="text-6xl font-black text-black leading-[0.9] mb-4">
                    New
                    <br />
                    Event
                  </h3>

                  <div className="w-full flex items-center gap-2 mb-2 opacity-60">
                    <div className="h-px w-full border-b border-dashed border-black/50"></div>
                  </div>

                  {/* <p className="font-mono text-black/70 text-sm tracking-wide">
                    Access to all VIP labs
                  </p> */}
                </div>

                {/* Ticket Bottom */}
                <div>
                  <div className="mb-6">
                    <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-1">
                      Date & Time
                    </p>
                    <p className="text-xl font-bold text-black">
                      {date instanceof Date ? date.toLocaleDateString() : date}{" "}
                      <br />
                      {time}
                    </p>
                  </div>

                  <Button
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    onClick={handleRegisterClick}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Image with overlaid ticket card */}
        <div className="lg:hidden relative w-full h-[500px] sm:h-[600px] rounded-3xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {/* Background Image */}
          <img
            src={imageSrc}
            alt={title || "Event image"}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

          {/* Content Container */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">
            {/* Top Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border-2 border-black bg-white text-black text-xs font-bold tracking-wider uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {tags && tags[0]}
              </span>
            </div>

            {/* Bottom Section with Title */}
            <div className="relative">
              <div className="mb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  {title}
                </h2>
                <p className="text-sm text-white/80 line-clamp-2 mb-4">
                  {description}
                </p>
              </div>

              <Link
                href={`/events/upcoming/${id}`}
                aria-label={`View details for ${title}`}
              >
                <Button className="w-12 h-12 bg-[#FFC20E] rounded-full flex items-center justify-center border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all mb-4">
                  <ArrowUpRight
                    className="text-black w-5 h-5"
                    strokeWidth={2.5}
                  />
                </Button>
              </Link>
            </div>
          </div>

          {/* Overlaid Ticket Card - Top Right - More Compact */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-32 sm:w-36 bg-[#FFC20E] rounded-2xl p-3 sm:p-3.5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
            {/* Ticket Content - Compact Layout */}
            <div className="space-y-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[1.5]" />
              <h3 className="text-lg sm:text-xl font-black text-black leading-[0.85]">
                New
                <br />
                Event
              </h3>

              <div className="w-full h-px border-b border-dashed border-black/30"></div>

              {/* <p className="font-mono text-black/70 text-[8px] sm:text-[9px] tracking-wide leading-tight">
                Access to all VIP labs
              </p> */}

              <div>
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-black/60 mb-0.5">
                  Date & Time
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-black leading-tight">
                  {date instanceof Date
                    ? date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : date}
                  <br />
                  {time}
                </p>
              </div>

              <Button className="w-full bg-black text-white py-1.5 sm:py-2 rounded-lg font-bold text-[10px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
