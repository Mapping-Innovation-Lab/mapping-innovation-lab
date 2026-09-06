// Pass this function to the browser code tool against the static preview on port 3003.
export default async function checkMotion(page) {
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:3003/mapping-innovation-lab/?motion-check=${Date.now()}`, { waitUntil: "networkidle" });
  const shape = () => page.locator(".knowledge-lines").innerHTML();
  let before = await shape();
  await page.waitForTimeout(1000);
  check(before !== await shape(), "The schematic must evolve over time");
  check(await page.locator(".knowledge-illustration button").count() === 0, "The schematic should have no visible controls");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  before = await shape();
  await page.waitForTimeout(500);
  check(before === await shape(), "Reduced motion must keep a still drawing");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(150);
  before = await shape();
  await page.waitForTimeout(500);
  check(before === await shape(), "Offscreen animation must stop");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  check(before !== await shape(), "Reentry must resume animation");
  check(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), "Mobile layout must not overflow");
  return "Motion, control removal, reduced motion, offscreen suspension, and mobile overflow checks passed.";
}
