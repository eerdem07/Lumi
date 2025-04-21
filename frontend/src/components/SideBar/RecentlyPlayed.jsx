import React from "react";
import { Search, ListMusic } from "lucide-react";

function RecentlyPlayed() {
  return (
    <div className="flex items-center text-zinc-400 px-3 py-2">
      <button className="text-zinc-400 hover:text-white mr-2">
        <Search className="w-4 h-4" />
      </button>
      <span className="text-sm font-semibold">Son çalınanlar</span>
      <button className="text-zinc-400 hover:text-white ml-auto">
        <ListMusic className="w-4 h-4" />
      </button>
    </div>
  );
}

export default RecentlyPlayed;
