function Header() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mb-6">
      <img
        className="w-40 h-24 lg:w-72 lg:h-40"
        src="apurba_logo.png"
        alt="apurba_logo"
      />
      <div className="text-3xl xl:text-5xl font-bold text-white">
        Text analyser
      </div>
      <div className="text-lg text-white">Quick and Reliable</div>
    </div>
  );
}

export default Header;
