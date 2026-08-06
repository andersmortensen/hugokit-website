(function () {
  var root = document.documentElement;
  var dialog = document.getElementById('hugo-dialog');
  var openDialog = document.querySelector('[data-dialog-open]');
  var closeDialog = document.querySelector('[data-dialog-close]');
  var mediaDialog = document.getElementById('hero-lightbox');
  var openMediaDialog = document.querySelector('[data-media-lightbox-open]');
  var closeMediaDialog = document.querySelector('[data-media-lightbox-close]');
  var mediaSlot = document.querySelector('[data-media-lightbox-slot]');
  var heroMedia = document.querySelector('.v3-hero-window');
  var navMenu = document.querySelector('.v3-nav-menu');
  var navLinksPanel = document.getElementById('v3-nav-links');

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function openModal(element) {
    if (typeof element.showModal === 'function') element.showModal();
    else element.setAttribute('open', '');
  }

  function closeModal(element) {
    if (typeof element.close === 'function') element.close();
    else {
      element.removeAttribute('open');
      element.dispatchEvent(new Event('close'));
    }
  }

  function syncTheme(theme) {
    var colour = theme === 'dark' ? '#0D0E0F' : '#F0F0EC';
    root.dataset.theme = theme;
    root.style.setProperty('--toolbar-color', colour);
    root.style.backgroundColor = colour;
    document.body.style.backgroundColor = colour;
    var nav = document.querySelector('.v3-nav, .bezel-bar');
    if (nav) nav.style.backgroundColor = colour;
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.removeAttribute('media');
      meta.content = colour;
    });
    document.querySelectorAll('picture.mode-pic source').forEach(function (source) {
      source.media = theme === 'dark' ? 'all' : 'not all';
    });
  }

  if (openDialog && dialog) {
    openDialog.addEventListener('click', function () { openModal(dialog); });
  }

  if (closeDialog && dialog) {
    closeDialog.addEventListener('click', function () { closeModal(dialog); });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeModal(dialog);
    });
  }

  if (mediaDialog && openMediaDialog && closeMediaDialog && mediaSlot && heroMedia) {
    var clearExpandedMedia = function () {
      mediaSlot.innerHTML = '';
      openMediaDialog.focus();
    };

    openMediaDialog.addEventListener('click', function () {
      mediaSlot.innerHTML = '<div class="v3-hero-window">' + heroMedia.innerHTML + '</div>';
      var expandedVideo = mediaSlot.querySelector('video');
      if (expandedVideo) expandedVideo.removeAttribute('id');
      openModal(mediaDialog);
      if (expandedVideo) {
        expandedVideo.muted = true;
        var play = expandedVideo.play();
        if (play && play.catch) play.catch(function () {});
      }
    });
    closeMediaDialog.addEventListener('click', function () { closeModal(mediaDialog); });
    mediaDialog.addEventListener('close', clearExpandedMedia);
    mediaDialog.addEventListener('click', function (event) {
      if (event.target === mediaDialog) closeModal(mediaDialog);
    });
  }

  if (navMenu && navLinksPanel) {
    var setMenuOpen = function (open) {
      navMenu.setAttribute('aria-expanded', String(open));
      navMenu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      navLinksPanel.classList.toggle('is-open', open);
    };
    navMenu.addEventListener('click', function () {
      setMenuOpen(navMenu.getAttribute('aria-expanded') !== 'true');
    });
    navLinksPanel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuOpen(false);
    });
  }

  var revealTargets = document.querySelectorAll([
    '.v3-hero-topline',
    '.v3-hero-heading',
    '.v3-hero-meta',
    '.v3-facts-row',
    '.v3-section-heading-row',
    '.v3-loop-card',
    '.v3-feature-card',
    '.v3-note-inner > *',
    '.v3-faq-item',
    '.v3-store-card'
  ].join(','));

  revealTargets.forEach(function (element) { element.classList.add('v3-reveal'); });
  root.classList.add('v3-motion-ready');

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach(function (element) { element.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(function (element) { revealObserver.observe(element); });
  }

  var navLinks = document.querySelectorAll('.v3-nav-links a[href^="#"]');
  var navSections = document.querySelectorAll('#hero, #loop, #features, #faq');
  if ('IntersectionObserver' in window && navLinks.length) {
    var setCurrentSection = function (id) {
      navLinks.forEach(function (link) {
        var current = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-current', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrentSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -68% 0px', threshold: 0 });
    navSections.forEach(function (section) { sectionObserver.observe(section); });
  }
})();
