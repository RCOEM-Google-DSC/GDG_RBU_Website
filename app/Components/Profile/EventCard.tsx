"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Download, Share2, Loader2 } from "lucide-react";
import { UIEvent } from "../../../lib/types";
// ✅ Import the request-scoped browser client factory instead of the static instance
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface EventCardProps {
  event: UIEvent;
}

export function EventCard({ event }: EventCardProps) {
  // ✅ Initialize the Supabase client inside the component
  const supabase = createClient();
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

      // 🔑 GET USER SESSION
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
      {/* Shadow */}
      <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
      
      {/* Main Card */}
      <div className="relative flex flex-col sm:flex-row overflow-hidden rounded-xl border-[3px] border-black bg-white">
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
            <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
            <span className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-black tracking-wide uppercase bg-[#00f566] border-2 border-black">
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
              <div className="absolute bg-black h-full w-full rounded-lg top-0.5 left-0.5" />
              <div className="relative inline-flex items-center gap-2 rounded-lg bg-[#ffd23d] border-2 border-black px-3 py-1.5 text-xs font-bold">
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
                <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
                <button
                  onClick={handleAction}
                  disabled={loading}
                  className={cn(
                    "relative w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold border-2 border-black transition-transform hover:translate-y-0.5",
                    loading
                      ? "bg-neutral-300 cursor-not-allowed"
                      : certificateUrl
                      ? "bg-[#4284ff] text-white"
                      : "bg-white text-black",
                  )}
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
      </div>
    </div>
  );
}
