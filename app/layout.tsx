import type { Metadata } from "next";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ORIGIN, pathFor } from "@/content/site";
export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: "Mapping Innovation Lab",
    template: "%s | Mapping Innovation Lab",
  },
  icons: { icon: pathFor("/favicon.svg") },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
