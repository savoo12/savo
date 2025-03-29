import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  output: 'export', // Static site generation for Cloudflare Pages
};

export default nextConfig;
