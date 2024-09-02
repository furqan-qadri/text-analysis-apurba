// src/utils/types.ts
export interface AnalysisResult {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  paragraphCount: number;
  longestWord: string;
  mostFrequentWord: [string, number];
  sentenceCount: number;
  sentiment: string;
}
