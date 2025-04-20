import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-zinc-400" />
      </div>
      <input
        type="search"
        className="block w-80 p-2 pl-10 text-sm text-white border-none rounded-full bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Ne çalmak istiyorsun?"
      />
    </div>
  );
}

export default SearchBar;
