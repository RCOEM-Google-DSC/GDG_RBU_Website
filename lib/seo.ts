export const SITE_NAME = "GDG RBU";
export const SITE_TITLE = "GDG RBU | Google Developer Group at RBU";
export const SITE_DESCRIPTION =
  "Official website of Google Developer Group at RBU. Discover events, workshops, hackathons, blogs, docs, and the student developer community.";
export const DEFAULT_OG_IMAGE = "/gdg-logo.svg";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

export function getSiteUrl() {
  const withProtocol = RAW_SITE_URL.startsWith("http")
    ? RAW_SITE_URL
    : `https://${RAW_SITE_URL}`;

  return withProtocol.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function stripMarkdown(markdown: string, maxLength = 180) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/icons/gdg-logo.svg"),
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://www.instagram.com/gdg_rbu/",
      "https://www.linkedin.com/company/gdg-rbu/",
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

export function getArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedAt?: string | null;
  authorName?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image ? [input.image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    datePublished: input.publishedAt || undefined,
    dateModified: input.publishedAt || undefined,
    author: input.authorName
      ? {
          "@type": "Person",
          name: input.authorName,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icons/gdg-logo.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function getEventJsonLd(input: {
  title: string;
  description: string;
  path: string;
  startDate?: string | null;
  image?: string | null;
  venue?: string | null;
  status?: string | null;
}) {
  const eventStatusMap: Record<string, string> = {
    upcoming: "https://schema.org/EventScheduled",
    completed: "https://schema.org/EventCompleted",
    cancelled: "https://schema.org/EventCancelled",
    postponed: "https://schema.org/EventPostponed",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    startDate: input.startDate || undefined,
    eventStatus: eventStatusMap[input.status || ""] || undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: input.image ? [input.image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    location: input.venue
      ? {
          "@type": "Place",
          name: input.venue,
          address: input.venue,
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/events",
  "/blogs",
  "/team",
  "/gallery",
  "/docs",
  "/links",
  "/register",
  "/portfolio-builder",
] as const;
