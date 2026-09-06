import lab from "@/content/lab.json";
import { metadataFor, pathFor } from "@/content/site";
import { KnowledgeLines } from "@/components/knowledge-lines";
import { Reveal } from "@/components/reveal";
export const metadata = metadataFor(
  "MIL",
  "An interdisciplinary research collaboration exploring how new ideas emerge, evolve, and transform existing knowledge through AI, history, science, philosophy, and music.",
  "/",
);
export default function Home() {
  const copy = lab.home;
  return (
    <main id="main">
      <section className="home-hero">
        <div className="shell">
          <h1 data-supplied>
            {copy[0].split(" ").map((word, index) => (
              <span key={word}>
                {index > 0 ? " " : ""}<span className="brand-initial">{word[0]}</span>{word.slice(1)}
              </span>
            ))}
          </h1>
          <p className="tagline" data-supplied>
            {copy[1]}
          </p>
          <KnowledgeLines />
          <h2 className="opening-question" data-supplied>
            {copy[2]}
          </h2>
        </div>
      </section>
      <div className="shell">
        <Reveal className="home-introduction">
          <p className="lead" data-supplied>
            {copy[3]}
          </p>
          <p className="lab-statement" data-supplied>
            {copy[4]}
          </p>
        </Reveal>
        <Reveal className="home-detail">
          <div aria-hidden="true" />
          <div className="prose">
            {copy.slice(5, 7).map((paragraph) => (
              <p data-supplied key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal className="home-closing">
          <p className="closing-preface" data-supplied>
            {copy[7]}
          </p>
          <p className="closing-question" data-supplied>
            {copy[8]}
          </p>
          <a className="text-link" href={pathFor("/research/")}>
            Explore research <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </main>
  );
}
