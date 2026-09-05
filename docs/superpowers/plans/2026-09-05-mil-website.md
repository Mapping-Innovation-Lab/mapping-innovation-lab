# Mapping Innovation Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the approved four-page group site, preserving supplied text verbatim.

**Architecture:** A separate Next.js static export. Shared navigation and styling wrap data-driven pages; a private source fixture independently validates all supplied copy in rendered HTML.

**Tech Stack:** Next.js 16.3.4, React 19.2.6, TypeScript, self-hosted Newsreader, Node tests, jsdom, GitHub Actions/Pages.

**Spec:** `docs/superpowers/specs/2026-09-05-mil-website-design.md`

## Global Constraints

- Preserve supplied MIL and Research text VERBATIM, including punctuation, paragraph boundaries, and order.
- Preserve the companion's warm-paper editorial style; do not modify the companion.
- Four routes: `/`, `/research/`, `/publications/`, `/team/`; base path `/mapping-innovation-lab`.
- Private repository `dntounis/mapping-innovation-lab`; public GitHub Pages site.
- Team order: Ariel Schwartzman, Chris Chafe, Thomas A. Ryckman, Dimitris Ntounis. Other team fields empty.
- Publication author order: Dimitris Ntounis, Ariel Schwartzman, Chris Chafe, Thomas A. Ryckman. No invented publication details.
- No external fonts, analytics, private planning artifacts in export, or new licenses for group prose.

## Files and responsibilities

- `content/lab.json`: typed-at-consumption exact supplied content and requested records.
- `tests/fixtures/supplied-copy.txt`: unchanged supplied attachment, excluded from public export.
- `tests/site.test.mjs`: rendered content equality, page/metadata/navigation/team/publication contracts.
- `scripts/verify-static.mjs`: fail on broken local targets or private artifact exposure.
- `app/{layout,page,globals.css,not-found,robots,sitemap}`: shared shell, homepage, metadata and recovery.
- `app/{research,publications,team}/page.tsx`: three secondary routes.
- `components/{site-header,site-footer,knowledge-lines}.tsx`: shared editorial interface and illustrative graphic.
- `content/site.ts`: base-path URLs and route metadata helper.
- `.github/workflows/pages.yml`: reproducible checks and manually dispatched public deployment.

## Task 1: Build and validate the complete static site

**Interfaces:** `lab.json` exports `home: string[]`, `research: {intro: string[], directions: {id,title,question,paragraphs}[]}`, `team: {name,affiliation,bio,role,url,portrait}[]`, and `publication: {title,authors,paperUrl,companionUrl}`. `site.ts` exports `pathFor(route)` and `metadataFor(title,description,route)`.

- [ ] Add a byte-identical input fixture and write rendered-output assertions before UI code.
  ```js
  const supplied = raw.split('MIL tab:')[1].split('Research Tab:')[0].split('\n').map(s=>s.trim()).filter(Boolean);
  assert.deepEqual([...home.querySelectorAll('[data-supplied]')].map(e=>e.textContent), supplied);
  ```
- [ ] Run `node --test tests/site.test.mjs`; verify missing output fails the export contract.
- [ ] Create pinned dependencies and static Next config. Implement the shared shell and routes from `lab.json`, using `data-supplied` on each original text block.
  ```tsx
  <p data-supplied>{paragraph}</p>
  ```
- [ ] Use CSS paper tokens, Newsreader headings, a restrained decorative line graphic, desktop links/mobile disclosure menu, focus outlines, and reduced-motion fallbacks. Keep user text separate from added navigation labels.
- [ ] Run `npm run lint && npm run build && npm test && npm run verify-static`; fix failures without weakening verbatim-copy expectations.
- [ ] Inspect all routes at 1440, 768, and 390 pixels; verify no overflow, functional mobile menu, readable headings, working focus and illustration placement. Commit explicit application paths.

## Task 2: Publish the verified export

**Interfaces:** consumes Task 1's `out/`; produces a private GitHub repository and public Pages deployment of that exact commit.

- [ ] Create `.github/workflows/pages.yml` using checkout, Node 22, npm ci, lint, build, tests, export validation, upload-pages-artifact; deploy-pages only for workflow_dispatch.
- [ ] Create the repository with `gh repo create dntounis/mapping-innovation-lab --private --source=. --remote=origin`, then push main. Never alter another repository.
- [ ] Configure Pages with `gh api --method POST repos/dntounis/mapping-innovation-lab/pages -f build_type=workflow`; if GitHub reports existing configuration inspect it before updating.
- [ ] Dispatch `gh workflow run pages.yml --ref main`; inspect run conclusion and deployed commit.
- [ ] Verify anonymous HTTP 200 for all four live routes, exact copy, team order, and base-path assets. Read repository privacy and Pages public status independently.
- [ ] Report the public site, private repository, deployed commit, and verification evidence. Note publication/team omissions are user-approved.

## Review and progress

The supplied-copy fixture is independent of production JSON, so accidental copy
edits fail the rendered test. Shared file/interface names match across tasks.
No dependency on the paper site's deployment. Work will use a dedicated
`codex/build-mil-site` branch in the new, otherwise empty local repository.
