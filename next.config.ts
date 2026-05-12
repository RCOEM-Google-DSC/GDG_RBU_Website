import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  // for dockerisation 
  output: 'standalone',
  reactStrictMode: true,

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withMDX = createMDX({
  // configPath: 'source.config.ts' is the default
});

export default withMDX(nextConfig);
