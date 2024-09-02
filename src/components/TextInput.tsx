import { useState } from "react";
import Sentiment from "sentiment";
import ResultBox from "./Analysis/ResultBox";

// Function to count words in the text
const countWords = (text) => {
  let count = 0;
  let inWord = false;

  for (let i = 0; i < text.length; i++) {
    if (/\S/.test(text[i])) {
      // Any non-whitespace character
      if (!inWord) {
        count++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }

  return count;

  //  short regex approach for better readability. suitable for not very large texts
  // const countWords = (text) => {
  //     const matches = text.match(/\b\w+\b/g);
  //     return matches ? matches.length : 0;
  //   };
};

// Function to count characters, including spaces
const countCharacters = (text) => {
  return text.length;
};

const countSentences = (text) => {
  // Split text by sentence-ending punctuation followed by a space or end of string
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.filter((sentence) => sentence.trim().length > 0).length;
};

const countParagraphs = (text) => {
  return text.split(/\n\s*/).filter((paragraph) => paragraph.trim()).length;
};

// Function to count characters excluding spaces
const countCharactersWithoutSpaces = (text) => {
  return text.replace(/\s+/g, "").length;

  //   does not create a new string so is more memory efficient but due to the loop the performance would roughly be the same as the regex approach
  // const countCharactersWithoutSpaces = (text) => {
  //     let count = 0;
  //     for (let i = 0; i < text.length; i++) {
  //       if (!/\s/.test(text[i])) {
  //         count++;
  //       }
  //     }
  //     return count;
  //   };
};

const findLongestWord = (text) => {
  return text
    .match(/\b\w+\b/g) // Match all words
    .reduce((longest, current) => {
      return current.length > longest.length ? current : longest;
    }, "");
};

const findMostFrequentWord = (text) => {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const wordCounts = new Map();
  let mostFrequentWord = "";
  let maxCount = 0;

  words.forEach((word) => {
    const count = (wordCounts.get(word) || 0) + 1;
    wordCounts.set(word, count);

    if (count > maxCount) {
      mostFrequentWord = word;
      maxCount = count;
    }
  });

  return [mostFrequentWord, maxCount];
};

const analyzeSentiment = (text) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  let sentimentLabel = "Neutral";
  console.log(result);

  if (result.score > 0) {
    sentimentLabel = "Positive";
  } else if (result.score < 0) {
    sentimentLabel = "Negative";
  }

  return sentimentLabel;
};

function TextInput() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleTextInputChange = (event) => {
    setText(event.target.value);
  };

  const handleAnalyseClick = () => {
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

  return (
    <div className="flex flex-col gap-4 items-center">
      <textarea
        className="w-full rounded-sm p-2"
        id="w3review"
        name="w3review"
        rows={8}
        cols={50}
        placeholder="Type or paste text here"
        onChange={handleTextInputChange}
      ></textarea>

      <button
        onClick={handleAnalyseClick}
        className="relative inline-flex h-12 xl:h-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 w-2/5 xl:w-1/6"
      >
        <span className="absolute inset-[-2000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-lg xl:text-2xl font-medium text-gray-50 backdrop-blur-3xl">
          Analyse
        </span>
      </button>

      {analysis && (
        <div className="w-full flex flex-col gap-2 items-center mt-5 p-3">
          <span className="mb-3 text-lg">
            Here is an analysis of the given text
          </span>
          <ResultBox resultName="Word Count" resultCount={analysis.wordCount} />
          <ResultBox
            resultName="Characters (with space)"
            resultCount={analysis.characterCount}
          />
          <ResultBox
            resultName="Word Count"
            resultCount={analysis.characterCountNoSpaces}
          />
          <ResultBox
            resultName="Sentence count:"
            resultCount={analysis.sentenceCount}
          />
          <ResultBox
            resultName="Paragraph count:"
            resultCount={analysis.paragraphCount}
          />
          <ResultBox
            resultName="Longest word:"
            resultCount={analysis.longestWord}
          />
          <ResultBox
            resultName="Most frequent word:"
            resultCount={analysis.mostFrequentWord[0]}
            // {}" "{analysis.mostFrequentWord[1] + "} times
          />
          <ResultBox resultName="Sentiment" resultCount={analysis.sentiment} />
        </div>
      )}
    </div>
  );
}

export default TextInput;
