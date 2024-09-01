import { useState } from "react";

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

// Function to count paragraphs in the text

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

    setAnalysis({
      wordCount,
      characterCount,
      characterCountNoSpaces,
      paragraphCount,
      longestWord,
    });
  };

  return (
    <div>
      <textarea
        id="w3review"
        name="w3review"
        rows={4}
        cols={50}
        placeholder="enter text here"
        onChange={handleTextInputChange}
      ></textarea>

      <button onClick={handleAnalyseClick}>Analyse</button>

      {analysis && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p>
            <strong>Word Count:</strong> {analysis.wordCount}
          </p>
          <p>
            <strong>Character Count (with spaces):</strong>{" "}
            {analysis.characterCount}
          </p>
          <p>
            <strong>Character Count (without spaces):</strong>{" "}
            {analysis.characterCountNoSpaces}
          </p>
          <p>
            <strong>Paragraph count:</strong> {analysis.paragraphCount}
          </p>
          <p>
            <strong>Longest word:</strong> {analysis.longestWord}
          </p>
        </div>
      )}
    </div>
  );
}

export default TextInput;
