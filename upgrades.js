// ══════════════════════════════════════════════════════════════
//  NASH UI/UX UPGRADES — upgrades.js
//  Loads AFTER app.js; patches and extends without modifying
//  the original source.
// ══════════════════════════════════════════════════════════════

// ── 1. HAPTIC FEEDBACK ───────────────────────────────────────
function haptic(style = 'light') {
  if (!navigator.vibrate) return;
  const p = { light: 10, medium: 25, heavy: 50, success: [10, 50, 10], error: [30, 20, 30] };
  navigator.vibrate(p[style] || 10);
}
document.addEventListener('click', (e) => {
  if (e.target.closest('button, .nav-btn, .cat-chip, .bank-tile, .tx-item, .account-card, .qf-btn')) haptic('light');
}, { passive: true });

// ── 2. PAGE TRANSITIONS ──────────────────────────────────────
const _origGoTo = goTo;
window.goTo = function(page) {
  const cur = document.querySelector('.page.active');
  const nxt = document.getElementById('page-' + page);
  if (!nxt || cur === nxt) return;
  haptic('light');
  cur.style.cssText += 'transition:opacity .15s ease,transform .15s ease;opacity:0;transform:translateY(6px)';
  setTimeout(() => {
    _origGoTo(page);
    ['transition','opacity','transform'].forEach(p => cur.style.removeProperty(p));
    nxt.style.cssText += 'opacity:0;transform:translateY(6px)';
    requestAnimationFrame(() => {
      nxt.style.cssText += 'transition:opacity .2s ease,transform .2s ease;opacity:1;transform:translateY(0)';
      setTimeout(() => ['transition','opacity','transform'].forEach(p => nxt.style.removeProperty(p)), 220);
    });
  }, 120);
};

// ── 3. FORM VALIDATION ───────────────────────────────────────
function setupFormValidation() {
  const amt = document.getElementById('tx-amount');
  if (amt && !amt._validated) {
    amt._validated = true;
    amt.addEventListener('input', () => {
      const v = parseFloat(amt.value);
      const err = document.getElementById('amount-error');
      if (amt.value && (isNaN(v) || v <= 0)) {
        amt.style.color = 'var(--red)';
        if (!err) {
          const e = document.createElement('div');
          e.id = 'amount-error';
          e.style.cssText = 'color:var(--red);font-size:11px;text-align:center;margin-top:-10px;margin-bottom:8px';
          e.textContent = 'Enter a valid amount greater than 0';
          amt.closest('.amount-input-wrap').after(e);
        }
      } else {
        amt.style.color = '';
        if (err) err.remove();
      }
    });
  }
  const note = document.getElementById('tx-note');
  if (note && !note._validated) {
    note._validated = true;
    note.setAttribute('maxlength', '80');
    note.addEventListener('input', () => {
      let ctr = document.getElementById('note-counter');
      if (!ctr) {
        ctr = Object.assign(document.createElement('div'), { id: 'note-counter' });
        ctr.style.cssText = 'font-size:10px;color:var(--text-muted);text-align:right;margin-top:3px';
        note.parentElement.appendChild(ctr);
      }
      const rem = 80 - note.value.length;
      ctr.textContent = `${rem} chars left`;
      ctr.style.color = rem < 15 ? 'var(--yellow)' : 'var(--text-muted)';
    });
  }
}

// ── 4. QUICK FILTERS STATE ───────────────────────────────────
let activeFilter = 'month';
window.setFilter = function(key) {
  haptic('light');
  activeFilter = key;
  document.querySelectorAll('.qf-btn').forEach(b => b.classList.remove('active'));
  const target = document.querySelector(`.qf-btn[data-f="${key}"]`);
  if (target) target.classList.add('active');
  updateFilteredSections();
};

function getFilteredTxs() {
  const now = new Date();
  return state.transactions.filter(tx => {
    const d = new Date(tx.date);
    if (activeFilter === 'week') { const w = new Date(now); w.setDate(now.getDate()-7); return d >= w; }
    if (activeFilter === 'month') return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();
    if (activeFilter === 'year') return d.getFullYear()===now.getFullYear();
    return true;
  });
}

// ── 5. QUICK STATS ───────────────────────────────────────────
function renderQuickStats() {
  const el = document.getElementById('quick-stats-grid');
  if (!el) return;
  const txs = getFilteredTxs();
  const expenses = txs.filter(t => t.type === 'expense');
  const incomes  = txs.filter(t => t.type === 'income');
  const totalExp = expenses.reduce((s,t)=>s+t.amount,0);
  const totalInc = incomes.reduce((s,t)=>s+t.amount,0);
  const daySet = new Set(expenses.map(t=>new Date(t.date).toDateString()));
  const avgDaily = daySet.size ? totalExp/daySet.size : 0;
  const largest = expenses.reduce((m,t)=>t.amount>m.amount?t:m, {amount:0,category:'—',categoryIcon:''});
  const now = new Date(); const mon = now.getMonth(), yr = now.getFullYear();
  let health = 100;
  state.budgets.forEach(b => {
    const sp = state.transactions.filter(tx=>{
      const d=new Date(tx.date);
      return tx.type==='expense'&&tx.category===b.category&&d.getMonth()===mon&&d.getFullYear()===yr;
    }).reduce((s,t)=>s+t.amount,0);
    const pct = b.limit>0?sp/b.limit:0;
    if(pct>=1) health-=25; else if(pct>=0.8) health-=10;
  });
  health = Math.max(0,Math.min(100,health));
  const hc = health>=80?'var(--green-bright)':health>=50?'var(--yellow)':'var(--red)';
  const hl = health>=80?'🟢 Healthy':health>=50?'🟡 Fair':'🔴 Over Budget';
  const net = totalInc-totalExp;

  el.innerHTML = `
    <div class="qs-card"><div class="qs-icon">📊</div><div class="qs-label">Avg Daily Spend</div><div class="qs-val">${fmt(avgDaily)}</div></div>
    <div class="qs-card"><div class="qs-icon">${largest.categoryIcon||'💸'}</div><div class="qs-label">Largest Expense</div><div class="qs-val" style="font-size:14px">${largest.amount>0?fmt(largest.amount):'—'}</div><div class="qs-sub">${largest.category||''}</div></div>
    <div class="qs-card"><div class="qs-icon">🛡️</div><div class="qs-label">Budget Health</div><div class="qs-val" style="color:${hc};font-size:13px">${hl}</div></div>
    <div class="qs-card"><div class="qs-icon">💼</div><div class="qs-label">Net Flow</div><div class="qs-val" style="color:${net>=0?'var(--green-bright)':'var(--red)'}">${net>=0?'+':''}${fmt(net)}</div></div>
  `;
}

// ── 6. DONUT CHART ───────────────────────────────────────────
function renderDonutChart() {
  const el = document.getElementById('donut-chart-wrap');
  if (!el) return;
  const expenses = getFilteredTxs().filter(t=>t.type==='expense');
  const catMap = {};
  expenses.forEach(tx=>{
    const k=tx.category||'Other';
    if(!catMap[k]) catMap[k]={amount:0,icon:tx.categoryIcon||'💳'};
    catMap[k].amount+=tx.amount;
  });
  const total = Object.values(catMap).reduce((s,v)=>s+v.amount,0);
  if(!total){ el.innerHTML='<div class="donut-empty">No expenses yet for this period</div>'; return; }
  const palette=['#e07898','#f9c74f','#4cc9f0','#c77dff','#ff6b6b','#98fb98','#ffb347','#87ceeb','#dda0dd','#7fff7f'];
  const sorted=Object.entries(catMap).sort((a,b)=>b[1].amount-a[1].amount);
  sorted.forEach(([,v],i)=>{v.color=palette[i%palette.length];});
  const cx=60,cy=60,R=48,r=28;
  let ang=-Math.PI/2;
  const paths=sorted.map(([cat,v])=>{
    const pct=v.amount/total,sw=pct*Math.PI*2;
    const x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang);
    const x2=cx+R*Math.cos(ang+sw),y2=cy+R*Math.sin(ang+sw);
    const ix1=cx+r*Math.cos(ang),iy1=cy+r*Math.sin(ang);
    const ix2=cx+r*Math.cos(ang+sw),iy2=cy+r*Math.sin(ang+sw);
    const lg=sw>Math.PI?1:0;
    const d=`M${x1} ${y1}A${R} ${R} 0 ${lg} 1 ${x2} ${y2}L${ix2} ${iy2}A${r} ${r} 0 ${lg} 0 ${ix1} ${iy1}Z`;
    ang+=sw;
    return `<path d="${d}" fill="${v.color}" stroke="var(--surface)" stroke-width="2" opacity="0.9"><title>${v.icon} ${cat}: ${fmt(v.amount)} (${Math.round(pct*100)}%)</title></path>`;
  }).join('');
  const lhtml=sorted.slice(0,7).map(([cat,v])=>`
    <div class="donut-legend-item">
      <div class="donut-legend-dot" style="background:${v.color}"></div>
      <div class="donut-legend-label">${v.icon} ${cat}</div>
      <div class="donut-legend-pct">${Math.round(v.amount/total*100)}%</div>
    </div>`).join('');
  el.innerHTML=`<div class="donut-inner">
    <div class="donut-svg-wrap"><svg viewBox="0 0 120 120" width="120" height="120">
      ${paths}
      <circle cx="${cx}" cy="${cy}" r="${r-2}" fill="var(--surface)"/>
      <text x="${cx}" y="${cy-4}" text-anchor="middle" fill="var(--text-dim)" font-size="8" font-family="Sora,sans-serif">Total</text>
      <text x="${cx}" y="${cy+8}" text-anchor="middle" fill="var(--green-bright)" font-size="7" font-family="DM Mono,monospace" font-weight="700">${fmt(total)}</text>
    </svg></div>
    <div class="donut-legend">${lhtml}</div>
  </div>`;
}

// ── 7. SPENDING HEATMAP ──────────────────────────────────────
function renderHeatmap() {
  const el=document.getElementById('heatmap-wrap');
  if(!el) return;
  const now=new Date(), days=35;
  const cells=[];
  for(let i=days-1;i>=0;i--){
    const d=new Date(now); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
    const tot=state.transactions.filter(tx=>tx.type==='expense'&&new Date(tx.date).toDateString()===d.toDateString()).reduce((s,t)=>s+t.amount,0);
    cells.push({date:new Date(d),total:tot});
  }
  const maxV=Math.max(...cells.map(c=>c.total),1);
  el.innerHTML=`
    <div class="heatmap-grid">${cells.map(c=>{
      const alpha=c.total===0?0.07:0.15+c.total/maxV*0.8;
      const bg=c.total===0?'rgba(212,103,138,0.07)':`rgba(224,120,152,${alpha.toFixed(2)})`;
      const isToday=c.date.toDateString()===now.toDateString();
      const lbl=c.date.toLocaleDateString('en-PH',{month:'short',day:'numeric'})+': '+fmt(c.total);
      return `<div class="heatmap-cell${isToday?' today':''}" style="background:${bg}" title="${lbl}" onclick="showToast('${lbl}')"></div>`;
    }).join('')}</div>
    <div class="heatmap-legend">
      <span style="font-size:10px;color:var(--text-muted)">Less</span>
      ${[0.1,0.3,0.55,0.8,1].map(v=>`<div style="width:12px;height:12px;border-radius:3px;background:rgba(224,120,152,${(0.12+v*0.78).toFixed(2)})"></div>`).join('')}
      <span style="font-size:10px;color:var(--text-muted)">More</span>
    </div>`;
}

// ── 8. BETTER EMPTY STATES ───────────────────────────────────
function emptyStateHTML(icon,title,sub,ctaText,ctaFn){
  return `<div class="empty-state-wrap">
    <div class="empty-state-icon">${icon}</div>
    <div class="empty-state-title">${title}</div>
    <div class="empty-state-sub">${sub}</div>
    ${ctaText?`<button class="empty-state-cta" onclick="${ctaFn}">${ctaText}</button>`:''}
  </div>`;
}

// ── 9. INJECT HOME SECTIONS ──────────────────────────────────
function injectHomeSections() {
  const scrollArea = document.querySelector('#page-home .scroll-area');
  if (!scrollArea || scrollArea._upgraded) return;
  scrollArea._upgraded = true;

  // Filters — insert BEFORE .section-title "This Month"
  const thisMon = scrollArea.querySelector('.section-title');
  if (thisMon) {
    const fDiv = document.createElement('div');
    fDiv.innerHTML = `<div class="quick-filters">
      <button class="qf-btn" data-f="week" onclick="setFilter('week')">This Week</button>
      <button class="qf-btn active" data-f="month" onclick="setFilter('month')">This Month</button>
      <button class="qf-btn" data-f="year" onclick="setFilter('year')">This Year</button>
      <button class="qf-btn" data-f="all" onclick="setFilter('all')">All Time</button>
    </div>`;
    scrollArea.insertBefore(fDiv.firstElementChild, thisMon);
  }

  // Quick Stats — after summary-grid
  const summaryGrid = scrollArea.querySelector('.summary-grid');
  if (summaryGrid) {
    const sd = document.createElement('div');
    sd.innerHTML = `
      <div class="section-title" style="margin-top:20px">Quick Stats</div>
      <div class="quick-stats-grid" id="quick-stats-grid"></div>`;
    summaryGrid.after(sd);
  }

  // Donut chart — before empty-cta / recent-txs
  const emptyCta = scrollArea.querySelector('#empty-cta');
  if (emptyCta) {
    const dd = document.createElement('div');
    dd.innerHTML = `
      <div class="section-title">Spending Breakdown</div>
      <div class="card" style="padding:16px"><div id="donut-chart-wrap"></div></div>`;
    emptyCta.before(dd);
  }

  // Heatmap — after donut
  const donutCard = document.getElementById('donut-chart-wrap');
  if (donutCard) {
    const hd = document.createElement('div');
    hd.innerHTML = `
      <div class="section-title">Spending Calendar</div>
      <div class="card" style="padding:14px 12px"><div id="heatmap-wrap"></div></div>`;
    donutCard.closest('.card').after(hd);
  }
}

function updateFilteredSections() {
  renderQuickStats();
  renderDonutChart();
  renderHeatmap();
}

// ── 10. PATCH renderHome ─────────────────────────────────────
const _origRenderHome = renderHome;
window.renderHome = function() {
  _origRenderHome();
  injectHomeSections();
  updateFilteredSections();

  // Better empty state for CTA
  const cta = document.getElementById('empty-cta');
  if (cta && cta.style.display !== 'none') {
    cta.outerHTML = emptyStateHTML('🌱','Start your journey',
      'Log your first transaction to unlock insights, spending charts, and no-spend streaks.',
      '+ Add Transaction','openAddSheet()');
  }
};

// ── 11. PATCH renderHistory — better empty state ──────────────
const _origRenderHistory = renderHistory;
window.renderHistory = function(filter) {
  _origRenderHistory(filter);
  const empty = document.getElementById('empty-history');
  if (empty && empty.style.display !== 'none') {
    empty.innerHTML = emptyStateHTML('📭',
      filter ? 'No results found' : 'Nothing here yet',
      filter ? 'Try a different search term.' : 'Start logging income and expenses to build your transaction history.',
      filter ? '' : '+ Add Transaction',
      'openAddSheet()');
  }
};

// ── 12. PATCH openAddSheet — haptics + validation ─────────────
const _origOpen = openAddSheet;
window.openAddSheet = function() {
  haptic('medium');
  _origOpen();
  setTimeout(setupFormValidation, 80);
};

const _origSubmit = submitTransaction;
window.submitTransaction = function() {
  haptic('success');
  _origSubmit();
};

// ── 13. ACTIONABLE MASCOT INSIGHTS ───────────────────────────
const ACTIONABLE = [
  () => {
    const exp = getFilteredTxs().filter(t=>t.type==='expense');
    const tot = exp.reduce((s,t)=>s+t.amount,0);
    const days = new Set(exp.map(t=>new Date(t.date).toDateString())).size||1;
    if(tot>0) return {eyes:'thinking',mouth:'flat',msg:`💡 Avg daily spend: <strong>${fmt(tot/days)}</strong>. On track?`};
  },
  () => {
    const now=new Date(),mon=now.getMonth(),yr=now.getFullYear();
    const top = state.budgets.map(b=>{
      const sp=state.transactions.filter(tx=>{const d=new Date(tx.date);return tx.type==='expense'&&tx.category===b.category&&d.getMonth()===mon&&d.getFullYear()===yr;}).reduce((s,t)=>s+t.amount,0);
      return {b,pct:b.limit>0?sp/b.limit:0};
    }).filter(x=>x.pct>=0.7).sort((a,b)=>b.pct-a.pct)[0];
    if(top) return {eyes:'worried',mouth:'frown',msg:`⚠️ <strong>${top.b.icon} ${top.b.category}</strong> at ${Math.round(top.pct*100)}% of budget!`};
  },
  () => {
    const streak=calcStreak();
    if(streak>=3) return {eyes:'proud',mouth:'grin',msg:`🔥 <strong>${streak}-day</strong> no-spend streak! You're crushing it!`};
    if(streak===0) return {eyes:'determined',mouth:'flat',msg:`💪 Start a no-spend streak today, <strong>Nasha</strong>!`};
    return {eyes:'happy',mouth:'smile',msg:`<strong>${streak} day</strong> no-spend. Building momentum! 🚀`};
  },
  () => {
    const g=state.goals.filter(x=>x.saved<x.target)[0];
    if(g) return {eyes:'winking',mouth:'smirk',msg:`🎯 <strong>${g.icon} ${g.name}</strong>: <strong>${fmt(g.target-g.saved)}</strong> more to go!`};
  },
  () => {
    const exp=getFilteredTxs().filter(t=>t.type==='expense');
    const cats={};
    exp.forEach(t=>{cats[t.category]=(cats[t.category]||0)+t.amount;});
    const top=Object.entries(cats).sort((a,b)=>b[1]-a[1])[0];
    if(top) return {eyes:'thinking',mouth:'flat',msg:`📊 Top category: <strong>${top[0]}</strong> at ${fmt(top[1])}. Expected?`};
  },
];
let _aiIdx=0;
const _origCycleTip=cycleTip;
window.cycleTip=function(){
  if(M.isSleeping||M.isPetting) return;
  for(let i=0;i<ACTIONABLE.length;i++){
    const res=ACTIONABLE[(_aiIdx+i)%ACTIONABLE.length]();
    if(res){_aiIdx=(_aiIdx+i+1)%ACTIONABLE.length;setExpression(res.eyes,res.mouth);setMessage(res.msg);return;}
  }
  _aiIdx++;
  _origCycleTip();
};

// ── 14. RESPONSIVE DESKTOP TREATMENT ─────────────────────────
function applyResponsive(){
  const app=document.getElementById('app');
  if(window.innerWidth>=768){
    document.body.style.background='#0f070a';
    app.style.cssText+=';box-shadow:0 0 60px rgba(212,103,138,0.15);border-left:1px solid rgba(212,103,138,0.1);border-right:1px solid rgba(212,103,138,0.1)';
  }
}
window.addEventListener('resize',applyResponsive);
applyResponsive();

// ── 15. FILTER-AWARE HISTORY QUICK FILTERS ────────────────────
// Add filter chips to History page
function injectHistoryFilters() {
  const topbar = document.querySelector('.history-topbar');
  if (!topbar || topbar._filt) return;
  topbar._filt = true;
  const fc = document.createElement('div');
  fc.style.cssText='display:flex;gap:6px;padding:0 20px 8px;overflow-x:auto;scrollbar-width:none';
  fc.innerHTML=['All','Income','Expense','Transfer'].map((f,i)=>`
    <button onclick="filterHistoryType('${f.toLowerCase()}')" data-hf="${f.toLowerCase()}"
      style="flex-shrink:0;padding:5px 12px;border-radius:16px;border:1px solid rgba(212,103,138,${i?'0.18':'0.35'});background:${i?'var(--surface2)':'var(--green-dim)'};color:${i?'var(--text-dim)':'var(--green-bright)'};font-family:Sora,sans-serif;font-size:11px;font-weight:600;cursor:pointer">${f}</button>`).join('');
  topbar.after(fc);
}
window.filterHistoryType = function(type) {
  haptic('light');
  document.querySelectorAll('[data-hf]').forEach(b=>{
    const active = b.dataset.hf===type;
    b.style.background=active?'var(--green-dim)':'var(--surface2)';
    b.style.color=active?'var(--green-bright)':'var(--text-dim)';
    b.style.borderColor=active?'rgba(245,160,188,0.35)':'rgba(212,103,138,0.18)';
  });
  if(type==='all') { renderHistory(); return; }
  const q=document.getElementById('search-input').value;
  const list=document.getElementById('history-list');
  const empty=document.getElementById('empty-history');
  let txs=[...state.transactions].filter(t=>t.type===type).sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(q) txs=txs.filter(tx=>tx.note?.toLowerCase().includes(q)||tx.category?.toLowerCase().includes(q));
  if(!txs.length){list.innerHTML='';empty.style.display='block';
    empty.innerHTML=emptyStateHTML('📭','No results','No '+type+' transactions found.','','');return;}
  empty.style.display='none';
  const groups={};
  txs.forEach(tx=>{const k=new Date(tx.date).toDateString();if(!groups[k])groups[k]={date:new Date(tx.date),txs:[]};groups[k].txs.push(tx);});
  list.innerHTML=Object.values(groups).map(g=>`<div class="tx-group">
    <div class="tx-date-row"><div><div class="tx-date">${formatDayLabel(g.date)}</div></div></div>
    ${g.txs.map(tx=>txItemHTML(tx,true)).join('')}
  </div>`).join('');
};

// Inject history filters when navigating to history
const _origGoToPatched = window.goTo;
window.goTo = function(page) {
  _origGoToPatched(page);
  if(page==='history') setTimeout(injectHistoryFilters, 50);
};

// ── INIT ────────────────────────────────────────────────────
// Run after initial render
setTimeout(() => {
  injectHomeSections();
  updateFilteredSections();
  setupFormValidation();
}, 100);
