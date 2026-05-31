// Nash PWA — Web Worker
// Offloads heavy data processing (stats, forecasts, exports) from the main thread.
// Communicate via postMessage / onmessage.

// ==================== MESSAGE ROUTER ====================
self.onmessage = function (e) {
  const { type, payload, id } = e.data;

  try {
    let result;

    switch (type) {
      case 'COMPUTE_STATS':
        result = computeStats(payload);
        break;

      case 'COMPUTE_FORECAST':
        result = computeForecast(payload);
        break;

      case 'COMPUTE_CATEGORY_BREAKDOWN':
        result = computeCategoryBreakdown(payload);
        break;

      case 'COMPUTE_MONTHLY_TREND':
        result = computeMonthlyTrend(payload);
        break;

      case 'FILTER_TRANSACTIONS':
        result = filterTransactions(payload);
        break;

      case 'EXPORT_CSV':
        result = exportCSV(payload);
        break;

      case 'PING':
        result = { pong: true, ts: Date.now() };
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }

    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({ id, ok: false, error: err.message });
  }
};

// ==================== STATS ====================
/**
 * Compute overall financial stats from all transactions.
 * @param {{ transactions: Array, accounts: Array }} payload
 */
function computeStats({ transactions = [], accounts = [] }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalIncome = 0;
  let totalExpense = 0;
  let monthIncome = 0;
  let monthExpense = 0;

  for (const t of transactions) {
    const d = new Date(t.date);
    const amt = Number(t.amount) || 0;
    const isThisMonth = d.getMonth() === currentMonth && d.getFullYear() === currentYear;

    if (t.type === 'income') {
      totalIncome += amt;
      if (isThisMonth) monthIncome += amt;
    } else if (t.type === 'expense') {
      totalExpense += amt;
      if (isThisMonth) monthExpense += amt;
    }
  }

  const totalBalance = accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);

  return {
    totalIncome,
    totalExpense,
    totalBalance,
    netMonth: monthIncome - monthExpense,
    monthIncome,
    monthExpense,
    txnCount: transactions.length
  };
}

// ==================== FORECAST ====================
/**
 * Project next 3 months based on recurring transactions & averages.
 * @param {{ transactions: Array }} payload
 */
function computeForecast({ transactions = [] }) {
  const now = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
    months.push({
      label: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
      projectedIncome: 0,
      projectedExpense: 0
    });
  }

  // Average income/expense per month over past 3 months
  const pastData = {};
  for (const t of transactions) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!pastData[key]) pastData[key] = { income: 0, expense: 0 };
    if (t.type === 'income') pastData[key].income += Number(t.amount) || 0;
    if (t.type === 'expense') pastData[key].expense += Number(t.amount) || 0;
  }

  const keys = Object.keys(pastData).slice(-3);
  const avgIncome = keys.length
    ? keys.reduce((s, k) => s + pastData[k].income, 0) / keys.length
    : 0;
  const avgExpense = keys.length
    ? keys.reduce((s, k) => s + pastData[k].expense, 0) / keys.length
    : 0;

  // Add recurring transactions on top of averages
  const recurring = transactions.filter(t => t.recurring && t.recurring !== '');

  for (const month of months) {
    month.projectedIncome = Math.round(avgIncome);
    month.projectedExpense = Math.round(avgExpense);
    month.projectedNet = month.projectedIncome - month.projectedExpense;

    // Count monthly recurring items
    for (const t of recurring) {
      if (t.recurring === 'monthly') {
        if (t.type === 'income') month.projectedIncome += Number(t.amount) || 0;
        if (t.type === 'expense') month.projectedExpense += Number(t.amount) || 0;
      }
    }
  }

  return { months };
}

// ==================== CATEGORY BREAKDOWN ====================
/**
 * Compute spending by category for a given month/year.
 * @param {{ transactions: Array, month: number, year: number }} payload
 */
function computeCategoryBreakdown({ transactions = [], month, year }) {
  const now = new Date();
  const m = month !== undefined ? month : now.getMonth();
  const y = year !== undefined ? year : now.getFullYear();

  const breakdown = {};
  let total = 0;

  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const d = new Date(t.date);
    if (d.getMonth() !== m || d.getFullYear() !== y) continue;

    const cat = t.category || 'Other';
    const amt = Number(t.amount) || 0;
    breakdown[cat] = (breakdown[cat] || 0) + amt;
    total += amt;
  }

  const items = Object.entries(breakdown)
    .map(([cat, amt]) => ({ cat, amt, pct: total > 0 ? Math.round((amt / total) * 100) : 0 }))
    .sort((a, b) => b.amt - a.amt);

  return { items, total };
}

// ==================== MONTHLY TREND ====================
/**
 * Build 6-month income vs expense trend.
 * @param {{ transactions: Array }} payload
 */
function computeMonthlyTrend({ transactions = [] }) {
  const now = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString('default', { month: 'short' }),
      month: d.getMonth(),
      year: d.getFullYear(),
      income: 0,
      expense: 0
    });
  }

  for (const t of transactions) {
    const d = new Date(t.date);
    const bucket = months.find(m => m.month === d.getMonth() && m.year === d.getFullYear());
    if (!bucket) continue;
    const amt = Number(t.amount) || 0;
    if (t.type === 'income') bucket.income += amt;
    if (t.type === 'expense') bucket.expense += amt;
  }

  return { months };
}

// ==================== FILTER TRANSACTIONS ====================
/**
 * Filter and sort transactions.
 * @param {{ transactions: Array, type: string, category: string, query: string }} payload
 */
function filterTransactions({ transactions = [], type = 'all', category = 'all', query = '' }) {
  let filtered = [...transactions];

  if (type !== 'all') {
    filtered = filtered.filter(t => t.type === type);
  }

  if (category !== 'all') {
    filtered = filtered.filter(t => t.category === category);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(t =>
      (t.description || '').toLowerCase().includes(q) ||
      (t.category || '').toLowerCase().includes(q) ||
      (t.notes || '').toLowerCase().includes(q)
    );
  }

  // Sort newest first
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { filtered, count: filtered.length };
}

// ==================== EXPORT CSV ====================
/**
 * Convert transactions array to CSV string.
 * @param {{ transactions: Array, currency: string }} payload
 */
function exportCSV({ transactions = [], currency = '₱' }) {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Account', 'Notes', 'Recurring'];
  const rows = transactions.map(t => [
    t.date,
    t.type,
    t.category || '',
    `"${(t.description || '').replace(/"/g, '""')}"`,
    t.type === 'expense' ? `-${t.amount}` : t.amount,
    t.account || '',
    `"${(t.notes || '').replace(/"/g, '""')}"`,
    t.recurring || ''
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  return { csv };
}
