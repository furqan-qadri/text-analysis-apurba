interface ResultBoxProps {
  resultName: string;
  resultCount: string;
}

function ResultBox({ resultName, resultCount }: ResultBoxProps) {
  return (
    <div className=" w-4/5 xl:w-1/5 rounded-lg p-2 xl:px-8  bg-slate-400">
      <div className="flex justify-between text-lg">
        <span className="font-bold"> {resultName}</span>
        <span> {resultCount}</span>
      </div>
    </div>
  );
}

export default ResultBox;
