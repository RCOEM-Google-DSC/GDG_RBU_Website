import React from "react";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import { Calendar, MapPin } from "lucide-react";
import { THEME, formatDateTimeIST } from "./utils";

export default function EventDetails({ event }: { event: any }) {
  return (
    <div className="lg:col-span-5 space-y-8">
      <NeoBrutalism
        border={2}
        shadow="none"
        className="inline-block bg-[#FBBC04] px-3 py-1 font-mono text-xs font-bold transform -rotate-2"
      >
        {event.category || "Event Category"}
      </NeoBrutalism>

      <h1
        className={`${THEME.fonts.heading} text-6xl md:text-7xl leading-none`}
      >
        {event.title || "Event"}
      </h1>

      <p className="font-mono text-base leading-relaxed border-l-4 border-[#34A853] pl-6 py-2">
        {event.description || "Event description"}
      </p>

      <div className="flex flex-col gap-4 mt-4">
        <NeoBrutalism
          border={2}
          shadow="md"
          className="flex items-center gap-4 bg-white p-4"
        >
          <Calendar className="text-[#4285F4]" size={24} strokeWidth={2.5} />
          <div>
            <div className={`${THEME.fonts.heading}`}>
              {formatDateTimeIST(event.date, event.time)}
            </div>
          </div>
        </NeoBrutalism>

        <NeoBrutalism
          border={2}
          shadow="md"
          className="flex items-center gap-4 bg-white p-4"
        >
          <MapPin className="text-[#EA4335]" size={24} strokeWidth={2.5} />
          <div>
            <div className={`${THEME.fonts.heading}`}>Venue</div>
            <div className="font-mono text-xs">{event.venue || "Venue"}</div>
          </div>
        </NeoBrutalism>
      </div>
    </div>
  );
}
