import { BaysePortfolioResponse, BaysePnLResponse, BayseOutcomeBalance } from '@/lib/bayse/types';

export const ANALYZE_PORTFOLIO_SYSTEM = `You are a senior quantitative prediction market analyst. 
Your analysis must be rooted in expected value (EV), payoff asymmetry, risk concentration, and position-level edge. 
Avoid generic financial advice. Always reference specific numbers from the portfolio.`;

export function buildPortfolioPrompt(portfolio: BaysePortfolioResponse): string {
  const positions = portfolio.outcomeBalances || [];
  
  if (positions.length === 0) {
    return `Return ONLY valid JSON. No markdown. No explanation text.
{
  "riskLevel": "LOW",
  "confidence": 0,
  "summary": "No active positions in portfolio.",
  "insights": [
    "No current exposure means no immediate risk or potential gain.",
    "Opportunity to build positions in high-edge markets.",
    "Start with small, calculated entries."
  ],
  "outlook": "Neutral until positions are opened."
}`;
  }

  // Extract top 10 positions by current value
  const topPositions = [...positions]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 10);

  const positionData = topPositions.map(p => ({
    market: p.market.title,
    event: p.market.event.title,
    outcome: p.outcome,
    cost: p.cost,
    currentValue: p.currentValue,
    percentageChange: p.percentageChange,
    payoutIfOutcomeWins: p.payoutIfOutcomeWins
  }));

  return `Analyze this quantitative prediction market portfolio.

TOP 10 POSITIONS:
${JSON.stringify(positionData, null, 2)}

SUMMARY DATA:
- Total Cost: ${portfolio.portfolioCost}
- Current Value: ${portfolio.portfolioCurrentValue}
- Total Change: ${portfolio.portfolioPercentageChange}%

REQUIRED JSON OUTPUT FORMAT:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "confidence": number (0-100),
  "summary": "1-2 sentences",
  "insights": ["2-4 bullet points"],
  "outlook": "1-2 sentences"
}

CONSTRAINTS:
- Return ONLY valid JSON. No markdown. No explanation text.
- Reference actual numbers.
- No generic advice.
- Be blunt and analytical.`;
}

export function buildSellPrompt(position: BayseOutcomeBalance, currentQuote: any): string {
  const data = {
    event: position.market.event.title,
    market: position.market.title,
    outcome: position.outcome,
    entryPrice: position.averagePrice,
    currentPrice: currentQuote?.price || position.sellPrice,
    quantity: position.balance,
    cost: position.cost,
    currentValue: position.currentValue,
    pnl: position.percentageChange,
    payoutPotential: position.payoutIfOutcomeWins
  };

  return `Act as a quantitative prediction market analyst. Decide if the user should SELL, HOLD, or BUY_MORE of this position.

POSITION DATA:
${JSON.stringify(data, null, 2)}

Analyze based on payoff asymmetry and current PnL. 

Return ONLY a valid JSON object matching this structure:
{
  "recommendation": "SELL" | "HOLD" | "BUY_MORE",
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "edge_estimate": "positive" | "neutral" | "negative",
  "reasoning": "2 sentences max"
}

Do not include markdown blocks or any other text.`;
}

export function buildCategoryPrompt(portfolio: BaysePortfolioResponse, pnl: BaysePnLResponse): string {
  const positions = portfolio.outcomeBalances || [];
  
  const categories = {
    sports: { cost: 0, value: 0, changes: [] as number[] },
    politics: { cost: 0, value: 0, changes: [] as number[] },
    crypto: { cost: 0, value: 0, changes: [] as number[] },
    other: { cost: 0, value: 0, changes: [] as number[] }
  };

  positions.forEach(p => {
    const text = (p.market.title + ' ' + p.market.event.title).toLowerCase();
    let cat: keyof typeof categories = 'other';
    
    if (text.includes('football') || text.includes('match') || text.includes('team') || text.includes('soccer') || text.includes('nfl') || text.includes('nba')) {
      cat = 'sports';
    } else if (text.includes('election') || text.includes('president') || text.includes('senate') || text.includes('politics')) {
      cat = 'politics';
    } else if (text.includes('btc') || text.includes('eth') || text.includes('crypto') || text.includes('bitcoin')) {
      cat = 'crypto';
    }

    categories[cat].cost += p.cost;
    categories[cat].value += p.currentValue;
    categories[cat].changes.push(p.percentageChange);
  });

  const categoryAnalysis = Object.entries(categories).map(([name, data]) => {
    const avgChange = data.changes.length > 0 
      ? data.changes.reduce((a, b) => a + b, 0) / data.changes.length 
      : 0;
    return {
      name,
      totalCost: data.cost,
      totalValue: data.value,
      averagePercentageChange: avgChange.toFixed(2) + '%'
    };
  });

  return `Analyze the portfolio by category.

CATEGORY DATA:
${JSON.stringify(categoryAnalysis, null, 2)}

OVERALL PNL:
- Realized PnL: ${pnl.realizedPnl}
- Realized %: ${pnl.realizedPnlPercent}%

REQUIRED JSON OUTPUT FORMAT:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "confidence": number (0-100),
  "summary": "1-2 sentences summarizing the strongest and weakest categories.",
  "insights": [
    "Identify strongest category",
    "Identify weakest category where capital is bleeding",
    "Identify allocation mistakes",
    "Suggest where to reallocate for better EV"
  ],
  "outlook": "1-2 sentences on expected trajectory based on category exposure."
}

CONSTRAINTS:
- Return ONLY valid JSON. No markdown. No explanation text.
- Keep it concise and data-driven.`;
}
