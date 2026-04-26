# 💰 BudgetEye

> Smart daily budget tracking — built for real life, works offline, speaks your language.

![BudgetEye](https://img.shields.io/badge/version-1.0.0-6C63FF?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-ready-43E97B?style=for-the-badge)
![Offline](https://img.shields.io/badge/offline-supported-38F9D7?style=for-the-badge)
![Languages](https://img.shields.io/badge/languages-EN%20%7C%20አማ-FF6584?style=for-the-badge)

---

## What is BudgetEye?

BudgetEye is a personal daily budget tracker that connects to your bank accounts, monitors your spending in real time, and locks you out of transfers the moment you hit your daily limit. It's built for Ethiopian Birr (ETB) but supports worldwide banks and currencies.

Set your limit. Track your day. Stay in control.

---

## Features

### Security & Authentication
- Real SMS OTP via Twilio — code lands on your actual phone
- Face scan verification (camera-based)
- National ID upload verification
- 3-step 2FA before you ever see the dashboard
- Session tokens stored locally — no passwords

### Budget Control
- Set a daily spending limit in ETB
- Live animated progress bar showing how close you are
- Warnings at 60%, 80%, and 100% of your limit
- Full transfer block when limit is reached — no exceptions until tomorrow
- "If it's urgent, plan for tomorrow" — the app tells you straight

### Dashboard
- Total balance across all connected accounts
- Today's spend vs remaining budget
- Financial health score (0–100) with animated ring
- Weekly spending bar chart
- Recent transactions with category icons
- Connected banks with live sync indicator

### Bank Support
- Ethiopian banks: CBE, Dashen, Awash, Abyssinia, Wegagen, NIB, Oromia, Berhan, Abay, United
- International: Chase, Bank of America, HSBC, Barclays, BNP Paribas, Deutsche Bank, ICBC, Standard Chartered, Equity Bank, Zenith Bank
- Add any bank manually

### Languages
- Full English and Amharic (አማርኛ) support
- Switch instantly from any screen — no reload needed

### Offline / PWA
- Works fully offline after first load (Service Worker cache)
- Installable on Android and iOS home screen
- Offline banner shows when you lose connection
- All data stored locally — your budget survives airplane mode

---

## Project Structure

```
budget-tracker/
├── index.html              # Sign-in page (5-step auth flow)
├── dashboard.html          # Main dashboard
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline cache)
│
├── styles/
│   ├── main.css            # Landing page + auth styles
│   └── dashboard.css       # Dashboard layout + components
│
├── js/
│   ├── app.js              # Auth flow, OTP, i18n, SW registration
│   ├── dashboard.js        # Dashboard logic, charts, stats
│   ├── banks.js            # Bank registry + transaction generator
│   └── notifications.js    # Budget alerts + notification store
│
└── backend/
    ├── server.js           # Express API (send-otp, verify-otp)
    ├── package.json
    ├── .env                # Your credentials (never commit this)
    └── .gitignore
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- A free [Twilio account](https://www.twilio.com/try-twilio)
- Your phone and PC on the same WiFi network

---

### 1. Clone the repo

```bash
git clone https://github.com/yourname/budgeteye.git
cd budgeteye/budget-tracker
```

---

### 2. Set up Twilio (free, 2 minutes)

1. Sign up at [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. From your Twilio Console, copy:
   - **Account SID**
   - **Auth Token**
   - **A Twilio phone number** (they give you one free)
3. Verify your personal phone number under **Verified Caller IDs** in the console

---

### 3. Configure the backend

Open `backend/.env` and fill in your details:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# Your real phone number — the ONLY number allowed to sign in
MY_PHONE_NUMBER=+251912345678

PORT=3001
SERVER_HOST=10.232.84.214   # your PC's local IP (see step 4)
```

---

### 4. Find your local IP

Run this in PowerShell:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' }
```

Or on Mac/Linux:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Use that IP as `SERVER_HOST` in your `.env`.

---

### 5. Start the backend

```bash
cd backend
npm install
node server.js
```

You should see:

```
✅ BudgetEye backend running
   Local:   http://localhost:3001
   Network: http://10.232.84.214:3001
```

---

### 6. Open the app

**On your PC** — open `index.html` with VS Code Live Server or any static file server:

```bash
# with npx
npx serve .

# or just open index.html directly in Chrome
```

**On your phone** — make sure you're on the same WiFi, then open:

```
http://10.232.84.214:5500
```

(replace with your actual IP and port)

---

## How the Auth Flow Works

```
Enter phone number
       ↓
Real SMS sent via Twilio → code arrives on your phone
       ↓
Enter 6-digit OTP (5 min expiry, resend available)
       ↓
Face scan verification
       ↓
National ID upload
       ↓
Connect your bank
       ↓
Dashboard
```

---

## Setting Your Daily Budget

1. Go to the **Budget** tab in the dashboard
2. Enter your daily limit in ETB
3. Hit **Set Limit**

From that point:
- Green bar = you're good
- Orange bar = approaching limit (80%)
- Red bar = limit reached, transfers blocked until tomorrow

---

## Installing on Your Phone (PWA)

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the three-dot menu → "Add to Home screen"
3. Done — it opens like a native app

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button → "Add to Home Screen"
3. Done

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| SMS | Twilio |
| Offline | Service Worker + Cache API |
| Storage | localStorage / sessionStorage |
| Fonts | Poppins + Noto Sans Ethiopic |
| PWA | Web App Manifest |

No frameworks. No build step. Just open and run.

---

## Security Notes

- Only your phone number (`MY_PHONE_NUMBER` in `.env`) can sign in
- OTPs expire after 5 minutes
- Max 3 OTP requests per 10 minutes (rate limited)
- Session tokens are random 32-byte hex strings
- Never commit your `.env` file — it's in `.gitignore`
- The backend runs locally on your network, not exposed to the internet

---

## Roadmap (v2 ideas)

- [ ] Real bank API integration (Plaid, Open Banking)
- [ ] Monthly budget reports with PDF export
- [ ] Spending categories with custom limits
- [ ] Recurring transaction detection
- [ ] Multi-user support
- [ ] Cloud sync with end-to-end encryption
- [ ] Telegram/WhatsApp budget alerts

---

## License

MIT — do whatever you want with it.

---

<p align="center">Built with 💜 for anyone tired of overspending</p>
