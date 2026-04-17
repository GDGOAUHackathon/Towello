# Bayse Portfolio Tracker + AI Analyst

## System Requirements & Architecture (SRC)

---

## 1. System Overview

This application is a full-stack web platform built using Next.js (App Router), acting as both:

* Frontend (UI + user interactions)
* Backend (API routes as serverless functions)

The system integrates:

* Bayse Markets API → portfolio data
* Google Gemini API → AI analysis
* Firebase → authentication + database

The architecture is intentionally **monolithic (single repo)** to maximize speed and reduce complexity during the hackathon.

---

## 2. High-Level Architecture

### Core Principle:

All external integrations are handled server-side via API routes.

```
[ Client (Browser) ]
        ↓
[ Next.js Frontend (App Router) ]
        ↓
[ API Routes (/app/api/*) ]
        ↓
[ Service Layer ]
        ↓
[ External Clients ]
   ├── Bayse API
   ├── Gemini API
   └── Firebase (Admin SDK)
```

---

## 3. System Components

### 3.1 Frontend Layer

Location:

```
/app
/components
/hooks
```

Responsibilities:

* Render UI (dashboard, charts, tables)
* Handle user interactions
* Call internal API routes (never external APIs directly)

Constraints:

* No business logic
* No direct API integrations

---

### 3.2 API Layer (Serverless)

Location:

```
/app/api/*
```

Endpoints:

* `/api/portfolio`
* `/api/pnl`
* `/api/analyze`

Responsibilities:

* Act as secure proxy to external services
* Validate requests
* Call service layer
* Return structured JSON responses

---

### 3.3 Service Layer (Business Logic)

Location:

```
/services
```

Responsibilities:

* Orchestrate logic between API routes and external clients
* Transform and normalize data
* Keep API routes thin

Example Flow:

```
API Route → Service → External Client
```

---

### 3.4 External Clients Layer

Location:

```
/lib
```

Modules:

* `/lib/bayse` → Bayse API integration
* `/lib/gemini` → Gemini API integration
* `/lib/firebase` → Firebase setup

Responsibilities:

* Handle low-level API communication
* Encapsulate external dependencies

---

### 3.5 Data Layer

#### Firebase Authentication

* Google Sign-In
* Generates unique user ID (UID)

#### Firestore (NoSQL)

Collections:

```
users/{uid}
  ├── apiKey
  ├── snapshots
  └── analyses
```

Responsibilities:

* Store user API keys
* Cache portfolio snapshots
* Persist AI analysis results

---

## 4. Data Flow

### 4.1 Portfolio Fetch Flow

```
Frontend (usePortfolio)
        ↓
GET /api/portfolio
        ↓
portfolio.service.ts
        ↓
bayse.client.ts
        ↓
Bayse API
        ↓
Response → normalized → returned to frontend
```

---

### 4.2 PnL Fetch Flow

```
Frontend (usePnL)
        ↓
GET /api/pnl
        ↓
pnl.service.ts
        ↓
bayse.client.ts
        ↓
Bayse API
```

---

### 4.3 AI Analysis Flow

```
Frontend (useAnalysis)
        ↓
POST /api/analyze
        ↓
analysis.service.ts
        ↓
gemini.client.ts
        ↓
Gemini API
        ↓
AI Response → formatted → returned
```

---

## 5. API Contracts

### 5.1 GET /api/portfolio

Response:

```json
{
  "positions": [],
  "totalValue": 0,
  "pnl": 0
}
```

---

### 5.2 GET /api/pnl

Response:

```json
{
  "totalPnl": 0,
  "winRate": 0,
  "breakdown": []
}
```

---

### 5.3 POST /api/analyze

Request:

```json
{
  "portfolio": {},
  "pnl": {}
}
```

Response:

```json
{
  "insights": "string",
  "riskLevel": "low | medium | high"
}
```

---

## 6. Folder Responsibility Mapping

```
/app            → Routing + pages only
/components     → UI only
/hooks          → Client-side data handling
/api            → HTTP interface layer
/services       → Business logic
/lib            → External integrations
/types          → Shared types/interfaces
/constants      → Static config
```

---

## 7. Environment Configuration

Environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

BAYSE_PUBLIC_KEY=
BAYSE_SECRET_KEY=

GEMINI_API_KEY=
```

Rules:

* No secrets exposed to frontend
* All sensitive logic runs in API routes

---

## 8. Security Considerations

* API keys stored in environment variables
* No direct client-side calls to Bayse or Gemini
* Firebase Admin SDK used only server-side
* Validate all API route inputs

---

## 9. Error Handling Strategy

* API routes return consistent error format:

```json
{
  "error": true,
  "message": "Something went wrong"
}
```

* Graceful fallback:

  * Use mock data if APIs fail
  * Avoid crashing UI

---

## 10. Performance Considerations

* Use React Server Components where possible
* Cache API responses (optional)
* Avoid redundant API calls via hooks

---

## 11. Deployment Architecture

### Option 1 (Recommended)

* Vercel (Next.js native support)

### Option 2

* Firebase Hosting

Flow:

```
GitHub → Vercel → Live URL
```

---

## 12. Development Constraints

* Single repo (no microservices)
* Fast iteration over perfect architecture
* Prioritize working features over abstraction

---

## 13. Key Engineering Rules

* No API calls inside components
* No business logic inside API routes
* Always go through service layer
* Keep files small and focused

---

## 14. Failure Scenarios & Fallbacks

| Scenario        | Fallback                      |
| --------------- | ----------------------------- |
| Bayse API fails | Return mock portfolio         |
| Gemini fails    | Return pre-written insight    |
| Firebase fails  | Use temporary in-memory state |

---

## 15. Summary

This system is designed to be:

* Simple enough for a hackathon
* Structured enough for team collaboration
* Flexible enough to extend post-hackathon

The architecture enforces clean separation of concerns, ensuring multiple engineers can work simultaneously without conflict.

---
