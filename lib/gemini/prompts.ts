/**
 * AI Prompts
 * 
 * Responsibility: Store and manage prompt templates for the AI analysis.
 * Owner: AI Engineer
 * Implementation: Add dynamic templates that interpolate portfolio and market data.
 */

export const ANALYZE_PORTFOLIO_PROMPT = (portfolioData: string) => `
You are a senior financial analyst. Analyze the following prediction market portfolio data:
${portfolioData}

Provide:
1. A summary of the overall health.
2. Three specific insights.
3. Risk level assessment.
`;

export const MARKET_OUTLOOK_PROMPT = (marketData: string) => `
Based on these market conditions: ${marketData}, what is the short-term outlook?
`;
