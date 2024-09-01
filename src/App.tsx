import Header from "./components/Header";
import TextInput from "./components/TextInput";

function App() {
  return (
    <>
      <div className="w-full bg-slate-200">
        Apurba tech
        <img className="w-16 h-10 " src="apurba_logo.png" alt="apurba_logo" />
        <Header />
        <TextInput />
      </div>
    </>
  );
}

export default App;
