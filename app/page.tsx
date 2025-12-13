"use client"
import { useEffect, useRef } from "react"

export default function Home() {
  const pathD = "M0 187.717H73.8563H149.43H193.286C209.855 187.717 223.286 174.286 223.286 157.717V30.5C223.286 13.9314 236.718 0.5 253.286 0.5H1052.08C1068.65 0.5 1082.08 13.9315 1082.08 30.5V124.166V207.527C1082.08 224.096 1095.51 237.527 1112.08 237.527H1174.83L1279.6 237.527";

  const bottomPathD = "M1271.02 0.5H1242.62C1226.05 0.5 1212.62 13.9315 1212.62 30.5V88.097V182.564C1212.62 197.742 1200.31 210.046 1185.14 210.046H1063.99C1047.42 210.046 1033.99 223.477 1033.99 240.046V363.828C1033.99 380.396 1020.56 393.828 1003.99 393.828H220.652C204.084 393.828 190.652 380.396 190.652 363.828V282.985C190.652 266.417 177.221 252.985 160.652 252.985H94.4674H0";

  // Refs for direct DOM manipulation (no state delays)
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const redLogoRef = useRef<SVGTextElement>(null);
  const blueLogoRef = useRef<SVGTextElement>(null);
  const redTrailRef = useRef<SVGPathElement>(null);
  const blueTrailRef = useRef<SVGPathElement>(null);

  // Animation durations
  const ANIMATION_DURATION = 20000; // 20 seconds for each logo
  const BLUE_DELAY = 5000; // Blue starts 5 seconds after red

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return;

    const svg = svgRef.current;
    const path = pathRef.current;
    const actualTotalLength = path.getTotalLength();

    // For trail calculation, we need to work in path units
    // Red/blue trails have pathLength={1}, so dashoffset goes from 1 (hidden) to 0 (visible)
    // Logo position uses actual geometric length

    let redStartTime: number | null = null;
    let blueStartTime: number | null = null;
    let animationFrameId: number;

    // Track loop counts to manage z-ordering
    let redLoopCount = 0;
    let blueLoopCount = 0;
    let prevRedProgress = 0;
    let prevBlueProgress = 0;

    const animateFrame = (currentTime: number) => {
      // Initialize red start time
      if (redStartTime === null) {
        redStartTime = currentTime;
      }

      // Calculate red progress (loops independently)
      const redElapsed = (currentTime - redStartTime) % ANIMATION_DURATION;
      const redProgress = redElapsed / ANIMATION_DURATION;

      // Detect when red loops (progress goes from near 1 back to near 0)
      if (prevRedProgress > 0.95 && redProgress < 0.05) {
        redLoopCount++;
        // When red loops, bring red trail to front if it has more loops than blue
        if (redTrailRef.current && blueTrailRef.current && redLoopCount > blueLoopCount) {
          // Re-append red trail to move it above blue in DOM order
          const parent = redTrailRef.current.parentNode;
          if (parent) {
            parent.insertBefore(blueTrailRef.current, redTrailRef.current);
          }
        }
      }
      prevRedProgress = redProgress;

      // Update red logo and trail in same operation
      if (redLogoRef.current && redTrailRef.current) {
        // Get exact position on path using actual geometric length
        const redPoint = path.getPointAtLength(redProgress * actualTotalLength);

        // Update logo position
        redLogoRef.current.setAttribute('x', String(redPoint.x));
        redLogoRef.current.setAttribute('y', String(redPoint.y));

        // Update trail to end exactly at logo position
        redTrailRef.current.setAttribute('stroke-dashoffset', String(1 - redProgress));
      }

      // Initialize blue after delay, then loop independently
      const globalElapsed = currentTime - redStartTime;
      if (globalElapsed >= BLUE_DELAY) {
        if (blueStartTime === null) {
          blueStartTime = currentTime;
          blueLoopCount = 0; // Initialize blue loop count
          // Show blue elements
          if (blueLogoRef.current) blueLogoRef.current.setAttribute('opacity', '1');
          if (blueTrailRef.current) blueTrailRef.current.setAttribute('opacity', '1');

          // On first appearance, blue should be on top (since it started later)
          if (redTrailRef.current && blueTrailRef.current) {
            const parent = blueTrailRef.current.parentNode;
            if (parent) {
              parent.insertBefore(redTrailRef.current, blueTrailRef.current);
            }
          }
        }

        // Calculate blue progress (loops independently)
        const blueElapsed = (currentTime - blueStartTime) % ANIMATION_DURATION;
        const blueProgress = blueElapsed / ANIMATION_DURATION;

        // Detect when blue loops (progress goes from near 1 back to near 0)
        if (prevBlueProgress > 0.95 && blueProgress < 0.05) {
          blueLoopCount++;
          // When blue loops, bring blue trail to front if it has more loops than red
          if (redTrailRef.current && blueTrailRef.current && blueLoopCount >= redLoopCount) {
            // Re-append blue trail to move it above red in DOM order
            const parent = blueTrailRef.current.parentNode;
            if (parent) {
              parent.insertBefore(redTrailRef.current, blueTrailRef.current);
            }
          }
        }
        prevBlueProgress = blueProgress;

        // Update blue logo and trail in same operation
        if (blueLogoRef.current && blueTrailRef.current) {
          // Get exact position on path using actual geometric length
          const bluePoint = path.getPointAtLength(blueProgress * actualTotalLength);

          // Update logo position
          blueLogoRef.current.setAttribute('x', String(bluePoint.x));
          blueLogoRef.current.setAttribute('y', String(bluePoint.y));

          // Update trail to end exactly at logo position
          blueTrailRef.current.setAttribute('stroke-dashoffset', String(1 - blueProgress));
        }
      }

      animationFrameId = requestAnimationFrame(animateFrame);
    };

    animationFrameId = requestAnimationFrame(animateFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className=" ">
      <div className="py-10 relative">
        <svg
          ref={svgRef}
          width="100%"
          height="239"
          viewBox="0 0 1280 239"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          {/* Hidden path for calculations - NO pathLength so getTotalLength returns actual length */}
          <path
            ref={pathRef}
            d={pathD}
            stroke="transparent"
            fill="none"
          />

          {/* Black base path (background) */}
          <path
            d={pathD}
            stroke="#333"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* Red trail - initially rendered first (below blue on first loop) */}
          <path
            ref={redTrailRef}
            d={pathD}
            stroke="#dc2626"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />

          {/* Blue trail - initially rendered second (above red on first loop) */}
          <path
            ref={blueTrailRef}
            d={pathD}
            stroke="#2563eb"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            opacity={0}
          />

          {/* Blue @ logo - hidden initially, appears after delay */}
          <text
            ref={blueLogoRef}
            x={0}
            y={187.717}
            fill="#2563eb"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={0}
            style={{ fontFamily: 'monospace' }}
          >
            @
          </text>

          {/* Red </> logo - rendered ABOVE blue logo */}
          <text
            ref={redLogoRef}
            x={0}
            y={187.717}
            fill="#dc2626"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontFamily: 'monospace' }}
          >
            &lt;/&gt;
          </text>
        </svg>
      </div>

      <div className="-mt-32">
        <svg width="100%" height="395" viewBox="0 0 1272 395" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d={bottomPathD} stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

