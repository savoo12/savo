import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Static site generation for Cloudflare Pages
  
  // Ensure 404 page is generated as 404.html for static hosting
  trailingSlash: false,
  
  // Image optimization configuration for Cloudflare
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'tailwindui.com'], // Add domains you want to load images from
  },
  
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
