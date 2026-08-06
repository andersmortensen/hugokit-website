(function () {
  var dialog = document.getElementById('release-dialog');
  var openers = document.querySelectorAll('[data-release-dialog-open]');
  var closers = document.querySelectorAll('[data-release-dialog-close]');

  if (!dialog || !openers.length) return;

  var open = function () {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  var close = function () {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  openers.forEach(function (opener) {
    opener.addEventListener('click', open);
  });
  closers.forEach(function (closer) {
    closer.addEventListener('click', close);
  });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });
})();
