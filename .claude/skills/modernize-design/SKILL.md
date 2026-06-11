---
name: modernize-design
description: Apply a modern design refresh to AuroraFlow website pages — bolder typography, refined spacing/rhythm, subtle micro-interactions, layered color/depth (gradient blobs, soft shadows), and updated card/button components — while staying consistent with the existing brand system in shared.css. Use when asked to "modernize", "refresh the design", or "make a page feel more current" for the auroraflow-website site.
---

# Modernize Design (AuroraFlow)

Guided pass for giving AuroraFlow pages a more current, polished feel without
breaking the existing brand identity. The site already has a strong base
(Poiret One display type, rainbow accent palette, page-hero sparkles/Ken Burns,
scroll-reveal). This skill layers *evolution*, not a rewrite.

## Design system reference

All shared tokens live in `auroraflow-website/shared.css` under `:root`.

- **Colors**: `--cream`, `--warm-white`, `--dark`, `--mid`, `--muted`,
  `--accent` / `--spark` (#ADCD52 lime), `--accent2` / `--waves` (#12736D teal),
  `--deep` (#363971 indigo), `--space` (#6E3F8D purple), `--border`
- **Type**: `--serif` (Poiret One — display/headings), `--sans` (Roboto — body/UI)
- **Layout**: `--nav-h` (72px fixed nav)
- **Shared components**: `nav`, `.nav-links`, `.btn-book`, `.rainbow-bar`,
  `.page-hero` (+ `.page-hero-img`, `.page-hero-content`, `.hero-sparkles`),
  `section` / `.section-inner` / `.section-label`, `.btn-outline`, `footer`
- **Per-page components**: each top-level page (`index.html`, `services.html`,
  `team.html`, etc.) defines its own `<style>` block for page-specific cards
  (`.provider-card`, `.service-card`, `.svc-card`, `.team-card`, `.article-card`, ...)
- Scroll-reveal already exists via `@supports (animation-timeline: view())` —
  don't duplicate it, build on it.
- `prefers-reduced-motion: reduce` is honored throughout — any new animation
  MUST be wrapped or disabled accordingly.

## Modernization moves (pick what fits the page)

### 1. Bolder typography & spacing
- Push hero/section headings toward the top of their `clamp()` range; tighten
  `letter-spacing` slightly on large display text (`-0.01em` → `-0.02em`).
- Use `font-weight: 700` sparingly on key phrases (already used in the hero)
  to create a serif/sans, light/bold contrast.
- Increase breathing room on hero/feature sections (e.g. `section { padding }`
  from `80px 40px` toward `100–120px 40px` on desktop) — don't apply globally
  without checking density on content-heavy pages (journal, policies).

### 2. Micro-interactions & motion
- Card hover: `transform: translateY(-4px to -6px)` + soft shadow, transition
  `0.25–0.35s cubic-bezier(0.2,0.7,0.2,1)`.
- Buttons: add a subtle lift + shadow on hover in addition to existing color
  swap (`.btn-book`, `.btn-outline`, `.btn-hero*`).
- Image reveals: scale-on-hover (`transform: scale(1.04)`) already used on
  `.provider-photo img` — extend the pattern to other image cards.
- Always gate new transforms/animations behind
  `@media (prefers-reduced-motion: no-preference)` or ensure the static state
  is acceptable.

### 3. Refreshed color & visual texture
- Introduce soft, blurred gradient "blobs" using the existing accent palette
  (`--spark`, `--waves`, `--deep`, `--space`) behind dark sections
  (e.g. `.tagline-band`) for depth — `position: absolute`, `filter: blur(60–90px)`,
  `opacity: 0.25–0.4`, placed off-canvas at corners, content wrapped in a
  `position: relative; z-index: 1` container.
- Gradient text for accent phrases in headings: `background: linear-gradient(...)`
  + `background-clip: text` + `color: transparent` (use sparingly — one phrase
  per hero max).
- Soft colored shadows under hero/feature images instead of flat borders, e.g.
  `box-shadow: 0 24px 60px -20px rgba(18,115,109,0.35)`.

### 4. Component / layout modernization
- Increase border-radius on cards/images/thumbnails for a softer feel — add
  shared tokens to `:root` if missing:
  ```css
  --radius-sm: 10px;
  --radius: 16px;
  --radius-lg: 24px;
  --shadow-sm: 0 2px 12px rgba(28,24,22,0.06);
  --shadow-md: 0 12px 32px rgba(28,24,22,0.10);
  --shadow-lift: 0 16px 40px rgba(28,24,22,0.14);
  ```
  then swap hardcoded `border-radius: 3px/4px` → `var(--radius)` /
  `var(--radius-sm)` on card/photo/thumb classes.
- Add a thin gradient accent bar that animates in on hover for list-style
  cards (`.service-card`, `.svc-card`, `.article-card`): a `::before` top bar
  using the rainbow gradient from `.rainbow-bar`, `transform: scaleX(0)` →
  `scaleX(1)` on `:hover`.
- Consider asymmetric/bento-style grids for feature sections where currently
  uniform (e.g. featuring one larger card among smaller ones) — only if it
  doesn't complicate reuse across pages.

## Process

1. Read the target page's `<style>` block and cross-check against
   `shared.css` to know what's shared vs. page-local.
2. Add new shared tokens (radius/shadow vars) to `shared.css :root` if this is
   the first page touched — reuse them on subsequent pages instead of
   redefining.
3. Apply changes incrementally per section, keeping edits scoped to CSS
   (avoid restructuring HTML/markup unless a layout change was requested).
4. Preserve all accessibility affordances: focus states, alt text,
   `prefers-reduced-motion`, color contrast against `--cream`/`--dark`.
5. After styling, sanity-check responsive breakpoints (`@media (max-width: 900px)`
   and `480px`) still hold — new paddings/radii/shadows often need adjusting
   down for mobile.
6. If a dev server or browser preview is available, view the page before/after.
