/* Auroraflow — shared client-side enhancements */

/* ── Google Analytics (GA4) ──
   Loaded here so every page that includes shared.js is tracked with one
   snippet. Update GA_ID to change the measurement ID. */
(function () {
  var GA_ID = 'G-XSD2W9D1GB';
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
})();

/* ── GA4 conversion / interaction event tracking ──
   One delegated listener tracks the key off-site CTAs (all are <a> tags):
   booking, gift cards, phone, email, memberships. GA4 recommended event
   names are used where they exist so they map cleanly to Key Events. */
(function () {
  function svcName() {
    var el = document.querySelector('h1.svc-name') || document.querySelector('h1');
    return (el ? el.textContent : document.title).trim();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || typeof window.gtag !== 'function') return;
    var href = a.getAttribute('href') || '';

    if (href.indexOf('booking.mangomint.com') > -1) {
      gtag('event', 'generate_lead', {
        event_category: 'booking', service_name: svcName(), link_url: href
      });
    } else if (href.indexOf('gift-cards/814946') > -1) {
      gtag('event', 'gift_card_click', { event_category: 'gift_card', link_url: href });
    } else if (href.indexOf('membership') > -1) {
      gtag('event', 'begin_checkout', { event_category: 'membership', link_url: href });
    } else if (href.indexOf('tel:') === 0) {
      gtag('event', 'phone_click', { event_category: 'contact', link_url: href });
    } else if (href.indexOf('mailto:') === 0) {
      gtag('event', 'email_click', { event_category: 'contact', link_url: href });
    }
  }, true);

  /* True conversion: Mangomint returns guests to booking-complete.html */
  if (location.pathname.indexOf('booking-complete') > -1) {
    var fire = function () { if (typeof window.gtag === 'function') gtag('event', 'booking_complete', { event_category: 'booking' }); };
    if (document.readyState !== 'loading') fire();
    else document.addEventListener('DOMContentLoaded', fire);
  }
})();

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
    document.querySelectorAll('.page-hero, .schedule-section, .corp-form-section, .corp-intro, .corp-plans, .join-band, .values-section, .about-cta, .confirm-hero, .expect-section, .gift-band, .svc-hero, .svc-details, .svc-providers-section, .svc-related, .about, .announcements, .services-preview, .apply-section, .support-section, .policies-cta').forEach(injectStarDots);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addStarDots);
  } else {
    addStarDots();
  }
})();

// Mobile menu: night-sky stars, Programs grouping, body.menu-open sync
(function () {
  function enhanceMobileMenu() {
    const menu = document.querySelector('.nav-mobile-menu');
    if (!menu) return;

    /* group program pages under a small label so the long flat list reads
       as two calm clusters instead of nine equal items */
    const PROGRAM_HREFS = ['community-fund.html', 'pay-what-you-can.html', 'memberships.html', 'classes.html'];
    const links = Array.from(menu.querySelectorAll('a'));
    const programLinks = links.filter((a) => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      return PROGRAM_HREFS.includes(href);
    });
    if (programLinks.length && !menu.querySelector('.nav-mobile-group-label')) {
      const label = document.createElement('span');
      label.className = 'nav-mobile-group-label';
      label.textContent = 'Programs';
      menu.insertBefore(label, programLinks[0]);
      programLinks.forEach((a) => a.classList.add('nav-mobile-sub'));
    }

    /* sprinkle stars into the dark panel (skip for reduced motion) */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        !menu.querySelector('.sparkle-star')) {
      for (let i = 0; i < 26; i++) {
        const s = document.createElement('span');
        s.className = 'sparkle-star';
        s.style.cssText = [
          'left:'   + (Math.random() * 96 + 2) + '%',
          'top:'    + (Math.random() * 96 + 2) + '%',
          '--star-size:'    + (0.8 + Math.random() * 2) + 'px',
          '--star-opacity:' + (0.35 + Math.random() * 0.65),
          '--star-dur:'     + (2.5 + Math.random() * 4.5) + 's',
          '--star-delay:'   + (Math.random() * 6) + 's'
        ].join(';');
        menu.appendChild(s);
      }
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceMobileMenu);
  } else {
    enhanceMobileMenu();
  }
})();

/* ── Back-to-School gift card promo banner ──
   Site-wide bar above the nav: $50 off a $400 gift card, running through
   Aug 7, 2026. Self-expires — pages load it only while the local date is
   before HIDE_ON, so nothing needs to be removed when the promo ends.
   The fixed nav and all content clearance key off --nav-h, so while the
   banner is up we grow --nav-h by the banner's measured height and pin the
   nav just below the banner; everything else adjusts automatically. */
(function () {
  var HIDE_ON = new Date(2026, 7, 8); /* midnight Aug 8, 2026 local — last shown Aug 7 */
  if (new Date() >= HIDE_ON) return;

  var GIFT_URL = 'https://clients.mangomint.com/gift-cards/814946';

  function addPromoBanner() {
    if (document.querySelector('.promo-banner')) return;

    var style = document.createElement('style');
    style.textContent =
      '.promo-banner{position:fixed;top:0;left:0;right:0;z-index:210;' +
      'display:flex;align-items:center;justify-content:center;flex-wrap:wrap;' +
      'gap:4px 10px;padding:9px var(--space-page-x);box-sizing:border-box;' +
      'background:linear-gradient(100deg,var(--deep),var(--accent2));' +
      'color:var(--cream);text-decoration:none;text-align:center;' +
      'font-family:var(--sans);font-size:13.5px;font-weight:400;line-height:1.35;}' +
      '.promo-banner strong{font-weight:700;color:var(--accent);' +
      'letter-spacing:0.04em;text-transform:uppercase;font-size:12.5px;}' +
      '.promo-banner .promo-cta{font-weight:700;text-decoration:underline;' +
      'text-underline-offset:3px;white-space:nowrap;}' +
      '.promo-banner:hover .promo-cta{color:var(--accent);}' +
      'html.has-promo{--nav-base-h:72px;--nav-h:calc(var(--nav-base-h) + var(--promo-h,0px));}' +
      'html.has-promo nav{height:var(--nav-base-h);top:var(--promo-h,0px);}';
    document.head.appendChild(style);

    var banner = document.createElement('a');
    banner.className = 'promo-banner';
    banner.href = GIFT_URL;
    banner.target = '_blank';
    banner.rel = 'noopener';
    banner.innerHTML =
      '<strong>Back to School</strong>' +
      '<span>$50 off a $400 gift card — now through Aug&nbsp;7</span>' +
      '<span class="promo-cta">Get yours</span>';
    document.body.insertBefore(banner, document.body.firstChild);

    /* the bar can wrap to two lines on narrow screens, so measure the real
       height and push the nav/content down by exactly that much */
    var root = document.documentElement;
    function sync() {
      root.style.setProperty('--promo-h', banner.offsetHeight + 'px');
    }
    root.classList.add('has-promo');
    sync();
    window.addEventListener('resize', sync);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPromoBanner);
  } else {
    addPromoBanner();
  }
})();

/* ── Weekday Massage + Skin Care promo banner ──
   Site-wide bar above the nav: 20% off any skincare service booked same-day
   as a massage, Monday–Friday, through Oct 31, 2026. Unlike the immediate
   Back to School bar above, this one slides down 5s after the page loads so
   it doesn't compete with the hero on first paint, and stays up until
   dismissed (remembered for the browsing session) or the offer ends.
   "See more details" opens a modal with the full terms and a photo. */
(function () {
  var HIDE_ON = new Date(2026, 10, 1); /* midnight Nov 1, 2026 local — last shown Oct 31 */
  if (new Date() >= HIDE_ON) return;

  var DISMISS_KEY = 'wp-weekday-promo-dismissed';
  var BOOK_URL = 'https://booking.mangomint.com/814946';

  function sessionDismissed() {
    try { return !!sessionStorage.getItem(DISMISS_KEY); } catch (e) { return false; }
  }
  function rememberDismissed() {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch (e) {}
  }
  if (sessionDismissed()) return;

  function tagItem(text) {
    return '<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg><span>' + text + '</span></li>';
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
  }
  function openModal() {
    var modal = document.querySelector('.wp-modal-overlay') || buildModal();
    modal.classList.add('wp-open');
    document.addEventListener('keydown', onKey);
  }
  function closeModal() {
    var modal = document.querySelector('.wp-modal-overlay');
    if (!modal) return;
    modal.classList.remove('wp-open');
    document.removeEventListener('keydown', onKey);
  }
  function buildModal() {
    var overlay = document.createElement('div');
    overlay.className = 'wp-modal-overlay';
    overlay.innerHTML =
      '<div class="wp-modal" role="dialog" aria-modal="true" aria-labelledby="wp-modal-title">' +
        '<div class="wp-modal-img">' +
          '<img src="assets/img/svc-facial-treatments.webp" alt="Relaxing facial treatment at Auroraflow" loading="lazy">' +
          '<button type="button" class="wp-modal-close" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="wp-modal-body">' +
          '<span class="wp-modal-eyebrow">Weekday Special</span>' +
          '<h2 id="wp-modal-title">Weekday Massage + Skin Care</h2>' +
          '<div class="wp-modal-code"><span>Promo code</span><strong>ADDSKIN20</strong></div>' +
          '<p>20% off any skincare service booked same-day with a massage.</p>' +
          '<ul class="wp-modal-tags">' +
            tagItem('Mon–Fri only') +
            tagItem('Skincare service only') +
            tagItem('Same-day booking') +
          '</ul>' +
          '<p class="wp-modal-expiry">Ends October 31, 2026.</p>' +
          '<a class="wp-modal-cta" href="' + BOOK_URL + '" target="_blank" rel="noopener">Book Now</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.wp-modal-close').addEventListener('click', closeModal);
    return overlay;
  }

  function addWeekdayPromo() {
    if (document.querySelector('.weekday-promo-banner')) return;

    var banner = document.createElement('div');
    banner.className = 'weekday-promo-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Weekday promotion');
    banner.innerHTML =
      '<strong>Weekday Special</strong>' +
      '<span>20% off any skincare service booked same-day with a massage — Mon–Fri</span>' +
      '<button type="button" class="wp-details-btn">See more details</button>' +
      '<button type="button" class="wp-close" aria-label="Dismiss weekday promotion">×</button>';
    document.body.insertBefore(banner, document.body.firstChild);

    var root = document.documentElement;
    function sync() {
      root.style.setProperty('--promo-h', banner.offsetHeight + 'px');
    }
    function dismiss() {
      banner.classList.remove('wp-visible');
      window.setTimeout(function () {
        root.classList.remove('has-promo');
        root.style.setProperty('--promo-h', '0px');
      }, 600);
      rememberDismissed();
    }

    banner.querySelector('.wp-close').addEventListener('click', dismiss);
    banner.querySelector('.wp-details-btn').addEventListener('click', openModal);

    window.setTimeout(function () {
      if (sessionDismissed()) return;
      root.classList.add('has-promo');
      banner.classList.add('wp-visible');
      sync();
      window.addEventListener('resize', sync);
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWeekdayPromo);
  } else {
    addWeekdayPromo();
  }
})();

// Gift card buttons — desktop pill beside Book Now, mobile icon beside the calendar
(function () {
  var GIFT_URL = 'https://clients.mangomint.com/gift-cards/814946';
  var GIFT_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="20 12 20 22 4 22 4 12"/>' +
    '<rect x="2" y="7" width="20" height="5"/>' +
    '<line x1="12" y1="22" x2="12" y2="7"/>' +
    '<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>' +
    '<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>' +
    '</svg>';

  function addGiftButtons() {
    /* desktop: ghost pill in the nav links, just before Book Now */
    var bookLi = document.querySelector('.nav-links a.btn-book');
    if (bookLi && !document.querySelector('.nav-links .btn-gift')) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'btn-gift';
      a.href = GIFT_URL;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = GIFT_SVG + '<span>Gift Cards</span>';
      li.appendChild(a);
      bookLi.parentElement.parentElement.insertBefore(li, bookLi.parentElement);
    }
    /* mobile: gift icon circle beside the calendar button */
    var bookMobile = document.querySelector('.nav-book-mobile');
    if (bookMobile && !document.querySelector('.nav-gift-mobile')) {
      var wrap = document.createElement('div');
      wrap.className = 'nav-mobile-actions';
      bookMobile.parentElement.insertBefore(wrap, bookMobile);
      var g = document.createElement('a');
      g.className = 'nav-gift-mobile';
      g.href = GIFT_URL;
      g.target = '_blank';
      g.rel = 'noopener';
      g.setAttribute('aria-label', 'Gift Cards');
      g.innerHTML = GIFT_SVG;
      wrap.appendChild(g);
      wrap.appendChild(bookMobile);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGiftButtons);
  } else {
    addGiftButtons();
  }
})();


/* ── DESIGN AUDIT: scroll reveal (X3) + article reading progress (JD3) ── */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    var grids = document.querySelectorAll('.reveal-grid');
    if (!grids.length || reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');
    grids.forEach(function (grid) {
      var kids = Array.prototype.slice.call(grid.children);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = kids.indexOf(en.target);
          en.target.style.transitionDelay = (i % 3) * 80 + 'ms';
          en.target.classList.add('revealed');
          io.unobserve(en.target);
        });
      }, { threshold: 0.12, rootMargin: '10000px 0px -5% 0px' });
      kids.forEach(function (k) { io.observe(k); });
    });
  }

  function initProgress() {
    var article = document.querySelector('.article-body');
    if (!article || reduce) return;
    var bar = document.createElement('div');
    bar.className = 'article-progress';
    bar.setAttribute('aria-hidden', 'true');
    var fill = document.createElement('span');
    bar.appendChild(fill);
    document.body.appendChild(bar);
    function update() {
      var rect = article.getBoundingClientRect();
      var top = rect.top + window.scrollY - window.innerHeight * 0.6;
      var end = rect.top + window.scrollY + rect.height - window.innerHeight * 0.6;
      var p = (window.scrollY - top) / Math.max(1, end - top);
      fill.style.width = Math.min(100, Math.max(0, p * 100)) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function init() { initReveal(); initProgress(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
