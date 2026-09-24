/* House of Navi — carousel controller.
   Drives any .strip of .tile elements: arrow buttons, numbered dots,
   the 01 / 0N counter and keyboard arrows. Plain browser JS. */
(function () {
  var strip = document.getElementById('strip');
  if (!strip) return;

  var tiles = Array.prototype.slice.call(strip.querySelectorAll('.tile'));
  var count = tiles.length;
  var dotsWrap = document.getElementById('dots');
  var counter = document.getElementById('counter');
  var index = 0;

  function pad(n) { return ('0' + (n + 1)).slice(-2); }

  var dotBtns = tiles.map(function (t, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = t.getAttribute('data-label') || pad(n);
    b.setAttribute('aria-label', 'Go to tile ' + pad(n));
    b.addEventListener('click', function () { go(n); });
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    counter.textContent = pad(index) + ' / ' + pad(count - 1);
    dotBtns.forEach(function (b, n) { b.classList.toggle('active', n === index); });
  }

  function go(n) {
    index = Math.max(0, Math.min(count - 1, n));
    strip.scrollTo({ left: strip.clientWidth * index, behavior: 'smooth' });
    render();
  }

  var raf;
  strip.addEventListener('scroll', function () {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      if (!strip.clientWidth) return;
      var n = Math.round(strip.scrollLeft / strip.clientWidth);
      if (n !== index) { index = n; render(); }
    });
  });

  document.getElementById('prev').addEventListener('click', function () { go(index - 1); });
  document.getElementById('next').addEventListener('click', function () { go(index + 1); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  });

  render();
})();
