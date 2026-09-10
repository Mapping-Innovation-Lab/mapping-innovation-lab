import lab from "@/content/lab.json";
import { metadataFor, pathFor } from "@/content/site";
import Image from "next/image";
export const metadata = metadataFor(
  "Team",
  "The Mapping Innovation Lab team: Ariel Schwartzman, Chris Chafe, Thomas A. Ryckman, and Dimitris Ntounis.",
  "/team/",
);
export default function Team() {
  return (
    <main id="main" className="shell secondary-main">
      <header className="page-heading">
        <p className="eyebrow">Mapping Innovation Lab</p>
        <h1>Team</h1>
      </header>
      <ul className="team-list">
        {lab.team.map((person) => (
          <li key={person.name}>
            <div
              className="team-portrait-frame"
              data-close-crop={person.name === "Dimitris Ntounis" ? "true" : undefined}
            >
              <Image
                className="team-portrait"
                src={pathFor(person.portrait)}
                alt={`Portrait of ${person.name}`}
                width={180}
                height={180}
                unoptimized
              />
            </div>
            <h2>
              <a className="team-profile" href={person.url}>
                <span data-team-name>{person.name}</span>
                <span className="profile-arrow" aria-hidden="true">↗</span>
              </a>
            </h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
