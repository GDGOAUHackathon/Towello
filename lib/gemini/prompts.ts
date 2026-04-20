/**
 * AI prompt templates for Gemini.
 */

export const ANALYZE_PORTFOLIO_SYSTEM = `You are a senior prediction-markets analyst. Be concise, practical, and honest about uncertainty.`;

export function buildPortfolioAnalysisUserPrompt(portfolioJson: string): string {
  return `Analyze this Bayse prediction market portfolio (JSON). Consider concentration, outcome mix, and notional at risk.

Portfolio JSON:
${portfolioJson}

Respond with ONLY valid JSON (no markdown fences) matching this TypeScript shape:
{
  "summary": string,
  "insights": string[],
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "confidenceScore": number,
  "marketOutlook": string
}

Rules:
- insights must have exactly 3 short bullet strings.
- confidenceScore is 0..1.
- riskLevel must be one of LOW, MEDIUM, HIGH.`;
}

export const MARKET_OUTLOOK_PROMPT = (marketData: string) => `
Based on these market conditions: ${marketData}, what is the short-term outlook?
`;
