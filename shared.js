// ══════════════════════════════════════════════════════
//  Pet Wonderland — shared.js
//  Core state, utilities, hunger tick, evolution system
// ══════════════════════════════════════════════════════

// ── Pet images ──────────────────────────────────────────
const PET_IMAGES = {
  // Base forms
  Dog:    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkLY8L3RleHQ+PC9zdmc+',
  Cat:    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkLE8L3RleHQ+PC9zdmc+',
  Dragon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkLI8L3RleHQ+PC9zdmc+',
  // Evolution stage 1
  Dog1:   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkL88L3RleHQ+PC9zdmc+',
  Cat1:   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfpLc8L3RleHQ+PC9zdmc+',
  Dragon1:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkbU8L3RleHQ+PC9zdmc+',
  // Evolution stage 2
  Dog2:   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkqo8L3RleHQ+PC9zdmc+',
  Cat2:   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkrA8L3RleHQ+PC9zdmc+',
  Dragon2:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48dGV4dCB5PSIxNDUiIGZvbnQtc2l6ZT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSIxMDAiPvCfkLI8L3RleHQ+PC9zdmc+',
};

const PET_EMOJIS = { Dog:'🐶', Cat:'🐱', Dragon:'🐲' };

// Evolution emoji display per type & stage
const EVO_EMOJI = {
  Dog:    ['🐶','🐕','🦮'],
  Cat:    ['🐱','🐈','🦁'],
  Dragon: ['🐲','🐉','🔥🐉'],
};

// Evolution stage names per type
const EVO_NAMES = {
  Dog:    ['Puppy','Adult Dog','Alpha Wolf'],
  Cat:    ['Kitten','Cat','Jungle King'],
  Dragon: ['Hatchling','Dragon','Elder Dragon'],
};

// XP thresholds for each evolution stage
const EVO_THRESHOLDS = [0, 200, 600]; // stage 0 → 1 at 200xp, 1 → 2 at 600xp

// ── Badge definitions ────────────────────────────────────
const BADGE_DEFS = {
  careChampion: { emoji:'🏅', label:'Care Champion',    desc:'Happiness & Health both above 90' },
  healthyPet:   { emoji:'💚', label:'Healthy Pet',       desc:'Reach 100 Health' },
  happyPet:     { emoji:'😊', label:'Happy Pet',         desc:'Reach 100 Happiness' },
  richOwner:    { emoji:'💰', label:'Rich Owner',         desc:'Have more than $200' },
  bigSpender:   { emoji:'🛍️', label:'Big Spender',       desc:'Spend over $100 total' },
  hardWorker:   { emoji:'⚒️', label:'Hard Worker',       desc:'Earn $50 from mini-games' },
  firstToy:     { emoji:'🧸', label:'First Toy',         desc:'Buy your first toy' },
  perfectBalance:{ emoji:'⭐', label:'Perfect Balance',  desc:'All stats above 80' },
  evolved:      { emoji:'✨', label:'First Evolution',   desc:'Reach stage 2' },
  maxEvolved:   { emoji:'👑', label:'Max Evolution',     desc:'Reach stage 3' },
  shopaholic:   { emoji:'🏪', label:'Shopaholic',        desc:'Own 5+ shop items' },
  wellFed:      { emoji:'🍖', label:'Well Fed',          desc:'Feed your pet 20 times' },
};

// ── State helpers ────────────────────────────────────────
function getState() {
  try {
    const raw = localStorage.getItem('pwState');
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  // Legacy key migration
  const legacy = localStorage.getItem('hunger');
  if (legacy) {
    const s = {
      petName: localStorage.getItem('petName') || 'Buddy',
      petType: localStorage.getItem('petType') || 'Cat',
      hunger: parseInt(localStorage.getItem('hunger')) || 50,
      happiness: parseInt(localStorage.getItem('happiness')) || 50,
      energy: parseInt(localStorage.getItem('energy')) || 50,
      health: parseInt(localStorage.getItem('health')) || 50,
      money: parseInt(localStorage.getItem('money')) || 150,
      totalExpenses: parseInt(localStorage.getItem('totalExpenses')) || 0,
      totalEarned: parseInt(localStorage.getItem('totalEarned')) || 0,
      playToy: localStorage.getItem('playToy') || 'none',
      sBought: localStorage.getItem('sBought') === 'true',
      bBought: localStorage.getItem('bBought') === 'true',
      cBought: localStorage.getItem('cBought') === 'true',
      badges: {},
      xp: 0,
      evoStage: 0,
      feedCount: 0,
      lastTick: Date.now(),
      inventory: {},
    };
    saveState(s);
    return s;
  }
  return null;
}

function saveState(s) {
  s.lastSaved = Date.now();
  localStorage.setItem('pwState', JSON.stringify(s));
  // Also keep petName for nav guard compatibility
  localStorage.setItem('petName', s.petName);
}

// ── Ledger / Transaction log ─────────────────────────────
// Appends a transaction entry. Call BEFORE saveState.
function logTransaction(s, type, amount, label, icon, category) {
  if (!s.ledger) s.ledger = [];
  s.ledger.push({ type, amount, label, icon, category: category || null, ts: Date.now() });
  // Keep ledger to last 200 entries to prevent bloat
  if (s.ledger.length > 200) s.ledger = s.ledger.slice(-200);
}

function clamp(v, lo=0, hi=100) { return Math.max(lo, Math.min(hi, v)); }

// ── Passive hunger tick ──────────────────────────────────
// Called once per page load. Calculates how much time has
// passed since last save and increases hunger proportionally.
// Rate: +1 hunger per 45 seconds of real time (offline too).
function applyPassiveDecay(s) {
  const now = Date.now();
  const last = s.lastTick || s.lastSaved || now;
  const elapsed = Math.floor((now - last) / 1000); // seconds
  if (elapsed < 5) return; // skip tiny gaps

  const HUNGER_RATE  = 1 / 45;   // +1 hunger per 45s
  const HAPPY_RATE   = 1 / 90;   // -1 happiness per 90s
  const ENERGY_RATE  = 1 / 120;  // -1 energy per 120s
  const HEALTH_RATE  = 1 / 180;  // -1 health per 180s (if hunger high)

  s.hunger    = clamp(s.hunger    + Math.floor(elapsed * HUNGER_RATE));
  s.happiness = clamp(s.happiness - Math.floor(elapsed * HAPPY_RATE));
  s.energy    = clamp(s.energy    - Math.floor(elapsed * ENERGY_RATE * 0.5));

  // Health drops faster if starving
  if (s.hunger >= 80) {
    s.health = clamp(s.health - Math.floor(elapsed * HEALTH_RATE));
  }

  s.lastTick = now;
}

// ── Live hunger tick (while app is open) ─────────────────
// Runs every 30 seconds in background on any page.
function startLiveTick() {
  setInterval(() => {
    const s = getState();
    if (!s) return;
    s.hunger    = clamp(s.hunger    + 1);
    s.happiness = clamp(s.happiness - 1);
    // Health degrades if very hungry
    if (s.hunger >= 80) s.health = clamp(s.health - 1);
    s.lastTick = Date.now();
    saveState(s);
    // Dispatch event so open pages can re-render
    window.dispatchEvent(new CustomEvent('petTick', { detail: s }));
  }, 30000); // every 30s
}

// ── XP & Evolution ──────────────────────────────────────
function addXP(s, amount) {
  s.xp = (s.xp || 0) + amount;
  const newStage = calcEvoStage(s.xp);
  let evolved = false;
  if (newStage > (s.evoStage || 0)) {
    s.evoStage = newStage;
    evolved = true;
  }
  return evolved;
}

function calcEvoStage(xp) {
  if (xp >= EVO_THRESHOLDS[2]) return 2;
  if (xp >= EVO_THRESHOLDS[1]) return 1;
  return 0;
}

function getEvoEmoji(s) {
  const emojis = EVO_EMOJI[s.petType] || EVO_EMOJI.Cat;
  return emojis[s.evoStage || 0];
}

function getEvoName(s) {
  const names = EVO_NAMES[s.petType] || EVO_NAMES.Cat;
  return names[s.evoStage || 0];
}

function xpToNextEvo(s) {
  const stage = s.evoStage || 0;
  if (stage >= 2) return null; // max
  return EVO_THRESHOLDS[stage + 1] - (s.xp || 0);
}

// ── Mood ────────────────────────────────────────────────
function getMood(s) {
  if (s.health <= 20)    return { label:'😷 Sick — needs vet!',     color:'#f87171' };
  if (s.hunger >= 80)    return { label:'😰 Starving!',             color:'#fb923c' };
  if (s.energy <= 20)    return { label:'😴 Exhausted',             color:'#60a5fa' };
  if (s.happiness >= 80 && s.health >= 80) return { label:'🥰 Thriving!', color:'#34d399' };
  if (s.happiness >= 60) return { label:'😊 Happy',                 color:'#a78bfa' };
  if (s.happiness <= 30) return { label:'😞 Sad',                   color:'#f472b6' };
  return { label:'😐 Okay',                                         color:'#7a79aa' };
}

// ── Stat bar renderer ────────────────────────────────────
const STAT_COLORS = {
  hunger:    { fill:'#fb923c', label:'Hunger',    invert:true  },
  happiness: { fill:'#a78bfa', label:'Happiness', invert:false },
  energy:    { fill:'#60a5fa', label:'Energy',    invert:false },
  health:    { fill:'#34d399', label:'Health',    invert:false },
};

function renderStats(containerId, s) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ['hunger','happiness','energy','health'].map(key => {
    const def = STAT_COLORS[key];
    const val = s[key];
    const danger = def.invert ? val > 70 : val < 30;
    const fill = danger ? '#f87171' : def.fill;
    return `
      <div class="stat-row">
        <span class="stat-label">${def.label}</span>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width:${val}%;background:${fill}"></div>
        </div>
        <span class="stat-val">${val}</span>
      </div>`;
  }).join('');
}

// ── Toast ────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, duration=2200) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

// ── Badge checker ────────────────────────────────────────
function checkAndAwardBadges(s) {
  if (!s.badges) s.badges = {};
  const inv = s.inventory || {};
  const ownedCount = Object.values(inv).filter(Boolean).length;
  const newBadges = [];

  const checks = [
    ['careChampion',  () => s.happiness >= 90 && s.health >= 90],
    ['healthyPet',    () => s.health >= 100],
    ['happyPet',      () => s.happiness >= 100],
    ['richOwner',     () => s.money > 200],
    ['bigSpender',    () => s.totalExpenses > 100],
    ['hardWorker',    () => (s.totalEarned || 0) >= 50],
    ['firstToy',      () => s.sBought || s.bBought || s.cBought || ownedCount > 0],
    ['perfectBalance',() => s.hunger <= 20 && s.happiness >= 80 && s.energy >= 80 && s.health >= 80],
    ['evolved',       () => (s.evoStage || 0) >= 1],
    ['maxEvolved',    () => (s.evoStage || 0) >= 2],
    ['shopaholic',    () => ownedCount >= 5],
    ['wellFed',       () => (s.feedCount || 0) >= 20],
  ];

  checks.forEach(([key, fn]) => {
    if (!s.badges[key] && fn()) {
      s.badges[key] = true;
      newBadges.push(BADGE_DEFS[key]);
    }
  });
  return newBadges;
}

// ── Init on every page ───────────────────────────────────
(function initShared() {
  const s = getState();
  if (s) {
    applyPassiveDecay(s);
    saveState(s);
    startLiveTick();
  }
})();
