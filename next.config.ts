import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/card.html',
        destination: '/card',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
