// ── Dashboard State ────────────────────────────────────────────────────────
const DState = {
  lang: localStorage.getItem('lang') || 'en',
  dailyLimit: parseFloat(localStorage.getItem('dailyLimit')) || 1000,
  transactions: [],
  connectedBanks: JSON.parse(localStorage.getItem('connectedBanks') || '[]'),
  totalBalance: 0,
  todaySpent: 0,
  activePage: 'overview',

  get t() { return LANG[this.lang]; }
};

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('auth') !== 'true') {
    window.location.href = 'index.html'; return;
  }

  // Seed mock data
  DState.transactions = generateMockTransactions(30);
  DState.todaySpent   = getTodaySpend(DState.transactions);
  DState.totalBalance = 18450 + Math.floor(Math.random() * 5000);

  if (!DState.connectedBanks.length) {
    DState.connectedBanks = [
      { ...BANKS[0], balance: 12500, account: '****4821' },
      { ...BANKS[1], balance: 5950,  account: '****2034' },
    ];
    localStorage.setItem('connectedBanks', JSON.stringify(DState.connectedBanks));
  }

  applyDashTranslations();
  renderAll();
  requestNotifPermission();
  checkBudgetLimit(DState.todaySpent, DState.dailyLimit, DState.lang);
  NotifStore.updateBadge();

  // Show user email in sidebar + security page
  const email = localStorage.getItem('userEmail') || '';
  const initial = email ? email[0].toUpperCase() : 'U';
  const avatarEl = document.getElementById('userAvatar');
  const nameEl   = document.getElementById('userName');
  const secEl    = document.getElementById('securityEmail');
  if (avatarEl) avatarEl.textContent = initial;
  if (nameEl)   nameEl.textContent   = email || 'My Account';
  if (secEl)    secEl.textContent    = email;

  // Offline banner
  function updateOfflineBanner() {
    const banner = document.getElementById('offlineBanner');
    if (banner) banner.style.display = navigator.onLine ? 'none' : 'block';
  }
  window.addEventListener('online',  updateOfflineBanner);
  window.addEventListener('offline', updateOfflineBanner);
  updateOfflineBanner();

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => {
      DState.lang = b.dataset.lang;
      localStorage.setItem('lang', DState.lang);
      document.querySelectorAll('.lang-btn').forEach(x => x.classList.toggle('active', x.dataset.lang === DState.lang));
      applyDashTranslations();
      renderAll();
    });
    b.classList.toggle('active', b.dataset.lang === DState.lang);
  });

  // Nav
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });

  // Limit form
  document.getElementById('limitForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const val = parseFloat(document.getElementById('limitInput').value);
    if (!val || val <= 0) { showToast('Enter a valid amount', 'error'); return; }
    DState.dailyLimit = val;
    localStorage.setItem('dailyLimit', val);
    showToast(DState.t.limitSaved, 'success');
    renderBudgetBar();
    checkBudgetLimit(DState.todaySpent, DState.dailyLimit, DState.lang);
  });

  // Blocked overlay close
  document.getElementById('closeBlocked')?.addEventListener('click', hideBlockedOverlay);

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('auth');
    window.location.href = 'index.html';
  });

  // Sync button
  document.getElementById('syncBtn')?.addEventListener('click', () => {
    showToast('Syncing transactions...', 'info');
    setTimeout(() => {
      DState.transactions = generateMockTransactions(30);
      DState.todaySpent = getTodaySpend(DState.transactions);
      renderAll();
      showToast('Sync complete!', 'success');
    }, 1500);
  });

  // Notifications mark read
  document.getElementById('notifBtn')?.addEventListener('click', () => {
    navigateTo('notifications');
    setTimeout(() => NotifStore.markAllRead(), 500);
  });

  // Add bank
  document.getElementById('addBankBtn')?.addEventListener('click', () => navigateTo('accounts'));
});

// ── Navigation ─────────────────────────────────────────────────────────────
function navigateTo(page) {
  DState.activePage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === `page-${page}`));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.toggle('active', n.dataset.page === page));
  const titles = {
    overview: DState.t.dashboard, transactions: DState.t.transactions,
    accounts: DState.t.accounts, budget: DState.t.budget,
    notifications: DState.t.notifications, settings: DState.t.settings,
  };
  const el = document.getElementById('pageTitle');
  if (el) el.textContent = titles[page] || '';
}

// ── Render All ─────────────────────────────────────────────────────────────
function renderAll() {
  renderStats();
  renderBudgetBar();
  renderTransactions();
  renderChart();
  renderHealthScore();
  renderBanks();
  renderNotifications();
  renderBudgetPage();
}

// ── Stats ──────────────────────────────────────────────────────────────────
function renderStats() {
  const remaining = Math.max(0, DState.dailyLimit - DState.todaySpent);
  const pct = DState.dailyLimit ? Math.round((DState.todaySpent / DState.dailyLimit) * 100) : 0;

  setEl('statBalance',  fmt(DState.totalBalance));
  setEl('statSpent',    fmt(DState.todaySpent));
  setEl('statRemaining',fmt(remaining));
  setEl('statLimit',    fmt(DState.dailyLimit));
  setEl('statPct',      `${pct}% of limit`);
  setEl('statPctAm',    `${pct}% ከገደብ`);
}

// ── Budget Bar ─────────────────────────────────────────────────────────────
function renderBudgetBar() {
  const pct = DState.dailyLimit ? Math.min(100, (DState.todaySpent / DState.dailyLimit) * 100) : 0;
  const fill = document.getElementById('budgetFill');
  const msg  = document.getElementById('budgetMsg');
  const spentEl = document.getElementById('budgetSpentAmt');
  const limitEl = document.getElementById('budgetLimitAmt');

  if (fill) {
    fill.style.width = pct + '%';
    fill.className = 'progress-bar-fill ' + (pct >= 100 ? 'progress-danger' : pct >= 80 ? 'progress-warning' : 'progress-safe');
  }
  if (spentEl) spentEl.textContent = fmt(DState.todaySpent);
  if (limitEl) limitEl.textContent = fmt(DState.dailyLimit);
  if (msg) {
    if (pct >= 100) { msg.textContent = DState.t.dangerCondition; msg.style.color = 'var(--danger)'; }
    else if (pct >= 80) { msg.textContent = DState.t.warningCondition; msg.style.color = 'var(--warning)'; }
    else { msg.textContent = DState.t.goodCondition; msg.style.color = 'var(--success)'; }
  }
}

// ── Transactions ───────────────────────────────────────────────────────────
function renderTransactions(limit = 8) {
  const container = document.getElementById('txList');
  const fullContainer = document.getElementById('txListFull');
  const txs = DState.transactions.slice(0, limit);

  const html = txs.map(tx => `
    <div class="tx-item">
      <div class="tx-icon" style="background:${tx.category.color}22">${tx.category.emoji}</div>
      <div class="tx-info">
        <div class="tx-name">${tx.description}</div>
        <div class="tx-date">${tx.bank} · ${fmtDate(tx.date)}</div>
      </div>
      <div class="tx-amount ${tx.type}">${tx.type === 'debit' ? '-' : '+'}${fmt(tx.amount)}</div>
    </div>
  `).join('');

  if (container) container.innerHTML = html;
  if (fullContainer) fullContainer.innerHTML = DState.transactions.map(tx => `
    <div class="tx-item">
      <div class="tx-icon" style="background:${tx.category.color}22">${tx.category.emoji}</div>
      <div class="tx-info">
        <div class="tx-name">${tx.description}</div>
        <div class="tx-date">${tx.bank} · ${fmtDate(tx.date)}</div>
      </div>
      <div class="tx-amount ${tx.type}">${tx.type === 'debit' ? '-' : '+'}${fmt(tx.amount)}</div>
    </div>
  `).join('');
}

// ── Weekly Chart ───────────────────────────────────────────────────────────
function renderChart() {
  const wrap = document.getElementById('chartBars');
  const labelsEl = document.getElementById('chartLabels');
  if (!wrap) return;
  const { data, labels } = getWeeklyData(DState.transactions);
  const max = Math.max(...data, 1);
  const todayIdx = 6;

  wrap.innerHTML = data.map((v, i) => `
    <div class="chart-bar ${i === todayIdx ? 'today' : ''}"
         style="height:${Math.max(8, (v / max) * 160)}px"
         title="${labels[i]}: ${fmt(v)}"></div>
  `).join('');

  if (labelsEl) labelsEl.innerHTML = labels.map(l => `<div class="chart-label">${l}</div>`).join('');
}

// ── Health Score ───────────────────────────────────────────────────────────
function renderHealthScore() {
  const score = calcHealthScore(DState.todaySpent, DState.dailyLimit, DState.totalBalance);
  const verdict = healthVerdict(score, DState.lang);
  const r = 50, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const ring = document.getElementById('healthRingFill');
  if (ring) {
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = verdict.color;
  }
  setEl('healthScoreNum', score);
  const verdictEl = document.getElementById('healthVerdict');
  if (verdictEl) { verdictEl.textContent = verdict.text; verdictEl.style.color = verdict.color; }

  const tips = document.getElementById('healthTips');
  if (tips) {
    if (score >= 80) tips.textContent = DState.lang === 'am' ? 'ቀጥሉ! ወጪዎን በደንብ እያስተዳደሩ ነው።' : 'Keep it up! You\'re managing your spending well.';
    else if (score >= 50) tips.textContent = DState.lang === 'am' ? 'ወጪዎን ይቀንሱ። ወደ ገደቡ እየቃረቡ ነው።' : 'Reduce spending. You\'re approaching your limit.';
    else tips.textContent = DState.lang === 'am' ? 'ዛሬ ወጪ ማድረግ ያቁሙ። ገደቡ ተጥሷል።' : 'Stop spending today. Limit exceeded.';
  }
}

// ── Banks ──────────────────────────────────────────────────────────────────
function renderBanks() {
  const container = document.getElementById('bankList');
  const fullContainer = document.getElementById('bankListFull');
  if (!container) return;

  const html = DState.connectedBanks.map(b => `
    <div class="bank-card-item">
      <div class="bank-logo">${b.emoji}</div>
      <div class="bank-info">
        <div class="bank-name">${b.name}</div>
        <div class="bank-acct">${b.account}</div>
      </div>
      <div>
        <div class="bank-balance positive">${fmt(b.balance)}</div>
        <div style="display:flex;justify-content:flex-end;margin-top:4px"><div class="bank-sync-dot"></div></div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
  if (fullContainer) fullContainer.innerHTML = html;
}

// ── Notifications ──────────────────────────────────────────────────────────
function renderNotifications() {
  const container = document.getElementById('notifList');
  if (!container) return;
  if (!NotifStore.items.length) {
    container.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:30px">No notifications yet</div>`;
    return;
  }
  container.innerHTML = NotifStore.items.map(n => `
    <div class="notif-item ${n.type}">
      <div class="notif-icon">${n.type === 'danger' ? '🚨' : n.type === 'warning' ? '⚠️' : n.type === 'success' ? '✅' : 'ℹ️'}</div>
      <div>
        <div class="notif-text">${n.msg}</div>
        <div class="notif-time">${fmtDate(new Date(n.time))}</div>
      </div>
    </div>
  `).join('');
}

// ── Budget Page ────────────────────────────────────────────────────────────
function renderBudgetPage() {
  const inp = document.getElementById('limitInput');
  if (inp) inp.value = DState.dailyLimit;
}

// ── Translations ───────────────────────────────────────────────────────────
function applyDashTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (LANG[DState.lang][key]) {
      if (el.tagName === 'INPUT') el.placeholder = LANG[DState.lang][key];
      else el.textContent = LANG[DState.lang][key];
    }
  });
}

// ── Utilities ──────────────────────────────────────────────────────────────
function fmt(n) {
  return (DState.lang === 'am' ? 'ብር ' : 'ETB ') + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(d) {
  return new Date(d).toLocaleString(DState.lang === 'am' ? 'am-ET' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
