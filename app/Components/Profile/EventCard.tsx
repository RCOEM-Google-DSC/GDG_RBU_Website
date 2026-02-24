"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Share2 } from "lucide-react";
import { UIEvent } from "@/lib/types";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

interface EventCardProps {
  event: UIEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [loading, setLoading] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(
    event.certificate_url ?? null,
  );
  const supabase = createClient();

  /**
   * DOWNLOAD EXISTING CERTIFICATE
   */
  const downloadCertificate = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("certificates")
      .download(path);

    if (error || !data) {
      alert("Failed to download certificate");
      return;
    }

    const blobUrl = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = path.split("/").pop()!;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  };

  // handle badge
  const handleBadge = () => {
    window.location.href = `/events/${event.id}/badge`;
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <NeoBrutalism
        border={3}
        shadow="lg"
        rounded="xl"
        className="relative flex flex-col sm:flex-row overflow-hidden bg-white"
      >
        {/* Image section */}
        <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
          <Image
            height={192}
            width={256}
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between px-6 py-5 gap-5 w-full">
          <div className="space-y-3">
            {/* Date Badge */}
            <div className="inline-block relative">
              <div
                className={nb({
                  border: 2,
                  shadow: "xs",
                  rounded: "lg",
                  className:
                    "inline-flex items-center gap-2 bg-[#ffd23d] px-3 py-1.5 text-xs font-bold",
                })}
              >
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-black leading-tight tracking-tight">
              {event.title}
            </h3>

            <p className="text-sm text-neutral-600 font-medium">
              Download or generate your participation certificate.
            </p>
          </div>

          {/* Actions */}
          {event.registration_status === "verified" && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {/* Certificate Button */}
              {/* <div className="relative flex-1">
                <button
                  onClick={handleCertificate}
                  disabled={loading}
                  className={nb({
                    border: 2,
                    shadow: "md",
                    rounded: "lg",
                    hover: "liftSmall",
                    className: cn(
                      "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold",
                      loading
                        ? "bg-neutral-300 cursor-not-allowed"
                        : certificateUrl
                          ? "bg-[#4284ff] text-white"
                          : "bg-white text-black",
                    ),
                  })}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      GENERATING...
                    </>
                  ) : certificateUrl ? (
                    <>
                      <Download className="w-4 h-4" />
                      CERTIFICATE
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      CERTIFICATE
                    </>
                  )}
                </button>
              </div> */}

              {/* Badge Button */}
              {event.has_badge_template && (
                <div className="relative flex-1">
                  <button
                    onClick={handleBadge}
                    className={nb({
                      border: 2,
                      shadow: "md",
                      rounded: "lg",
                      hover: "liftSmall",
                      className: cn(
                        "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold",
                        event.badge_url
                          ? "bg-[#00f566] text-black"
                          : "bg-black text-white",
                      ),
                    })}
                  >
                    {event.badge_url ? (
                      <>
                        <Share2 className="w-4 h-4" />
                        VIEW BADGE
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        GET BADGE
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accent Bar */}
        <div className="hidden sm:block absolute left-0 top-0 h-full w-2 bg-[#ff5050]" />
      </NeoBrutalism>
    </div>
  );
}
