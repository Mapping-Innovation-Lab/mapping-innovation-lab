import { navigation, pathFor } from "@/content/site";
export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <a className="footer-brand" href={pathFor("/")}>
        Mapping Innovation Lab
      </a>
      <nav aria-label="Footer navigation">
        {navigation.map(({ label, route }) => (
          <a key={route} href={pathFor(route)}>
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
