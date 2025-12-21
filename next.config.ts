import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "placehold.co",
      "images.unsplash.com",
      "api.dicebear.com",
      "res.cloudinary.com",
    ],
  },
};

const withMDX = createMDX({
  // configPath: 'source.config.ts' is the default
});

export default withMDX(nextConfig);
