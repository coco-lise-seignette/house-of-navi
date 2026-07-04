(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var url = el.getAttribute('data-bg');
      if (url) {
        el.style.backgroundImage = "url('" + url + "')";
        el.removeAttribute('data-bg');
      }
      observer.unobserve(el);
    });
  }, { rootMargin: '100% 0px 100% 0px', threshold: 0 });

  document.querySelectorAll('.texture[data-bg]').forEach(function (el) {
    observer.observe(el);
  });
})();
