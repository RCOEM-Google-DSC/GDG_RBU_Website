"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

type Props = {
  value: string;
  size?: number;
  logo?: string;
  logoScale?: number;
};

export default function BraveCleanQR({
  value,
  size = 300,
  logo = "/icons/gdg.svg",
  logoScale = 0.22,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!value || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const RESOLUTION = 1000;

    const draw = async () => {
      const qr = QRCode.create(value, {
        errorCorrectionLevel: "H",
      });

      const modules = qr.modules;
      const count = modules.size;

      const pixelSize = Math.floor(RESOLUTION / count);
      const margin = pixelSize * 2;
      const canvasSize = count * pixelSize + margin * 2;

      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dots
      ctx.fillStyle = "#6b6b6b";

      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (!modules.get(c, r)) continue;

          if (logo && isInsideLogo(r, c, count, logoScale)) continue;

          const x = margin + c * pixelSize;
          const y = margin + r * pixelSize;

          const isFinder =
            (r < 7 && c < 7) ||
            (r < 7 && c >= count - 7) ||
            (r >= count - 7 && c < 7);

          ctx.beginPath();
          if (isFinder) {
            ctx.roundRect(x, y, pixelSize, pixelSize, pixelSize * 0.2);
          } else {
            ctx.arc(
              x + pixelSize / 2,
              y + pixelSize / 2,
              pixelSize / 2,
              0,
              Math.PI * 2
            );
          }
          ctx.fill();
        }
      }

      // Logo (colored, no background)
      if (logo) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = logo;

        await new Promise((res) => (img.onload = res));

        const logoModules = Math.floor(count * logoScale);
        const logoPx = logoModules * pixelSize;

        const x = (canvas.width - logoPx) / 2;
        const y = (canvas.height - logoPx) / 2;

        ctx.drawImage(img, x, y, logoPx, logoPx);
      }
    };

    draw();
  }, [value, size, logo, logoScale]);

  return <canvas ref={canvasRef} className="rounded-xl shadow-md" />;
}

/* ---------- helpers ---------- */

function isInsideLogo(
  r: number,
  c: number,
  size: number,
  logoScale: number
) {
  const logoSize = Math.floor(size * logoScale);
  const center = Math.floor(size / 2);
  const start = center - Math.floor(logoSize / 2);
  const end = start + logoSize;

  return (
    r >= start - 1 &&
    r < end + 1 &&
    c >= start - 1 &&
    c < end + 1
  );
}
