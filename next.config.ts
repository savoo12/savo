import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Static site generation for Cloudflare Pages
  // Ensure 404 page is generated as 404.html for static hosting
  trailingSlash: false,
};

export default nextConfig;
