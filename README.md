# Nash 🐰 — Budget Tracker PWA

> Your private, cozy budget companion powered by **Koi** the rabbit 🌸

Nash is a fully offline-capable Progressive Web App (PWA) for tracking personal finances. All data is stored locally on your device — no accounts, no servers, no cloud.

---

## ✨ Features

- **Transaction tracking** — Log income, expenses, and transfers with categories and notes
- **Multiple accounts** — Cash, bank, e-wallet (GCash, Maya), credit cards, savings
- **Budget management** — Set monthly limits per category with visual progress bars
- **Savings goals** — Track your goals with circular ring progress indicators
- **Debt tracker** — Track what you owe and what others owe you
- **Stats & charts** — Donut charts, bar trends, cashflow forecast, and more
- **Recurring transactions** — Daily, weekly, bi-weekly, monthly, yearly support
- **Export & import** — Backup and restore your data as JSON; export to CSV
- **Offline-first** — Works fully without internet after first load
- **Installable** — Add to home screen on iOS and Android like a native app
- **100% private** — Everything stays in your browser's `localStorage`

---

## 📁 File Structure

```
nash-pwa/
├── index.html      # Main app (single-file HTML, CSS, JS)
├── manifest.json   # PWA manifest (icons, theme, display mode)
├── sw.js           # Service worker (offline caching, push notifications)
├── worker.js       # Web Worker (heavy computation off main thread)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 🚀 Deploying on GitHub Pages

1. **Fork or clone this repo**

2. **Add your icons** — Place your `icon-192.png` and `icon-512.png` files in the `icons/` folder. These should be square PNG images of the Nash rabbit logo.

3. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under *Source*, select **Deploy from a branch**
   - Choose `main` (or `master`) and `/ (root)`
   - Click **Save**

4. **Visit your app** — After a minute, your app will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

5. **Install as PWA** — On mobile, open the URL in Chrome (Android) or Safari (iOS) and tap *Add to Home Screen*.

> **Note:** GitHub Pages serves over HTTPS, which is required for service workers and PWA install prompts to work.

---

## 🔧 Wiring up `worker.js`

The `worker.js` file is a Web Worker for offloading computationally heavy work from the UI thread. To use it in `index.html`, add this snippet anywhere in your `<script>` section:

```js
// Initialize the Web Worker
let nashWorker = null;
if (window.Worker) {
  nashWorker = new Worker('./worker.js');
  nashWorker.onmessage = function(e) {
    const { id, ok, result, error } = e.data;
    // Handle results from worker (stats, CSV export, filters, etc.)
    console.log('[Worker response]', id, ok ? result : error);
  };
}

// Example: offload stats computation
function computeStatsAsync() {
  if (!nashWorker) return;
  nashWorker.postMessage({
    id: 'stats-' + Date.now(),
    type: 'COMPUTE_STATS',
    payload: { transactions: data.transactions, accounts: data.accounts }
  });
}
```

Available worker message types:

| Type | Payload | Returns |
|------|---------|---------|
| `COMPUTE_STATS` | `{ transactions, accounts }` | totals, balances, counts |
| `COMPUTE_FORECAST` | `{ transactions }` | 3-month projected cashflow |
| `COMPUTE_CATEGORY_BREAKDOWN` | `{ transactions, month, year }` | spending by category |
| `COMPUTE_MONTHLY_TREND` | `{ transactions }` | 6-month income/expense trend |
| `FILTER_TRANSACTIONS` | `{ transactions, type, category, query }` | filtered & sorted list |
| `EXPORT_CSV` | `{ transactions, currency }` | CSV string |
| `PING` | — | `{ pong: true }` |

---

## 📱 PWA Install Notes

### Android (Chrome)
Chrome will show an *Add to Home Screen* banner automatically after a few visits. You can also tap the three-dot menu → *Install app*.

### iOS (Safari)
Tap the **Share** button → **Add to Home Screen**. Safari does not show an automatic prompt.

### Desktop (Chrome / Edge)
Look for the install icon (⊕) in the address bar.

---

## 🔒 Privacy

Nash stores all data in your browser's `localStorage` under the key `nash_data`. Nothing is ever sent to a server. To back up your data, use **More → Export Data** in the app.

---

## 🐰 About Koi

Koi is your companion rabbit — she lives in the app and gives you friendly financial tips. Tap her to get a new tip!

---

## 📝 License

MIT — free to use, fork, and modify.

---

Made with 💕 for cozy budgeting.
