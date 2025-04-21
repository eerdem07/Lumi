import React from "react";
import PlaylistItem from "./PlaylistItem";

function PlaylistList({ playlists }) {
  return (
    <div className="space-y-1 mt-2 overflow-y-auto overflow-x-hidden flex-grow">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id || playlist.name} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistList;
