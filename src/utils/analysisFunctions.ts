import Sentiment from "sentiment";

export const countWords = (text: string): number => {
  let count = 0;
  let inWord = false;

  for (let i = 0; i < text.length; i++) {
    if (/\S/.test(text[i])) {
      if (!inWord) {
        count++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }

  return count;
};

export const countCharacters = (text: string): number => text.length;

export const countCharactersWithoutSpaces = (text: string): number =>
  text.replace(/\s+/g, "").length;

export const countSentences = (text: string): number =>
  text.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.trim().length > 0)
    .length;

export const countParagraphs = (text: string): number =>
  text.split(/\n\s*/).filter((paragraph) => paragraph.trim()).length;

export const findLongestWord = (text: string): string =>
  text
    .match(/\b\w+\b/g)
    ?.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ""
    ) || "";

export const findMostFrequentWord = (text: string): [string, number] => {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const wordCounts = new Map<string, number>();
  let mostFrequentWord = "";
  let maxCount = 0;

  words?.forEach((word) => {
    const count = (wordCounts.get(word) || 0) + 1;
    wordCounts.set(word, count);

    if (count > maxCount) {
      mostFrequentWord = word;
      maxCount = count;
    }
  });

  return [mostFrequentWord, maxCount];
};

export const analyzeSentiment = (text: string): string => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  if (result.score > 0) return "Positive";
  if (result.score < 0) return "Negative";
  return "Neutral";
};
