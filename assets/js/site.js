/* Melvin Pang · CV site. Vanilla JS + Anime.js v4 (motion only). */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  if (window.__rvT) { clearTimeout(window.__rvT); }
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var motion = root.classList.contains('motion');

  /* ---------------- copy ---------------- */
  var ZH = {
    title: 'Melvin Pang · 行政与运营经理 · 简历',
    skip: '跳到正文', markL: 'Melvin Pang，回到顶部', navL: '页面导航', langL: '语言',
    n1: '简介', n2: '成果', n3: '履历', n4: '作品', n5: '联系', n6: '工作信息',
    cvNav: '简历', menu: '目录', menuClose: '关闭', cta1: '下载简历', cta2: '联系我',
    eyebrow: '即可到岗 · 2026 年简历',
    role: '行政与运营经理',
    lead: '工作十五年，近十年在马来西亚、柬埔寨及东南亚负责运营、团队与物业管理。曾以 <strong>80 万美元开设两间办公室</strong>，为<strong>约 1,000 名员工负责人事与薪资</strong>，并在 <strong>200 多个物业规模下坚持 15 分钟内响应</strong>。',
    l1k: '求职方向', l1v: '行政经理、运营经理或设施经理',
    l2k: '目标地区', l2v: '马来西亚 · 柬埔寨 · 新西兰（需雇主担保 AEWV 工作签证）',
    l3k: '常驻', l3v: '柬埔寨金边 · 马来西亚籍 · 持有柬埔寨工作准证',
    portraitA: 'Melvin Pang 倚靠着拼出 MELVIN 的白色字母方块', otrK: '工作之外', otrH: '周末，<wbr>留给开阔的<wbr>水面和公路。', otrP: '钓鱼教会我耐心：先读懂环境，别急着收线。骑车教会我判断力，以及在压力下保持冷静。这两样，我都带到了工作里。', rideC: '在路上', fishC: '周末在水上', rideA: '日落时分，Melvin 骑着摩托车停在山路上', fishA: 'Melvin 在湖边钓鱼', plate1: 'Melvin Pang，金边', plate2: '15 年 · 6 个国家',
    pEy: '简介',
    pText: '过去五年，管理层有事最先交代给我：员工档案、外籍员工工作准证、高层差旅，以及<em>下一间办公室的预算。</em>在此之前，我全面负责一间度假村的损益，并管理一个超过 200 个物业的短租组合。我用中英文工作，指令传达不走样。',
    rEy: '成果', rH: '四项可以佐证的成果', rP: '每个数字的细节与推荐人，面试时均可提供。',
    did: '我做了什么', res: '结果',
    r1u: '个工作日因准证过期而损失', r1t: '150 多名外籍员工，每份准证都按时续签', r1m: '区域贸易集团 · 柬埔寨 · 2021–26',
    r1d: '用续签追踪表管理每一份工作准证和签证，提前约 60 天预警，并负责向主管部门递交申请。',
    r1r: '四年里，150 多名外籍员工中没有一人因准证过期损失过一个工作日。约 1,000 名员工的薪资每一期都按时发放。',
    n800: '80 万美元', n15: '15 分钟', r2u: '两间办公室的资本预算', r2t: '两间办公室按预算、按时开业', r2m: '菲律宾 2022 · 新加坡 2024–25',
    r2d: '负责选址与租约谈判，统筹装修；规划办公室与员工宿舍的平面布局并配置家具，设备与采购一路跟进至开业当天。',
    r2r: '两间办公室均按预算、按时开业，资本预算分别为 30 万美元和 50 万美元。',
    r3u: '全天候事件响应', r3t: '每起突发事件 15 分钟内响应', r3m: 'GOGOTEL Hospitality · 巴生谷 · 2016–19',
    r3d: '带领 10–20 人的运营团队，负责入住、退房、清洁周转以及清洁与安保标准，并担任客人、业主与现场团队的 24 小时应急联系人。',
    r3r: '三年半里，每一起突发事件都在 15 分钟内响应；同期物业组合从不到 100 个增长到 200 多个。',
    r4u: '平均入住率', r4t: '全面负责损益的精品度假村', r4m: 'The Acres Resort · Prunus Hotels · 马来西亚 · 2019–21',
    r4d: '制定预算，负责收入与成本，并在 Cloudbeds、Booking.com、Agoda、Expedia 和 Traveloka 上管理房价与分销，带领 7 个部门共 20 名员工。',
    r4r: '平均入住率 80% 以上；2020–21 年封锁停业期间，物业持续维护并完成升级。',
    eEy: '履历', eH: '十五年，<em>按时间排列。</em>', eP: '雇主名称与推荐人可应要求提供。',
    e1t: '人事招聘与行政经理', e1o: '区域贸易集团，约 1,000 名员工 · 柬埔寨、菲律宾、新加坡 · 名称可应要求提供',
    e1x: '2024 年起兼任视觉营销团队负责人',
    e1a: '第一年：负责约 1,000 名员工的全部人事与行政。之后四年作为唯一的人事业务伙伴：招聘（每年约 30 人）、薪资、考核、工作准证与机密档案。',
    e1b: '开设菲律宾（2022）和新加坡（2024–25）办公室，从选址一直负责到开业当天。',
    e1c: '管理公司车队、资产登记、营业执照与保险；每周向创始人汇报，并管理每月逾 5 万美元的运营资金。',
    e1d: '负责 2025 年越南公司大会，约 1,000 人出席，按预算完成，未出现重大事故。',
    e1e: '2024 年起带领 2–3 人的视觉营销团队：双语产品推广、印刷品、品牌视频，以及一个 AI 辅助搭建的客户网站。',
    e1f: '借助 AI 工具，对照中文母本审核七语种技术出版物，付印前发现整页缺失。',
    e2t: '总经理', e2o: 'The Acres Resort · Prunus Hotels · 马来西亚',
    e2a: '全面管理 15 房度假村，直接向业主汇报。',
    e2b: '负责 Cloudbeds、Booking.com、Agoda、Expedia 和 Traveloka 的房价与分销。',
    e2c: '承办婚礼与企业活动；人手不足时亲自下厨房、做客房。',
    e3t: '运营经理', e3o: 'GOGOTEL Hospitality · 马来西亚巴生谷',
    e3a: '负责短租物业组合的日常运营，是客人、团队与业主的 24 小时应急联系人。',
    e3b: '清洁与安保标准、人事、销售、财务、PMS 与线上订房渠道。',
    e4t: '早期职位', e4o: '销售、Apple 专员、IT 支持、行政、印刷主管',
    show: '展开五个职位', hide: '收起职位',
    e4a: '主管，Oug Print（2014–2015）：印刷排期、人手、质量、招聘与考核。',
    e4b: '行政，Mong Fook（2014）：库存记录与送货单。',
    e4c: '技术支持，Machines，Apple 优质经销商（2013–2014）。',
    e4d: 'Apple 销售专员，Harvey Norman（2012–2013）：产品演示与经销团队培训。',
    e4e: '销售主管，Challenger IT Megastore（2009–2011）。',
    e5y: '教育', e5t: 'SPM 马来西亚教育文凭，SMK Sri Sentosa，2010',
    e5o: 'Apple Champion Program，Apple 马来西亚，2013 · 2025 年起自学 AI 视觉创作与网站搭建',
    e5a: '工具：Excel（薪资模型）· Google Workspace · Cloudbeds PMS · Booking.com、Agoda、Expedia · Premiere Pro · CapCut · ChatGPT · Claude · Google Flow',
    dEy: '工作信息', dH: '工作信息',
    d1k: '语言', lgEn: '英文', lgZhSr: '普通话', lgZh: '普通话', lgMs: '马来文', lgYue: '粤语', pro: '专业水平', con: '日常沟通',
    d2k: '工作身份', d2v: '马来西亚公民，持有柬埔寨工作准证。新西兰职位需由认证雇主担保 AEWV（Accredited Employer Work Visa）工作签证。',
    d3k: '目标职位', d3v: '行政经理 · 运营经理 · 设施 / 办公环境经理 · 人事行政经理',
    d4k: '到岗时间', d4v: '即可到岗，可接受迁居。',
    d5k: '经手事务', d5v: '资金 · 人事 · 贵宾行程安排 · 机密文件',
    d6k: '工作足迹', d6v: '柬埔寨 · 菲律宾 · 新加坡 · 越南 · 马来西亚 · 泰国',
    d7v: '工作之外：钓鱼与骑摩托车。',
    wEy: '创意作品', wH: '另一半：<br><em>视觉也是我做的。</em>', wHint: '用鼠标或手指划过它。',
    film: '预告', p1t: 'Xavier Studio · 宣传片', p1m: '导演 · 8 秒预告', p2t: 'AURACELL · 产品影片', p2m: '导演 · AI 画面 · 6 秒预告',
    p3t: 'AURACELL · 落地页', p3m: '护肤品上市网站', p4t: 'AI 叙事系列', p4m: '导演 · Google Flow、ChatGPT', p4n: '4 帧',
    p5t: 'OLAFI · 品牌识别', p5m: '品牌概念', p5n: '2 张', p6t: '这个网站', p6m: '设计与搭建 · AI 辅助编程', p6n: '你正在看',
    prevP: '上一个作品', nextP: '下一个作品', prevL: '上一张', nextL: '下一张', closeL: '关闭',
    audL: '以谁的角度看', audH: '会改变标题、成果顺序和 WhatsApp 开场语。', aHR: 'HR / 招聘', aF: '创始人', aC: '创意', aK: '客户', wP: '2024 年起我同时负责视觉营销：双语推广、品牌影片和 AI 搭建的网站。点开任意作品查看完整内容。',
    v1L: 'Xavier Studio 宣传片', v2L: 'AURACELL 护肤品产品影片', play: '播放', pause: '暂停',
    w1: 'Xavier Studio · 宣传片', w1s: 'Melvin 导演并剪辑',
    w2: 'AURACELL · 产品影片', w2s: '护肤品上市影片 · Melvin 导演，AI 生成画面',
    w3: 'AURACELL · 落地页', w3s: '护肤品上市网站', siteA: 'AURACELL 护肤品落地页',
    w4: 'AI 叙事系列', w4s: '在多镜头故事中保持角色与场景一致', aiA: 'AI 关键帧：圆形木构大厅中，两个相同的男孩站在黑色水池旁',
    cEy: '联系', cH: '正在招聘行政或运营人才？<em>这周就可以聊。</em>',
    cP: '常驻金边，即可到岗，可接受迁居。中文、英文、马来文或粤语联系都可以。',
    newtab: '（在新标签页打开）', k2: '电话（柬埔寨）', k3: '电邮', k4: '微信', copy: '复制', copied: '已复制微信号：',
    b1: '下载简历 PDF', b2: '保存联系人',
    f1: 'Melvin Pang · 简历 · 2026 年 10 月更新', f2: '雇主名称与推荐人可应要求提供。', f3: '回到顶部',
    wa: 'Melvin 你好，我看了你的简历，想和你聊聊一个职位，这周什么时候方便？',
    cv: 'assets/Melvin-Pang-CV-zh.pdf', vidErr: '此浏览器无法播放该视频，请换用其他浏览器。'
  };
  var ENX = {
    title: doc.title, hide: 'Hide the roles', menuClose: 'Close', vidErr: 'This browser could not play the video. Try another browser.', pause: 'Pause', copied: 'WeChat ID copied: ',
    wa: 'Hi Melvin, I saw your CV and would like to talk about a role. When are you free this week?',
    cv: 'assets/Melvin-Pang-CV.pdf'
  };
  var AUD = {
    en: {
      hr: { tag: 'HR and admin for 1,000 people. <em>Already done.</em>',
        lead: 'Fifteen years of work, the last ten running operations, people and properties across Malaysia, Cambodia and Southeast Asia. I opened <strong>two offices on US$800,000</strong>, ran <strong>HR and payroll for about 1,000 staff</strong>, and kept <strong>200+ properties on a 15&#8209;minute response</strong>.',
        cH: 'Hiring for administration or operations? <em>Let’s talk this week.</em>',
        wa: 'Hi Melvin, I saw your CV and would like to talk about a role. When are you free this week?',
        order: ['permits', 'offices', 'phone', 'resort'] },
      founder: { tag: 'Why hire four when you can hire one? <em>HR, admin, operations and visuals, with no hand-offs between them.</em>',
        lead: 'Five years as the founder’s right hand at a ~1,000-person group: <strong>two offices opened on US$800,000</strong>, <strong>funds, VIPs and confidential files</strong>, and <strong>weekly reporting in Mandarin and English</strong>. Before that, a resort with full P&amp;L.',
        cH: 'Need a right hand who runs the place? <em>Let’s talk this week.</em>',
        wa: 'Hi Melvin, I saw your CV and would like to talk about working together directly. When are you free this week?',
        order: ['offices', 'permits', 'resort', 'phone'] },
      creative: { tag: 'An operator who <em>art-directs.</em>',
        lead: 'I run operations and I make the visuals: <strong>bilingual campaigns</strong>, <strong>brand films</strong> and <strong>AI-built sites</strong>, delivered on schedule because I also run the logistics.',
        cH: 'Want creative that ships on time? <em>Let’s talk.</em>',
        wa: 'Hi Melvin, I saw your creative work and would like to talk about a role on our team.',
        role: 'Operations Manager · Visual marketing lead', eyebrow: 'Available now · Portfolio and CV 2026', l1v: 'Operations roles with a creative remit', cta2: 'See the work', see: 1,
        order: ['offices', 'resort', 'phone', 'permits'] },
      client: { tag: 'Why hire four when you can hire one? <em>HR, admin, operations and visuals, with no hand-offs between them.</em>',
        lead: 'Office fit-outs, events for <strong>1,000 guests</strong>, launch films and landing pages: <strong>scoped, budgeted and checked twice</strong>. Based in Phnom Penh, working across Southeast Asia.',
        cH: 'Have a project in mind? <em>Send the brief.</em>',
        wa: 'Hi Melvin, I have a project I would like to brief you on. Can we talk?',
        role: 'Operations lead · Creative direction', eyebrow: 'Available now · Roles and projects', l1k: 'Services', l1v: 'Office set-up · Events · Brand films · Landing pages', cta1: 'Send a brief', cta2: 'See the work', brief: 1, see: 1,
        order: ['offices', 'phone', 'resort', 'permits'] }
    },
    zh: {
      hr: { tag: '一千人的人事行政，<em>已经做过。</em>',
        lead: '工作十五年，近十年在马来西亚、柬埔寨及东南亚负责运营、团队与物业管理。曾以 <strong>80 万美元开设两间办公室</strong>，为<strong>约 1,000 名员工负责人事与薪资</strong>，并在 <strong>200 多个物业规模下坚持 15 分钟内响应</strong>。',
        cH: '正在招聘行政或运营人才？<em>这周就可以聊。</em>',
        wa: 'Melvin 你好，我看了你的简历，想和你聊聊一个职位，这周什么时候方便？' },
      founder: { tag: '何必请四个人？<em>人事、行政、运营、视觉，一个人负责，中间零交接。</em>',
        lead: '五年来在约 1,000 人的集团担任创始人的左右手：<strong>以 80 万美元开设两间办公室</strong>，经手<strong>资金、贵宾行程安排与机密文件</strong>，并<strong>每周以中英文汇报</strong>。在此之前，全面负责一间度假村的损益。',
        cH: '需要一位能把事情管好的左右手？<em>这周就可以聊。</em>',
        wa: 'Melvin 你好，我看了你的简历，想和你聊聊直接合作的机会，这周什么时候方便？' },
      creative: { tag: '会做<em>艺术指导</em>的运营人。',
        lead: '我管运营，也做视觉：<strong>双语推广</strong>、<strong>品牌影片</strong>和 <strong>AI 搭建的网站</strong>。因为后勤也是我在管，所以准时交付。',
        cH: '想要准时交付的创意？<em>聊聊吧。</em>',
        wa: 'Melvin 你好，看了你的创意作品，想和你聊聊我们团队的职位。',
        role: '运营经理 · 视觉营销负责人', eyebrow: '即可到岗 · 作品集与简历 2026', l1v: '兼具创意职责的运营岗位', cta2: '查看作品' },
      client: { tag: '何必请四个人？<em>人事、行政、运营、视觉，一个人负责，中间零交接。</em>',
        lead: '办公室装修、上千人的活动、上市影片与落地页：<strong>先定范围和预算，再检查两遍</strong>。常驻金边，服务东南亚。',
        cH: '有项目想合作？<em>把需求发过来。</em>',
        wa: 'Melvin 你好，我有一个项目想和你沟通，方便聊聊吗？',
        role: '运营统筹 · 创意指导', eyebrow: '即可到岗 · 全职与项目合作', l1k: '服务', l1v: '办公室筹建 · 活动 · 品牌影片 · 落地页', cta1: '发送需求', cta2: '查看作品' }
    }
  };
  var EN = {};
  $$('[data-i]').forEach(function (el) { var k = el.dataset.i; if (!(k in EN)) EN[k] = el.innerHTML; });
  $$('[data-ia]').forEach(function (el) { EN[el.dataset.ia] = el.getAttribute('aria-label'); });
  $$('[data-ialt]').forEach(function (el) { EN[el.dataset.ialt] = el.getAttribute('alt'); });
  Object.keys(ENX).forEach(function (k) { EN[k] = ENX[k]; });

  var lang = /(^|[#\/&,])zh($|[\/&,])/.test(location.hash) ? 'zh' : 'en';
  var DEFAULT_AUD = 'founder', aud = DEFAULT_AUD;
  (location.hash || '').replace('#', '').split(/[\/&,]/).forEach(function (p) { if (AUD.en[p]) aud = p; });
  function writeHash() {
    var h = []; if (aud !== DEFAULT_AUD) h.push(aud); if (lang === 'zh') h.push('zh'); if (typeof vw !== 'undefined' && vw && vw.open) h.push(PROJECTS[cur.p].id);
    try { history.replaceState(null, '', location.pathname + location.search + (h.length ? '#' + h.join('/') : '')); } catch (e) {}
  }
  function A2(k) { var a = AUD[lang][aud], b = AUD.en[aud]; return a[k] != null ? a[k] : b[k]; }
  function t(k) { var d = lang === 'zh' ? ZH : EN; return d[k] != null ? d[k] : EN[k]; }

  function applyLang() {
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    doc.title = t('title');
    $$('[data-i]').forEach(function (el) { var v = t(el.dataset.i); if (v != null && el.innerHTML !== v) el.innerHTML = v; });
    $$('[data-ia]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.ia)); });
    $$('[data-ialt]').forEach(function (el) { el.setAttribute('alt', t(el.dataset.ialt)); });
    $$('[data-cv]').forEach(function (a) { a.setAttribute('href', t('cv')); });

    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    syncDetails(); syncVideos(); applyAud(false);
    if (typeof vw !== 'undefined' && vw && vw.open) renderSlide(0);
    if (mb && mb.getAttribute('aria-expanded') === 'true') { var ml = $('[data-i="menu"]', mb); if (ml) ml.textContent = t('menuClose'); }
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; applyLang(); writeHash();
    });
  });

  /* ---------------- reading-as (audience) ---------------- */
  var seg = $('.seg'), pill = $('.seg-pill'), tagEl = $('[data-a="tag"]');
  function placePill() {
    if (!seg || !pill) return;
    var b = $('button[aria-pressed="true"]', seg); if (!b) return;
    pill.style.width = b.offsetWidth + 'px'; pill.style.height = b.offsetHeight + 'px';
    pill.style.transform = 'translate(' + b.offsetLeft + 'px,' + b.offsetTop + 'px)';
    seg.classList.add('ready');
  }
  function swapTag(html, animateIt) {
    if (!tagEl) return;
    if (!animateIt || !root.classList.contains('motion') || !window.anime || !window.anime.animate) { tagEl.innerHTML = html; return; }
    var A = window.anime;
    A.animate(tagEl, { opacity: [1, 0], duration: 140, ease: 'inQuad', onComplete: function () {
      tagEl.innerHTML = html;
      A.animate(tagEl, { opacity: [0, 1], duration: 320, ease: 'outQuad' });
    } });
  }
  function applyAud(animateIt) {
    var a = AUD.en[aud];
    $$('.seg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.aud === aud)); });
    placePill();
    var lead = $('[data-a="lead"]'); if (lead) lead.innerHTML = A2('lead');
    var ch = $('[data-a="cH"]'); if (ch) ch.innerHTML = A2('cH');
    swapTag(A2('tag'), animateIt);
    // role, first ledger line and hero CTAs follow the reader
    ['eyebrow', 'role', 'l1k', 'l1v', 'l2v', 'cta1', 'cta2'].forEach(function (k) {
      var el = $('.hero [data-i="' + k + '"]'); if (!el) return;
      var v = AUD[lang][aud][k] != null ? AUD[lang][aud][k] : (AUD.en[aud][k] != null && lang === 'en' ? AUD.en[aud][k] : t(k));
      if (el.innerHTML !== v) el.innerHTML = v;
    });
    var ca = $('#cta-a'), cb = $('#cta-b');
    if (ca) {
      if (AUD.en[aud].brief) { ca.href = 'https://wa.me/60125272682?text=' + encodeURIComponent(A2('wa')); ca.removeAttribute('download'); ca.target = '_blank'; ca.rel = 'noopener'; }
      else { ca.href = t('cv'); ca.setAttribute('download', ''); ca.removeAttribute('target'); ca.removeAttribute('rel'); }
    }
    if (cb) cb.href = AUD.en[aud].see ? '#work' : '#contact';
    $$('[data-wa]').forEach(function (l) { l.href = 'https://wa.me/60125272682?text=' + encodeURIComponent(A2('wa')); });
    var list = $('.results');
    if (list) a.order.forEach(function (k) { var li = $('[data-case="' + k + '"]', list); if (li) list.appendChild(li); });
    // creative and client readers see the portfolio straight after the profile
    var work = $('#work'), prof = $('#profile'), exp = $('#experience');
    if (work && prof && exp) {
      var early = aud === 'creative' || aud === 'client';
      if (early && prof.nextElementSibling !== work) prof.after(work);
      if (!early && exp.nextElementSibling !== work) exp.after(work);
    }
    var nl = $('.links'); if (nl) { var wl = $('a[href="#work"]', nl), rl = $('a[href="#results"]', nl), dl = $('a[href="#details"]', nl);
      if (wl && rl && dl) { if (aud === 'creative' || aud === 'client') rl.parentNode.before(wl.parentNode); else dl.parentNode.before(wl.parentNode); } }
  }
  $$('.seg button').forEach(function (b) {
    b.addEventListener('click', function () { if (b.dataset.aud === aud) return; aud = b.dataset.aud; applyAud(true); writeHash(); });
  });
  window.addEventListener('resize', placePill, { passive: true });
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(placePill);

  /* ---------------- details label ---------------- */
  var det = $('#earlier');
  function syncDetails() { if (!det) return; var s = $('summary [data-i]', det); if (s) s.textContent = det.open ? t('hide') : stripTags(t('show')); }
  function stripTags(h) { var d = doc.createElement('div'); d.innerHTML = h; return d.textContent; }
  if (det) det.addEventListener('toggle', syncDetails);

  /* ---------------- video ---------------- */
  function syncVideos() {
    $$('.vp').forEach(function (b) {
      var v = doc.getElementById(b.getAttribute('aria-controls')); var lab = $('[data-i="play"]', b);
      if (v && lab) lab.textContent = v.paused ? t('play') : t('pause');
      b.setAttribute('aria-pressed', String(!!(v && !v.paused)));
    });
  }
  $$('.vp').forEach(function (b) {
    var v = doc.getElementById(b.getAttribute('aria-controls'));
    if (!v) return;
    b.addEventListener('click', function () {
      if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function (err) { if (err && err.name !== 'AbortError') say(t('vidErr')); }); } else { v.pause(); }
    });
    v.addEventListener('play', syncVideos); v.addEventListener('pause', syncVideos); v.addEventListener('error', function () { say(t('vidErr')); });
    v.addEventListener('click', function () { b.click(); });
  });

  /* ---------------- portfolio viewer ---------------- */
  var L = function (o) { return typeof o === 'string' ? o : (o[lang] || o.en); };
  var PROJECTS = [
    { id: 'xavier', t: { en: 'Xavier Studio · reel', zh: 'Xavier Studio · 宣传片' }, m: { en: 'Direction · 8-second teaser', zh: '导演 · 8 秒预告' },
      b: { en: 'A short reel for Xavier Studio, my design studio, showing three landing pages in motion. I directed it.', zh: '为我的设计工作室 Xavier Studio 制作的短片，动态展示三个落地页。由我导演。' },
      s: [{ v: 'assets/video/xavier-reel.mp4', p: 'assets/img/xavier-reel-poster.webp', w: 360, h: 640, c: { en: 'Studio reel, vertical format for social.', zh: '工作室宣传片，竖版社交媒体格式。' } }] },
    { id: 'auracell-film', t: { en: 'AURACELL · product film', zh: 'AURACELL · 产品影片' }, m: { en: 'Direction · AI footage · 6-second teaser', zh: '导演 · AI 画面 · 6 秒预告' },
      b: { en: 'A launch film for the AURACELL skincare range. I directed it; the footage was generated with AI tools.', zh: 'AURACELL 护肤系列的上市影片。由我导演，画面由 AI 工具生成。' },
      s: [{ v: 'assets/video/auracell-film.mp4', p: 'assets/img/auracell-film-poster.webp', w: 854, h: 480, c: { en: 'Product film, 16:9.', zh: '产品影片，16:9。' } }] },
    { id: 'auracell-site', t: { en: 'AURACELL · landing page', zh: 'AURACELL · 落地页' }, m: { en: 'Skincare launch site', zh: '护肤品上市网站' },
      b: { en: 'The landing page for the AURACELL skincare launch, built to carry the same look as the film.', zh: 'AURACELL 护肤品上市的落地页，与影片保持同一视觉风格。' },
      s: [{ i: 'assets/img/auracell-site.webp', w: 1040, h: 528, a: { en: 'AURACELL landing page, hero section', zh: 'AURACELL 落地页首屏' }, c: { en: 'Hero section.', zh: '首屏。' } }] },
    { id: 'narrative', t: { en: 'AI narrative series', zh: 'AI 叙事系列' }, m: { en: 'Direction · Google Flow, ChatGPT', zh: '导演 · Google Flow、ChatGPT' },
      b: { en: 'A multi-shot story where characters, sets and props stay consistent from shot to shot, which is the hard part of AI video.', zh: '一个多镜头故事，角色、场景和道具在每个镜头之间保持一致，这正是 AI 视频最难的部分。' },
      s: [
        { i: 'assets/img/ai-keyframe.webp', w: 1376, h: 768, a: { en: 'Two identical boys beside a black pool in a circular timber hall', zh: '圆形木构大厅中，两个相同的男孩站在黑色水池旁' }, c: { en: 'Keyframe: same set, same characters, every shot.', zh: '关键帧：同一场景、同一角色，每一个镜头。' } },
        { i: 'assets/img/ai-ceremony.webp', w: 1376, h: 768, a: { en: 'An elderly official raises a bronze mirror before a boy', zh: '一位年长官员在男孩面前举起铜镜' }, c: { en: 'Scene: the mirror ceremony, the story’s turning point.', zh: '场景：铜镜仪式，故事的转折点。' } },
        { i: 'assets/img/ai-character.webp', w: 1376, h: 768, a: { en: 'Character reference sheet', zh: '角色设定图' }, c: { en: 'Character reference: face, hair and costume locked across shots.', zh: '角色设定：脸、发型与服装在各镜头保持一致。' } },
        { i: 'assets/img/ai-prop.webp', w: 1356, h: 763, a: { en: 'An oxidised bronze mirror', zh: '氧化的铜镜' }, c: { en: 'Prop study: the bronze mirror, aged before it appears.', zh: '道具设计：铜镜在出场前先做旧。' } }
      ] },
    { id: 'olafi', t: { en: 'OLAFI · identity', zh: 'OLAFI · 品牌识别' }, m: { en: 'Brand concept', zh: '品牌概念' },
      b: { en: 'A black-and-gold identity concept and the system visual that carries it.', zh: '黑金品牌识别概念，以及承载它的体系视觉。' },
      s: [
        { i: 'assets/img/olafi-debut.webp', w: 1200, h: 896, a: { en: 'OLAFI debut visual, black and gold', zh: 'OLAFI 首发视觉，黑金配色' }, c: { en: 'Debut visual: black-and-gold identity concept.', zh: '首发视觉：黑金品牌识别概念。' } },
        { i: 'assets/img/olafi-system.webp', w: 1200, h: 680, a: { en: 'OLAFI system visual', zh: 'OLAFI 体系视觉' }, c: { en: 'System visual: participation, reinforcement, settlement.', zh: '体系视觉：参与、强化、结算。' } }
      ] },
    { id: 'site', t: { en: 'This website', zh: '这个网站' }, m: { en: 'Design and build · AI-assisted code', zh: '设计与搭建 · AI 辅助编程' },
      b: { en: 'Designed and built with AI-assisted code: layouts from GetLayers compositions, Anime.js motion, a full-screen portfolio viewer, a “Reading as” switch that re-orders the page for each reader, English and Chinese, light and dark themes, and a print-ready CV.', zh: '借助 AI 编程设计并搭建：版式来自 GetLayers 构图、Anime.js 动效、全屏作品查看器、按读者重新排列页面的“以谁的角度看”切换、中英双语、明暗主题，以及可直接打印的简历。' },
      s: [
        { i: 'assets/img/site-hero.webp', w: 1440, h: 900, a: { en: 'Screenshot of this website’s opening screen', zh: '本网站首屏截图' }, c: { en: 'Opening screen, with the “Reading as” switch.', zh: '首屏，含“以谁的角度看”切换。' } },
        { i: 'assets/img/site-work.webp', w: 1440, h: 900, a: { en: 'Screenshot of the portfolio grid', zh: '作品集网格截图' }, c: { en: 'The portfolio grid. Every piece opens full screen.', zh: '作品集网格，每件作品都可全屏查看。' } }
      ] }
  ];
  var vw = $('#viewer'), vwMedia = vw && $('.vw-media', vw), cur = { p: 0, s: 0 }, opener = null;
  function renderSlide(dir) {
    var P = PROJECTS[cur.p], S = P.s[cur.s];
    $$('video', vwMedia).forEach(function (v) { v.pause(); });
    vwMedia.innerHTML = '';
    var el;
    if (S.v) {
      el = doc.createElement('video'); el.src = S.v; el.poster = S.p; el.controls = true; el.loop = true; el.muted = true; el.playsInline = true;
      el.setAttribute('playsinline', ''); el.width = S.w; el.height = S.h; el.setAttribute('aria-label', L(P.t));
      el.addEventListener('error', function () { say(t('vidErr')); });
      vwMedia.appendChild(el);
      var pr = el.play(); if (pr && pr.catch) pr.catch(function () {});
    } else {
      el = doc.createElement('img'); el.src = S.i; el.width = S.w; el.height = S.h; el.alt = L(S.a); el.decoding = 'async';
      vwMedia.appendChild(el);
    }
    $('#vw-title').textContent = L(P.t);
    writeHash();
    $('.vw-meta', vw).textContent = L(P.m);
    $('.vw-brief', vw).textContent = L(P.b);
    $('.vw-cap', vw).textContent = L(S.c);
    $('.vw-count', vw).textContent = (lang === 'zh' ? '作品 ' : 'Project ') + (cur.p + 1) + ' / ' + PROJECTS.length + (P.s.length > 1 ? (lang === 'zh' ? ' · 第 ' + (cur.s + 1) + ' / ' + P.s.length + ' 张' : ' · image ' + (cur.s + 1) + ' of ' + P.s.length) : '');
    var many = P.s.length > 1; $('.vw-prev', vw).hidden = !many; $('.vw-next', vw).hidden = !many;
    if (root.classList.contains('motion') && window.anime && window.anime.animate) {
      window.anime.animate(el, { opacity: [0, 1], translateX: [dir ? dir * 24 : 0, 0], scale: [dir ? 1 : 0.97, 1], duration: 650, ease: 'outExpo' });
    }
  }
  function openViewer(id, btn) {
    if (!vw || !vw.showModal) return;
    cur.p = Math.max(0, PROJECTS.findIndex(function (x) { return x.id === id; })); cur.s = 0; opener = btn || null;
    vw.showModal(); doc.body.style.overflow = 'hidden';
    if (!projFromHash()) { try { history.pushState({ vw: 1 }, '', location.pathname + location.search + location.hash); pushed = true; } catch (e) {} }
    renderSlide(0);
    var c = $('.vw-close', vw); if (c) c.focus();
  }
  var pushed = false;
  function closeViewer() { if (vw && vw.open) vw.close(); }
  if (vw) {
    vw.addEventListener('close', function () { if (pushed) { pushed = false; history.back(); } else setTimeout(writeHash, 0); $$('video', vwMedia).forEach(function (v) { v.pause(); }); vwMedia.innerHTML = ''; doc.body.style.overflow = ''; if (opener) opener.focus(); });
    vw.addEventListener('click', function (e) { if (e.target === vw) closeViewer(); });
    $('.vw-close', vw).addEventListener('click', closeViewer);
    function step(d) { var P = PROJECTS[cur.p]; cur.s = (cur.s + d + P.s.length) % P.s.length; renderSlide(d); }
    function proj(d) { cur.p = (cur.p + d + PROJECTS.length) % PROJECTS.length; cur.s = 0; renderSlide(d); }
    $('.vw-prev', vw).addEventListener('click', function () { step(-1); });
    $('.vw-next', vw).addEventListener('click', function () { step(1); });
    $('.vw-pp', vw).addEventListener('click', function () { proj(-1); });
    $('.vw-np', vw).addEventListener('click', function () { proj(1); });
    vw.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); if (PROJECTS[cur.p].s.length > 1 && cur.s < PROJECTS[cur.p].s.length - 1) step(1); else proj(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (PROJECTS[cur.p].s.length > 1 && cur.s > 0) step(-1); else proj(-1); }
    });
    var sx = null;
    vw.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    vw.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) { var d = dx < 0 ? 1 : -1; if (PROJECTS[cur.p].s.length > 1) step(d); else proj(d); } }, { passive: true });
  }
  $$('.tile[data-proj]').forEach(function (b) { b.addEventListener('click', function () { openViewer(b.dataset.proj, b); }); });
  function projFromHash() { var id = null; (location.hash || '').replace('#', '').split(/[\/&,]/).forEach(function (p) { if (PROJECTS.some(function (x) { return x.id === p; })) id = p; }); return id; }
  function openFromHash() { var id = projFromHash(); if (!id) { if (vw && vw.open) { pushed = false; closeViewer(); } return; } var b = $('.tile[data-proj="' + id + '"]'); if (vw && vw.open) { cur.p = PROJECTS.findIndex(function (x) { return x.id === id; }); cur.s = 0; renderSlide(0); } else openViewer(id, b); }
  window.addEventListener('hashchange', openFromHash);
  window.addEventListener('popstate', openFromHash);

  /* ---------------- copy + toast ---------------- */
  var toast = $('#toast'), tt;
  function say(m, inv) {
    if (vw && vw.open) { var cap = $('.vw-cap', vw); if (cap) { cap.textContent = m; } return; }
    toast.style.background = inv ? 'var(--inv-ink)' : ''; toast.style.color = inv ? 'var(--inv)' : ''; toast.textContent = m; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 2600); }
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.dataset.copy, msg = t('copied') + v, inv = !!b.closest('.inv');
      function legacy() { var ta = doc.createElement('textarea'); ta.value = v; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; doc.body.appendChild(ta); ta.select(); var ok = false; try { ok = doc.execCommand('copy'); } catch (e) {} doc.body.removeChild(ta); b.focus(); say(ok ? msg : 'WeChat: ' + v, inv); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(function () { say(msg, inv); }, legacy);
      else legacy();
    });
  });

  /* ---------------- nav: scrolled state, active section, mobile menu ---------------- */
  var nav = $('#nav');
  var prog = $('.prog');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
    var hero = doc.getElementById('top'); if (hero) nav.classList.toggle('on-stage', hero.getBoundingClientRect().bottom > nav.offsetHeight);
    if (prog) { var m = doc.documentElement.scrollHeight - window.innerHeight; prog.style.transform = 'scaleX(' + (m > 0 ? Math.min(1, window.scrollY / m) : 0).toFixed(4) + ')'; }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var links = $$('.links a, .menu a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = '#' + e.target.id;
        links.forEach(function (a) { if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['profile', 'results', 'experience', 'details', 'work', 'contact', 'top'].forEach(function (id) { var s = doc.getElementById(id); if (s) io.observe(s); });
  }

  var mb = $('.menu-btn'), menu = $('#menu');
  function setMenu(open) { menu.classList.toggle('open', open); mb.setAttribute('aria-expanded', String(open)); var l = $('[data-i="menu"]', mb); if (l) l.textContent = open ? t('menuClose') : stripTags(t('menu')); }
  if (mb && menu) {
    mb.addEventListener('click', function () { var o = mb.getAttribute('aria-expanded') !== 'true'; setMenu(o); if (o) { var f = $('a', menu); if (f) f.focus(); } });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mb.getAttribute('aria-expanded') === 'true') { setMenu(false); mb.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1000) setMenu(false); });
    doc.addEventListener('click', function (e) { if (mb.getAttribute('aria-expanded') === 'true' && !menu.contains(e.target) && !mb.contains(e.target)) setMenu(false); });
    menu.addEventListener('focusout', function (e) { var n = e.relatedTarget; if (n && !menu.contains(n) && !mb.contains(n)) setMenu(false); });
  }

  // skip link: move focus into main
  var skip = $('.skip');
  if (skip) skip.addEventListener('click', function () { var m = $('#main'); if (m) setTimeout(function () { m.focus({ preventScroll: true }); }, 0); });

  applyLang();
  setTimeout(openFromHash, 0);

  /* ---------------- print: full CV, recruiter version ---------------- */
  var printState = null;
  window.addEventListener('beforeprint', function () {
    root.classList.add('rv-all');
    printState = { aud: aud, open: det ? det.open : false };
    if (det) det.open = true;
    if (aud !== 'hr') { aud = 'hr'; applyAud(false); }
  });
  window.addEventListener('afterprint', function () {
    if (!printState) return;
    if (det) det.open = printState.open;
    if (printState.aud !== aud) { aud = printState.aud; applyAud(false); }
    printState = null;
  });

  /* ---------------- motion ---------------- */
  // Hero intro runs in CSS (no wait on JS). Anime.js drives below-the-fold reveals and is
  // loaded after the page has painted, so it never sits on the critical path.
  if (!motion) return;
  var pending = $$('[data-rv]').filter(function (el) { return !el.closest('.hero'); });
  var fallback = setTimeout(function () { root.classList.add('rv-all'); }, 6000);
  function loadAnime(cb) {
    if (window.anime && window.anime.animate) return cb();
    var sc = doc.createElement('script'); sc.src = 'assets/js/anime.min.js'; sc.async = true;
    sc.onload = cb; sc.onerror = function () { root.classList.add('rv-all'); };
    doc.head.appendChild(sc);
  }
  function startReveals() {
    var A = window.anime; if (!A || !A.animate) { root.classList.add('rv-all'); return; }
    clearTimeout(fallback);
    var animate = A.animate, stagger = A.stagger, EASE = 'outExpo';
    var queue = [], raf = 0;
    function flush() {
      raf = 0; var batch = queue.splice(0); if (!batch.length) return;
      animate(batch, { opacity: [{ to: 1, duration: 380, ease: 'outQuad' }], translateY: [{ from: 22, to: 0, duration: 900, ease: EASE }], delay: stagger(70) });
    }
    if (!('IntersectionObserver' in window)) { root.classList.add('rv-all'); return; }
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { queue.push(e.target); rio.unobserve(e.target); } });
      if (queue.length && !raf) raf = requestAnimationFrame(flush);
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    pending.forEach(function (el) { rio.observe(el); });
  }
  function go() { loadAnime(startReveals); }
  if (doc.readyState === 'complete') go(); else window.addEventListener('load', go);

})();
