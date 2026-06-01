#  Nash – Personal Finance Tracker

A mobile-first Progressive Web App for tracking personal income, expenses, and account balances. Inspired by the rabbit mascot and designed for PHP (Philippine Peso) users.

---

## ✨ Features

- **Home** — Daily greeting, mascot tips, no-spend streak counter, monthly income/expense summary
- **Wallet** — Account overview (Cash, GCash, etc.), net balance, 7-day spending bar chart
- **Plan** — Category budgets, personal goals, debt tracker, planned payments, education hub
- **History** — Full transaction log, searchable, grouped by date
- **Add Transactions** — Income, Expense, and Transfer entry with category chips
- **Offline Support** — Works without internet after first load (Service Worker)
- **PWA Install Prompt** — Add to home screen banner on supported browsers
- **Local Persistence** — All data saved to `localStorage`; no account or server needed

---

## 🚀 Deploy to GitHub Pages

### 1. Create a new GitHub repository

```bash
git init
git add .
git commit -m "Initial commit – Tarsi finance app"
git remote add origin https://github.com/YOUR_USERNAME/tarsi-app.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `Deploy from a branch`
4. Choose **Branch: main**, folder **/ (root)**
5. Click **Save**

Your app will be live at:
```
https://YOUR_USERNAME.github.io/tarsi-app/
```

> **Note:** GitHub Pages requires HTTPS, which is needed for Service Workers and the PWA install prompt to work correctly.

---

## 📁 File Structure

```
tarsi-app/
├── index.html        # App shell, all pages, modals, styles
├── app.js            # State management, rendering, PWA logic
├── sw.js             # Service Worker for offline caching
├── manifest.json     # PWA manifest (name, icons, theme)
├── icons/
│   ├── icon-192.png  # App icon (192×192)
│   └── icon-512.png  # App icon (512×512)
└── README.md         # This file
```

---

## 📱 Installing as a PWA

### Android (Chrome)
1. Open the app URL in Chrome
2. Tap the **Install** banner that appears at the top
3. Or tap the ⋮ menu → **Add to Home screen**

### iOS (Safari)
1. Open the app URL in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

> iOS does not support the `beforeinstallprompt` event, so the install banner won't appear automatically — users must use the Safari share sheet manually.

---

## 🛠 Customization

### Change your name
Open `app.js` and edit the `username` field in the initial state:
```js
let state = {
  username: 'YourName',
  ...
}
```

### Change default accounts or starting balances
Edit the `accounts` array in `app.js`:
```js
accounts: [
  { id: 'cash', name: 'Cash', icon: '💵', type: 'Debit', currency: 'PHP', balance: 0 },
  { id: 'gcash', name: 'Gcash', icon: '📱', type: 'Debit', currency: 'PHP', balance: 0 }
]
```

### Add new expense categories
Edit the `CATEGORIES` object in `app.js`.

---

## 🔒 Privacy

All data is stored **locally on your device** using `localStorage`. No data is sent to any server. Clearing your browser data will erase your transaction history.

---

## 📄 License

MIT — free to use, modify, and deploy.
