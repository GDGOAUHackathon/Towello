import { BaysePortfolioResponse, BaysePnLResponse, BayseOutcomeBalance } from '@/lib/bayse/types';

export const ANALYZE_PORTFOLIO_SYSTEM = `You are a senior quantitative prediction market analyst. 
Your analysis must be rooted in expected value (EV), payoff asymmetry, risk concentration, and position-level edge. 
Avoid generic financial advice. Always reference specific numbers from the portfolio.`;

export function buildPortfolioPrompt(portfolio: BaysePortfolioResponse): string {
  const positions = portfolio.outcomeBalances || [];
  
  if (positions.length === 0) {
    return `The user has no active positions in their prediction market portfolio. 
    Provide a high-level summary of how they should approach prediction markets, 
    focusing on capital preservation and identifying high-edge opportunities. 
    Keep it under 300 words.`;
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

REQUIRED SECTIONS:
1. **Portfolio Quality Score (0–100)**: A single number reflecting the risk-adjusted quality.
2. **Edge Analysis**: Where is the user showing a quantitative edge?
3. **Risk Concentration**: Are there too many eggs in one basket (event or category)?
4. **Bad Bets**: Identify positions with poor asymmetry or negative EV outlook.
5. **Trade Actions**: Specific quantitative recommendations (e.g., "Trim 20% of X").

CONSTRAINTS:
- Max 300 words.
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

Provide a structured markdown response covering:
1. **Strongest Category**: Which category is performing best quantitatively?
2. **Weakest Category**: Where is capital being lost?
3. **Allocation Mistakes**: Are they over-allocated to low-edge categories?
4. **Capital Reallocation**: Where should they move their money for better EV?

Keep it concise and data-driven.`;
}
