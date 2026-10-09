"use client";

import { useEffect, useState } from "react";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";
import { Clock, AlertTriangle, XCircle } from "lucide-react";

// ---- Deadlines (IST = UTC+5:30) ----
// Oct 10, 2026 at 11:59:59 PM IST  →  Oct 10, 2026 at 18:29:59 UTC
const INITIAL_DEADLINE = new Date("2026-10-10T18:29:59Z");
// Oct 11, 2026 at 11:59:59 PM IST  →  Oct 11, 2026 at 18:29:59 UTC
const EXTENDED_DEADLINE = new Date("2026-10-11T18:29:59Z");

export type DeadlinePhase = "open" | "extended" | "closed";

export function getDeadlinePhase(): DeadlinePhase {
  const now = new Date();
  if (now <= INITIAL_DEADLINE) return "open";
  if (now <= EXTENDED_DEADLINE) return "extended";
  return "closed";
}

export function getActiveDeadline(): Date {
  const phase = getDeadlinePhase();
  if (phase === "open") return INITIAL_DEADLINE;
  return EXTENDED_DEADLINE;
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function calcTimeLeft(deadline: Date): TimeLeft {
  const diff = Math.max(0, deadline.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<DeadlinePhase>(() => getDeadlinePhase());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(getActiveDeadline()));

  useEffect(() => {
    const tick = () => {
      const currentPhase = getDeadlinePhase();
      setPhase(currentPhase);
      if (currentPhase === "closed") {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft(calcTimeLeft(getActiveDeadline()));
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ---- Closed state ----
  if (phase === "closed") {
    return (
      <NeoBrutalism
        border={4}
        shadow="lg"
        className="bg-[#EA4335] text-white p-5 md:p-6 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <XCircle size={22} strokeWidth={2.5} />
          <span className="font-black text-lg md:text-xl uppercase tracking-wide">
            Submissions Closed
          </span>
        </div>
        <p className="font-mono text-xs text-white/80">
          The deadline has passed. No further submissions are accepted.
        </p>
      </NeoBrutalism>
    );
  }

  // ---- Determine urgency styling ----
  const totalSecondsLeft =
    timeLeft.days * 86400 +
    timeLeft.hours * 3600 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;

  const isUrgent = totalSecondsLeft < 3600; // < 1 hour
  const isWarning = totalSecondsLeft < 6 * 3600; // < 6 hours

  const bgColor =
    phase === "extended"
      ? "#FF6D00"
      : isUrgent
        ? "#EA4335"
        : isWarning
          ? "#FBBC04"
          : "#4285F4";

  const textColor =
    bgColor === "#FBBC04" ? "text-black" : "text-white";

  const deadlineLabel =
    phase === "extended" ? "Extended Deadline" : "Submission Deadline";

  const deadlineDateStr =
    phase === "extended" ? "11 Oct, 11:59 PM IST" : "10 Oct, 11:59 PM IST";

  // ---- Compact variant (for task page header) ----
  if (compact) {
    return (
      <NeoBrutalism
        border={3}
        shadow="md"
        className={`${textColor} px-4 py-2.5 flex items-center gap-3 flex-wrap`}
        style={{ backgroundColor: bgColor }}
      >
        <Clock size={16} strokeWidth={2.5} />
        <span className="font-black text-xs uppercase tracking-wider">
          {deadlineLabel}:
        </span>
        <span className="font-mono font-bold text-sm tabular-nums">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
        </span>
        {phase === "extended" && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-90">
            <AlertTriangle size={12} /> Extended by 1 day
          </span>
        )}
      </NeoBrutalism>
    );
  }

  // ---- Full variant (for recruitment landing page) ----
  return (
    <NeoBrutalism
      border={4}
      shadow="xl"
      className={`${textColor} p-6 md:p-8 text-center`}
      style={{ backgroundColor: bgColor }}
    >
      {phase === "extended" && (
        <div className="flex items-center justify-center gap-2 mb-3">
          <NeoBrutalism
            border={3}
            shadow="md"
            className="bg-white text-[#FF6D00] px-4 py-1.5 inline-flex items-center gap-2"
          >
            <AlertTriangle size={16} strokeWidth={2.5} />
            <span className="font-black text-xs uppercase tracking-wider">
              Deadline Extended by 1 Day!
            </span>
          </NeoBrutalism>
        </div>
      )}

      <h3 className="text-lg md:text-xl font-black uppercase tracking-wide mb-1">
        {deadlineLabel}
      </h3>
      <p className="font-mono text-xs opacity-80 mb-5">{deadlineDateStr}</p>

      <div className="flex items-center justify-center gap-3 md:gap-4">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <NeoBrutalism
              border={3}
              shadow="md"
              className="bg-white text-black w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
            >
              <span className="text-2xl md:text-3xl font-black tabular-nums font-mono">
                {pad(value)}
              </span>
            </NeoBrutalism>
            <span className="mt-1.5 font-black text-[10px] uppercase tracking-widest opacity-90">
              {label}
            </span>
          </div>
        ))}
      </div>
    </NeoBrutalism>
  );
}
