// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // 👈 add this
  },
};

export default nextConfig;
