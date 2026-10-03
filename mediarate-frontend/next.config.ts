import type { NextConfig } from "next";

const backendUrl = new URL(process.env.BACKEND_URL!);

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks optimizing images from private IPs; backend is on localhost in dev
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
