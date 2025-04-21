import React from "react";
import { Home, Search, Library } from "lucide-react";

function TopNavigation() {
  return (
    <nav className="space-y-1 md:space-y-2">
      <a
        href="#"
        className="flex items-center gap-3 md:gap-4 text-sm font-semibold text-white py-2 px-3 rounded hover:bg-zinc-800 group"
      >
        <Home className="w-6 h-6 flex-shrink-0" />
        <span className="hidden md:inline">Ana sayfa</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 md:gap-4 text-sm font-semibold text-zinc-400 py-2 px-3 rounded hover:bg-zinc-800 hover:text-white group"
      >
        <Search className="w-6 h-6 flex-shrink-0" />
        <span className="hidden md:inline">Ara</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 md:gap-4 text-sm font-semibold text-zinc-400 py-2 px-3 rounded hover:bg-zinc-800 hover:text-white group"
      >
        <Library className="w-6 h-6 flex-shrink-0" />
        <span className="hidden md:inline">Kitaplığın</span>
      </a>
    </nav>
  );
}

export default TopNavigation;
