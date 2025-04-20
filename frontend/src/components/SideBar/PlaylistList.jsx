import PlaylistItem from "./PlaylistItem";

function PlaylistList({ playlists }) {
  return (
    <div className="space-y-2 mt-2 overflow-auto max-h-[calc(100vh-350px)]">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistList;
