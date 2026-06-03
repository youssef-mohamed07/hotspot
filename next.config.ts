import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Bust CDN cache for updated public assets (after.png, messages).
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
