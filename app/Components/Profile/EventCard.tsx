import { cn } from "@/lib/utils";
import { Calendar, Download, Share2 } from "lucide-react";
import { UIEvent } from "../../../lib/types";
import { supabase } from "@/supabase/supabase";

interface EventCardProps {
  event: UIEvent;
}

export function EventCard({ event }: EventCardProps) {
  const handleDownload = async () => {
    console.log("Downloading certificate for event:", event);
  if (!event.certificate_url) return;

  const { data, error } = await supabase.storage
    .from("certificates")
    .download(event.certificate_url);

  if (error || !data) {
    alert("Failed to download certificate");
    return;
  }

  const blobUrl = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = event.certificate_url.split("/").pop()!;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
};

  return (
    <div className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-900/70 dark:to-neutral-950 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Image section */}
      <div className="relative w-full sm:w-60 h-44 sm:h-auto shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

        {/* Status pill */}
        <span
          className={cn(
            "absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase shadow-sm",
            "bg-black/60 text-white backdrop-blur",
            event.tagColor
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {event.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between px-5 py-4 gap-4 w-full">
        <div className="space-y-2">
          {/* Date */}
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100/80 dark:bg-neutral-800/70 px-3 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white leading-snug">
            {event.title}
          </h3>

          {/* Optional small subtitle / helper text */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            You&apos;re registered for this event. Download your certificate or share it with friends.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 backdrop-blur hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all " onClick={handleDownload} disabled={!event.certificate_url}>
            <Download className="w-4 h-4" />
            Download Certificate
          </button>

          <button 
            aria-label="Share event"
            title="Share event"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* subtle accent bar on the left */}
      <div className="hidden sm:block absolute left-0 top-0 h-full w-1 bg-linear-to-b from-blue-500 via-sky-400 to-purple-500" />
    </div>
  );
}
