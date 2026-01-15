import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "GDG Documentation",
    },
    links: [
      {
        text: "Home",
        url: "/",
      },
      {
        text: "GitHub Session",
        url: "/github-session",
      },
    ],
  };
}
