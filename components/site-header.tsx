"use client";
import { usePathname } from "next/navigation";
import { navigation, pathFor } from "@/content/site";
export function SiteHeader() {
  const pathname = usePathname();
  const links = navigation.map(({ label, route }) => (
    <a
      key={route}
      href={pathFor(route)}
      aria-current={
        pathname.replace(/\/$/, "") === route.replace(/\/$/, "")
          ? "page"
          : undefined
      }
    >
      {label}
    </a>
  ));
  return (
    <header className="site-header shell">
      <a
        className="wordmark"
        href={pathFor("/")}
        aria-label="Mapping Innovation Lab home"
      >
        MIL<span aria-hidden="true">.</span>
      </a>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {links}
      </nav>
      <details className="mobile-navigation">
        <summary>
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">{links}</nav>
      </details>
    </header>
  );
}
