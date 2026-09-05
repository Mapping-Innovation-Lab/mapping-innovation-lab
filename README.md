# Mapping Innovation Lab

The group's four-page editorial website: MIL, Research, Publications, and Team.
Source is private; the static GitHub Pages website is public.

## Local development

Use Node 22.13 or later (or Node 24+).

```sh
npm ci
npm run dev
```

The project uses the base path `/mapping-innovation-lab`. Open the URL printed by
the local server with that path appended.

## Verify and publish

```sh
npm run lint
NEXT_PUBLIC_BASE_PATH=/mapping-innovation-lab npm run build
npm test
npm run verify-static
```

Pushes to main run CI but do not publish. After reviewing the static export,
publish with the **Deploy GitHub Pages** workflow's **Run workflow** button, or:

```sh
gh workflow run pages.yml --ref main
```

Only `out/` is uploaded to Pages. The source fixture, planning documents, and
repository metadata must never be added to `public/` or to the Pages artifact.
Keep the GitHub repository private. The public website is intended to be served at
https://dntounis.github.io/mapping-innovation-lab/.

## Content rules

- The supplied MIL and Research prose must remain verbatim. Tests independently
  compare rendered text against `tests/fixtures/supplied-copy.txt`.
- Team order and publication authorship are intentionally different.
- Team names currently have no biographies, affiliations, roles, portraits, or
  profile links. Empty fields are intentional, not permission to invent details.
- The publication is a title placeholder with a link to the paper companion;
  do not invent a DOI, journal, date, or manuscript URL.
- The illustration is decorative, not an empirical research figure.
- The existing paper companion is maintained and deployed separately.

Reused software and font notices are retained with the site. No new reuse license
is granted for the group's supplied prose by this project setup.
