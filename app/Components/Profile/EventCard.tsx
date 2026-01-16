"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Download, Share2, Loader2 } from "lucide-react";
import { UIEvent } from "../../../lib/types";
import { supabase } from "@/supabase/supabase";
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

  /**
   * HANDLE BUTTON CLICK
   */
  const handleAction = async () => {
    // CASE 1: Certificate exists → download
    if (certificateUrl) {
      await downloadCertificate(certificateUrl);
      return;
    }

    // CASE 2: Generate on demand
    try {
      setLoading(true);

      // 🔑 GET USER SESSION (CRITICAL FIX)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      // 🔥 CALL EDGE FUNCTION WITH AUTH HEADER
      const { data, error } = await supabase.functions.invoke(
        "generate-certificate-on-demand",
        {
          body: {
            event_id: event.id,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      if (error) {
        console.error("Edge Function Error:", error);
        throw error;
      }

      if (!data?.certificate_url) {
        throw new Error("Certificate generation failed");
      }

      setCertificateUrl(data.certificate_url);

      // Auto-download
      await downloadCertificate(data.certificate_url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <NeoBrutalism border={3} shadow="lg" rounded="xl" className="relative flex flex-col sm:flex-row overflow-hidden bg-white">
        {/* Image section */}
        <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
          <Image
            height={192}
            width={256}
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          {/* Tag Badge */}
          <div className="absolute top-3 left-3">
            <span className={nb({
                border: 2,
                shadow: "md",
                rounded: "lg",
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black tracking-wide uppercase bg-[#00f566]"
            })}>
              <span className="w-2 h-2 rounded-full bg-black" />
              {event.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between px-6 py-5 gap-5 w-full">
          <div className="space-y-3">
            {/* Date Badge */}
            <div className="inline-block relative">
              <div className={nb({
                  border: 2,
                  shadow: "xs",
                  rounded: "lg",
                  className: "inline-flex items-center gap-2 bg-[#ffd23d] px-3 py-1.5 text-xs font-bold"
              })}>
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
            <div className="flex items-center gap-3 pt-1">
              <div className="relative flex-1">
                <button
                  onClick={handleAction}
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
                    )
                  })}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      GENERATING…
                    </>
                  ) : certificateUrl ? (
                    <>
                      <Download className="w-4 h-4" />
                      DOWNLOAD
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      GENERATE
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accent Bar */}
        <div className="hidden sm:block absolute left-0 top-0 h-full w-2 bg-[#ff5050]" />
      </NeoBrutalism>
    </div>
  );
}
