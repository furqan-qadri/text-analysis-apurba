interface ResultBoxProps {
  resultName: string;
  resultCount: string | number;
}

function ResultBox({ resultName, resultCount }: ResultBoxProps) {
  return (
    <div
      className="result-box w-full rounded-lg p-2 px-3 xl:px-8 bg-gradient-to-r from-violet-100 to-sky-100"
      data-testid={resultName}
    >
      <div className="flex justify-between text-lg">
        <span className="font-bold"> {resultName}</span>
        <span> {resultCount}</span>
      </div>
    </div>
  );
}

export default ResultBox;
