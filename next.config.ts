import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    unoptimized: true,
    /* config options here */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qsohd7f0aqhsgruh.public.blob.vercel-storage.com",
        port: "",
      },
    ]
  }
};

export default nextConfig;
