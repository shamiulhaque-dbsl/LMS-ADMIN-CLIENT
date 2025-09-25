import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "randomuser.me"], // Allowing images from Unsplash
  },
};

export default nextConfig;
