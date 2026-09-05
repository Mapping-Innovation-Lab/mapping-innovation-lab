import type { Metadata } from "next";
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/mapping-innovation-lab";
export const ORIGIN = "https://dntounis.github.io";
export const navigation = [
  { label: "MIL", route: "/" },
  { label: "Research", route: "/research/" },
  { label: "Publications", route: "/publications/" },
  { label: "Team", route: "/team/" },
];
export function pathFor(route: string) {
  return `${BASE_PATH}${route.startsWith("/") ? route : "/" + route}`;
}
export function metadataFor(
  title: string,
  description: string,
  route: string,
): Metadata {
  const url = ORIGIN + pathFor(route);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Mapping Innovation Lab",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
