/**
 * AI Analysis Types
 * 
 * Responsibility: Define AI request and response structures.
 * Owner: AI Engineer
 * Implementation: Add support for different analysis types (e.g., sentiment, risk, prediction).
 */

export interface AIAnalysisResult {
  summary: string;
  insights: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number;
  marketOutlook: string;
  generatedAt: string;
}

export interface AnalysisRequest {
  portfolioData: unknown; // Shape depends on portfolio types
  focusArea?: string;
}
