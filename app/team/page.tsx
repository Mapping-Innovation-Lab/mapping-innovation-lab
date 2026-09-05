import lab from "@/content/lab.json";
import { metadataFor } from "@/content/site";
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
            <h2 data-team-name>{person.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
