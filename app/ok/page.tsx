"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const pathD =
    "M0 187.717H73.8563H149.43H193.286C209.855 187.717 223.286 174.286 223.286 157.717V30.5C223.286 13.9314 236.718 0.5 253.286 0.5H1052.08C1068.65 0.5 1082.08 13.9315 1082.08 30.5V124.166V207.527C1082.08 224.096 1095.51 237.527 1112.08 237.527H1174.83L1279.6 237.527";

  const bottomPathD =
    "M1271.02 0.5H1242.62C1226.05 0.5 1212.62 13.9315 1212.62 30.5V88.097V182.564C1212.62 197.742 1200.31 210.046 1185.14 210.046H1063.99C1047.42 210.046 1033.99 223.477 1033.99 240.046V363.828C1033.99 380.396 1020.56 393.828 1003.99 393.828H220.652C204.084 393.828 190.652 380.396 190.652 363.828V282.985C190.652 266.417 177.221 252.985 160.652 252.985H94.4674H0";

  const pathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);

  const redLogoRef = useRef<SVGTextElement>(null);
  const blueLogoRef = useRef<SVGTextElement>(null);
  const yellowLogoRef = useRef<SVGTextElement>(null);
  const greenLogoRef = useRef<SVGTextElement>(null);

  const redTrailRef = useRef<SVGPathElement>(null);
  const blueTrailRef = useRef<SVGPathElement>(null);
  const yellowTrailRef = useRef<SVGPathElement>(null);
  const greenTrailRef = useRef<SVGPathElement>(null);

  const ANIMATION_DURATION = 20000;
  const DELAY = 10000;
  const SNAKE_LENGTH = 0.18;

  useEffect(() => {
    if (!pathRef.current || !bottomPathRef.current) return;

    const topPath = pathRef.current;
    const bottomPath = bottomPathRef.current;

    const topLen = topPath.getTotalLength();
    const bottomLen = bottomPath.getTotalLength();

    let r0: number | null = null;
    let b0: number | null = null;
    let y0: number | null = null;
    let g0: number | null = null;

    let raf: number;

    const animate = (t: number) => {
      // 🔴 RED SNAKE
      if (!r0) r0 = t;
      const rProg = Math.min((t - r0) / ANIMATION_DURATION, 1);
      const rPt = topPath.getPointAtLength(rProg * topLen);

      redLogoRef.current?.setAttribute("x", String(rPt.x));
      redLogoRef.current?.setAttribute("y", String(rPt.y));
      redTrailRef.current?.setAttribute(
        "stroke-dasharray",
        `${SNAKE_LENGTH} 1`
      );
      redTrailRef.current?.setAttribute(
        "stroke-dashoffset",
        String(1 - rProg)
      );

      // 🔵 BLUE SNAKE
      if (t - r0 >= DELAY) {
        if (!b0) {
          b0 = t;
          blueLogoRef.current?.setAttribute("opacity", "1");
          blueTrailRef.current?.setAttribute("opacity", "1");
        }
        const bProg = Math.min((t - b0) / ANIMATION_DURATION, 1);
        const bPt = topPath.getPointAtLength(bProg * topLen);

        blueLogoRef.current?.setAttribute("x", String(bPt.x));
        blueLogoRef.current?.setAttribute("y", String(bPt.y));
        blueTrailRef.current?.setAttribute(
          "stroke-dasharray",
          `${SNAKE_LENGTH} 1`
        );
        blueTrailRef.current?.setAttribute(
          "stroke-dashoffset",
          String(1 - bProg)
        );
      }

      // 🟡 YELLOW SNAKE
      if (!y0) y0 = t;
      const yProg = Math.min((t - y0) / ANIMATION_DURATION, 1);
      const yPt = bottomPath.getPointAtLength(yProg * bottomLen);

      yellowLogoRef.current?.setAttribute("x", String(yPt.x));
      yellowLogoRef.current?.setAttribute("y", String(yPt.y));
      yellowTrailRef.current?.setAttribute(
        "stroke-dasharray",
        `${SNAKE_LENGTH} 1`
      );
      yellowTrailRef.current?.setAttribute(
        "stroke-dashoffset",
        String(1 - yProg)
      );

      // 🟢 GREEN SNAKE
      if (t - y0 >= DELAY) {
        if (!g0) {
          g0 = t;
          greenLogoRef.current?.setAttribute("opacity", "1");
          greenTrailRef.current?.setAttribute("opacity", "1");
        }
        const gProg = Math.min((t - g0) / ANIMATION_DURATION, 1);
        const gPt = bottomPath.getPointAtLength(gProg * bottomLen);

        greenLogoRef.current?.setAttribute("x", String(gPt.x));
        greenLogoRef.current?.setAttribute("y", String(gPt.y));
        greenTrailRef.current?.setAttribute(
          "stroke-dasharray",
          `${SNAKE_LENGTH} 1`
        );
        greenTrailRef.current?.setAttribute(
          "stroke-dashoffset",
          String(1 - gProg)
        );
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full bg-white relative overflow-hidden">
      {/* YOUR SVG JSX IS 100% UNCHANGED */}
    </div>
  );
}