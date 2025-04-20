import { Heart } from "lucide-react";

function PlaylistItem({ playlist }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-800 group">
      <div className="w-12 h-12 bg-purple-700 flex items-center justify-center rounded">
        <Heart className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-white text-sm font-medium">{playlist.name}</div>
        <div className="text-xs text-zinc-400 flex items-center gap-1">
          <span className="text-green-500">•</span> Çalma listesi •{" "}
          {playlist.songCount} şarkı
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
