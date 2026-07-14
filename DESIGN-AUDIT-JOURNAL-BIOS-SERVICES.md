# Auroraflow Design Audit — Journal / Bios / Services

Audit of auroraflow.com (static site, repo at /home/user/website/auroraflow-website).
Goal: **small but powerful** modernization moves. No redesigns, no new pages, no brand changes.
The mockup artifact must show before → after for each proposal so the owner can approve piecemeal.

## Current design system (from shared.css — keep all of this)
- Palette: cream `#faf7f2`, warm-white `#fdf9f4`, dark `#1c1816`, mid `#4a4340`, muted `#6c635d`,
  accent green `#ADCD52`, teal `#12736D`, deep indigo `#363971`, purple `#6E3F8D`, night `#0c0e1d`.
- Rainbow gradient signature: `linear-gradient(to right, #ADCD52, #12736D, #363971, #6E3F8D, #BA7EC9, #585BA7, #52BCA3, #D9E493)` — used as 4px bars and hover reveals.
- Type: 'Poiret One' for display (light, geometric, airy), Roboto 300 body. Pill buttons (border-radius 100px), uppercase 10–12px letterspaced micro-labels.
- Motion language already exists: a 9.5s "breath" rhythm, calm cubic-beziers, staggered rises, Ken Burns heroes, `prefers-reduced-motion` respected everywhere. Any new motion must match this and respect reduced-motion.

## Findings — Journal (journal.html)
J1. **No dates anywhere.** Cards/featured show only "Author · X min read". A modern journal signals freshness. Proposal: add a small date to meta rows.
J2. **Tag filtering is abrupt** — cards `display:none` instantly. Proposal: soft fade/rise transition on filter, plus per-tag counts on the pill buttons ("Team · 4").
J3. **All category tags look identical** (muted gray microtext). Proposal: color-code category chips using the brand palette (Identity=purple #6E3F8D, Services=teal #12736D, Team=indigo #363971, Wellness=olive tone of #ADCD52) as tinted pills — small, instantly scannable.
J4. **Dead newsletter code**: `.newsletter-form` CSS + `handleSubscribe()` JS exist but no markup — a newsletter band was removed or never shipped. Proposal: reinstate a slim newsletter band between grid and footer (dark night-sky treatment to match join-band).
J5. Featured card is good; could gain a subtle "Featured" pill on the image and the color-coded chip from J3.

## Findings — Team & Bios (team.html, team/*.html)
T1. **Pronouns are inconsistently formatted and buried** in the title line: "She/Her", "she/they", "They/she", "Any/All" — casing varies, and they're concatenated with the role ("Massage Therapist · He/Him"). For an inclusivity-first brand this is the highest-value fix: split pronouns into their own small outlined pill chip under/next to the name, normalized casing (e.g. "she/her"). Bio pages already have a `.bio-pronoun` pill — reuse that pattern on cards for consistency.
T2. **Book Now button competes with every card.** 14 identical dark pills create noise. Proposal: quieter outlined pill that fills on hover, or reveal-on-hover on desktop (always visible on touch).
T3. **Photo hover** is a plain lift. Proposal: on hover, a 2px rainbow gradient ring fades in around the photo (border-image / padding trick) — echoes the site's signature without adding color at rest.
T4. Group headings ("Service Providers", "Support Staff") could carry counts and a touch more presence (thin rule + count).
T5. Join band's "View Open Positions" links to `#` (dead link) — flag it.
Bio pages: B1. Single-service grids look sparse ("Book a Session with Lydia" → one lonely card); proposal: card row auto-fits with a max width so 1–2 items don't stretch/strand. B2. Card pronoun pill on team page should visually match `.bio-pronoun` for continuity.

## Findings — Services (services.html)
S1. **Price/duration is a single muted microcaps line** ("From $125 · 60 min") that's easy to miss — it's the #1 decision datum. Proposal: split into a price + duration meta row: price slightly larger in dark, duration as a small neutral chip with a clock glyph. "Email for pricing"/"$30 add-on" become an "Add-on"/"Inquire" chip so oddballs stop pretending to be prices.
S2. **Filter pills lack counts** and the two categories are plural-ambiguous. Add counts ("Massage & Bodywork · 14"). Same soft filter transition as J2.
S3. **No category signal on cards** when viewing "All Services". Proposal: tiny tinted category chip (teal = massage, purple = skincare) top-left on the image, consistent with J3's chip system.
S4. Cards already have the rainbow hover top-bar — keep. Consider a gentle staggered scroll-reveal (IntersectionObserver, reduced-motion-safe) shared with journal grid.

## Cross-cutting (the "system" of small moves)
X1. One **tinted chip component** used everywhere (journal categories, service categories, pronouns, add-on/inquire) — one CSS class family, tinted from brand palette at ~12% background / full-strength text, AA contrast checked.
X2. One **soft filter transition** shared by journal + services.
X3. One **scroll-reveal** utility (staggered 12px rise + fade, `prefers-reduced-motion: reduce` → off).
X4. Meta row normalization: date · author · read-time (journal), price · duration (services), role + pronoun pill (team).

## Findings — Service DETAIL pages (services/*.html — 27 pages, one template via services.css)
These pages use a night-sky (#0c0e1d) treatment with glassmorphism cards — distinct from the cream index pages. All fixes below are template-level: one services.css/content change covers all 27 pages.
SD1. **Category eyebrow fails contrast**: `.svc-cat` is teal #12736D on #0c0e1d (~2.4:1, fails AA). Fix: X1 chip in an on-dark variant, or brighten to the existing #52BCA3. CSS-only.
SD2. **Every Book CTA is generic**: all 27 `.svc-book-btn`s link to `booking.mangomint.com/814946` with no serviceId — yet the free-consultation link on the same pages proves per-service deep-links exist (`?serviceId=121`). Deep-link each page's CTA to its own service. Content fix, direct booking-conversion value.
SD3. **Provider cards missing pronouns + booking**: "Providers Offering This Service" cards show name/role only — no pronoun pill (brand continuity with T1) and no way to book with that provider even though staffId deep-links exist on team.html. Add pronoun pill + a "Book with {name}" affordance on hover/below.
SD4. **Related-card price oddballs**: same muted microcaps line as the index, including "$30 add-on" / "Email for pricing" posing as prices — apply the S1 chip system in an on-dark variant.
SD5 (flag). "Benefits of X" is a bolded paragraph inside the description wall — style as an eyebrow-style subheading for scannability.

## Findings — Bio pages (team/*.html — 21 pages)
BD1. **Credentials & awards buried in prose**: license numbers ("LMBT #19480") and awards ("Best Massage Therapist in Durham 2025", Indy Week runner-up) sit mid-paragraph where nobody sees them. Surface as small badges under the name: a license chip and an award chip (★). Trust signals, content+CSS.
BD2. **No specialties at a glance**: a reader must finish six paragraphs to learn Hayley's specialty is Ashiatsu. Add a specialty chip row (X1 chips) under the title, sourced from the provider's bookable services.
BD3. **Pronoun pill casing varies 10 ways** across the 21 pages (She/Her, She/her, she/her, They/she, Any/All…). Normalize lowercase — the page-level twin of T1.
BD4. **`.bio-svc` price microtext** → apply the S1 mini meta row (price leading, duration chip, Inquire/Add-on chips).
BD5 (flag). 7 of 21 bios have no hero Book button — mostly support staff, but "Castle Frame · CEO & Massage Therapist" is in that set. Decide the rule (bookable = button) and apply consistently.

## Findings — Journal posts (journal/*.html — 11 pages)
JD1. **No date in the article meta** (ties J1) — and read-times drift: the cupping post says "2 min read" while its index card says "4 min read". One source of truth.
JD2. **Heading hierarchy is chaotic**: section headings are h5s in two posts, h4s in one, h3s or h2s elsewhere; and mid-body statements are set as bare h2 callouts ("At Auroraflow we use dry-cupping as our preferred method."). Normalize sections to h2 and introduce a styled `.pullquote` (serif italic, rainbow left border) for callout lines.
JD3. **Rainbow reading-progress bar**: a 3px rainbow-gradient progress bar under the fixed nav that fills as you read — tiny JS, deeply on-brand (the rainbow-bar IS the site signature), reduced-motion-safe. The single most "modern" small move available on articles.
JD4. **`.article-tag` grey microtext** → X1 category chip (ties J3). Also a CSS bug: `.article-back` declares `display:inline-flex` then `display:block` in the same rule — the svg alignment is being re-patched inline per page.

Scale note: everything above is proposed template-level — services.css/shared.css carry all 27 service pages; bio and journal changes ship as one pattern plus a per-page content sweep (21 bios, 11 posts).

## Technical & performance (adopted from prior home-page audit doc, verified against repo)
P1. **Image weight is the single highest-leverage fix** on all three page groups: team.html serves multiple 2–2.7MB PNGs directly (several named `*.jpeg.pdf-*.png` — photos exported through a PDF, never optimized); services/journal use 1.8–2.9MB PNGs; repo max 3.7MB. Fix: WebP at rendered size (same process already applied to home page: −89% image weight there). Keep originals; og:image stays JPEG/PNG.
P2. **Adopt the fluid spacing tokens** `--space-section-y` / `--space-page-x` (defined in shared.css, underused): journal `60px 40px 80px`, team `64px 40px 100px`, services `48px 40px 100px` are all hardcoded — pointing them at the tokens unifies rhythm and tightens correctly on phones.
P3. **Headshot source normalization**: CSS crops uniformly (3/4), but sources range 400px–1600px and several went through PDF export; re-export clean, consistently sized headshots.
P4. **Journal post consistency**: ~10 hand-authored posts — verify heading hierarchy and byline treatment page-by-page during implementation.
Process context: a prior session did the equivalent pass on the home page (branch `design-audit-homepage`, uncommitted) with a Lighthouse ≥90 target measured against production; these three page groups are the queued follow-up.

## Mockup artifact requirements (hard constraints)
- Single self-contained HTML file. **Strict CSP: zero external requests** — no Google Fonts, no remote images. Approximate Poiret One with a fallback stack (e.g. `'Poiret One', 'Century Gothic', 'Futura', 'Optima', sans-serif` — it will render the fallback in the artifact; add a small footnote saying live site keeps Poiret One).
- Real photos are pre-downscaled as data URIs in `mockup-images.json` (same scratchpad dir) — keys: journal_featured, journal_cupping, journal_couples, journal_john, journal_castle, team_brandon, team_christine, team_castle, team_lydia, team_giules, team_omer, svc_therapeutic, svc_facial, svc_lymphatic, svc_ashiatsu, svc_exfoliation. Use them.
- Structure: intro summary → three page sections (Journal / Team & Bios / Services) → each proposal shown as **Before / After** side-by-side (stack on mobile) with a one-line rationale and an effort tag (e.g. "CSS-only", "small JS"). Interactive where it matters (filter transition demo, hover states, pronoun chips).
- The page itself renders on cream/light like the brand; must also be legible in the artifact viewer's dark theme (support `prefers-color-scheme: dark` + `:root[data-theme]` overrides at least for the page chrome around the mockups; the mockup panels themselves may stay brand-cream, framed like screenshots).
- Body must never scroll horizontally; wide comparisons scroll inside their own container.
- Keep total file weight reasonable (<900KB with images).
