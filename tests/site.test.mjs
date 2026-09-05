import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const base = "/mapping-innovation-lab";
const origin = "https://dntounis.github.io";
const routes = ["", "research/", "publications/", "team/"];
const raw = readFileSync(
  new URL("./fixtures/supplied-copy.txt", import.meta.url),
  "utf8",
);
const blocks = (text) =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
const suppliedHome = blocks(raw.split("MIL tab:")[1].split("Research Tab:")[0]);
const suppliedResearch = blocks(raw.split("Research Tab:")[1]);

async function page(route = "") {
  const filename = `out/${route}index.html`;
  assert.ok(
    existsSync(filename),
    `Static export is missing ${filename}; build the site first`,
  );
  const { JSDOM } = await import("jsdom");
  return new JSDOM(readFileSync(filename, "utf8")).window.document;
}

test("all four public routes export with distinct titles and correct canonical URLs", async () => {
  const titles = new Set();
  for (const route of routes) {
    const doc = await page(route);
    titles.add(doc.title);
    assert.equal(
      doc.querySelector('link[rel="canonical"]').href,
      `${origin}${base}/${route}`,
    );
    assert.ok(
      doc.querySelector('meta[name="description"]').content.length > 40,
    );
    assert.equal(doc.querySelectorAll("main").length, 1);
    assert.equal(doc.querySelectorAll("h1").length, 1);
    assert.equal(doc.documentElement.lang, "en");
  }
  assert.equal(titles.size, 4);
});

test("MIL renders every supplied block verbatim and in its original order", async () => {
  const doc = await page();
  assert.deepEqual(
    [...doc.querySelectorAll("[data-supplied]")].map((e) => e.textContent),
    suppliedHome,
  );
});

test("Research renders every supplied block verbatim with working direction anchors", async () => {
  const doc = await page("research/");
  assert.deepEqual(
    [...doc.querySelectorAll("[data-supplied]")].map((e) => e.textContent),
    suppliedResearch,
  );
  const links = [
    ...doc.querySelectorAll('nav[aria-label="Research directions"] a'),
  ];
  assert.equal(links.length, 4);
  for (const link of links)
    assert.ok(doc.querySelector(link.getAttribute("href")));
});

test("navigation exposes all four routes, active state, skip link and native mobile disclosure", async () => {
  for (const route of routes) {
    const doc = await page(route);
    const nav = doc.querySelector(
      'header nav[aria-label="Primary navigation"]',
    );
    assert.deepEqual(
      [...nav.querySelectorAll("a")].map((e) => e.getAttribute("href")),
      routes.map((r) => `${base}/${r}`),
    );
    assert.equal(
      nav.querySelector('[aria-current="page"]').getAttribute("href"),
      `${base}/${route}`,
    );
    assert.ok(doc.querySelector("header details > summary"));
    assert.equal(doc.querySelector(".skip-link").getAttribute("href"), "#main");
    assert.ok(doc.querySelector("main#main"));
  }
});

test("team names retain requested order and have no invented details", async () => {
  const doc = await page("team/");
  assert.deepEqual(
    [...doc.querySelectorAll("[data-team-name]")].map((e) => e.textContent),
    [
      "Ariel Schwartzman",
      "Chris Chafe",
      "Thomas A. Ryckman",
      "Dimitris Ntounis",
    ],
  );
  assert.equal(doc.querySelectorAll("main img").length, 0);
  const records = JSON.parse(readFileSync("content/lab.json", "utf8")).team;
  for (const person of records) {
    for (const key of ["affiliation", "bio", "role", "url", "portrait"])
      assert.equal(person[key], "");
  }
});

test("publication keeps exact title, manuscript author order and honest placeholder", async () => {
  const doc = await page("publications/");
  assert.equal(
    doc.querySelector("[data-publication-title]").textContent,
    "Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding Framework for Detecting Scientific Revolutions",
  );
  assert.deepEqual(
    [...doc.querySelectorAll("[data-author]")].map((e) => e.textContent),
    [
      "Dimitris Ntounis",
      "Ariel Schwartzman",
      "Chris Chafe",
      "Thomas A. Ryckman",
    ],
  );
  assert.equal(
    doc.querySelector("[data-manuscript-status]").textContent,
    "Manuscript link forthcoming",
  );
  assert.notEqual(doc.querySelector("[data-manuscript-status]").tagName, "A");
  assert.equal(
    doc.querySelector("[data-companion-link]").href,
    "https://dntounis.github.io/mapping-innovation-website/",
  );
});

test("404 and discovery files are exported with public project URLs", async () => {
  assert.ok(existsSync("out/404.html"));
  const { JSDOM } = await import("jsdom");
  const doc = new JSDOM(readFileSync("out/404.html", "utf8")).window.document;
  assert.ok(doc.querySelector(`main a[href="${base}/"]`));
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  for (const route of routes)
    assert.ok(sitemap.includes(`${origin}${base}/${route}`));
  assert.ok(
    readFileSync("out/robots.txt", "utf8").includes(
      `${origin}${base}/sitemap.xml`,
    ),
  );
});
