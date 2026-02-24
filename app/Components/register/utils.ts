export const THEME = {
  colors: {
    bg: "bg-white",
    surface: "bg-white",
    text: "text-gray-900",
    textDim: "text-gray-600",
    blue: "bg-[#4285F4]",
    red: "bg-[#EA4335]",
    yellow: "bg-[#FBBC04]",
    green: "bg-[#34A853]",
    border: "border-black",
  },
  borders: "border-2 border-black",
  fonts: {
    heading: "font-sans font-black uppercase tracking-tight",
    body: "font-mono text-sm font-medium",
  },
};

export const isProfileComplete = (u: any) =>
  !!(u?.name && u?.email && u?.phone_number && u?.section && u?.branch);

export function generateRandomPassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

export const formatIST = (utc: string | null) => {
  if (!utc) return "Time";
  return (
    new Date(utc).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " IST"
  );
};

export function parseTimeString(timeStr?: string): { hour: number; minute: number } | null {
  if (!timeStr) return null;
  const s = String(timeStr).trim();
  if (!s) return null;

  // Normalize spacing and lower-case for am/pm detection
  const normalized = s.replace(/\s+/g, " ").toLowerCase();

  // Regex: capture hour, optional :minute, optional space, optional am/pm
  const m = normalized.match(/^([0-9]{1,2})(?::([0-9]{2}))?\s*(am|pm)?$/i);
  if (!m) {
    return null;
  }

  let hour = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  const ampm = m[3] ? m[3].toLowerCase() : null;

  if (isNaN(hour) || isNaN(minute)) return null;
  if (minute < 0 || minute > 59) return null;

  // If am/pm present, interpret as 12-hour clock
  if (ampm) {
    if (ampm === "am") {
      if (hour === 12) hour = 0;
    } else if (ampm === "pm") {
      if (hour < 12) hour += 12;
    }
  } else {
    // No am/pm: assume 24-hour clock if hour >= 0 && hour <= 23
    if (hour < 0 || hour > 23) return null;
  }

  return { hour, minute };
}

export function formatDateTimeIST(date: string | null, timeText: string | null) {
  if (!date) return "Date & Time";

  // parse date
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = date.split("-");
  if (parts.length < 3) {
    // fallback: just return raw date
    return date;
  }
  const [y, m, d] = parts;
  const year = Number(y);
  const monthIdx = Number(m) - 1;
  const day = Number(d);

  if (isNaN(year) || isNaN(monthIdx) || isNaN(day) || monthIdx < 0 || monthIdx > 11) {
    return date;
  }

  // parse time string (flexible)
  const t = parseTimeString(timeText || undefined);
  if (!t) {
    // no valid time — return just date
    return `${String(day).padStart(2, "0")} ${months[monthIdx]} ${year}`;
  }

  // Convert 24-hour hour to 12-hour + AM/PM
  let hour12 = t.hour;
  const ampm = hour12 >= 12 ? "PM" : "AM";
  if (hour12 === 0) hour12 = 12;
  else if (hour12 > 12) hour12 = hour12 - 12;

  const hhStr = String(hour12).padStart(2, "0");
  const mmStr = String(t.minute).padStart(2, "0");

  return `${String(day).padStart(2, "0")} ${months[monthIdx]} ${year}, ${hhStr}:${mmStr} ${ampm} IST`;
}
