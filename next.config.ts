import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [],
    // Bust CDN cache for updated public assets (after.png, messages).
    minimumCacheTTL: 60,
    unoptimized: true,
  },
};

export default nextConfig;
