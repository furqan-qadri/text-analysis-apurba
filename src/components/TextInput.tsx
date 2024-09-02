// src/components/TextInput.tsx
import { useState, ChangeEvent } from "react";
import { AnalysisResult } from "../utils/types";
import {
  countWords,
  countCharacters,
  countCharactersWithoutSpaces,
  countSentences,
  countParagraphs,
  findLongestWord,
  findMostFrequentWord,
  analyzeSentiment,
} from "../utils/analysisFunctions";
import { exportToPDF } from "../utils/exportToPDF";
import ResultBox from "./Analysis/ResultBox";

function TextInput() {
  const [text, setText] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleAnalyseClick = () => {
    if (text.trim() === "") {
      setError("⚠️ Please enter some text before analyzing.");
      return;
    }
    setError("");
    const wordCount = countWords(text);
    const characterCount = countCharacters(text);
    const characterCountNoSpaces = countCharactersWithoutSpaces(text);
    const paragraphCount = countParagraphs(text);
    const longestWord = findLongestWord(text);
    const mostFrequentWord = findMostFrequentWord(text);
    const sentenceCount = countSentences(text);
    const sentiment = analyzeSentiment(text);

    setAnalysis({
      wordCount,
      characterCount,
      characterCountNoSpaces,
      paragraphCount,
      longestWord,
      mostFrequentWord,
      sentenceCount,
      sentiment,
    });
  };

  const handleExportToPDF = () => {
    if (!analysis) return;
    exportToPDF(text, analysis);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {error && <div className="text-white text-2xl">{error}</div>}
      <textarea
        className="w-full xl:w-10/12 rounded-sm p-3 placeholder:text-base xl:placeholder:text-2xl"
        rows={11}
        cols={50}
        placeholder="Type or paste text here"
        onChange={handleTextInputChange}
      ></textarea>

      <button
        onClick={handleAnalyseClick}
        className="relative inline-flex h-12 xl:h-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 w-2/5 xl:w-1/6"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-lg xl:text-2xl font-medium text-gray-50 backdrop-blur-3xl">
          Analyse
        </span>
      </button>

      {analysis && (
        <div className="w-full xl:w-4/5 flex flex-col gap-2 items-center mt-5 p-3 border rounded xl:mt-10">
          <span className="mb-3 text-lg xl:text-2xl text-white italic">
            Here is an analysis of the given text
          </span>
          <div className="flex flex-col w-full xl:gap-4 xl:grid xl:grid-cols-4 gap-4">
            <ResultBox
              resultName="Word Count"
              resultCount={analysis.wordCount}
            />
            <ResultBox
              resultName="Characters (with space)"
              resultCount={analysis.characterCount}
            />
            <ResultBox
              resultName="Characters (without space)"
              resultCount={analysis.characterCountNoSpaces}
            />
            <ResultBox
              resultName="Sentences"
              resultCount={analysis.sentenceCount}
            />
            <ResultBox
              resultName="Paragraphs"
              resultCount={analysis.paragraphCount}
            />
            <ResultBox
              resultName="Longest word"
              resultCount={analysis.longestWord}
            />
            <ResultBox
              resultName="Most frequent word"
              resultCount={analysis.mostFrequentWord[0]}
            />
            <ResultBox
              resultName="Sentiment"
              resultCount={analysis.sentiment}
            />
          </div>

          <button
            className="bg-white px-3 py-1 rounded-lg mt-6"
            onClick={handleExportToPDF}
          >
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default TextInput;
