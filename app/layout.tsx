import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloudNext - Modern Web Apps on the Edge",
  description: "High-performance Next.js applications deployed globally on Cloudflare Pages",
  keywords: "Next.js, Cloudflare, edge computing, web development, performance, SSG, static sites",
  authors: [{ name: "CloudNext Agency" }],
  openGraph: {
    title: "CloudNext - Next.js & Cloudflare Specialists",
    description: "Building lightning-fast websites and applications that leverage the power of the edge",
    images: [
      {
        url: "/images/hero/cloudnext-hero.svg",
        width: 1200,
        height: 600,
        alt: "CloudNext - Next.js and Cloudflare integration"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudNext - Next.js & Cloudflare Specialists",
    description: "Building lightning-fast websites and applications that leverage the power of the edge",
    images: ["/images/hero/cloudnext-hero.svg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Analytics - Replace G-PLACEHOLDER with your actual Google Analytics measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // Replace G-PLACEHOLDER with your actual Google Analytics measurement ID (format: G-XXXXXXXXXX)
              gtag('config', 'G-PLACEHOLDER');
            `
          }}
        />
      </head>
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  );
}
