/* Xavier Studio · site logic. Anime.js 3 for motion; English + 中文 from i18n.js; content stays readable without JS. */
(function () {
  'use strict';
  const X = window.XS, B = window.BANKS, MK = window.MARKS, T = window.T, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, A = typeof window.anime === 'function';
  const EASE = 'cubicBezier(.22,.61,.36,1)';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
  document.documentElement.classList.add('js');

  /* ---------- language ---------- */
  let L = 'en';
  try { const s = localStorage.getItem('xs-lang'); L = s || ((navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'); } catch (e) {}
  const tr = o => (o && (o[L] ?? o.en)) || '';
  const t = k => tr(T[k]);
  const label = p => tr(X.labels[p.label]).replace(' · ', L === 'zh' ? '，' : ', ');
  const sector = p => tr(p.sector).replace(' · ', L === 'zh' ? '，' : ', ');
  const bySlug = s => X.projects.findIndex(p => p.slug === s);
  const N2 = i => String(i).padStart(2, '0');   // one numbering system everywhere: 01 / 16 (ring, list, viewer)

  /* ---------- small shops first: three of the sixteen ---------- */
  function renderThree() {
    $('#three-row').innerHTML = ['pang-pang', 'tiga-sudu', 'skinlab-21'].map(slug => { const i = bySlug(slug), p = X.projects[i];
      return `<a class="feat" href="#index" data-i="${i}"><img src="assets/work/${slug}/cover.webp" srcset="assets/work/${slug}/thumb.webp 640w, assets/work/${slug}/cover.webp 1100w" sizes="(max-width: 900px) 80vw, 31vw" alt="${esc(p.name)}" width="800" height="1000" loading="lazy">
        <span class="feat__cap"><b>${esc(p.name.toUpperCase())}</b><i>${esc(sector(p))}</i><small>${esc(label(p))}</small></span></a>`; }).join('');
  }

  /* ---------- the index: one cover travels to the row ---------- */
  function renderRows() {
    $('#rows').innerHTML = X.projects.map((p, i) => `<li><a class="row" href="#${p.slug}" data-i="${i}">
        <img class="row__thumb" src="assets/work/${p.slug}/thumb.webp" alt="" width="800" height="1000" loading="lazy">
        <span class="row__no">${N2(i + 1)}</span><span class="row__name">${esc(p.name)}</span>
        <span class="row__sector">${esc(sector(p))}</span><span class="row__label">${esc(label(p))}</span>
        <span class="row__film">${p.film ? t('film') : ''}</span></a></li>`).join('');
  }
  const travel = $('#travel'), timg = $('#travel-img');
  function point(i) { const p = X.projects[i]; if (!p) return; $$('.row').forEach((r, k) => r.classList.toggle('on', k === i));
    if (!timg.src.endsWith(`/${p.slug}/cover.webp`)) { timg.style.opacity = 0; setTimeout(() => { timg.src = `assets/work/${p.slug}/cover.webp`; timg.alt = p.name; timg.style.opacity = 1; }, 160); }
    const row = $$('.row')[i], body = $('.index__body');
    if (row && innerWidth > 900) { const off = row.getBoundingClientRect().top - body.getBoundingClientRect().top - travel.offsetHeight / 2 + row.offsetHeight / 2;
      travel.style.position = 'relative'; travel.style.top = '0'; const max = body.offsetHeight - travel.offsetHeight, y = Math.max(0, Math.min(max, off));
      if (A && !RM) anime({ targets: travel, translateY: y, duration: 700, easing: EASE }); else travel.style.transform = `translateY(${y}px)`; } }
  $('#rows').addEventListener('mouseover', e => { const r = e.target.closest('.row'); if (r) point(+r.dataset.i); });
  $('#rows').addEventListener('focusin', e => { const r = e.target.closest('.row'); if (r) point(+r.dataset.i); });

  /* ---------- dialogs: keep keyboard focus inside (the page behind goes inert) ---------- */
  function inert(on) { ['#nav', '#page', '#foot', '#mnav'].forEach(s => { const el = $(s); if (el) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); } }); }

  /* ---------- case viewer ---------- */
  let cur = null, manifest = null, lastFocus = null;
  fetch('assets/work/manifest.json').then(r => r.json()).then(m => { manifest = m; fromHash(); }).catch(() => { manifest = {}; fromHash(); });
  function openCase(i, quiet) { const p = X.projects[i], V = $('#viewer'); cur = i;
    if (!quiet && location.hash !== '#' + p.slug) history.replaceState(null, '', '#' + p.slug);
    $('#v-pos').textContent = fill(t('v.pos'), { i: N2(i + 1), n: N2(X.projects.length) });
    $('#v-name').textContent = p.name; $('#v-sector').textContent = sector(p); $('#v-label').textContent = label(p);
    $('#vh-pos').textContent = $('#v-pos').textContent; $('#vh-name').textContent = p.name; $('#vh-label').textContent = label(p); $('#v-blurb').textContent = tr(p.blurb);
    $('#v-made').innerHTML = tr(p.made).map(m => `<li>${esc(m)}</li>`).join('');
    const ASK = { 'aries-group': ['WEB', 'v.what.web'], 'message-cards': ['BRAND', 'v.what.cards'] }, [key, wk] = ASK[p.slug] || ['BRAND', 'v.what'];
    $('#v-cta').href = 'https://wa.me/60125272682?text=' + encodeURIComponent(fill(t('v.ask'), { key, name: p.name, what: t(wk) }));
    if (!quiet) { const imgs = (manifest && manifest[p.slug]) || [['cover.webp', 800, 1000]];
      const film = p.film ? `<video src="assets/films/${p.film}.mp4" poster="assets/films/${p.film}.webp" controls playsinline preload="none"></video>` : '';
      const alt = k => esc(fill(t('v.img'), { name: p.name, k: k + 1, n: imgs.length }));
      $('#v-media').innerHTML = imgs.slice(0, 1).map(([f, w, h]) => `<img src="assets/work/${p.slug}/${f}" width="${w}" height="${h}" alt="${alt(0)}">`).join('') + film
        + imgs.slice(1).map(([f, w, h], k) => `<img src="assets/work/${p.slug}/${f}" width="${w}" height="${h}" alt="${alt(k + 1)}" loading="lazy">`).join('');
      $('#v-media').setAttribute('aria-label', t('v.media'));
      if (V.hidden) { lastFocus = document.activeElement; V.hidden = false; document.body.style.overflow = 'hidden'; inert(true); $('#v-close').focus(); }
      $('#v-media').scrollTop = 0; V.scrollTop = 0;
      if (A && !RM) anime({ targets: ['#v-name', '#v-sector', '#v-label', '#v-blurb', '#v-made', '#v-media > *:first-child'], opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(60), duration: 700, easing: EASE }); } }
  function closeCase() { if (location.hash && bySlug(location.hash.slice(1)) >= 0) history.replaceState(null, '', location.pathname + location.search); $('#viewer').hidden = true; cur = null; document.body.style.overflow = ''; inert(false); $$('#v-media video').forEach(v => v.pause()); if (lastFocus) lastFocus.focus(); }
  document.addEventListener('click', e => { const r = e.target.closest('.row, .feat'); if (!r || r.dataset.i == null) return; e.preventDefault(); openCase(+r.dataset.i); });
  $('#v-close').addEventListener('click', closeCase);
  const fromHash = () => { const i = bySlug(decodeURIComponent(location.hash.slice(1))); if (i >= 0 && cur !== i && manifest) openCase(i); };
  addEventListener('hashchange', fromHash); fromHash();
  window.XSOpenCase = slug => { const i = bySlug(slug); if (i >= 0) openCase(i); };
  $('#v-prev').addEventListener('click', () => openCase((cur - 1 + X.projects.length) % X.projects.length));
  $('#v-next').addEventListener('click', () => openCase((cur + 1) % X.projects.length));

  /* ---------- films: a plain grid of ten; hover plays the muted loop, tap plays with sound ---------- */
  function renderFilms() {
    $('#reel').innerHTML = X.films.map(f => `<button class="film rv" type="button" data-f="${f.slug}" aria-label="${esc(f.name)}: ${t('films.sound')}">
        <span class="film__v"><img src="assets/films/${f.slug}.webp" alt="" width="540" height="960" loading="lazy"><video muted playsinline loop preload="none" data-src="assets/films/${f.slug}-loop.mp4"></video>
        <span class="film__play">▶ ${t('films.sound')}</span></span>
        <span class="film__c">${esc(f.name)}<i>${f.len}</i></span></button>`).join('');
    $$('.film').forEach(b => { const v = b.querySelector('video');
      const on = () => { if (RM || innerWidth <= 900) return; if (!v.src) v.src = v.dataset.src; v.play().then(() => b.classList.add('playing')).catch(() => {}); };
      const off = () => { v.pause(); b.classList.remove('playing'); };
      b.addEventListener('mouseenter', on); b.addEventListener('mouseleave', off); b.addEventListener('focus', on); b.addEventListener('blur', off); });
  }
  const P = $('#player'), PV = $('#pvideo');
  let lastFilm = null;
  $('#reel').addEventListener('click', e => { const b = e.target.closest('.film'); if (!b) return; lastFilm = b; P.setAttribute('aria-label', b.querySelector('.film__c').firstChild.textContent); PV.src = `assets/films/${b.dataset.f}.mp4`; P.hidden = false; document.body.style.overflow = 'hidden'; inert(true); PV.play().catch(() => {}); $('#pclose').focus(); });
  const closeP = () => { PV.pause(); PV.removeAttribute('src'); P.hidden = true; document.body.style.overflow = ''; inert(false); if (lastFilm) lastFilm.focus(); };
  $('#pclose').addEventListener('click', closeP); P.addEventListener('click', e => { if (e.target === P) closeP(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!P.hidden) closeP(); else if (cur !== null) closeCase(); }
    if (cur !== null && e.key === 'ArrowRight') $('#v-next').click(); if (cur !== null && e.key === 'ArrowLeft') $('#v-prev').click(); });

  /* ---------- services ---------- */
  function renderSvc() {
    $('#svc').innerHTML = X.services.map(s => `<li class="rv"><span class="svc__k">${s.key}<em>${esc(L === 'zh' ? tr(s.title) : tr(s.title).toLowerCase())}</em></span>
      <span class="svc__d">${esc(tr(s.medium))}${L === 'zh' ? '' : ' '}${esc(tr(s.ed))}${L === 'zh' ? '。' : '.'}</span><a class="svc__a tl" href="${X.wa}?text=${s.key}" target="_blank" rel="noopener">${fill(t('svc.wa'), { k: s.key })}</a></li>`).join('');
    $('#how').innerHTML = (X.process || []).map((s, i) => `<li class="rv"><span class="how__n">${N2(i + 1)}</span><b>${esc(tr(s.t))}</b><span>${esc(tr(s.b))}</span></li>`).join('');
  }

  /* ---------- contact: the form writes the WhatsApp message ---------- */
  function waText() { const g = id => $(id).value.trim(), need = ($('input[name=need]:checked') || {}).value || 'BRAND';
    const lines = [need, fill(t('c.msg.hi'), { name: g('#c-name') ? fill(t('c.msg.name'), { n: g('#c-name') }) : '' })];
    if (g('#c-what')) lines.push(fill(t('c.msg.sell'), { w: g('#c-what') }));
    lines.push(t('c.msg.' + need));
    $('#c-send').href = 'https://wa.me/60125272682?text=' + encodeURIComponent(lines.join('\n')); }
  $('#cform').addEventListener('input', waText); $('#cform').addEventListener('change', waText); $('#cform').addEventListener('submit', e => e.preventDefault());

  /* ---------- try it: examples + note ---------- */
  let lastBrand = null;
  const EX = { en: [['kaya toast', 'Old Town'], ['lash studio', 'Market Street'], ['strength gym', 'Riverside'], ['boutique hotel', 'Hill Road'], ['florist', 'Harbour Lane']],
    zh: [['咖椰吐司', '老城区'], ['美睫', '市场街'], ['健身房', '河畔'], ['精品酒店', '山路'], ['花店', '海港巷']] };
  const inPlace = w => w ? (L === 'zh' ? '在' + w : ' in ' + w) : '';
  function noteFor(b) { const wa = $('#trywa');
    let head = '';
    if (b) { const nm = b.zhName ? b.name + ' ' + b.zhName : b.name, m = L === 'zh' ? b.word.zh : b.word.en, same = b.name === b.word.w;
      head = L === 'zh' ? (same ? `${nm}：${m}。` : `${nm}：${b.word.w}，${m}。`) : (same ? `${nm}: ${m}.` : `${nm.replace(/\.$/, '')}. ${b.word.w}: ${m}.`); }
    $('#trynote').textContent = b ? fill(t('try.made'), { head, inplace: inPlace(b.where) }) : t('try.empty');
    wa.hidden = !b; if (b) { wa.textContent = t('try.send'); const typed = L === 'zh' ? (b.where ? b.where + '的' : '') + b.what : b.what + (b.where ? ' in ' + b.where : ''); wa.href = 'https://wa.me/60125272682?text=' + encodeURIComponent(fill(t('try.wa'), { typed, name: b.zhName ? b.name + ' ' + b.zhName : b.name })); } }
  function renderEx() { const ex = EX[L] || EX.en;
    $('#tryex').innerHTML = `<span>${t('try.or')}</span>` + ex.map(([w, p], i) => `<button type="button" data-x="${i}">${esc(L === 'zh' ? p + '的' + w : w + ' in ' + p)}</button>`).join('');
    $('#what').placeholder = ex[0][0]; $('#where').placeholder = ex[0][1]; }
  $('#tryex').addEventListener('click', e => { const b = e.target.closest('button[data-x]'); if (!b) return; const [w, p] = (EX[L] || EX.en)[+b.dataset.x]; $('#what').value = w; $('#where').value = p; paint(w, p, true); });

  /* ---------- try it: the name painted on a dusk shopfront (AI-made plates) ---------- */
  const hash = s => { let h = 2166136261; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const hex2 = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lum = h => { const [r, g, b] = hex2(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const mix = (a, b, t) => '#' + hex2(a).map((v, i) => Math.round(v + (hex2(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');
  const PLATES = {
    shophouse: { r: [268, 329, 669, 124], f: 400, how: 'paint', pad: .2 }, industrial: { r: [330, 162, 493, 198], f: 300, how: 'paint', pad: .2, padX: 50 },
    glass: { r: [88, 42, 1040, 212], f: 300, how: 'print', pad: .22 }, awning: { r: [52, 282, 1100, 68], f: 380, how: 'canvas', pad: .14 },
    wall: { r: [330, 340, 480, 130], f: 470, how: 'raised', pad: .1 }, boutique: { r: [178, 145, 872, 150], f: 330, how: 'paint', pad: .24 } };
  const PLATE_FOR = { coffee: 'shophouse', bakery: 'shophouse', food: 'shophouse', drinks: 'shophouse', beauty: 'glass', salon: 'glass', clinic: 'glass', fitness: 'industrial', tech: 'glass', trades: 'shophouse', laundry: 'glass',
    fashion: 'boutique', jewelry: 'boutique', retail: 'boutique', education: 'boutique', hotel: 'wall', property: 'wall', florist: 'awning', pet: 'awning' };
  /* Latin keywords match at the start of a word (so 'repair' no longer contains 'air'); Chinese keywords match anywhere */
  const hasKw = (s, w) => /[\u3400-\u9fff]/.test(w) ? s.includes(w) : new RegExp('(^|[^a-z\u00c0-\u024f])' + w.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(s);
  function detect(what) { const s = ' ' + what.toLowerCase() + ' '; let best = null, sc = 0; B.categories.forEach(c => { let k = 0; c.kw.forEach(w => { if (hasKw(s, w)) k += w.length; }); if (k > sc) { sc = k; best = c; } }); return best || B.categories.find(c => c.id === 'retail'); }
  const loaded = new Set();
  function loadFont(f) { if (!loaded.has(f.q)) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=' + f.q + '&display=swap'; document.head.appendChild(l); loaded.add(f.q); }
    return Promise.race([document.fonts.load(`${f.dw} 60px "${f.d}"`).catch(() => {}), new Promise(r => setTimeout(r, 1500))]); }
  /* 中文 mode: a second, Chinese line on the board, as on most bilingual shop signs (word meaning + shop noun) */
  const ZHN = { trades: '车行', laundry: '洗衣', coffee: '茶室', bakery: '饼家', food: '餐室', drinks: '茶饮', beauty: '美肌', salon: '美发', clinic: '诊所', fitness: '健身', fashion: '服饰', jewelry: '珠宝', hotel: '旅舍', property: '置业', education: '学苑', pet: '宠物', florist: '花坊', tech: '工作室', retail: '商行' };
  const ZHNAME = {"Spanar":"扳手车行","Gear":"齿轮维修","Tukang":"师傅维修","Torque":"扭力车行","Pit Stop":"快修站","Bolt & Co.":"螺丝维修","Laju":"快手维修","Fixed":"修好了","Second Life":"重生维修","Bersih":"干净洗衣","Fresh Fold":"暖叠洗衣","Bilas":"清水洗衣","Spin":"转转洗衣","Wangi":"香香洗衣","Suds":"泡泡洗衣","Sunday Wash":"周日洗衣","Crisp":"挺括干洗","Shine":"亮晶洗车","Pagi": "早晨茶室", "Tarik": "拉茶茶室", "Ember": "余温咖啡", "Five-Foot": "五脚基茶室", "Halia": "姜记茶室", "Crema": "金沫咖啡", "Lantern": "灯笼茶室", "Sunday Grind": "周日咖啡", "Gula": "糖记饼家", "Mentega": "牛油饼家", "Rise": "发酵烘焙", "Crumb": "面包心", "Pandan": "香兰饼家", "Santan": "椰浆甜品", "Oven Lane": "后巷烘焙", "Golden Hour": "出炉时光", "Flour & Fold": "酥皮坊", "Api": "火记餐室", "Wok Hei": "镬气小厨", "Rempah": "香料厨房", "Lorong": "小巷美食", "Kuali": "大镬小厨", "Daun": "叶子植物", "Pasar": "巴刹美食", "Sambal Club": "叁巴馆", "Second Plate": "再来一碟", "Teh": "茶记", "Ais": "冰室", "Selasih": "珍珠籽茶饮", "Fizz": "气泡饮", "Tall Glass": "大杯茶饮", "Dew": "露珠茶饮", "Pour": "倾茶", "Tide": "潮饮", "Leaf & Ice": "茶与冰", "Embun": "晨露护肤", "Seri": "光彩美肌", "Lune": "月光护肤", "Halus": "细腻美肌", "Kulit": "肌本护肤", "Mira": "惊艳美肌", "Pure Hour": "纯净时光", "Bloom": "绽放美肌", "Dewdrop": "一滴精华", "Sikat": "梳子发廊", "Gloss": "光泽美研", "Velvet": "丝绒美研", "Halo": "光环发艺", "Snip": "一剪发艺", "Mane": "秀发馆", "Polish Room": "指尖美甲", "Lash & Co.": "美睫社", "Rambut": "秀发发廊", "Sihat": "健康诊所", "Senyum": "微笑诊所", "Tenang": "安心诊所", "Pulse": "脉搏诊所", "Baik": "善心诊所", "Well & Co.": "安康诊所", "Molar": "臼齿牙科", "Plus One": "家庭诊所", "Waras": "健全诊所", "Kuat": "强壮健身", "Tempa": "锻造健身", "Grit": "韧劲健身", "Rep": "再来一下健身", "Stance": "站姿健身", "Monsoon": "季风健身", "Iron & Co.": "铁馆", "Lompat": "跳跃健身", "Core": "核心健身", "Kain": "布坊", "Benang": "线坊", "Jahit": "缝衣坊", "Selvedge": "布边服饰", "Pleat": "一褶服饰", "Loom": "织机服饰", "Corak": "花纹服饰", "Weft": "纬线服饰", "Hem": "收边裁缝", "Emas": "金铺", "Permata": "宝石珠宝", "Kilau": "闪耀珠宝", "Lustre": "光泽珠宝", "Karat": "足金金铺", "Facet": "切面珠宝", "Heirloom": "传家珠宝", "Keepsake": "珍藏礼品", "Bintang": "星辰珠宝", "Rumah": "家旅舍", "Singgah": "歇脚旅舍", "Teduh": "荫凉客栈", "Jendela": "窗边旅舍", "Hujan": "雨屋", "Courtyard": "天井客栈", "Lantern House": "留灯旅舍", "Dusk": "黄昏旅舍", "Anchor": "停泊旅舍", "Sora": "天空置业", "Tapak": "地基置业", "Ruang": "空间设计", "Atap": "屋顶置业", "Tingkat": "楼层置业", "Beam": "梁柱设计", "Lumen": "光感室内", "Haven": "安居置业", "Plot & Co.": "一方地产", "Ilmu": "知识学苑", "Pintar": "聪明学苑", "Tunas": "嫩芽学苑", "Akar": "根基学苑", "Kite": "风筝学堂", "Chalk": "粉笔学堂", "Next Page": "下一页学苑", "Bright": "光明学苑", "Kelas": "课室学苑", "Waggle": "摇尾宠物", "Ekor": "尾巴宠物", "Bulu": "毛孩宠物", "Biskut": "饼干宠物", "Fetch": "接球宠物", "Purr": "呼噜猫舍", "Sniff": "嗅嗅宠物", "Good Boy": "乖乖宠物", "Kucing": "猫舍", "Bunga": "花坊", "Kelopak": "花瓣花坊", "Taman": "花园", "Melati": "茉莉花坊", "Kantan": "火炬姜花坊", "Stem": "一枝花坊", "Bloom Room": "花房", "Fern & Co.": "蕨类植物", "Arah": "方向顾问", "Jambatan": "桥梁科技", "Simpul": "结点科技", "Kompas": "指南针顾问", "Ledger": "账本会计", "Signal": "信号科技", "Northline": "北线科技", "Relay": "接力物流", "Pilot": "领航顾问", "Kedai": "小店", "Laku": "好卖商行", "Sudut": "角落商店", "Rak": "货架商行", "Corner & Co.": "路口小店", "Daily": "日常商店", "Goods & Co.": "好物商行", "Basket": "菜篮商店", "Borong": "批发商行"};
  const zhNameFor = (w, cat) => { if (w.w === 'Daun') return cat.id === 'florist' ? '叶子植物' : '蕉叶餐室'; if (ZHNAME[w.w]) return ZHNAME[w.w]; const m = (w.zh || '').match(/“([^”]{1,4})”/); return m ? m[1] + (ZHN[cat.id] || '') : ''; };
  function brand(what, where, force) {
    const cat = (force && B.categories.find(c => c.id === force)) || detect(what), base = hash(what.trim().toLowerCase() + '|' + where.trim().toLowerCase()), r = rng(base);
    /* salons cover hair, nails and lashes: keep the name on-topic */
    const q = what.toLowerCase(), SUBW = /nail|美甲|指甲/.test(q) ? ['Polish Room', 'Gloss', 'Velvet'] : /lash|brow|睫|眉/.test(q) ? ['Lash & Co.', 'Velvet', 'Gloss'] : /hair|barber|salon|发|剪/.test(q) ? ['Sikat', 'Halo', 'Snip', 'Mane', 'Rambut', 'Gloss'] : null;
    const pool = cat.id === 'salon' && SUBW ? cat.words.filter(x => SUBW.includes(x.w)) : cat.words;
    const w = pick(r, pool.length ? pool : cat.words), name = (/\s|&/.test(w.w) || r() > .45) ? w.w : `${w.w} ${pick(r, cat.nouns)}`;
    const pals = B.palettes.filter(p => p.moods.some(m => cat.moods.includes(m))), pal = pick(rng(base * 3), pals.length ? pals : B.palettes);
    const fns = B.fonts.filter(f => f.moods.some(m => cat.moods.includes(m))), font = pick(rng(base * 11), fns.length ? fns : B.fonts);
    const rm = rng(base * 7), mark = MK.build(pick(rm, cat.motifs), pick(rm, ['circle', 'arch', 'seal', 'shield', 'tag', 'none']), 'knock');
    return { cat, name, word: w, pal, font, mark, what: what.trim(), where: where.trim(), zhName: L === 'zh' ? zhNameFor(w, cat) : '' };
  }
  function plate(b) {
    const key = PLATE_FOR[b.cat.id] || 'boutique', Pl = PLATES[key], [x, y, w, h] = Pl.r, p = b.pal, uid = 'u' + Math.floor(Math.random() * 1e6);
    const dark = [p.ink, p.accent, p.bg, p.pop].sort((a, c) => lum(a) - lum(c))[0], ink = lum(dark) > .3 ? '#1d1a17' : dark, markC = lum(p.accent) < .32 ? p.accent : ink;
    const pad = h * Pl.pad, ms = h - 2 * pad, padX = Pl.padX || pad, tx = x + padX + ms + (w - 2 * padX - ms) / 2, raised = Pl.how === 'raised';
    const caps = ['Big Shoulders Display', 'Italiana', 'Lexend Zetta', 'Unbounded', 'Archivo Black'].includes(b.font.d);
    const style = `font-family:'${b.font.d}',serif;font-weight:${b.font.dw};font-size:${h * .5}px;${caps ? 'text-transform:uppercase;letter-spacing:.06em;' : ''}`;
    const metal = mix(mix(p.accent, '#2a2118', .55), '#000000', .15);
    const filt = { paint: '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.6"/><feGaussianBlur stdDeviation=".45"/>',
      print: '<feGaussianBlur stdDeviation=".35"/>', canvas: '<feTurbulence type="fractalNoise" baseFrequency=".012 .09" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="3"/><feGaussianBlur stdDeviation=".4"/>',
      raised: '<feGaussianBlur stdDeviation=".3"/>' }[Pl.how];
    const two = !!b.zhName, ty = two ? y + h * .4 : y + h / 2, st = two ? style.replace(`font-size:${h * .5}px`, `font-size:${h * .4}px`) : style;
    const zh = fillc => two ? `<text class="pz" x="${tx}" y="${y + h * .78}" text-anchor="middle" dominant-baseline="central" fill="${fillc}" style="font-family:'Noto Serif SC',serif;font-weight:600;font-size:${h * .2}px;letter-spacing:.18em">${[...b.zhName].map(c => `<tspan class="lt">${esc(c)}</tspan>`).join('')}</text>` : '';
    const text = fillc => `<text class="pn" x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="central" fill="${fillc}" style="${st}">${[...b.name].map(c => `<tspan class="lt">${esc(c)}</tspan>`).join('')}</text>` + zh(fillc);
    const mk = c => `<svg x="${x + padX}" y="${y + pad}" width="${ms}" height="${ms}" viewBox="0 0 100 100"><path fill="${c}" fill-rule="evenodd" d="${b.mark.d}"/></svg>`;
    const art = raised ? `<g style="mix-blend-mode:multiply" opacity=".42" filter="url(#${uid}s)" transform="translate(0 ${-h * .05})">${mk('#000')}${text('#000')}</g><g class="on" filter="url(#${uid}f)">${mk(`url(#${uid}m)`)}${text(`url(#${uid}m)`)}</g>`
      : `<g class="on" style="mix-blend-mode:multiply" opacity=".92" filter="url(#${uid}f)">${mk(markC)}${text(ink)}</g>`;
    return { key, Pl, svg: `<svg viewBox="0 0 1200 896" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(b.name)} painted on a shopfront at dusk">
      <defs><filter id="${uid}f" x="-5%" y="-20%" width="110%" height="140%">${filt}</filter><filter id="${uid}s"><feGaussianBlur stdDeviation="${h * .025}"/></filter>
      <linearGradient id="${uid}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(metal, '#000000', .25)}"/><stop offset="1" stop-color="${mix(metal, '#ffd9a0', .35)}"/></linearGradient></defs>
      <image href="assets/plates/${key}.webp" width="1200" height="896"/>${art}</svg>` };
  }
  function frame(svg, f) { const box = $('#stage').getBoundingClientRect(), Ar = box.width / Math.max(1, box.height); let vw = 1200, vh = 1200 / Ar, vx = 0, vy;
    if (vh > 896) { vh = 896; vw = 896 * Ar; vx = (1200 - vw) / 2; vy = 0; } else vy = Math.max(0, Math.min(896 - vh, f - vh / 2)); svg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`); }
  async function paint(what, where, animate, force) {
    const b = brand(what, where, force); await loadFont(b.font);
    const out = plate(b); $('#stage').innerHTML = out.svg; const svg = $('#stage svg'); frame(svg, out.Pl.f);
    const [, , w, h] = out.Pl.r, pad = h * out.Pl.pad, padX = out.Pl.padX || pad, avail = w - 2 * padX - (h - 2 * pad) - padX * .6;
    $$('#stage .pn').forEach(t => { try { const len = t.getComputedTextLength(); if (len > avail) t.style.fontSize = (parseFloat(t.style.fontSize) * avail / len).toFixed(1) + 'px'; } catch (e) {} });
    lastBrand = b; noteFor(b); readAs(b);
    if (animate && innerWidth <= 900) { const st = $('#stage'); if (st.getBoundingClientRect().top < 0 || st.getBoundingClientRect().top > innerHeight * .4) st.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
    if (animate && A && !RM) { anime({ targets: '#stage .lt', opacity: [0, 1], duration: 90, delay: anime.stagger(70, { start: 300 }), easing: 'linear' }); anime({ targets: '#stage image', opacity: [.4, 1], duration: 1400, easing: 'easeOutQuad' }); }
    window.__frame = () => frame(svg, out.Pl.f);
  }
  /* 'Read as': the guessed kind of shop, which the visitor can correct */
  function readAs(b) { const box = $('#tryas'); if (!b) { box.hidden = true; return; } box.hidden = false;
    box.innerHTML = `<label>${esc(t('try.as'))} <select id="trycat">${B.categories.map(c => `<option value="${c.id}"${c.id === b.cat.id ? ' selected' : ''}>${esc(tr(c.label))}</option>`).join('')}</select></label>`;
    $('#trycat').addEventListener('change', e => paint(b.what, b.where, true, e.target.value)); }
  $('#tryform').addEventListener('submit', e => { e.preventDefault(); const w = $('#what').value.trim(); if (!w) { $('#what').focus(); return; } paint(w, $('#where').value.trim(), true); });
  addEventListener('resize', () => window.__frame && window.__frame());
  // first view: the shopfront with its board still blank; nothing is painted until the visitor types
  (function blank() { $('#stage').innerHTML = `<svg viewBox="0 0 1200 896" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A shophouse at dusk with a blank signboard"><image href="assets/plates/shophouse.webp" width="1200" height="896"/></svg>`;
    const svg = $('#stage svg'); frame(svg, PLATES.shophouse.f); window.__frame = () => frame(svg, PLATES.shophouse.f);
    noteFor(null); })();


  /* ---------- apply language ---------- */
  /* touch screens can't 'point': swap in the tap / swipe wording */
  if (matchMedia('(hover: none)').matches) { const ip = document.querySelector('[data-t="index.p"]'), hh = document.querySelector('[data-t="hall.hint"]'); if (ip) ip.dataset.t = 'index.pt'; if (hh) hh.dataset.t = 'hall.hintt'; const fp = document.querySelector('[data-t="films.p"]'); if (fp) fp.dataset.t = 'films.pt'; }
  function applyLang() {
    document.documentElement.lang = L === 'zh' ? 'zh-Hans' : 'en';
    $$('[data-t]').forEach(el => { const v = T[el.dataset.t]; if (v) el.textContent = tr(v); });
    $$('[data-th]').forEach(el => { const v = T[el.dataset.th]; if (v) el.innerHTML = tr(v); });
    $('#c-what').placeholder = t('c.ph.what'); $$('.nav__wa, .mnav__foot .btn, .foot__cols a[href^="https://wa.me"]').forEach(a => a.href = 'https://wa.me/60125272682?text=' + encodeURIComponent(t('wa.hi'))); { const mb = document.getElementById('menu'), mn = document.getElementById('mnav'); if (mb && mn) mb.querySelector('span').textContent = t(mn.hidden ? 'nav.menu' : 'nav.close'); }
    renderThree(); renderRows(); renderFilms(); renderSvc(); renderEx(); noteFor(lastBrand); waText();
    point(0); if (cur !== null) openCase(cur, true);
    document.dispatchEvent(new Event('xs:lang'));
    $$('.rv').forEach(el => { if (getComputedStyle(el).opacity === '0' && el.dataset.seen) el.style.opacity = 1; });
  }
  $('#lang').addEventListener('click', () => { L = L === 'en' ? 'zh' : 'en'; try { localStorage.setItem('xs-lang', L); } catch (e) {} applyLang(); $$('.rv').forEach(el => el.style.opacity = 1); });
  applyLang();

  /* ---------- nav ---------- */
  const nav = $('#nav'); addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > innerHeight * .6 || !$('#mnav').hidden), { passive: true });

  /* ---------- phones: section menu ---------- */
  const MB = $('#menu'), MN = $('#mnav');
  function menu(open) { if (open === !MN.hidden) return; MN.hidden = !open; MB.setAttribute('aria-expanded', String(open)); MB.querySelector('span').textContent = t(open ? 'nav.close' : 'nav.menu');
    document.body.style.overflow = open ? 'hidden' : ''; nav.classList.toggle('solid', open || scrollY > innerHeight * .6); document.documentElement.classList.toggle('menu-open', open);
    if (open) { $('#mnav a').focus({ preventScroll: true }); if (A && !RM) anime({ targets: '#mnav .mnav__links a, #mnav .mnav__foot > *', opacity: [0, 1], translateY: [18, 0], delay: anime.stagger(55), duration: 700, easing: EASE }); }
    else MB.focus({ preventScroll: true }); }
  MB.addEventListener('click', () => menu(MN.hidden));
  MN.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !MN.hidden) menu(false); });
  addEventListener('resize', () => { if (innerWidth > 900 && !MN.hidden) menu(false); });

  /* ---------- slow, cinematic motion ---------- */
  function boot() {
    const els = $$('.rv');
    if (!A || RM || !('IntersectionObserver' in window)) { els.forEach(el => el.style.opacity = 1); return; }
    anime.timeline({ easing: EASE })
      .add({ targets: '.hero__portrait img', opacity: [0, 1], scale: [1.06, 1], filter: ['brightness(.2)', 'brightness(1)'], duration: 2400 })
      .add({ targets: '.hero__h', opacity: [0, 1], translateY: [24, 0], duration: 1500 }, 600)
      .add({ targets: '.hero__h em', color: ['#EFE8DC', '#C9AD7E'], duration: 1600 }, 1300)
      .add({ targets: ['.hero__sub', '.hero__body', '.hero__act', '.hero__reply'], opacity: [0, 1], translateY: [16, 0], duration: 1300, delay: anime.stagger(180) }, 1300)
      .add({ targets: '.hero__cap', opacity: [0, 1], duration: 1200 }, 1900);
    /* safety net: if animation frames are paused (background tab, slow phone), show everything anyway */
    setTimeout(() => { $$('.rv').forEach(el => { if (getComputedStyle(el).opacity === '0') el.style.opacity = 1; });
      ['.hero__portrait img', '.hero__h', '.hero__sub', '.hero__body', '.hero__act', '.hero__reply', '.hero__cap'].forEach(sel => $$(sel).forEach(el => { if (+getComputedStyle(el).opacity < .99) { el.style.opacity = 1; el.style.transform = 'none'; el.style.filter = 'none'; } })); }, 4500);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && A) anime.running.forEach(a => a.seek(a.duration)); }, { once: true });
    const io = new IntersectionObserver(es => { const vis = es.filter(e => e.isIntersecting).map(e => e.target); if (!vis.length) return; vis.forEach(el => { io.unobserve(el); el.dataset.seen = 1; });
      anime({ targets: vis, opacity: [0, 1], translateY: [12, 0], duration: 700, delay: anime.stagger(60), easing: EASE }); }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });
    els.forEach(el => io.observe(el));
    new MutationObserver(() => $$('.rv').forEach(el => { if (!el.dataset.obs) { el.dataset.obs = 1; io.observe(el); } })).observe(document.body, { childList: true, subtree: true });
    const once = (el, fn, th = .25) => { if (!el) return; const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { o.disconnect(); fn(); } }, { threshold: th }); o.observe(el); };
    $$('.feat').forEach(f => f.style.opacity = 0);
    once($('#three-row'), () => anime({ targets: '.feat', opacity: [0, 1], translateY: [14, 0], duration: 800, delay: anime.stagger(90), easing: EASE }), 0);
    setTimeout(() => $$('.feat').forEach(f => { f.style.opacity = 1; f.style.transform = 'none'; }), 5000);
    const w = $('#footword'); w.innerHTML = w.innerHTML.replace(/>([^<]+)</g, (m, s) => '>' + [...s].map(c => c === ' ' ? ' ' : `<span class="ch">${c}</span>`).join('') + '<');
    $$('#footword .ch').forEach(c => { c.style.transform = 'translateY(60%)'; c.style.opacity = 0; });
    once($('#foot'), () => anime({ targets: '#footword .ch', translateY: ['60%', '0%'], opacity: [0, 1], duration: 1300, delay: anime.stagger(55), easing: EASE }), .2);
    setTimeout(() => {}, 0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
