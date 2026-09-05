import type { MetadataRoute } from "next";
import { navigation, ORIGIN, pathFor } from "@/content/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ route }) => ({ url: ORIGIN + pathFor(route) }));
}
