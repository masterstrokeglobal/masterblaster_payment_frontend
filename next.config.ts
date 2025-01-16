import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["geist"],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '', // Leave empty for default ports
        pathname: '/**', // Allow all paths
      },
    ],
  }
};

export default nextConfig;
