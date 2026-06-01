// ── STATE ──────────────────────────────────────────────────────────────────
const STATE_KEY = 'tarsi_state';
let state = {
  username: 'Otan',
  accounts: [
    { id: 'cash', name: 'Cash', icon: '💵', type: 'Debit', currency: 'PHP', balance: 4000 },
    { id: 'gcash', name: 'Gcash', icon: '📱', type: 'Debit', currency: 'PHP', balance: 1000 }
  ],
  transactions: [],
  currentTxType: 'income',
  selectedCategory: '',
  balancesHidden: false
};

const CATEGORIES = {
  income:   ['💼 Salary','💰 Freelance','🎁 Gift','📈 Investment','🏦 Transfer In','✨ Other'],
  expense:  ['🍔 Food','🚗 Transport','🛍️ Shopping','💊 Health','🏠 Housing','📱 Utilities','🎮 Entertainment','📚 Education','👗 Clothing','✨ Other'],
  transfer: ['➡️ Transfer']
};

const INSIGHTS = [
  "You've moved beyond spare-change energy. <strong>Still modest</strong>, but at least the wallet has some structure now.",
  "Looking <strong>healthy</strong> this week. Keep those expenses in check!",
  "Your savings rate is <strong>improving</strong>. Tarsi approves 🦔",
  "No big splurges detected. You're on a <strong>clean streak</strong>.",
  "Budget discipline: <strong>level up</strong>. Keep logging everything."
];

// ── PERSISTENCE ────────────────────────────────────────────────────────────
function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) { const s = JSON.parse(raw); state = { ...state, ...s }; }
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
}

// ── HOME ───────────────────────────────────────────────────────────────────
function renderHome() {
  const now = new Date();
  const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  document.getElementById('home-date').textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  const h = now.getHours();
  document.getElementById('home-greeting-word').textContent = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  document.getElementById('home-username').textContent = state.username;

  // streak
  const streak = calcStreak();
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('streak-label').textContent = `${streak}-day no-spend streak`;
  const msgs = [
    `No-spend streak: <strong>${streak} days</strong>. Hindi flashy, pero super powerful for the budget.`,
    `${streak} days strong! Every peso saved is a peso earned 💪`,
    `You're on a roll! <strong>${streak} days</strong> without unnecessary spending.`
  ];
  document.getElementById('mascot-message').innerHTML = msgs[streak % msgs.length];

  // monthly totals
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

  // recent
  const recent = [...state.transactions].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);
  if (recent.length > 0) {
    document.getElementById('empty-cta').style.display = 'none';
    document.getElementById('recent-txs-home').style.display = 'block';
    const list = document.getElementById('recent-list-home');
    list.innerHTML = recent.map(tx => txItemHTML(tx)).join('');
  } else {
    document.getElementById('empty-cta').style.display = 'block';
    document.getElementById('recent-txs-home').style.display = 'none';
  }
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

  // insight
  document.getElementById('insight-text').innerHTML = INSIGHTS[Math.floor(net / 1000) % INSIGHTS.length] || INSIGHTS[0];

  // bar chart (last 7 days spending)
  const days = ['T','W','T','F','S','S','M'];
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
    return ['T','W','T','F','S','S','M'][d.getDay() === 0 ? 6 : d.getDay()-1] || days[i];
  });
  document.getElementById('daily-bar-chart').innerHTML = bars.map((v,i) =>
    `<div class="bar ${i===6?'today':''}" style="height:${Math.max(8, Math.round(v/maxBar*40))}px"></div>`
  ).join('');
  document.getElementById('bar-labels').innerHTML = dayLabels.map(d =>
    `<div class="bar-lbl">${d}</div>`
  ).join('');

  // accounts
  const grid = document.getElementById('accounts-grid');
  grid.innerHTML = state.accounts.map(acc => `
    <div class="account-card">
      <div class="account-top">
        <div class="account-icon">${acc.icon}</div>
        <button class="account-more" onclick="showToast('Account options coming soon')">···</button>
      </div>
      <div class="account-name">${acc.name}</div>
      <div class="account-type">${acc.type} · ${acc.currency}</div>
      <div class="account-bal-label">BALANCE</div>
      <div class="account-bal">${state.balancesHidden ? '₱ ••••' : fmt(acc.balance)}</div>
    </div>
  `).join('') + `
    <div class="add-account-card" onclick="showToast('Add account coming soon')">
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

  // group by date
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
        ${g.txs.map(tx => txItemHTML(tx)).join('')}
      </div>
    `;
  }).join('');
}

function txItemHTML(tx) {
  const isIncome = tx.type === 'income';
  const isExpense = tx.type === 'expense';
  const sign = isIncome ? '+' : isExpense ? '-' : '⇄';
  const amtClass = isExpense ? 'expense' : '';
  const dotClass = isExpense ? 'expense' : '';
  return `
    <div class="tx-item" onclick="showToast('Transaction details coming soon')">
      <div class="tx-dot ${dotClass}"></div>
      <div class="tx-icon">${tx.categoryIcon || '💳'}</div>
      <div class="tx-info">
        <div class="tx-name">${tx.note || tx.category || 'Transaction'}</div>
        <div class="tx-meta">${tx.account} · ${new Date(tx.date).toLocaleTimeString('en-PH',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
      <div class="tx-amount ${amtClass}">${sign}${fmt(tx.amount)}</div>
    </div>
  `;
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

// ── ADD TRANSACTION ─────────────────────────────────────────────────────────
function openAddSheet() {
  setTxType('income');
  document.getElementById('tx-amount').value = '';
  document.getElementById('tx-note').value = '';
  document.getElementById('add-sheet').classList.add('open');
  setTimeout(() => document.getElementById('tx-amount').focus(), 400);
}
function closeAddSheet() { document.getElementById('add-sheet').classList.remove('open'); }

function setTxType(type) {
  state.currentTxType = type;
  state.selectedCategory = '';
  document.querySelectorAll('.sheet-tab').forEach((t,i) => {
    t.classList.remove('active','income','expense','transfer');
    if (['income','expense','transfer'][i] === type) { t.classList.add('active', type); }
  });
  document.getElementById('submit-btn').textContent = `Add ${type.charAt(0).toUpperCase()+type.slice(1)}`;
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
  sel.innerHTML = state.accounts.map(a => `<option value="${a.id}">${a.icon} ${a.name} (${fmt(a.balance)})</option>`).join('');
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

  if (state.currentTxType === 'expense' && account.balance < amount) {
    showToast('Insufficient balance!'); return;
  }

  const tx = {
    id: Date.now().toString(),
    type: state.currentTxType,
    amount,
    category: label,
    categoryIcon: icon,
    account: account.name,
    accountId,
    note,
    date: new Date().toISOString()
  };

  state.transactions.push(tx);

  // update balance
  if (state.currentTxType === 'income') account.balance += amount;
  else if (state.currentTxType === 'expense') account.balance -= amount;

  saveState();
  closeAddSheet();
  showToast(`${state.currentTxType === 'income' ? '💚' : '🔴'} ${state.currentTxType === 'income' ? '+' : '-'}${fmt(amount)} logged!`);
  renderHome();
}

// ── PLAN FEATURES ──────────────────────────────────────────────────────────
function openPlanFeature(title, desc) {
  document.getElementById('plan-sheet-title').textContent = title;
  document.getElementById('plan-sheet-desc').textContent = `${desc}\n\nThis feature is coming in a future update. Stay tuned!`;
  document.getElementById('plan-sheet').classList.add('open');
}
function closePlanSheet() { document.getElementById('plan-sheet').classList.remove('open'); }

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
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

function closeSheetIfOutside(e) {
  if (e.target.classList.contains('sheet-overlay')) {
    e.target.classList.remove('open');
  }
}

// ── PWA INSTALL ────────────────────────────────────────────────────────────
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (!localStorage.getItem('tarsi_install_dismissed')) {
    document.getElementById('install-banner').classList.add('show');
    // push page content down
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
  if (outcome === 'accepted') showToast('🎉 Tarsi installed!');
});

function dismissInstall() {
  document.getElementById('install-banner').classList.remove('show');
  document.getElementById('app').style.paddingTop = '';
  localStorage.setItem('tarsi_install_dismissed', '1');
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

// ── INIT ───────────────────────────────────────────────────────────────────
loadState();
renderHome();
