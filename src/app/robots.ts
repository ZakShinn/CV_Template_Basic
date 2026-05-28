import type { MetadataRoute } from "next";
import { isSearchIndexingAllowed } from "@/config";

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingAllowed()) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
        { userAgent: "Googlebot", disallow: "/" },
        { userAgent: "Googlebot-Image", disallow: "/" },
        { userAgent: "Googlebot-News", disallow: "/" },
        { userAgent: "Google-Extended", disallow: "/" },
        { userAgent: "Bingbot", disallow: "/" },
      ],
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
