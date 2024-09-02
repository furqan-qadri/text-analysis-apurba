import React from "react";
import ResultBox from "./ResultBox";
import { AnalysisResultTypes } from "../../utils/types";
import { exportToPDF } from "../../utils/exportToPDF";

interface AnalysisResultProps {
  analysis: AnalysisResultTypes;
  text: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, text }) => {
  const handleExportToPDF = () => {
    if (!analysis) return;
    exportToPDF(text, analysis);
  };

  return (
    <div className="w-full xl:w-4/5 flex flex-col gap-2 items-center mt-5 p-3 border rounded xl:mt-10">
      <span className="mb-3 text-lg xl:text-2xl text-white italic">
        Here is an analysis of the given text
      </span>
      <div className="flex flex-col w-full xl:gap-4 xl:grid xl:grid-cols-4 gap-4">
        <ResultBox resultName="Words" resultCount={analysis.wordCount} />
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
        <ResultBox resultName="Sentiment" resultCount={analysis.sentiment} />
      </div>

      <button
        className="bg-white px-3 py-1 rounded-lg mt-6"
        onClick={handleExportToPDF}
      >
        Export to PDF
      </button>
    </div>
  );
};

export default AnalysisResult;
