import { Search, ListMusic } from "lucide-react";

function RecentlyPlayed() {
  return (
    <div className="flex items-center text-zinc-400">
      <Search className="w-4 h-4 mr-2" />
      <span className="text-sm">Son çalınanlar</span>
      <ListMusic className="w-4 h-4 ml-auto" />
    </div>
  );
}

export default RecentlyPlayed;
