import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Required for OpenNext Cloudflare Pages deployment
  experimental: {
    serverActions: {
      allowedOrigins: ["baytlogic.com.ng", "*.pages.dev"],
    },
  },
};

export default nextConfig;
