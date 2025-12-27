"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const pathD =
    "M0 187.717H73.8563H149.43H193.286C209.855 187.717 223.286 174.286 223.286 157.717V30.5C223.286 13.9314 236.718 0.5 253.286 0.5H1052.08C1068.65 0.5 1082.08 13.9315 1082.08 30.5V124.166V207.527C1082.08 224.096 1095.51 237.527 1112.08 237.527H1174.83L1279.6 237.527";
  const bottomPathD =
    "M1271.02 0.5H1242.62C1226.05 0.5 1212.62 13.9315 1212.62 30.5V88.097V182.564C1212.62 197.742 1200.31 210.046 1185.14 210.046H1063.99C1047.42 210.046 1033.99 223.477 1033.99 240.046V363.828C1033.99 380.396 1020.56 393.828 1003.99 393.828H220.652C204.084 393.828 190.652 380.396 190.652 363.828V282.985C190.652 266.417 177.221 252.985 160.652 252.985H94.4674H0";

  // --- Top Path Refs ---
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const redLogoRef = useRef<SVGTextElement>(null);
  const blueLogoRef = useRef<SVGTextElement>(null);
  const redTrailRef = useRef<SVGPathElement>(null);
  const blueTrailRef = useRef<SVGPathElement>(null);
  const topBaseRef = useRef<SVGPathElement>(null);
  const topTrailsGroupRef = useRef<SVGGElement>(null);

  // --- Bottom Path Refs ---
  const bottomSvgRef = useRef<SVGSVGElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const yellowLogoRef = useRef<SVGTextElement>(null);
  const greenLogoRef = useRef<SVGTextElement>(null);
  const yellowTrailRef = useRef<SVGPathElement>(null);
  const greenTrailRef = useRef<SVGPathElement>(null);
  const bottomBaseRef = useRef<SVGPathElement>(null);
  const bottomTrailsGroupRef = useRef<SVGGElement>(null);

  // Constant Speed in Pixels per Second
  const SPEED_PX_PER_SEC = 85;

  // Set to 0 to eliminate any gap. The trail will end exactly at the logo's center.
  const TRAIL_RETRACTION_PX = 0;

  useEffect(() => {
    if (!pathRef.current || !bottomPathRef.current) return;

    const topPath = pathRef.current;
    const bottomPath = bottomPathRef.current;

    // Calculate ACTUAL pixel lengths
    const topTotalLength = topPath.getTotalLength();
    const bottomTotalLength = bottomPath.getTotalLength();

    // Calculate dynamic duration based on length to ensure CONSTANT SPEED
    // Length (px) / Speed (px/s) = Duration (s) -> * 1000 for ms
    const topDuration = (topTotalLength / SPEED_PX_PER_SEC) * 1000;
    const bottomDuration = (bottomTotalLength / SPEED_PX_PER_SEC) * 1000;

    // Calculate dynamic delay to ensure trails are always SAME RELATIVE LENGTH (50% of track)
    const topDelay = topDuration / 2;
    const bottomDelay = bottomDuration / 2;

    // Initialize Dash Arrays with actual lengths
    if (redTrailRef.current)
      redTrailRef.current.style.strokeDasharray = `${topTotalLength}`;
    if (blueTrailRef.current)
      blueTrailRef.current.style.strokeDasharray = `${topTotalLength}`;
    if (yellowTrailRef.current)
      yellowTrailRef.current.style.strokeDasharray = `${bottomTotalLength}`;
    if (greenTrailRef.current)
      greenTrailRef.current.style.strokeDasharray = `${bottomTotalLength}`;

    // --- State for Top Path ---
    let redStartTime: number | null = null;
    let blueStartTime: number | null = null;
    let redLoopCount = 0;
    let blueLoopCount = 0;
    let prevRedProgress = 0;
    let prevBlueProgress = 0;

    // --- State for Bottom Path ---
    let yellowStartTime: number | null = null;
    let greenStartTime: number | null = null;
    let yellowLoopCount = 0;
    let greenLoopCount = 0;
    let prevYellowProgress = 0;
    let prevGreenProgress = 0;

    let animationFrameId: number;

    const animateFrame = (currentTime: number) => {
      // =========================================================================
      // TOP PATH ANIMATION
      // =========================================================================

      // 1. Red Animation
      if (redStartTime === null) redStartTime = currentTime;
      const redElapsed = (currentTime - redStartTime) % topDuration;
      const redProgress = redElapsed / topDuration;

      if (prevRedProgress > 0.95 && redProgress < 0.05) {
        redLoopCount++;
        if (topBaseRef.current)
          topBaseRef.current.setAttribute("stroke", "#dc2626");
      }
      prevRedProgress = redProgress;

      if (redLogoRef.current && redTrailRef.current) {
        const currentDist = redProgress * topTotalLength;
        const point = topPath.getPointAtLength(currentDist);
        redLogoRef.current.setAttribute("x", String(point.x));
        redLogoRef.current.setAttribute("y", String(point.y));

        // Pixel-based retraction with 0 gap
        const visibleLen = Math.max(0, currentDist - TRAIL_RETRACTION_PX);
        redTrailRef.current.style.strokeDashoffset = `${topTotalLength - visibleLen}`;
      }

      // 2. Blue Animation
      if (currentTime - redStartTime >= topDelay) {
        if (blueStartTime === null) {
          blueStartTime = currentTime;
          if (blueLogoRef.current)
            blueLogoRef.current.setAttribute("opacity", "1");
          if (blueTrailRef.current)
            blueTrailRef.current.setAttribute("opacity", "1");
        }

        const blueElapsed = (currentTime - blueStartTime) % topDuration;
        const blueProgress = blueElapsed / topDuration;

        if (prevBlueProgress > 0.95 && blueProgress < 0.05) {
          blueLoopCount++;
          if (topBaseRef.current)
            topBaseRef.current.setAttribute("stroke", "#2563eb");
        }
        prevBlueProgress = blueProgress;

        if (blueLogoRef.current && blueTrailRef.current) {
          const currentDist = blueProgress * topTotalLength;
          const point = topPath.getPointAtLength(currentDist);
          blueLogoRef.current.setAttribute("x", String(point.x));
          blueLogoRef.current.setAttribute("y", String(point.y));

          const visibleLen = Math.max(0, currentDist - TRAIL_RETRACTION_PX);
          blueTrailRef.current.style.strokeDashoffset = `${topTotalLength - visibleLen}`;
        }

        // Z-Index Top
        if (
          topTrailsGroupRef.current &&
          redTrailRef.current &&
          blueTrailRef.current
        ) {
          let redShouldBeTop = false;
          if (redLoopCount > blueLoopCount) redShouldBeTop = true;
          else if (blueLoopCount > redLoopCount) redShouldBeTop = false;
          else redShouldBeTop = redProgress < blueProgress;

          if (redShouldBeTop)
            topTrailsGroupRef.current.appendChild(redTrailRef.current);
          else topTrailsGroupRef.current.appendChild(blueTrailRef.current);
        }
      }

      // =========================================================================
      // BOTTOM PATH ANIMATION
      // =========================================================================

      // 1. Yellow Animation
      if (yellowStartTime === null) yellowStartTime = currentTime;
      const yellowElapsed = (currentTime - yellowStartTime) % bottomDuration;
      const yellowProgress = yellowElapsed / bottomDuration;

      if (prevYellowProgress > 0.95 && yellowProgress < 0.05) {
        yellowLoopCount++;
        if (bottomBaseRef.current)
          bottomBaseRef.current.setAttribute("stroke", "#eab308");
      }
      prevYellowProgress = yellowProgress;

      if (yellowLogoRef.current && yellowTrailRef.current) {
        const currentDist = yellowProgress * bottomTotalLength;
        const point = bottomPath.getPointAtLength(currentDist);
        yellowLogoRef.current.setAttribute("x", String(point.x));
        yellowLogoRef.current.setAttribute("y", String(point.y));

        const visibleLen = Math.max(0, currentDist - TRAIL_RETRACTION_PX);
        yellowTrailRef.current.style.strokeDashoffset = `${bottomTotalLength - visibleLen}`;
      }

      // 2. Green Animation
      if (currentTime - yellowStartTime >= bottomDelay) {
        if (greenStartTime === null) {
          greenStartTime = currentTime;
          if (greenLogoRef.current)
            greenLogoRef.current.setAttribute("opacity", "1");
          if (greenTrailRef.current)
            greenTrailRef.current.setAttribute("opacity", "1");
        }

        const greenElapsed = (currentTime - greenStartTime) % bottomDuration;
        const greenProgress = greenElapsed / bottomDuration;

        if (prevGreenProgress > 0.95 && greenProgress < 0.05) {
          greenLoopCount++;
          if (bottomBaseRef.current)
            bottomBaseRef.current.setAttribute("stroke", "#16a34a");
        }
        prevGreenProgress = greenProgress;

        if (greenLogoRef.current && greenTrailRef.current) {
          const currentDist = greenProgress * bottomTotalLength;
          const point = bottomPath.getPointAtLength(currentDist);
          greenLogoRef.current.setAttribute("x", String(point.x));
          greenLogoRef.current.setAttribute("y", String(point.y));

          const visibleLen = Math.max(0, currentDist - TRAIL_RETRACTION_PX);
          greenTrailRef.current.style.strokeDashoffset = `${bottomTotalLength - visibleLen}`;
        }

        // Z-Index Bottom
        if (
          bottomTrailsGroupRef.current &&
          yellowTrailRef.current &&
          greenTrailRef.current
        ) {
          let yellowShouldBeTop = false;
          if (yellowLoopCount > greenLoopCount) yellowShouldBeTop = true;
          else if (greenLoopCount > yellowLoopCount) yellowShouldBeTop = false;
          else yellowShouldBeTop = yellowProgress < greenProgress;

          if (yellowShouldBeTop)
            bottomTrailsGroupRef.current.appendChild(yellowTrailRef.current);
          else bottomTrailsGroupRef.current.appendChild(greenTrailRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(animateFrame);
    };

    animationFrameId = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full bg-white relative overflow-hidden">
      {/* TOP SVG SECTION */}
      <div className="py-10 relative">
        <svg
          ref={svgRef}
          width="100%"
          height="239"
          viewBox="-20 0 1320 239"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <path ref={pathRef} d={pathD} stroke="transparent" fill="none" />
          {/* Black Line made transparent */}
          <path
            d={pathD}
            stroke="transparent"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={topBaseRef}
            d={pathD}
            stroke="transparent"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* Active Trails - vectorEffect removed to ensure perfect sync with coordinates */}
          <g ref={topTrailsGroupRef}>
            <path
              ref={redTrailRef}
              d={pathD}
              stroke="#dc2626"
              strokeWidth="4"
              fill="none"
              strokeLinecap="butt"
            />
            <path
              ref={blueTrailRef}
              d={pathD}
              stroke="#2563eb"
              strokeWidth="4"
              fill="none"
              strokeLinecap="butt"
              opacity={0}
            />
          </g>

          {/* Logos Group */}
          <g>
            <text
              ref={blueLogoRef}
              fill="#2563eb"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0}
              style={{ fontFamily: "monospace" }}
            >
              @
            </text>
            <text
              ref={redLogoRef}
              fill="#dc2626"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontFamily: "monospace" }}
            >
              &lt;/&gt;
            </text>
          </g>
        </svg>
      </div>

      {/* BOTTOM SVG SECTION */}
      <div className="-mt-32 relative">
        <svg
          ref={bottomSvgRef}
          width="100%"
          height="450"
          viewBox="-20 0 1312 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <path
            ref={bottomPathRef}
            d={bottomPathD}
            stroke="transparent"
            fill="none"
          />
          {/* Black Line made transparent */}
          <path
            d={bottomPathD}
            stroke="transparent"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={bottomBaseRef}
            d={bottomPathD}
            stroke="transparent"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* Active Trails - vectorEffect removed */}
          <g ref={bottomTrailsGroupRef}>
            <path
              ref={yellowTrailRef}
              d={bottomPathD}
              stroke="#eab308"
              strokeWidth="4"
              fill="none"
              strokeLinecap="butt"
            />
            <path
              ref={greenTrailRef}
              d={bottomPathD}
              stroke="#16a34a"
              strokeWidth="4"
              fill="none"
              strokeLinecap="butt"
              opacity={0}
            />
          </g>

          <g>
            <text
              ref={greenLogoRef}
              fill="#16a34a"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0}
              style={{ fontFamily: "monospace" }}
            >
              ()
            </text>
            <text
              ref={yellowLogoRef}
              fill="#eab308"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontFamily: "monospace" }}
            >
              {`{}`}
            </text>
          </g>
        </svg>
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center bg-white/80 p-6 backdrop-blur-sm rounded-xl">
          <h1 className="text-5xl font-bold mb-4 text-black">
            Google Developer
            <br />
            Groups, RBU
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Empowering students with cutting-edge tech skills, community, and
            resources for a future in technology.
          </p>
        </div>
      </div>
    </div>
  );
}
