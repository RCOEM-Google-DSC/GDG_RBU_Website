import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PastEventCardProps } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const PastEvent = ({
  id,
  title,
  date,
  image,
  tags,
  tagColor,
  description,
}: PastEventCardProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      {/* Container for the card with fixed dimensions */}
      <div className="relative w-full max-w-[340px] h-[450px] drop-shadow-sm filter">
        {/* Background SVG Layer - Fixed viewBox to prevent border clipping */}
        <svg
          viewBox="0 0 340 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full text-white"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.05))" }}
        >
          {/* Updated path with proper proportions for 520px height */}
          <path
            d="
              M 24 2
              L 180 2
              C 210 2 220 30 250 30
              L 316 30
              Q 338 30 338 52
              L 338 496
              Q 338 518 316 518
              L 24 518
              Q 2 518 2 496
              L 2 210
              L 18 190
              L 2 170
              L 2 24
              Q 2 2 24 2
              Z
            "
            fill="white"
            stroke="black"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content Layer - Fixed padding and spacing */}
        <div className="relative z-10 px-5 sm:px-6 pt-9 pb-8 h-full flex flex-col">
          {/* Header Badge */}
          <div className="self-start mb-3">
            {tags?.map((tag, index) => (
              <Badge
                key={index}
                className={`inline-flex text-white items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                style={{ backgroundColor: tagColor }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title and Action Button Row */}
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight leading-tight flex-1 pr-2 line-clamp-2">
              {title}
            </h2>
            <Link
              href={`/events/${id}`}
              aria-label={`View details for ${title}`}
            >
              <Button
                className="bg-[#fbbf24] hover:bg-[#f59e0b] transition-colors rounded-full p-2 flex items-center justify-center shrink-0"
                aria-label={`Go to ${title}`}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[2.5]" />
              </Button>
            </Link>
          </div>

          {/* Main Image - Fixed aspect ratio */}
          <div className="w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-900 relative group mb-3">
            <Image
              height={240}
              width={320}
              src={image}
              alt={`${title} Poster`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent mix-blend-overlay"></div>
          </div>

          {/* Footer Text - Fixed height with line clamp */}
          <div className="flex-1 overflow-hidden">
            <p className="text-black text-sm sm:text-[15px] leading-snug font-medium line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvent;
