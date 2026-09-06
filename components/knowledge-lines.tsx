"use client";

import { useEffect, useRef } from "react";

// Decorative trajectories, not measured data. The original drawing remains
// the server-rendered, no-JavaScript and reduced-motion fallback.
const trajectories = [
  "M-20 170C140 170 192 58 365 76S598 220 780 128 950 38 1130 72",
  "M-20 146C150 152 226 28 377 54S592 190 768 112 968 90 1130 20",
  "M-20 122C172 122 228 98 383 107S607 84 768 97 960 190 1130 148",
  "M-20 99C120 88 254 158 409 133S618 11 782 83 947 173 1130 184",
  "M-20 79C159 26 264 186 430 153S621 52 786 67 961 113 1130 123",
  "M-20 57C132 13 265 114 397 93S620 143 774 147 932 8 1130 46",
];
const markers = [
  // Arc-length fractions align the moving nodes with the fallback drawing.
  { path: 0, x: 365, y: 76, r: 4, offset: 0.3334883 },
  { path: 4, x: 430, y: 153, r: 4, offset: 0.3929928 },
  { path: 2, x: 768, y: 97, r: 5, offset: 0.6799051 },
  { path: 3, x: 782, y: 83, r: 4, offset: 0.6916894 },
  { path: 1, x: 377, y: 54, r: 3, offset: 0.3448796 },
];

export function KnowledgeLines() {
  const svgRef = useRef<SVGSVGElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = [...svg.querySelectorAll("path")];
    const circles = [...svg.querySelectorAll("circle")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let last = 0;

    const reset = () => {
      paths.forEach((path, i) => path.setAttribute("d", trajectories[i]));
      circles.forEach((circle, i) => {
        circle.setAttribute("cx", String(markers[i].x));
        circle.setAttribute("cy", String(markers[i].y));
        circle.removeAttribute("opacity");
      });
    };
    const tick = (now: number) => {
      if (!last) last = now;
      // Cap at 30fps; active time excludes pauses and background tabs.
      if (now - last >= 1000 / 30) {
        elapsed.current += Math.min(now - last, 100);
        last = now;
        const seconds = elapsed.current / 1000;
        paths.forEach((path, i) => {
          let coordinate = 0;
          path.setAttribute("d", trajectories[i].replace(/-?\d+/g, (value) => {
            const index = coordinate++;
            if (index % 2 === 0) return value;
            const phase = i * 0.8 + index * 0.45;
            const drift = 15 * (Math.sin(seconds * 0.22 + phase) - Math.sin(phase));
            return (Number(value) + drift).toFixed(2);
          }));
        });
        circles.forEach((circle, i) => {
          const marker = markers[i];
          const fraction = (marker.offset + seconds / (46 + i * 5)) % 1;
          const path = paths[marker.path];
          const point = path.getPointAtLength(path.getTotalLength() * fraction);
          circle.setAttribute("cx", String(point.x));
          circle.setAttribute("cy", String(point.y));
          // Fade at the edges to avoid a visible jump when a marker loops.
          circle.setAttribute("opacity", String(Math.min(1, fraction * 25, (1 - fraction) * 25)));
        });
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (preference.matches) {
        elapsed.current = 0;
        reset();
      } else if (visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(svg);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="knowledge-illustration">
      <svg ref={svgRef} className="knowledge-lines" viewBox="0 0 1100 210" fill="none" aria-hidden="true" focusable="false">
        <g stroke="currentColor" strokeWidth="1.15">
          {trajectories.map((d) => <path key={d} d={d} />)}
        </g>
        <g fill="var(--paper)" stroke="currentColor" strokeWidth="1.6">
          {markers.map((marker) => <circle key={marker.path} cx={marker.x} cy={marker.y} r={marker.r} />)}
        </g>
      </svg>
    </div>
  );
}
