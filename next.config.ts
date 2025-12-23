import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "https://hafsnitcontent.sgp1.digitaloceanspaces.com",
      "hafsnitcontent.sgp1.digitaloceanspaces.com",
      "example.com",
    ], // Allowing images from Unsplash
  },
};

export default nextConfig;
