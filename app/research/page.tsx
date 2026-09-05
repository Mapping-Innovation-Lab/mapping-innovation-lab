import lab from "@/content/lab.json";
import { metadataFor } from "@/content/site";
import { Reveal } from "@/components/reveal";
export const metadata = metadataFor(
  "Research",
  "Four connected research directions: mapping conceptual change, knowledge through time, discovery, and innovation across domains.",
  "/research/",
);
export default function Research() {
  return (
    <main id="main" className="shell">
      <header className="page-heading">
        <p className="eyebrow">Mapping Innovation Lab</p>
        <h1 data-supplied>Research</h1>
        <div className="research-intro prose">
          {lab.research.intro.map((paragraph) => (
            <p data-supplied key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </header>
      <div className="research-layout">
        <nav className="research-contents" aria-label="Research directions">
          <p className="eyebrow">Research directions</p>
          {lab.research.directions.map((direction, index) => (
            <a href={`#${direction.id}`} key={direction.id}>
              <span>0{index + 1}</span>
              {direction.title}
            </a>
          ))}
        </nav>
        <div>
          {lab.research.directions.map((direction, index) => (
            <section
              className="research-direction"
              id={direction.id}
              key={direction.id}
            >
              <Reveal>
                <span className="direction-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h2 data-supplied>{direction.title}</h2>
                <p className="direction-question" data-supplied>
                  {direction.question}
                </p>
                <div className="prose">
                  {direction.paragraphs.map((paragraph) => (
                    <p data-supplied key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
