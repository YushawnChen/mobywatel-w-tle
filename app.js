/* mObywatel „W tle” – prototyp koncepcyjny. Wszystkie dane są fikcyjne. */
'use strict';
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(r => setTimeout(r, reduced ? Math.min(ms, 120) : ms));

  /* ---------------- ikony ---------------- */
  const sv = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    m: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 46V22h7l1 3.4C24.4 23 27.6 21 31 21s5.8 1.4 7 4.4C40.4 23 43.6 21 47 21c5.6 0 8 3.4 8 9v16h-8V31.6c0-2.4-1.1-3.6-3.2-3.6-2 0-4 1.2-5.3 3.2V46h-8V31.6c0-2.4-1.1-3.6-3.2-3.6-2 0-4 1.2-5.3 3.2V46z" fill="#fff"/></svg>',
    check: sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    chev: sv('<path d="M9 6l6 6-6 6"/>'),
    id: sv('<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h4M14.5 13.5h3"/>'),
    car: sv('<path d="M5 16v2.5M19 16v2.5M3.5 16h17v-3.6c0-.6-.2-1.1-.5-1.6L18 8c-.4-.6-1-1-1.8-1H7.8c-.8 0-1.4.4-1.8 1L4 10.8c-.3.5-.5 1-.5 1.6z"/><path d="M7 12.6h.01M17 12.6h.01"/>'),
    coins: sv('<ellipse cx="12" cy="6.5" rx="7" ry="2.8"/><path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5"/>'),
    shield: sv('<path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/><path d="M9 12l2 2 4-4"/>'),
    alert: sv('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>'),
    bank: sv('<path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'),
    camera: sv('<path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/>'),
    mic: sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>'),
    clock: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    list: sv('<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>'),
    sliders: sv('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
    sun: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'),
    heart: sv('<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>'),
    undo: sv('<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>'),
    lock: sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    speaker: sv('<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/>'),
    user: sv('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.9-3.5 3.7-5.5 7-5.5s6.1 2 7 5.5"/>'),
    phone: sv('<path d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 005.5 5.5l1.5-2 4.5 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5.5a2 2 0 012-2z"/>'),
    sparkle: sv('<path d="M12 3.5l1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>'),
    x: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
    xs: sv('<circle cx="12" cy="12" r="8.5"/><path d="M9 9l6 6M15 9l-6 6"/>'),
    pin: sv('<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0113 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    flame: sv('<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.8-5.2 3.6-8.4 1.9 1.2 2.6 3 2.6 4.6 1-.6 1.6-1.8 1.7-3 2 1.6 4.1 4.2 4.1 6.8 0 3.2-2.4 5.6-6 5.6z"/>'),
    face: sv('<path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2"/><path d="M9 9.5v1M15 9.5v1M12 9.5v3.5h-1M9.5 15.5c1.4 1.2 3.6 1.2 5 0"/>'),
    ff: sv('<path d="M4 6l7 6-7 6zM13 6l7 6-7 6z"/>'),
    cal: sv('<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>'),
    map: sv('<path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2z"/><path d="M9 4v14M15 6v14"/>'),
    photo: sv('<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9.5" r="1.6"/><path d="M20 15l-4.5-4.5L6 20"/>'),
    msg: sv('<path d="M20 12c0 4.1-3.6 7-8 7-1.2 0-2.4-.2-3.4-.6L4 20l1.3-3.6C4.5 15.1 4 13.6 4 12c0-4.1 3.6-7 8-7s8 2.9 8 7z"/>'),
    mail: sv('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4 7l8 6 8-6"/>'),
    globe: sv('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z"/>'),
    note: sv('<path d="M6 4h12v16H6z"/><path d="M9 9h6M9 13h6M9 17h3"/>'),
    plane: sv('<path d="M10.5 13.5L4 11l1.5-1.5 7 1L16 7c1-1 2.5-1.4 3-.9s.1 2-.9 3l-3.5 3.5 1 7L14 21l-2.5-6.5L8 18v2.5L6.5 22 5 19l-3-1.5L3.5 16H6z"/>')
  };

  /* ---------------- dane ---------------- */
  const OLA = { name: 'Aleksandra Kowalczyk', short: 'Ola', pesel: '900315•••••', addr: 'ul. Zielna 8/3, 31-000 Kraków', docNo: 'DKR 482913' };
  const LOG0 = [
    { id: 'l5', day: '24 listopada', time: '3:14', ic: 'heart', c: '#ff2d55', t: 'Karta EKUZ przedłużona do 2031 roku', d: 'Stara kończyła się w grudniu. Nowa jest już w mObywatelu.', src: 'NFZ', auto: true, rule: 'odnowienia' },
    { id: 'l4', day: '24 listopada', time: '3:12', ic: 'bank', c: '#5856d6', t: 'Nowy adres w urzędzie skarbowym', d: 'Nie musisz składać formularza aktualizacyjnego.', src: 'Rejestr PESEL → Krajowa Administracja Skarbowa', auto: true, rule: 'adres' },
    { id: 'l3', day: '24 listopada', time: '3:12', ic: 'car', c: '#ff9500', t: 'Nowy adres w rejestrze pojazdów', d: 'Twoja Skoda ma już nowy adres właściciela. Nie musisz iść do wydziału komunikacji.', src: 'Rejestr PESEL → CEPiK', auto: true, rule: 'adres' },
    { id: 'l2', day: '20 listopada', time: '18:21', ic: 'clock', c: '#34c759', t: 'Przypomnienie o OC ustawione', d: 'OC Skody kończy się 12 maja. Przypomnimy 14 dni wcześniej.', src: 'Ubezpieczeniowy Fundusz Gwarancyjny', auto: true, rule: 'terminy' },
    { id: 'l1', day: '20 listopada', time: '18:20', ic: 'pin', c: '#007aff', t: 'Zameldowałaś się w nowym mieszkaniu', d: 'Potwierdziłaś Face ID. Właściciel potwierdził w swojej aplikacji.', src: 'Rejestr PESEL', you: true }
  ];
  const RULES = [
    { id: 'adres', t: 'Nowy adres w innych urzędach', d: 'Po zameldowaniu przekazujemy adres do CEPiK, urzędu skarbowego i NFZ.' },
    { id: 'odnowienia', t: 'Odnawianie bezpłatnych dokumentów', d: 'Np. karta EKUZ. Bez opłat i bez nowych danych.' },
    { id: 'terminy', t: 'Przypomnienia o terminach', d: 'OC, przegląd, ważność dokumentów Twoich i dzieci.' },
    { id: 'podatki', t: 'Roczne zeznanie podatkowe', d: 'Przygotowujemy PIT z danych, które urząd już ma.' },
    { id: 'platnosci', t: 'Płatności i mandaty', d: 'Zawsze pytamy. Nie da się tego zautomatyzować.', locked: true },
    { id: 'dane', t: 'Udostępnianie danych firmom', d: 'Zawsze pytamy, co i komu. Każda zgoda jest jednorazowa.', locked: true }
  ];
  const OPTS = [['samo', 'Samo'], ['zapytaj', 'Zapytaj'], ['wylacz', 'Wyłącz']];
  const LIVE = [null,
    { title: 'Wniosek o dowód przyjęty', sub: 'Urząd Miasta Krakowa sprawdza dane', step: 1, short: 'Przyjęty' },
    { title: 'Nowy dowód jest drukowany', sub: 'Zwykle trwa to do 2 tygodni', step: 2, short: 'W druku' },
    { title: 'Dowód gotowy do odbioru', sub: 'Wybierz godzinę wizyty', step: 3, short: 'Gotowy' },
    { title: 'Odbiór jutro o 10:20', sub: 'Urząd Miasta Krakowa · bez numerka', step: 3, short: 'Jutro 10:20' },
    { title: 'Jesteś w kolejce', sub: 'Przed Tobą 2 osoby · ok. 6 min', step: 4, short: 'A12 · 2 os.', num: 'A12' },
    { title: 'Twoja kolej', sub: 'Podejdź do stanowiska 4', step: 4, short: 'Stanowisko 4', num: '4', go: true },
    { title: 'Dowód odebrany', sub: 'Stary dowód jest już unieważniony', step: 5, short: 'Gotowe', done: true }
  ];
  const STEP_LBL = ['Wniosek', 'Druk', 'Odbiór', 'Gotowe'];

  Object.assign(I, {
    lockOpen: sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 017.7-1.5"/>'),
    back: sv('<path d="M15 5l-7 7 7 7"/>'),
    gear: sv('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>'),
    wallet: sv('<rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="M3.5 10h17M16 14.5h1.5"/>'),
    music: sv('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),
    book: sv('<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5"/>'),
    folder: sv('<path d="M3.5 7a2 2 0 012-2h4l2 2.5h7a2 2 0 012 2V17a2 2 0 01-2 2h-13a2 2 0 01-2-2z"/>'),
    store: sv('<path d="M8.5 17l4-10M15.5 17l-1.6-4M6 13.5h12"/>'),
    users: sv('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.7-3 2.8-4.7 5.5-4.7s4.8 1.7 5.5 4.7"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16 14.4c2.2.2 3.8 1.7 4.4 4.6"/>'),
    info: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>'),
    checkc: sv('<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>'),
    circle: sv('<circle cx="12" cy="12" r="8.5"/>'),
    send: sv('<path d="M12 19V5M6 11l6-6 6 6"/>'),
    bell: sv('<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20.5h4"/>'),
    file: sv('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>'),
    target: sv('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
    trophy: sv('<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H5a3 3 0 003 3M16 6h3a3 3 0 01-3 3M12 13v4M8.5 20h7M10 17h4"/>')
  });

  /* kolory kategorii (iOS) */
  const CI = { id: '#d4213d', camera: '#d4213d', car: '#ff9500', bank: '#5856d6', shield: '#ff3b30', alert: '#ff3b30', coins: '#34c759', wallet: '#34c759',
    heart: '#ff2d55', pin: '#007aff', clock: '#30b0c7', plane: '#007aff', bell: '#ff9500', sun: '#ff9500', checkc: '#34c759', check: '#34c759',
    x: '#ff3b30', circle: '#c7c7cc', mic: '#af52de', sparkle: '#af52de', list: '#8e8e93', sliders: '#5856d6', undo: '#ff9500', cal: '#ff3b30',
    lock: '#8e8e93', user: '#8e8e93', users: '#34c759', phone: '#34c759', msg: '#34c759', mail: '#007aff', file: '#007aff', gear: '#8e8e93', info: '#007aff', face: '#34c759' };

  /* ---------------- stan świata ---------------- */
  const fresh = () => ({
    persona: 'ola', screen: 'lock', app: 'mob', mobTab: 'teraz', sub: null, call: null,
    date: 'wtorek, 24 listopada', time: '7:12',
    notifs: [], live: 0, liveFresh: false, islandOpen: false, homePage: 0,
    log: LOG0.map(x => ({ ...x })), rules: { adres: 'samo', odnowienia: 'samo', terminy: 'samo', podatki: 'zapytaj' }, ruleChanged: false,
    doc: 'old', bank: null, pesel: null, pit: null, mandat: null, slot: 0, booked: null, photo: false,
    docOpen: null, asked: 0, nocRead: false, jz: 'ask',
    q: {}, cur: 'noc', disc: {}, guide: true, saved: {}
  });
  let S = fresh();

  /* ---------------- pomocnicze ---------------- */
  const dayLabel = () => S.date.split(', ')[1] || S.date;
  function addLog(e) { S.log.unshift({ id: 'l' + Date.now() + Math.random().toString(16).slice(2, 6), day: dayLabel(), time: S.time, ...e }); }
  function announce(t) { const l = $('#live'); l.textContent = ''; setTimeout(() => { l.textContent = I18N.t(t); }, 50); }
  let toastT;
  function toast(t, ok) {
    const el = $('#toast');
    el.innerHTML = `${ok ? I.checkc : I.info}<span>${esc(t)}</span>`;
    el.classList.add('show'); announce(t);
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2400);
  }
  function webToast(t, ok) {
    const box = $('#wtoasts'); const el = document.createElement('div');
    el.className = 'sonner wtoast'; el.innerHTML = `${ok ? I.trophy : I.sparkle}<span>${esc(t)}</span>`;
    box.appendChild(el); requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 3600);
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const en = I18N.lang === 'en';
      const u = new SpeechSynthesisUtterance(I18N.t(text));
      u.lang = en ? 'en-GB' : 'pl-PL'; u.rate = .95;
      const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith(en ? 'en' : 'pl'));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* bez głosu */ }
  }
  function qr(seed = 11) {
    let s = seed;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const N = 29; let r = '';
    const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#000"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#000"/>`;
    const inF = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inF(x, y) && rnd() > .52) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    return `<svg viewBox="-1 -1 ${N + 2} ${N + 2}" shape-rendering="crispEdges" role="img" aria-label="Przykładowy kod QR"><rect x="-1" y="-1" width="${N + 2}" height="${N + 2}" fill="#fff"/><g fill="#000">${r}</g>${finder(0, 0)}${finder(N - 7, 0)}${finder(0, N - 7)}</svg>`;
  }

  /* --- iOS: wiersze, grupy, notatki --- */
  const icn = (k, c) => `<span class="ic" style="--c:${c || CI[k] || '#8e8e93'}">${I[k]}</span>`;
  const row = ({ ic: k, c, t, d = '', d2 = '', v = '', chev = false, act = '', attrs = '', cls = '', sb = false, right = '' }) => {
    const tag = act ? 'button' : 'div';
    return `<${tag} class="row ${cls}" ${act ? `type="button" data-act="${act}"` : ''} ${attrs}>${k ? icn(k, c) : ''}<span class="r-t"><b ${sb ? 'class="sb"' : ''}>${t}</b>${d ? `<span>${d}</span>` : ''}${d2 ? `<small>${d2}</small>` : ''}</span>${v ? `<span class="r-v">${v}</span>` : ''}${right}${chev ? `<span class="chev">${I.chev}</span>` : ''}</${tag}>`;
  };
  const group = (rows, { h = '', f = '', icons = true, cls = '' } = {}) => `<section class="ig ${cls}">${h ? `<div class="ig-h">${h}</div>` : ''}<div class="ig-b ${icons ? 'ics' : ''}">${rows.join('')}</div>${f ? `<div class="ig-f">${f}</div>` : ''}</section>`;
  const kv = rows => group(rows.map(([k, v, sub]) => `<div class="row kv"><span class="r-t">${k}</span><span class="r-v">${v}${sub ? `<small>${sub}</small>` : ''}</span></div>`), { icons: false });
  const note = (k, title, text, cls = '') => `<div class="inote ${cls}">${icn(k)}<div>${title ? `<b>${title}</b>` : ''}<span>${text}</span></div></div>`;
  const pill = (t, c = '#8e8e93') => `<span class="pill" style="--c:${c}">${t}</span>`;
  const navL = (title, sub = '', right = '') => `<header class="nav-l"><div>${sub ? `<span class="nav-sub">${sub}</span>` : ''}<h1>${title}</h1></div>${right}</header>`;
  const nb = (title, back = '', done = '') => `<div class="nb">${back ? `<button type="button" class="back" data-act="back">${I.back}${back}</button>` : ''}<b>${title}</b>${done}</div>`;

  /* --- shadcn na stronie --- */
  const wBtn = (label, { v = 'default', s = '', act = '', ic = '', attrs = '' } = {}) =>
    `<button type="button" class="btn btn-${v}${s ? ' btn-' + s : ''}" ${act ? `data-act="${act}"` : ''} ${attrs}>${ic ? I[ic] : ''}${label}</button>`;
  const wBadge = (label, v = 'secondary', ic = '') => `<span class="badge badge-${v}">${ic ? I[ic] : ''}${label}</span>`;

  /* ---------------- Face ID, odblokowanie ---------------- */
  async function faceId(label = 'Face ID') {
    const gen = S;
    const f = $('#fid'); f.hidden = false;
    f.innerHTML = `<div class="fid-box scan" role="status">${I.face}<span>${esc(label)}</span></div>`;
    await wait(900);
    f.innerHTML = `<div class="fid-box ok" role="status">${I.check}<span>Potwierdzone</span></div>`;
    await wait(500);
    f.hidden = true; f.innerHTML = '';
    return gen === S;
  }
  async function unlock(to = 'home') {
    const lk = $('.lk-lock');
    if (lk) { lk.innerHTML = I.lockOpen; lk.classList.add('open'); }
    await wait(330);
    S.screen = to; render();
  }

  /* ---------------- arkusz iOS ---------------- */
  let SA = [];
  let sheetCtx = null;
  const DISMISS = /^(Później|Anuluj|Zamknij|Nie teraz|Wróć|Przypomnij za tydzień)$/;
  function sheet({ ic: k = '', title, desc = '', html = '', cta = null, actions = [], tall = false }) {
    SA = [cta, ...actions];
    const el = $('#sheet');
    const still = !el.hidden;
    const top = actions.findIndex(a => /^(Anuluj|Zamknij)$/.test(a.label));
    el.innerHTML = `<div class="scrim" ${still ? 'style="animation:none"' : ''}></div>
      <div class="isheet ${still ? 'still' : ''} ${tall ? 'tall' : ''}" role="dialog" aria-modal="true" aria-labelledby="shT">
        <div class="grab" data-drag="sheet" aria-hidden="true"></div>
        <div class="sh-top" data-drag="sheet"><button type="button" class="cancel" data-sa="${top >= 0 ? top + 1 : 'x'}">Anuluj</button><span class="app-l"><span class="n-ic sm">${I.m}</span>mObywatel</span></div>
        <div class="sh-scroll">
          <div class="sh-hero">${k ? `<span class="big-ic" style="--c:${CI[k] || '#d4213d'}">${I[k]}</span>` : ''}<h2 id="shT">${title}</h2>${desc ? `<p>${desc}</p>` : ''}</div>
          ${html}
        </div>
        <div class="sh-acts">
          ${cta ? `<button type="button" class="ibtn ${cta.kind === 'danger' ? 'red' : 'fill'}" data-sa="0" ${cta.disabled ? 'disabled' : ''}>${cta.face ? I.face : ''}${cta.label}</button>` : ''}
          ${actions.map((a, i) => i === top ? '' : `<button type="button" class="ibtn ${DISMISS.test(a.label) ? 'plain' : 'gray'}" data-sa="${i + 1}">${a.label}</button>`).join('')}
        </div>
      </div>`;
    el.hidden = false;
    $('#phone').classList.add('sheet-on');
    setInert(); after();
    const first = $('[data-sa="0"]:not(:disabled)', el) || $('[data-sa]', el);
    first && first.focus({ preventScroll: true });
  }
  function closeSheet() {
    const el = $('#sheet'); el.hidden = true; el.innerHTML = ''; SA = []; sheetCtx = null;
    $('#phone').classList.toggle('sheet-on', !$('#ask').hidden);
    setInert();
    $('#phone').focus({ preventScroll: true });
    after();
  }

  /* ---------------- powiadomienia ---------------- */
  function push(kind, time = 'teraz') {
    S.notifs = S.notifs.filter(n => n.kind !== kind);
    const n = { id: kind + '-' + Date.now(), kind, time, resolved: null, fresh: true, opened: false };
    S.notifs.unshift(n);
    announce('Nowe powiadomienie: ' + NOTIF[kind].title());
    if (S.screen !== 'lock') showBanner(n);
    return n;
  }
  function resolve(kind, text) {
    const n = S.notifs.find(x => x.kind === kind);
    if (n) { n.resolved = text; n.fresh = false; n.opened = true; }
    if (kind === 'noc') S.nocRead = true;
  }
  const findN = kind => S.notifs.find(x => x.kind === kind);
  let bannerT;
  function showBanner(n) {
    const b = $('#banner');
    b.innerHTML = notifHTML({ ...n, fresh: false });
    b.hidden = false;
    clearTimeout(bannerT);
    bannerT = setTimeout(() => { b.hidden = true; after(); }, 6000);
  }

  const NOTIF = {
    noc: {
      info: true,
      title: () => 'W nocy załatwiły się 3 sprawy',
      body: 'Nowy adres jest już w dwóch urzędach, a karta EKUZ jest przedłużona. Nic nie musisz robić.',
      open() {
        sheet({
          ic: 'sun', title: 'W nocy załatwiły się 3 sprawy',
          desc: 'Masz „Samo” dla adresu i odnowień. Każdą zmianę cofniesz przez 14 dni.',
          html: group(['l3', 'l4', 'l5'].map(id => S.log.find(x => x.id === id)).filter(Boolean).map(e => row({ ic: e.ic, t: esc(e.t), d: esc(e.d), d2: 'Źródło: ' + esc(e.src) }))),
          cta: { label: 'Rozumiem', fn: () => { resolve('noc', 'Przeczytane. Szczegóły są w dzienniku „W tle”.'); closeSheet(); render(); } },
          actions: [
            { label: 'Pokaż dziennik „W tle”', fn: () => { resolve('noc', 'Przeczytane.'); closeSheet(); openApp('mob', 'wtle'); } },
            { label: 'Zmień zasady', fn: () => { resolve('noc', 'Przeczytane.'); closeSheet(); openApp('mob', 'zasady'); } }
          ]
        });
      }
    },
    dowod: {
      title: () => 'Twój dowód traci ważność za 60 dni',
      body: 'Nowy zamówisz w minutę. Brakuje nam tylko aktualnego zdjęcia.',
      open() { dowodStep1(); }
    },
    gotowy: {
      title: () => 'Nowy dowód jest gotowy do odbioru',
      body: 'Wybierz godzinę wizyty. Bez numerka i bez kolejki.',
      open() { slotSheet(); }
    },
    odebrany: {
      info: true,
      title: () => 'Masz nowy dowód osobisty',
      body: 'Stary jest unieważniony. Nowy jest już w mObywatelu.',
      open() {
        sheet({
          ic: 'id', title: 'Masz nowy dowód osobisty', desc: 'Możesz go od razu pokazać w telefonie.',
          html: kv([['Numer', 'DKR 771045'], ['Ważny do', '10.12.2036'], ['Stary dowód', 'unieważniony']]),
          cta: { label: 'Pokaż dowód', fn: () => { resolve('odebrany', 'Nowy dowód jest w mObywatelu.'); closeSheet(); openDoc('id'); } },
          actions: [{ label: 'Zamknij', fn: () => { resolve('odebrany', 'Nowy dowód jest w mObywatelu.'); closeSheet(); render(); } }]
        });
      }
    },
    bank: {
      title: () => 'Bank Nowy prosi o Twoje dane',
      body: 'Otwierasz konto przez internet? Sprawdź, co bank chce dostać.',
      open() {
        sheet({
          ic: 'bank', title: 'Bank Nowy prosi o dane', desc: 'Do otwarcia konta. Zgoda jest jednorazowa.',
          html: group(['Imię i nazwisko', 'Numer PESEL', 'Adres zameldowania'].map(t => row({ ic: 'check', t })), { h: 'Bank dostanie' }) +
            group(['Zdjęcie z dowodu', 'Seria i numer dowodu', 'Imiona rodziców'].map(t => row({ ic: 'x', t, cls: 'no' })), { h: 'Bank nie dostanie' }),
          cta: { label: 'Udostępnij 3 dane', face: true, fn: async () => {
            closeSheet(); if (!(await faceId())) return; S.bank = 'yes';
            resolve('bank', 'Udostępniono Bankowi Nowemu: imię i nazwisko, PESEL, adres.');
            addLog({ ic: 'bank', t: 'Udostępniłaś dane Bankowi Nowemu', d: 'Imię i nazwisko, PESEL, adres. Zgoda jednorazowa.', src: 'Twoja zgoda', you: true });
            render(); toast('Udostępnione', true);
          } },
          actions: [{ label: 'Odmów', fn: () => { S.bank = 'no'; resolve('bank', 'Odmówiłaś. Bank nic nie dostał.'); addLog({ ic: 'bank', t: 'Odmówiłaś Bankowi Nowemu', d: 'Bank nie dostał żadnych danych.', src: 'Twoja decyzja', you: true }); closeSheet(); render(); toast('Bank nic nie dostał', true); } }]
        });
      }
    },
    pesel: {
      critical: true,
      title: () => 'Czy to Ty bierzesz pożyczkę?',
      body: 'Szybka Kasa: 2 000 zł na Twój PESEL, z nowego urządzenia. Jeśli to nie Ty, zablokujemy ją.',
      open() {
        sheet({
          ic: 'alert', title: 'Ktoś bierze pożyczkę na Twój PESEL', desc: 'Firma czeka na Twoją odpowiedź.',
          html: kv([['Firma', 'Szybka Kasa', 'pożyczki przez internet'], ['Kwota', '2 000 zł'], ['Kiedy', '23:40, minutę temu'], ['Skąd', 'nowe urządzenie', 'Warszawa']]) +
            note('alert', 'Nie rozpoznajesz tego?', 'Zastrzeżemy PESEL i pożyczka nie zostanie wypłacona.', 'red'),
          cta: { label: 'To nie ja, zablokuj', kind: 'danger', face: true, fn: peselBlock },
          actions: [{ label: 'To ja', fn: () => { S.pesel = 'me'; resolve('pesel', 'Potwierdziłaś, że to Ty.'); addLog({ ic: 'shield', t: 'Potwierdziłaś wniosek o pożyczkę', d: 'Szybka Kasa, 2 000 zł.', src: 'Rejestr zastrzeżeń PESEL', you: true }); closeSheet(); render(); } }]
        });
      }
    },
    pit: {
      title: () => 'Twój PIT jest gotowy. Zwrot: 412 zł',
      body: 'Policzyliśmy go z PIT-11 i ulgi na dziecko. Wystarczy zatwierdzić.',
      open() {
        sheet({
          ic: 'coins', title: 'Zwrot podatku za 2025',
          html: `<p class="amount" style="color:#248a3d">+412 zł</p><p class="amount-s">na konto •••• 4821, zwykle w ciągu 45 dni</p>
            ${kv([['Przychody', '2 pracodawców', 'z PIT-11'], ['Ulga na dziecko', '1 112,04 zł', 'Kuba, cały rok'], ['Rozliczenie', 'razem z mężem', 'tak wychodzi korzystniej']])}
            ${note('clock', '', 'Jeśli nic nie zrobisz, zeznanie zostanie zaakceptowane samo 30 kwietnia.')}`,
          cta: { label: 'Zatwierdź i wyślij', face: true, fn: async () => {
            closeSheet(); if (!(await faceId())) return;
            S.pit = 'sent';
            resolve('pit', 'Wysłane. Zwrot 412 zł w ciągu 45 dni.');
            addLog({ ic: 'coins', t: 'Wysłałaś zeznanie PIT', d: 'Zwrot 412 zł na konto •••• 4821.', src: 'Krajowa Administracja Skarbowa', you: true });
            render(); toast('Zeznanie wysłane', true);
          } },
          actions: [{ label: 'Pokaż całe zeznanie', fn: () => toast('W prototypie pokazujemy tylko podsumowanie.') }, { label: 'Później', fn: closeSheet }]
        });
      }
    },
    mandat: {
      title: () => 'Fotoradar: 62 km/h przy limicie 50',
      body: 'Zamiast listu poleconego. Twoja Skoda, ul. Opolska w Krakowie.',
      open() { mandatStep1(); }
    },
    dodatek: {
      title: () => 'Panie Jerzy, należy się Panu dodatek do ogrzewania',
      body: '500 zł. Wniosek jest już wypełniony.',
      open() { S.screen = 'app'; S.app = 'mob'; render(); }
    }
  };

  /* --- nowy dowód --- */
  function dowodStep1() {
    sheet({
      ic: 'id', title: 'Nowy dowód osobisty', desc: 'Te dane mamy już w rejestrach.',
      html: kv([['Imię i nazwisko', OLA.name, 'z rejestru PESEL'], ['PESEL', OLA.pesel], ['Adres', OLA.addr, 'zameldowanie z 20 listopada'], ['Opłata', '0 zł']]) +
        note('camera', 'Brakuje tylko zdjęcia', 'Zrobisz je telefonem. Od razu sprawdzimy, czy spełnia wymagania.'),
      cta: { label: 'Zrób zdjęcie', fn: dowodPhoto },
      actions: [{ label: 'Przypomnij za tydzień', fn: () => { resolve('dowod', 'Przypomnimy za tydzień.'); closeSheet(); render(); } }]
    });
  }
  async function dowodPhoto() {
    const checks = ['Twarz na środku', 'Jasne, jednolite tło', 'Dobre światło, bez cieni'];
    sheet({
      ic: 'camera', title: 'Zdjęcie do dowodu', desc: 'Patrz w obiektyw.',
      html: `<div class="vf" id="vf"><div class="oval">${I.user}</div><div class="flash"></div></div>` + group(checks.map(t => row({ ic: 'circle', t })), { cls: 'checks' }),
      cta: { label: 'Sprawdzam zdjęcie…', disabled: true, fn: () => {} },
      actions: [{ label: 'Anuluj', fn: closeSheet }]
    });
    for (const it of $$('.checks .row')) {
      await wait(550); if (!it.isConnected) return;
      const m = $('.ic', it); m.innerHTML = I.checkc; m.style.setProperty('--c', CI.checkc);
    }
    await wait(300);
    const vf = $('#vf'); if (!vf) return;
    vf.classList.add('ok', 'shot');
    await wait(400);
    if (!$('#vf')) return;
    S.photo = true;
    sheet({
      ic: 'checkc', title: 'Zdjęcie spełnia wymagania', desc: 'O każdym etapie poinformujemy Cię na ekranie blokady.',
      html: `<div class="vf ok"><div class="oval">${I.user}</div></div>` + kv([['Odbiór', 'Urząd Miasta Krakowa', 'najbliżej Twojego adresu'], ['Odciski palców', 'przy odbiorze', 'jedna wizyta']]),
      cta: { label: 'Podpisz i wyślij wniosek', face: true, fn: async () => {
        closeSheet(); if (!(await faceId())) return;
        S.notifs = S.notifs.filter(n => n.kind !== 'dowod');
        S.live = 1; S.liveFresh = true;
        addLog({ ic: 'id', t: 'Wysłałaś wniosek o nowy dowód', d: 'Odbiór: Urząd Miasta Krakowa.', src: 'Rejestr Dowodów Osobistych', you: true });
        render(); toast('Wniosek wysłany', true);
      } },
      actions: [{ label: 'Zrób inne zdjęcie', fn: dowodPhoto }]
    });
  }
  const SLOTS = [['Jutro', '10:20'], ['Jutro', '15:40'], ['Piątek', '8:10']];
  function slotSheet() {
    const draw = () => {
      sheet({
        ic: 'cal', title: 'Kiedy odbierzesz dowód?', desc: 'Urząd Miasta Krakowa, Wydział Spraw Obywatelskich. Zabierz stary dowód.',
        html: group(SLOTS.map((s, i) => `<button type="button" class="row" role="radio" aria-checked="${S.slot === i}" data-act="slot" data-i="${i}"><span class="r-t"><b>${s[0]}, ${s[1]}</b><span>${i === 0 ? 'Najbliższy wolny termin' : 'Wolny termin'}</span></span><span class="chk">${I.check}</span></button>`), { icons: false, h: 'Wolne terminy' }) +
          note('pin', '', 'Gdy wejdziesz do urzędu, numer w kolejce pojawi się sam na Dynamic Island.'),
        cta: { label: `Zarezerwuj: ${SLOTS[S.slot][0].toLowerCase()}, ${SLOTS[S.slot][1]}`, fn: () => {
          resolve('gotowy', `Zarezerwowano: ${SLOTS[S.slot][0].toLowerCase()}, ${SLOTS[S.slot][1]}.`);
          S.live = 4; S.liveFresh = true; S.booked = `${SLOTS[S.slot][0]}, ${SLOTS[S.slot][1]}`;
          LIVE[4].title = `Odbiór: ${SLOTS[S.slot][0].toLowerCase()}, ${SLOTS[S.slot][1]}`;
          LIVE[4].short = `${SLOTS[S.slot][0]} ${SLOTS[S.slot][1]}`;
          closeSheet(); render(); toast('Dodano do Kalendarza', true);
        } },
        actions: [{ label: 'Później', fn: closeSheet }]
      });
      sheetCtx = { redraw: draw };
    };
    draw();
  }

  /* --- fotoradar --- */
  function mandatStep1() {
    sheet({
      ic: 'car', title: 'Przekroczenie prędkości o 12 km/h', desc: 'Masz 7 dni na odpowiedź. Kto prowadził samochód?',
      html: `<div class="cam" aria-label="Zdjęcie z fotoradaru (ilustracja)"><span class="meta">11.03 · 14:22 · 62 km/h</span><svg class="car" viewBox="0 0 210 80" aria-hidden="true"><path d="M20 62h170c6 0 10-4 10-10V44c0-5-3-9-8-10l-26-6-18-16c-4-3-9-5-14-5H76c-6 0-11 2-15 6L44 28 22 33c-6 1-10 6-10 12v7c0 6 3 10 8 10z" fill="#2b2f36"/><path d="M70 14h56c4 0 7 1 10 4l14 12H52l10-11c3-3 5-5 8-5z" fill="#9fb3c4"/><circle cx="55" cy="64" r="13" fill="#111"/><circle cx="160" cy="64" r="13" fill="#111"/></svg><span class="plate">KR 4F218</span></div>
        ${kv([['Gdzie', 'Kraków, ul. Opolska'], ['Prędkość', '62 km/h', 'limit 50 km/h'], ['Grzywna', '100 zł']])}`,
      cta: { label: 'Ja. Przyjmuję mandat', fn: mandatPay },
      actions: [
        { label: 'Piotr Kowalczyk', fn: () => {
          S.mandat = 'piotr';
          resolve('mandat', 'Piotr dostał prośbę o potwierdzenie.');
          addLog({ ic: 'car', t: 'Wskazałaś kierowcę: Piotr Kowalczyk', d: 'Piotr dostał prośbę w swoim mObywatelu.', src: 'CANARD', you: true });
          closeSheet(); render(); toast('Wysłano do Piotra', true);
        } },
        { label: 'Ktoś inny', fn: () => toast('W prototypie: tu wpisujesz dane kierowcy.') },
        { label: 'Później', fn: closeSheet }
      ]
    });
  }
  function mandatPay() {
    sheet({
      ic: 'wallet', title: 'Zapłać mandat',
      html: `<p class="amount">100 zł</p><p class="amount-s">mandat za przekroczenie prędkości</p>${kv([['Płatność', 'BLIK', 'z Twojego banku'], ['Odbiorca', 'Główny Inspektorat Transportu Drogowego']])}`,
      cta: { label: 'Zapłać 100 zł', face: true, fn: async () => {
        closeSheet(); if (!(await faceId())) return;
        S.mandat = 'paid';
        resolve('mandat', 'Mandat opłacony. Sprawa zamknięta.');
        addLog({ ic: 'car', t: 'Zapłaciłaś mandat: 100 zł', d: 'Wezwanie z 11 marca, ul. Opolska.', src: 'CANARD', you: true });
        render(); toast('Zapłacone', true);
      } },
      actions: [{ label: 'Wróć', fn: mandatStep1 }]
    });
  }

  /* --- PESEL --- */
  async function peselBlock() {
    closeSheet(); if (!(await faceId())) return;
    S.pesel = 'blocked';
    resolve('pesel', 'Zablokowane. PESEL jest zastrzeżony.');
    addLog({ ic: 'shield', t: 'Zablokowałaś pożyczkę na swój PESEL', d: 'Szybka Kasa, 2 000 zł. PESEL jest zastrzeżony.', src: 'Rejestr zastrzeżeń PESEL', you: true });
    render(); toast('Pożyczka zablokowana', true);
    sheet({
      ic: 'shield', title: 'PESEL zastrzeżony', desc: 'Żadna firma nie udzieli kredytu na Twoje dane, dopóki sama nie cofniesz zastrzeżenia.',
      html: note('file', 'Zgłoszenie na policję jest gotowe', 'Firma, kwota, godzina i urządzenie są już w zgłoszeniu.'),
      cta: { label: 'Wyślij zgłoszenie', face: true, fn: async () => {
        closeSheet(); if (!(await faceId())) return;
        resolve('pesel', 'Zablokowane i zgłoszone na policję.');
        addLog({ ic: 'shield', t: 'Zgłosiłaś próbę oszustwa na policję', d: 'Numer zgłoszenia: KR-2026-11872.', src: 'Policja', you: true });
        render(); toast('Zgłoszenie wysłane', true);
      } },
      actions: [{ label: 'Nie teraz', fn: closeSheet }]
    });
  }

  /* ---------------- misje (fabuła) ---------------- */
  const MV = {
    noc: { ic: 'sun', was: ['3 urzędy', 'osobne zgłoszenia'], now: ['0 kroków', 'adres zmienia się sam'] },
    dowod: { ic: 'id', was: ['2 wizyty', 'fotograf i urząd'], now: ['1 wizyta', 'o ustalonej godzinie'] },
    bank: { ic: 'bank', was: ['skan dowodu', 'wszystkie dane naraz'], now: ['3 dane', 'tylko to, co trzeba'] },
    pesel: { ic: 'shield', was: ['po fakcie', 'list od windykatora'], now: ['kilka sekund', 'blokada przed wypłatą'] },
    pit: { ic: 'coins', was: ['logowanie', 'kilka ekranów zeznania'], now: ['2 dotknięcia', 'i Face ID'] },
    mandat: { ic: 'car', was: ['list polecony', 'poczta i papier'], now: ['3 dotknięcia', 'w powiadomieniu'] },
    ask: { ic: 'sparkle', was: ['szukanie', 'kilka stron urzędów'], now: ['1 pytanie', 'odpowiedź od razu'] },
    kontrola: { ic: 'sliders', was: ['brak historii', 'nie wiesz, co się zmieniło'], now: ['14 dni', 'na cofnięcie zmiany'] },
    jerzy: { ic: 'users', was: ['formularz', 'z pomocą rodziny'], now: ['1 decyzja', 'duże przyciski'] }
  };
  const QUESTS = [
    { id: 'noc', t: 'Poranek po przeprowadzce', at: ['wtorek, 24 listopada', '7:12'], kind: 'noc',
      goal: () => 'Ola się przeprowadziła. Sprawdź, co urzędy zrobiły w nocy.',
      start() { if (!findN('noc')) push('noc', '3:14'); }, done: () => S.nocRead,
      win: 'Po zameldowaniu adres zmienił się sam w dwóch urzędach, a karta EKUZ się przedłużyła.' },
    { id: 'dowod', t: 'Nowy dowód osobisty', at: ['środa, 25 listopada', '12:30'],
      kind: () => S.live === 3 ? 'gotowy' : S.live === 7 ? 'odebrany' : 'dowod',
      goal: () => ({ 0: 'Dowód Oli traci ważność. Zamów nowy z powiadomienia.', 1: 'Wniosek wysłany. Przewiń czas o 5 dni.', 2: 'Dowód się drukuje. Przewiń czas.', 3: 'Dowód jest gotowy. Wybierz godzinę odbioru.', 4: 'Godzina zarezerwowana. Przewiń do dnia wizyty.', 5: 'Ola jest w urzędzie. Sprawdź numer na Dynamic Island.', 6: 'Twoja kolej. Odbierz dowód.' }[S.live] || 'Odbierz dowód.'),
      start() { if (S.doc === 'old' && !S.live && !findN('dowod')) push('dowod'); }, done: () => S.doc === 'new',
      win: 'Zamówienie z powiadomienia, zdjęcie telefonem i numer w kolejce bez biletomatu.' },
    { id: 'bank', t: 'Bank prosi o dane', at: ['sobota, 12 grudnia', '11:48'], kind: 'bank',
      goal: () => 'Ola otwiera konto przez internet. Zdecyduj, co dostanie bank.',
      start() { if (!S.bank) push('bank'); }, done: () => !!S.bank,
      win: 'Firma dostaje tylko potrzebne dane, a zgoda jest jednorazowa.' },
    { id: 'pesel', t: '„To nie ja”', at: ['sobota, 12 grudnia', '23:41'], kind: 'pesel',
      goal: () => 'Ktoś bierze pożyczkę na dane Oli. Zareaguj.',
      start() { if (!S.pesel) push('pesel'); }, done: () => !!S.pesel,
      win: 'Alert przychodzi, zanim ktoś dostanie pieniądze na Twoje dane.' },
    { id: 'pit', t: 'Zwrot podatku', at: ['poniedziałek, 15 lutego', '8:05'], kind: 'pit',
      goal: () => 'PIT Oli jest już policzony. Sprawdź go i wyślij.',
      start() { if (!S.pit) push('pit'); }, done: () => S.pit === 'sent',
      win: 'Zeznanie liczy się samo z danych, które urząd już ma.' },
    { id: 'mandat', t: 'Fotoradar', at: ['czwartek, 11 marca', '17:40'], kind: 'mandat',
      goal: () => 'Przyszło wezwanie z fotoradaru. Wskaż kierowcę albo zapłać.',
      start() { if (!S.mandat) push('mandat'); }, done: () => !!S.mandat,
      win: 'Bez listu poleconego i bez wizyty na poczcie.' },
    { id: 'ask', t: 'Zapytaj asystenta', at: ['piątek, 2 kwietnia', '19:05'], kind: null,
      goal: () => 'Ola planuje wakacje. Zapytaj asystenta, czy poleci do Chorwacji na dowodzie.',
      start() {}, done: () => S.asked > 0,
      win: 'Asystent zna terminy i dokumenty, ale niczego nie wysyła sam.' },
    { id: 'kontrola', t: 'Masz kontrolę', at: null, kind: null,
      goal: () => 'Cofnij jedną automatyczną zmianę albo zmień zasadę.',
      start() {}, done: () => S.log.some(e => e.undone) || S.ruleChanged,
      win: 'To Ty decydujesz, co dzieje się samo. Każdą zmianę cofniesz.' },
    { id: 'jerzy', t: 'Telefon taty', at: ['poniedziałek, 5 kwietnia', '9:00'], kind: 'dodatek',
      goal: () => S.persona === 'jerzy' ? 'Pomóż Panu Jerzemu (74 lata) zdecydować o dodatku.' : 'Weź telefon Pana Jerzego, taty Oli.',
      start() { if (S.jz === 'ask' && !findN('dodatek')) push('dodatek'); }, done: () => S.jz === 'done' || S.jz === 'no',
      win: 'Ten sam pomysł w trybie Dostęp z asystą: jedna decyzja i duże przyciski.' }
  ];
  const QMAP = Object.fromEntries(QUESTS.map(q => [q.id, q]));
  const DISC = [['island', 'Dynamic Island'], ['qr', 'Dowód w telefonie'], ['strona', 'Druga strona ekranu'], ['kalendarz', 'Termin w Kalendarzu'],
    ['wiadomosci', 'Wiadomość od Piotra'], ['notatki', 'Lista po przeprowadzce'], ['ustawienia', 'Powiadomienia w Ustawieniach'], ['glos', 'Czytanie na głos']];
  function discover(id) {
    if (S.disc[id]) return;
    S.disc[id] = true;
    const d = DISC.find(x => x[0] === id);
    webToast(`Odkrycie ${Object.keys(S.disc).length}/${DISC.length}: ${d ? d[1] : id}`);
  }
  const doneN = () => QUESTS.filter(q => S.q[q.id] === 'done').length;
  const nextQuest = () => (QUESTS.find(q => S.q[q.id] !== 'done' && q.id !== S.cur) || {}).id;
  function startQuest(id) {
    const q = QMAP[id]; if (!q) return;
    closeAll();
    S.cur = id;
    if (id === 'jerzy') switchPersona('jerzy', true); else if (S.persona !== 'ola') switchPersona('ola', true);
    if (S.q[id] !== 'done' && !S.q[id]) {
      S.q[id] = 'active';
      if (q.at) { S.date = q.at[0]; S.time = q.at[1]; }
      q.start();
    }
    $('#mLayer').hidden = true;
    render();
  }
  function checkQuests() {
    QUESTS.forEach(q => {
      if (S.q[q.id] !== 'done' && q.done()) {
        S.q[q.id] = 'done';
        if (q.id !== S.cur) webToast(`Przy okazji ukończona misja: ${q.t}`, true);
      }
    });
  }

  /* czas w misji „Nowy dowód” */
  const VISIT = [['czwartek, 10 grudnia', '10:12', '10:19', '10:26'], ['czwartek, 10 grudnia', '15:32', '15:39', '15:46'], ['piątek, 11 grudnia', '8:02', '8:09', '8:16']];
  const ADV = {
    1: { label: 'Przewiń o 5 dni', fn() { Object.assign(S, { date: 'poniedziałek, 30 listopada', time: '9:30', screen: 'lock', live: 2, liveFresh: true }); } },
    2: { label: 'Przewiń o 9 dni', fn() { Object.assign(S, { date: 'środa, 9 grudnia', time: '13:05', screen: 'lock', live: 3, liveFresh: true }); push('gotowy'); } },
    4: { label: 'Przewiń do wizyty w urzędzie', fn() {
      const v = VISIT[S.slot] || VISIT[0];
      Object.assign(S, { date: v[0], time: v[1], screen: 'home', live: 5, islandOpen: true });
      S.notifs = S.notifs.filter(n => n.kind !== 'gotowy');
      islandAuto(); announce('Jesteś w kolejce: numer A12, przed Tobą 2 osoby.');
    } },
    5: { label: 'Przewiń 7 minut', fn() { Object.assign(S, { time: (VISIT[S.slot] || VISIT[0])[2], live: 6, islandOpen: true }); islandAuto(true); announce('Twoja kolej. Stanowisko 4.'); } },
    6: { label: 'Odbierz dowód', fn() {
      Object.assign(S, { time: (VISIT[S.slot] || VISIT[0])[3], live: 7, islandOpen: false, doc: 'new' });
      addLog({ ic: 'id', t: 'Odebrałaś nowy dowód', d: 'Ważny do 10.12.2036. Stary dowód unieważniony.', src: 'Rejestr Dowodów Osobistych', you: true });
      push('odebrany');
      setTimeout(() => { if (S.live === 7) { S.live = 0; render(); } }, 9000);
    } }
  };
  const advNow = () => S.persona === 'ola' && S.cur === 'dowod' && S.q.dowod !== 'done' && ADV[S.live] ? ADV[S.live] : null;
  let islandT;
  function islandAuto(alert) {
    clearTimeout(islandT);
    if (alert) setTimeout(() => { const i = $('#island'); i.classList.remove('alert'); void i.offsetWidth; i.classList.add('alert'); }, 60);
    islandT = setTimeout(() => { S.islandOpen = false; renderIsland(); after(); }, 6000);
  }

  /* ---------------- asystent ---------------- */
  const QS = [
    { k: 'chorw', q: 'Polecę do Chorwacji na dowodzie?', match: /chorw|wyjazd|lec|lot|wakac|podr[oó]|granic|paszport|croatia|trip|fly|flight|holiday|vacation|travel|border|passport/i },
    { k: 'terminy', q: 'Co mi się wkrótce kończy?', match: /ko[nń]cz|termin|wa[zż]n|przypom|wygas|expir|deadline|due|valid|remind|soon/i },
    { k: 'dane', q: 'Kto sprawdzał moje dane?', match: /dane|sprawdza|kto|prywat|pesel|data|check|who|privacy/i }
  ];
  let ASK = { q: null, k: null, typing: false };
  function answer(k) {
    const sm = rows => `<div class="ig-b ics">${rows.join('')}</div>`;
    if (k === 'chorw') {
      const v = S.doc === 'new' ? 'do 10 grudnia 2036' : 'do 24 stycznia 2027';
      return { text: `Tak. Chorwacja jest w Unii Europejskiej, więc wystarczy dowód. Twój jest ważny ${v}. Kartę EKUZ masz ważną do 2031 roku.`,
        html: `<p>Tak. Chorwacja jest w Unii Europejskiej, więc wystarczy dowód. Twój jest ważny <b>${v}</b>.</p><p>Kartę EKUZ masz ważną do 2031 roku.</p>` };
    }
    if (k === 'terminy') {
      return { text: 'Kończy się OC Skody 12 maja, przegląd 3 czerwca i paszport Kuby 20 lipca. Przypomnę 14 dni wcześniej.',
        html: `<p>Masz trzy terminy. Przypomnę 14 dni wcześniej.</p>${sm([row({ ic: 'car', t: 'OC Skody', v: '12 maja' }), row({ ic: 'car', t: 'Przegląd', v: '3 czerwca' }), row({ ic: 'plane', t: 'Paszport Kuby', v: '20 lipca' })])}` };
    }
    if (k === 'dane') {
      const rows = [];
      if (S.bank === 'yes') rows.push(row({ ic: 'bank', t: 'Bank Nowy', d: 'za Twoją zgodą' }));
      if (S.pesel === 'blocked') rows.push(row({ ic: 'shield', t: 'Szybka Kasa', d: 'próba pożyczki, zablokowana' }));
      if (!rows.length) return { text: 'W ostatnim miesiącu nikt nie sprawdzał Twoich danych.', html: '<p>W ostatnim miesiącu nikt nie sprawdzał Twoich danych. Gdyby ktoś to zrobił, od razu dostaniesz powiadomienie.</p>' };
      return { text: 'Oto ostatnie sprawdzenia Twoich danych.', html: `<p>Ostatnie sprawdzenia Twoich danych:</p>${sm(rows)}` };
    }
    return { text: 'Tego jeszcze nie umiem w prototypie.', html: '<p>Tego jeszcze nie umiem w prototypie. Wybierz jedno z pytań.</p>' };
  }
  function openAsk() { ASK = { q: null, k: null, typing: false, fresh: true }; $('#ask').hidden = false; $('#phone').classList.add('sheet-on'); renderAsk(); setInert(); after(); }
  function closeAsk() { $('#ask').hidden = true; $('#ask').innerHTML = ''; if ('speechSynthesis' in window) speechSynthesis.cancel(); $('#phone').classList.toggle('sheet-on', !$('#sheet').hidden); setInert(); after(); }
  function renderAsk() {
    const el = $('#ask'); if (el.hidden) return;
    const a = ASK.k && !ASK.typing ? answer(ASK.k) : null;
    const still = !ASK.fresh; ASK.fresh = false;
    el.innerHTML = `<div class="scrim" ${still ? 'style="animation:none"' : ''}></div>
      <div class="isheet tall ${still ? 'still' : ''}" role="dialog" aria-modal="true" aria-labelledby="askT">
        <div class="grab" data-drag="ask" aria-hidden="true"></div>
        <div class="sh-top" data-drag="ask"><button type="button" class="cancel" data-act="askClose">Gotowe</button><span class="app-l"><span class="n-ic sm">${I.m}</span>mObywatel</span></div>
        <div class="sh-scroll">
          <div class="sh-hero"><span class="big-ic" style="--c:${CI.sparkle}">${I.sparkle}</span><h2 id="askT">Asystent</h2><p>Odpowiada i przygotowuje sprawy. Niczego nie wysyła sam.</p></div>
          <div class="chat">
            ${ASK.q ? `<div class="bub me">${esc(ASK.q)}</div>` : ''}
            ${ASK.typing ? '<div class="typing" aria-label="Asystent pisze"><i></i><i></i><i></i></div>' : ''}
            ${a ? `<div class="bub ai" aria-live="polite">${a.html}</div>` : ''}
          </div>
          ${a && ASK.k === 'terminy' ? `<div style="padding:0 16px 12px"><button type="button" class="ibtn gray" data-act="askRemind">${I.bell}Przypominaj o wszystkich</button></div>` : ''}
          <div class="sugg">${QS.filter(x => x.k !== ASK.k).map(x => `<button type="button" data-act="askQ" data-k="${x.k}">${x.q}</button>`).join('')}</div>
        </div>
        <form class="composer" data-form="ask">
          <input id="askInput" type="text" placeholder="Zapytaj o dowolną sprawę" aria-label="Twoje pytanie" autocomplete="off">
          <button type="button" class="ghost" data-act="askMic" aria-label="Zapytaj głosem">${I.mic}</button>
          <button type="submit" aria-label="Wyślij">${I.send}</button>
        </form>
      </div>`;
  }
  async function ask(k, q, voice) {
    ASK = { q: q || QS.find(x => x.k === k)?.q, k, typing: true }; renderAsk();
    await wait(800);
    ASK.typing = false; S.asked++; renderAsk(); after();
    if (voice) speak(answer(k).text);
  }

  /* ---------------- system iOS: blokada, ekran główny ---------------- */
  function notifHTML(n) {
    const d = NOTIF[n.kind];
    return `<button type="button" class="notif ${d.critical ? 'critical' : ''} ${n.fresh ? 'fresh' : ''}" data-act="openNotif" data-kind="${n.kind}">
      <span class="n-ic">${d.critical ? I.alert : I.m}</span>
      <span class="n-main"><span class="n-head"><span class="n-title">${esc(d.title())}</span><span class="n-time">${esc(n.time)}</span></span>
      <span class="n-body">${esc(d.body)}</span></span></button>`;
  }
  function progHTML(step) {
    return `<div class="prog"><div class="prog-bar">${STEP_LBL.map((_, i) => `<i class="${i + 1 < step ? 'on' : i + 1 === step ? 'now' : ''}${step > 4 ? ' on' : ''}"></i>`).join('')}</div>
      <div class="prog-lbl">${STEP_LBL.map((l, i) => `<span class="${i + 1 <= step ? 'on' : ''}">${l}</span>`).join('')}</div></div>`;
  }
  const curLive = () => S.persona === 'ola' ? LIVE[S.live] : null;
  function laHTML() {
    const L = curLive(); if (!L) return '';
    return `<div class="la${S.liveFresh ? ' fresh' : ''}" role="status" aria-label="Aktywność na żywo: ${esc(L.title)}">
      <div class="la-top"><span class="la-ic">${L.done ? I.check : I.id}</span><span class="la-t"><b>${esc(L.title)}</b><span>${esc(L.sub)}</span></span>${L.num ? `<span class="la-num ${L.go ? 'go' : ''}">${L.num}</span>` : ''}</div>
      ${progHTML(L.step)}</div>`;
  }
  const pendingN = () => S.notifs.filter(n => !n.resolved && !NOTIF[n.kind].info).length;
  const spraw = n => n === 1 ? 'sprawa' : n > 1 && n < 5 ? 'sprawy' : 'spraw';
  function lockHTML() {
    const visible = S.notifs.filter(n => !n.opened && !n.resolved);
    const p = pendingN();
    const docTxt = S.doc === 'new' ? '2036' : '24.01';
    return `<div class="lk-lock" aria-hidden="true">${I.lock}</div>
      <div class="lk-date">${esc(S.date)}</div><div class="lk-time">${esc(S.time)}</div>
      <div class="lk-widgets" aria-label="Widżety mObywatela">
        <div class="acc-c">${I.id}<b>${docTxt}</b></div>
        <div class="acc-c">${I.car}<b>12.05</b></div>
        <div class="acc-r"><b>mObywatel</b><span>${p ? `${p} ${spraw(p)} do decyzji` : 'Wszystko załatwione'}</span><span>OC Skody: 12 maja</span></div>
      </div>
      <div class="lk-stack">${visible.map(notifHTML).join('')}${laHTML()}</div>
      <div class="lk-btns"><button type="button" class="lk-btn" data-act="ask" aria-label="Zapytaj asystenta">${I.mic}</button><button type="button" class="lk-btn" data-act="showDoc" data-doc="id" aria-label="Pokaż dowód osobisty">${I.id}</button></div>
      <button type="button" class="lk-hint" data-act="unlock">Przesuń w górę, aby otworzyć</button>`;
  }
  const HOME1 = [['Kalendarz', 'cal', '#fff', '#ff3b30', 'cal'], ['Zdjęcia', 'photo', '#fff', '#ff9500', 'photos'], ['Mapy', 'map', '#e9f6ea', '#34c759', 'maps'], ['Pogoda', 'sun', '#3a8dde', '#fff', 'weather'], ['Aparat', 'camera', '#d1d1d6', '#3a3a3c', 'camera'], ['Zegar', 'clock', '#1c1c1e', '#fff', 'clock'], ['Notatki', 'note', '#fff7d6', '#c69000', 'notes']];
  const HOME2 = [['Ustawienia', 'gear', '#8e8e93', '#fff', 'settings'], ['Zdrowie', 'heart', '#fff', '#ff2d55', 'health'], ['Portfel', 'wallet', '#1c1c1e', '#fff', 'wallet'], ['Muzyka', 'music', '#fc3c44', '#fff', 'music'], ['Książki', 'book', '#ff9500', '#fff', 'books'], ['Pliki', 'folder', '#fff', '#1a8cff', 'files'], ['App Store', 'store', '#1a8cff', '#fff', 'store'], ['Kontakty', 'users', '#d1d1d6', '#3a3a3c', 'contacts']];
  const DOCK = [['Telefon', 'phone', '#34c759', '#fff', 'phone'], ['Przeglądarka', 'globe', '#fff', '#007aff', 'safari'], ['Wiadomości', 'msg', '#34c759', '#fff', 'msg'], ['Poczta', 'mail', '#1a8cff', '#fff', 'mail']];
  const appIcon = a => `<button type="button" class="icn" data-act="openApp" data-app="${a[4]}"><i style="background:${a[2]};color:${a[3]}">${I[a[1]]}</i><span>${a[0]}</span></button>`;
  function homeHTML() {
    if (S.persona === 'jerzy') return aaHomeHTML();
    const p = pendingN();
    const autoLog = S.log.filter(e => e.auto && !e.undone).slice(0, 3);
    return `<div class="pages" id="pages"><div class="track" id="track" style="transform:translateX(${-S.homePage * 50}%)">
        <div class="page" ${S.homePage ? 'inert' : ''}>
          <div class="h-widgets">
            <button type="button" class="wg wg-m" data-act="openApp" data-app="mob" data-tab="teraz" aria-label="Widżet mObywatel: najbliższe terminy">
              <span class="wg-h"><span class="n-ic sm">${I.m}</span>mObywatel · Najbliższe terminy</span>
              <span class="wg-rows"><span class="wg-row"><b>OC Skody</b><span>12 maja</span></span><span class="wg-row"><b>Przegląd techniczny</b><span>3 czerwca</span></span><span class="wg-row"><b>Paszport Kuby</b><span>20 lipca</span></span></span>
            </button>
            <button type="button" class="wg wg-s wg-doc" data-act="showDoc" data-doc="id" aria-label="Widżet: pokaż dowód osobisty">
              <span class="wg-h">${I.id}Dowód osobisty</span><span class="wg-name">Aleksandra Kowalczyk</span><span class="wg-cap">Dotknij, aby pokazać</span>
            </button>
            <button type="button" class="wg wg-s" data-act="openApp" data-app="mob" data-tab="teraz" aria-label="Widżet: sprawy do decyzji">
              <span class="wg-h"><span class="n-ic sm">${I.m}</span>Do decyzji</span><span class="wg-big ${p ? 'hot' : ''}">${p}</span><span class="wg-cap">${p ? 'czeka na Ciebie' : 'Wszystko załatwione'}</span>
            </button>
          </div>
          <div class="icons">${HOME1.map(appIcon).join('')}<button type="button" class="icn mob" data-act="openApp" data-app="mob" data-tab="teraz"><i>${I.m}</i><span>mObywatel</span></button></div>
        </div>
        <div class="page" ${S.homePage ? '' : 'inert'}>
          <div class="h-widgets">
            <button type="button" class="wg wg-m" data-act="openApp" data-app="mob" data-tab="wtle" aria-label="Widżet mObywatel: ostatnio w tle">
              <span class="wg-h"><span class="n-ic sm">${I.m}</span>mObywatel · Ostatnio w tle</span>
              <span class="wg-rows">${autoLog.map(e => `<span class="wg-row"><b>${esc(e.t)}</b><span>${esc(e.day)}</span></span>`).join('') || '<span class="wg-row"><b>Nic nowego</b><span></span></span>'}</span>
            </button>
          </div>
          <div class="icons">${HOME2.map(appIcon).join('')}</div>
        </div>
      </div></div>
      <div class="dots">${[0, 1].map(i => `<button type="button" data-act="page" data-p="${i}" aria-label="Strona ${i + 1} z 2" ${S.homePage === i ? 'aria-current="true"' : ''}><i></i></button>`).join('')}</div>
      <div class="dock">${DOCK.map(appIcon).join('')}</div>`;
  }

  /* ---------------- Pan Jerzy: Dostęp z asystą ---------------- */
  const jerzyText = () => 'Panie Jerzy, należy się Panu dodatek do ogrzewania: 500 złotych. Wniosek jest już wypełniony. Czy go złożyć?';
  function aaHomeHTML() {
    const n = findN('dodatek'); const p = n && !n.resolved ? 1 : 0;
    const tiles = [['Połączenia', 'phone', '#34c759', 'aacall'], ['Wiadomości', 'msg', '#34c759', 'aamsg'], ['Aparat', 'camera', '#636366', 'aacam'], ['Zdjęcia', 'photo', '#ff9500', 'aaphotos']];
    return `<div class="aa"><div class="aa-grid">
      ${tiles.map(t => `<button type="button" class="aa-tile" data-act="openApp" data-app="${t[3]}"><i style="background:${t[2]}">${I[t[1]]}</i>${t[0]}</button>`).join('')}
      <button type="button" class="aa-tile mob" data-act="openApp" data-app="mob"><i style="background:var(--brand)">${I.m}${p ? '<em class="aa-bdg">1</em>' : ''}</i>mObywatel</button>
    </div></div>`;
  }
  function aaAppHTML() {
    const n = findN('dodatek');
    let body;
    if (!n || S.jz === 'none') {
      body = `<h1 class="aa-h">Nic nie czeka na Pana</h1><p class="aa-p">Gdy coś będzie do zrobienia, zobaczy Pan to tutaj.</p>`;
    } else if (S.jz === 'ask') {
      body = `<h1 class="aa-h">Dodatek do ogrzewania</h1><p class="aa-p">Należy się Panu <b>500 zł</b>. Wniosek jest już wypełniony.</p>
        <div class="aa-btns">
          <button type="button" class="aa-btn" data-act="jYes"><i style="background:#34c759">${I.check}</i>Złóż wniosek</button>
          <button type="button" class="aa-btn" data-act="jSpeak"><i style="background:#007aff">${I.speaker}</i>Przeczytaj na głos</button>
          <button type="button" class="aa-btn" data-act="jAsk"><i style="background:#ff9500">${I.users}</i>Zapytaj Olę</button>
          <button type="button" class="aa-btn" data-act="jNo"><i style="background:#636366">${I.x}</i>Nie, dziękuję</button>
        </div>`;
    } else {
      const R = { done: ['Wniosek złożony', 'Pieniądze przyjdą na konto, na które dostaje Pan emeryturę.'], asked: ['Zapytaliśmy Olę', 'Ola widzi to samo co Pan. Decyzję i tak podejmuje Pan.'], no: ['Nic nie wysłaliśmy', 'Wniosek poczeka tutaj do końca kwietnia.'] }[S.jz];
      body = `<div class="aa-done">${I.check}</div><h1 class="aa-h">${R[0]}</h1><p class="aa-p">${R[1]}</p>
        <div class="aa-btns">${S.jz === 'asked' ? `<button type="button" class="aa-btn" data-act="jYes"><i style="background:#34c759">${I.check}</i>Złóż wniosek</button>` : ''}
        <button type="button" class="aa-btn" data-act="aaBack"><i style="background:#636366">${I.check}</i>Gotowe</button></div>`;
    }
    return `<div class="aa"><div class="aa-name">mObywatel</div><div class="aa-body">${body}</div><button type="button" class="aa-back" data-act="aaBack">${I.back}Wstecz</button></div>`;
  }
  function aaOtherHTML(id) {
    const B = (ic, c, t, act, attrs = '') => `<button type="button" class="aa-btn" data-act="${act}" ${attrs}><i style="background:${c}">${I[ic]}</i>${t}</button>`;
    const P = {
      aacall: ['Połączenia', `<div class="aa-btns">${B('phone', '#34c759', 'Ola (córka)', 'call', 'data-name="Ola"')}${B('phone', '#34c759', 'Piotr (zięć)', 'call', 'data-name="Piotr"')}${B('phone', '#34c759', 'Przychodnia', 'call', 'data-name="Przychodnia"')}</div>`],
      aamsg: ['Wiadomości', `<p class="aa-p"><b>Ola:</b> Tato, jak coś przyjdzie z mObywatela, możesz zdecydować sam. Ja też to widzę.</p><div class="aa-btns">${B('msg', '#34c759', 'Odpowiedz: Dobrze', 'say', 'data-msg="Wysłano: Dobrze"')}</div>`],
      aacam: ['Aparat', `<div class="aa-btns">${B('camera', '#636366', 'Zrób zdjęcie', 'say', 'data-msg="Zdjęcie zrobione"')}</div>`],
      aaphotos: ['Zdjęcia', `<div class="photos" style="border-radius:20px;overflow:hidden">${['#f4a261', '#2a9d8f', '#e9c46a', '#264653', '#e76f51', '#8ab17d'].map(c => `<i style="background:${c}"></i>`).join('')}</div>`]
    }[id];
    return `<div class="aa"><div class="aa-name">${P[0]}</div><div class="aa-body">${P[1]}</div><button type="button" class="aa-back" data-act="aaBack">${I.back}Wstecz</button></div>`;
  }

  /* ---------------- aplikacja mObywatel (iOS) ---------------- */
  const NV = { noc: 'sun', dowod: 'id', gotowy: 'cal', odebrany: 'id', bank: 'bank', pit: 'coins', mandat: 'car', pesel: 'alert' };
  const RI = { adres: 'pin', odnowienia: 'heart', terminy: 'clock', podatki: 'coins', platnosci: 'wallet', dane: 'shield' };
  const TABS = [['teraz', 'Teraz', 'sun'], ['dokumenty', 'Dokumenty', 'id'], ['wtle', 'W tle', 'list'], ['zasady', 'Zasady', 'sliders']];
  const idCard = (tag = 'button') => `<${tag} ${tag === 'button' ? 'type="button" data-act="showDoc" data-doc="id"' : ''} class="wcard wc-id"><span class="wc-top"><span><small>Rzeczpospolita Polska</small><b>Dowód osobisty</b></span><span class="wc-m">${I.m}</span></span><span class="wc-bot"><span><b>${OLA.name}</b><span>${S.doc === 'new' ? 'DKR 771045' : OLA.docNo}</span></span><span>ważny do ${S.doc === 'new' ? '10.12.2036' : '24.01.2027'}</span></span></${tag}>`;
  const dlCard = (tag = 'button') => `<${tag} ${tag === 'button' ? 'type="button" data-act="showDoc" data-doc="dl"' : ''} class="wcard wc-dl"><span class="wc-top"><span><small>Rzeczpospolita Polska</small><b>Prawo jazdy</b></span><span class="wc-m">${I.car}</span></span><span class="wc-bot"><span><b>${OLA.name}</b><span>kategoria B</span></span><span>bezterminowe</span></span></${tag}>`;
  const ekCard = (tag = 'button') => `<${tag} ${tag === 'button' ? 'type="button" data-act="showDoc" data-doc="ek"' : ''} class="wcard wc-ek"><span class="wc-top"><span><small>NFZ</small><b>Karta EKUZ</b></span><span class="wc-m">${I.heart}</span></span><span class="wc-bot"><span><b>${OLA.name}</b><span>przedłużona sama 24 listopada</span></span><span>do 2031</span></span></${tag}>`;
  function mobHTML() {
    let body = '';
    const pend = S.notifs.filter(n => !n.resolved);
    if (S.mobTab === 'teraz') {
      const autoN = S.log.filter(e => e.auto && !e.undone).length;
      body += navL('Teraz', esc(S.date), `<button type="button" class="av" data-act="profile" aria-label="Twój profil">AK</button>`);
      if (pend.length) {
        const dec = pend.filter(n => !NOTIF[n.kind].info), inf = pend.filter(n => NOTIF[n.kind].info);
        const [top, ...rest] = [...dec, ...inf];
        const d = NOTIF[top.kind];
        const k = d.critical ? 'alert' : (NV[top.kind] || 'bell');
        body += `<section class="hero">
          <div class="hero-h"><span>${dec.length ? 'Czeka na Twoją decyzję' : 'Nowe'}</span><span class="hero-n ${dec.length ? '' : 'info'}">${dec.length || inf.length}</span></div>
          <div class="hero-main">${icn(k).replace('class="ic"', 'class="ic xl"')}<div><b>${esc(d.title())}</b><span>${esc(d.body)}</span></div></div>
          <div class="hero-cta"><button type="button" class="ibtn ${d.critical ? 'red' : 'fill'}" data-act="openNotif" data-kind="${top.kind}">${d.critical ? 'Sprawdź teraz' : d.info ? 'Zobacz' : 'Zobacz i zdecyduj'}</button></div>
          ${rest.length ? `<div class="ig-b ics hero-more">${rest.map(n => row({ ic: NOTIF[n.kind].critical ? 'alert' : (NV[n.kind] || 'bell'), t: esc(NOTIF[n.kind].title()), chev: true, act: 'openNotif', attrs: `data-kind="${n.kind}"` })).join('')}</div>` : ''}
        </section>`;
      } else {
        body += `<section class="hero calm"><span class="calm-ic">${I.check}</span><b>Wszystko załatwione</b><span>${autoN ? `W tle załatwiliśmy ${autoN} ${autoN === 1 ? 'sprawę' : autoN < 5 ? 'sprawy' : 'spraw'}.` : ''} Gdy coś będzie wymagało decyzji, zobaczysz to na ekranie blokady.</span></section>`;
      }
      const L = curLive();
      if (L) body += `<div class="live"><div class="lt"><span class="ic lg" style="--c:#d4213d">${L.done ? I.check : I.id}</span><span><b>${esc(L.title)}</b><span>${esc(L.sub)}</span></span>${L.num ? `<span class="num">${L.num}</span>` : ''}</div>${progHTML(L.step)}</div>`;
      body += group(S.log.slice(0, 3).map(e => row({ ic: e.ic, c: e.undone ? '#c7c7cc' : undefined, t: `<span class="${e.undone ? 'strike' : ''}">${esc(e.t)}</span>`, d: `${esc(e.day)} · ${e.auto ? 'samo' : 'Twoja decyzja'}` })),
        { h: `<span>Ostatnio</span><button type="button" class="ig-link" data-act="tab" data-tab="wtle">Wszystko</button>` });
      body += group([
        row({ ic: 'car', t: 'OC Skody', v: '12 maja' }),
        row({ ic: 'car', t: 'Przegląd techniczny', v: '3 czerwca' }),
        row({ ic: 'plane', t: 'Paszport Kuby', v: '20 lipca' })], { h: 'Wkrótce', f: 'O każdym terminie przypomnimy 14 dni wcześniej.' });
      body += group([
        row({ ic: 'id', t: 'Pokaż dowód osobisty', chev: true, act: 'showDoc', attrs: 'data-doc="id"' }),
        row({ ic: 'sparkle', t: 'Zapytaj asystenta', chev: true, act: 'ask' })]);
    } else if (S.mobTab === 'dokumenty') {
      body += navL('Dokumenty', OLA.name);
      body += `<div class="wstack">${ekCard()}${dlCard()}${idCard()}</div>`;
      body += group([row({ ic: 'file', t: 'Dodaj dokument', d: 'Legitymacja, Karta Dużej Rodziny i inne', chev: true, act: 'say', attrs: 'data-msg="W prototypie są 3 dokumenty."' })]);
    } else if (S.mobTab === 'wtle') {
      body += navL('W\u00a0tle', 'Dziennik zmian');
      const nA = S.log.filter(e => e.auto && !e.undone).length, nY = S.log.filter(e => e.you).length;
      body += `<div class="tiles"><div class="tile" style="--c:#34c759"><span class="th">${I.sparkle}Samo</span><span class="tv">${nA}</span><span class="ts">zmiany automatyczne</span></div><div class="tile" style="--c:#007aff"><span class="th">${I.check}Ty</span><span class="tv">${nY}</span><span class="ts">Twoje decyzje</span></div></div>`;
      const days = [];
      S.log.forEach(e => { let g = days.find(d => d.day === e.day); if (!g) days.push(g = { day: e.day, items: [] }); g.items.push(e); });
      body += days.map(g => group(g.items.map(e => `<div class="row log">${icn(e.ic, e.undone ? '#c7c7cc' : undefined)}<span class="r-t">
          <b class="${e.undone ? 'strike' : ''}">${esc(e.t)}</b><span>${esc(e.d)}</span>
          <small><em class="${e.auto ? 'auto' : 'you'}">${e.undone ? 'Cofnięte' : e.auto ? 'Samo' : 'Twoja decyzja'}</em> · ${esc(e.time)} · ${esc(e.src)}</small></span>
          ${e.auto && !e.undone ? `<button type="button" class="txtbtn" data-act="undo" data-id="${e.id}">Cofnij</button>` : ''}</div>`), { h: esc(g.day) })).join('');
      body += `<div class="ig-f" style="margin:-12px 16px 24px">Automatyczne zmiany cofniesz przez 14 dni.</div>`;
    } else {
      body += navL('Zasady', 'Co może dziać się samo');
      body += group(RULES.filter(r => !r.locked).map(r => `<div class="row rule"><div class="rt">${icn(RI[r.id])}<span class="r-t"><b>${r.t}</b><span>${r.d}</span></span></div>
          <div class="seg" role="radiogroup" aria-label="${esc(r.t)}">${OPTS.map(([v, l]) => `<button type="button" role="radio" aria-checked="${S.rules[r.id] === v}" data-act="rule" data-id="${r.id}" data-v="${v}">${l}</button>`).join('')}</div></div>`),
        { f: '„Samo”: robimy to i od razu Cię informujemy. Możesz to cofnąć przez 14 dni.' });
      body += group(RULES.filter(r => r.locked).map(r => row({ ic: RI[r.id], t: r.t, d: r.d, right: `<span class="r-v">${I.lock.replace('<svg', '<svg width="16" height="16"')}</span>` })), { h: 'Zawsze z Twoją zgodą', f: 'Pieniądze i Twoje dane nigdy nie wychodzą bez Face ID.' });
    }
    return `<div class="scroll" id="appScroll">${body}</div>
      <nav class="app-nav" aria-label="Menu aplikacji">${TABS.map(([id, l, ic]) => `<button type="button" class="tab" data-act="tab" data-tab="${id}" ${S.mobTab === id ? 'aria-current="page"' : ''}>${I[ic]}<span>${l}</span>${id === 'teraz' && pend.length ? `<span class="tb">${pend.length}</span>` : ''}</button>`).join('')}</nav>`;
  }

  /* ---------------- pozostałe aplikacje ---------------- */
  const PHOTO_C = ['#f4a261', '#2a9d8f', '#e9c46a', '#264653', '#e76f51', '#8ab17d', '#6d597a', '#b56576', '#355070', '#eaac8b', '#90be6d', '#43aa8b', '#577590', '#f94144', '#f8961e'];
  const shell = (body, cls = '') => `<div class="scroll ${cls}">${body}</div>`;
  const APPS = {
    cal: () => { discover('kalendarz'); return shell(navL('Kalendarz', S.date.split(', ')[1] || '') + group([
      ...(S.booked && S.doc !== 'new' ? [row({ ic: 'id', t: 'Odbiór dowodu', d: `${S.booked} · Urząd Miasta Krakowa`, d2: 'Dodane przez mObywatel', chev: true, act: 'goMob', attrs: 'data-tab="teraz"' })] : []),
      row({ ic: 'users', c: '#5856d6', t: 'Wywiadówka Kuby', d: 'Szkoła Podstawowa nr 7', v: 'pt 18:00' }),
      row({ ic: 'car', t: 'Koniec OC Skody', d: 'Przypomnienie z mObywatela', v: '12 maja', chev: true, act: 'goMob', attrs: 'data-tab="teraz"' }),
      row({ ic: 'car', t: 'Przegląd techniczny', d: 'Przypomnienie z mObywatela', v: '3 czerwca' }),
      row({ ic: 'plane', t: 'Paszport Kuby traci ważność', d: 'Przypomnienie z mObywatela', v: '20 lipca' })], { h: 'Nadchodzące' }) +
      (S.booked || S.doc === 'new' ? '' : note('info', '', 'Gdy zarezerwujesz odbiór dowodu, termin pojawi się tutaj sam.'))); },
    msg: () => {
      if (S.sub === 'piotr') {
        discover('wiadomosci');
        const m = [['in', 'Słuchaj, przyszło coś z fotoradaru na Opolskiej? To chyba ja jechałem 😅']];
        if (S.mandat === 'piotr') m.push(['in', 'Mam prośbę w mObywatelu. Potwierdziłem, mandat jest na mnie.']);
        if (S.mandat === 'paid') m.push(['out', 'Już zapłaciłam, 3 dotknięcia 😉'], ['in', 'Dzięki!']);
        return shell(nb('Piotr', 'Wiadomości') + `<div class="thread"><time>${esc(S.date)}</time>${m.map(([d, t]) => `<div class="bub ${d}">${t}</div>`).join('')}</div>`, 'white');
      }
      if (S.sub === 'tata') {
        const m = [['in', 'Ola, dzwoniłem. Oddzwoń, jak możesz.']];
        if (S.jz === 'asked') m.push(['in', 'Przyszło coś z mObywatela o dodatku do ogrzewania. Co robić?'], ['out', 'Tato, złóż, to się należy. Widzę to samo co Ty.']);
        if (S.jz === 'done') m.push(['in', 'Złożyłem ten wniosek o dodatek. Sam!']);
        return shell(nb('Tata', 'Wiadomości') + `<div class="thread"><time>${esc(S.date)}</time>${m.map(([d, t]) => `<div class="bub ${d}">${t}</div>`).join('')}</div>`, 'white');
      }
      return shell(navL('Wiadomości') + group([
        row({ ic: 'user', c: '#8e8e93', t: 'Piotr', d: S.mandat ? 'Dzięki!' : 'Przyszło coś z fotoradaru?', chev: true, act: 'sub', attrs: 'data-sub="piotr"' }),
        row({ ic: 'user', c: '#8e8e93', t: 'Tata', d: S.jz === 'done' ? 'Złożyłem ten wniosek o dodatek. Sam!' : 'Oddzwoń, jak możesz.', chev: true, act: 'sub', attrs: 'data-sub="tata"' }),
        ...(S.bank === 'yes' ? [row({ ic: 'bank', t: 'Bank Nowy', d: 'Twoje konto jest gotowe.' })] : [])]));
    },
    phone: () => shell(navL('Ostatnie') + group([['Tata', 'komórka', 'wczoraj'], ['Piotr', 'komórka', 'pon.'], ['Przychodnia Zielna', 'praca', '20.11']].map(([n, d, v]) => row({ ic: 'phone', t: n, d, v, act: 'call', attrs: `data-name="${n}"` })))),
    mail: () => shell(navL('Skrzynka') + group([
      ...(S.mandat || S.q.mandat ? [row({ ic: 'mail', t: 'e-Doręczenia', d: 'Wezwanie z fotoradaru jest w mObywatelu. Nie wyślemy listu poleconego.', chev: true, act: 'goMob', attrs: 'data-tab="teraz"' })] : []),
      ...(S.pit === 'sent' ? [row({ ic: 'file', t: 'Urząd Skarbowy', d: 'UPO: Twoje zeznanie PIT-37 zostało przyjęte.' })] : []),
      ...(S.bank === 'yes' ? [row({ ic: 'bank', t: 'Bank Nowy', d: 'Witamy! Konto otworzyliśmy na podstawie danych z mObywatela.' })] : []),
      row({ ic: 'mail', c: '#8e8e93', t: 'Wspólnota Zielna 8', d: 'Odczyt liczników w przyszłym tygodniu.' }),
      row({ ic: 'mail', c: '#8e8e93', t: 'Szkoła Podstawowa nr 7', d: 'Zebranie z rodzicami w piątek.' })])),
    photos: () => shell(navL('Biblioteka') + `<div class="photos">${S.photo ? `<i class="sel" data-l="Zdjęcie do dowodu" style="background:radial-gradient(circle at 50% 40%,#d6cfc7,#9f978f)"></i>` : ''}${PHOTO_C.map(c => `<i style="background:${c}"></i>`).join('')}</div>`, 'white'),
    maps: () => shell(`<div class="mapv"><svg viewBox="0 0 390 420" aria-hidden="true"><path d="M-10 120L400 60M-10 300L400 250M80-10L130 430M260-10L300 430" stroke="#fff" stroke-width="18"/><path d="M-10 120L400 60M-10 300L400 250M80-10L130 430M260-10L300 430" stroke="#f6d77a" stroke-width="6"/><rect x="150" y="110" width="80" height="60" rx="8" fill="#cfe3c4"/><path d="M0 380Q200 330 400 390V420H0z" fill="#a8d0f0"/></svg><span class="mpin"><i>${I.pin}</i><b>Urząd Miasta Krakowa</b></span></div>` + group([row({ ic: 'pin', t: 'Wydział Spraw Obywatelskich', d: 'Tu odbierzesz dowód · 12 min pieszo', chev: true, act: 'say', attrs: 'data-msg="W prototypie nie wyznaczamy trasy."' })]), ''),
    weather: () => `<div class="scroll" style="padding:0"><div class="wx"><div class="city">Kraków</div><div class="deg">3°</div><div class="cond">Pochmurno</div><div class="hours">${[['Teraz', '3°'], ['10', '4°'], ['11', '5°'], ['12', '5°'], ['13', '6°']].map(([h, t]) => `<span>${h}<b>${t}</b></span>`).join('')}</div></div></div>`,
    clock: () => shell(`<div class="clockv"><div class="big">${esc(S.time)}</div></div>` + group([row({ t: '6:30', d: 'Dni robocze', right: '<span class="sw"></span>' }), row({ t: '8:00', d: 'Weekend', right: '<span class="sw off"></span>' })], { h: 'Budziki', icons: false })),
    notes: () => { discover('notatki'); return shell(nb('Po przeprowadzce', 'Notatki') + group([
      ['Zameldowanie w nowym mieszkaniu', true, 'zrobione 20 listopada'], ['Adres w rejestrze pojazdów', true, 'zrobił mObywatel w nocy'], ['Adres w urzędzie skarbowym', true, 'zrobił mObywatel w nocy'],
      ['Nowy dowód', S.doc === 'new', S.doc === 'new' ? 'odebrany' : 'traci ważność 24 stycznia'], ['Przepisać Kubę do nowej przychodni', false, ''], ['Kupić zasłony do salonu', false, '']
    ].map(([t, ok, d]) => row({ ic: ok ? 'checkc' : 'circle', t: ok ? `<span class="strike">${t}</span>` : t, d }))) +
      note('sparkle', 'Dwie pozycje odhaczyły się same', 'Nie trzeba było niczego zgłaszać.', 'green'), 'white'); },
    camera: () => `<div class="camv"><div class="view"></div><div class="bar"><button type="button" class="shutter" data-act="shutter" aria-label="Zrób zdjęcie"></button></div></div>`,
    settings: () => {
      if (S.sub === 'notif') {
        discover('ustawienia');
        return shell(nb('mObywatel', 'Ustawienia') + group([row({ t: 'Zezwalaj na powiadomienia', right: '<span class="sw"></span>' }), row({ t: 'Ekran blokady', right: '<span class="sw"></span>' }), row({ t: 'Aktywności na żywo', right: '<span class="sw"></span>' }), row({ t: 'Alerty krytyczne', d: 'np. pożyczka na Twój PESEL', right: '<span class="sw"></span>' })], { icons: false, f: 'Alert krytyczny dźwięczy nawet w trybie Nie przeszkadzać.' }));
      }
      if (S.sub === 'acc') {
        return shell(nb('Dostępność', 'Ustawienia') + group([row({ t: 'Dostęp z asystą', v: 'Wył.' }), row({ t: 'Większa czcionka', v: 'Wył.' })], { icons: false, f: 'Tata Oli, Pan Jerzy, ma włączony Dostęp z asystą.' }) +
          group([row({ ic: 'users', t: 'Zobacz telefon taty', d: 'Misja „Telefon taty”', chev: true, act: 'quest', attrs: 'data-q="jerzy"' })]));
      }
      return shell(navL('Ustawienia') + group([row({ ic: 'user', c: '#8e8e93', t: OLA.name, d: 'Konto Apple, iCloud', chev: true, act: 'say', attrs: 'data-msg="W prototypie konto jest fikcyjne."' })]) +
        group([row({ ic: 'bell', c: '#ff3b30', t: 'Powiadomienia', chev: true, act: 'sub', attrs: 'data-sub="notif"' }), row({ ic: 'face', t: 'Face ID i kod', chev: true, act: 'say', attrs: 'data-msg="Face ID jest włączone."' }), row({ ic: 'info', t: 'Dostępność', chev: true, act: 'sub', attrs: 'data-sub="acc"' })]));
    },
    health: () => shell(navL('Podsumowanie') + group([row({ ic: 'heart', t: 'Kroki', v: '6 241' }), row({ ic: 'heart', t: 'Sen', v: '7 godz. 12 min' })], { h: 'Dziś' }) + group([row({ ic: 'id', t: 'Karta EKUZ', d: 'Ważna do 2031 · z mObywatela', chev: true, act: 'showDoc', attrs: 'data-doc="ek"' })], { h: 'Dokumenty zdrowotne' })),
    wallet: () => shell(navL('Portfel') + `<div class="wstack"><div class="wcard" style="background:linear-gradient(140deg,#2c2c2e,#000);cursor:default"><span class="wc-top"><span><small>Bank Nowy</small><b>Debit</b></span></span><span class="wc-bot"><span><b>•••• 4821</b></span><span>VISA</span></span></div></div>` + group([row({ ic: 'id', t: 'Dokumenty są w mObywatelu', d: 'Dowód, prawo jazdy, EKUZ', chev: true, act: 'goMob', attrs: 'data-tab="dokumenty"' })])),
    music: () => shell(navL('Muzyka') + group([row({ ic: 'music', c: '#fc3c44', t: 'Teraz odtwarzane', d: 'Lista: Poranek' }), row({ ic: 'music', c: '#fc3c44', t: 'Ostatnio dodane', d: '12 utworów' })])),
    books: () => shell(navL('Książki') + group([row({ ic: 'book', t: 'Czytam teraz', d: 'Przewodnik po Chorwacji', v: '34%' })])),
    files: () => shell(navL('Pliki') + group([
      ...(S.pit === 'sent' ? [row({ ic: 'file', t: 'UPO_PIT-37_2025.pdf', d: 'dziś · 84 KB' })] : []),
      ...(S.photo ? [row({ ic: 'photo', c: '#ff9500', t: 'Zdjęcie_do_dowodu.jpg', d: '25 listopada · 1,2 MB' })] : []),
      row({ ic: 'file', t: 'Umowa_najmu_Zielna_8.pdf', d: '15 listopada · 310 KB' })], { h: 'Ostatnie' })),
    store: () => shell(navL('Aplikacje') + `<div class="store-hero"><i>${I.m}</i><span><b>mObywatel</b><span>Sprawy urzędowe w telefonie</span></span></div><div style="margin:0 16px 24px"><button type="button" class="ibtn fill" data-act="openApp" data-app="mob">Otwórz</button></div>` + group([row({ t: 'Oceny', v: '4,8 ★' }), row({ t: 'Kategoria', v: 'Narzędzia' })], { icons: false })),
    contacts: () => shell(navL('Kontakty') + group([['Jerzy Nowicki', 'Tata'], ['Piotr Kowalczyk', 'Mąż'], ['Kuba Kowalczyk', 'Syn']].map(([n, d]) => row({ ic: 'user', c: '#8e8e93', t: n, d, act: 'call', attrs: `data-name="${n.split(' ')[0]}"` })))),
    safari: () => shell(navL('Ulubione') + group([row({ ic: 'globe', c: '#007aff', t: 'Wiadomości lokalne', d: 'Kraków' }), row({ ic: 'globe', c: '#007aff', t: 'Przepisy kulinarne', d: 'Zapisane' }), row({ ic: 'm', c: '#d4213d', t: 'mObywatel', d: 'Otwórz w aplikacji', chev: true, act: 'openApp', attrs: 'data-app="mob"' })]))
  };
  const DARK_APPS = ['camera', 'weather'];
  function appHTML() {
    if (S.call) return `<div class="callv"><b>${esc(S.call)}</b><span>Łączenie…</span><button type="button" class="end" data-act="endCall" aria-label="Rozłącz">${I.phone}</button></div>`;
    if (S.persona === 'jerzy') return S.app === 'mob' ? aaAppHTML() : aaOtherHTML(S.app);
    if (S.app === 'mob') return mobHTML();
    const f = APPS[S.app];
    return f ? f() : shell(navL('Aplikacja'));
  }
  function renderIsland() {
    const el = $('#island');
    const L = curLive();
    const showC = L && S.screen !== 'lock';
    el.classList.toggle('open', !!(L && S.islandOpen && S.screen !== 'lock'));
    el.classList.toggle('compact', !!(showC && !S.islandOpen));
    if (!L) { el.innerHTML = ''; el.setAttribute('aria-label', 'Dynamic Island'); el.tabIndex = -1; return; }
    const tA = I18N.t;
    el.tabIndex = showC ? 0 : -1;
    el.setAttribute('aria-label', tA(`Aktywność na żywo: ${L.title}. ${L.sub}`));
    el.innerHTML = `<span class="is-c"><span class="mini">${L.done ? I.check : I.id}</span><b class="${L.go || L.done ? 'ok' : ''}">${esc(L.short)}</b></span>
      <span class="is-o"><span class="big-ic">${L.done ? I.check : I.id}</span><span style="grid-column:2"><span class="t">${esc(L.title)}</span><span class="s" style="display:block">${esc(L.sub)}</span></span>${L.num ? `<span class="num ${L.go ? 'go' : ''}">${L.num}</span>` : '<span></span>'}<span class="prog">${progHTML(L.step)}</span></span>`;
  }
  function renderDoc() {
    const el = $('#docv');
    if (!S.docOpen) { el.hidden = true; el.innerHTML = ''; return; }
    const d = S.docOpen;
    el.hidden = false;
    let html = '';
    if (d === 'id') {
      discover('qr');
      html = `<div class="ig">${idCard('div')}</div><div class="qr-c">${qr(S.doc === 'new' ? 23 : 11)}<span class="live-dot"><i></i>Sprawdzony teraz</span><span>Pokaż kod osobie, która sprawdza dokument. Zobaczy tylko to, na co się zgodzisz.</span></div>` +
        kv([['Numer', S.doc === 'new' ? 'DKR 771045' : OLA.docNo], ['Ważny do', S.doc === 'new' ? '10.12.2036' : '24.01.2027'], ['PESEL', OLA.pesel], ['Adres', OLA.addr]]);
    } else if (d === 'dl') {
      html = `<div class="ig">${dlCard('div')}</div>` + kv([['Kategorie', 'B'], ['Ważne', 'bezterminowo'], ['Punkty karne', '0', 'stan na dziś']]);
    } else {
      html = `<div class="ig">${ekCard('div')}</div>` + kv([['Ważna do', '31.12.2031'], ['Wydał', 'NFZ', 'przedłużona automatycznie']]);
    }
    el.innerHTML = `<div class="scroll">${nb({ id: 'Dowód osobisty', dl: 'Prawo jazdy', ek: 'Karta EKUZ' }[d], '', '<button type="button" class="done" data-act="closeDoc">Gotowe</button>')}${html}</div>`;
  }
  function setInert() {
    const sheetOpen = !$('#sheet').hidden;
    const overlay = sheetOpen || !$('#ask').hidden || !!S.docOpen;
    $('#lock').inert = S.screen !== 'lock' || overlay;
    $('#home').inert = S.screen !== 'home' || overlay;
    $('#app').inert = S.screen !== 'app' || overlay;
    $('#ask').inert = sheetOpen;
    $('#docv').inert = sheetOpen;
  }

  /* ---------------- wskazówki w telefonie ---------------- */
  function toMob(sel, tab) {
    if (S.screen === 'lock') return '#lock .lk-hint';
    if (S.screen === 'home') return S.homePage ? '#home .dots button[data-p="0"]' : '#home .icn.mob i';
    if (S.app !== 'mob' || S.call) return '#homebar';
    if (tab && S.mobTab !== tab) return `#app .tab[data-tab="${tab}"]`;
    return sel;
  }
  function targetSel() {
    const q = QMAP[S.cur]; if (!q || S.q[q.id] === 'done') return null;
    if (q.id === 'jerzy' && S.persona !== 'jerzy') return null;
    if (q.id !== 'jerzy' && S.persona === 'jerzy') return null;
    if (!$('#fid').hidden) return null;
    if (!$('#sheet').hidden) return '#sheet [data-sa="0"]:not(:disabled)';
    if (!$('#ask').hidden) return q.id === 'ask' && !S.asked ? '#ask .sugg button[data-k="chorw"]' : '#ask .cancel';
    if (S.docOpen) return '#docv .done';
    if (q.id === 'dowod') {
      if (advNow()) return null;
      if (S.live === 5 || S.live === 6) return S.screen === 'lock' ? '#lock .lk-hint' : S.islandOpen ? null : '#island';
    }
    const kind = typeof q.kind === 'function' ? q.kind() : q.kind;
    if (kind) {
      const n = findN(kind);
      if (n && !n.resolved) {
        if (!$('#banner').hidden && $('#banner .notif')?.dataset.kind === kind) return '#banner .notif';
        if (S.persona === 'jerzy') {
          if (S.screen === 'lock') return `#lock .notif[data-kind="${kind}"]`;
          if (S.screen === 'home') return '#home .aa-tile.mob i';
          if (S.app !== 'mob') return '#app .aa-back';
          return S.jz === 'ask' ? '#app [data-act="jYes"]' : '#app [data-act="jYes"]';
        }
        if (S.screen === 'lock' && !n.opened) return `#lock .notif[data-kind="${kind}"]`;
        return toMob(`#app [data-kind="${kind}"]`, 'teraz');
      }
    }
    if (q.id === 'ask') return S.screen === 'lock' ? '#lock [data-act="ask"]' : toMob('#app .row[data-act="ask"]', 'teraz');
    if (q.id === 'kontrola') return toMob('#app [data-act="undo"]', 'wtle');
    if (q.id === 'noc') return toMob('#app .tab[data-tab="wtle"]', null);
    return null;
  }
  let idleT = null, hintOn = false;
  function scheduleHint(ms = 5000) {
    clearTimeout(idleT); hintOn = false;
    $$('.q-target').forEach(e => e.classList.remove('q-target'));
    idleT = setTimeout(() => { hintOn = true; applyHint(); }, ms);
  }
  function applyHint(flash) {
    $$('.q-target').forEach(e => e.classList.remove('q-target'));
    if (flash) hintOn = true;
    if (!hintOn) return null;
    const sel = targetSel(); if (!sel) return null;
    const el = $(sel); if (!el) return null;
    el.classList.add('q-target');
    const sc = el.closest('.scroll, .sh-scroll');
    if (sc) {
      const r = el.getBoundingClientRect(), b = sc.getBoundingClientRect();
      if (r.top < b.top + 40 || r.bottom > b.bottom - 90) sc.scrollTop += (r.top - b.top) - b.height / 3;
    }
    return el;
  }

  /* ---------------- strona: misje ---------------- */
  let listOpen = false;
  function renderWeb() {
    const q = QMAP[S.cur], i = QUESTS.indexOf(q), isDone = S.q[S.cur] === 'done', nd = doneN(), nDisc = Object.keys(S.disc).length;
    const adv = advNow(), v = MV[q.id], nxt = nextQuest(), allDone = nd === QUESTS.length;
    const dots = QUESTS.map((x, k) => `<button type="button" class="qdot ${S.q[x.id] === 'done' ? 'done' : ''} ${x.id === S.cur ? 'cur' : ''}" data-act="quest" data-q="${x.id}" title="${k + 1}. ${x.t}" aria-label="Misja ${k + 1}: ${x.t}${S.q[x.id] === 'done' ? ', ukończona' : ''}"></button>`).join('');
    const list = QUESTS.map((x, k) => `<button type="button" class="item qitem ${S.q[x.id] === 'done' ? 'done' : ''}" data-act="quest" data-q="${x.id}" ${x.id === S.cur ? 'aria-current="true"' : ''}><span class="item-media mic" aria-hidden="true">${S.q[x.id] === 'done' ? I.check : k + 1}</span><span class="item-content"><span class="item-title">${x.t}</span></span></button>`).join('');
    let head, action = '';
    if (allDone && isDone) {
      head = `<p class="q-kicker">${I.trophy}Historia ukończona</p><h2 class="card-title">Wszystkie misje za Tobą</h2><p class="card-desc">Telefon nadal działa. Odkrycia: ${nDisc} z ${DISC.length}.</p>`;
      action = `${S.persona === 'jerzy' ? wBtn('Wróć do telefonu Oli', { act: 'persona', attrs: 'data-p="ola" style="width:100%;margin-bottom:8px"' }) : ''}<a class="btn btn-outline" href="#zasady" style="width:100%">Jak to działa</a>`;
    } else if (isDone) {
      head = `<p class="q-kicker done">${I.checkc}Misja ukończona</p><h2 class="card-title">${q.t}</h2><p class="card-desc">${q.win}</p>`;
      action = `<div class="cmp" aria-label="Porównanie"><div><small>Dziś</small><b>${v.was[0]}</b><span>${v.was[1]}</span></div><div class="now"><small>W tle</small><b>${v.now[0]}</b><span>${v.now[1]}</span></div></div>
        ${nxt ? wBtn('Następna misja', { act: 'quest', ic: 'chev', attrs: `data-q="${nxt}" style="width:100%"` }) : ''}
        ${S.persona === 'jerzy' ? wBtn('Wróć do telefonu Oli', { v: 'outline', act: 'persona', attrs: 'data-p="ola" style="width:100%;margin-top:8px"' }) : ''}`;
    } else {
      head = `<p class="q-kicker">Misja ${i + 1} z ${QUESTS.length}</p><h2 class="card-title">${q.t}</h2><p class="card-desc goal">${q.goal()}</p>`;
      if (adv) action = wBtn(adv.label, { act: 'adv', ic: 'ff', attrs: 'style="width:100%"' });
      else if (q.id === 'jerzy' && S.persona !== 'jerzy') action = wBtn('Weź telefon taty', { act: 'persona', ic: 'users', attrs: 'data-p="jerzy" style="width:100%"' });
    }
    const html = `<div class="card-header">${head}</div>
      ${action ? `<div class="card-content">${action}</div>` : ''}
      <div class="card-footer qfoot"><div class="qdots" role="group" aria-label="Postęp: ${nd} z ${QUESTS.length}">${dots}</div>${!isDone ? '<button type="button" class="q-help" data-act="hintFlash">Nie wiesz, co dalej?</button>' : ''}</div>
      <div class="qacc ${listOpen ? 'open' : ''}">
        <button type="button" class="qacc-t" data-act="qlist" aria-expanded="${listOpen}"><span>Wszystkie misje</span><span class="muted">${nd}/${QUESTS.length}</span>${I.chev}</button>
        ${listOpen ? `<div class="item-group moments">${list}</div><div class="qacc-f">${S.persona === 'jerzy' ? '<button type="button" class="q-help" data-act="persona" data-p="ola">Wróć do telefonu Oli</button>' : '<span></span>'}<button type="button" class="q-help" data-act="reset">Zacznij od nowa</button></div>` : ''}
      </div>`;
    $('#ctx').innerHTML = html;
    $('#mCtx').innerHTML = html;
    $('#mBtn').textContent = I18N.t(isDone ? `Misje ${nd}/${QUESTS.length}` : `Misja ${i + 1}: ${q.t}`);
    const ma = $('#mAdv'); ma.hidden = !adv; if (adv) ma.innerHTML = `${I.ff}${adv.label}`;
  }
  function after() { checkQuests(); renderWeb(); applyHint(); }
  function render() {
    const p = $('#phone');
    p.dataset.screen = S.screen;
    p.classList.toggle('jerzy', S.persona === 'jerzy');
    const dark = S.persona === 'jerzy' || S.call || DARK_APPS.includes(S.app);
    p.classList.toggle('dark-status', (S.screen === 'app' && !dark) || !!S.docOpen);
    $('#sbTime').textContent = S.screen === 'lock' && !S.docOpen ? '' : S.time;
    $('#lock').innerHTML = lockHTML();
    $('#home').innerHTML = homeHTML();
    const sc = $('#appScroll'); const top = sc ? sc.scrollTop : 0;
    $('#app').innerHTML = appHTML();
    if (top && $('#appScroll')) $('#appScroll').scrollTop = top;
    renderIsland(); renderDoc(); setInert();
    S.notifs.forEach(n => { n.fresh = false; });
    S.liveFresh = false;
    after();
  }
  function setPage(i) {
    S.homePage = Math.max(0, Math.min(1, i));
    if (S.homePage) discover('strona');
    $('#home').innerHTML = homeHTML(); after();
  }
  function switchPersona(p, quiet) {
    if (S.persona === p) return;
    closeAll();
    const keys = ['screen', 'app', 'mobTab', 'sub', 'notifs', 'homePage', 'islandOpen'];
    S.saved[S.persona] = Object.fromEntries(keys.map(k => [k, S[k]]));
    Object.assign(S, { screen: 'lock', app: 'mob', mobTab: 'teraz', sub: null, notifs: [], homePage: 0, islandOpen: false }, S.saved[p] || {});
    S.persona = p;
    if (p === 'jerzy' && !S.q.jerzy) { S.q.jerzy = 'active'; S.date = QMAP.jerzy.at[0]; S.time = QMAP.jerzy.at[1]; QMAP.jerzy.start(); S.cur = 'jerzy'; }
    if (!quiet) render();
  }

  /* ---------------- nawigacja ---------------- */
  function closeAll() {
    if (!$('#sheet').hidden) closeSheet();
    if (!$('#ask').hidden) closeAsk();
    S.docOpen = null; S.call = null; $('#banner').hidden = true;
    clearTimeout(toastT); $('#toast').classList.remove('show');
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
  function openApp(id = 'mob', tab) {
    closeAll(); S.screen = 'app'; S.app = id; S.sub = null;
    if (id === 'mob' && tab) S.mobTab = tab;
    if (id === 'mob' && S.mobTab === 'wtle') S.nocRead = S.nocRead || !!findN('noc');
    render();
    if ($('#appScroll')) $('#appScroll').scrollTop = 0;
  }
  async function toApp(tab) {
    if (tab) S.mobTab = tab;
    S.app = 'mob'; S.sub = null;
    if (S.screen === 'lock') await unlock('app');
    else if (S.screen !== 'app') { S.screen = 'app'; render(); }
    else render();
    await wait(180);
  }
  async function openDoc(d = 'id') { await toApp(); S.docOpen = d; render(); }

  /* ---------------- akcje ---------------- */
  const ACT = {
    quest(el) { startQuest(el.dataset.q); },
    tryq(el) { startQuest(el.dataset.q); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    skip() { const n = nextQuest(); if (n) startQuest(n); },
    hintFlash() {
      const el = applyHint(true);
      if (!el) webToast(advNow() ? 'Teraz przewiń czas przyciskiem w karcie misji.' : (S.cur === 'jerzy' && S.persona !== 'jerzy') ? 'Najpierw weź telefon taty.' : 'Rozejrzyj się w telefonie. Tu nie ma jednego właściwego przycisku.');
    },
    qlist() { listOpen = !listOpen; renderWeb(); },
    persona(el) {
      const p = el.dataset.p;
      if (p === 'jerzy') startQuest('jerzy');
      else { switchPersona('ola'); if (S.cur === 'jerzy' && S.q.jerzy === 'done') { const n = nextQuest(); if (n) S.cur = n; } render(); }
    },
    async openNotif(el) {
      const kind = el.dataset.kind; const d = NOTIF[kind]; if (!d) return;
      $('#banner').hidden = true;
      const n = findN(kind); if (n) n.opened = true;
      if (S.persona === 'jerzy') { await toApp(); return; }
      await toApp(S.screen === 'app' && S.app === 'mob' ? null : 'teraz');
      d.open();
    },
    unlock() { unlock('home'); },
    homebar() {
      if (S.call) { S.call = null; render(); return; }
      if (S.docOpen) { S.docOpen = null; render(); return; }
      if (!$('#ask').hidden) { closeAsk(); return; }
      if (!$('#sheet').hidden) closeSheet();
      if (S.screen === 'app') { S.screen = 'home'; S.sub = null; render(); }
      else if (S.screen === 'lock') unlock('home');
      else if (S.homePage) setPage(0);
      else { S.screen = 'lock'; render(); }
    },
    page(el) { setPage(+el.dataset.p); },
    openApp(el) { openApp(el.dataset.app || 'mob', el.dataset.tab); },
    goMob(el) { openApp('mob', el.dataset.tab || 'teraz'); },
    tab(el) { S.mobTab = el.dataset.tab; if (S.mobTab === 'wtle' && findN('noc')) S.nocRead = true; render(); $('#appScroll').scrollTop = 0; },
    sub(el) { S.sub = el.dataset.sub; render(); },
    back() { S.sub = null; render(); },
    island() { if (!curLive() || S.screen === 'lock') return; S.islandOpen = !S.islandOpen; clearTimeout(islandT); if (S.islandOpen) discover('island'); renderIsland(); after(); },
    showDoc(el) { openDoc((el && el.dataset.doc) || 'id'); },
    closeDoc() { S.docOpen = null; render(); $('#phone').focus({ preventScroll: true }); },
    async ask() { await toApp(); openAsk(); },
    askClose() { closeAsk(); },
    askQ(el) { ask(el.dataset.k); },
    async askMic(el) {
      el.classList.add('listening'); el.setAttribute('aria-label', 'Słucham…');
      await wait(1400);
      ask('chorw', null, true);
    },
    askRemind() { toast('Przypomnimy 14 dni wcześniej', true); },
    slot(el) { S.slot = +el.dataset.i; sheetCtx && sheetCtx.redraw(); },
    undo(el) {
      const e = S.log.find(x => x.id === el.dataset.id); if (!e) return;
      sheet({
        ic: 'undo', title: 'Cofnąć tę zmianę?', desc: esc(e.t),
        html: note('info', '', 'Przywrócimy poprzedni stan i poinformujemy urząd. W Zasadach możesz też wyłączyć „Samo”.'),
        cta: { label: 'Cofnij zmianę', kind: 'danger', fn: () => { e.undone = true; closeSheet(); render(); toast('Zmiana cofnięta', true); } },
        actions: [{ label: 'Anuluj', fn: closeSheet }]
      });
    },
    rule(el) {
      S.rules[el.dataset.id] = el.dataset.v; S.ruleChanged = true; render();
      const r = RULES.find(x => x.id === el.dataset.id);
      toast(`${r.t}: ${OPTS.find(o => o[0] === el.dataset.v)[1]}`, true);
    },
    profile() {
      sheet({ ic: 'user', title: OLA.name, desc: 'Twoje dane z rejestrów państwowych', html: kv([['PESEL', OLA.pesel], ['Adres', OLA.addr], ['Telefon', '+48 600 ••• •12']]), cta: { label: 'Gotowe', fn: closeSheet } });
    },
    adv() { const a = advNow(); if (!a) return; closeAll(); a.fn(); render(); },
    async jYes() {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      if (!(await faceId())) return;
      S.jz = 'done'; resolve('dodatek', 'Wniosek złożony.'); render();
      speak('Wniosek złożony. Pieniądze przyjdą na konto, na które dostaje Pan emeryturę.');
    },
    jAsk() { S.jz = 'asked'; render(); speak('Zapytaliśmy Olę. Decyzję i tak podejmuje Pan.'); },
    jNo() { S.jz = 'no'; resolve('dodatek', 'Nic nie wysłano.'); render(); },
    jSpeak() { speak(jerzyText()); discover('glos'); toast('Czytam na głos'); },
    aaBack() { if (S.screen === 'app') { if (S.app === 'mob' && S.jz !== 'ask' && S.jz !== 'asked') S.jz = 'none'; S.screen = 'home'; S.app = 'mob'; render(); } },
    call(el) { S.call = el.dataset.name; render(); },
    endCall() { S.call = null; render(); },
    say(el) { toast(el.dataset.msg || ''); },
    shutter() { const v = $('.camv .view'); if (v) { v.style.background = '#fff'; setTimeout(() => { v.style.background = ''; }, 120); } toast('Zdjęcie zapisane', true); },
    reset() { closeAll(); S = fresh(); LIVE[4].title = 'Odbiór jutro o 10:20'; LIVE[4].short = 'Jutro 10:20'; $('#mLayer').hidden = true; S.q.noc = 'active'; push('noc', '3:14'); render(); webToast('Historia zaczyna się od nowa'); },
    lang(el) { setLang(el.dataset.l); },
    mOpen() { $('#mLayer').hidden = false; },
    mClose() { $('#mLayer').hidden = true; }
  };

  /* ---------------- gesty ---------------- */
  const phone = $('#phone');
  let drag = null, suppress = false;
  const overlayOpen = () => !$('#sheet').hidden || !$('#ask').hidden || !!S.docOpen || !$('#fid').hidden || !!S.call;
  phone.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const t = e.target;
    let kind = null, el = null;
    const dz = t.closest('[data-drag]');
    if (t.closest('#homebar')) kind = 'homebar';
    else if (dz) { kind = 'drawer'; el = dz.closest('.isheet'); }
    else if (overlayOpen()) return;
    else if (S.screen === 'lock' && t.closest('#lock')) kind = 'lock';
    else if (S.screen === 'home' && t.closest('#pages')) kind = 'pages';
    if (!kind) return;
    drag = { kind, el, layer: dz ? dz.closest('.sheet-layer') : null, x: e.clientX, y: e.clientY, dx: 0, dy: 0, on: false, id: e.pointerId };
  });
  addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x; drag.dy = e.clientY - drag.y;
    const ax = Math.abs(drag.dx), ay = Math.abs(drag.dy);
    if (!drag.on) {
      if (Math.max(ax, ay) < 8) return;
      const vertical = ay > ax;
      if (drag.kind === 'pages' && vertical) { drag = null; return; }
      if ((drag.kind === 'lock' || drag.kind === 'homebar') && (!vertical || drag.dy > 0)) { drag = null; return; }
      if (drag.kind === 'drawer' && (!vertical || drag.dy < 0)) { drag = null; return; }
      drag.on = true; phone.classList.add('dragging');
    }
    e.preventDefault();
    const up = Math.min(0, drag.dy);
    if (drag.kind === 'lock' || (drag.kind === 'homebar' && S.screen === 'lock')) {
      const p = Math.min(1, -up / 300);
      $('#lock').style.transform = `translateY(${up}px)`;
      $('#lock').style.opacity = 1 - p * .6;
      $('#home').style.opacity = p; $('#home').style.transform = `scale(${1.08 - .08 * p})`;
    } else if (drag.kind === 'homebar' && S.screen === 'app') {
      $('#app').style.transform = `translateY(${up * .6}px) scale(${Math.max(.6, 1 + up / 700)})`;
      $('#app').style.borderRadius = '40px';
    } else if (drag.kind === 'pages') {
      let dx = drag.dx;
      if ((S.homePage === 0 && dx > 0) || (S.homePage === 1 && dx < 0)) dx *= .3;
      $('#track').style.transform = `translateX(calc(${-S.homePage * 50}% + ${dx}px))`;
    } else if (drag.kind === 'drawer' && drag.el) {
      drag.el.style.transform = `translateY(${Math.max(0, drag.dy)}px)`;
    }
  }, { passive: false });
  function endDrag(ok) {
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.on) return;
    suppress = true; setTimeout(() => { suppress = false; }, 60);
    phone.classList.remove('dragging');
    ['#lock', '#home', '#app'].forEach(s => { const x = $(s); x.style.transform = ''; x.style.opacity = ''; x.style.borderRadius = ''; });
    if (!ok) { render(); return; }
    if (d.kind === 'lock' || (d.kind === 'homebar' && S.screen === 'lock')) {
      if (d.dy < -90) unlock('home');
    } else if (d.kind === 'homebar') {
      if (d.dy < -40) ACT.homebar();
    } else if (d.kind === 'pages') {
      const t = $('#track'); if (t) t.style.transform = '';
      if (d.dx < -50) setPage(S.homePage + 1);
      else if (d.dx > 50) setPage(S.homePage - 1);
      else setPage(S.homePage);
    } else if (d.kind === 'drawer' && d.el) {
      if (d.dy > 90) { d.layer && d.layer.id === 'ask' ? closeAsk() : closeSheet(); }
      else d.el.style.transform = '';
    }
  }
  addEventListener('pointerup', () => endDrag(true));
  addEventListener('pointercancel', () => endDrag(false));
  let wheelLock = false;
  $('#home').addEventListener('wheel', e => {
    if (S.persona === 'jerzy' || wheelLock) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
      setPage(S.homePage + (e.deltaX > 0 ? 1 : -1));
      wheelLock = true; setTimeout(() => { wheelLock = false; }, 650);
    }
  }, { passive: true });

  document.addEventListener('click', e => {
    if (suppress) { e.stopPropagation(); e.preventDefault(); }
  }, true);
  document.addEventListener('click', e => {
    const sa = e.target.closest('[data-sa]');
    if (sa) {
      if (sa.dataset.sa === 'x') { closeSheet(); return; }
      const a = SA[+sa.dataset.sa]; if (a && a.fn && !sa.disabled) a.fn(); return;
    }
    if (e.target.classList.contains('scrim')) {
      const l = e.target.parentElement;
      if (l.id === 'sheet') { closeSheet(); return; }
      if (l.id === 'ask') { closeAsk(); return; }
    }
    const el = e.target.closest('[data-act]');
    if (el && ACT[el.dataset.act]) ACT[el.dataset.act](el, e);
  });
  document.addEventListener('submit', e => {
    if (e.target.dataset.form !== 'ask') return;
    e.preventDefault();
    const v = $('#askInput').value.trim(); if (!v) return;
    const m = QS.find(x => x.match.test(v));
    ask(m ? m.k : 'none', v);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#mLayer').hidden) $('#mLayer').hidden = true;
    else if (!$('#sheet').hidden) closeSheet();
    else if (!$('#ask').hidden) closeAsk();
    else if (S.docOpen) { S.docOpen = null; render(); }
    else if (S.islandOpen) { S.islandOpen = false; renderIsland(); after(); }
  });

  /* ikony w kartach zasad */
  $$('.f-ic').forEach(el => { el.innerHTML = I[el.dataset.ic] || ''; });

  /* język: domyślnie polski; ?lang=en otwiera wersję angielską */
  const STATIC = $$('[data-i18n]').map(el => [el, el.innerHTML]);
  const STATIC_A = $$('[aria-label]').map(el => [el, el.getAttribute('aria-label')]);
  const META = { title: document.title, desc: $('meta[name="description"]').getAttribute('content') };
  function setLang(l, quiet) {
    I18N.lang = l;
    document.documentElement.lang = I18N.lang;
    if (!quiet) closeAll();
    STATIC.forEach(([el, h]) => { el.innerHTML = h; });
    STATIC_A.forEach(([el, a]) => { el.setAttribute('aria-label', I18N.t(a)); });
    document.title = I18N.t(META.title);
    $('meta[name="description"]').setAttribute('content', I18N.t(META.desc));
    $$('.lang-sw .toggle').forEach(b => b.setAttribute('aria-checked', b.dataset.l === I18N.lang));
    const u = new URL(location.href);
    if (I18N.lang === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
    history.replaceState(null, '', u);
    if (!quiet) { render(); fit(); }
  }

  /* pierwszy ekran: cały telefon zawsze się mieści. Liczymy od stałej wysokości telefonu,
     a nie od zmierzonej strony, i przeliczamy przy każdej zmianie okna (także pasków przeglądarki). */
  const STAGE_H = 866 + 48;
  let fitRaf = 0, fitH = 0, fitW = 0;
  function fit() {
    cancelAnimationFrame(fitRaf);
    fitRaf = requestAnimationFrame(() => {
      const st = $('.stage');
      if (innerWidth <= 900) { st.style.zoom = ''; st.style.minHeight = ''; return; }
      fitH = innerHeight; fitW = innerWidth;
      const avail = innerHeight - 56;
      const z = Math.min(1, avail / STAGE_H);
      st.style.zoom = z < 1 ? z.toFixed(4) : '';
      st.style.minHeight = (avail / z) + 'px';
    });
  }
  addEventListener('resize', fit);
  if (window.visualViewport) visualViewport.addEventListener('resize', fit);
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(document.documentElement);
  addEventListener('load', fit);
  /* zabezpieczenie: niektóre zmiany paska przeglądarki nie wysyłają zdarzenia resize */
  setInterval(() => { if (innerHeight !== fitH || innerWidth !== fitW) fit(); }, 500);
  document.addEventListener('pointerdown', () => scheduleHint(), true);
  document.addEventListener('keydown', () => scheduleHint(), true);
  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  S.q.noc = 'active'; push('noc', '3:14');
  if (new URLSearchParams(location.search).get('lang') === 'en') setLang('en', true);
  render();
  fit();
  scheduleHint(4000);
})();
