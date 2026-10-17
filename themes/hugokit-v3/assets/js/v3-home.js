(function () {
  var root = document.documentElement;
  var menu = document.querySelector('.v3-nav-menu');
  var links = document.getElementById('v3-nav-links');
  var theme = document.querySelector('.v3-theme-toggle');

  function syncThemeLabel() {
    if (!theme) return;
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    theme.setAttribute('aria-label', label);
    theme.title = label;
  }
  syncThemeLabel();
  new MutationObserver(syncThemeLabel).observe(root, { attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncThemeLabel);

  if (menu && links) {
    function setOpen(open) {
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      links.classList.toggle('is-open', open);
    }
    menu.addEventListener('click', function () { setOpen(menu.getAttribute('aria-expanded') !== 'true'); });
    links.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        menu.focus();
      }
    });
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.v3-nav')) setOpen(false);
    });
  }

  var dialog = document.getElementById('hugo-dialog');
  var opener = document.querySelector('[data-dialog-open]');
  var close = document.querySelector('[data-dialog-close]');
  if (dialog && opener && close) {
    opener.addEventListener('click', function () { dialog.showModal(); });
    close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { opener.focus(); });
  }
})();
