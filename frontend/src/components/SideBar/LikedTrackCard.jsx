// components/LikedTrackCard.jsx
export default function LikedTrackCard({ track, onClick }) {
  return (
    <div
      className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800 cursor-pointer transition"
      onClick={() => onClick?.(track)}
    >
      <img
        src={track.coverImageUrl || "/music-cover.jpg"}
        alt={track.title}
        className="w-10 h-10 rounded object-cover flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm text-white truncate">
          {track.title}
        </div>
        <div className="text-xs text-zinc-400 truncate">
          {track.artist
            ? typeof track.artist === "object"
              ? track.artist.name
              : track.artist
            : "Bilinmeyen Sanatçı"}
        </div>
      </div>
    </div>
  );
}
