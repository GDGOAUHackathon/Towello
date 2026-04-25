import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from '@/constants/config';
import { requireGeminiApiKey } from '@/lib/config/server';
import type { AIAnalysisResult } from '@/types/analysis';
import {
  ANALYZE_PORTFOLIO_SYSTEM,
  buildPortfolioPrompt,
} from '@/lib/gemini/prompts';
import { BaysePortfolioResponse } from '@/lib/bayse/types';

export class GeminiClient {
  private genAI: GoogleGenerativeAI | null = null;

  private getModel(temperature = 0.4) {
    const apiKey = requireGeminiApiKey();
    if (!this.genAI) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI.getGenerativeModel({
      model: CONFIG.GEMINI.MODEL,
      systemInstruction: ANALYZE_PORTFOLIO_SYSTEM,
      generationConfig: {
        temperature,
        topP: 0.9,
        maxOutputTokens: 1024,
      }
    });
  }

  async generateText(prompt: string, temperature = 0.7): Promise<string> {
    const model = this.getModel(temperature);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (!text) throw new Error('Empty response from Gemini');
    return text;
  }

  // Legacy/Updated method for general portfolio analysis
  async generatePortfolioAnalysis(portfolio: BaysePortfolioResponse): Promise<string> {
    const prompt = buildPortfolioPrompt(portfolio);
    return this.generateText(prompt, 0.7);
  }
}

export const geminiClient = new GeminiClient();
