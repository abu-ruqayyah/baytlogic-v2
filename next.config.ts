import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Required for OpenNext Cloudflare Pages deployment
  experimental: {
    serverActions: {
      allowedOrigins: ["baytlogic.com.ng", "*.pages.dev", "*.netlify.app"],
    },
  },
};

export default nextConfig;
