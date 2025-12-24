"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  size?: number;
};

export default function QRCodeWithSvgLogo({ value, size = 300 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ===============================
  // HARD-CODED STYLING CONTROLS
  // ===============================
  const backgroundImage = "/icons/gdg-logo.svg"; // e.g. "/icons/gdg-logo.svg"
  const backgroundOpacity = 0.4; // 0 → invisible | 1 → fully visible
  const backgroundScale = 0.8; // relative size of bg image (0.3 – 1.2 works well)

  useEffect(() => {
    if (!value || !canvasRef.current) return;

    const loadQR = async () => {
      // Dynamically load QR library
      if (!(window as any).qrcode) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
        script.async = true;
        script.onload = drawQR;
        document.body.appendChild(script);
      } else {
        drawQR();
      }
    };

    const drawQR = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      try {
        
        const qr = (window as any).qrcode(0, "H");
        qr.addData(value);
        qr.make();

        const moduleCount = qr.getModuleCount();
        const RESOLUTION = 1000;
        const padding = RESOLUTION * 0.06;
        const innerSize = RESOLUTION - padding * 2;
        const cellSize = innerSize / moduleCount;

        canvas.width = RESOLUTION;
        canvas.height = RESOLUTION;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

        // Optional background image
        if (backgroundImage) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = backgroundImage;

          img.onload = () => {
            ctx.save();
            ctx.globalAlpha = backgroundOpacity;

            const imgSize = RESOLUTION * backgroundScale;
            const x = (RESOLUTION - imgSize) / 2;
            const y = (RESOLUTION - imgSize) / 2;

            ctx.drawImage(img, x, y, imgSize, imgSize);
            ctx.restore();

            drawModules();
          };

          img.onerror = drawModules;
        } else {
          drawModules();
        }

        function drawModules() {
          if (!ctx) return;
          ctx.fillStyle = "#000000";

          for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
              // @ts-ignore
              if (!qr.isDark(row, col)) continue;

              const x = padding + col * cellSize;
              const y = padding + row * cellSize;

              const isFinder =
                (row < 7 && col < 7) ||
                (row < 7 && col >= moduleCount - 7) ||
                (row >= moduleCount - 7 && col < 7);

              if (isFinder) {
                ctx.fillRect(x, y, cellSize, cellSize);
              } else {
                ctx.beginPath();
                ctx.arc(
                  x + cellSize / 2,
                  y + cellSize / 2,
                  cellSize * 0.42,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
              }
            }
          }
        }
      } catch (err) {
        console.error("QR generation error:", err);
      }
    };

    loadQR();
  }, [value, size]);

  return <canvas ref={canvasRef} className="rounded-xl shadow-md" />;
}
