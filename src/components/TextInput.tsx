import { useState } from "react";

// Function to count words in the text
const countWords = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

// Function to count characters, including spaces
const countCharacters = (text) => {
  return text.length;
};

// Function to count characters excluding spaces
const countCharactersWithoutSpaces = (text) => {
  return text.replace(/\s+/g, "").length;
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

    setAnalysis({
      wordCount,
      characterCount,
      characterCountNoSpaces,
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
        </div>
      )}
    </div>
  );
}

export default TextInput;
