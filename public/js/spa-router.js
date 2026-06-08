/* ==========================================================================
   SPA Router — Hugo instant-load
   Klassisk multi-side setup: swap <main>, behold header/footer, pushState URL.
   Konfiguration via window.__spaRouterConfig (sæt før scriptet loader).
   ========================================================================== */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────
  var defaults = {
    rootSelector:    '#spa-main',
    preload:         true,
    cacheSize:       30,
    ignoreSelectors: ['[data-no-spa]', '[target=_blank]', '[download]']
  };
  var cfg = Object.assign({}, defaults, window.__spaRouterConfig || {});
  var base = (window.__basePath || '/').replace(/\/$/, '');

  // ── State ─────────────────────────────────────────────────────────────
  var cache    = new Map();  // url → html string (full document)
  var inflight = new Map();  // url → fetch promise (de-dupe)
  var root     = document.querySelector(cfg.rootSelector);

  if (!root) {
    console.warn('[spa-router] rootSelector not found:', cfg.rootSelector);
    return;
  }

  // Save initial state so back to first page works
  history.replaceState({ spa: location.pathname + location.search }, '', location.href);
  cacheStore(location.pathname + location.search, document.documentElement.outerHTML);

  // ── Helpers ───────────────────────────────────────────────────────────
  function cacheStore(url, html) {
    if (cache.size >= cfg.cacheSize) {
      // Evict oldest (Map preserves insertion order)
      var firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(url, html);
  }

  function isInternalLink(link) {
    if (!link || link.tagName !== 'A') return false;
    var href = link.getAttribute('href');
    if (!href) return false;

    // Ignore hash-only, mailto, tel, javascript:, protocol-relative to other host
    if (href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('javascript:')) return false;

    // External host check
    if (link.host && link.host !== location.host) return false;

    // Skip static file extensions (except trailing slash paths)
    if (/\.\w{2,5}$/.test(link.pathname) && !link.pathname.endsWith('/')) {
      // Allow .html explicitly
      if (!link.pathname.endsWith('.html')) return false;
    }

    // Matches any ignore selector
    for (var i = 0; i < cfg.ignoreSelectors.length; i++) {
      if (link.matches(cfg.ignoreSelectors[i])) return false;
    }

    return true;
  }

  function samePage(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.pathname === location.pathname && a.search === location.search;
  }

  async function fetchPage(url) {
    if (cache.has(url))    return cache.get(url);
    if (inflight.has(url)) return inflight.get(url);

    var p = fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        cacheStore(url, html);
        inflight.delete(url);
        return html;
      })
      .catch(function (err) {
        inflight.delete(url);
        throw err;
      });

    inflight.set(url, p);
    return p;
  }

  // ── Core: swap content ────────────────────────────────────────────────
  function swap(html, url, scrollToTop) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var newRoot = doc.querySelector(cfg.rootSelector);

    if (!newRoot) {
      // Bail — target page doesn't have our root selector; do a full navigation
      location.href = url;
      return;
    }

    // Update title
    document.title = doc.title;

    // Update body class (useful for is-home, is-post etc.)
    if (doc.body && doc.body.className) {
      document.body.className = doc.body.className;
    }

    // Update <head> meta tags that affect SEO/social
    updateMetaTags(doc);

    // Swap content
    root.innerHTML = newRoot.innerHTML;

    // Re-execute scripts inside root (innerHTML doesn't run them)
    root.querySelectorAll('script').forEach(function (oldScript) {
      var newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(function (attr) {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    document.body.classList.remove('is-navigating');

    // Notify listeners
    document.dispatchEvent(new CustomEvent('spa:navigated', {
      detail: { url: url, main: root }
    }));
  }

  function updateMetaTags(doc) {
    // Swap <meta name="description">, og:title, og:image, canonical
    var selectors = [
      'meta[name="description"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]',
      'link[rel="canonical"]'
    ];
    selectors.forEach(function (sel) {
      var newEls = Array.from(doc.head.querySelectorAll(sel));
      document.head.querySelectorAll(sel).forEach(function (el) { el.remove(); });
      newEls.forEach(function (el) { document.head.appendChild(el.cloneNode(true)); });
    });
  }

  // ── Navigate ──────────────────────────────────────────────────────────
  async function navigate(url, opts) {
    opts = opts || {};
    document.body.classList.add('is-navigating');
    document.dispatchEvent(new CustomEvent('spa:navigate-start', { detail: { url: url } }));

    // Split off hash — we never fetch with it, but we want it in the address
    // bar and we use it to scroll after swap.
    var hashIndex = url.indexOf('#');
    var hash      = hashIndex >= 0 ? url.slice(hashIndex) : '';
    var fetchUrl  = hashIndex >= 0 ? url.slice(0, hashIndex) : url;

    try {
      var html = await fetchPage(fetchUrl);

      /* Opdater history FØR swap() — swap() dispatcher spa:navigated
         synkront, og page-init's navbar-logik læser location.pathname
         for at afgøre hvilken pill der er aktiv. Hvis vi pushState'er
         bagefter, ser listeneren stadig den gamle URL og sætter
         forkert active-tilstand (fx lader FAQ.active blive siddende
         når man navigerer fra #faq til /whats-new/). */
      if (opts.updateHistory !== false) {
        history.pushState({ spa: url }, '', url);
      }

      swap(html, url, opts.scrollToTop !== false && !hash);

      // After swap, scroll to the hash target if one was requested.
      if (hash) {
        // rAF so the swapped DOM has rendered before we measure.
        requestAnimationFrame(function () {
          var target = null;
          try { target = document.querySelector(hash); } catch (e) { /* invalid selector */ }
          if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        });
      }
    } catch (err) {
      console.warn('[spa-router] fetch failed, falling back to full load', err);
      location.href = url;
    }
  }

  // ── Click interception ────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0)     return; // only left-click
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest('a');
    if (!isInternalLink(link)) return;

    var href = link.pathname + link.search + link.hash;

    // Same page — let browser handle (anchor scroll)
    if (samePage(link.href)) {
      if (link.hash) return; // native anchor nav
    }

    e.preventDefault();
    navigate(link.pathname + link.search + link.hash, { scrollToTop: !link.hash });
  });

  // ── Hover preload ─────────────────────────────────────────────────────
  if (cfg.preload) {
    var preloadTimer;
    document.addEventListener('mouseover', function (e) {
      var link = e.target.closest('a');
      if (!isInternalLink(link)) return;
      var url = link.pathname + link.search;
      if (cache.has(url) || inflight.has(url)) return;

      clearTimeout(preloadTimer);
      preloadTimer = setTimeout(function () {
        fetchPage(url).catch(function () {});
      }, 80); // small delay → don't prefetch hover-through
    });
  }

  // ── Back/forward ──────────────────────────────────────────────────────
  window.addEventListener('popstate', function (e) {
    var url = (e.state && e.state.spa) || (location.pathname + location.search);
    navigate(url, { updateHistory: false, scrollToTop: false });
  });

  // ── Expose API ────────────────────────────────────────────────────────
  window.spaRouter = {
    navigate: navigate,
    preload:  fetchPage,
    cache:    cache
  };
})();
