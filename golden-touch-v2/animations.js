/*!
 * Golden Touch V2 — Motion Animations
 * Vanilla JS · Motion v11 CDN
 */
(function () {
  'use strict';

  function qs(s, c)  { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.from((c || document).querySelectorAll(s)); }

  /* ─── Core ─────────────────────────────────────────────── */
  function init() {
    var M = window.Motion;
    if (!M || !M.animate) return;
    var animate = M.animate, inView = M.inView, stagger = M.stagger, scroll = M.scroll;

    /* Single-element scroll reveal */
    function reveal(el, opts) {
      if (!el) return;
      var o = opts || {};
      el.style.opacity = '0';
      inView(el, function () {
        if (el._done) return; el._done = true;
        var kf = { opacity: [0, 1] };
        if (o.y)     kf.y     = [o.y, 0];
        if (o.x)     kf.x     = [o.x, 0];
        if (o.scale) kf.scale = [o.scale, 1];
        animate(el, kf, { duration: o.dur || 0.6, delay: o.del || 0, easing: o.ease || 'ease-out' });
      }, { margin: '-8% 0px' });
    }

    /* Staggered group scroll reveal — trigger on first element */
    function revealGroup(els, opts) {
      if (!els || !els.length) return;
      var o = opts || {};
      els.forEach(function (el) { el.style.opacity = '0'; });
      var anchor = els[0];
      inView(anchor, function () {
        if (anchor._done) return; anchor._done = true;
        var kf = { opacity: [0, 1] };
        if (o.y !== 0 && o.y) kf.y = [o.y, 0];
        if (o.x !== 0 && o.x) kf.x = [o.x, 0];
        animate(els, kf, {
          delay:    stagger(o.stagger || 0.08),
          duration: o.dur  || 0.55,
          easing:   o.ease || 'ease-out'
        });
      }, { margin: '-6% 0px' });
    }

    /* ─── Hero entrance (homepage only) ─────────────────── */
    var heroLeft = qs('.hero-left');
    if (heroLeft) {
      var heroItems = [
        qs('.hero-eyebrow', heroLeft),
        qs('h1',            heroLeft),
        qs('p',             heroLeft),
        qs('.hero-btns',    heroLeft)
      ].filter(Boolean);

      heroItems.forEach(function (el) { el.style.opacity = '0'; });
      requestAnimationFrame(function () {
        animate(heroItems, { opacity: [0, 1], y: [30, 0] }, {
          delay:    stagger(0.11, { start: 0.28 }),
          duration: 0.68,
          easing:   [0.22, 0.61, 0.36, 1]
        });
      });

      /* Hero image: fade in + gentle parallax */
      var hImg = qs('.hero-right img');
      if (hImg) {
        hImg.style.opacity = '0';
        requestAnimationFrame(function () {
          animate(hImg, { opacity: [0, 1] }, { duration: 1.1, delay: 0.12, easing: 'ease-out' });
        });
        if (scroll) {
          var heroSec = qs('.hero-v2');
          if (heroSec) {
            scroll(animate(hImg, { y: [0, 50] }, { easing: 'linear' }), { target: heroSec });
          }
        }
      }
    }

    /* ─── Page hero entrance (about / services / contact) ── */
    var pH = qs('.page-hero-v2');
    if (pH) {
      var phItems = [qs('.label', pH), qs('h1', pH), qs('p', pH)].filter(Boolean);
      phItems.forEach(function (el) { el.style.opacity = '0'; });
      requestAnimationFrame(function () {
        animate(phItems, { opacity: [0, 1], y: [22, 0] }, {
          delay: stagger(0.1, { start: 0.22 }),
          duration: 0.6, easing: 'ease-out'
        });
      });
    }

    /* ─── Section h2 / h3 (individual, not in heroes) ────── */
    qsa('h2, h3').forEach(function (el) {
      if (el.closest('.hero-v2') || el.closest('.page-hero-v2')) return;
      reveal(el, { y: 22, dur: 0.6 });
    });

    /* ─── Labels (scroll-in from left) ───────────────────── */
    qsa('.label').forEach(function (el) {
      if (el.closest('.hero-v2') || el.closest('.page-hero-v2') || el.closest('.ticker')) return;
      reveal(el, { x: -10, dur: 0.5 });
    });

    /* ─── Decorative rules ────────────────────────────────── */
    qsa('.rule').forEach(function (el) {
      el.style.opacity = '0';
      inView(el, function () {
        if (el._done) return; el._done = true;
        animate(el, { opacity: [0, 1], scaleX: [0, 1] }, { duration: 0.5, easing: 'ease-out' });
      }, { margin: '-8% 0px' });
    });

    /* ─── About splits (slide from sides) ────────────────── */
    qsa('.about-split').forEach(function (split) {
      Array.from(split.children).forEach(function (child, i) {
        child.style.opacity = '0';
        inView(split, function () {
          if (child._done) return; child._done = true;
          animate(child, { opacity: [0, 1], x: [i === 0 ? -28 : 28, 0] },
            { duration: 0.72, delay: i * 0.1, easing: [0.22, 0.61, 0.36, 1] });
        }, { margin: '-10% 0px' });
      });
    });

    /* ─── Service strips (image + body slide from sides) ──── */
    qsa('.service-strip').forEach(function (strip) {
      var rev  = strip.classList.contains('reverse');
      var img  = qs('.strip-img',  strip);
      var body = qs('.strip-body', strip);
      [img, body].forEach(function (el) { if (el) el.style.opacity = '0'; });
      inView(strip, function () {
        if (strip._done) return; strip._done = true;
        var d = rev ? 55 : -55;
        if (img)  animate(img,  { opacity: [0, 1], x: [d, 0] },  { duration: 0.78, easing: [0.22, 0.61, 0.36, 1] });
        if (body) animate(body, { opacity: [0, 1], x: [-d, 0] }, { duration: 0.78, delay: 0.13, easing: [0.22, 0.61, 0.36, 1] });
      }, { margin: '-12% 0px' });
    });

    /* ─── Service strip section header ───────────────────── */
    revealGroup(qsa('.svc-section-header > *'), { y: 18, stagger: 0.08, dur: 0.55 });

    /* ─── Review cards (staggered) ───────────────────────── */
    revealGroup(qsa('.review-v2'), { y: 18, stagger: 0.07, dur: 0.5 });

    /* ─── Location cards (staggered) ─────────────────────── */
    revealGroup(qsa('.loc-v2-card'), { y: 18, stagger: 0.09, dur: 0.5 });

    /* ─── Service table rows ─────────────────────────────── */
    revealGroup(qsa('.svc-v2-table tr'), { x: -12, stagger: 0.04, dur: 0.4 });

    /* ─── Pull quote (scale up) ───────────────────────────── */
    qsa('.pull-quote blockquote').forEach(function (el) {
      reveal(el, { scale: 0.95, dur: 0.72 });
    });

    /* ─── Stat numbers ───────────────────────────────────── */
    revealGroup(qsa('.stat-num'), { y: 16, stagger: 0.1, dur: 0.5 });

    /* ─── Mission card ───────────────────────────────────── */
    reveal(qs('.mission-card'), { scale: 0.97, dur: 0.65 });

    /* ─── Values / team grid cards ───────────────────────── */
    revealGroup(qsa('[data-grid-cards] > div'), { y: 22, stagger: 0.08, dur: 0.52 });

    /* ─── CTA dark band ──────────────────────────────────── */
    revealGroup(
      qsa('.cta-band .label, .cta-band h2, .cta-band p, .cta-band .cta-btns'),
      { y: 18, stagger: 0.1, dur: 0.6 }
    );

    /* ─── Contact info items ─────────────────────────────── */
    revealGroup(qsa('.loc-v2-card .loc-v2-hours'), { y: 10, stagger: 0.05, dur: 0.4 });

    /* ─── Footer columns ─────────────────────────────────── */
    revealGroup(qsa('.footer-v2-grid > div'), { y: 16, stagger: 0.07, dur: 0.5 });

    /* ─── Ticker: pause on hover ─────────────────────────── */
    var ticker = qs('.ticker-inner');
    if (ticker) {
      var wrap = ticker.parentElement;
      wrap.addEventListener('mouseenter', function () { ticker.style.animationPlayState = 'paused'; });
      wrap.addEventListener('mouseleave', function () { ticker.style.animationPlayState = 'running'; });
    }
  }

  /* ─── Boot: load CDN then init ───────────────────────── */
  if (window.Motion) {
    init();
  } else {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/motion@11/dist/motion.js';
    s.crossOrigin = 'anonymous';
    s.onload = init;
    s.onerror = function () {};
    document.head.appendChild(s);
  }
}());
