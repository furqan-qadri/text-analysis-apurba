// src/utils/exportToPDF.ts
import jsPDF from "jspdf";
import { AnalysisResultTypes } from "./types";

export const exportToPDF = (text: string, analysis: AnalysisResultTypes) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Text Analysis Result", 10, 15);
  doc.setLineWidth(0.5);
  doc.line(10, 20, 200, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text("Original Text:", 10, 30);
  doc.setFont("helvetica", "italic");
  doc.text(text, 10, 40);
  doc.line(10, 50, 200, 50);

  doc.setFont("helvetica", "bold");
  doc.text("Analysis:", 10, 60);
  doc.setFont("helvetica", "normal");

  doc.text(`Total words: ${analysis.wordCount}`, 10, 70);
  doc.text(`Character Count (with spaces): ${analysis.characterCount}`, 10, 80);
  doc.text(
    `Character Count (without spaces): ${analysis.characterCountNoSpaces}`,
    10,
    90
  );
  doc.text(`Sentences: ${analysis.sentenceCount}`, 10, 100);
  doc.text(`Paragraphs: ${analysis.paragraphCount}`, 10, 110);
  doc.text(`Longest word: ${analysis.longestWord}`, 10, 120);
  doc.text(`Most frequent word: ${analysis.mostFrequentWord[0]}`, 10, 130);
  doc.text(`Sentiment: ${analysis.sentiment}`, 10, 140);

  doc.save("Text_Analysis_Result.pdf");
};
