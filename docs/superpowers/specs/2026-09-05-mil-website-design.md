# Mapping Innovation Lab website

## Purpose and approved direction

Build a separate, public group website with four pages: **MIL, Research,
Publications, Team**. Preserve the editorial character of the existing Geometric
Signatures paper companion. Do not modify or redeploy the paper companion as part
of this project.

The user approved the four-page structure, supplied the MIL and Research copy,
requested a publication placeholder, and specified the team order below. This
document records the implementation details for review before coding.

## Visual direction

**Visual thesis:** a quiet research publication on warm paper, with prominent
serif typography, fine rules, generous spacing, and restrained ink-blue accents.

Reuse the companion's Newsreader serif and system sans-serif pairing, paper
background (#f4f0e7), ink (#18212a), muted text (#58636b), and thin separators
(#c8c1b4). Use rust sparingly for focus and small accents. Retain subtle paper
texture. No generic card grid, photographic hero, invented team portraits,
institutional logos, or change in the established editorial style.

The homepage's visual anchor is the large Mapping Innovation Lab masthead,
supported by a restrained, non-data-bearing line illustration of connections
through time. It must not look like measured research results. Keep this graphic
secondary to the brand and opening question, with no text placed over busy marks.

**Content plan:** masthead and opening question; introductory argument and lab
description; the supplied longer explanation; concluding question and a clear
link to Research. The Research page holds the four detailed research directions.

**Interaction thesis:** a short masthead entrance, restrained progressive section
reveals, and clear link/navigation hover and focus transitions. No perpetual
animation. Reduced-motion users see all content immediately. Mobile navigation
must work with keyboard and touch; active-page state is visible.

## Pages and content

### MIL — `/`

- Mapping Innovation Lab.
- AI · Knowledge · Time.
- Opening question: “Can artificial intelligence genuinely innovate?”
- Include all supplied MIL prose, preserving meaning and wording. Divide it into
  readable paragraphs rather than compressing it into the first viewport.
- Present the supplied final research question as a closing editorial statement.
- Primary action: Explore research, linking to `/research/`.

### Research — `/research/`

Include the supplied introduction and all four directions, in this order:

1. Mapping Conceptual Change.
2. Knowledge Through Time.
3. From Mapping to Discovery.
4. Innovation Across Domains.

Each direction has its supplied question and full explanatory prose, with stable
section anchors and a compact on-page contents list. Use open sections divided by
fine rules, not cards. Preserve the distinction between current retrospective
work and prospective research ambitions. Do not introduce new numerical findings
or portray the Higgs case as validated historical evidence.

### Publications — `/publications/`

Show a single clearly identified placeholder with this exact paper title:

**Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding
Framework for Detecting Scientific Revolutions**

Author order follows the manuscript: Dimitris Ntounis, Ariel Schwartzman,
Chris Chafe, Thomas A. Ryckman. Do not invent a journal, publication date, DOI,
arXiv identifier, or published/preprint status. Display “Manuscript link
forthcoming” as plain text, not a broken or disabled-looking link. Include a
working “Paper companion website” link to the existing public companion.

### Team — `/team/`

Display these names in the requested order:

1. Ariel Schwartzman.
2. Chris Chafe.
3. Thomas A. Ryckman.
4. Dimitris Ntounis.

Keep affiliation, biography, role, profile URL, and portrait fields empty in the
content records. Do not render empty labels, dummy portraits, “coming soon” bios,
or infer roles from author order. The user specifically asked for names only for
now; the Team order differs intentionally from publication authorship.

## Shared structure and architecture

- Separate local repository at
  `/Users/dntounis/Documents/Research/mapping-innovation-lab`.
- Use the companion's established Next.js/TypeScript static-export approach,
  with four real routes, trailing slashes, and no server dependencies.
- Keep lab copy, publication, and team records in dedicated content modules.
- Shared header: MIL wordmark and MIL | Research | Publications | Team links.
- Shared footer: lab name and navigation. No invented contact address,
  affiliation, social account, or reuse license for the new group text.
- Retain attribution/license notices for any reused MIT-licensed website code;
  do not automatically apply the companion's text/figure license to group prose.
- Include route-specific page titles and descriptions, canonical URLs, sitemap,
  robots file, and a branded 404 page linking back to MIL.
- Self-host the existing font assets with their required license notices. No
  analytics, cookies, forms, third-party scripts, CMS, or authentication.
- The original supplied text remains the content authority. Changes are limited
  to formatting and paragraph presentation unless separately approved.

## Hosting and privacy

- Create `dntounis/mapping-innovation-lab` as a **private** GitHub repository.
- Publish the static export as a **public** GitHub Pages website at
  `https://dntounis.github.io/mapping-innovation-lab/`.
- Configure the project base path `/mapping-innovation-lab` for every internal
  navigation and asset URL.
- Use GitHub Actions to lint, build, test, and validate the exported artifact.
  Keep public deployment an explicit workflow dispatch, as in the companion.
- Upload only the static export, never the repository, planning documents,
  attachment, or unneeded source assets, to Pages.
- Verify private repository visibility and public anonymous website access
  separately after setup. Do not change repository visibility or account plan to
  bypass a hosting restriction. If GitHub rejects private-source Pages, stop that
  step and report it while retaining the completed local site.
- No custom domain, DNS changes, paid services, or changes to the existing website.

## Validation and completion

1. Automated checks cover the four exported routes, exact team and author order,
   publication placeholder, supplied content coverage, accessible navigation,
   valid base-path links, and absence of private artifacts in the export.
2. Run lint, type/build checks, tests, and static-export validation.
3. Inspect the homepage and all secondary routes at desktop, tablet, and mobile
   widths. Check wrapping, horizontal overflow, keyboard focus, mobile menu,
   reduced motion, and graphic/text contrast.
4. Push to the private repository, run the Pages deployment, and verify its
   successful completion and the live content on all four routes.
5. Hand off the public website link, private repository link, deployed commit,
   and any remaining user-owned content fields. Empty Team details and the
   manuscript-link placeholder are intentional scope, not unfinished work.

## Scope exclusions

No manuscript edits, research reanalysis, new publication claims, automatic
biography gathering, team invitations, newsletter, recruiting page, or contact
form. Preserve the paper companion and its deployment state.
