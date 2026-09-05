import { pathFor } from "@/content/site";
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <p className="eyebrow">Mapping Innovation Lab · 404</p>
      <h1>Page not found.</h1>
      <p>The page you’re looking for is unavailable.</p>
      <a className="text-link" href={pathFor("/")}>
        Return to MIL <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
