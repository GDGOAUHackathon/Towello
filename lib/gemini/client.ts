import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from '@/constants/config';
import { requireGeminiApiKey } from '@/lib/config/server';
import type { AIAnalysisResult } from '@/types/analysis';
import {
  ANALYZE_PORTFOLIO_SYSTEM,
  buildPortfolioAnalysisUserPrompt,
} from '@/lib/gemini/prompts';

function stripJsonFence(text: string): string {
  const t = text.trim();
  if (t.startsWith('```')) {
    return t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/u, '').trim();
  }
  return t;
}

function parseAnalysisJson(text: string): AIAnalysisResult {
  const raw = stripJsonFence(text);
  const parsed = JSON.parse(raw) as Partial<AIAnalysisResult>;
  const insights = Array.isArray(parsed.insights)
    ? parsed.insights.map(String).slice(0, 5)
    : [];

  const risk = parsed.riskLevel;
  const riskLevel =
    risk === 'LOW' || risk === 'MEDIUM' || risk === 'HIGH'
      ? risk
      : 'MEDIUM';

  return {
    summary: String(parsed.summary ?? 'Analysis unavailable.'),
    insights: insights.length >= 3 ? insights.slice(0, 3) : [...insights, ...Array(3 - insights.length).fill('—')],
    riskLevel,
    confidenceScore:
      typeof parsed.confidenceScore === 'number'
        ? Math.min(1, Math.max(0, parsed.confidenceScore))
        : 0.6,
    marketOutlook: String(parsed.marketOutlook ?? ''),
    generatedAt: new Date().toISOString(),
  };
}

export class GeminiClient {
  private genAI: GoogleGenerativeAI | null = null;

  private getModel() {
    const apiKey = requireGeminiApiKey();
    if (!this.genAI) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI.getGenerativeModel({
      model: CONFIG.GEMINI.MODEL,
      systemInstruction: ANALYZE_PORTFOLIO_SYSTEM,
    });
  }

  async generatePortfolioAnalysis(portfolioJson: string): Promise<AIAnalysisResult> {
    const model = this.getModel();
    const prompt = buildPortfolioAnalysisUserPrompt(portfolioJson);

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();
    try {
      return parseAnalysisJson(text);
    } catch {
      return {
        summary: text.slice(0, 2000),
        insights: [
          'Model returned non-JSON; showing raw summary above.',
          'Retry or check GEMINI_MODEL supports JSON mode.',
          'Verify portfolio payload is valid JSON.',
        ],
        riskLevel: 'MEDIUM',
        confidenceScore: 0.3,
        marketOutlook: '',
        generatedAt: new Date().toISOString(),
      };
    }
  }
}

export const geminiClient = new GeminiClient();
