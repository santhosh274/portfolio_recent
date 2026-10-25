import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  // Dev-only: allow HMR / dev resources when testing over the LAN.
  // This has no effect on production builds.
  allowedDevOrigins: ["192.168.1.11"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    // Tree-shake icon/animation libraries instead of walking the full barrel export.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized variants are content-addressed and never change in place.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Static media under /public is not content-hashed, so cache it for a
        // month with stale-while-revalidate instead of hitting the origin.
        source: "/:path*.(webp|png|jpg|jpeg|gif|svg|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://cdn.jsdelivr.net",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
