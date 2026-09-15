import lab from "@/content/lab.json";
import { metadataFor } from "@/content/site";
export const metadata = metadataFor(
  "Publications",
  "Research from the Mapping Innovation Lab, including Geometric Signatures of Conceptual Reorganization and its paper companion website.",
  "/publications/",
);
export default function Publications() {
  const paper = lab.publication;
  return (
    <main id="main" className="shell secondary-main">
      <header className="page-heading">
        <p className="eyebrow">Mapping Innovation Lab</p>
        <h1>Publications</h1>
      </header>
      <article className="publication">
        <span className="section-kicker">Preprint · 2026</span>
        <div>
          <h2 data-publication-title>{paper.title}</h2>
          <ul className="author-list">
            {paper.authors.map((name) => (
              <li key={name} data-author>
                {name}
              </li>
            ))}
          </ul>
          <p className="manuscript-status">
            <a className="text-link" data-preprint-link href={paper.paperUrl}>
              Read the preprint · arXiv:{paper.arxivId} <span aria-hidden="true">↗</span>
            </a>
          </p>
          <a
            className="text-link"
            data-companion-link
            href={paper.companionUrl}
          >
            Paper companion website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </main>
  );
}
