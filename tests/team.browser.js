// Pass this function to the browser code tool with the local preview running.
export default async function checkTeam(page) {
  const results = [];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:3003/mapping-innovation-lab/team/?check=${Date.now()}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      portraits: [...document.querySelectorAll(".team-portrait")].map((img) => img.complete && img.naturalWidth > 0),
    }));
    if (result.overflow) throw new Error(`Team layout overflows at ${width}px`);
    if (result.portraits.length !== 4 || result.portraits.some((loaded) => !loaded)) {
      throw new Error(`Missing portrait at ${width}px`);
    }
    results.push({ width, ...result });
  }
  await page.locator(".team-profile").first().focus();
  if (await page.locator(".team-profile").first().evaluate((link) => getComputedStyle(link).outlineStyle) === "none") {
    throw new Error("Profile links must retain visible keyboard focus");
  }
  return results;
}
