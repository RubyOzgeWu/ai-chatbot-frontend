import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  async rewrites() {
    return isDev
      ? [
          {
            source: "/api/:path*",
            destination: `${process.env.BASE_URL}/api/:path*`,
          },
        ]
      : [];
  },
};

export default nextConfig;
