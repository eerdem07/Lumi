import React from "react";
import { Heart } from "lucide-react";

function PlaylistItem({ playlist }) {
  const isLikedSongs = playlist.id === "liked";

  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-800 group cursor-pointer">
      <div
        className={`w-12 h-12 ${
          isLikedSongs
            ? "bg-gradient-to-br from-indigo-600 to-purple-900"
            : "bg-zinc-700"
        } flex items-center justify-center rounded flex-shrink-0`}
      >
        {isLikedSongs ? (
          <Heart className="w-6 h-6 text-white" />
        ) : (
          <span className="text-xl font-bold text-white">♫</span>
        )}
      </div>
      <div className="min-w-0 flex-grow">
        <div
          className={`text-sm font-medium ${
            isLikedSongs ? "text-white" : "text-zinc-100"
          } truncate`}
        >
          {playlist.name}
        </div>
        <div className="text-xs text-zinc-400 flex items-center gap-1 truncate">
          <span>{playlist.owner || "Lumi"}</span>
          {playlist.songCount && <span className="mx-1">•</span>}
          {playlist.songCount && <span>{playlist.songCount} şarkı</span>}
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
