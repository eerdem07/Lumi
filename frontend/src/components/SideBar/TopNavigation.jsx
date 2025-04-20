import { Home, Search, Library } from "lucide-react";

function TopNavigation() {
  return (
    <nav className="space-y-2">
      <a
        href="#"
        className="flex items-center gap-4 text-sm font-semibold text-white py-2 px-3 rounded hover:bg-zinc-800"
      >
        <Home className="w-6 h-6" />
        Ana sayfa
      </a>
      <a
        href="#"
        className="flex items-center gap-4 text-sm font-semibold text-zinc-400 py-2 px-3 rounded hover:bg-zinc-800 hover:text-white"
      >
        <Search className="w-6 h-6" />
        Ara
      </a>
      <a
        href="#"
        className="flex items-center gap-4 text-sm font-semibold text-zinc-400 py-2 px-3 rounded hover:bg-zinc-800 hover:text-white"
      >
        <Library className="w-6 h-6" />
        Kitaplığın
      </a>
    </nav>
  );
}

export default TopNavigation;
