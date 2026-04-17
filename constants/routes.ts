/**
 * Application Routes
 * 
 * Responsibility: Centralize all internal route definitions.
 * Owner: Frontend Engineer
 * Implementation: Add dynamic routes for specific positions or analysis reports.
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  POSITIONS: '/positions',
  PNL: '/pnl',
  ANALYSIS: '/analysis',
  API: {
    PORTFOLIO: '/api/portfolio',
    PNL: '/api/pnl',
    ANALYZE: '/api/analyze',
  },
} as const;
