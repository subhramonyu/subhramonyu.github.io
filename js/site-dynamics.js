/**
 * Light motion + rotating quips — skips when prefers-reduced-motion is set.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var HERO_QUIPS = [
    'If it runs in prod, the design review was worth it.',
    'Tabs, spaces, or chaos — pick a style guide and ship.',
    'Friday deploys: statistically… fine. Usually.',
    'Legacy is just code that already paid rent.',
    'Coffee → compile → care about edge cases. Repeat.',
    'git commit -m "fix stuff" — a shared human experience.',
    'Works on my machine™ has a younger sibling: works in staging.',
    'Green builds, green mood. (Correlation ≠ causation.)',
  ];

  var STATUS_LINES = [
    'build: stable · JVM · CPython',
    'latency: fine · ego: versioned',
    'tests: green enough · vibes: cautiously optimistic',
    '$ ./ship.sh --no-regrets --with-tests',
    'rm -rf doubt*  (metaphorically)',
  ];

  var FOOTER_QUIPS = [
    'No cookies baked here — just static HTML.',
    'Powered by caffeine and careful refactors.',
    'This page is 0% blockchain. You are welcome.',
    'If you read this far, you deserve good CI.',
  ];

  function cycleText(el, lines, intervalMs, className) {
    if (!el || !lines.length || reduced) return;
    var i = lines.indexOf(el.textContent.trim());
    if (i < 0) i = 0;
    function setLine(idx) {
      el.textContent = lines[idx];
    }
    setLine(i);
    setInterval(function () {
      i = (i + 1) % lines.length;
      el.classList.add(className || 'text-cycle-tick');
      setTimeout(function () {
        setLine(i);
        el.classList.remove(className || 'text-cycle-tick');
      }, 220);
    }, intervalMs);
  }

  function initScrollReveal() {
    if (reduced) {
      document.querySelectorAll('.motion-reveal').forEach(function (el) {
        el.classList.add('motion-reveal--visible');
      });
      return;
    }
    var nodes = document.querySelectorAll('.motion-reveal');
    if (!nodes.length || !('IntersectionObserver' in window)) {
      nodes.forEach(function (el) {
        el.classList.add('motion-reveal--visible');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('motion-reveal--visible');
          io.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initBrandEasterEgg() {
    var brand = document.querySelector('.navbar-brand');
    if (!brand || reduced) return;
    brand.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.shiftKey) {
        e.preventDefault();
        brand.classList.remove('brand-party');
        void brand.offsetWidth;
        brand.classList.add('brand-party');
        setTimeout(function () {
          brand.classList.remove('brand-party');
        }, 900);
      }
    });
    brand.setAttribute('title', './subhramonyu — Shift+click for a tiny celebration');
  }

  function initFooterQuip() {
    var el = document.getElementById('footer-quip');
    if (!el) return;
    var i = Math.floor(Math.random() * FOOTER_QUIPS.length);
    el.textContent = FOOTER_QUIPS[i];
    if (!reduced) {
      setInterval(function () {
        i = (i + 1) % FOOTER_QUIPS.length;
        el.style.opacity = '0';
        setTimeout(function () {
          el.textContent = FOOTER_QUIPS[i];
          el.style.opacity = '1';
        }, 280);
      }, 26000);
    }
  }

  function run() {
    initScrollReveal();
    initBrandEasterEgg();
    initFooterQuip();

    var quipEl = document.getElementById('hero-quip');
    cycleText(quipEl, HERO_QUIPS, 9000, 'hero-quip-tick');

    var statusEl = document.querySelector('.hero-status-meta');
    cycleText(statusEl, STATUS_LINES, 11000, 'status-line-tick');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
