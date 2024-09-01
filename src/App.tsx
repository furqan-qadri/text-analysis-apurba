import Header from "./components/Header";
import TextInput from "./components/TextInput";

function App() {
  return (
    <>
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
      bg-red-200
      "
      >
        <Header />
        <div className="w-full">
          <TextInput />
        </div>
      </div>
    </>
  );
}

export default App;

// [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
