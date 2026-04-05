(function () {
  var STORAGE_KEY = 'bk-neon-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function currentTheme() {
    return document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
    });
  });
})();
