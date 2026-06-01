// ── BANKS ──────────────────────────────────────────────────────────────────
const BANKS = [
  // Philippines
  { key:'gcash',   name:'GCash',    icon:'📱', color:'#007aff', svg:'gcash'   },
  { key:'maya',    name:'Maya',     icon:'💚', color:'#00b96b', svg:'maya'    },
  { key:'bdo',     name:'BDO',      icon:'🏦', color:'#003087', svg:'bdo'     },
  { key:'bpi',     name:'BPI',      icon:'🏦', color:'#ce0000', svg:'bpi'     },
  { key:'metrobank',name:'Metrobank',icon:'🏦',color:'#003087', svg:'metrobank'},
  { key:'pnb',     name:'PNB',      icon:'🏦', color:'#003366', svg:'pnb'     },
  { key:'landbank',name:'Landbank', icon:'🏦', color:'#006633', svg:'landbank' },
  { key:'rcbc',    name:'RCBC',     icon:'🏦', color:'#c8102e', svg:'rcbc'    },
  { key:'unionbank',name:'UnionBank',icon:'🏦',color:'#e87722', svg:'unionbank'},
  { key:'security',name:'Security Bank',icon:'🏦',color:'#00205b',svg:'security'},
  { key:'eastwest',name:'EastWest', icon:'🏦', color:'#00205b', svg:'eastwest' },
  { key:'psbank',  name:'PSBank',   icon:'🏦', color:'#e60026', svg:'psbank'  },
  { key:'seabank', name:'SeaBank',  icon:'🏦', color:'#ee4d2d', svg:'seabank' },
  { key:'tonik',   name:'Tonik',    icon:'💜', color:'#6c00ff', svg:'tonik'   },
  { key:'cimb',    name:'CIMB',     icon:'🏦', color:'#e21d24', svg:'cimb'    },
  // International
  { key:'paypal',  name:'PayPal',   icon:'🅿️', color:'#003087', svg:'paypal'  },
  { key:'wise',    name:'Wise',     icon:'💚', color:'#00b67a', svg:'wise'    },
  { key:'hsbc',    name:'HSBC',     icon:'🏦', color:'#db0011', svg:'hsbc'    },
  { key:'citibank',name:'Citibank', icon:'🏦', color:'#003b8e', svg:'citibank' },
  { key:'cash',    name:'Cash',     icon:'💵', color:'#2ecc71', svg:'cash'    },
  { key:'credit',  name:'Credit Card',icon:'💳',color:'#888',  svg:'credit'  },
  { key:'other',   name:'Other',    icon:'🏦', color:'#666',   svg:'other'   },
];

// SVG logos rendered inline (colored shapes/letters as brand marks)
function getBankSVG(key, color) {
  const c = color;
  const maps = {
    gcash:    `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#007aff"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="Arial">G</text></svg>`,
    maya:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#00b96b"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="Arial">maya</text></svg>`,
    bdo:      `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#003087"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="Arial">BDO</text></svg>`,
    bpi:      `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#ce0000"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="Arial">BPI</text></svg>`,
    metrobank:`<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#003087"/><text x="16" y="16" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial" dy="0">METRO</text><text x="16" y="25" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">BANK</text></svg>`,
    pnb:      `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#003366"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="Arial">PNB</text></svg>`,
    landbank: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#006633"/><text x="16" y="15" text-anchor="middle" fill="white" font-size="7.5" font-weight="700" font-family="Arial">LAND</text><text x="16" y="24" text-anchor="middle" fill="white" font-size="7.5" font-weight="700" font-family="Arial">BANK</text></svg>`,
    rcbc:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#c8102e"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="Arial">RCBC</text></svg>`,
    unionbank:`<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#e87722"/><text x="16" y="15" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">UNION</text><text x="16" y="24" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">BANK</text></svg>`,
    security: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#00205b"/><text x="16" y="14" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">SECURITY</text><text x="16" y="23" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">BANK</text></svg>`,
    eastwest: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#00205b"/><text x="16" y="14" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">EAST</text><text x="16" y="23" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">WEST</text></svg>`,
    psbank:   `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#e60026"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="10" font-weight="800" font-family="Arial">PSBank</text></svg>`,
    seabank:  `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#ee4d2d"/><text x="16" y="14" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">SEA</text><text x="16" y="23" text-anchor="middle" fill="white" font-size="7" font-weight="700" font-family="Arial">BANK</text></svg>`,
    tonik:    `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#6c00ff"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="10" font-weight="800" font-family="Arial">tonik</text></svg>`,
    cimb:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#e21d24"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="Arial">CIMB</text></svg>`,
    paypal:   `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#003087"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="7.5" font-weight="800" font-family="Arial">PayPal</text></svg>`,
    wise:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#00b67a"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="10" font-weight="800" font-family="Arial">Wise</text></svg>`,
    hsbc:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#db0011"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="10" font-weight="800" font-family="Arial">HSBC</text></svg>`,
    citibank: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#003b8e"/><text x="16" y="15" text-anchor="middle" fill="white" font-size="7.5" font-weight="700" font-family="Arial">citi</text><text x="16" y="24" text-anchor="middle" fill="white" font-size="6" font-weight="600" font-family="Arial">bank</text></svg>`,
    cash:     `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#2ecc71"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="18">💵</text></svg>`,
    credit:   `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#555"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="17">💳</text></svg>`,
    other:    `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#444"/><text x="16" y="22" text-anchor="middle" fill="white" font-size="16">🏦</text></svg>`,
  };
  return maps[key] || maps.other;
}

function renderBankPicker(selectedKey) {
  const grid = document.getElementById('bank-picker-grid');
  if (!grid) return;
  grid.innerHTML = BANKS.map(b => `
    <div class="bank-tile ${selectedKey === b.key ? 'selected' : ''}" onclick="selectBank('${b.key}')">
      ${getBankSVG(b.key, b.color)}
      <span>${b.name}</span>
    </div>
  `).join('');
}

function selectBank(key) {
  const bank = BANKS.find(b => b.key === key);
  if (!bank) return;
  document.getElementById('acct-icon').value = bank.icon;
  document.getElementById('acct-bank-key').value = key;
  // Update name field if empty or was a bank name
  const nameField = document.getElementById('acct-name');
  const isBankName = BANKS.some(b => nameField.value === b.name);
  if (!nameField.value || isBankName) nameField.value = bank.name;
  renderBankPicker(key);
}

// ── STATE ──────────────────────────────────────────────────────────────────
const STATE_KEY = 'nash_state';
let state = {
  username: 'Nasha',
  accounts: [
    { id: 'cash', name: 'Cash', icon: '💵', type: 'Debit', currency: 'PHP', balance: 4000 },
    { id: 'gcash', name: 'GCash', icon: '📱', type: 'Debit', currency: 'PHP', balance: 1000 }
  ],
  transactions: [],
  budgets: [
    { id: 'b1', category: 'Food', icon: '🍔', limit: 3000, period: 'monthly' },
    { id: 'b2', category: 'Transport', icon: '🚗', limit: 1500, period: 'monthly' },
    { id: 'b3', category: 'Shopping', icon: '🛍️', limit: 2000, period: 'monthly' },
    { id: 'b4', category: 'Entertainment', icon: '🎮', limit: 1000, period: 'monthly' }
  ],
  goals: [],
  currentTxType: 'income',
  selectedCategory: '',
  balancesHidden: false,
  editingTxId: null
};

const CATEGORIES = {
  income:   ['💼 Salary','💰 Freelance','🎁 Gift','📈 Investment','🏦 Transfer In','✨ Other'],
  expense:  ['🍔 Food','🚗 Transport','🛍️ Shopping','💊 Health','🏠 Housing','📱 Utilities','🎮 Entertainment','📚 Education','👗 Clothing','✨ Other'],
  transfer: ['➡️ Transfer']
};

const INSIGHTS = [
  "Looking <strong>healthy</strong> this week. Keep those expenses in check!",
  "Your savings rate is <strong>improving</strong>. Nash approves 🐰",
  "No big splurges detected. You're on a <strong>clean streak</strong>.",
  "Budget discipline: <strong>level up</strong>. Keep logging everything.",
  "Every peso logged is a peso <strong>understood</strong>. Keep it up!"
];

// ── PERSISTENCE ────────────────────────────────────────────────────────────
function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      state = { ...state, ...s };
      // ensure budgets/goals exist
      if (!state.budgets) state.budgets = [];
      if (!state.goals) state.goals = [];
    }
  } catch(e) {}
}

// ── NAVIGATION ─────────────────────────────────────────────────────────────
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page).classList.add('active');
  if (page === 'wallet') renderWallet();
  if (page === 'history') renderHistory();
  if (page === 'home') renderHome();
  if (page === 'plan') renderPlan();
}

// ── HOME ───────────────────────────────────────────────────────────────────
function renderHome() {
  // Initialize rabbit SVG if empty
  const wrap = document.getElementById('mascot-svg-wrap');
  if (wrap && !wrap.querySelector('svg')) {
    wrap.innerHTML = buildRabbit({ eyes: 'happy', mouth: 'smile' });
  }
  const now = new Date();
  const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  document.getElementById('home-date').textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  const h = now.getHours();
  document.getElementById('home-greeting-word').textContent = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  document.getElementById('home-username').textContent = state.username;

  updateMascotForContext();

  const mon = now.getMonth(), yr = now.getFullYear();
  let income = 0, expense = 0;
  state.transactions.forEach(tx => {
    const d = new Date(tx.date);
    if (d.getMonth() === mon && d.getFullYear() === yr) {
      if (tx.type === 'income') income += tx.amount;
      else if (tx.type === 'expense') expense += tx.amount;
    }
  });
  document.getElementById('home-income').textContent = fmt(income);
  document.getElementById('home-expense').textContent = fmt(expense);

  // Budget alert on home
  const alerts = getBudgetAlerts();
  const alertEl = document.getElementById('budget-alert-home');
  if (alerts.length > 0) {
    alertEl.style.display = 'block';
    alertEl.innerHTML = `<div style="display:flex;align-items:center;gap:10px">
      <div style="font-size:22px">⚠️</div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--yellow)">Budget Warning</div>
        <div style="font-size:12px;color:var(--text-dim);margin-top:2px">${alerts[0]}</div>
      </div>
    </div>`;
  } else {
    alertEl.style.display = 'none';
  }

  const recent = [...state.transactions].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);
  if (recent.length > 0) {
    document.getElementById('empty-cta').style.display = 'none';
    document.getElementById('recent-txs-home').style.display = 'block';
    document.getElementById('recent-list-home').innerHTML = recent.map(tx => txItemHTML(tx)).join('');
  } else {
    document.getElementById('empty-cta').style.display = 'block';
    document.getElementById('recent-txs-home').style.display = 'none';
  }
}

function getBudgetAlerts() {
  const now = new Date();
  const mon = now.getMonth(), yr = now.getFullYear();
  const alerts = [];
  state.budgets.forEach(b => {
    const spent = state.transactions
      .filter(tx => {
        const d = new Date(tx.date);
        return tx.type === 'expense' && tx.category === b.category &&
               d.getMonth() === mon && d.getFullYear() === yr;
      })
      .reduce((s, tx) => s + tx.amount, 0);
    const pct = b.limit > 0 ? spent / b.limit : 0;
    if (pct >= 1) alerts.push(`${b.icon} ${b.category} budget exceeded! (${fmt(spent)} / ${fmt(b.limit)})`);
    else if (pct >= 0.8) alerts.push(`${b.icon} ${b.category} at ${Math.round(pct*100)}% of budget`);
  });
  return alerts;
}

function calcStreak() {
  if (!state.transactions.length) return 0;
  const today = new Date(); today.setHours(0,0,0,0);
  let streak = 0, check = new Date(today);
  while (true) {
    const dateStr = check.toDateString();
    const hasExpense = state.transactions.some(tx => {
      const d = new Date(tx.date); d.setHours(0,0,0,0);
      return tx.type === 'expense' && d.toDateString() === dateStr;
    });
    if (hasExpense) break;
    streak++;
    check.setDate(check.getDate() - 1);
    if (streak > 365) break;
  }
  return streak;
}

// ── WALLET ─────────────────────────────────────────────────────────────────
function renderWallet() {
  const net = state.accounts.reduce((s, a) => s + a.balance, 0);
  document.getElementById('net-balance').textContent = state.balancesHidden ? '₱ ••••••' : fmt(net);
  document.getElementById('insight-text').innerHTML = INSIGHTS[Math.floor(Math.abs(net) / 1000) % INSIGHTS.length] || INSIGHTS[0];

  const now = new Date();
  const bars = Array.from({length:7}, (_,i) => {
    const d = new Date(now); d.setDate(d.getDate() - (6-i)); d.setHours(0,0,0,0);
    return state.transactions
      .filter(tx => tx.type==='expense' && new Date(tx.date).toDateString()===d.toDateString())
      .reduce((s,tx) => s+tx.amount, 0);
  });
  const maxBar = Math.max(...bars, 1);
  const dayLabels = Array.from({length:7}, (_,i) => {
    const d = new Date(now); d.setDate(d.getDate() - (6-i));
    return ['S','M','T','W','T','F','S'][d.getDay()];
  });
  document.getElementById('daily-bar-chart').innerHTML = bars.map((v,i) =>
    `<div class="bar ${i===6?'today':''}" style="height:${Math.max(8, Math.round(v/maxBar*40))}px" title="${fmt(v)}"></div>`
  ).join('');
  document.getElementById('bar-labels').innerHTML = dayLabels.map(d =>
    `<div class="bar-lbl">${d}</div>`
  ).join('');

  const grid = document.getElementById('accounts-grid');
  grid.innerHTML = state.accounts.map(acc => {
    const bank = BANKS.find(b => b.key === acc.bankKey);
    const iconHTML = bank
      ? `<div class="account-icon" style="background:none;padding:0;overflow:hidden">${getBankSVG(bank.key, bank.color)}</div>`
      : `<div class="account-icon">${acc.icon}</div>`;
    return `
    <div class="account-card" onclick="openEditAccount('${acc.id}')">
      <div class="account-top">
        ${iconHTML}
        <button class="account-more" onclick="event.stopPropagation();showAccountMenu('${acc.id}')">···</button>
      </div>
      <div class="account-name">${acc.name}</div>
      <div class="account-type">${acc.type} · ${acc.currency}</div>
      <div class="account-bal-label">BALANCE</div>
      <div class="account-bal">${state.balancesHidden ? '₱ ••••' : fmt(acc.balance)}</div>
    </div>
  `;}).join('') + `
    <div class="add-account-card" onclick="openAddAccount()">
      <div style="font-size:24px;color:var(--text-muted)">+</div>
      <span>Add Account</span>
    </div>
  `;
}

function toggleBalances() {
  state.balancesHidden = !state.balancesHidden;
  saveState();
  renderWallet();
}

function showAccountMenu(id) {
  const acc = state.accounts.find(a => a.id === id);
  if (!acc) return;
  openConfirmSheet(
    `Delete "${acc.name}"?`,
    `This will remove the account. Your transaction history will be kept but won't reflect this account's balance.`,
    () => {
      state.accounts = state.accounts.filter(a => a.id !== id);
      saveState(); renderWallet();
      showToast(`🗑️ ${acc.name} removed`);
    }
  );
}

function openAddAccount() {
  document.getElementById('acct-sheet-title').textContent = 'Add Account';
  document.getElementById('acct-id').value = '';
  document.getElementById('acct-name').value = '';
  document.getElementById('acct-icon').value = '💳';
  document.getElementById('acct-bank-key').value = '';
  document.getElementById('acct-balance').value = '';
  renderBankPicker('');
  document.getElementById('acct-sheet').classList.add('open');
}

function openEditAccount(id) {
  const acc = state.accounts.find(a => a.id === id);
  if (!acc) return;
  document.getElementById('acct-sheet-title').textContent = 'Edit Account';
  document.getElementById('acct-id').value = acc.id;
  document.getElementById('acct-name').value = acc.name;
  document.getElementById('acct-icon').value = acc.icon;
  document.getElementById('acct-bank-key').value = acc.bankKey || '';
  document.getElementById('acct-balance').value = acc.balance;
  renderBankPicker(acc.bankKey || '');
  document.getElementById('acct-sheet').classList.add('open');
}

function saveAccount() {
  const id = document.getElementById('acct-id').value;
  const name = document.getElementById('acct-name').value.trim();
  const icon = document.getElementById('acct-icon').value.trim() || '💳';
  const bankKey = document.getElementById('acct-bank-key').value || '';
  const balance = parseFloat(document.getElementById('acct-balance').value) || 0;
  if (!name) { showToast('Enter an account name'); return; }
  if (id) {
    const acc = state.accounts.find(a => a.id === id);
    if (acc) { acc.name = name; acc.icon = icon; acc.bankKey = bankKey; acc.balance = balance; }
  } else {
    state.accounts.push({ id: 'acc_' + Date.now(), name, icon, bankKey, type: 'Debit', currency: 'PHP', balance });
  }
  saveState();
  document.getElementById('acct-sheet').classList.remove('open');
  renderWallet();
  showToast('✅ Account saved');
}

// ── HISTORY ────────────────────────────────────────────────────────────────
function renderHistory(filter) {
  const list = document.getElementById('history-list');
  const empty = document.getElementById('empty-history');
  let txs = [...state.transactions].sort((a,b) => new Date(b.date)-new Date(a.date));
  if (filter) {
    const q = filter.toLowerCase();
    txs = txs.filter(tx =>
      tx.note?.toLowerCase().includes(q) ||
      tx.category?.toLowerCase().includes(q) ||
      tx.account?.toLowerCase().includes(q)
    );
  }
  if (!txs.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  const groups = {};
  txs.forEach(tx => {
    const d = new Date(tx.date);
    const key = d.toDateString();
    if (!groups[key]) groups[key] = { date: d, txs: [] };
    groups[key].txs.push(tx);
  });

  list.innerHTML = Object.values(groups).map(g => {
    const dayNet = g.txs.reduce((s,tx) => tx.type==='income' ? s+tx.amount : tx.type==='expense' ? s-tx.amount : s, 0);
    const sign = dayNet >= 0 ? '+' : '';
    return `
      <div class="tx-group">
        <div class="tx-date-row">
          <div>
            <div class="tx-date">${formatDayLabel(g.date)}</div>
            <div style="font-size:11px;color:var(--text-muted)">${g.date.toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
          <div class="tx-day-total" style="color:${dayNet>=0?'var(--green-bright)':'var(--red)'}">${sign}${fmt(Math.abs(dayNet))}</div>
        </div>
        ${g.txs.map(tx => txItemHTML(tx, true)).join('')}
      </div>
    `;
  }).join('');
}

function txItemHTML(tx, showActions = false) {
  const isIncome = tx.type === 'income';
  const isExpense = tx.type === 'expense';
  const sign = isIncome ? '+' : isExpense ? '-' : '⇄';
  const amtClass = isExpense ? 'expense' : '';
  const dotClass = isExpense ? 'expense' : '';
  const actions = showActions ? `
    <div class="tx-actions">
      <button class="tx-action-btn edit" onclick="event.stopPropagation();openEditTx('${tx.id}')">✏️</button>
      <button class="tx-action-btn del" onclick="event.stopPropagation();deleteTx('${tx.id}')">🗑️</button>
    </div>` : '';
  return `
    <div class="tx-item" onclick="toggleTxActions(this)">
      <div class="tx-dot ${dotClass}"></div>
      <div class="tx-icon">${tx.categoryIcon || '💳'}</div>
      <div class="tx-info">
        <div class="tx-name">${tx.note || tx.category || 'Transaction'}</div>
        <div class="tx-meta">${tx.account} · ${new Date(tx.date).toLocaleTimeString('en-PH',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
      <div class="tx-amount ${amtClass}">${sign}${fmt(tx.amount)}</div>
      ${actions}
    </div>
  `;
}

function toggleTxActions(el) {
  el.classList.toggle('expanded');
}

function filterHistory(q) { renderHistory(q); }

function formatDayLabel(d) {
  const now = new Date(); now.setHours(0,0,0,0);
  const t = new Date(d); t.setHours(0,0,0,0);
  const diff = (now - t) / 86400000;
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-PH',{weekday:'long'});
}

function deleteTx(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  openConfirmSheet(
    'Delete transaction?',
    `${tx.categoryIcon || ''} ${tx.note || tx.category} · ${fmt(tx.amount)}\n\nThis will also reverse the balance change on your account.`,
    () => {
      // reverse balance
      const acc = state.accounts.find(a => a.name === tx.account);
      if (acc) {
        if (tx.type === 'income') acc.balance -= tx.amount;
        else if (tx.type === 'expense') acc.balance += tx.amount;
        else if (tx.type === 'transfer') {
          const toAcc = state.accounts.find(a => a.name === tx.toAccount);
          if (toAcc) toAcc.balance -= tx.amount;
          acc.balance += tx.amount;
        }
      }
      state.transactions = state.transactions.filter(t => t.id !== id);
      saveState();
      renderHistory(document.getElementById('search-input').value);
      renderHome();
      showToast('🗑️ Transaction deleted');
    }
  );
}

function openEditTx(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  state.editingTxId = id;
  state.selectedCategory = (tx.categoryIcon || '') + ' ' + (tx.category || '');
  setTxType(tx.type);
  renderCatChips();
  document.getElementById('tx-amount').value = tx.amount;
  document.getElementById('tx-note').value = tx.note || '';
  const sel = document.getElementById('tx-account');
  const opt = [...sel.options].find(o => o.text.startsWith(tx.account));
  if (opt) sel.value = opt.value;
  document.getElementById('submit-btn').textContent = 'Save Changes';
  document.getElementById('add-sheet').classList.add('open');
}

// ── ADD TRANSACTION ─────────────────────────────────────────────────────────
function openAddSheet() {
  state.editingTxId = null;
  state.selectedCategory = '';
  document.getElementById('tx-amount').value = '';
  document.getElementById('tx-note').value = '';
  renderAccountSelect();
  setTxType('expense');
  document.getElementById('submit-btn').textContent = 'Add Expense';
  document.getElementById('add-sheet').classList.add('open');
  setTimeout(() => document.getElementById('tx-amount').focus(), 400);
}
function closeAddSheet() {
  document.getElementById('add-sheet').classList.remove('open');
  state.editingTxId = null;
}

function setTxType(type) {
  state.currentTxType = type;
  state.selectedCategory = '';
  document.querySelectorAll('.sheet-tab').forEach((t,i) => {
    t.classList.remove('active','income','expense','transfer');
    if (['income','expense','transfer'][i] === type) { t.classList.add('active', type); }
  });
  // Show/hide transfer target
  const toGroup = document.getElementById('to-account-group');
  if (toGroup) toGroup.style.display = type === 'transfer' ? 'block' : 'none';
  if (!state.editingTxId) {
    document.getElementById('submit-btn').textContent = `Add ${type.charAt(0).toUpperCase()+type.slice(1)}`;
  }
  renderCatChips();
  renderAccountSelect();
}

function renderCatChips() {
  const cats = CATEGORIES[state.currentTxType] || [];
  document.getElementById('cat-chips').innerHTML = cats.map(c => {
    const icon = c.split(' ')[0];
    const label = c.split(' ').slice(1).join(' ');
    return `<div class="cat-chip ${state.selectedCategory===c?'selected':''}" onclick="selectCat('${c}')">${icon} ${label}</div>`;
  }).join('');
}

function selectCat(cat) {
  state.selectedCategory = cat;
  renderCatChips();
}

function renderAccountSelect() {
  const sel = document.getElementById('tx-account');
  sel.innerHTML = state.accounts.map(a => `<option value="${a.id}">${a.name} (${fmt(a.balance)})</option>`).join('');
  const toSel = document.getElementById('tx-to-account');
  if (toSel) toSel.innerHTML = state.accounts.map(a => `<option value="${a.id}">${a.name} (${fmt(a.balance)})</option>`).join('');
}

function submitTransaction() {
  const amount = parseFloat(document.getElementById('tx-amount').value);
  if (!amount || amount <= 0) { showToast('Please enter a valid amount'); return; }
  const cat = state.selectedCategory || CATEGORIES[state.currentTxType][0];
  const icon = cat.split(' ')[0];
  const label = cat.split(' ').slice(1).join(' ');
  const accountId = document.getElementById('tx-account').value;
  const account = state.accounts.find(a => a.id === accountId);
  const note = document.getElementById('tx-note').value.trim();

  if (!account) { showToast('Select a valid account'); return; }

  if (state.currentTxType === 'transfer') {
    const toAccountId = document.getElementById('tx-to-account').value;
    if (toAccountId === accountId) { showToast('Cannot transfer to the same account'); return; }
    const toAccount = state.accounts.find(a => a.id === toAccountId);
    if (!toAccount) { showToast('Select a destination account'); return; }
    if (account.balance < amount) { showToast('Insufficient balance!'); return; }

    if (state.editingTxId) {
      // reverse old transfer
      const old = state.transactions.find(t => t.id === state.editingTxId);
      if (old) {
        const oldFrom = state.accounts.find(a => a.name === old.account);
        const oldTo = state.accounts.find(a => a.name === old.toAccount);
        if (oldFrom) oldFrom.balance += old.amount;
        if (oldTo) oldTo.balance -= old.amount;
        state.transactions = state.transactions.filter(t => t.id !== state.editingTxId);
      }
    }

    account.balance -= amount;
    toAccount.balance += amount;
    const tx = {
      id: state.editingTxId || Date.now().toString(),
      type: 'transfer', amount, category: 'Transfer', categoryIcon: '⇄',
      account: account.name, toAccount: toAccount.name,
      note: note || `${account.name} → ${toAccount.name}`, date: new Date().toISOString()
    };
    state.transactions.push(tx);
    saveState(); closeAddSheet();
    showToast(`⇄ Transfer of ${fmt(amount)} done`);
    renderHome(); renderWallet();
    showMascotReaction('transfer');
    return;
  }

  if (state.currentTxType === 'expense' && account.balance < amount) {
    showToast('Insufficient balance!'); return;
  }

  if (state.editingTxId) {
    const old = state.transactions.find(t => t.id === state.editingTxId);
    if (old) {
      const oldAcc = state.accounts.find(a => a.name === old.account);
      if (oldAcc) {
        if (old.type === 'income') oldAcc.balance -= old.amount;
        else if (old.type === 'expense') oldAcc.balance += old.amount;
      }
      state.transactions = state.transactions.filter(t => t.id !== state.editingTxId);
    }
  }

  const tx = {
    id: state.editingTxId || Date.now().toString(),
    type: state.currentTxType, amount, category: label, categoryIcon: icon,
    account: account.name, accountId, note, date: new Date().toISOString()
  };
  state.transactions.push(tx);

  if (state.currentTxType === 'income') account.balance += amount;
  else if (state.currentTxType === 'expense') account.balance -= amount;

  saveState(); closeAddSheet();
  const emoji = state.currentTxType === 'income' ? '💚' : '🔴';
  const sign = state.currentTxType === 'income' ? '+' : '-';
  showToast(`${emoji} ${sign}${fmt(amount)} logged!`);
  renderHome();

  // Mascot reaction
  if (state.currentTxType === 'income') {
    showMascotReaction('income');
  } else if (state.currentTxType === 'expense') {
    const alerts = getBudgetAlerts();
    if (alerts.length > 0) {
      const isExceeded = alerts[0].includes('exceeded');
      setTimeout(() => showMascotReaction(isExceeded ? 'budgetExceeded' : 'budgetWarn'), 300);
      setTimeout(() => showToast('⚠️ ' + alerts[0]), 2700);
    } else {
      // Big expense = more than 20% of any account balance
      const bigThreshold = account.balance * 0.2;
      showMascotReaction(amount > bigThreshold ? 'expenseBig' : 'expense');
    }
  }
}

// ── PLAN / BUDGETS / GOALS ──────────────────────────────────────────────────
function renderPlan() {
  renderBudgets();
  renderGoals();
}

function renderBudgets() {
  const now = new Date();
  const mon = now.getMonth(), yr = now.getFullYear();
  const container = document.getElementById('budgets-list');

  if (!state.budgets.length) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">No budgets yet. Tap + to add one.</div>`;
    return;
  }

  container.innerHTML = state.budgets.map(b => {
    const spent = state.transactions
      .filter(tx => {
        const d = new Date(tx.date);
        return tx.type === 'expense' && tx.category === b.category &&
               d.getMonth() === mon && d.getFullYear() === yr;
      })
      .reduce((s, tx) => s + tx.amount, 0);
    const pct = b.limit > 0 ? Math.min(spent / b.limit, 1) : 0;
    const pctDisplay = Math.round(pct * 100);
    const barColor = pct >= 1 ? 'var(--red)' : pct >= 0.8 ? 'var(--yellow)' : 'var(--green-bright)';
    const remaining = b.limit - spent;
    return `
      <div class="budget-card">
        <div class="budget-top">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="plan-item-icon" style="width:36px;height:36px;font-size:18px">${b.icon}</div>
            <div>
              <div class="budget-name">${b.category}</div>
              <div class="budget-meta">${fmt(spent)} of ${fmt(b.limit)}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="budget-pct" style="color:${barColor}">${pctDisplay}%</div>
            <button class="tx-action-btn edit" onclick="openEditBudget('${b.id}')">✏️</button>
            <button class="tx-action-btn del" onclick="deleteBudget('${b.id}')">🗑️</button>
          </div>
        </div>
        <div class="budget-bar-bg">
          <div class="budget-bar-fill" style="width:${pct*100}%;background:${barColor}"></div>
        </div>
        <div class="budget-remaining" style="color:${remaining<0?'var(--red)':'var(--text-muted)'}">
          ${remaining >= 0 ? fmt(remaining) + ' remaining' : fmt(Math.abs(remaining)) + ' over budget!'}
        </div>
      </div>
    `;
  }).join('');
}

function renderGoals() {
  const container = document.getElementById('goals-list');
  if (!state.goals.length) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">No goals yet. Tap + to set one.</div>`;
    return;
  }
  container.innerHTML = state.goals.map(g => {
    const pct = g.target > 0 ? Math.min(g.saved / g.target, 1) : 0;
    const barColor = pct >= 1 ? 'var(--green-bright)' : 'var(--blue)';
    return `
      <div class="budget-card">
        <div class="budget-top">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="plan-item-icon" style="width:36px;height:36px;font-size:18px">${g.icon}</div>
            <div>
              <div class="budget-name">${g.name}</div>
              <div class="budget-meta">${fmt(g.saved)} of ${fmt(g.target)}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="budget-pct" style="color:${barColor}">${Math.round(pct*100)}%</div>
            <button class="tx-action-btn edit" onclick="openEditGoal('${g.id}')">✏️</button>
            <button class="tx-action-btn del" onclick="deleteGoal('${g.id}')">🗑️</button>
          </div>
        </div>
        <div class="budget-bar-bg">
          <div class="budget-bar-fill" style="width:${pct*100}%;background:${barColor}"></div>
        </div>
        <div class="budget-remaining" style="color:var(--text-muted)">
          ${pct >= 1 ? '🎉 Goal reached!' : fmt(g.target - g.saved) + ' to go'}
        </div>
      </div>
    `;
  }).join('');
}

// Budget CRUD
function openAddBudget() {
  document.getElementById('budget-sheet-title').textContent = 'Add Budget';
  document.getElementById('budget-id').value = '';
  document.getElementById('budget-category').value = 'Food';
  document.getElementById('budget-icon').value = '🍔';
  document.getElementById('budget-limit').value = '';
  document.getElementById('budget-sheet').classList.add('open');
}

function openEditBudget(id) {
  const b = state.budgets.find(x => x.id === id);
  if (!b) return;
  document.getElementById('budget-sheet-title').textContent = 'Edit Budget';
  document.getElementById('budget-id').value = b.id;
  document.getElementById('budget-category').value = b.category;
  document.getElementById('budget-icon').value = b.icon;
  document.getElementById('budget-limit').value = b.limit;
  document.getElementById('budget-sheet').classList.add('open');
}

function saveBudget() {
  const id = document.getElementById('budget-id').value;
  const category = document.getElementById('budget-category').value.trim();
  const icon = document.getElementById('budget-icon').value.trim() || '📦';
  const limit = parseFloat(document.getElementById('budget-limit').value);
  if (!category || !limit || limit <= 0) { showToast('Fill in all fields'); return; }
  if (id) {
    const b = state.budgets.find(x => x.id === id);
    if (b) { b.category = category; b.icon = icon; b.limit = limit; }
  } else {
    state.budgets.push({ id: 'b_' + Date.now(), category, icon, limit, period: 'monthly' });
  }
  saveState();
  document.getElementById('budget-sheet').classList.remove('open');
  renderBudgets();
  showToast('✅ Budget saved');
}

function deleteBudget(id) {
  openConfirmSheet('Delete budget?', 'This budget will be permanently removed.', () => {
    state.budgets = state.budgets.filter(b => b.id !== id);
    saveState(); renderBudgets();
    showToast('🗑️ Budget removed');
  });
}

// Goal CRUD
function openAddGoal() {
  document.getElementById('goal-sheet-title').textContent = 'Add Goal';
  document.getElementById('goal-id').value = '';
  document.getElementById('goal-name').value = '';
  document.getElementById('goal-icon').value = '🎯';
  document.getElementById('goal-target').value = '';
  document.getElementById('goal-saved').value = '';
  document.getElementById('goal-sheet').classList.add('open');
}

function openEditGoal(id) {
  const g = state.goals.find(x => x.id === id);
  if (!g) return;
  document.getElementById('goal-sheet-title').textContent = 'Edit Goal';
  document.getElementById('goal-id').value = g.id;
  document.getElementById('goal-name').value = g.name;
  document.getElementById('goal-icon').value = g.icon;
  document.getElementById('goal-target').value = g.target;
  document.getElementById('goal-saved').value = g.saved;
  document.getElementById('goal-sheet').classList.add('open');
}

function saveGoal() {
  const id = document.getElementById('goal-id').value;
  const name = document.getElementById('goal-name').value.trim();
  const icon = document.getElementById('goal-icon').value.trim() || '🎯';
  const target = parseFloat(document.getElementById('goal-target').value);
  const saved = parseFloat(document.getElementById('goal-saved').value) || 0;
  if (!name || !target || target <= 0) { showToast('Fill in goal name and target amount'); return; }
  if (id) {
    const g = state.goals.find(x => x.id === id);
    if (g) { g.name = name; g.icon = icon; g.target = target; g.saved = saved; }
  } else {
    state.goals.push({ id: 'g_' + Date.now(), name, icon, target, saved });
  }
  saveState();
  document.getElementById('goal-sheet').classList.remove('open');
  renderGoals();
  showToast('✅ Goal saved');
}

function deleteGoal(id) {
  openConfirmSheet('Delete goal?', 'This goal will be permanently removed.', () => {
    state.goals = state.goals.filter(g => g.id !== id);
    saveState(); renderGoals();
    showToast('🗑️ Goal removed');
  });
}

// ── CONFIRM SHEET ──────────────────────────────────────────────────────────
let confirmCallback = null;
function openConfirmSheet(title, msg, cb) {
  confirmCallback = cb;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-sheet').classList.add('open');
}
function confirmAction() {
  document.getElementById('confirm-sheet').classList.remove('open');
  if (confirmCallback) { confirmCallback(); confirmCallback = null; }
}
function cancelConfirm() {
  document.getElementById('confirm-sheet').classList.remove('open');
  confirmCallback = null;
}

// ── EXPORT ─────────────────────────────────────────────────────────────────
function exportData() {
  const rows = [['Date','Type','Category','Account','Amount','Note']];
  [...state.transactions]
    .sort((a,b) => new Date(a.date)-new Date(b.date))
    .forEach(tx => {
      rows.push([
        new Date(tx.date).toLocaleDateString('en-PH'),
        tx.type, tx.category, tx.account,
        tx.type === 'expense' ? -tx.amount : tx.amount,
        tx.note || ''
      ]);
    });
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `nash-export-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
  showToast('📥 CSV exported!');
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `nash-backup-${Date.now()}.json`; a.click();
  URL.revokeObjectURL(url);
  showToast('💾 Backup exported!');
}

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.transactions) throw new Error('Invalid file');
      state = { ...state, ...imported };
      saveState();
      renderHome();
      showToast('✅ Data imported!');
    } catch {
      showToast('❌ Invalid backup file');
    }
  };
  reader.readAsText(file);
}

// ── UTILS ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function closeSheetIfOutside(e) {
  if (e.target.classList.contains('sheet-overlay')) {
    e.target.classList.remove('open');
    state.editingTxId = null;
  }
}

// ── PWA INSTALL ────────────────────────────────────────────────────────────
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (!localStorage.getItem('nash_install_dismissed')) {
    document.getElementById('install-banner').classList.add('show');
    document.getElementById('app').style.paddingTop = '56px';
  }
});
document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  document.getElementById('install-banner').classList.remove('show');
  document.getElementById('app').style.paddingTop = '';
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  if (outcome === 'accepted') showToast('🎉 Nash installed!');
});
function dismissInstall() {
  document.getElementById('install-banner').classList.remove('show');
  document.getElementById('app').style.paddingTop = '';
  localStorage.setItem('nash_install_dismissed', '1');
}
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  document.getElementById('install-banner').classList.remove('show');
  document.getElementById('app').style.paddingTop = '';
});

// ── SERVICE WORKER ─────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}


// ── RABBIT MASCOT SYSTEM v2 ────────────────────────────────────────────────
// Full alive rabbit with: idle animations, blink, ear wiggle, sleep,
// achievements, streaks, coin rain, confetti, petting, accessories

// ── SVG RABBIT EXPRESSIONS ─────────────────────────────────────────────────
function buildRabbit(opts = {}) {
  const {
    eyes = 'happy',     // happy | excited | thinking | worried | surprised | sleeping | winking | proud | heart | determined
    mouth = 'smile',    // smile | open | flat | frown | smirk
    blush = 0.5,
    earTilt = 0,        // degrees tilt for ear wiggle
    accessory = '',     // crown | glasses | bowtie | none
    skinColor = '#f0e8f0',
    earColor = '#ffb8c8',
    coinColor = '#f9c74f',
    coinGlow = false,
    eyeOffset = 0,      // for look-around
    sleeping = false,
  } = opts;

  const eyeMap = {
    happy:       `<path d="M47 61 Q52 56 57 61" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M63 61 Q68 56 73 61" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    excited:     `<path d="M46 62 Q52 55 58 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M62 62 Q68 55 74 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    thinking:    `<ellipse cx="${52+eyeOffset}" cy="62" rx="5" ry="5" fill="#333"/>
                  <ellipse cx="${68+eyeOffset}" cy="62" rx="5" ry="5" fill="#333"/>
                  <ellipse cx="${54+eyeOffset}" cy="61" rx="2" ry="2" fill="white"/>
                  <ellipse cx="${70+eyeOffset}" cy="61" rx="2" ry="2" fill="white"/>`,
    worried:     `<path d="M47 58 L54 61" stroke="#555" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M66 61 L73 58" stroke="#555" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <ellipse cx="52" cy="63" rx="4.5" ry="4.5" fill="#333"/>
                  <ellipse cx="68" cy="63" rx="4.5" ry="4.5" fill="#333"/>
                  <ellipse cx="53" cy="62" rx="1.5" ry="1.5" fill="white"/>
                  <ellipse cx="69" cy="62" rx="1.5" ry="1.5" fill="white"/>`,
    surprised:   `<ellipse cx="51" cy="61" rx="7" ry="7" fill="#333"/>
                  <ellipse cx="69" cy="61" rx="7" ry="7" fill="#333"/>
                  <ellipse cx="53" cy="59" rx="2.5" ry="2.5" fill="white"/>
                  <ellipse cx="71" cy="59" rx="2.5" ry="2.5" fill="white"/>`,
    sleeping:    `<path d="M47 62 Q52 67 57 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M63 62 Q68 67 73 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    winking:     `<ellipse cx="52" cy="62" rx="5" ry="5" fill="#333"/>
                  <ellipse cx="54" cy="61" rx="2" ry="2" fill="white"/>
                  <path d="M64 62 Q68 58 72 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    proud:       `<path d="M47 62 Q52 57 57 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M63 62 Q68 57 73 62" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    heart:       `<text x="48" y="67" font-size="14" fill="#e07898">♥</text>
                  <text x="64" y="67" font-size="14" fill="#e07898">♥</text>`,
    determined:  `<path d="M46 57 L58 60" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M62 60 L74 57" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <ellipse cx="52" cy="62" rx="4.5" ry="4.5" fill="#333"/>
                  <ellipse cx="68" cy="62" rx="4.5" ry="4.5" fill="#333"/>
                  <ellipse cx="53" cy="61" rx="1.5" ry="1.5" fill="white"/>
                  <ellipse cx="69" cy="61" rx="1.5" ry="1.5" fill="white"/>`,
  };

  const mouthMap = {
    smile:  `<path d="M54 73 Q60 79 66 73" stroke="#999" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    open:   `<ellipse cx="60" cy="76" rx="5" ry="4" fill="#cc6688"/>`,
    flat:   `<path d="M55 74 Q60 74 65 74" stroke="#999" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    frown:  `<path d="M54 76 Q60 71 66 76" stroke="#999" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    smirk:  `<path d="M55 73 Q60 78 66 74" stroke="#999" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    grin:   `<path d="M53 73 Q60 81 67 73" stroke="#999" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  };

  const accessoryMap = {
    crown:   `<polygon points="60,30 54,42 60,38 66,42 72,30 69,46 51,46" fill="#f9c74f" stroke="#e8a500" stroke-width="1"/>
              <circle cx="60" cy="32" r="3" fill="#e05555"/>
              <circle cx="52" cy="40" r="2.5" fill="#4cc9f0"/>
              <circle cx="68" cy="40" r="2.5" fill="#4cc9f0"/>`,
    glasses: `<circle cx="52" cy="62" r="8" fill="none" stroke="#555" stroke-width="1.5"/>
              <circle cx="68" cy="62" r="8" fill="none" stroke="#555" stroke-width="1.5"/>
              <line x1="60" y1="62" x2="60" y2="62" stroke="#555" stroke-width="1.5"/>
              <line x1="44" y1="62" x2="37" y2="60" stroke="#555" stroke-width="1.5"/>
              <line x1="76" y1="62" x2="83" y2="60" stroke="#555" stroke-width="1.5"/>`,
    bowtie:  `<path d="M48 86 L56 82 L48 78 Z" fill="#e05555"/>
              <path d="M72 86 L64 82 L72 78 Z" fill="#e05555"/>
              <circle cx="60" cy="82" r="4" fill="#cc3333"/>`,
    none:    '',
  };

  const coinGlowEl = coinGlow
    ? `<circle cx="60" cy="118" r="18" fill="${coinColor}" opacity="0.25"/>`
    : '';

  const sleepZzz = sleeping
    ? `<text x="82" y="50" font-size="11" fill="#aaddff" opacity="0.9">z</text>
       <text x="88" y="42" font-size="13" fill="#aaddff" opacity="0.9">z</text>
       <text x="96" y="32" font-size="16" fill="#aaddff">Z</text>`
    : '';

  const earTransform = earTilt !== 0
    ? `transform="rotate(${earTilt} 38 60)"` : '';
  const ear2Transform = earTilt !== 0
    ? `transform="rotate(${-earTilt} 82 60)"` : '';

  return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <ellipse cx="38" cy="30" rx="13" ry="28" fill="${skinColor}" ${earTransform}/>
    <ellipse cx="38" cy="30" rx="7" ry="20" fill="${earColor}" opacity="0.85" ${earTransform}/>
    <ellipse cx="82" cy="30" rx="13" ry="28" fill="${skinColor}" ${ear2Transform}/>
    <ellipse cx="82" cy="30" rx="7" ry="20" fill="${earColor}" opacity="0.85" ${ear2Transform}/>
    <ellipse cx="60" cy="100" rx="38" ry="34" fill="${skinColor}"/>
    <circle cx="60" cy="65" r="30" fill="${skinColor}"/>
    <ellipse cx="43" cy="72" rx="7" ry="5" fill="${earColor}" opacity="${blush}"/>
    <ellipse cx="77" cy="72" rx="7" ry="5" fill="${earColor}" opacity="${blush}"/>
    ${eyeMap[eyes] || eyeMap.happy}
    <ellipse cx="60" cy="69" rx="4" ry="2.5" fill="${earColor}"/>
    ${mouthMap[mouth] || mouthMap.smile}
    ${coinGlowEl}
    <circle cx="60" cy="118" r="12" fill="${coinColor}" stroke="#e8a500" stroke-width="1.5"/>
    <text x="60" y="123" text-anchor="middle" fill="#c8850a" font-size="11" font-weight="bold">₱</text>
    <ellipse cx="45" cy="113" rx="9" ry="7" fill="${skinColor}"/>
    <ellipse cx="75" cy="113" rx="9" ry="7" fill="${skinColor}"/>
    ${accessoryMap[accessory] || ''}
    ${sleepZzz}
  </svg>`;
}

// ── MASCOT STATE ───────────────────────────────────────────────────────────
const M = {
  currentExpr: 'happy',
  currentMouth: 'smile',
  accessory: 'none',
  skinColor: '#f0e8f0',
  earColor: '#ffb8c8',
  coinColor: '#f9c74f',
  blinkTimer: null,
  earTimer: null,
  idleTimer: null,
  sleepTimer: null,
  reactionTimer: null,
  tipTimer: null,
  tipIndex: 0,
  tapCount: 0,
  isSleeping: false,
  isPetting: false,
  eyeOffset: 0,
  earTilt: 0,
  isBlinking: false,
  achievements: new Set(),
};

// ── RENDER MASCOT ──────────────────────────────────────────────────────────
function renderMascot(overrides = {}) {
  const wrap = document.getElementById('mascot-svg-wrap');
  if (!wrap) return;
  wrap.innerHTML = buildRabbit({
    eyes: M.currentExpr,
    mouth: M.currentMouth,
    accessory: M.accessory,
    skinColor: M.skinColor,
    earColor: M.earColor,
    coinColor: M.coinColor,
    sleeping: M.isSleeping,
    earTilt: M.earTilt,
    eyeOffset: M.eyeOffset,
    ...overrides,
  });
}

function setExpression(eyes, mouth = 'smile', animate = true) {
  if (M.isSleeping && eyes !== 'sleeping') wakeMascot();
  M.currentExpr = eyes;
  M.currentMouth = mouth;
  if (animate) {
    const wrap = document.getElementById('mascot-svg-wrap');
    if (wrap) {
      wrap.style.transform = 'scale(0.88)';
      wrap.style.opacity = '0.6';
      setTimeout(() => {
        renderMascot();
        wrap.style.transform = 'scale(1)';
        wrap.style.opacity = '1';
      }, 120);
    }
  } else {
    renderMascot();
  }
}

function setMessage(msg, animate = true) {
  const el = document.getElementById('mascot-message');
  if (!el) return;
  if (animate) {
    el.style.opacity = '0';
    setTimeout(() => { el.innerHTML = msg; el.style.opacity = '1'; }, 180);
  } else {
    el.innerHTML = msg;
  }
}

// ── IDLE ANIMATIONS ────────────────────────────────────────────────────────
function startIdleAnimations() {
  stopIdleAnimations();

  // Blink every 3–5s
  function scheduleBlink() {
    M.blinkTimer = setTimeout(() => {
      if (M.isSleeping || M.isPetting) { scheduleBlink(); return; }
      M.isBlinking = true;
      renderMascot({ eyes: 'sleeping' }); // closed = blink
      setTimeout(() => {
        M.isBlinking = false;
        renderMascot();
        scheduleBlink();
      }, 150);
    }, 3000 + Math.random() * 2000);
  }
  scheduleBlink();

  // Ear wiggle every 5–9s
  function scheduleEarWiggle() {
    M.earTimer = setTimeout(() => {
      if (M.isSleeping) { scheduleEarWiggle(); return; }
      let ticks = 0;
      const dirs = [4, -4, 3, -3, 2, 0];
      const wiggle = setInterval(() => {
        M.earTilt = dirs[ticks] || 0;
        renderMascot();
        ticks++;
        if (ticks >= dirs.length) {
          clearInterval(wiggle);
          M.earTilt = 0;
          renderMascot();
          scheduleEarWiggle();
        }
      }, 80);
    }, 5000 + Math.random() * 4000);
  }
  scheduleEarWiggle();

  // Look around every 7–12s
  function scheduleLook() {
    M.idleTimer = setTimeout(() => {
      if (M.isSleeping) { scheduleLook(); return; }
      const positions = [4, 8, 4, 0, -4, -8, -4, 0];
      let i = 0;
      const look = setInterval(() => {
        M.eyeOffset = positions[i] || 0;
        renderMascot();
        i++;
        if (i >= positions.length) {
          clearInterval(look);
          M.eyeOffset = 0;
          renderMascot();
          scheduleLook();
        }
      }, 200);
    }, 7000 + Math.random() * 5000);
  }
  scheduleLook();

  // Sleep after 60s inactivity
  scheduleSleep();
}

function scheduleSleep() {
  clearTimeout(M.sleepTimer);
  M.sleepTimer = setTimeout(() => {
    if (!M.isSleeping) sleepMascot();
  }, 60000);
}

function resetInactivity() {
  scheduleSleep();
  if (M.isSleeping) wakeMascot();
}

function sleepMascot() {
  M.isSleeping = true;
  setExpression('sleeping', 'flat');
  setMessage('Zzz... <em style="color:var(--text-muted);font-size:11px">Tap me to wake up!</em>');
  // Floating Zzz animation via CSS class on wrap
  const wrap = document.getElementById('mascot-svg-wrap');
  if (wrap) wrap.classList.add('mascot-sleeping');
}

function wakeMascot() {
  M.isSleeping = false;
  const wrap = document.getElementById('mascot-svg-wrap');
  if (wrap) wrap.classList.remove('mascot-sleeping');
  setExpression('surprised', 'open');
  setMessage('Oh! I dozed off 😅 What did I miss?');
  setTimeout(() => updateMascotForContext(), 2500);
}

function stopIdleAnimations() {
  clearTimeout(M.blinkTimer);
  clearTimeout(M.earTimer);
  clearTimeout(M.idleTimer);
  clearTimeout(M.sleepTimer);
}

// ── REACTION SYSTEM ────────────────────────────────────────────────────────
const REACTIONS = {
  income:         { eyes:'excited',   mouth:'grin',   msg:'Yay! Money in! 💚 Every peso gets you closer to your goals!' },
  expense:        { eyes:'thinking',  mouth:'flat',   msg:'Got it! Stay mindful of your spending, Nasha 💭' },
  expenseBig:     { eyes:'worried',   mouth:'frown',  msg:"That's a big one! Make sure it fits your budget ⚠️" },
  budgetWarn:     { eyes:'worried',   mouth:'frown',  msg:"Heads up! Getting close to your budget limit. Careful! 😟" },
  budgetExceeded: { eyes:'surprised', mouth:'open',   msg:"Oops! Budget exceeded! Time to pause spending here 😮" },
  transfer:       { eyes:'winking',   mouth:'smirk',  msg:"Transfer done! Smart money moves, Nasha 😉" },
  goalReached:    { eyes:'heart',     mouth:'grin',   msg:"🎉 GOAL REACHED! You did it! I'm SO proud of you! 💕" },
  streak3:        { eyes:'proud',     mouth:'grin',   msg:"3-day no-spend streak! You're on a roll! 🔥" },
  streak7:        { eyes:'excited',   mouth:'grin',   msg:"7 days! INCREDIBLE! Dance time! 🕺✨" },
  streak30:       { eyes:'heart',     mouth:'grin',   msg:"30-DAY STREAK! You are UNSTOPPABLE, Nasha! 👑" },
  streak100:      { eyes:'heart',     mouth:'grin',   msg:"100 DAYS! Legendary! You've unlocked GOLDEN NASHA! 🌟" },
  firstSave:      { eyes:'excited',   mouth:'grin',   msg:"First income logged! Your journey starts NOW! ✨" },
  saved1000:      { eyes:'proud',     mouth:'grin',   msg:"₱1,000 saved! That's how it's done! 🎯" },
  saved10000:     { eyes:'heart',     mouth:'grin',   msg:"₱10,000 SAVED! You're a savings superstar! 🏆" },
  budgetMaster:   { eyes:'proud',     mouth:'smirk',  msg:"Under budget this month! Budget Master unlocked! 😎" },
  petting:        { eyes:'sleeping',  mouth:'smile',  msg:'Purrrr... 😊 *happy rabbit noises*' },
};

function showReaction(key, extraFX = null) {
  const r = REACTIONS[key];
  if (!r) return;
  clearTimeout(M.reactionTimer);
  setExpression(r.eyes, r.mouth);
  setMessage(r.msg);
  if (extraFX) extraFX();
  M.reactionTimer = setTimeout(() => updateMascotForContext(), 4500);
}

// ── PARTICLE EFFECTS ───────────────────────────────────────────────────────
function spawnParticles(type = 'sparkle') {
  const container = document.getElementById('mascot-particles');
  if (!container) return;
  container.innerHTML = '';

  if (type === 'confetti') {
    const colors = ['#f9c74f','#e07898','#4cc9f0','#7fff7f','#ff6b6b','#c77dff'];
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.className = 'particle confetti-p';
      el.style.cssText = `
        position:absolute;
        width:${5 + Math.random()*5}px;
        height:${5 + Math.random()*5}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        border-radius:${Math.random()>0.5?'50%':'2px'};
        left:${10 + Math.random()*80}%;
        top:0;
        animation: confettiFall ${0.8+Math.random()*1.2}s ease-in forwards;
        animation-delay:${Math.random()*0.4}s;
        transform: rotate(${Math.random()*360}deg);
      `;
      container.appendChild(el);
    }
  } else if (type === 'coins') {
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.className = 'particle coin-p';
      el.style.cssText = `
        position:absolute;
        width:16px;height:16px;
        background:#f9c74f;
        border:2px solid #e8a500;
        border-radius:50%;
        font-size:10px;line-height:12px;text-align:center;color:#c8850a;font-weight:bold;
        left:${5 + Math.random()*90}%;
        top:-10px;
        animation: coinFall ${0.6+Math.random()*1}s ease-in forwards;
        animation-delay:${Math.random()*0.6}s;
      `;
      el.textContent = '₱';
      container.appendChild(el);
    }
  } else if (type === 'sparkle') {
    const sparkles = ['✦','✧','⊹','✨','⋆'];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div');
      el.className = 'particle sparkle-p';
      el.style.cssText = `
        position:absolute;
        font-size:${10+Math.random()*10}px;
        color:#f9c74f;
        left:${Math.random()*100}%;
        top:${Math.random()*80}%;
        animation: sparklePop ${0.4+Math.random()*0.6}s ease-out forwards;
        animation-delay:${Math.random()*0.3}s;
      `;
      el.textContent = sparkles[Math.floor(Math.random()*sparkles.length)];
      container.appendChild(el);
    }
  } else if (type === 'hearts') {
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute;
        font-size:${12+Math.random()*10}px;
        left:${Math.random()*100}%;
        top:${20+Math.random()*60}%;
        animation: floatUp ${0.8+Math.random()*0.8}s ease-out forwards;
        animation-delay:${Math.random()*0.4}s;
      `;
      el.textContent = '♥';
      el.style.color = '#e07898';
      container.appendChild(el);
    }
  }

  setTimeout(() => { container.innerHTML = ''; }, 2500);
}

// ── HOP / DANCE ANIMATIONS ─────────────────────────────────────────────────
function mascotHop(times = 2) {
  const wrap = document.getElementById('mascot-svg-wrap');
  if (!wrap) return;
  wrap.classList.remove('mascot-hop','mascot-dance','mascot-bounce');
  void wrap.offsetWidth;
  wrap.classList.add('mascot-hop');
  setTimeout(() => wrap.classList.remove('mascot-hop'), times * 500);
}

function mascotDance() {
  const wrap = document.getElementById('mascot-svg-wrap');
  if (!wrap) return;
  wrap.classList.remove('mascot-hop','mascot-dance','mascot-bounce');
  void wrap.offsetWidth;
  wrap.classList.add('mascot-dance');
  setTimeout(() => wrap.classList.remove('mascot-dance'), 1600);
}

function mascotBounce() {
  const wrap = document.getElementById('mascot-svg-wrap');
  if (!wrap) return;
  wrap.classList.remove('mascot-hop','mascot-dance','mascot-bounce');
  void wrap.offsetWidth;
  wrap.classList.add('mascot-bounce');
  setTimeout(() => wrap.classList.remove('mascot-bounce'), 500);
}

// ── CONTEXT-AWARE STATE ────────────────────────────────────────────────────
function updateMascotForContext() {
  const streak = calcStreak();
  // Unlock accessories for streaks
  if (streak >= 100) {
    M.accessory = 'crown';
    M.skinColor = '#fff9c4';  // golden skin
    M.coinColor = '#ffd700';
  } else if (streak >= 30) {
    M.accessory = 'crown';
  } else if (streak >= 7) {
    M.accessory = 'bowtie';
  } else {
    M.accessory = 'none';
    M.skinColor = '#f0e8f0';
    M.coinColor = '#f9c74f';
  }

  let eyes, mouth, msg;
  if (streak === 0) {
    eyes = 'thinking'; mouth = 'flat';
    msg = `Start your no-spend streak today, <strong>Nasha</strong>! Every day counts 💭`;
  } else if (streak >= 100) {
    eyes = 'heart'; mouth = 'grin';
    msg = `<strong>💫 ${streak}-day streak!</strong> You've achieved LEGENDARY status, Nasha!`;
  } else if (streak >= 30) {
    eyes = 'heart'; mouth = 'grin';
    msg = `<strong>👑 ${streak} days!</strong> You're absolutely unstoppable, Nasha!`;
  } else if (streak >= 7) {
    eyes = 'excited'; mouth = 'grin';
    msg = `<strong>🎉 ${streak}-day streak!</strong> You're on FIRE, Nasha! Keep dancing! 🕺`;
  } else if (streak >= 3) {
    eyes = 'proud'; mouth = 'smile';
    msg = `<strong>🔥 ${streak} days</strong> no-spend! You're on a roll!`;
  } else {
    eyes = 'happy'; mouth = 'smile';
    msg = `<strong>${streak}-day</strong> no-spend streak! Keep it going! 🐰`;
  }

  setExpression(eyes, mouth);
  setMessage(msg);
  document.getElementById('streak-label').textContent = `${streak}-day no-spend streak`;
  renderMascot();
}

// ── ACHIEVEMENT CHECKS ─────────────────────────────────────────────────────
function checkAchievements(type, amount) {
  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  if (type === 'income') {
    if (!M.achievements.has('firstSave') && state.transactions.filter(t=>t.type==='income').length === 1) {
      M.achievements.add('firstSave');
      setTimeout(() => {
        showReaction('firstSave');
        spawnParticles('sparkle');
        mascotHop(3);
      }, 300);
      return;
    }
    if (!M.achievements.has('saved1000') && totalIncome >= 1000) {
      M.achievements.add('saved1000');
      setTimeout(() => {
        showReaction('saved1000');
        spawnParticles('coins');
        mascotBounce();
      }, 300);
      return;
    }
    if (!M.achievements.has('saved10000') && totalIncome >= 10000) {
      M.achievements.add('saved10000');
      setTimeout(() => {
        showReaction('saved10000');
        spawnParticles('confetti');
        mascotDance();
      }, 300);
      return;
    }
  }

  // streak milestone checks
  const streak = calcStreak();
  if (streak === 3 && !M.achievements.has('streak3')) {
    M.achievements.add('streak3');
    showReaction('streak3');
    spawnParticles('sparkle');
    mascotHop(3);
  } else if (streak === 7 && !M.achievements.has('streak7')) {
    M.achievements.add('streak7');
    showReaction('streak7');
    spawnParticles('confetti');
    mascotDance();
  } else if (streak === 30 && !M.achievements.has('streak30')) {
    M.achievements.add('streak30');
    showReaction('streak30');
    spawnParticles('confetti');
    mascotDance();
  } else if (streak === 100 && !M.achievements.has('streak100')) {
    M.achievements.add('streak100');
    showReaction('streak100');
    spawnParticles('coins');
    mascotDance();
  }
}

// ── PUBLIC API (called by existing code) ──────────────────────────────────
function showMascotReaction(key) {
  resetInactivity();
  const fxMap = {
    income:         () => { checkAchievements('income'); spawnParticles('sparkle'); mascotHop(); },
    expense:        () => {},
    expenseBig:     () => { spawnParticles('sparkle'); },
    budgetWarn:     () => {},
    budgetExceeded: () => { spawnParticles('sparkle'); },
    transfer:       () => { spawnParticles('sparkle'); mascotBounce(); },
    goalReached:    () => { spawnParticles('confetti'); mascotDance(); },
  };
  showReaction(key, fxMap[key] || null);
}

// ── TAP INTERACTION ────────────────────────────────────────────────────────
const TAP_MSGS = [
  { eyes:'happy',      mouth:'smile', msg:"Hi <strong>Nasha</strong>! I'm here to cheer you on! 🐰" },
  { eyes:'winking',    mouth:'smirk', msg:"Psst! Every peso logged = a peso <strong>understood</strong>! 😉" },
  { eyes:'excited',    mouth:'grin',  msg:"You're doing <strong>amazing</strong>, Nasha! Keep it up! ✨" },
  { eyes:'proud',      mouth:'smile', msg:"I believe in you! You <strong>got this</strong>! 🌟" },
  { eyes:'heart',      mouth:'grin',  msg:"Big hugs, <strong>Nasha</strong>! Your future self thanks you! 💕" },
  { eyes:'determined', mouth:'flat',  msg:"Financial freedom is a <strong>journey</strong>. One peso at a time! 💪" },
  { eyes:'thinking',   mouth:'flat',  msg:"Thinking... Maybe check your <strong>budget</strong> today? 🤔" },
];

function handleMascotTap() {
  resetInactivity();
  if (M.isSleeping) { wakeMascot(); return; }

  const wrap = document.getElementById('mascot-svg-wrap');
  if (wrap) { mascotBounce(); }

  // Petting mode: 3 taps in a row within 2s
  M.tapCount++;
  if (M.tapCount >= 3) {
    M.tapCount = 0;
    M.isPetting = true;
    setExpression('sleeping', 'smile');
    setMessage(REACTIONS.petting.msg);
    spawnParticles('hearts');
    clearTimeout(M.reactionTimer);
    M.reactionTimer = setTimeout(() => {
      M.isPetting = false;
      updateMascotForContext();
    }, 3000);
    return;
  }
  clearTimeout(M._tapReset);
  M._tapReset = setTimeout(() => { M.tapCount = 0; }, 2000);

  const tip = TAP_MSGS[M.tapCount % TAP_MSGS.length];
  clearTimeout(M.reactionTimer);
  setExpression(tip.eyes, tip.mouth);
  setMessage(tip.msg);
  M.reactionTimer = setTimeout(() => updateMascotForContext(), 4000);
}

// Ear tap
function handleEarTap() {
  resetInactivity();
  const dirs = [6, -6, 5, -5, 4, 0];
  let i = 0;
  const wiggle = setInterval(() => {
    M.earTilt = dirs[i] || 0;
    renderMascot();
    i++;
    if (i >= dirs.length) {
      clearInterval(wiggle);
      M.earTilt = 0;
      renderMascot();
    }
  }, 70);
  setMessage('*ear wiggle* 👂');
  setTimeout(() => setMessage(document.getElementById('mascot-message').innerHTML), 1500);
}

// Coin tap
function handleCoinTap() {
  resetInactivity();
  spawnParticles('coins');
  mascotBounce();
  const savings = state.transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  setMessage(`Total saved: <strong style="color:var(--green-bright)">${fmt(savings)}</strong> 💰`);
  clearTimeout(M.reactionTimer);
  M.reactionTimer = setTimeout(() => updateMascotForContext(), 3000);
}

// ── CYCLING TIPS ───────────────────────────────────────────────────────────
const TIPS = [
  { eyes:'happy',      mouth:'smile', msg:"Great to see you, <strong>Nasha</strong>! Log every peso — awareness is the first step 🐰" },
  { eyes:'excited',    mouth:'grin',  msg:"Every peso tracked is a peso <strong>understood</strong>. You're doing amazing! ✨" },
  { eyes:'winking',    mouth:'smirk', msg:"Did you know? Small daily savings add up to <strong>big goals</strong>. Keep it up! 😉" },
  { eyes:'thinking',   mouth:'flat',  msg:"Hmm... Have you set your <strong>budget limits</strong> for this month yet? 💭" },
  { eyes:'proud',      mouth:'smile', msg:"Your savings rate is <strong>improving</strong>. I'm so proud of you, Nasha! 🌟" },
  { eyes:'determined', mouth:'flat',  msg:"No-spend days are <strong>wins</strong>! Every streak counts. Stay strong! 💪" },
  { eyes:'heart',      mouth:'grin',  msg:"Budget discipline: <strong>level up!</strong> Keep logging everything, Nasha! 🎉" },
  { eyes:'winking',    mouth:'smirk', msg:"Future you will <strong>thank you</strong> for every peso saved today! 😉" },
  { eyes:'excited',    mouth:'grin',  msg:"One step closer to your <strong>goal</strong>! You've got this! ⭐" },
  { eyes:'proud',      mouth:'smile', msg:"Savings are <strong>growing</strong>! I can feel the momentum! 📈" },
];

function cycleTip() {
  if (M.isSleeping || M.isPetting) return;
  // Don't override active reaction
  const tip = TIPS[M.tipIndex % TIPS.length];
  M.tipIndex++;
  setExpression(tip.eyes, tip.mouth);
  setMessage(tip.msg);
}

// ── INIT MASCOT ────────────────────────────────────────────────────────────
function initMascot() {
  renderMascot();
  updateMascotForContext();
  startIdleAnimations();

  // Cycle tips every 8s
  M.tipTimer = setInterval(() => {
    if (document.getElementById('page-home').classList.contains('active') && !M.isSleeping) {
      cycleTip();
    }
  }, 8000);

  // Reset inactivity on any interaction
  document.addEventListener('touchstart', resetInactivity, { passive: true });
  document.addEventListener('click', resetInactivity, { passive: true });
}

// ── INIT ───────────────────────────────────────────────────────────────────
loadState();
renderHome();
initMascot();
