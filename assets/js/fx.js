/* Design Library pass: T25 split-flap eyebrow, T29 odometer numerals, T38 marker trigger. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var motion = root.classList.contains('motion');

  // Results bento — evidence toggle (works without motion)
  [].slice.call(doc.querySelectorAll('.result .ev')).forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.closest('.result'), open = !li.classList.contains('open');
      li.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    });
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    [].slice.call(doc.querySelectorAll('.result.open')).forEach(function (li) {
      li.classList.remove('open'); var b = li.querySelector('.ev'); if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  // Film strip — prev/next controls
  var pf = doc.querySelector('.filmstrip .pf'), rp = doc.querySelector('.rc-prev'), rn = doc.querySelector('.rc-next');
  if (pf && rp && rn) {
    var sync = function () {
      rp.disabled = pf.scrollLeft < 8;
      rn.disabled = pf.scrollLeft + pf.clientWidth > pf.scrollWidth - 8;
    };
    var step = function (d) { pf.scrollBy({ left: d * pf.clientWidth * 0.8, behavior: motion ? 'smooth' : 'auto' }); };
    rp.addEventListener('click', function () { step(-1); });
    rn.addEventListener('click', function () { step(1); });
    pf.addEventListener('scroll', function () { requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', sync); sync();
  }

  // Profile — scroll-read reveal (T5/E6) + marker (T38) once fully read
  var st = doc.querySelector('.statement'), sp = st && st.querySelector('p[data-i="pText"]');
  if (st && (!motion || !sp)) st.classList.add('lit');
  if (st && sp && motion) {
    var words = [], busy = false, raf = 0;
    var cjk = /[\u3000-\u9fff\uff00-\uffef]/;
    var wrap = function () {
      busy = true;
      var walker = doc.createTreeWalker(sp, NodeFilter.SHOW_TEXT, null), nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function (t) {
        var parts = cjk.test(t.nodeValue) ? t.nodeValue.split('') : t.nodeValue.split(/(\s+)/);
        var frag = doc.createDocumentFragment();
        parts.forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(doc.createTextNode(w)); return; }
          var sEl = doc.createElement('span'); sEl.className = 'rw'; sEl.textContent = w; frag.appendChild(sEl);
        });
        t.parentNode.replaceChild(frag, t);
      });
      words = [].slice.call(sp.querySelectorAll('.rw'));
      busy = false; update();
    };
    var update = function () {
      raf = 0;
      var r = sp.getBoundingClientRect(), vh = window.innerHeight || 800;
      var prog = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.3)));
      var k = Math.round(prog * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < k);
      if (prog >= 0.97) st.classList.add('lit');
    };
    var boot = function () { st.classList.add('read'); wrap(); };
    if (window.requestIdleCallback) requestIdleCallback(boot, { timeout: 2000 }); else setTimeout(boot, 900);
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', function () { if (!raf) raf = requestAnimationFrame(update); });
    if ('MutationObserver' in window) new MutationObserver(function () { if (!busy && !sp.querySelector('.rw')) wrap(); }).observe(sp, { childList: true });
  }
  if (!motion) return;

  // T25 — split-flap settle on the availability line (runs once, overlay only)
  function flap(el) {
    var text = el.textContent, host = el.parentNode;
    if (!text || !host) return;
    var pool = text.replace(/[\s·]/g, '').split('');
    if (pool.length < 2) return;
    host.style.position = 'relative';
    var ov = doc.createElement('span');
    ov.className = 'flap'; ov.setAttribute('aria-hidden', 'true');
    ov.style.left = el.offsetLeft + 'px'; ov.style.top = el.offsetTop + 'px'; ov.style.width = el.offsetWidth + 'px';
    host.appendChild(ov);
    el.style.opacity = '0';
    var n = text.length, frame = 0, total = 26;
    var iv = setInterval(function () {
      frame++;
      var done = Math.floor((frame / total) * n), out = '';
      for (var i = 0; i < n; i++) {
        var c = text[i];
        out += (i < done || c === ' ' || c === '·') ? c : pool[(Math.random() * pool.length) | 0];
      }
      ov.textContent = out;
      if (frame >= total) { clearInterval(iv); ov.remove(); el.style.opacity = ''; }
    }, 34);
  }
  var eb = doc.querySelector('.hero .status [data-i="eyebrow"]');
  if (eb) setTimeout(function () { flap(eb); }, 260);

  // T29 — odometer on the result numerals
  var nums = [].slice.call(doc.querySelectorAll('.result .num, .gauges .gnum'));
  function roll(el) {
    var text = el.textContent;
    if (!/\d/.test(text)) return;
    var A = window.anime;
    var esc = function (x) { return x.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    var cols = [], html = '<span class="sr">' + esc(text) + '</span>';
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (/\d/.test(c)) {
        var strip = '';
        for (var k = 0; k < 20; k++) strip += '<b>' + (k % 10) + '</b>';
        html += '<span class="odo" aria-hidden="true" data-d="' + c + '"><span>' + strip + '</span></span>';
      } else html += '<span aria-hidden="true">' + esc(c) + '</span>';
    }
    el.innerHTML = html;
    cols = [].slice.call(el.querySelectorAll('.odo>span'));
    var finish = function () { el.textContent = text; };
    if (A && A.animate) {
      cols.forEach(function (s, j) {
        var d = +s.parentNode.dataset.d;
        A.animate(s, { translateY: ['0em', -(10 + d) + 'em'], duration: 1500 + j * 140, delay: 120 + j * 90, ease: 'outExpo',
          onComplete: j === cols.length - 1 ? finish : undefined });
      });
    } else {
      cols.forEach(function (s, j) {
        var d = +s.parentNode.dataset.d;
        s.style.transition = 'transform ' + (1.5 + j * 0.14) + 's cubic-bezier(.16,1,.3,1) ' + (0.12 + j * 0.09) + 's';
        requestAnimationFrame(function () { requestAnimationFrame(function () { s.style.transform = 'translateY(' + -(10 + d) + 'em)'; }); });
      });
      setTimeout(finish, 2600);
    }
  }
  if (nums.length && 'IntersectionObserver' in window) {
    var oio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        oio.unobserve(e.target);
        var el = e.target;
        var go = function () { roll(el); };
        if (window.anime && window.anime.animate) go(); else setTimeout(go, 250);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { oio.observe(n); });
  }
  // Film strip — teaser plays on hover (fine pointers only, loads on demand)
  var VID = { 'xavier': 'assets/video/xavier-reel.mp4', 'auracell-film': 'assets/video/auracell-film.mp4' };
  if (window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    [].slice.call(doc.querySelectorAll('.filmstrip .tile[data-proj]')).forEach(function (t) {
      var src = VID[t.dataset.proj]; if (!src) return;
      var th = t.querySelector('.thumb'), v = null;
      t.addEventListener('pointerenter', function () {
        if (!v) {
          v = doc.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
          v.setAttribute('aria-hidden', 'true'); v.src = src; th.appendChild(v);
          v.addEventListener('playing', function () { v.classList.add('on'); });
        }
        var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
        if (!v.paused) v.classList.add('on');
      });
      t.addEventListener('pointerleave', function () { if (v) { v.pause(); v.classList.remove('on'); } });
    });
  }
})();
