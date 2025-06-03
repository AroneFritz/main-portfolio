import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  // Only enable export for static builds, not development
  ...(process.env.NEXT_EXPORT === 'true' && { output: 'export' }),
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' && process.env.NEXT_EXPORT === 'true' ? '/main-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.NEXT_EXPORT === 'true' ? '/main-portfolio/' : '',
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds for static export
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during builds for static export
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Disable PWA for static export
  ...(process.env.NODE_ENV === 'production' && {
    generateBuildId: () => 'build',
  }),
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Headers don't work with static export, so we'll skip them for GitHub Pages
  ...(process.env.NEXT_EXPORT !== 'true' && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
      ];
    },
  }),
};

// Disable PWA for static export, enable for development/server builds
const isStaticExport = process.env.NODE_ENV === 'production' && process.env.NEXT_EXPORT === 'true';

const pwaConfig = isStaticExport ?
  (config: NextConfig) => config : // No PWA for static export
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    buildExcludes: [/middleware-manifest\.json$/],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-static",
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
          },
        },
      },
      {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-image-assets",
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  });

export default pwaConfig(nextConfig);
