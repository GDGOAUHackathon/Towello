import { geminiClient } from '@/lib/gemini/client';
import { portfolioService } from '@/services/portfolio.service';
import type { AIAnalysisResult } from '@/types/analysis';

export class AnalysisService {
  async generatePortfolioReport(userId: string): Promise<AIAnalysisResult> {
    const { positions, summary } =
      await portfolioService.getUserPortfolio(userId);
    const payload = JSON.stringify({ summary, positions }, null, 2);
    return geminiClient.generatePortfolioAnalysis(payload);
  }
}

export const analysisService = new AnalysisService();
