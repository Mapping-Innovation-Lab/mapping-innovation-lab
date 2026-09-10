import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const validator = fileURLToPath(
  new URL("../scripts/verify-static.mjs", import.meta.url),
);

function validateFixture(t, html, css = "") {
  const workspace = mkdtempSync(join(tmpdir(), "mil-export-validation-"));
  t.after(() => rmSync(workspace, { recursive: true, force: true }));
  const files = {
    "index.html": `<!doctype html><html><head></head><body>${html}</body></html>`,
    "assets/site.css": css,
    "assets/site.js": "",
    "assets/font.woff2": "fixture",
    "licenses/Newsreader-OFL.txt": "fixture",
    "licenses/reused-code-MIT.txt": "fixture",
  };
  for (const [name, content] of Object.entries(files)) {
    const destination = join(workspace, "out", name);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, content);
  }
  return spawnSync(process.execPath, [validator], {
    cwd: workspace,
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/mapping-innovation-lab" },
    encoding: "utf8",
  });
}

for (const [name, html, css] of [
  [
    "protocol-relative script",
    '<script src="//cdn.example.org/library.js"></script>',
  ],
  ["HTTP script", '<script src="http://cdn.example.org/library.js"></script>'],
  [
    "HTTPS script",
    '<script src="https://cdn.example.org/library.js"></script>',
  ],
  [
    "external stylesheet",
    '<link rel="stylesheet" href="https://cdn.example.org/site.css">',
  ],
  [
    "external font preload",
    '<link rel="preload" as="font" href="//cdn.example.org/font.woff2">',
  ],
  [
    "external CSS font",
    "",
    '@font-face { font-family: Example; src: url("https://cdn.example.org/font.woff2"); }',
  ],
  [
    "protocol-relative CSS font",
    "",
    "@font-face { font-family: Example; src: url(//cdn.example.org/font.woff2); }",
  ],
]) {
  test(`static validation rejects ${name}`, (t) => {
    const result = validateFixture(t, html, css);
    assert.notEqual(result.status, 0, `${name} must fail static validation`);
    assert.match(result.stderr, /External resource/, result.stderr);
  });
}

test("static validation accepts local assets, SVG data URLs, and external navigation", (t) => {
  const result = validateFixture(
    t,
    `
    <link rel="preconnect" href="/">
    <link rel="stylesheet" href="/mapping-innovation-lab/assets/site.css">
    <script src="/mapping-innovation-lab/assets/site.js"></script>
    <a href="https://dntounis.github.io/geometric-signatures/">Paper companion website</a>
    <a href="https://example.org/research/">External research</a>
  `,
    `
    @font-face { font-family: Example; src: url(./font.woff2); }
    body { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect filter='url(%23n)'/%3E%3C/svg%3E"); }
  `,
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Verified 6 exported files/);
});
