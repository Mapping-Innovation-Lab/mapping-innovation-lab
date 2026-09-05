import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { JSDOM } from "jsdom";

const root = resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/mapping-innovation-lab";
const origin = "https://dntounis.github.io";
assert.ok(existsSync(root), "Static export is missing; run npm run build");
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const files = walk(root);
function targetFor(value, source) {
  if (/^(data:|mailto:|tel:)/.test(value)) return;
  if (value === "https://dntounis.github.io/mapping-innovation-website/")
    return;
  const pagePath = "/" + relative(root, source).replace(/index\.html$/, "");
  const url = new URL(value, origin + base + pagePath);
  if (url.origin !== origin) return;
  assert.ok(
    url.pathname === base || url.pathname.startsWith(base + "/"),
    `Missing project base path: ${value} in ${source}`,
  );
  const local = decodeURIComponent(url.pathname.slice(base.length));
  let target = resolve(root, "." + local);
  assert.ok(
    target === root || target.startsWith(root + "/"),
    `Escaping export: ${value}`,
  );
  if (existsSync(target) && statSync(target).isDirectory())
    target = join(target, "index.html");
  assert.ok(existsSync(target), `Broken local URL: ${value} in ${source}`);
  if (url.hash && target.endsWith(".html")) {
    const doc = new JSDOM(readFileSync(target, "utf8")).window.document;
    assert.ok(
      doc.getElementById(decodeURIComponent(url.hash.slice(1))),
      `Broken anchor: ${value} in ${source}`,
    );
  }
}
for (const file of files) {
  const name = relative(root, file);
  assert.ok(
    !/(^|\/)(\.git|\.github|\.superpowers|docs|tests|node_modules|content|scripts)(\/|$)/.test(
      name,
    ),
    `Private artifact: ${name}`,
  );
  assert.ok(
    !/\.(map|tsx?|md|csv|jsonl|parquet|pdf)$/.test(name),
    `Unexpected source/data export: ${name}`,
  );
  assert.ok(
    !/supplied-copy|pasted-text|task-1|AGENTS|SKILL|\.env/.test(name),
    `Private artifact: ${name}`,
  );
  if (file.endsWith(".html")) {
    const doc = new JSDOM(readFileSync(file, "utf8")).window.document;
    for (const element of doc.querySelectorAll("[href], [src]")) {
      // Connection hints identify an origin, not a file in the exported site.
      if (element.matches('link[rel="preconnect"], link[rel="dns-prefetch"]'))
        continue;
      for (const attr of ["href", "src"])
        if (element.hasAttribute(attr))
          targetFor(element.getAttribute(attr), file);
    }
    assert.equal(
      doc.querySelectorAll('script[src^="https:"], iframe, form').length,
      0,
      `Unexpected external functionality: ${name}`,
    );
  }
  if (file.endsWith(".css")) {
    const css = readFileSync(file, "utf8");
    for (const match of css.matchAll(
      /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g,
    ))
      targetFor(match[1] ?? match[2] ?? match[3].trim(), file);
  }
}
assert.ok(
  existsSync(join(root, "licenses/Newsreader-OFL.txt")),
  "Missing font license",
);
assert.ok(
  existsSync(join(root, "licenses/reused-code-MIT.txt")),
  "Missing reused-code notice",
);
console.log(
  `Verified ${files.length} exported files: local links, assets, anchors, licenses, and private-artifact exclusions.`,
);
