import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['kraftbase-stock-derby.s3.amazonaws.com', "kraftbase-stock-derby.s3.ap-south-1.amazonaws.com", 'abc.com', 'example.com', "source.unsplash.com",],
  },
};

export default nextConfig;
