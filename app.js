/**
 * MIDNIGHT PANTRY // 3AM SQUAD HUB
 * Core Logic & Interactive Animation Engine
 * NO EMOJIS PER INSTRUCTIONS - High-energy vector & synthesized sound effects
 */

// ===================================================================
// DEFAULT SYSTEM STATE
// ===================================================================
const DEFAULT_STATE = {
  inventory: {
    'diet-coke': {
      id: 'diet-coke',
      name: 'DIET COKE',
      inStock: true,
      qty: '6 CANS',
      unit: '330ML CAN',
      desc: 'Crisp silver chill, maximum fizz, zero sugar crash. Midnight focus standard issue.'
    },
    'monster': {
      id: 'monster',
      name: 'MONSTER ULTRA',
      inStock: true,
      qty: '4 CANS',
      unit: 'ZERO ULTRA',
      desc: 'Crisp, light citrus frost with zero sugar. The legendary white can built for sustained all-nighter endurance.'
    },
    'blue-lays': {
      id: 'blue-lays',
      name: 'BLUE LAYS',
      inStock: true,
      qty: '5 BAGS',
      unit: 'MAGIC MASALA',
      desc: 'Indian Magic Masala perfection. Spicy, tangy, deeply savory. Essential 3 AM crunch therapy.'
    }
  },
  squad: {
    'shubham': {
      id: 'shubham',
      name: 'SHUBHAM',
      active: true,
      role: 'SYS_ARCHITECT / NIGHT_LEAD',
      quote: 'Refactoring backend microservices with Monster Ultra in my veins',
      pref: 'MONSTER ULTRA',
      statusText: 'ONLINE [PULSING]'
    },
    'darshil': {
      id: 'darshil',
      name: 'DARSHIL',
      active: true,
      role: 'ALGO_SOLVER / NIGHT_OWL',
      quote: 'Grinding dynamic programming problems & crunching Blue Lays',
      pref: 'BLUE LAYS',
      statusText: 'ONLINE [PULSING]'
    },
    'kush': {
      id: 'kush',
      name: 'KUSH',
      active: false,
      role: 'LOGISTICS_LEAD / DESIGNER',
      quote: 'Taking a power recharge nap. Do not disturb unless out of Diet Coke',
      pref: 'DIET COKE',
      statusText: 'AFK [STANDBY]'
    }
  },
  settings: {
    sfxEnabled: true,
    // Salted SHA-256 hash of "M!dn1ght#99" with salt "mn_pantry_2026"
    adminHash: 'f1eed8213039e16bee605b6ea9f3c1d7335be9c252d135d92a198dd518225c2d'
  }
};

// Global active state in memory
let appState = null;
let isAdminAuthenticated = false;

// ===================================================================
// WEB AUDIO API SYNTHESIZER (ZERO EXTERNAL ASSETS NEEDED)
// ===================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const SoundFX = {
  // Can Pop & Carbonation Hiss
  canPop() {
    if (!appState.settings.sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Pop thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);

    // Fizz Hiss Noise
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.04);
  },

  // Monster Electric Surge Tone
  electricSurge() {
    if (!appState.settings.sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(120, now);
    osc1.frequency.linearRampToValueAtTime(480, now + 0.18);
    osc1.frequency.linearRampToValueAtTime(90, now + 0.4);

    osc2.frequency.setValueAtTime(124, now);
    osc2.frequency.linearRampToValueAtTime(510, now + 0.18);
    osc2.frequency.linearRampToValueAtTime(94, now + 0.4);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  },

  // Blue Lays Crisp Crunch
  chipCrunch() {
    if (!appState.settings.sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fast multi-burst noise to simulate crisp crunch
    [0, 0.04, 0.08].forEach((delay) => {
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800 + Math.random() * 800, now + delay);
      filter.Q.value = 3.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now + delay);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now + delay);
    });
  },

  // Subtle UI click / notification beep
  clickBlip(freq = 600, duration = 0.08) {
    if (!appState.settings.sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  },

  // Success / Unlock fan-fare
  authSuccess() {
    if (!appState.settings.sfxEnabled) return;
    this.clickBlip(523.25, 0.1);
    setTimeout(() => this.clickBlip(659.25, 0.1), 100);
    setTimeout(() => this.clickBlip(783.99, 0.18), 200);
  },

  // Error buzz
  authError() {
    if (!appState.settings.sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.setValueAtTime(110, now + 0.15);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }
};

// ===================================================================
// STORAGE & STATE INITIALIZATION
// ===================================================================
function loadState() {
  try {
    const raw = localStorage.getItem('MIDNIGHT_PANTRY_STATE_V2');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure structure integrity with defaults
      appState = {
        inventory: { ...DEFAULT_STATE.inventory, ...(parsed.inventory || {}) },
        squad: { ...DEFAULT_STATE.squad, ...(parsed.squad || {}) },
        settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) }
      };
      if (!appState.settings.adminHash) {
        appState.settings.adminHash = DEFAULT_STATE.settings.adminHash;
      }
      delete appState.settings.adminPin;
      if (appState.inventory['monster']) {
        appState.inventory['monster'].name = 'MONSTER ULTRA';
        appState.inventory['monster'].unit = 'ZERO ULTRA';
        appState.inventory['monster'].desc = DEFAULT_STATE.inventory['monster'].desc;
      }
      if (appState.squad['shubham'] && appState.squad['shubham'].pref === 'MONSTER ENERGY') {
        appState.squad['shubham'].pref = 'MONSTER ULTRA';
      }
      return;
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  // Deep clone default state
  appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  saveState();
}

function saveState() {
  try {
    localStorage.setItem('MIDNIGHT_PANTRY_STATE_V2', JSON.stringify(appState));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

function resetToDefaults() {
  if (confirm('RESTORE DEFAULT PANTRY SETTINGS AND INVENTORY?')) {
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    renderAll();
    showToast('SYSTEM RESTORED TO DEFAULT SPECIFICATIONS', 'info');
    SoundFX.authSuccess();
  }
}

// ===================================================================
// UI RENDERING & DOM UPDATES
// ===================================================================
function renderAll() {
  renderInventory();
  renderSquad();
  renderHeroMetrics();
  renderAdminPanelForm();
  updateSfxButtonUI();
  updateAdminButtonUI();
}

// Render the 3 snack items: Diet Coke, Monster, Blue Lays
function renderInventory() {
  const items = ['diet-coke', 'monster', 'blue-lays'];

  items.forEach(itemId => {
    const item = appState.inventory[itemId];
    if (!item) return;

    const card = document.getElementById(`card-${itemId}`);
    const badge = document.getElementById(`badge-${itemId}`);
    const qtySpan = document.getElementById(`qty-${itemId}`);

    if (badge) {
      if (item.inStock) {
        badge.textContent = 'IN STOCK';
        badge.className = 'stock-pill status-badge in-stock';
      } else {
        badge.textContent = 'SOLD OUT';
        badge.className = 'stock-pill status-badge sold-out';
      }
    }

    if (qtySpan) {
      qtySpan.textContent = item.qty || (item.inStock ? 'AVAILABLE' : 'DEPLETED');
    }

    if (card) {
      if (item.inStock) {
        card.classList.remove('out-of-stock');
      } else {
        card.classList.add('out-of-stock');
      }
    }
  });
}

// Render squad members: Shubham, Darshil, Kush
function renderSquad() {
  const members = ['shubham', 'darshil', 'kush'];

  members.forEach(memberId => {
    const member = appState.squad[memberId];
    if (!member) return;

    const card = document.getElementById(`member-card-${memberId}`);
    const dot = document.getElementById(`dot-${memberId}`);
    const badge = document.getElementById(`badge-${memberId}`);
    const quote = document.getElementById(`quote-${memberId}`);
    const timeStatus = document.getElementById(`time-${memberId}`);

    if (badge) {
      if (member.active) {
        badge.textContent = 'ACTIVE RN';
        badge.className = 'activity-badge badge-active';
      } else {
        badge.textContent = 'AFK / RECHARGING';
        badge.className = 'activity-badge badge-inactive';
      }
    }

    if (dot) {
      if (member.active) {
        dot.classList.remove('inactive');
      } else {
        dot.classList.add('inactive');
      }
    }

    if (card) {
      if (member.active) {
        card.classList.remove('is-offline');
      } else {
        card.classList.add('is-offline');
      }
    }

    if (quote) {
      quote.textContent = `"${member.quote}"`;
    }

    if (timeStatus) {
      timeStatus.textContent = member.active ? 'ONLINE [PULSING]' : 'AFK [STANDBY]';
    }
  });
}

// Render dynamic hero calculations
function renderHeroMetrics() {
  // Count active squad members
  const members = Object.values(appState.squad);
  const activeCount = members.filter(m => m.active).length;
  const activeSquadEl = document.getElementById('active-squad-count');
  if (activeSquadEl) {
    activeSquadEl.textContent = `${activeCount} / ${members.length} ACTIVE`;
  }

  // Count available rations
  const inventoryItems = Object.values(appState.inventory);
  const inStockCount = inventoryItems.filter(i => i.inStock).length;
  const totalInvEl = document.getElementById('total-inventory-status');
  if (totalInvEl) {
    totalInvEl.textContent = `${inStockCount} / ${inventoryItems.length} IN STOCK`;
  }

  // Caffeine Index calculation
  // Factors: Monster in stock (+35), Diet Coke in stock (+25), Each active squad (+13)
  let caffeinePct = 0;
  if (appState.inventory['monster']?.inStock) caffeinePct += 35;
  if (appState.inventory['diet-coke']?.inStock) caffeinePct += 25;
  if (appState.inventory['blue-lays']?.inStock) caffeinePct += 10;
  caffeinePct += activeCount * 10;
  caffeinePct = Math.min(100, Math.max(10, caffeinePct));

  const caffeineBar = document.getElementById('caffeine-bar');
  const caffeineText = document.getElementById('caffeine-text');
  if (caffeineBar) caffeineBar.style.width = `${caffeinePct}%`;
  if (caffeineText) caffeineText.textContent = `${caffeinePct}% CHARGED`;
}

// Sync Admin Modal Input controls with appState
function renderAdminPanelForm() {
  // Inventory toggles & fields
  ['diet-coke', 'monster', 'blue-lays'].forEach(itemId => {
    const item = appState.inventory[itemId];
    if (!item) return;

    const toggle = document.getElementById(`toggle-stock-${itemId}`);
    const inputQty = document.getElementById(`input-qty-${itemId}`);
    const labelStock = document.getElementById(`label-stock-${itemId}`);
    const miniStatus = document.getElementById(
      itemId === 'diet-coke' ? 'mini-coke-status' :
      itemId === 'monster' ? 'mini-monster-status' : 'mini-lays-status'
    );

    if (toggle) toggle.checked = item.inStock;
    if (inputQty) inputQty.value = item.qty || '';
    if (labelStock) labelStock.textContent = item.inStock ? 'AVAILABLE IN PANTRY' : 'OUT OF STOCK (DEPLETED)';
    if (miniStatus) {
      miniStatus.textContent = item.inStock ? 'IN STOCK' : 'DEPLETED';
      miniStatus.className = `status-indicator-mini ${item.inStock ? '' : 'inactive'}`;
    }
  });

  // Squad toggles & fields
  ['shubham', 'darshil', 'kush'].forEach(memberId => {
    const member = appState.squad[memberId];
    if (!member) return;

    const toggle = document.getElementById(`toggle-active-${memberId}`);
    const inputQuote = document.getElementById(`input-quote-${memberId}`);
    const labelActive = document.getElementById(`label-active-${memberId}`);
    const miniStatus = document.getElementById(`mini-${memberId}-status`);

    if (toggle) toggle.checked = member.active;
    if (inputQuote) inputQuote.value = member.quote || '';
    if (labelActive) labelActive.textContent = member.active ? 'ONLINE & GRINDING' : 'AFK / SLEEPING';
    if (miniStatus) {
      miniStatus.textContent = member.active ? 'ACTIVE RN' : 'AFK';
      miniStatus.className = `status-indicator-mini ${member.active ? 'active' : 'inactive'}`;
    }
  });
}

function updateSfxButtonUI() {
  const btn = document.getElementById('sfx-toggle-btn');
  const label = document.getElementById('sfx-label');
  const wave1 = document.getElementById('sfx-wave-1');
  const wave2 = document.getElementById('sfx-wave-2');

  if (appState.settings.sfxEnabled) {
    if (label) label.textContent = 'SFX: ON';
    if (wave1) wave1.style.display = 'block';
    if (wave2) wave2.style.display = 'block';
  } else {
    if (label) label.textContent = 'SFX: OFF';
    if (wave1) wave1.style.display = 'none';
    if (wave2) wave2.style.display = 'none';
  }
}

function updateAdminButtonUI() {
  const btn = document.getElementById('open-admin-btn');
  const badgeText = document.getElementById('admin-badge-text');

  if (isAdminAuthenticated) {
    if (badgeText) badgeText.textContent = 'ADMIN CONSOLE';
    if (btn) btn.classList.add('unlocked-mode');
  } else {
    if (badgeText) badgeText.textContent = 'ADMIN LOCKED';
    if (btn) btn.classList.remove('unlocked-mode');
  }
}

// ===================================================================
// CRYPTOGRAPHIC SECURITY & RATE-LIMITED ADMIN AUTH
// ===================================================================
const CIPHER_SALT = 'mn_pantry_2026';
let failedAttempts = 0;
const MAX_ATTEMPTS = 3;
let lockoutUntil = 0;
let lockoutTimerInterval = null;

let sessionExpiresAt = 0;
let sessionTimerInterval = null;
const SESSION_DURATION_MS = 10 * 60 * 1000; // 10 minutes

// Cryptographic Salted SHA-256 Hash using browser Web Crypto API
async function hashPasscode(passcode) {
  const encoder = new TextEncoder();
  const data = encoder.encode(CIPHER_SALT + passcode);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Password visibility eye toggle
function togglePasswordVisibility(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input || !btn) return;

  const eyeOpen = btn.querySelector('.eye-open');
  const eyeClosed = btn.querySelector('.eye-closed');

  if (input.type === 'password') {
    input.type = 'text';
    if (eyeOpen) eyeOpen.style.display = 'none';
    if (eyeClosed) eyeClosed.style.display = 'block';
  } else {
    input.type = 'password';
    if (eyeOpen) eyeOpen.style.display = 'block';
    if (eyeClosed) eyeClosed.style.display = 'none';
  }
  SoundFX.clickBlip(550, 0.05);
}

function openAdminModal() {
  if (isAdminAuthenticated) {
    document.getElementById('admin-panel-modal').classList.add('active');
    renderAdminPanelForm();
    resetSessionAutoLockTimer();
  } else {
    const modal = document.getElementById('admin-auth-modal');
    modal.classList.add('active');
    const input = document.getElementById('admin-pin-input');
    input.value = '';
    document.getElementById('auth-error-msg').textContent = '';

    // Check if lockout is in effect
    if (Date.now() < lockoutUntil) {
      startLockoutCountdown();
    } else {
      const banner = document.getElementById('lockout-warning-banner');
      if (banner) banner.style.display = 'none';
      if (input) input.disabled = false;
      const submitBtn = document.getElementById('auth-submit-btn');
      if (submitBtn) submitBtn.disabled = false;
      updateAttemptsBadge(MAX_ATTEMPTS - failedAttempts);
      setTimeout(() => input?.focus(), 150);
    }
  }
  SoundFX.clickBlip(500);
}

function closeAdminModals() {
  document.getElementById('admin-auth-modal').classList.remove('active');
  document.getElementById('admin-panel-modal').classList.remove('active');
  SoundFX.clickBlip(400);
}

function updateAttemptsBadge(remaining) {
  const badge = document.getElementById('attempts-badge');
  if (!badge) return;
  badge.textContent = `ATTEMPTS REMAINING: ${Math.max(0, remaining)}`;
  if (remaining <= 1) {
    badge.className = 'sec-attempts-tag danger';
  } else if (remaining === 2) {
    badge.className = 'sec-attempts-tag warning';
  } else {
    badge.className = 'sec-attempts-tag';
  }
}

function startLockoutCountdown() {
  const banner = document.getElementById('lockout-warning-banner');
  const timeText = document.getElementById('lockout-time-text');
  const input = document.getElementById('admin-pin-input');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (banner) banner.style.display = 'flex';
  if (input) input.disabled = true;
  if (submitBtn) submitBtn.disabled = true;

  if (lockoutTimerInterval) clearInterval(lockoutTimerInterval);

  function update() {
    const remainingMs = lockoutUntil - Date.now();
    if (remainingMs <= 0) {
      clearInterval(lockoutTimerInterval);
      lockoutTimerInterval = null;
      failedAttempts = 0;
      if (banner) banner.style.display = 'none';
      if (input) {
        input.disabled = false;
        input.focus();
      }
      if (submitBtn) submitBtn.disabled = false;
      updateAttemptsBadge(MAX_ATTEMPTS);
      const errMsg = document.getElementById('auth-error-msg');
      if (errMsg) errMsg.textContent = '';
      return;
    }
    const secs = Math.ceil(remainingMs / 1000);
    if (timeText) {
      timeText.textContent = `RATE-LIMIT LOCKOUT: WAIT ${secs}s`;
    }
  }

  update();
  lockoutTimerInterval = setInterval(update, 1000);
}

async function handlePinSubmit(e) {
  e.preventDefault();
  
  // Guard against lockout
  if (Date.now() < lockoutUntil) {
    SoundFX.authError();
    return;
  }

  const input = document.getElementById('admin-pin-input');
  const enteredKey = input.value.trim();
  const errMsg = document.getElementById('auth-error-msg');

  if (!enteredKey) {
    if (errMsg) errMsg.textContent = 'PLEASE ENTER PASSWORD';
    return;
  }

  // Hash input key and compare with stored salted hash
  const computedHash = await hashPasscode(enteredKey);
  const targetHash = appState.settings.adminHash;

  if (computedHash === targetHash) {
    // Authentication successful
    failedAttempts = 0;
    isAdminAuthenticated = true;
    updateAdminButtonUI();

    document.getElementById('admin-auth-modal').classList.remove('active');
    document.getElementById('admin-panel-modal').classList.add('active');
    renderAdminPanelForm();

    startSessionAutoLockTimer();
    SoundFX.authSuccess();
    showToast('AUTHENTICATION SUCCESSFUL // WELCOME ADMIN', 'info');
  } else {
    // Authentication failed
    failedAttempts++;
    SoundFX.authError();

    const remaining = MAX_ATTEMPTS - failedAttempts;
    updateAttemptsBadge(remaining);

    if (failedAttempts >= MAX_ATTEMPTS) {
      const lockoutMs = failedAttempts === MAX_ATTEMPTS ? 30000 : 60000;
      lockoutUntil = Date.now() + lockoutMs;
      if (errMsg) errMsg.textContent = 'ACCESS LOCKED: MAXIMUM ATTEMPTS EXCEEDED';
      startLockoutCountdown();
      showToast('ACCESS LOCKED // PLEASE WAIT FOR COOLDOWN', 'alert');
    } else {
      if (errMsg) errMsg.textContent = 'INCORRECT PASSWORD';
      input.value = '';
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 400);
    }
  }
}

// Session Auto-Lock Countdown Timer
function startSessionAutoLockTimer() {
  resetSessionAutoLockTimer();
  if (sessionTimerInterval) clearInterval(sessionTimerInterval);

  const pill = document.getElementById('session-countdown-pill');

  sessionTimerInterval = setInterval(() => {
    if (!isAdminAuthenticated) {
      clearInterval(sessionTimerInterval);
      return;
    }

    const remainingMs = sessionExpiresAt - Date.now();
    if (remainingMs <= 0) {
      clearInterval(sessionTimerInterval);
      lockAdminSession();
      showToast('ADMIN SESSION EXPIRED FOR INACTIVITY', 'alert');
      return;
    }

    const totalSecs = Math.floor(remainingMs / 1000);
    const m = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const s = String(totalSecs % 60).padStart(2, '0');
    if (pill) {
      pill.textContent = `AUTO-LOCK: ${m}:${s}`;
    }
  }, 1000);
}

function resetSessionAutoLockTimer() {
  sessionExpiresAt = Date.now() + SESSION_DURATION_MS;
}

function lockAdminSession() {
  isAdminAuthenticated = false;
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }
  updateAdminButtonUI();
  closeAdminModals();
  SoundFX.clickBlip(320);
  showToast('ADMIN SESSION TERMINATED // CONSOLE LOCKED', 'alert');
}

// ===================================================================
// PASSCODE COMPLEXITY & CREDENTIAL MANAGEMENT
// ===================================================================
function validatePasscodeComplexity(pw) {
  return {
    len: pw.length >= 10,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    num: /[0-9]/.test(pw),
    sym: /[^A-Za-z0-9]/.test(pw)
  };
}

function checkNewPasscodeStrength(val) {
  const checks = validatePasscodeComplexity(val);
  updateReqItem('req-len', checks.len);
  updateReqItem('req-upper', checks.upper);
  updateReqItem('req-lower', checks.lower);
  updateReqItem('req-num', checks.num);
  updateReqItem('req-sym', checks.sym);
}

function updateReqItem(id, isMet) {
  const el = document.getElementById(id);
  if (!el) return;
  const ind = el.querySelector('.req-indicator');
  if (isMet) {
    el.classList.add('met');
    if (ind) ind.textContent = '[OK]';
  } else {
    el.classList.remove('met');
    if (ind) ind.textContent = '[-]';
  }
}

async function handleChangePasscode(e) {
  e.preventDefault();
  resetSessionAutoLockTimer();

  const currentInput = document.getElementById('current-key-input');
  const newInput = document.getElementById('new-key-input');
  const feedback = document.getElementById('change-key-feedback');

  const currentKey = currentInput.value.trim();
  const newKey = newInput.value.trim();

  // Verify current key
  const currentHash = await hashPasscode(currentKey);
  if (currentHash !== appState.settings.adminHash) {
    feedback.style.color = 'var(--coke-red)';
    feedback.textContent = 'ERROR: CURRENT SECURITY KEY IS INCORRECT';
    SoundFX.authError();
    return;
  }

  // Verify complexity of new key
  const checks = validatePasscodeComplexity(newKey);
  const allMet = checks.len && checks.upper && checks.lower && checks.num && checks.sym;

  if (!allMet) {
    feedback.style.color = 'var(--coke-red)';
    feedback.textContent = 'ERROR: NEW KEY DOES NOT SATISFY ALL COMPLEXITY RULES';
    SoundFX.authError();
    return;
  }

  // Hash and save new key
  const newHash = await hashPasscode(newKey);
  appState.settings.adminHash = newHash;
  saveState();

  currentInput.value = '';
  newInput.value = '';
  checkNewPasscodeStrength('');

  feedback.style.color = 'var(--monster-neon)';
  feedback.textContent = 'SUCCESS: MASTER SECURITY KEY RE-HASHED & SAVED';
  SoundFX.authSuccess();
  showToast('MASTER SECURITY KEY UPDATED & ENCRYPTED', 'info');
}

// Admin real-time mutation handlers
function updateItemStock(itemId, inStock) {
  if (!appState.inventory[itemId]) return;
  appState.inventory[itemId].inStock = inStock;
  saveState();
  renderAll();
  SoundFX.clickBlip(inStock ? 700 : 350);
  showToast(`${appState.inventory[itemId].name} STATUS UPDATED: ${inStock ? 'IN STOCK' : 'SOLD OUT'}`);
}

function updateItemQty(itemId, newQty) {
  if (!appState.inventory[itemId]) return;
  appState.inventory[itemId].qty = newQty;
  saveState();
  renderInventory();
  renderHeroMetrics();
}

function updateMemberActive(memberId, isActive) {
  if (!appState.squad[memberId]) return;
  appState.squad[memberId].active = isActive;
  saveState();
  renderAll();
  SoundFX.clickBlip(isActive ? 800 : 400);
  showToast(`SQUAD STATUS: ${appState.squad[memberId].name} IS NOW ${isActive ? 'ACTIVE' : 'AFK'}`);
}

function updateMemberQuote(memberId, newQuote) {
  if (!appState.squad[memberId]) return;
  appState.squad[memberId].quote = newQuote;
  saveState();
  renderSquad();
}

// ===================================================================
// INTERACTIVE ITEM BURST EFFECTS & PARTICLES
// ===================================================================
// ===================================================================
// MASSIVE FULL-SCREEN INTERACTIVE BURST ENGINES (NO EMOJIS)
// ===================================================================

function triggerScreenShake() {
  document.body.classList.remove('shake-surge');
  // Trigger DOM reflow to allow consecutive shakes
  void document.body.offsetWidth;
  document.body.classList.add('shake-surge');
  setTimeout(() => document.body.classList.remove('shake-surge'), 450);
}

function triggerScreenFlash(color) {
  const flash = document.createElement('div');
  flash.className = 'screen-flash-effect';
  flash.style.background = color;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 480);
}

function triggerShockwave(x, y, color = '#ffffff', maxSize = '1100px') {
  const wave = document.createElement('div');
  wave.className = 'particle-shockwave';
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;
  wave.style.borderColor = color;
  wave.style.boxShadow = `0 0 30px ${color}`;
  wave.style.setProperty('--max-size', maxSize);
  document.body.appendChild(wave);
  setTimeout(() => wave.remove(), 900);
}

function triggerSnackInteraction(itemId) {
  const item = appState.inventory[itemId];
  if (!item) return;

  const stage = document.getElementById(`stage-${itemId}`);
  const rect = stage ? stage.getBoundingClientRect() : null;
  const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  if (itemId === 'diet-coke') {
    SoundFX.canPop();
    spawnBigDietCokeFizz(originX, originY);
    showToast('DIET COKE CRACKED: FULL-SCREEN CARBONATION ERUPTION');
  } else if (itemId === 'monster') {
    SoundFX.electricSurge();
    spawnBigMonsterLightning(originX, originY);
    showToast('MONSTER ULTRA CRACKED: HIGH-VOLTAGE FROST CITRUS SURGE');
  } else if (itemId === 'blue-lays') {
    SoundFX.chipCrunch();
    spawnBigChipExplosion(originX, originY);
    showToast('BLUE LAYS OPENED: 360° MAGIC MASALA CHIP DETONATION');
  }
}

// 1. DIET COKE: MASSIVE FULL-SCREEN FIZZ EXPLOSION
function spawnBigDietCokeFizz(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  triggerShockwave(originX, originY, '#ffffff', '1200px');
  triggerScreenFlash('rgba(255, 255, 255, 0.35)');

  const totalBubbles = 52;
  for (let i = 0; i < totalBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'particle-fizz-screen';

    // Massive sizes: 20px up to 95px diameter
    const size = Math.random() * 75 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${originX}px`;
    bubble.style.top = `${originY}px`;

    // Float upwards across the entire screen
    const dx = (Math.random() - 0.5) * window.innerWidth * 0.95;
    const dy = -(Math.random() * (window.innerHeight * 0.85) + 250);
    const dur = Math.random() * 0.8 + 0.9;
    const endScale = Math.random() * 0.8 + 1.2;

    bubble.style.setProperty('--dx', `${dx}px`);
    bubble.style.setProperty('--dy', `${dy}px`);
    bubble.style.setProperty('--dur', `${dur}s`);
    bubble.style.setProperty('--end-scale', `${endScale}`);
    bubble.style.animationDelay = `${Math.random() * 0.25}s`;

    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), (dur + 0.35) * 1000);
  }
}

// 2. MONSTER ULTRA: MASSIVE HIGH-VOLTAGE LIGHTNING BLAST
function spawnBigMonsterLightning(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  triggerScreenShake();
  triggerScreenFlash('rgba(165, 216, 255, 0.45)');
  triggerShockwave(originX, originY, '#7dd3fc', '1300px');

  const totalBolts = 16;
  for (let i = 0; i < totalBolts; i++) {
    const bolt = document.createElement('div');
    bolt.className = 'particle-bolt-screen';

    // Massive sizes: 140px up to 340px wide!
    const size = Math.random() * 180 + 140;
    const rot = Math.random() * 360;
    const angle = (i / totalBolts) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = Math.random() * (window.innerWidth * 0.45) + 200;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * (dist * 0.7);
    const dur = Math.random() * 0.35 + 0.55;

    bolt.style.left = `${originX}px`;
    bolt.style.top = `${originY}px`;
    bolt.style.setProperty('--dx', `${dx}px`);
    bolt.style.setProperty('--dy', `${dy}px`);
    bolt.style.setProperty('--rot', `${rot}deg`);
    bolt.style.setProperty('--dur', `${dur}s`);
    bolt.style.setProperty('--end-scale', `${Math.random() * 0.6 + 1.4}`);

    bolt.innerHTML = `
      <svg width="${size}" height="${Math.round(size * 1.25)}" viewBox="0 0 100 130" fill="none">
        <path d="M55 4 L22 65 L48 65 L36 126 L82 52 L54 52 Z" fill="#ffffff" stroke="#7dd3fc" stroke-width="3" filter="drop-shadow(0 0 16px #38bdf8) drop-shadow(0 0 35px #ffffff)"/>
        <path d="M48 65 L72 86 L64 108" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M28 48 L10 62 L16 78" stroke="#7dd3fc" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>
    `;

    document.body.appendChild(bolt);
    setTimeout(() => bolt.remove(), (dur + 0.2) * 1000);
  }
}

// 3. BLUE LAYS: MASSIVE 360° CHIP DETONATION
function spawnBigChipExplosion(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  triggerScreenShake();
  triggerScreenFlash('rgba(255, 185, 0, 0.35)');
  triggerShockwave(originX, originY, '#ffb732', '1200px');

  const totalChips = 32;
  for (let i = 0; i < totalChips; i++) {
    const chip = document.createElement('div');
    chip.className = 'particle-chip-screen';

    // Massive sizes: 80px up to 145px width!
    const size = Math.random() * 65 + 80;
    const angle = (i / totalChips) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = Math.random() * (window.innerWidth * 0.48) + 260;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * (dist * 0.75);
    const rot = (Math.random() - 0.5) * 720;
    const dur = Math.random() * 0.4 + 1.1;
    const scale = Math.random() * 0.6 + 1.1;

    chip.style.left = `${originX}px`;
    chip.style.top = `${originY}px`;
    chip.style.setProperty('--dx', `${dx}px`);
    chip.style.setProperty('--dy', `${dy}px`);
    chip.style.setProperty('--rot', `${rot}deg`);
    chip.style.setProperty('--dur', `${dur}s`);
    chip.style.setProperty('--scale', `${scale}`);

    const id = `chip_${i}_${Date.now()}`;
    chip.innerHTML = `
      <svg width="${size}" height="${Math.round(size * 0.75)}" viewBox="0 0 100 75" fill="none">
        <defs>
          <radialGradient id="${id}" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#fff099"/>
            <stop offset="40%" stop-color="#ffb732"/>
            <stop offset="80%" stop-color="#d97d00"/>
            <stop offset="100%" stop-color="#9e5200"/>
          </radialGradient>
        </defs>
        <!-- Authentic wavy crunchy chip body with contour ripples -->
        <path d="M12 40 C8 18 35 6 62 14 C85 20 95 36 88 56 C80 72 45 74 22 66 C12 60 14 50 12 40 Z" fill="url(#${id})" stroke="#9e5200" stroke-width="2.5" filter="drop-shadow(0 10px 18px rgba(0,0,0,0.5))"/>
        <!-- Crisp ridges / contour ripples -->
        <path d="M25 32 Q50 20 75 30" stroke="#7a3f00" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.75"/>
        <path d="M28 46 Q55 36 78 44" stroke="#7a3f00" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.7"/>
        <path d="M34 58 Q58 50 72 56" stroke="#7a3f00" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
        <!-- Magic Masala spice specks & salt crystals -->
        <circle cx="42" cy="28" r="2.5" fill="#dc2626"/>
        <circle cx="65" cy="24" r="2.2" fill="#ffffff"/>
        <circle cx="52" cy="42" r="2.8" fill="#ef4444"/>
        <circle cx="34" cy="50" r="2.2" fill="#ffffff"/>
        <circle cx="70" cy="50" r="2.4" fill="#b91c1c"/>
        <circle cx="48" cy="62" r="2" fill="#16a34a"/>
        <circle cx="62" cy="36" r="2.5" fill="#ffffff"/>
      </svg>
    `;

    document.body.appendChild(chip);
    setTimeout(() => chip.remove(), (dur + 0.3) * 1000);
  }

  // Scatter 45+ Masala spice crystals & paprika flakes
  for (let s = 0; s < 46; s++) {
    const spice = document.createElement('div');
    spice.className = 'particle-spice-screen';
    const sSize = Math.random() * 8 + 4;
    spice.style.width = `${sSize}px`;
    spice.style.height = `${sSize}px`;

    const colors = ['#dc2626', '#ef4444', '#ffb732', '#ffffff', '#ffd000', '#16a34a'];
    spice.style.background = colors[Math.floor(Math.random() * colors.length)];
    spice.style.boxShadow = `0 0 6px ${spice.style.background}`;

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * (window.innerWidth * 0.5) + 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const dur = Math.random() * 0.4 + 0.7;

    spice.style.left = `${originX}px`;
    spice.style.top = `${originY}px`;
    spice.style.setProperty('--dx', `${dx}px`);
    spice.style.setProperty('--dy', `${dy}px`);
    spice.style.setProperty('--dur', `${dur}s`);

    document.body.appendChild(spice);
    setTimeout(() => spice.remove(), (dur + 0.2) * 1000);
  }
}

// Global Board Triggers (Multi-Wave Screen Eruptions)
function spawnCaffeineStorm() {
  SoundFX.electricSurge();
  showToast('SIMULATING 03:00 AM CAFFEINE OVERDRIVE', 'info');
  spawnBigMonsterLightning(window.innerWidth * 0.3, window.innerHeight * 0.4);
  setTimeout(() => {
    SoundFX.electricSurge();
    spawnBigMonsterLightning(window.innerWidth * 0.7, window.innerHeight * 0.5);
  }, 220);
  setTimeout(() => {
    spawnBigMonsterLightning(window.innerWidth * 0.5, window.innerHeight * 0.3);
  }, 440);
}

function spawnChipRain() {
  SoundFX.chipCrunch();
  showToast('UNLEASHING MASALA CHIP RAIN', 'info');
  spawnBigChipExplosion(window.innerWidth * 0.35, window.innerHeight * 0.4);
  setTimeout(() => {
    SoundFX.chipCrunch();
    spawnBigChipExplosion(window.innerWidth * 0.65, window.innerHeight * 0.5);
  }, 240);
}

function spawnFizzyBubbles() {
  SoundFX.canPop();
  showToast('CARBONATION CASCADE DEPLOYED', 'info');
  spawnBigDietCokeFizz(window.innerWidth * 0.25, window.innerHeight * 0.65);
  setTimeout(() => {
    SoundFX.canPop();
    spawnBigDietCokeFizz(window.innerWidth * 0.75, window.innerHeight * 0.65);
  }, 200);
  setTimeout(() => {
    spawnBigDietCokeFizz(window.innerWidth * 0.5, window.innerHeight * 0.55);
  }, 400);
}

// Squad Member Ping Signal
function pingMember(name) {
  SoundFX.clickBlip(880, 0.12);
  showToast(`PING TRANSMITTED TO OPERATOR [${name.toUpperCase()}]`);
}

// ===================================================================
// TOAST NOTIFICATION SYSTEM (NO EMOJIS)
// ===================================================================
function showToast(message, type = 'normal') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type === 'alert' ? 'toast-alert' : type === 'info' ? 'toast-info' : ''}`;
  
  // Custom technical status icon
  const iconSvg = type === 'alert' 
    ? `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-toast-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ===================================================================
// LIVE SYSTEM CLOCK
// ===================================================================
function initClock() {
  const clockEl = document.getElementById('live-clock');
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${h}:${m}:${s}`;
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ===================================================================
// AMBIENT BACKGROUND CANVAS (STARS, FIZZ & DRIFTING SHARDS)
// ===================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle instances
  const particles = [];
  const count = Math.min(45, Math.floor((width * height) / 24000));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      type: Math.random() > 0.6 ? 'neon' : 'silver'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.type === 'neon' 
        ? `rgba(57, 255, 20, ${p.opacity})` 
        : `rgba(200, 215, 255, ${p.opacity * 0.7})`;
      ctx.fill();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

// ===================================================================
// EVENT LISTENERS & SETUP
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initClock();
  initAmbientCanvas();
  renderAll();

  // Admin button listener
  document.getElementById('open-admin-btn')?.addEventListener('click', openAdminModal);

  // SFX toggle button
  document.getElementById('sfx-toggle-btn')?.addEventListener('click', () => {
    appState.settings.sfxEnabled = !appState.settings.sfxEnabled;
    saveState();
    updateSfxButtonUI();
    SoundFX.clickBlip(600);
    showToast(`SFX AUDIO SYSTEM: ${appState.settings.sfxEnabled ? 'ACTIVE' : 'MUTED'}`);
  });

  // Reset session auto-lock when user interacts inside admin panel
  const adminPanel = document.getElementById('admin-panel-modal');
  if (adminPanel) {
    ['input', 'click', 'keydown'].forEach(evt => {
      adminPanel.addEventListener(evt, () => {
        if (isAdminAuthenticated) {
          resetSessionAutoLockTimer();
        }
      });
    });
  }

  // Close modal when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAdminModals();
      }
    });
  });

  // Keyboard escape shortcut to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAdminModals();
    }
    // Secret admin combo shortcut: Alt+A
    if (e.altKey && (e.key === 'a' || e.key === 'A')) {
      openAdminModal();
    }
  });

  // Attach card visual click listeners
  ['diet-coke', 'monster', 'blue-lays'].forEach(id => {
    const stage = document.getElementById(`stage-${id}`);
    if (stage) {
      stage.addEventListener('click', () => triggerSnackInteraction(id));
    }
  });
});
