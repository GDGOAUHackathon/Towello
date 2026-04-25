import { geminiClient } from '@/lib/gemini/client';
import { portfolioService } from '@/services/portfolio.service';
import { buildPortfolioPrompt, buildCategoryPrompt, buildSellPrompt } from '@/lib/gemini/prompts';
import { getBayseClient } from '@/lib/bayse/client';
import { BayseOutcomeBalance } from '@/lib/bayse/types';

export class AnalysisService {
  async generatePortfolioReport(userId: string, type: 'general' | 'category' = 'general'): Promise<{ analysis: string, generatedAt: string }> {
    const bayse = getBayseClient();
    const portfolio = await bayse.getPortfolio();
    const pnl = await bayse.getPnL({ breakdown: true });
    
    let prompt: string;
    if (type === 'category') {
      prompt = buildCategoryPrompt(portfolio, pnl);
    } else {
      prompt = buildPortfolioPrompt(portfolio);
    }

    const analysis = await geminiClient.generateText(prompt, 0.7);
    const generatedAt = new Date().toISOString();

    return { analysis, generatedAt };
  }

  async analyzePosition(userId: string, position: BayseOutcomeBalance): Promise<any> {
    const bayse = getBayseClient();
    const portfolio = await bayse.getPortfolio();
    const livePosition = portfolio.outcomeBalances.find(p => p.id === position.id || p.market.id === position.market?.id);
    
    const quote = {
      price: livePosition?.sellPrice || position.sellPrice,
    };

    const prompt = buildSellPrompt(position, quote);
    const text = await geminiClient.generateText(prompt, 0.4);

    try {
      const cleanJson = text.replace(/```json\s?|```/g, '').trim();
      const analysis = JSON.parse(cleanJson);
      return analysis;
    } catch (e) {
      return {
        recommendation: "HOLD",
        confidence: "LOW",
        edge_estimate: "neutral",
        reasoning: "AI analysis parsing failed. Defaulting to HOLD."
      };
    }
  }
}

export const analysisService = new AnalysisService();
