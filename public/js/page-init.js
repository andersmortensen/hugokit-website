/* ==========================================================================
   HugoKit page-init
   Init-funktioner for elementer inde i <main>. Genkøres efter SPA-navigation.
   Hver init returnerer en cleanup-funktion så vi kan disconnecte observers
   og fjerne vindues-listeners før re-init.
   ========================================================================== */

(function () {
  'use strict';

  window.HugoKit = window.HugoKit || {};

  // ── FAQ toggle ────────────────────────────────────────────────────────
  function initFaq() {
    var handlers = [];
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      function onClick() {
        var item = btn.closest('.faq-item');
        if (!item) return;
        var isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      btn.addEventListener('click', onClick);
      handlers.push({ el: btn, fn: onClick });
    });
    return function cleanup() {
      handlers.forEach(function (h) { h.el.removeEventListener('click', h.fn); });
    };
  }

  // ── "What is Hugo?" modal ────────────────────────────────────────────
  function initExplainer() {
    var modal = document.getElementById('hugo-explainer-modal');
    var closeBtn = document.getElementById('hugo-explainer-close');
    if (!modal) return function () {};

    function onClose() { modal.classList.remove('open'); }
    function onBackdrop(e) { if (e.target === modal) modal.classList.remove('open'); }

    if (closeBtn) closeBtn.addEventListener('click', onClose);
    modal.addEventListener('click', onBackdrop);

    return function cleanup() {
      openBtn.removeEventListener('click', onOpen);
      if (closeBtn) closeBtn.removeEventListener('click', onClose);
      modal.removeEventListener('click', onBackdrop);
    };
  }

  // ── Scroll reveal for .showcase-row ──────────────────────────────────
  function initShowcaseReveal() {
    var rows = document.querySelectorAll('.showcase-row');
    if (!rows.length) return function () {};

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rows.forEach(function (r) { r.classList.add('revealed'); });
      return function () {};
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

    rows.forEach(function (row) { observer.observe(row); });
    return function cleanup() { observer.disconnect(); };
  }

  // ── Generic [data-reveal] scroll animation ─────────────────────────────
  // Any element with data-reveal gets a smooth fade-up on scroll into view.
  // data-reveal-delay="1" adds 150ms stagger, "2" adds 300ms, etc.
  function initDataReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return function () {};

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('revealed'); });
      return function () {};
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

    items.forEach(function (el) { observer.observe(el); });
    return function cleanup() { observer.disconnect(); };
  }

  // ── Navbar: highlight active feature pill on scroll ──────────────────
  function initFeaturePillsScrollSpy() {
    var SITE_NAV = { home: 1, features: 1, 'whats-new': 1 };
    var scrollPills = [];
    document.querySelectorAll('.nav-feat-pill').forEach(function (pill) {
      var target = pill.getAttribute('data-target');
      if (SITE_NAV[target]) return;
      var el = document.getElementById(target);
      if (el) scrollPills.push({ id: target, el: el, pill: pill });
    });
    if (!scrollPills.length) return function () {};

    scrollPills.sort(function (a, b) {
      var pos = a.el.compareDocumentPosition(b.el);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    var intersecting = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) intersecting.add(entry.target.id);
        else intersecting.delete(entry.target.id);
      });
      var activeId = null;
      for (var i = 0; i < scrollPills.length; i++) {
        if (intersecting.has(scrollPills[i].id)) { activeId = scrollPills[i].id; break; }
      }
      scrollPills.forEach(function (sp) {
        sp.pill.classList.toggle('active', sp.id === activeId);
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

    scrollPills.forEach(function (sp) { observer.observe(sp.el); });
    return function cleanup() { observer.disconnect(); };
  }

  // ── Navbar top-level active state (Home / Docs / What's new) ─────────
  // Replikerer Hugo-template-logikken: navbar-partial'en udskiftes ikke
  // ved SPA-swap, så vi må sætte .active-klassen ud fra location.pathname.
  // initHomepageHomeFeatures() kører efter denne og tager over med
  // scroll-baseret toggle på forsiden.
  function initNavbarActiveState() {
    var path = location.pathname;
    var isHome = path === '/' || path === '';
    var firstSegment = path.replace(/^\/+/, '').split('/')[0];
    var updatesSections = ['whats-new', 'blog', 'changelog'];
    var onUpdates = updatesSections.indexOf(firstSegment) !== -1;
    var onDocs = firstSegment === 'docs';

    document.querySelectorAll('.nav-feat-pill').forEach(function (pill) {
      var target = pill.getAttribute('data-target');
      if (target === 'home') {
        pill.classList.toggle('active', isHome);
      } else if (target === 'whats-new') {
        pill.classList.toggle('active', onUpdates);
      } else if (target === 'docs') {
        pill.classList.toggle('active', onDocs);
      } else if (target === 'features' || target === 'faq') {
        if (!isHome) pill.classList.remove('active');
      }
    });

    return function () {};
  }

  // ── Nav-pill active state + scroll-spy ─────────────────────────────
  // Queries DOM fresh each call — safe for SPA navigation where the
  // navbar HTML persists but the page content swaps.
  var _navPillSpyObs = null;
  function initNavPillActiveState() {
    // Tear down any previous scroll-spy
    if (_navPillSpyObs) { _navPillSpyObs.disconnect(); _navPillSpyObs = null; }

    var pill = document.getElementById('navPill');
    if (!pill) return function () {};

    var links = Array.prototype.slice.call(pill.querySelectorAll('.nav-pill-link[data-section]'));
    if (!links.length) return function () {};

    var path = location.pathname;
    var isHome = path === '/' || path === '';
    var firstSegment = path.replace(/^\/+/, '').split('/')[0];

    // Clear all active states
    links.forEach(function (l) { l.classList.remove('is-active'); });

    if (!isHome) {
      // Standalone page — set active from pathname
      var activeSection = null;
      if (firstSegment === 'docs') activeSection = 'docs';
      else if (['whats-new', 'blog', 'changelog'].indexOf(firstSegment) !== -1) activeSection = 'whats-new';

      if (activeSection) {
        links.forEach(function (l) {
          if (l.getAttribute('data-section') === activeSection) {
            l.classList.add('is-active');
          }
        });
      }
      return function () {};
    }

    // Homepage: scroll-spy for sections
    var sections = [];
    links.forEach(function (link) {
      var sectionId = link.getAttribute('data-section');
      var el = document.getElementById(sectionId);
      if (el) sections.push({ el: el, link: link, id: sectionId });
    });
    if (!sections.length) return function () {};

    var activeLink = null;
    function setActive(link) {
      if (activeLink === link) return;
      if (activeLink) activeLink.classList.remove('is-active');
      if (link) link.classList.add('is-active');
      activeLink = link;
    }

    // Immediate check: which section is currently in the viewport?
    // IntersectionObserver only fires on *changes*, so without this
    // initial pass, nothing would be highlighted until the user scrolls.
    var rootMarginTop = 0.20;   // matches observer rootMargin '-20% 0px -60% 0px'
    var rootMarginBot = 0.60;
    var vpTop = window.innerHeight * rootMarginTop;
    var vpBot = window.innerHeight * (1 - rootMarginBot);
    for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].el.getBoundingClientRect();
      if (rect.top < vpBot && rect.bottom > vpTop) {
        setActive(sections[i].link);
        break;
      }
    }

    _navPillSpyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (s) { return s.el === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          setActive(match.link);
        } else if (match.link === activeLink) {
          setActive(null);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (s) { _navPillSpyObs.observe(s.el); });
    return function cleanup() {
      if (_navPillSpyObs) { _navPillSpyObs.disconnect(); _navPillSpyObs = null; }
    };
  }

  // ── Homepage Home/Features active toggle ─────────────────────────────
  function initHomepageHomeFeatures() {
    var homePill = document.querySelector('.nav-feat-pill[data-target="home"]');
    var featuresPill = document.querySelector('.nav-feat-pill[data-target="features"]');
    if (!homePill || !featuresPill) return function () {};

    var zoneIds = ['features', 'feat-server', 'feat-content', 'feat-config', 'feat-deploy', 'feat-themes', 'feat-multisite'];
    var zones = zoneIds
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    if (!zones.length) {
      /* Ikke på homepage — sørg for pills har korrekt default */
      homePill.classList.remove('active');
      featuresPill.classList.remove('active');
      return function () {};
    }

    var intersecting = new Set();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) intersecting.add(entry.target.id);
        else intersecting.delete(entry.target.id);
      });
      var featuresActive = intersecting.size > 0;
      featuresPill.classList.toggle('active', featuresActive);
      homePill.classList.toggle('active', !featuresActive);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

    zones.forEach(function (z) { obs.observe(z); });
    return function cleanup() { obs.disconnect(); };
  }

  // ── Homepage Features sub-nav visibility ─────────────────────────────
  function initSubnavVisibility() {
    var subnav = document.getElementById('navbar-subnav');
    var showcases = document.getElementById('showcases');
    if (!subnav || !showcases) {
      /* Ikke på homepage — skjul subnav */
      if (subnav) {
        subnav.classList.remove('is-visible');
        subnav.setAttribute('aria-hidden', 'true');
      }
      return function () {};
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        subnav.classList.toggle('is-visible', entry.isIntersecting);
        subnav.setAttribute('aria-hidden', entry.isIntersecting ? 'false' : 'true');
      });
    }, { rootMargin: '-5% 0px -10% 0px', threshold: 0 });

    obs.observe(showcases);
    return function cleanup() { obs.disconnect(); };
  }

  // ── Dynamic browser theme-color (Playdate-style) ─────────────────────
  function initThemeColorTracker() {
    var COLORS = {
      peach:   { light: '#F4DCC5', dark: '#3d2d1d' },
      warm:    { light: '#FAF0E6', dark: '#1c1b18' },
      // Pale mint / deep forest — matches the top of the .docs-page and
      // .docs-reference gradients so the body bg bleeds through into
      // whitespace and extends the atmospheric tint across the whole page.
      cool:    { light: '#e8f5ef', dark: '#1a2d22' },
      neutral: { light: '#f2f6f3', dark: '#161718' },

      // ── Per-feature tints ──────────────────────────────────────────────
      // Subtle pastels afledt af hver features icon-accent. To ekstra
      // toner (blush + plum) er introduceret så alle 6 features får sin
      // egen farve — feat-themes og feat-multisite brugte samme icon som
      // hhv. server og content. Mætningsniveauet matcher 'cool' (~5-8%)
      // så tintene er tydelige uden at dominere indholdet.
      'feat-server':    { light: '#e7efe6', dark: '#1e241d' }, // moss
      'feat-content':   { light: '#e4eaef', dark: '#1d2226' }, // steel
      'feat-config':    { light: '#f2ecdc', dark: '#2a241a' }, // sand
      'feat-deploy':    { light: '#f6e5d7', dark: '#2a1e13' }, // rust
      'feat-themes':    { light: '#f2e4e4', dark: '#281b1c' }, // blush
      'feat-multisite': { light: '#ebe7ef', dark: '#201f2a' }  // plum
    };

    function isDark() {
      return document.documentElement.classList.contains('dark-active');
    }

    /* Sørg for at præcis én JS-styret meta findes */
    var existing = document.head.querySelectorAll('meta[name="theme-color"]');
    var meta;
    if (existing.length === 1 && !existing[0].hasAttribute('media')) {
      meta = existing[0];
    } else {
      existing.forEach(function (m) { m.remove(); });
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    var zones = Array.prototype.slice.call(
      document.querySelectorAll('[data-theme-color]')
    );
    var currentMode = null;

    function resolveMode() {
      // During rubber-band overscroll at the top of the page (macOS/iOS),
      // scrollY can go negative and the first zone's bounding rect gets
      // pushed down — so rect.top > 0 and the "crosses viewport top" test
      // fails, momentarily flipping mode to 'neutral'. That caused a visible
      // bg-color seam (peach hero over cool-mint body) while bouncing.
      // Short-circuit: at/above scrollY = 0, the *first* zone's colour is
      // always what the user should see, regardless of where its rect sits.
      if (window.scrollY <= 0 && zones.length) {
        return zones[0].getAttribute('data-theme-color') || 'neutral';
      }

      var mode = 'neutral';
      for (var i = 0; i < zones.length; i++) {
        var rect = zones[i].getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          mode = zones[i].getAttribute('data-theme-color') || 'neutral';
        }
      }
      return mode;
    }

    function update() {
      var mode = resolveMode();
      if (mode === currentMode) return;
      currentMode = mode;
      // Defensiv fallback: hvis et data-theme-color ikke matcher en kendt
      // entry i COLORS (fx fordi man har glemt at registrere et nyt tema),
      // falder vi tilbage til 'neutral' i stedet for at crashe.
      var entry = COLORS[mode] || COLORS.neutral;
      var color = entry[isDark() ? 'dark' : 'light'];
      meta.content = color;
      // Only body bg follows the scrolled-into zone. <html>'s bg is kept
      // CSS-controlled (= page-start color via [data-page-start]) so
      // rubber-band overscroll always shows the first/last section's
      // colour rather than a stale mid-page tint.
      document.body.style.backgroundColor = color;
    }

    function forceUpdate() {
      currentMode = null;
      update();
    }

    var mo = new MutationObserver(forceUpdate);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();

    return function cleanup() {
      mo.disconnect();
      window.removeEventListener('scroll', onScroll, { passive: true });
      window.removeEventListener('resize', update);
    };
  }

  // ── Hero Splash Animation ─────────────────────────────────────────────
  // Injects an SVG that constructs the H4-mark directly from the dot grid.
  //
  // Alignment principle:
  //   The dot-grid lives INSIDE the SVG as individual <circle> elements —
  //   not a CSS background. All 5 hex centres and every vertex sit exactly
  //   on grid intersections (multiples of GS=20 in SVG user-space).
  //   Vertex- and center-dots are grid-dots themselves, just with extra
  //   classes so they can animate (pulse, glow) as the mark forms.
  //   Because the grid is part of the SVG, alignment is guaranteed —
  //   no dependency on body bg alignment or viewport math.
  //
  // Sequence (reflecting the v2 mockup, 4.5s total):
  //   0.0–0.8s   All grid dots fade in (staggered)
  //   1.0–1.6s   5 center-dots pulse to rust
  //   1.3–3.8s   Guide lines flash
  //   1.6–2.8s   Spokes draw from centre → vertex
  //   2.4–3.0s   Vertex dots flare bright as spokes land
  //   2.3–3.5s   Hex outlines trace
  //   3.5–4.5s   Spokes + guides fade, hex fills land
  //   4.5–5.2s   Wordmark + tagline rise
  function initHeroSplash() {
    var container = document.getElementById('hero-splash');
    if (!container) return function () {};

    // ── Dynamic viewBox (matches container — 1:1 with CSS pixels) ─────
    // Ved at sætte viewBox = containerens pixel-size slipper vi for
    // preserveAspectRatio-skalering: 1 SVG-unit = 1 CSS-pixel, og GS=20
    // matcher body's CSS dot-grid direkte.
    //
    // Hex-geometri matcher brand-mark (partials/brand-mark.html):
    //   brand: half-width 24, half-height 28, mid-y-offset 14  → ratio 6:7
    //   scaled til R_V=40 (top/bot vertices grid-aligned):
    //     R_H = 40 × 24/28 ≈ 34.29  (horizontal, off-grid men korrekt)
    //     MID_OFF = 40 × 14/28 = 20 (mid-vertex y-offset, on-grid)
    //   → individuelle hexes har rigtige pointy-top-proportioner (høj > bred)
    //
    // Note: Venstre/højre vertices (R_H) ligger OFF-grid — det er en bevidst
    // tradeoff så hex-form matcher brand-marken. De tegnes som separate
    // accent-circles i .splash-vertices-gruppen; baggrundsgriddet er fortsat
    // klassisk 20px prik-papir (matcher body's dot-grid).
    var GS      = 20;              // grid step (matcher body's dot-grid)
    var R_V     = 40;              // vertical half-height (2×GS, grid-aligned)
    var R_H     = 40 * 24 / 28;    // horizontal half-width (off-grid, brand-ratio)
    var MID_OFF = R_V / 2;         // mid-vertex y-offset = 20 (1×GS, on-grid)
    var CX_OFF  = 80;              // 4 × GS — horizontal cluster spread
    var CY_OFF  = 60;              // 3 × GS — vertical cluster spread

    // Snap helper: nearest (10 + 20·k) — matcher body's CSS dot-grid
    // hvor radial-gradient centre sidder midt i hvert 20×20 tile → (10,10).
    function snap(v) { return Math.round((v - 10) / GS) * GS + 10; }

    // Disse beregnes på hvert build() (dynamisk baseret på container).
    var VB_W, VB_H, MID_X, MID_Y, WM_Y;

    function measure() {
      VB_W = Math.max(container.clientWidth,  320);
      VB_H = Math.max(container.clientHeight, 480);
      MID_X = snap(VB_W / 2);
      // Hex-cluster placeres ca. 36% nede i hero — logo lever over headline
      // med tilstrækkelig luft til den centrerede tekst nedenunder.
      MID_Y = snap(VB_H * 0.36);
      WM_Y  = MID_Y + 160;   // 8 × GS under MID_Y (tæt under logo)
    }

    // ── Geometry helpers ───────────────────────────────────────────────

    // Proper pointy-top hex matching brand-mark (ratio 6:7).
    // Top/bot vertices on grid; left/right vertices off grid men visuelt
    // korrekt — de tegnes som separate accent-dots (ikke grid-dots).
    function hexVerts(cx, cy) {
      return [
        [cx,          cy - R_V     ],  // top
        [cx + R_H,    cy - MID_OFF ],  // upper-right
        [cx + R_H,    cy + MID_OFF ],  // lower-right
        [cx,          cy + R_V     ],  // bottom
        [cx - R_H,    cy + MID_OFF ],  // lower-left
        [cx - R_H,    cy - MID_OFF ]   // upper-left
      ];
    }

    function ptStr(verts) {
      return verts.map(function (p) {
        return Math.round(p[0]) + ',' + Math.round(p[1]);
      }).join(' ');
    }

    // ── SVG builder ────────────────────────────────────────────────────
    function build() {
      measure();
      container.innerHTML = '';

      // 5-hex H4 arrangement (all centres on 20px grid)
      var HEXES = [
        { cx: MID_X - CX_OFF, cy: MID_Y - CY_OFF, i: 0 }, // TL
        { cx: MID_X + CX_OFF, cy: MID_Y - CY_OFF, i: 1 }, // TR
        { cx: MID_X,          cy: MID_Y,           i: 2 }, // MID
        { cx: MID_X - CX_OFF, cy: MID_Y + CY_OFF, i: 3 }, // BL
        { cx: MID_X + CX_OFF, cy: MID_Y + CY_OFF, i: 4 }  // BR
      ];

      // ── Create SVG ──────────────────────────────────────────────────
      var NS  = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'splash');
      svg.setAttribute('viewBox', '0 0 ' + VB_W + ' ' + VB_H);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      function el(tag, attrs, cssVars) {
        var e = document.createElementNS(NS, tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (cssVars) {
          for (var v in cssVars) e.style.setProperty('--' + v, cssVars[v]);
        }
        return e;
      }

      // NOTE: Dot-griddet lever i body's CSS background (radial-gradient),
      // ikke som SVG-circles. Hero har transparent baggrund så body-griddet
      // slår igennem. Dermed er dots ét permanent papir-lag — ikke en del af
      // nogen animation — og første synlige animation i hero er at stregerne
      // tegnes. (Tidligere lå grid-dots som ~1377 <circle>-elementer her; det
      // gjorde at container-fade-in visuelt læste som "prikker kommer først".)

      // ── Vertex accent-dots (off-grid, proper brand-ratio hexes) ─────
      // Hver hex's 6 vertices tegnes som små accent-circles der glow'er når
      // spokes lander. De starter INVISIBLE (opacity 0) og fader ind med
      // glow — så de heller ikke er synlige før stregerne begynder at komme.
      var vertexG = document.createElementNS(NS, 'g');
      vertexG.setAttribute('class', 'splash-vertices');
      HEXES.forEach(function (h, hi) {
        hexVerts(h.cx, h.cy).forEach(function (v, vi) {
          vertexG.appendChild(el('circle', {
            cx: Math.round(v[0]), cy: Math.round(v[1]), r: '1',
            class: 'splash-vertex-dot'
          }, { hi: hi, vi: vi }));
        });
      });
      svg.appendChild(vertexG);

      // ── Guide lines (brief horizontal + vertical construction flash) ─
      var guideG = document.createElementNS(NS, 'g');
      guideG.setAttribute('class', 'splash-guides');
      // horizontal line through mid-row and outer rows
      [MID_Y - CY_OFF, MID_Y, MID_Y + CY_OFF].forEach(function (gy) {
        guideG.appendChild(el('line', {
          x1: MID_X - CX_OFF - R_H, y1: gy,
          x2: MID_X + CX_OFF + R_H, y2: gy,
          class: 'splash-guide'
        }));
      });
      // vertical line through centre column
      guideG.appendChild(el('line', {
        x1: MID_X, y1: MID_Y - CY_OFF - R_V,
        x2: MID_X, y2: MID_Y + CY_OFF + R_V,
        class: 'splash-guide'
      }));
      svg.appendChild(guideG);

      // ── Spokes (centre → each vertex) ────────────────────────────────
      var spokeG = document.createElementNS(NS, 'g');
      HEXES.forEach(function (h, hi) {
        hexVerts(h.cx, h.cy).forEach(function (v, vi) {
          var len = Math.hypot(v[0] - h.cx, v[1] - h.cy).toFixed(2);
          spokeG.appendChild(el('line', {
            x1: h.cx, y1: h.cy,
            x2: Math.round(v[0]), y2: Math.round(v[1]),
            class: 'splash-spoke'
          }, { len: len, hi: hi, vi: vi }));
        });
      });
      svg.appendChild(spokeG);

      // ── Hex outlines ─────────────────────────────────────────────────
      var outG = document.createElementNS(NS, 'g');
      HEXES.forEach(function (h, hi) {
        outG.appendChild(el('polygon', {
          points: ptStr(hexVerts(h.cx, h.cy)),
          class: 'splash-hex-out'
        }, { hi: hi }));
      });
      svg.appendChild(outG);

      // ── Hex fills ────────────────────────────────────────────────────
      var fillG = document.createElementNS(NS, 'g');
      HEXES.forEach(function (h, hi) {
        fillG.appendChild(el('polygon', {
          points: ptStr(hexVerts(h.cx, h.cy)),
          class: 'splash-hex-fill'
        }, { hi: hi }));
      });
      svg.appendChild(fillG);

      // ── Wordmark (lockup-spec: kun mark + wordmark, ingen tagline) ───
      var wmG = document.createElementNS(NS, 'g');
      wmG.setAttribute('class', 'splash-wm');
      wmG.setAttribute('transform', 'translate(' + MID_X + ', ' + WM_Y + ')');

      var wm = document.createElementNS(NS, 'text');
      wm.setAttribute('class', 'splash-wordmark');
      wm.setAttribute('text-anchor', 'middle');
      wm.setAttribute('font-size', '36');
      wm.setAttribute('y', '0');
      wm.textContent = 'HugoKit';
      wmG.appendChild(wm);

      svg.appendChild(wmG);

      container.appendChild(svg);
    }

    // ── Trigger: wait for is-splashing to clear (first load) ──────────
    // On SPA navigation the class is already gone; build immediately.
    var html = document.documentElement;
    var mo   = null;

    if (!html.classList.contains('is-splashing')) {
      build();
    } else {
      mo = new MutationObserver(function () {
        if (!html.classList.contains('is-splashing')) {
          mo.disconnect();
          mo = null;
          build();
        }
      });
      mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    }

    // ── Resize handler (debounced) ────────────────────────────────────
    // Rebuild når viewport skifter markant, så dot-griddet fortsat udfylder
    // hele hero. Kun efter initial animation har lagt sig, så vi ikke
    // resetter keyframes mid-animation.
    var resizeTO = null;
    var lastW = 0, lastH = 0;
    function onResize() {
      if (resizeTO) clearTimeout(resizeTO);
      resizeTO = setTimeout(function () {
        var w = container.clientWidth;
        var h = container.clientHeight;
        // Skip small deltas (scrollbar appearing etc.)
        if (Math.abs(w - lastW) < 20 && Math.abs(h - lastH) < 20) return;
        lastW = w; lastH = h;
        build();
      }, 220);
    }
    window.addEventListener('resize', onResize);
    lastW = container.clientWidth;
    lastH = container.clientHeight;

    return function cleanup() {
      if (mo) { mo.disconnect(); mo = null; }
      if (resizeTO) { clearTimeout(resizeTO); resizeTO = null; }
      window.removeEventListener('resize', onResize);
    };
  }

  // ── Feature modals ────────────────────────────────────────────────────
  var FEATURE_DATA = {
    multisite: {
      title: 'Multi-site management',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'Sidebar with multiple sites',
      body: '<p>Every Hugo site you add gets its own entry in the sidebar — complete with <strong>isolated server state, configuration, and deploy settings</strong>. Nothing bleeds between projects.</p><p>Drag folders into HugoKit or use the "Add Site" button to register a project. Each site remembers its last server port, draft toggle, theme, and deploy target independently.</p><div class="feature-modal-details"><span class="feature-modal-tag">Drag & drop</span><span class="feature-modal-tag">Per-site state</span><span class="feature-modal-tag">Status grouping</span><span class="feature-modal-tag">Reorderable</span></div>'
    },
    server: {
      title: 'One-click server',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'Server controls with live log output',
      body: '<p>Hit <strong>Start</strong> and HugoKit launches <code>hugo server</code> with your chosen flags. Live log output streams directly into the app — no terminal window needed.</p><p>Toggle drafts, future-dated content, and expired content with switches. Port assignment is automatic so multiple sites can run simultaneously without conflicts.</p><div class="feature-modal-details"><span class="feature-modal-tag">Live logs</span><span class="feature-modal-tag">Auto-port</span><span class="feature-modal-tag">Draft toggle</span><span class="feature-modal-tag">⌘↩ / ⌘.</span></div>'
    },
    deploy: {
      title: 'Deploy to GitHub Pages',
      iconBg: 'var(--clay-soft)', iconColor: 'var(--clay)',
      illustration: 'Deploy pipeline: OAuth → Actions → Live',
      body: '<p>HugoKit handles the <strong>entire GitHub Pages pipeline</strong> from within the app. Authenticate via GitHub\'s OAuth Device Flow — no tokens to paste.</p><p>On first deploy, HugoKit generates a GitHub Actions workflow, patches subpath references, and runs preflight validation. Credentials stored securely in the <strong>macOS Keychain</strong>.</p><div class="feature-modal-details"><span class="feature-modal-tag">GitHub OAuth</span><span class="feature-modal-tag">Actions workflow</span><span class="feature-modal-tag">Preflight check</span><span class="feature-modal-tag">Keychain storage</span></div>'
    },
    config: {
      title: 'Easy config editor',
      iconBg: 'var(--clay-soft)', iconColor: 'var(--clay)',
      illustration: 'Form view ↔ raw text editor with diff',
      body: '<p>Open your <strong>hugo.toml</strong>, <strong>hugo.yaml</strong>, or <strong>hugo.json</strong> in a structured form view that groups settings by category.</p><p>Toggle between form and raw text mode at any time. Before saving, HugoKit shows a diff of exactly what changed — so you never accidentally break your site.</p><div class="feature-modal-details"><span class="feature-modal-tag">TOML / YAML / JSON</span><span class="feature-modal-tag">Form view</span><span class="feature-modal-tag">Save diff</span><span class="feature-modal-tag">Validation</span></div>'
    },
    autodetect: {
      title: 'Auto-detect Hugo',
      iconBg: 'var(--clay-soft)', iconColor: 'var(--clay)',
      illustration: 'Hugo binary detection flow',
      body: '<p>When you first launch HugoKit, it scans your system for an existing Hugo installation — checking <strong>Homebrew, direct installs, and custom paths</strong>.</p><p>If Hugo isn\'t installed, HugoKit walks you through a one-click install. HugoKit also monitors for version changes and shows a changelog diff.</p><div class="feature-modal-details"><span class="feature-modal-tag">Homebrew</span><span class="feature-modal-tag">Direct download</span><span class="feature-modal-tag">Custom path</span><span class="feature-modal-tag">Version tracking</span></div>'
    },
    themes: {
      title: 'Theme gallery',
      iconBg: 'var(--clay-soft)', iconColor: 'var(--clay)',
      illustration: 'Theme browser with preview cards',
      body: '<p>Browse the full <strong>themes.gohugo.io</strong> catalogue directly inside HugoKit. Each theme shows a live preview screenshot, feature tags, and a quick-install button.</p><p>When you install a theme, HugoKit handles the Git submodule setup, patches your config, and restarts the server so you see results immediately.</p><div class="feature-modal-details"><span class="feature-modal-tag">themes.gohugo.io</span><span class="feature-modal-tag">Live preview</span><span class="feature-modal-tag">One-click install</span><span class="feature-modal-tag">Git submodule</span></div>'
    },
    overview: {
      title: 'Content overview',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'Site overview with page counts and health indicators',
      body: '<p>See your entire site at a glance: <strong>total pages, word count, drafts, future-dated posts, and expired content</strong> — all updated in real time.</p><p>The front matter health report scans every content file and flags issues: missing titles, invalid dates, orphaned taxonomies, and duplicate slugs.</p><div class="feature-modal-details"><span class="feature-modal-tag">Real-time</span><span class="feature-modal-tag">Health report</span><span class="feature-modal-tag">Section filter</span><span class="feature-modal-tag">CSV export</span></div>'
    },
    reference: {
      title: 'Built-in Hugo reference',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'Searchable reference browser with categories',
      body: '<p>HugoKit ships with a full, searchable reference covering <strong>9 Hugo categories</strong>: templates, shortcodes, front matter, taxonomies, content management, functions, variables, configuration, and CLI commands.</p><p>Search is instant and fuzzy. Each entry includes syntax, parameters, and a working example you can copy. <strong>Pin</strong> your most-used references to a quick-access shelf.</p><div class="feature-modal-details"><span class="feature-modal-tag">9 categories</span><span class="feature-modal-tag">Fuzzy search</span><span class="feature-modal-tag">Pinnable</span><span class="feature-modal-tag">Detachable</span></div>'
    },
    menubar: {
      title: 'Control from menu bar',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'macOS menu bar dropdown with server list',
      body: '<p>The HugoKit icon lives in your macOS menu bar and shows a <strong>live status indicator</strong>: green when at least one server is running, grey when idle.</p><p>Click to see a dropdown of all your sites. Start or stop any server directly from the menu — no need to open the main window.</p><div class="feature-modal-details"><span class="feature-modal-tag">Live status</span><span class="feature-modal-tag">Quick start/stop</span><span class="feature-modal-tag">Right-click menu</span></div>'
    },
    shortcuts: {
      title: 'Full shortcut coverage',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'Keyboard shortcut cheat sheet',
      body: '<p>Every core action in HugoKit has a keyboard shortcut. <strong>⌘↩</strong> starts the server, <strong>⌘.</strong> stops it, <strong>⌘R</strong> restarts, <strong>⌘B</strong> triggers a build.</p><p>Shortcuts work globally across the app and follow Apple\'s Human Interface Guidelines.</p><div class="feature-modal-details"><span class="feature-modal-tag">⌘↩ Start</span><span class="feature-modal-tag">⌘. Stop</span><span class="feature-modal-tag">⌘R Restart</span><span class="feature-modal-tag">⌘B Build</span></div>'
    },
    editor: {
      title: 'Works with any editor',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'HugoKit alongside VS Code, Nova, and Vim',
      body: '<p>HugoKit doesn\'t replace your text editor — it <strong>complements it</strong>. Write in VS Code, Nova, Vim, or whatever you prefer. HugoKit handles serving, building, and deploying.</p><p>Every save in your editor triggers an instant live reload in the browser. HugoKit just makes starting and managing that server effortless.</p><div class="feature-modal-details"><span class="feature-modal-tag">VS Code</span><span class="feature-modal-tag">Nova</span><span class="feature-modal-tag">Vim</span><span class="feature-modal-tag">Any editor</span></div>'
    },
    notifications: {
      title: 'Native notifications',
      iconBg: 'var(--sage-soft)', iconColor: 'var(--sage)',
      illustration: 'macOS notification banner for deploy success',
      body: '<p>HugoKit sends <strong>native macOS notifications</strong> for the events that matter: build complete, deploy finished, server error, or Hugo version update.</p><p>Notifications use the standard macOS notification system — they appear in Notification Center, respect Focus modes, and can be configured per-type.</p><div class="feature-modal-details"><span class="feature-modal-tag">Build complete</span><span class="feature-modal-tag">Deploy status</span><span class="feature-modal-tag">Server errors</span><span class="feature-modal-tag">Focus-aware</span></div>'
    }
  };

  function initFeatureModals() {
    var modal = document.getElementById('featureModal');
    var closeBtn = document.getElementById('featureModalClose');
    if (!modal) return function () {};

    var handlers = [];

    function openModal(key) {
      var data = FEATURE_DATA[key];
      if (!data) return;
      var icon = document.getElementById('fmIcon');
      var title = document.getElementById('fmTitle');
      var ilLabel = document.getElementById('fmIllustrationLabel');
      var body = document.getElementById('fmBody');
      // Find the icon SVG from the clicked cell
      var cell = document.querySelector('.feature-cell[data-feature="' + key + '"]');
      var cellIcon = cell ? cell.querySelector('.feature-icon') : null;
      if (cellIcon) {
        icon.innerHTML = cellIcon.innerHTML;
        icon.style.background = data.iconBg;
        icon.style.color = data.iconColor;
      }
      title.textContent = data.title;
      ilLabel.textContent = data.illustration;
      body.innerHTML = data.body;
      modal.classList.add('open');
    }

    function closeModal() { modal.classList.remove('open'); }
    function onBackdrop(e) { if (e.target === modal) closeModal(); }

    document.querySelectorAll('.feature-cell[data-feature]').forEach(function (cell) {
      function onClick() { openModal(cell.dataset.feature); }
      cell.addEventListener('click', onClick);
      handlers.push({ el: cell, fn: onClick });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', onBackdrop);

    return function cleanup() {
      handlers.forEach(function (h) { h.el.removeEventListener('click', h.fn); });
      if (closeBtn) closeBtn.removeEventListener('click', closeModal);
      modal.removeEventListener('click', onBackdrop);
    };
  }

  // ── Registry / lifecycle ─────────────────────────────────────────────
  var cleanups = [];

  function runCleanups() {
    cleanups.forEach(function (fn) { if (typeof fn === 'function') fn(); });
    cleanups = [];
  }

  function initAll() {
    runCleanups();
    try { cleanups.push(initHeroSplash()); } catch (e) { console.error('[page-init] initHeroSplash', e); }
    try { cleanups.push(initFaq()); } catch (e) { console.error('[page-init] initFaq', e); }
    try { cleanups.push(initExplainer()); } catch (e) { console.error('[page-init] initExplainer', e); }
    try { cleanups.push(initFeatureModals()); } catch (e) { console.error('[page-init] initFeatureModals', e); }
    try { cleanups.push(initShowcaseReveal()); } catch (e) { console.error('[page-init] initShowcaseReveal', e); }
    try { cleanups.push(initDataReveal()); } catch (e) { console.error('[page-init] initDataReveal', e); }
    try { cleanups.push(initFeaturePillsScrollSpy()); } catch (e) { console.error('[page-init] initFeaturePillsScrollSpy', e); }
    try { cleanups.push(initNavbarActiveState()); } catch (e) { console.error('[page-init] initNavbarActiveState', e); }
    try { cleanups.push(initHomepageHomeFeatures()); } catch (e) { console.error('[page-init] initHomepageHomeFeatures', e); }
    try { cleanups.push(initSubnavVisibility()); } catch (e) { console.error('[page-init] initSubnavVisibility', e); }
    try { cleanups.push(initThemeColorTracker()); } catch (e) { console.error('[page-init] initThemeColorTracker', e); }
    try { cleanups.push(initNavPillActiveState()); } catch (e) { console.error('[page-init] initNavPillActiveState', e); }
    console.log('[page-init] initAll done, path=' + location.pathname);
  }

  HugoKit.page = { init: initAll, cleanup: runCleanups };

  // ── Nav-pill: scroll shadow ─────────────────────────────────────────
  (function () {
    var pill = document.getElementById('navPill');
    if (!pill) return;

    var onScroll = function () {
      pill.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ── One-time document-level listeners (overlever SPA-swap) ──────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
        m.classList.remove('open');
      });
    }
  });

  /* Theme toggle — #theme-toggle ligger i navbar-partial som ikke
     udskiftes ved SPA-nav, så den initialiseres kun én gang her. */
  (function () {
    var html = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function isDark() {
      var theme = html.getAttribute('data-theme');
      if (theme === 'dark') return true;
      if (theme === 'light') return false;
      return mq.matches;
    }

    function apply() {
      html.classList.toggle('dark-active', isDark());
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var nowDark = isDark();
        var next = nowDark ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        apply();
      });
    }

    mq.addEventListener('change', function () {
      if (!localStorage.getItem('theme')) apply();
    });

    apply();
  })();

  // ── Initial run + re-run efter SPA-navigation ───────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }

  document.addEventListener('spa:navigated', function () {
    initAll();
  });
})();
