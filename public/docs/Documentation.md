# Bayse Portfolio Tracker + AI Analyst

## Developer Documentation

---

## 1. Introduction

This document explains how to:

* Set up the project locally
* Understand the codebase structure
* Work within your role without breaking others
* Contribute efficiently during the hackathon

This is a **strict working guide** — follow it to avoid conflicts and wasted time.

---

## 2. Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Firebase (Auth + Firestore)
* Google Gemini API
* Bayse Markets API

---

## 3. Getting Started

### 3.1 Clone Repository

```bash
git clone <repo-url>
cd <project-name>
```

---

### 3.2 Install Dependencies

```bash
npm install
```

---

### 3.3 Setup Environment Variables

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

⚠️ Never commit `.env.local`

---

### 3.4 Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 4. Project Structure

```
/app            → Pages + API routes
/components     → UI components
/hooks          → Client-side logic
/services       → Business logic
/lib            → External integrations
/types          → TypeScript types
/constants      → Config values
```

---

## 5. Core Rules (Non-Negotiable)

### ❌ DO NOT:

* Call external APIs from components
* Put logic inside pages
* Mix UI and data fetching
* Access `process.env` everywhere

### ✅ ALWAYS:

* Use API routes
* Use service layer
* Keep files focused
* Follow folder responsibilities

---

## 6. Development Workflow

### Step 1: Pick a Task

Each task should map to:

* UI
* API
* Service
* Integration

---

### Step 2: Work in Isolation

Do NOT edit random files.

Example:

* Working on portfolio → only touch:

  * `/api/portfolio`
  * `/services/portfolio.service.ts`
  * `/hooks/usePortfolio.ts`

---

### Step 3: Test Your Flow

Make sure:

* API route works
* Data reaches frontend
* No console errors

---

### Step 4: Commit

```bash
git add .
git commit -m "feat: implement portfolio API flow"
```

---

## 7. Feature Development Guide

---

### 7.1 Portfolio Feature

Flow:

```
Frontend Hook → API Route → Service → Bayse Client
```

Files involved:

* `/hooks/usePortfolio.ts`
* `/app/api/portfolio/route.ts`
* `/services/portfolio.service.ts`
* `/lib/bayse/client.ts`

---

### 7.2 PnL Feature

Same structure as portfolio.

---

### 7.3 AI Analysis Feature

Flow:

```
Frontend → API → Service → Gemini Client
```

Files:

* `/hooks/useAnalysis.ts`
* `/app/api/analyze/route.ts`
* `/services/analysis.service.ts`
* `/lib/gemini/client.ts`

---

## 8. Role-Based Responsibilities

---

### 🎨 Frontend Engineer

Works in:

* `/app`
* `/components`
* `/hooks`

Responsibilities:

* Build UI
* Connect to API routes
* Handle loading/error states

---

### ⚙️ Backend Engineer

Works in:

* `/api`
* `/services`
* `/lib/bayse`

Responsibilities:

* API routes
* Data fetching
* Error handling

---

### 🤖 AI Engineer

Works in:

* `/api/analyze`
* `/services/analysis.service.ts`
* `/lib/gemini`

Responsibilities:

* Prompt design
* AI response formatting

---

### 🔗 Integration Engineer

Works across:

* `/hooks`
* `/services`
* `/lib`

Responsibilities:

* Connect frontend to backend
* Debug integration issues

---

## 9. API Usage Pattern

### NEVER do this:

```ts
// ❌ inside component
fetch("https://bayse.api/portfolio")
```

---

### ALWAYS do this:

```ts
// ✅ inside hook
fetch("/api/portfolio")
```

---

## 10. Error Handling

All API routes must return:

```json
{
  "error": true,
  "message": "Description"
}
```

Frontend must:

* Show fallback UI
* Avoid crashes

---

## 11. Git Workflow

### Branch Naming

```
feat/portfolio-api
feat/pnl-ui
feat/ai-analysis
```

---

### Commit Style

```
feat: add portfolio service
fix: handle API error
chore: update types
```

---

### Rule:

👉 No direct commits to main

---

## 12. UI Guidelines

* Use Tailwind only
* Keep components small
* Reuse components from `/components/ui`

---

## 13. Debugging Guide

### If API fails:

* Check console
* Check API route logs

---

### If UI breaks:

* Check props
* Check hook return values

---

### If AI output is bad:

* Fix prompt (not UI)

---

## 14. Common Mistakes

❌ Fetching directly in components
❌ Duplicating logic across files
❌ Hardcoding API responses
❌ Ignoring types

---

## 15. Demo Readiness Checklist

Before final demo:

* Login works
* Portfolio loads
* PnL loads
* AI generates insight
* No console errors
* UI looks clean

---

## 16. Deployment

### Using Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in dashboard.

---

## 17. Final Notes

* Ship early
* Freeze features early
* Polish heavily at the end

This project is designed for speed, clarity, and teamwork. Follow the structure, and integration will be smooth.

---
