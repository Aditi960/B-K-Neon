(function () {
  var PHONE = '918805745519';

  function openWhatsApp(msg) {
    var text = msg || 'Hi, I\'m interested in a custom neon sign!';
    var url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('.whatsapp-link');
    if (!el) return;
    e.preventDefault();
    openWhatsApp(el.getAttribute('data-msg'));
  });
})();
