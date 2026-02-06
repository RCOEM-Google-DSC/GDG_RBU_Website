import React from "react";
import { Check } from "lucide-react";
import QRCodeWithSvgLogo from "@/app/Components/checkin/QRCodeWithSvgLogo";
import { THEME } from "./utils";

interface RegistrationSuccessProps {
  qrValue: string;
  downloadQr: () => void;
  event: any;
  teamCreds: { userId: string; password: string } | null;
}

export default function RegistrationSuccess({
  qrValue,
  downloadQr,
  event,
  teamCreds,
}: RegistrationSuccessProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-full p-8">
        <div className="mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Check size={32} />
            <h3 className={`${THEME.fonts.heading} text-2xl`}>YOU'RE IN!</h3>
          </div>

          <div className="flex justify-center mb-6">
            <QRCodeWithSvgLogo value={qrValue} />
          </div>
          <button
            onClick={downloadQr}
            className="w-full py-4 bg-black text-white"
          >
            Download QR
          </button>
          {event.whatsapp_url && (
            <a
              href={event.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center underline font-mono text-sm"
            >
              Join WhatsApp Group
            </a>
          )}

          {/* Show team credentials (if available) */}
          {teamCreds && (
            <div className="mt-6 inline-block text-left border-2 border-black p-4">
              <div className="font-mono text-xs">Event Login</div>
              <div className="font-bold">{teamCreds.userId}</div>
              <div className="mt-1">
                Password: <span className="font-mono">{teamCreds.password}</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Save These Credentials For The Event
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
