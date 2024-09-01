function Header() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mb-4">
      <img
        className="w-36 h-20 lg:w-72 lg:h-40"
        src="apurba_logo.png"
        alt="apurba_logo"
      />
      <div className="text-3xl xl:text-5xl font-semibold">Text analyser</div>
      <div className="text-2xl">Lightweight</div>
    </div>
  );
}

export default Header;
