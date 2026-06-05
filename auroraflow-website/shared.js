/* Auroraflow — shared client-side enhancements */
(function () {
  /* Inject decorative sparkles into every .page-hero (subpage header).
     Honors prefers-reduced-motion. */
  function injectSparkles(hero, positions, contentSelector) {
    if (hero.querySelector('.hero-sparkles')) return;
    const layer = document.createElement('div');
    layer.className = 'hero-sparkles';
    layer.setAttribute('aria-hidden', 'true');
    positions.forEach(([top, left, size, delay, twinkle]) => {
      const s = document.createElement('span');
      s.className = 'hero-sparkle';
      s.style.top    = top  + '%';
      s.style.left   = left + '%';
      s.style.width  = size + 'px';
      s.style.height = size + 'px';
      s.style.setProperty('--delay', delay + 's');
      s.style.setProperty('--twinkle', twinkle + 's');
      layer.appendChild(s);
    });
    const anchor = hero.querySelector(contentSelector);
    if (anchor) hero.insertBefore(layer, anchor); else hero.appendChild(layer);
  }

  function addSparkles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── Sub-page heroes (.page-hero) ── */
    /* Hand-tuned positions (top%, left%, size px, delay s, twinkle s) — avoids the
       center where the headline sits, clusters around the eyebrow + edges.
       Twinkle durations vary so sparkles never blink in unison. */
    const PAGE_HERO_POSITIONS = [
      [22, 14,  14, 0.55, 2.4],
      [34, 23,   8, 1.10, 3.1],
      [18, 78,  16, 0.70, 2.7],
      [42, 88,  10, 1.25, 3.6],
      [62, 12,  11, 1.40, 2.2],
      [70, 80,  13, 0.95, 2.9],
      [82, 30,   9, 1.55, 3.3],
      [78, 62,  12, 1.20, 2.5],
      [12, 48,   7, 1.65, 3.8],
      [55, 50,   6, 1.85, 2.1]
    ];
    document.querySelectorAll('.page-hero').forEach((hero) => {
      injectSparkles(hero, PAGE_HERO_POSITIONS, '.page-hero-content');
    });

    /* ── Home hero (.hero) — full-height aurora background ── */
    /* Positions avoid the centered text block (roughly 30–70% top, 20–80% left).
       Clustered toward edges, corners, and sky so they read like real stars. */
    const HOME_HERO_POSITIONS = [
      [ 7,  8,  16, 0.30, 2.5],
      [ 9, 42,  10, 0.80, 3.2],
      [11, 78,  14, 0.50, 2.8],
      [ 6, 90,  11, 1.10, 3.5],
      [14, 22,   8, 1.40, 2.2],
      [18, 62,  13, 0.65, 3.0],
      [25, 94,  10, 1.20, 2.6],
      [38,  4,  12, 0.90, 3.4],
      [50,  2,   8, 1.50, 2.3],
      [62,  6,  15, 0.70, 3.1],
      [75,  8,  10, 1.30, 2.7],
      [25, 96,  14, 0.45, 3.6],
      [50, 97,   9, 1.00, 2.4],
      [65, 93,  13, 1.60, 3.3],
      [80, 18,  16, 0.40, 2.9],
      [84, 52,   9, 1.05, 3.3],
      [87, 84,  12, 0.55, 2.4],
      [77, 70,  11, 1.65, 3.7],
      [72, 32,   8, 1.15, 2.8],
    ];
    document.querySelectorAll('section.hero').forEach((hero) => {
      injectSparkles(hero, HOME_HERO_POSITIONS, '.hero-content');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSparkles);
  } else {
    addSparkles();
  }
})();

// Star field dots for dark sections across all pages
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function injectStarDots(section) {
    if (section.querySelector('.sparkle-star')) return;
    const count = Math.min(Math.floor(section.offsetWidth * Math.max(section.offsetHeight, 200) / 7000), 55);
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle-star';
      const size = 0.8 + Math.random() * 2;
      s.style.cssText = [
        'left:'   + (Math.random() * 96 + 2) + '%',
        'top:'    + (Math.random() * 96 + 2) + '%',
        '--star-size:'    + size + 'px',
        '--star-opacity:' + (0.35 + Math.random() * 0.65),
        '--star-dur:'     + (2.5 + Math.random() * 4.5) + 's',
        '--star-delay:'   + (Math.random() * 6) + 's'
      ].join(';');
      section.appendChild(s);
    }
  }

  function addStarDots() {
    document.querySelectorAll('.page-hero, .schedule-section, .corp-form-section, .corp-intro, .corp-plans, .join-band, .values-section, .about-cta, .confirm-hero, .expect-section, .gift-band, .svc-details, .svc-providers-section, .svc-related').forEach(injectStarDots);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addStarDots);
  } else {
    addStarDots();
  }
})();
