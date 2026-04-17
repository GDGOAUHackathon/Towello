# 🚀 Bayse Portfolio Tracker + AI Analyst

A full-stack prediction market intelligence platform that tracks portfolio performance and generates AI-powered insights using Google Gemini.

---

## ✨ What This Project Does

* 📊 Track your Bayse portfolio in real time
* 📈 Analyze profit & loss (PnL) and performance
* 🤖 Get AI-generated insights on your trades
* 🔐 Secure authentication with Firebase

---

## 🧱 Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Firebase (Auth + Firestore)
* Google Gemini API
* Bayse Markets API

---

## ⚡ Quick Start (5 Minutes)

### 1. Clone the repo

```bash
git clone <repo-url>
cd <project-name>
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

BAYSE_PUBLIC_KEY=
BAYSE_SECRET_KEY=

GEMINI_API_KEY=
```

---

### 4. Run the app

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
/app            → Pages + API routes
/components     → UI components
/hooks          → Client logic
/services       → Business logic
/lib            → External integrations
/types          → Type definitions
/constants      → Config values
```

---

## 🧠 Architecture Overview

```
Frontend (React)
      ↓
API Routes (/api/*)
      ↓
Services (business logic)
      ↓
External Clients (Bayse, Gemini, Firebase)
```

---

## 🚫 Rules (Do Not Break These)

* ❌ No API calls inside components

* ❌ No business logic inside API routes

* ❌ No direct external API calls from frontend

* ✅ Always use API routes

* ✅ Always use service layer

* ✅ Keep files small and focused

---

## 🛠 How to Work on This Project

### Example: Portfolio Feature

```
/hooks/usePortfolio.ts
        ↓
/api/portfolio
        ↓
/services/portfolio.service.ts
        ↓
/lib/bayse/client.ts
```

---

## 👥 Team Roles

| Role        | Owns                        |
| ----------- | --------------------------- |
| Frontend    | UI, components, pages       |
| Backend     | API routes, services        |
| AI          | Gemini integration, prompts |
| Integration | Connect everything          |

---

## 🌿 Git Workflow

### Branch naming

```
feat/portfolio-api
feat/pnl-ui
feat/ai-analysis
```

---

### Commit format

```
feat: add portfolio service
fix: handle API error
```

---

### Rule

👉 No direct commits to main

---

## 🧪 API Endpoints

| Endpoint         | Description          |
| ---------------- | -------------------- |
| `/api/portfolio` | Fetch portfolio data |
| `/api/pnl`       | Fetch PnL data       |
| `/api/analyze`   | Generate AI insights |

---

## ⚠️ Common Mistakes

* Fetching directly in components
* Mixing UI and logic
* Hardcoding API responses
* Ignoring types

---

## 🚀 Deployment

Using Vercel:

```bash
npm install -g vercel
vercel
```

---

## 🏁 Demo Checklist

* [ ] Login works
* [ ] Portfolio loads
* [ ] PnL loads
* [ ] AI generates insight
* [ ] No console errors

---

## 📌 Final Note

This project is optimized for **speed, clarity, and teamwork**.

Follow the structure — don’t improvise it.

---
