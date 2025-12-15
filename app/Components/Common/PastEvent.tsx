import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PastEventCardProps } from '@/lib';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PastEvent = ({ id, title, date, image, tags, tagColor, description }: PastEventCardProps) => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      {/* Container for the card. 
        We use a relative container to stack the SVG background and the HTML content.
        Width is set to max-w-sm (approx 384px) to match the mobile card feel.
      */}
      <div className="relative w-full max-w-[340px] drop-shadow-sm filter">

        {/* Background SVG Layer 
          Added vectorEffect="non-scaling-stroke" to the path and adjusted viewBox to prevent clipping.
          This ensures the border stays 1.5px thick evenly, even if the container stretches.
        */}
        <svg
          viewBox="-2 -2 344 404"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full text-white"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}
        >
          {/* The Path Explanation:
            1. Start top-left corner (rounded)
            2. Go right along top edge
            3. Draw the 'dip' curve down towards the right
            4. Top-right corner
            5. Right edge down
            6. Bottom-right corner
            7. Bottom edge left
            8. Bottom-left corner
            9. Left edge up to the notch
            10. The sharp inward triangular notch
            11. Left edge up to start
          */}
          <path
            d="
              M 24 0
              L 180 0
              C 210 0 220 28 250 28
              L 316 28
              Q 340 28 340 52
              L 340 376
              Q 340 400 316 400
              L 24 400
              Q 0 400 0 376
              L 0 160
              L 16 140
              L 0 120
              L 0 24
              Q 0 0 24 0
              Z
            "
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content Layer 
          Increased padding to pt-10 and pb-12 to add more breathing room top and bottom.
        */}
        <div className="relative z-10 px-6 pt-10 pb-12 h-full flex flex-col">

          {/* Header Badge - Replaced with custom Shadcn-style Badge */}
          <div className="self-start">
            {tags?.map((tag, index) => (
              <Badge
                key={index}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                style={{ backgroundColor: tagColor }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title and Action Button Row */}
          <div className="flex items-center justify-between mt-4 mb-3 pr-2">
            <h2 className="text-2xl font-bold text-black tracking-tight">
              {title}
            </h2>
            <Link href={`/events/${id}`} aria-label={`View details for ${title}`}>
              <Button
                className="bg-[#fbbf24] hover:bg-[#f59e0b] transition-colors rounded-full p-2 flex items-center justify-center shrink-0"
                aria-label={`Go to ${title}`}
              >
                <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
              </Button>
            </Link>
          </div>

          {/* Main Image */}
          <div className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-900 relative group">
            {/* Using a placeholder image that closely mimics the vibrant/neon spider-verse aesthetic.
               In a real app, this would be the specific asset.
             */}
            <img
              src={image}
              alt={`${title} Poster`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            {/* Overlay gradient to make it look more 'poster-like' and vibrant if image is dull */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent mix-blend-overlay"></div>

            {/* Text overlay for the 'SPIDERCRAFT' logo effect in the image */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              {/* This mimics the logo text in the poster if the image doesn't have it */}
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-4">
            <p className="text-black text-[15px] leading-snug font-medium">
              {description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PastEvent;