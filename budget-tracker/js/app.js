// ── i18n ──────────────────────────────────────────────────────────────────
const LANG = {
  en: {
    appName: 'BudgetEye',
    tagline: 'Smart daily budget tracking for everyone',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    enterPhone: 'Enter your phone number',
    phonePlaceholder: 'Phone number',
    sendOtp: 'Send Verification Code',
    verifyOtp: 'Verify Code',
    otpSent: 'Code sent to your phone',
    scanFace: 'Face Verification',
    scanFaceDesc: 'Look at the camera to verify your identity',
    scanning: 'Scanning...',
    verifyFace: 'Verify Face',
    uploadId: 'National ID Verification',
    uploadIdDesc: 'Upload a photo of your national ID',
    uploadBtn: 'Upload National ID',
    selectBank: 'Connect Your Bank',
    selectBankDesc: 'Select your bank to sync transactions',
    connect: 'Connect Bank',
    skip: 'Skip for now',
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    accounts: 'Accounts',
    budget: 'Budget',
    notifications: 'Notifications',
    settings: 'Settings',
    logout: 'Logout',
    dailyBudget: 'Daily Budget Limit',
    spent: 'Spent Today',
    remaining: 'Remaining',
    totalBalance: 'Total Balance',
    goodCondition: 'You are in great financial condition today!',
    warningCondition: 'Caution: You are approaching your daily limit.',
    dangerCondition: 'LIMIT REACHED: No more transfers today.',
    blockedTitle: 'Transfer Blocked',
    blockedMsg: "You've reached your daily budget limit. Transfers are blocked until tomorrow. If it's urgent, please plan ahead for tomorrow.",
    close: 'Close',
    setLimit: 'Set Daily Limit',
    birr: 'ETB',
    recentTx: 'Recent Transactions',
    connectedBanks: 'Connected Banks',
    healthScore: 'Financial Health',
    weeklySpend: 'Weekly Spending',
    tomorrow: 'Tomorrow',
    today: 'Today',
    syncNow: 'Sync Now',
    addBank: '+ Add Bank',
    limitSaved: 'Daily limit saved!',
    faceSuccess: 'Face verified successfully!',
    idSuccess: 'National ID verified!',
    otpSuccess: 'Phone verified!',
    bankConnected: 'Bank connected successfully!',
    limitReached: '⚠️ Daily limit reached! No transfers allowed today.',
    approaching: '⚠️ You are at {pct}% of your daily limit.',
  },
  am: {
    appName: 'BudgetEye',
    tagline: 'ለሁሉም ዕለታዊ በጀት ክትትል',
    signIn: 'ግባ',
    getStarted: 'ጀምር',
    enterPhone: 'ስልክ ቁጥርዎን ያስገቡ',
    phonePlaceholder: 'ስልክ ቁጥር',
    sendOtp: 'የማረጋገጫ ኮድ ላክ',
    verifyOtp: 'ኮድ አረጋግጥ',
    otpSent: 'ኮድ ወደ ስልክዎ ተልኳል',
    scanFace: 'የፊት ማረጋገጫ',
    scanFaceDesc: 'ማንነትዎን ለማረጋገጥ ካሜራውን ይመልከቱ',
    scanning: 'እየቃኘ ነው...',
    verifyFace: 'ፊት አረጋግጥ',
    uploadId: 'የብሔራዊ መታወቂያ ማረጋገጫ',
    uploadIdDesc: 'የብሔራዊ መታወቂያ ፎቶ ይስቀሉ',
    uploadBtn: 'ብሔራዊ መታወቂያ ስቀል',
    selectBank: 'ባንክዎን ያገናኙ',
    selectBankDesc: 'ግብይቶችን ለማመሳሰል ባንክዎን ይምረጡ',
    connect: 'ባንክ አገናኝ',
    skip: 'ለጊዜው ዝለል',
    dashboard: 'ዳሽቦርድ',
    transactions: 'ግብይቶች',
    accounts: 'ሂሳቦች',
    budget: 'በጀት',
    notifications: 'ማሳወቂያዎች',
    settings: 'ቅንብሮች',
    logout: 'ውጣ',
    dailyBudget: 'ዕለታዊ የበጀት ገደብ',
    spent: 'ዛሬ የወጣ',
    remaining: 'የቀረ',
    totalBalance: 'ጠቅላላ ቀሪ ሂሳብ',
    goodCondition: 'ዛሬ ጥሩ የፋይናንስ ሁኔታ ላይ ነዎት!',
    warningCondition: 'ጥንቃቄ: ወደ ዕለታዊ ገደብዎ እየቃረቡ ነው።',
    dangerCondition: 'ገደብ ደርሷል: ዛሬ ምንም ዝውውር አይፈቀድም።',
    blockedTitle: 'ዝውውር ታግዷል',
    blockedMsg: 'ዕለታዊ የበጀት ገደብዎ ላይ ደርሰዋል። ዝውውሮች እስከ ነገ ታግደዋል። አስቸኳይ ከሆነ ለነገ ያቅዱ።',
    close: 'ዝጋ',
    setLimit: 'ዕለታዊ ገደብ አዘጋጅ',
    birr: 'ብር',
    recentTx: 'የቅርብ ጊዜ ግብይቶች',
    connectedBanks: 'የተገናኙ ባንኮች',
    healthScore: 'የፋይናንስ ጤና',
    weeklySpend: 'ሳምንታዊ ወጪ',
    tomorrow: 'ነገ',
    today: 'ዛሬ',
    syncNow: 'አሁን አመሳስል',
    addBank: '+ ባንክ ጨምር',
    limitSaved: 'ዕለታዊ ገደብ ተቀምጧል!',
    faceSuccess: 'ፊት በተሳካ ሁኔታ ተረጋግጧል!',
    idSuccess: 'ብሔራዊ መታወቂያ ተረጋግጧል!',
    otpSuccess: 'ስልክ ተረጋግጧል!',
    bankConnected: 'ባንክ በተሳካ ሁኔታ ተገናኝቷል!',
    limitReached: '⚠️ ዕለታዊ ገደብ ደርሷል! ዛሬ ዝውውር አይፈቀድም።',
    approaching: '⚠️ ከዕለታዊ ገደብዎ {pct}% ላይ ነዎት።',
  }
};

// ── Backend URL ───────────────────────────────────────────────────────────
// Auto-detects: localhost for PC browser, your LAN IP for phone on same WiFi
const BACKEND = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3001'
  : 'http://10.232.84.214:3001';

// ── State ──────────────────────────────────────────────────────────────────
const State = {
  lang: localStorage.getItem('lang') || 'en',
  currentStep: 1,
  phone: '',
  generatedOtp: '',
  otpExpiry: 0,
  faceVerified: false,
  idVerified: false,
  isAuthenticated: localStorage.getItem('auth') === 'true',

  get t() { return LANG[this.lang]; }
};

// ── Helpers ────────────────────────────────────────────────────────────────
function t(key, vars = {}) {
  let str = LANG[State.lang][key] || key;
  Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
  return str;
}

function showToast(msg, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; el.style.transition = '0.3s'; setTimeout(() => el.remove(), 300); }, duration);
}

function setLang(lang) {
  State.lang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (el.tagName === 'INPUT') el.placeholder = t(key);
    else el.textContent = t(key);
  });
}

// ── Auth Steps ─────────────────────────────────────────────────────────────
function goToStep(n) {
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === n);
    d.classList.toggle('done', i + 1 < n);
  });
  State.currentStep = n;
}

// ── OTP — calls real backend → Twilio → your phone ───────────────────────
let otpCountdownTimer = null;

async function sendOtp() {
  const phone = document.getElementById('phoneInput')?.value?.trim();
  const code  = document.getElementById('countryCode')?.value || '';
  if (!phone || phone.replace(/\D/g, '').length < 7) {
    showToast(State.lang === 'am' ? 'ትክክለኛ ስልክ ቁጥር ያስገቡ' : 'Please enter a valid phone number', 'error');
    return;
  }

  const fullPhone = code + phone.replace(/^0/, ''); // strip leading 0 for intl format
  State.phone = fullPhone;

  const btn = document.getElementById('sendOtpBtn');
  if (btn) { btn.disabled = true; btn.textContent = State.lang === 'am' ? 'እየላከ ነው...' : 'Sending...'; }

  try {
    const res  = await fetch(`${BACKEND}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: fullPhone }),
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Failed to send code', 'error');
      return;
    }

    showToast(State.lang === 'am' ? `ኮድ ወደ ${fullPhone} ተልኳል` : `Code sent to ${fullPhone}`, 'success', 5000);
    goToStep(2);
    startOtpCountdown(5 * 60);
    setTimeout(() => document.querySelector('.otp-input')?.focus(), 100);

  } catch {
    showToast(
      State.lang === 'am'
        ? 'ሰርቨሩ አልተገናኘም። backend እየሰራ ነው?'
        : 'Cannot reach server. Is the backend running?',
      'error', 6000
    );
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t('sendOtp'); }
  }
}

function startOtpCountdown(seconds) {
  clearInterval(otpCountdownTimer);
  let left = seconds;
  const el = document.getElementById('otpCountdown');
  const resendBtn = document.getElementById('resendBtn');
  if (resendBtn) resendBtn.disabled = true;

  otpCountdownTimer = setInterval(() => {
    left--;
    if (el) el.textContent = `${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;
    if (left <= 0) {
      clearInterval(otpCountdownTimer);
      if (el) el.textContent = State.lang === 'am' ? 'ጊዜው አልፏል' : 'Expired';
      if (resendBtn) resendBtn.disabled = false;
    }
  }, 1000);
}

async function resendOtp() {
  clearInterval(otpCountdownTimer);
  await sendOtp();
}

async function verifyOtp() {
  const inputs  = document.querySelectorAll('.otp-input');
  const entered = [...inputs].map(i => i.value).join('');
  if (entered.length < 6) {
    showToast(State.lang === 'am' ? '6 አሃዝ ኮድ ያስገቡ' : 'Enter the 6-digit code', 'error');
    return;
  }

  const btn = document.getElementById('verifyOtpBtn');
  if (btn) { btn.disabled = true; btn.textContent = State.lang === 'am' ? 'እያረጋገጠ...' : 'Verifying...'; }

  try {
    const res  = await fetch(`${BACKEND}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: State.phone, code: entered }),
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Verification failed', 'error');
      inputs.forEach(inp => { inp.style.borderColor = 'var(--danger)'; setTimeout(() => inp.style.borderColor = '', 1200); });
      return;
    }

    // Store session token
    localStorage.setItem('authToken', data.token);
    clearInterval(otpCountdownTimer);
    showToast(t('otpSuccess'), 'success');
    goToStep(3);

  } catch {
    showToast('Cannot reach server. Is the backend running?', 'error', 6000);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t('verifyOtp'); }
  }
}

function verifyFace() {
  const btn = document.getElementById('faceBtn');
  if (btn) { btn.textContent = t('scanning'); btn.disabled = true; }
  setTimeout(() => {
    State.faceVerified = true;
    showToast(t('faceSuccess'), 'success');
    goToStep(4);
    if (btn) { btn.textContent = t('verifyFace'); btn.disabled = false; }
  }, 2500);
}

function verifyId() {
  const file = document.getElementById('idUpload')?.files[0];
  if (!file) { showToast('Please upload your national ID', 'error'); return; }
  showToast('Verifying ID...', 'info');
  setTimeout(() => {
    State.idVerified = true;
    showToast(t('idSuccess'), 'success');
    goToStep(5);
  }, 2000);
}

function connectBank() {
  const selected = document.querySelector('.bank-item.selected');
  if (!selected) { showToast('Please select a bank', 'error'); return; }
  showToast(t('bankConnected'), 'success');
  setTimeout(completeAuth, 1000);
}

function completeAuth() {
  localStorage.setItem('auth', 'true');
  State.isAuthenticated = true;
  window.location.href = 'dashboard.html';
}

// ── OTP input auto-advance ─────────────────────────────────────────────────
function initOtpInputs() {
  const inputs = document.querySelectorAll('.otp-input');
  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      if (inp.value.length === 1 && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
    });
  });
}

// ── Bank selection ─────────────────────────────────────────────────────────
function initBankSelect() {
  document.querySelectorAll('.bank-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.bank-item').forEach(b => b.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Redirect if already authenticated
  if (State.isAuthenticated && window.location.pathname.includes('index')) {
    window.location.href = 'dashboard.html';
    return;
  }

  applyTranslations();
  initOtpInputs();
  initBankSelect();

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
    b.classList.toggle('active', b.dataset.lang === State.lang);
  });

  // Offline banner
  function updateOfflineBanner() {
    const banner = document.getElementById('offlineBanner');
    if (banner) banner.style.display = navigator.onLine ? 'none' : 'block';
  }
  window.addEventListener('online',  updateOfflineBanner);
  window.addEventListener('offline', updateOfflineBanner);
  updateOfflineBanner();

  goToStep(1);
});
