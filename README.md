# Glass Hero — Portfolio

A single full-screen hero: a pale-blue editorial portrait that reveals an
aligned liquid-glass anatomical version through a soft circular cursor/touch
mask.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build && npm start` runs the production
build.

## Customize

Open `components/glass-hero.tsx` and edit the constants at the top of the
file:

- `NAME` — the monogram + wordmark in the nav
- `CTA_LINK` — where both "Let's talk" and "Explore my work" point
- `HEADLINE_LINES`, `INTRO_LINE`, `TAGLINE_LINES` — the hero copy
- `NAV_LINKS` — the four desktop nav items (currently on-page anchors —
  point them at real routes/sections once those exist)

## Files

```
app/
  globals.css     grid, mask, entrance-animation, and responsive styles
  layout.tsx      loads Albert Sans + Fragment Mono, sets viewport meta
  page.tsx        renders <GlassHero />
components/
  glass-hero.tsx  the hero: pointer/touch reveal, nav, headline, copy
public/images/    the four base/reveal PNG pairs
```

## Notes

- The reveal mask is driven entirely by CSS variables (`--reveal-x`,
  `--reveal-y`, `--reveal-radius`) updated from a single
  `requestAnimationFrame` loop — no React state changes on pointer move, no
  canvas, no animation library.
- Desktop uses continuous hover tracking; touch requires press-and-drag and
  closes on release, matching the spec.
- `prefers-reduced-motion` removes the entrance animation and sets the
  interpolation factors to 1 (no lag, instant reveal).
