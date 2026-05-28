import type { MetadataRoute } from "next";
import { isSearchIndexingAllowed } from "@/config";
import { cv } from "@/resume";

/** Không tạo sitemap khi chặn index — tránh Google thu thập URL */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSearchIndexingAllowed()) return [];

  const base = cv.meta.siteUrl;
  if (!base) return [];

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
