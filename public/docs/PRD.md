# Bayse Portfolio Tracker + AI Analyst

## Product Requirements Document (PRD)

---

## 1. Overview

Bayse Portfolio Tracker + AI Analyst is a full-stack web application that connects to a user's Bayse Markets account and provides:

* Real-time portfolio tracking
* Performance analytics (PnL, win/loss stats)
* AI-powered insights and recommendations

The product goes beyond dashboards by adding an intelligence layer that analyzes user positions and provides actionable insights.

---

## 2. Problem Statement

Prediction market users lack:

* Clear visibility into portfolio performance
* Insight into risk exposure (category concentration, over-leveraging)
* Intelligent guidance on what actions to take

Most tools only display data — they do not interpret it.

---

## 3. Goals & Objectives

### Primary Goals

* Deliver real-time portfolio visibility
* Provide AI-generated insights based on actual user data
* Build a clean, demo-ready product within 24 hours

### Success Criteria

* User can connect and view portfolio
* PnL and stats render correctly
* AI generates meaningful, contextual insights
* Application runs smoothly during demo

---

## 4. Target Users

### Primary Users

* Prediction market traders (Bayse users)

### Secondary Users

* Hackathon judges (demo experience matters heavily)

---

## 5. Core Features

## 5.1 Authentication

* Google Sign-In via Firebase Auth
* Secure session handling
* Store user UID

---

## 5.2 Portfolio Dashboard

Displays:

* Open positions
* Current value
* Profit & Loss (PnL)
* Win/Loss statistics

---

## 5.3 PnL Analytics

* Historical performance breakdown
* Per-event analysis
* Win rate visualization

---

## 5.4 AI Analysis (Key Differentiator)

* Analyze portfolio using Gemini API
* Provide insights such as:

  * Risk concentration
  * Best/worst performing trades
  * Suggested actions

Example output:

> “You are heavily concentrated in sports markets (62%), which increases category risk.”

---

## 5.5 Activity Feed (Optional / Stretch)

* Display recent trades and actions

---

## 5.6 Wallet Balance

* Show available funds (USD / NGN)

---

## 6. User Flow

### 1. User Login

→ User signs in with Google

### 2. Connect Portfolio

→ System retrieves Bayse data via API

### 3. View Dashboard

→ Positions, stats, and PnL displayed

### 4. Request AI Analysis

→ Backend sends data to Gemini
→ AI returns insights

---

## 7. Technical Scope

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Recharts for data visualization

### Backend

* Next.js API routes (serverless)

### Integrations

* Bayse API (portfolio data)
* Google Gemini API (AI insights)
* Firebase (Auth + Firestore)

---

## 8. Non-Goals (Important)

To avoid scope creep:

* No trading execution (read-only system)
* No complex user settings
* No multi-account support
* No real-time websockets (polling is fine)

---

## 9. Constraints

* 24-hour hackathon timeline
* Limited API quotas (Gemini free tier)
* Must be demo-ready, not production-perfect

---

## 10. Risks

### Technical Risks

* API failures (Bayse or Gemini)
* Auth integration delays
* Poor AI output quality

### Mitigation

* Use mock data fallback
* Cache responses
* Pre-test AI prompts

---

## 11. Milestones

### Phase 1 (0–6 hrs)

* Project setup
* Auth working
* Basic API routes scaffolded

### Phase 2 (6–12 hrs)

* Portfolio + PnL functional
* Basic UI in place

### Phase 3 (12–18 hrs)

* AI analysis integrated
* Frontend wired to backend

### Phase 4 (18–24 hrs)

* UI polish
* Demo preparation

---

## 12. Definition of Done

The product is complete when:

* User can log in
* Portfolio data is displayed
* PnL data is displayed
* AI generates at least one meaningful insight
* App is deployed and stable
* Demo flow is smooth

---

## 13. Demo Priorities

Focus on:

1. Clean UI
2. Real data (or believable mock)
3. Strong AI insight moment

---

## 14. Future Enhancements (Post-Hackathon)

* Trade execution integration
* Alerts and notifications
* Advanced analytics
* Mobile optimization

---
