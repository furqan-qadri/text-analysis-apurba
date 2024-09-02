// src/utils/types.ts
export interface AnalysisResultTypes {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  paragraphCount: number;
  longestWord: string;
  mostFrequentWord: [string, number];
  sentenceCount: number;
  sentiment: string;
}
