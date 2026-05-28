import type { NextConfig } from "next";
import { isSearchIndexingAllowed } from "./src/config";

const staticCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["docx"],
  },
  async headers() {
    const rules: { source: string; headers: { key: string; value: string }[] }[] = [
      {
        source: "/avatar/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
    ];

    if (!isSearchIndexingAllowed()) {
      rules.push({
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      });
    }

    return rules;
  },
};

export default nextConfig;
